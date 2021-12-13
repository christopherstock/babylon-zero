import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a custom stage set.
***********************************************************************************************************************/
export abstract class Stage
{
    /** The game instance. */
    private readonly game               :bz.Game                        = null;

    /** A collection of all walls in this stage. */
    private readonly walls              :bz.Wall[]                      = [];
    /** A collection of all items in this stage. */
    private readonly collectables       :bz.Collectable[]               = [];
    /** A collection of all bots in this stage. */
    private readonly bots               :bz.Bot[]                       = [];
    /** A collection of all sprites that appear in this stage. */
    private          sprites            :bz.Sprite[]                    = [];
    /** A collection of all lights that appear in this stage. */
    private readonly lights             :BABYLON.Light[]                = [];
    /** A collection of all shadowGenerators that appear in this stage. */
    private readonly shadowGenerators   :BABYLON.ShadowGenerator[]      = [];
    /** A collection of all bullet holes in this stage. */
    private readonly bulletHoles        :bz.BulletHole[]                = [];
    /** A collection of all debug meshes in this stage. */
    private readonly debugMeshes        :BABYLON.Mesh[]                 = [];
    /** The particle helper fx 'rain' for this stage. */
    private readonly particleEffects    :(BABYLON.ParticleSystemSet|BABYLON.ParticleSystem)[]    = [];

    /** The stage config. */
    private          config             :bz.StageConfig                 = null;
    /** The camera system that manages all scene cameras. */
    private          cameraSystem       :bz.CameraSystem                = null;
    /** The player instance. */
    private          player             :bz.Player                      = null;
    /** The skybox that surrounds the whole stage. */
    private          skybox             :BABYLON.Mesh                   = null;

    /** Handles one single blocking UI pipeline (for event blocking UI messages). */
    private         uiThreadPipeline    :bz.Event[]                     = [];
    /** Handles all occuring pipeline events in a monitored way at the end of the render()-cycle.  */
    private         eventPipelines      :bz.Event[][]                   = [];

    /** ****************************************************************************************************************
    *   Creates a new custom stage.
    *
    *   @param game          The game instance.
    *******************************************************************************************************************/
    public constructor( game :bz.Game )
    {
        this.game = game;
    }

    /** ****************************************************************************************************************
    *   Creates the stage config that is applied on initializing this stage.
    *******************************************************************************************************************/
    public abstract createDefaultConfig() : bz.StageConfig;

    /** ****************************************************************************************************************
    *   Creates all stage contents.
    *******************************************************************************************************************/
    protected abstract createStageContents( meshFactory:bz.MeshFactory ) : void;

    /** ****************************************************************************************************************
    *   Handles stage specific keys.
    *******************************************************************************************************************/
    protected abstract handleStageKeys() : void;

    /** ****************************************************************************************************************
    *   Inits the stage.
    *******************************************************************************************************************/
    public init( config:bz.StageConfig ) : void
    {
        // create stage config
        this.config = config;

        // assign scene colors from config
        this.getScene().getNativeSceneBG().ambientColor = this.config.ambientColor;
        this.getScene().getNativeSceneBG().clearColor   = this.config.sceneBgColor;

        // create all stage contents
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.getScene(), this.config.ambientColor );
        this.createStageContents( meshFactory );

        // player startup position and rotation must be set via config object!
/*
        if ( this.config.startupPosition !== null )
        {
            this.player.setPosition( this.config.startupPosition );
        }
        if ( this.config.startupRotation !== null )
        {
            this.player.setRotation( this.config.startupRotation );
        }
*/
        // create cameras and set initial cam
        this.cameraSystem = this.createCameraSystem();
        this.setActiveCamera( this.config.initialCamera );

        // add debug axis
        if ( bz.SettingDebug.ENABLE_COORDINATE_AXIS )
        {
            this.addCoordinalAxis();
        }
    }

    /** ****************************************************************************************************************
    *   Renders all stage concernings for one tick of the game loop.
    *******************************************************************************************************************/
    public render() : void
    {
        // handle stage specific keys
        this.handleStageKeys();

        // render player
        if ( this.player !== null )
        {
            this.player.render();
        }

        // render walls
        for ( const wall of this.walls )
        {
            wall.render();
        }

        // render items
        for ( const item of this.collectables )
        {
            item.render();
        }

        // render bots
        for ( const bot of this.bots )
        {
            bot.render();
        }

        // prune disposed sprites
        for ( let i:number = ( this.sprites.length - 1 ); i >= 0; --i )
        {
            if ( this.sprites[ i ].isDisposed )
            {
                this.sprites.splice( i, 1 );
            }
        }

        // handle event system
        this.handleEventPipeline();
    }

    /** ****************************************************************************************************************
    *   Disposes all babylon.JS resources of this stage.
    *******************************************************************************************************************/
    public dispose() : void
    {
        // dispose player
        if ( this.player !== null )
        {
            this.player.dispose();
        }

        // dispose all walls
        for ( const wall of this.walls )
        {
            wall.dispose();
        }

        // dispose all items
        for ( const item of this.collectables )
        {
            item.dispose();
        }

        // dispose all bots
        for ( const bot of this.bots )
        {
            bot.dispose();
        }

        // dispose all bullet holes
        for ( const bulletHole of this.bulletHoles )
        {
            bulletHole.dispose();
        }

        // dispose all debug meshes
        for ( const debugLine of this.debugMeshes )
        {
            debugLine.dispose();
        }

        // dispose skybox
        if ( this.skybox !== null )
        {
            this.skybox.dispose();
        }

        // dispose sprites
        for ( const sprite of this.sprites )
        {
            sprite.dispose();
        }

        // dispose lights
        for ( const light of this.lights )
        {
            light.dispose();
        }

        // dispose shadow generators
        for ( const shadowGenerator of this.shadowGenerators )
        {
            shadowGenerator.dispose();
        }

        // dispose camera system
        this.cameraSystem.dispose();

        // dispose rain effect
        for ( const particleEffect of this.particleEffects )
        {
            particleEffect.dispose();
        }
    }

    /** ****************************************************************************************************************
    *   Removed all bullet holes that are associated to the specified game object.
    *
    *   @param gameObject The game object to remove all bullet holes for.
    *******************************************************************************************************************/
    public disposeBulletHolesForGameObject( gameObject:bz.GameObject ) : void
    {
        // browse all bullet holes
        for ( const bulletHole of this.bulletHoles )
        {
            if ( bulletHole.getGameObject() === gameObject )
            {
                bulletHole.dispose();
            }
        }
    }

    /** ****************************************************************************************************************
    *   Sets the active camera for this stage.
    *******************************************************************************************************************/
    public setActiveCamera( cameraId:bz.CameraType ) : void
    {
        this.cameraSystem.setActiveCamera
        (
            cameraId,
            this.player,
            this.game.getGUI()
        );
    }

    /** ****************************************************************************************************************
    *   Applies a shot onto the stage.
    *
    *   @param shot The shot to apply onto the stage.
    *******************************************************************************************************************/
    public applyShot( shot:bz.Shot ) : void
    {
        // add debug line
        if ( bz.SettingDebug.SHOW_SHOT_LINES_AND_COLLISIONS )
        {
            this.debugMeshes.push( shot.createDebugLine( this.getScene() ) );
        }

        // determine all hit points without hurting the game objects
        const hitPoints:bz.HitPoint[] = this.determineAllHitPoints( shot, false );
        bz.Debug.fire.log( ' Gathered [' + String( hitPoints.length ) + '] hit points' );

        // determine all hit points impacted by the shot
        const impactHitPoints:bz.HitPoint[] = Stage.determineImpactHitPoints( hitPoints, shot );

        // impact all hit points
        for ( const impactHitPoint of impactHitPoints )
        {
            // add particle fx
            const meshTextureFile:bz.TextureFile = bz.Texture.getTextureFromMesh( impactHitPoint.getMesh() );
/*
            const bulletHoleTextureFile:bz.TextureFile = bz.Texture.getBulletHoleTextureForMesh(
                impactHitPoint.getMesh()
            );
 */
            this.addWallRubble(
                impactHitPoint.getPoint(),
                impactHitPoint.getNormal(),
                meshTextureFile
            );

            // hurt the wall
            const bulletHole:bz.BulletHole = impactHitPoint.causeImpact
            (
                this.getScene(),
                this.config.ambientColor,
                shot.getDamage()
            );

            // append bullet hole (if the wall still exists)
            if ( bulletHole !== null )
            {
                this.addBulletHole( bulletHole );
            }
        }
    }

    /** ****************************************************************************************************************
    *   Applies an interaction onto the stage.
    *
    *   @param interaction The interaction to apply onto the stage.
    *******************************************************************************************************************/
    public applyInteraction( interaction:bz.Interaction ) : void
    {
        // get all hit points for this interaction (won't hurt the game objects)
        const hitPoints:bz.HitPoint[] = this.determineAllHitPoints( interaction, true );
        bz.Debug.player.log( ' Gathered [' + String( hitPoints.length ) + '] interaction hit points' );

        // get the nearest interaction hit point
        const impactHitPoints:bz.HitPoint[] = Stage.determineImpactHitPoints( hitPoints, interaction );
        bz.Debug.player.log( ' Gathered [' + String( impactHitPoints.length ) + '] nearest hitpoint' );

        // browse all hit points
        for ( const impactHitPoint of impactHitPoints )
        {
            // get the hit game object
            const hitGameObject :bz.GameObject = impactHitPoint.getGameObject();

            if ( hitGameObject instanceof bz.Wall )
            {
                hitGameObject.performInteraction( this );
            }
        }
    }

    /** ****************************************************************************************************************
    *   Adds the specified events to a new event pipeline inside this stage.
    *
    *   @param events The events to add into a new event pipeline of this stage.
    *******************************************************************************************************************/
    public addEventsToPipeline( events:bz.Event[] ) : void
    {
        // reset event data
        const newEvents     :bz.Event[] = [];
        let addToUiPipeline :boolean    = false;
        for ( const event of events )
        {
            // special handling for TIME_DELAY events
            if ( event.type === bz.EventType.TIME_DELAY )
            {
                // a clone of the TIME_DELAY event is created and added so it has an own elapse-counter
                newEvents.push(
                    new bz.Event(
                        bz.EventType.TIME_DELAY,
                        new bz.EventDataTimeDelay(
                            ( event.data as bz.EventDataTimeDelay ).delayInFrames
                        )
                    )
                );
            }
            else
            {
                // add the event
                newEvents.push( event );

                // postpone a TIME_DELAY event for shown GUI game messages
                if ( event.type === bz.EventType.SHOW_GUI_GAME_MESSAGE )
                {
                    newEvents.push(
                        new bz.Event(
                            bz.EventType.TIME_DELAY,
                            new bz.EventDataTimeDelay(
                                (
                                    bz.SettingGUI.GAME_MESSAGE_LIFETIME
                                    + bz.SettingGUI.GAME_MESSAGE_DELAY_BETWEEN_MESSAGES
                                )
                            )
                        )
                    );

                    addToUiPipeline = true;
                }
            }
        }

        if ( addToUiPipeline )
        {
            this.uiThreadPipeline = this.uiThreadPipeline.concat( newEvents );
        }
        else
        {
            this.eventPipelines.push( newEvents );
        }
    }

    /** ****************************************************************************************************************
    *   Delivers the current selected index of the pause menu.
    *
    *   @return The current active pause menu index.
    *
    *   TODO feels wrong inside this class!
    *******************************************************************************************************************/
    public getPauseMenuIndex() : number
    {
        return this.game.getGUI().getPauseMenuIndex();
    }

    /** ****************************************************************************************************************
    *   Sets the active index for the pause menu.
    *
    *   @param index The index of the pause menu item to set.
    *
    *   TODO feels wrong inside this class!
    *******************************************************************************************************************/
    public setPauseMenuIndex( index:number ) : void
    {
        this.game.getGUI().setPauseMenuIndex( index );
    }

    /** ****************************************************************************************************************
    *   Alters the pause state for all relevant game objects.
    *
    *   @param pause The pause state to assign.
    *******************************************************************************************************************/
    public setPause( pause:boolean ) : void
    {
        // sprites
        for ( const sprite of this.sprites )
        {
            sprite.setPause( pause );
        }

        // particle effects
        for ( const particleSystem of this.particleEffects )
        {
            // pause wall rubble
            if (
                particleSystem instanceof BABYLON.ParticleSystem
                && particleSystem.name === 'wall_rubble'
            )
            {
                particleSystem.updateSpeed = ( pause ? 0.0 : bz.SettingEngine.WALL_RUBBLE_UPDATE_SPEED );
            }
            // pause rain
            else if (
                particleSystem instanceof BABYLON.ParticleSystemSet
            )
            {
                for ( const system of particleSystem.systems )
                {
                    if ( system.name === 'rain_effect' )
                    {
                        system.updateSpeed = ( pause ? 0.0 : bz.SettingEngine.RAIN_UPDATE_SPEED );
                    }
                }
            }
        }

        // video textures
        for ( const texture of bz.Texture.ALL_TEXTURES )
        {
            if ( texture.getFile().textureType === bz.TextureType.VIDEO )
            {
                const videoTexture :BABYLON.VideoTexture = (
                    bz.Texture.getNativeTexture( texture.getFile() ) as BABYLON.VideoTexture
                );

                if ( pause )
                {
                    videoTexture.video.pause()
                }
                else
                {
                    videoTexture.video.play().then(
                        () :void =>
                        {
                            // handle promise fulfillment
                        }
                    ).catch(
                        () :void =>
                        {
                            // catch promise error
                        }
                    );
                }
            }
        }
    }

    /** ****************************************************************************************************************
    *   Returns the parent game instance.
    *
    *   @return The parent game instance.
    *******************************************************************************************************************/
    public getGame() : bz.Game
    {
        return this.game;
    }

    /** ****************************************************************************************************************
    *   Returns the player instance.
    *
    *   @return The player instance.
    *******************************************************************************************************************/
    public getPlayer() : bz.Player
    {
        return this.player;
    }

    /** ****************************************************************************************************************
    *   Returns this stage's camera system.
    *
    *   @return The camera system of this stage.
    *******************************************************************************************************************/
    public getCameraSystem() : bz.CameraSystem
    {
        return this.cameraSystem;
    }

    /** ****************************************************************************************************************
    *   Returns the according scene.
    *
    *   @return The scene this stage belongs to.
    *******************************************************************************************************************/
    public getScene() : bz.Scene
    {
        return this.game.getScene();
    }

    /** ****************************************************************************************************************
    *   Returns the according config.
    *
    *   @return The config for this stage.
    *******************************************************************************************************************/
    public getConfig() : bz.StageConfig
    {
        return this.config;
    }

    /** ****************************************************************************************************************
    *   Adds walls to the stage.
    *
    *   @param walls The walls to add to this stage.
    *******************************************************************************************************************/
    public addWall( walls:(bz.Wall[]|bz.Wall) ) : void
    {
        if ( !Array.isArray( walls ) )
        {
            walls = [ walls ];
        }

        for ( const wall of walls )
        {
            this.walls.push( wall );
        }
    }

    /** ****************************************************************************************************************
    *   Adds a sprite to the stage.
    *
    *   @param sprites The sprites to add to this stage.
    *******************************************************************************************************************/
    protected addSprite( sprites:(bz.Sprite[]|bz.Sprite) ) : void
    {
        if ( !Array.isArray( sprites ) )
        {
            sprites = [ sprites ];
        }

        for ( const sprite of sprites )
        {
            this.sprites.push( sprite );
        }
    }

    /** ****************************************************************************************************************
    *   Adds collectables to the stage.
    *
    *   @param collectables The collectables to add to this stage.
    *******************************************************************************************************************/
    protected addCollectable( collectables:(bz.Collectable[]|bz.Collectable) ) : void
    {
        if ( !Array.isArray( collectables ) )
        {
            collectables = [ collectables ];
        }

        for ( const collectable of collectables )
        {
            this.collectables.push( collectable );
        }
    }

    /** ****************************************************************************************************************
    *   Adds a light to the stage.
    *
    *   @param lights The lights to add to this stage.
    *******************************************************************************************************************/
    public addLight( lights:(BABYLON.Light[]|BABYLON.Light) ) : void
    {
        if ( !Array.isArray( lights ) )
        {
            lights = [ lights ];
        }

        for ( const light of lights )
        {
            this.lights.push( light );
        }
    }

    // noinspection JSUnusedGlobalSymbols

    /** ****************************************************************************************************************
    *   Adds a bot to the stage.
    *
    *   @param bots The bots to add to this stage.
    *******************************************************************************************************************/
    protected addBot( bots:(bz.Bot[]|bz.Bot) ) : void
    {
        if ( !Array.isArray( bots ) )
        {
            bots = [ bots ];
        }

        for ( const bot of bots )
        {
            this.bots.push( bot );
        }
    }

    // noinspection JSUnusedGlobalSymbols

    /** ****************************************************************************************************************
    *   Adds a shadow generator for the specified shadow light.
    *******************************************************************************************************************/
    protected addShadowGenerator( light:BABYLON.IShadowLight ) : void
    {
        if ( !bz.SettingEngine.ENABLE_SHADOWS )
        {
            return;
        }

        const shadowGenerator:BABYLON.ShadowGenerator = new BABYLON.ShadowGenerator( 2048, light );
        shadowGenerator.useExponentialShadowMap = true;
        shadowGenerator.usePoissonSampling      = true;

        this.shadowGenerators.push( shadowGenerator );

        // set shadows for all walls (best quality but costs lots of performance)
        for ( const wall of this.walls )
        {
            wall.getModel().applyShadowGenerator( shadowGenerator );
        }
        // also working for single models, testwise
        // this.chairCompoundDestroyable.getModel().applyShadowGenerator( shadowGenerator );
    }

    /** ****************************************************************************************************************
    *   Sets the player for this stage.
    *
    *   @param player The player to set to this stage.
    *******************************************************************************************************************/
    protected setPlayer( player:bz.Player ) : void
    {
        this.player = player;
    }

    /** ****************************************************************************************************************
    *   Adds a skybox to the stage.
    *******************************************************************************************************************/
    protected setSkybox( file:bz.SkyBoxFile, alpha:number ) : void
    {
        this.skybox = new bz.MeshFactory( this.getScene(), this.config.ambientColor ).createSkyBoxCube( file, alpha );
    }

    /** ****************************************************************************************************************
    *   Adds a parficle effect for wall rubble on the specified point and normal.
    *******************************************************************************************************************/
    protected addWallRubble(
        point  :BABYLON.Vector3,
        normal :BABYLON.Vector3,
        tex    :bz.TextureFile
    )
    : void
    {
        const RUBBLE_COUNT:number = bz.MathUtil.getRandomInt( 3, 6 );

        const particleSystem :BABYLON.ParticleSystem = new BABYLON.ParticleSystem(
            'wall_rubble',
            100,
            this.getScene().getNativeSceneBG()
        );

        particleSystem.particleTexture = tex.createNewTextureInstance( 10.0, 10.0 );
/*
        particleSystem.particleTexture.hasAlpha = true;
        particleSystem.particleTexture.uScale = 5.0;
        particleSystem.particleTexture.vScale = 5.0;
        // particleSystem.particleTexture.wrapU  = 0.0001;
        // particleSystem.particleTexture.wrapV  = 0.0001;
*/
        // 0.01 * bz.MathUtil.getRandomInt( 1, 5 )

        // particleSystem.color1 = new BABYLON.Color4( 1.0, 1.0, 1.0, 1.0 );
        // particleSystem.color2 = new BABYLON.Color4( 1.0, 1.0, 1.0, 1.0 );
        // particleSystem.colorDead = new BABYLON.Color4( 0.0, 0.0, 0.0, 1.0 );

        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

        particleSystem.emitter = point;

        particleSystem.emitRate = RUBBLE_COUNT;
        particleSystem.targetStopDuration = 1.0;
        particleSystem.updateSpeed = bz.SettingEngine.WALL_RUBBLE_UPDATE_SPEED;

        particleSystem.minEmitPower = 0.20;
        particleSystem.maxEmitPower = 2.00;

        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = bz.MathUtil.degreesToRad( 360.0 );

        particleSystem.minLifeTime = 5.0;
        particleSystem.maxLifeTime = 12.5;

        particleSystem.minInitialRotation = 0;
        particleSystem.maxInitialRotation = bz.MathUtil.degreesToRad( 360.0 );

        particleSystem.addAngularSpeedGradient( 0, 1.5 );
        particleSystem.addColorGradient( 0.0, new BABYLON.Color4( 1.0, 1.0, 1.0, 1.0 ) );
        particleSystem.addColorGradient( 0.75, new BABYLON.Color4( 0.0, 0.0, 0.0, 1.0 ) );

        // particleSystem.addVelocityGradient( 0, 0.75 );
        particleSystem.addVelocityGradient( 1, 2.5 );
        particleSystem.addDragGradient( 0, 0.1 );

        // particleSystem.addAlphaRemapGradient(1.0, 0.5, 1.0);

        particleSystem.startDelay = 0.0;
        particleSystem.disposeOnStop = true;

        particleSystem.minSize = 0.05;
        particleSystem.maxSize = 0.25;

        // direction
        particleSystem.gravity = this.getScene().getNativeSceneBG().gravity.clone().scale( 0.30 );
        // TODO get shot angle from BulletHole and mirror it!
        particleSystem.direction1 = normal.clone().scale( 0.10 );
        particleSystem.direction2 = normal.clone().scale( 1.00 );

        // emit box size
        // particleSystem.minEmitBox = new BABYLON.Vector3( -0.1, -0.1, -0.1 ); // Bottom Left Front
        // particleSystem.maxEmitBox = new BABYLON.Vector3( 0.1, 0.1, 0.1 ); // Top Right Back
        particleSystem.minEmitBox = BABYLON.Vector3.Zero();
        particleSystem.maxEmitBox = BABYLON.Vector3.Zero();

        particleSystem.start();

        this.particleEffects.push( particleSystem );
    }

    /** ****************************************************************************************************************
    *   Adds a rain effect to the stage.
    *******************************************************************************************************************/
    protected addRainEffect(
        size     :number = 0.3,
        quantity :number = 600,
        gravity  :BABYLON.Vector3 = new BABYLON.Vector3( 0.0, 0.0, 0.0 )
    )
    : void
    {
        BABYLON.ParticleHelper.CreateAsync(
            'rain',
            this.getScene().getNativeSceneBG(),
            false
        ).then(
            ( particleSystem:BABYLON.ParticleSystemSet ) =>
            {
                for ( const system of particleSystem.systems )
                {
                    system.name = 'rain_effect';

                    system.maxScaleX = size;
                    system.maxScaleY = size;
                    system.emitRate  = quantity;
                    system.gravity   = gravity;
                }
                particleSystem.start();

                this.particleEffects.push( particleSystem );
            }
        ).catch(
            () =>
            {
                // no need to handle this error
            }
        )
    }

    /** ****************************************************************************************************************
    *   Creates the camera system that manages all cameras that appear in this stage.
    *
    *   @return The camera system for this stage.
    *******************************************************************************************************************/
    private createCameraSystem() : bz.CameraSystem
    {
        return new bz.CameraSystem
        (
            this.game,

            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            new BABYLON.Vector3( 150.0, 0.0,  0.0 ),
            new BABYLON.Vector3( 0.0,  0.0,  0.0  ),

            new BABYLON.Vector3( 0.0,  0.0,  0.0  ),
            new BABYLON.Vector3( 0.0,   0.0, 0.0  ),
            ( this.player === null ? null : this.player.getThirdPersonCameraTargetMesh() ),
            ( this.player === null ? null : this.player.getFirstPersonCameraTargetMesh() )
        );
    }

    /** ****************************************************************************************************************
    *   Sets up the coordinal axis lines. X Y and Z axes are aligned by the LEFT HAND RULE.
    *
    *   @return A collection of all meshes that build the coordinal axis lines.
    *******************************************************************************************************************/
    private addCoordinalAxis() : void
    {
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.getScene(), this.config.ambientColor );

        this.debugMeshes.push
        (
            // axis x
            meshFactory.createLine
            (
                new BABYLON.Vector3( 0.0,  0.0, 0.0 ),
                new BABYLON.Vector3( bz.SettingDebug.COORDINATE_AXIS_LENGTH, 0.0, 0.0 ),
                bz.SettingColor.COLOR_RGBA_RED_OPAQUE
            ),

            // axis y
            meshFactory.createLine
            (
                new BABYLON.Vector3( 0.0, 0.0,  0.0 ),
                new BABYLON.Vector3( 0.0, bz.SettingDebug.COORDINATE_AXIS_LENGTH, 0.0 ),
                bz.SettingColor.COLOR_RGBA_GREEN_OPAQUE
            ),

            // axis z
            meshFactory.createLine
            (
                new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                new BABYLON.Vector3( 0.0, 0.0, bz.SettingDebug.COORDINATE_AXIS_LENGTH ),
                bz.SettingColor.COLOR_RGBA_BLUE_OPAQUE
            )
        );
    }

    /** ****************************************************************************************************************
    *   Returns all hit points on all game objects of this stage on applying the specified shot.
    *   Game objects will not be damaged or hit by the shot!
    *
    *   @param shot                 The shot to apply onto all game objects of this stage.
    *   @param interactionWallsOnly Ignore walls that have no stored interaction events.
    *
    *   @return All hit points this shot collides to.
    *******************************************************************************************************************/
    private determineAllHitPoints( shot:bz.Shot, interactionWallsOnly:boolean = false ) : bz.HitPoint[]
    {
        // collect all hitPoints
        let hitPoints:bz.HitPoint[] = [];

        // check collision with walls
        bz.Debug.fire.log( ' Check shot collision with [' + String( this.walls.length ) + '] walls' );
        for ( const wall of this.walls )
        {
            if ( interactionWallsOnly && !wall.hasInteractionEvents() )
            {
                continue;
            }
            const wallHitPoints:bz.HitPoint[] = wall.determineHitPoints( shot );
            hitPoints = hitPoints.concat( wallHitPoints );
        }

        // check collision with items
        if ( bz.SettingEngine.ITEMS_CAN_BE_SHOT && !interactionWallsOnly )
        {
            bz.Debug.fire.log( ' Check shot collision with [' + String( this.collectables.length ) + '] items' );
            for ( const item of this.collectables )
            {
                const itemHitPoints:bz.HitPoint[] = item.determineHitPoints( shot );
                hitPoints = hitPoints.concat( itemHitPoints );
            }
        }

        // check collision with bots
        if ( !interactionWallsOnly )
        {
            bz.Debug.fire.log( ' Check shot collision with [' + String( this.bots.length ) + '] bots' );
            for ( const bot of this.bots )
            {
                const botHitPoints:bz.HitPoint[] = bot.determineHitPoints( shot );
                hitPoints = hitPoints.concat( botHitPoints );
            }
        }

        return hitPoints;
    }

    /** ****************************************************************************************************************
    *   Adds the specified bullet hole to the bullet hole stack.
    *   If the maximum number of bullet holes is reached, the oldest bullet hole will be disposed.
    *
    *   @param bulletHole The bullet hole to add to this stage.
    *******************************************************************************************************************/
    private addBulletHole( bulletHole:bz.BulletHole ) : void
    {
        if ( this.bulletHoles.length > bz.SettingEngine.MAX_BULLET_HOLES )
        {
            this.bulletHoles[ 0 ].dispose();
            this.bulletHoles.shift();
        }

        this.bulletHoles.push( bulletHole );
    }

    /** ****************************************************************************************************************
    *   Performs the specific event inside this stage NOW.
    *
    *   @param event The event to perform NOW.
    *
    *   @return <code>true</code> if this event has been processed.
    *           <code>false</code> if this event has not been completed yet.
    *           The lather only applies to the event { @see bz.EventType.TIME_DELAY }.
    *******************************************************************************************************************/
    private launchEvent( event:bz.Event ) : boolean
    {
        // check if this event has a constraint
        if ( event.constraint !== null )
        {
            const constraintFullfilled :boolean = event.constraint();
            if ( !constraintFullfilled )
            {
                bz.Debug.event.log( 'The constraints for this event are not met!' );

                return true;
            }
        }

        // perform event according to event type
        switch ( event.type )
        {
            case bz.EventType.TIME_DELAY:
            {
                bz.Debug.event.log( 'Perform a time delay ..' );

                const data :bz.EventDataTimeDelay = ( event.data as bz.EventDataTimeDelay );

                return ( ++data.elapsed >= data.delayInFrames );
            }

            case bz.EventType.SWITCH_TO_STAGE:
            {
                bz.Debug.event.log( 'Launch stage switch event to:' );

                const data :bz.EventDataStageSwitch = ( event.data as bz.EventDataStageSwitch );

                this.game.switchStage(
                    data.targetStage,
                    data.startupPosition,
                    data.startupRotation,
                    this.player.getInventory()
                );

                return true;
            }

            case bz.EventType.SHOW_GUI_TEXT_MESSAGE:
            {
                bz.Debug.event.log( 'Show GUI text message' );

                const data :bz.EventDataShowGuiTextMessage = ( event.data as bz.EventDataShowGuiTextMessage );
                this.getGame().getGUI().addGuiTextMessage( data.message, data.noFlooding );

                return true;
            }

            case bz.EventType.SHOW_GUI_GAME_MESSAGE:
            {
                bz.Debug.event.log( 'Show GUI game message' );

                const data :bz.EventDataShowGuiGameMessage = ( event.data as bz.EventDataShowGuiGameMessage );
                this.getGame().getGUI().addGuiGameMessage( data.image, data.message );

                return true;
            }

            case bz.EventType.SHOW_GUI_EFFECT:
            {
                bz.Debug.event.log( 'Show GUI message' );

                const data :bz.EventDataShowGuiEffect = ( event.data as bz.EventDataShowGuiEffect );

                this.getGame().getGUI().addGuiEffect( data.guiEffect );

                return true;
            }

            case bz.EventType.CAST_EXPLOSION:
            {
                bz.Debug.event.log( 'Cast an explosion ..' );

                const data :bz.EventDataCastExplosion = ( event.data as bz.EventDataCastExplosion );

                // add explosion sprite TODO to FXFactory ! TODO quadruple!
                const animatedExplosionSprite:bz.Sprite = new bz.Sprite
                (
                    this.getScene(),
                    bz.SpriteFile.EXPLOSION,
                    new BABYLON.Vector3( 20.0, 0.0, 20.0 ),
                    10.0,
                    10.0,
                    bz.SpriteCollidable.NO
                );
                animatedExplosionSprite.animate( 0, 47, false, true );
                this.addSprite( animatedExplosionSprite );

                // cast physical explosion impulse
                const physicsHelper :BABYLON.PhysicsHelper  = new BABYLON.PhysicsHelper(
                    this.game.getScene().getNativeSceneBG()
                );
                physicsHelper.applyRadialExplosionImpulse(
                    data.center,
                    {
                        radius:   data.radius,
                        strength: data.strength,
                        falloff:  BABYLON.PhysicsRadialImpulseFalloff.Linear,
                        sphere: {
                            segments: 32,
                            diameter: 1,
                        },
                        affectedImpostorsCallback: (
                            affectedImpostorsWithData :BABYLON.PhysicsAffectedImpostorWithData[]
                        ) =>
                        {
                            bz.Debug.event.log(
                                ' [' + String( affectedImpostorsWithData.length ) + '] '
                                + 'affected models from this explosion'
                            );
                        },
                    }
                );

                return true;
            }

            case bz.EventType.GAIN_PAINKILLERS:
            {
                const data :bz.EventDataGainPainkillers = ( event.data as bz.EventDataGainPainkillers );

                this.player.getInventory().numberOfPainkillers += data.amount;

                bz.Debug.event.log(
                    'Gain ' + String( data.amount ) + ' Painkiller. '
                    + 'Now carrying ' + String( this.player.getInventory().numberOfPainkillers ) + '.'
                );

                return true;
            }

            case bz.EventType.TOGGLE_LIGHT:
            {
                const data :bz.EventDataToggleLight = ( event.data as bz.EventDataToggleLight );

                // browse all lights
                for ( const light of data.lights )
                {
                    // toggle native enabled state
                    const newState :boolean = ( !light.isEnabled() );
                    light.setEnabled( newState );

                    bz.Debug.event.log( 'Toggle light to enabled: ' + String( newState ) + '.' );
                }

                return true;
            }
        }
    }

    /** ****************************************************************************************************************
    *   Handles the event system by rendering all event pipelines.
    *******************************************************************************************************************/
    private handleEventPipeline() : void
    {
        // check if event pipelines exist
        if ( this.eventPipelines.length > 0 )
        {
            bz.Debug.event.log( 'Handle ' + String( this.eventPipelines.length ) + ' event pipelines' );

            const newEventPipelines :bz.Event[][] = [];

            // browse all event pipelines
            for ( const eventPipeline of this.eventPipelines )
            {
                bz.Debug.event.log( ' Handle ' + String( eventPipeline.length ) + ' events' );

                const newEventPipeline :bz.Event[] = [];

                let pipelineBlocked :boolean = false;
                for ( const event of eventPipeline )
                {
                    if ( pipelineBlocked )
                    {
                        newEventPipeline.push( event );
                    }
                    else
                    {
                        const eventProcessed :boolean  = this.launchEvent( event );
                        if ( !eventProcessed )
                        {
                            pipelineBlocked = true;
                            newEventPipeline.push( event );

                            bz.Debug.event.log( '  Event is blocking the event pipeline.' );
                        }
                    }
                }

                if ( newEventPipeline.length > 0 )
                {
                    newEventPipelines.push( newEventPipeline );
                }
            }

            if ( newEventPipelines.length === 0 )
            {
                bz.Debug.event.log( ' All events in all event pipelines have been processed!' );
            }

            this.eventPipelines = newEventPipelines;
        }

        // handle the UI thread event pipeline separately
        if ( this.uiThreadPipeline.length > 0 )
        {
            const newEventPipeline :bz.Event[] = [];

            let pipelineBlocked :boolean = false;
            for ( const event of this.uiThreadPipeline )
            {
                if ( pipelineBlocked )
                {
                    newEventPipeline.push( event );
                }
                else
                {
                    const eventProcessed :boolean  = this.launchEvent( event );
                    if ( !eventProcessed )
                    {
                        pipelineBlocked = true;
                        newEventPipeline.push( event );

                        bz.Debug.event.log( '  Event is blocking the UI-event pipeline.' );
                    }
                }
            }

            this.uiThreadPipeline = newEventPipeline;
        }
    }

    /** ****************************************************************************************************************
    *   Determines all hit points of the given array of hit points that will be impacted by the specified shot.
    *
    *   @param hitPoints All hit points that possibly collide with the shot.
    *   @param shot      The shot that caused all hit points.
    *******************************************************************************************************************/
    private static determineImpactHitPoints( hitPoints:bz.HitPoint[], shot:bz.Shot ) : bz.HitPoint[]
    {
        let impactHitPoints:bz.HitPoint[] = [];

        if ( shot.isWallBreaking() )
        {
            impactHitPoints = hitPoints;
        }
        else
        {
            const nearestHitPoint:bz.HitPoint = bz.HitPoint.determineNearestHitPoint( hitPoints );

            if ( nearestHitPoint !== null )
            {
                impactHitPoints.push( nearestHitPoint );
            }
        }

        return impactHitPoints;
    }
}

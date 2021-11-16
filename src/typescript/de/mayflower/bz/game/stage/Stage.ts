import * as bz from '../..';
import { InteractionType } from '../..';

/** ********************************************************************************************************************
*   Represents a custom stage set.
***********************************************************************************************************************/
export abstract class Stage
{
    /** The game instance. */
    private readonly game               :bz.Game                    = null;
    /** The scene instance of the game instance. */
    private readonly scene              :bz.Scene                   = null;

    /** A collection of all walls in this stage. */
    private readonly walls              :bz.Wall[]                  = [];
    /** A collection of all items in this stage. */
    private readonly items              :bz.Item[]                  = [];
    /** A collection of all bots in this stage. */
    private readonly bots               :bz.Bot[]                   = [];
    /** A collection of all sprites that appear in this stage. */
    private readonly sprites            :bz.Sprite[]                = [];
    /** A collection of all lights that appear in this stage. */
    private readonly lights             :BABYLON.Light[]            = [];
    /** A collection of all shadowGenerators that appear in this stage. */
    private readonly shadowGenerators   :BABYLON.ShadowGenerator[]  = [];
    /** A collection of all bullet holes in this stage. */
    private readonly bulletHoles        :bz.BulletHole[]            = [];
    /** A collection of all debug meshes in this stage. */
    private readonly debugMeshes        :BABYLON.Mesh[]             = [];

    /** The stage config. */
    private          config             :bz.StageConfig             = null;
    /** The camera system that manages all scene cameras. */
    private          cameraSystem       :bz.CameraSystem            = null;
    /** The player instance. */
    private          player             :bz.Player                  = null;
    /** The skybox that surrounds the whole stage. */
    private          skybox             :BABYLON.Mesh               = null;

    /** Handles all occuring pipeline events in a monitored way at the end of the render()-cycle.  */
    private         eventPipelines      :bz.Event[][]               = [];

    /** ****************************************************************************************************************
    *   Creates a new custom stage.
    *
    *   @param game          The game instance.
    *******************************************************************************************************************/
    public constructor( game :bz.Game )
    {
        this.game  = game;
        this.scene = game.getScene();
    }

    /** ****************************************************************************************************************
    *   Creates the stage config that is applied on initializing this stage.
    *******************************************************************************************************************/
    protected abstract createStageConfig() : bz.StageConfig;

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
    public init( playerStartup:BABYLON.Vector3, startupRotation:BABYLON.Vector3 ) : void
    {
        // create stage config
        this.config = this.createStageConfig();

        // assign scene colors from config
        this.scene.getNativeScene().ambientColor = this.config.ambientColor;
        this.scene.getNativeScene().clearColor   = this.config.sceneBgColor;

        // create all stage contents
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.scene, this.config.ambientColor );
        this.createStageContents( meshFactory );

        // set player startup position and rotation if desired
        if ( playerStartup !== null )
        {
            this.player.setPosition( playerStartup );
        }
        if ( startupRotation !== null )
        {
            this.player.setRotation( startupRotation );
        }

        // create cameras and set initial cam
        this.cameraSystem = this.createCameraSystem();
        this.setActiveCamera( this.config.initialCamera );

        // add debug axis
        if ( bz.SettingDebug.DEBUG_COORDINATE_AXIS_ENABLED )
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
        for ( const item of this.items )
        {
            item.render();
        }

        // render event pipeline
        if ( this.eventPipelines.length > 0 )
        {
            for ( const eventPipeline of this.eventPipelines )
            {
                for ( const event of eventPipeline )
                {
                    this.launchEvent( event );
                }
            }
            this.eventPipelines = [];
        }
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
        for ( const item of this.items )
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
            this.debugMeshes.push( shot.createDebugLine( this.scene ) );
        }

        // determine all hit points without hurting the game objects
        const hitPoints:bz.HitPoint[] = this.determineAllHitPoints( shot );
        bz.Debug.fire.log( ' Gathered [' + String( hitPoints.length ) + '] hit points' );

        // determine all hit points impacted by the shot
        const impactHitPoints:bz.HitPoint[] = Stage.determineImpactHitPoints( hitPoints, shot );

        // impact all hit points
        for ( const impactHitPoint of impactHitPoints )
        {
            const bulletHole:bz.BulletHole = impactHitPoint.causeImpact
            (
                this.scene,
                this.config.ambientColor,
                shot.getDamage()
            );
            this.addBulletHole( bulletHole );
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
        const hitPoints:bz.HitPoint[] = this.determineAllHitPoints( interaction );
        bz.Debug.player.log( ' Gathered [' + String( hitPoints.length ) + '] interaction hit points' );

        // get the nearest interaction hit point
        const impactHitPoints:bz.HitPoint[] = Stage.determineImpactHitPoints( hitPoints, interaction );
        bz.Debug.player.log( ' Gathered [' + String( impactHitPoints.length ) + '] nearest hitpoint' );

        // impact all hit points
        for ( const impactHitPoint of impactHitPoints )
        {
            const hitGameObject = impactHitPoint.getGameObject();

            if (
                hitGameObject instanceof bz.Wall
                && hitGameObject.interactionEvents !== null
                && !(
                    hitGameObject.interactionType === InteractionType.ONCE
                    && hitGameObject.alreadyInteractedwith
                )
            )
            {
                hitGameObject.alreadyInteractedwith = true;

                this.eventPipelines.push( hitGameObject.interactionEvents );
            }
        }
    }

    /** ****************************************************************************************************************
    *   Delivers the current selected index of the pause menu.
    *
    *   @return The current active pause menu index.
    *******************************************************************************************************************/
    public getPauseMenuIndex() : number
    {
        return this.game.getGUI().getPauseMenuIndex();
    }

    /** ****************************************************************************************************************
    *   Sets the active index for the pause menu.
    *
    *   @param index The index of the pause menu item to set.
    *******************************************************************************************************************/
    public setPauseMenuIndex( index:number ) : void
    {
        this.game.getGUI().setPauseMenuIndex( index );
    }

    /** ****************************************************************************************************************
    *   Alters the pause state for all sprites.
    *
    *   @param pause The pause state to assign.
    *******************************************************************************************************************/
    public setSpritePause( pause:boolean ) : void
    {
        for ( const sprite of this.sprites )
        {
            sprite.setPause( pause );
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
    *   Adds a wall to the stage.
    *
    *   @param wall The wall to add to this stage.
    *******************************************************************************************************************/
    public addWall( wall:bz.Wall ) : void
    {
        this.walls.push( wall );
    }

    /** ****************************************************************************************************************
    *   Returns the according scene.
    *
    *   @return The scene this stage belongs to.
    *******************************************************************************************************************/
    protected getScene() : bz.Scene
    {
        return this.scene;
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
        this.skybox = new bz.MeshFactory( this.scene, this.config.ambientColor ).createSkyBoxCube( file, alpha );
    }

    /** ****************************************************************************************************************
    *   Adds a sprite to the stage.
    *
    *   @param sprite The sprite to add to this stage.
    *******************************************************************************************************************/
    protected addSprite( sprite:bz.Sprite ) : void
    {
        this.sprites.push( sprite );
    }

    /** ****************************************************************************************************************
    *   Adds an item to the stage.
    *
    *   @param item The item to add to this stage.
    *******************************************************************************************************************/
    protected addItem( item:bz.Item ) : void
    {
        this.items.push( item );
    }

    /** ****************************************************************************************************************
    *   Adds a light to the stage.
    *
    *   @param light The light to add to this stage.
    *******************************************************************************************************************/
    protected addLight( light:BABYLON.Light ) : void
    {
        this.lights.push( light );
    }

    /** ****************************************************************************************************************
    *   Adds a bot to the stage.
    *
    *   @param bot The bot to add to this stage.
    *******************************************************************************************************************/
    protected addBot( bot:bz.Item ) : void
    {
        this.bots.push( bot );
    }

    /** ****************************************************************************************************************
    *   Adds a shadow generator for the specified shadow light.
    *******************************************************************************************************************/
    protected addShadowGenerator( light:BABYLON.IShadowLight ) : void
    {
        if ( !bz.SettingEngine.ENABLE_SHADOWS ) {
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
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.scene, this.config.ambientColor );

        this.debugMeshes.push
        (
            // axis x
            meshFactory.createLine
            (
                new BABYLON.Vector3( 0.0,  0.0, 0.0 ),
                new BABYLON.Vector3( bz.SettingDebug.DEBUG_COORDINATE_AXIS_LENGTH, 0.0, 0.0 ),
                bz.SettingColor.COLOR_RGBA_RED_OPAQUE
            ),

            // axis y
            meshFactory.createLine
            (
                new BABYLON.Vector3( 0.0, 0.0,  0.0 ),
                new BABYLON.Vector3( 0.0, bz.SettingDebug.DEBUG_COORDINATE_AXIS_LENGTH, 0.0 ),
                bz.SettingColor.COLOR_RGBA_GREEN_OPAQUE
            ),

            // axis z
            meshFactory.createLine
            (
                new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                new BABYLON.Vector3( 0.0, 0.0, bz.SettingDebug.DEBUG_COORDINATE_AXIS_LENGTH ),
                bz.SettingColor.COLOR_RGBA_BLUE_OPAQUE
            )
        );
    }

    /** ****************************************************************************************************************
    *   Returns all hit points on all game objects of this stage on applying the specified shot.
    *   Game objects will not be damaged or hit by the shot!
    *
    *   @param shot The shot to apply onto all game objects of this stage.
    *
    *   @return All hit points this shot collides to.
    *******************************************************************************************************************/
    private determineAllHitPoints( shot:bz.Shot ) : bz.HitPoint[]
    {
        // collect all hitPoints
        let hitPoints:bz.HitPoint[] = [];

        // check collision with walls
        bz.Debug.fire.log( ' Check shot collision with [' + String( this.walls.length ) + '] walls' );
        for ( const wall of this.walls )
        {
            hitPoints = hitPoints.concat( wall.determineHitPoints( shot ) );
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

    private launchEvent( event:bz.Event ) : void
    {
        switch ( event.type )
        {
            case bz.EventType.SWITCH_TO_STAGE:
            {
                bz.Debug.stage.log( 'Launching stage switch event to:' );

                const stageSwitch :bz.EventDataStageSwitch = ( event.data as bz.EventDataStageSwitch );

                this.game.switchStage(
                    stageSwitch.targetStage,
                    stageSwitch.startupPosition,
                    stageSwitch.startupRotation
                );
                break;
            }

            case bz.EventType.SHOW_GUI_MESSAGE:
            {
                bz.Debug.stage.log( 'Showing GUI message' );

                const showGuiMessage :bz.EventDataShowGuiMessage = ( event.data as bz.EventDataShowGuiMessage );

                this.getGame().getGUI().addGuiMessage( showGuiMessage.message );

                break;
            }
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

import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a custom stage set.
***********************************************************************************************************************/
export abstract class Stage
{
    /** The game instance. */
    protected           readonly        game                    :bz.Game                               = null;
    /** The scene instance of the game instance. */
    protected           readonly        scene                   :bz.Scene                               = null;

    // TODO extract constant stage config to class StageConfig ! => all constant stage startup settings to one place!

    /** Specifies the ambient color of the babylon.JS scene and is set as the emissive color of all faces. */
    protected           readonly        ambientColor            :BABYLON.Color3                         = null;
    /** The scene background color is the clear color for the scene. */
    protected           readonly        sceneBgColor            :BABYLON.Color4                         = null;
    /** The initial camera to set for this stage. */
    protected           readonly        initialCamera           :bz.CameraType                          = null;

    /** The player instance. */
    protected                           player                  :bz.Player                              = null;
    /** The skybox that surrounds the whole stage. */
    protected                           skybox                  :BABYLON.Mesh                           = null;
    /** A collection of all walls in this stage. */
    protected           readonly        walls                   :bz.Wall[]                              = [];
    /** A collection of all items in this stage. */
    protected           readonly        items                   :bz.Item[]                              = [];
    /** A collection of all bots in this stage. */
    protected           readonly        bots                    :bz.Bot[]                               = [];
    /** A collection of all sprites that appear in this stage. */
    protected           readonly        sprites                 :bz.Sprite[]                            = [];
    /** A collection of all lights that appear in this stage. */
    protected           readonly        lights                  :BABYLON.Light[]                        = [];



    /** The camera system that manages all scene cameras. */
    protected                           cameraSystem            :bz.CameraSystem                        = null;
    /** A collection of all shadowGenerators that appear in this stage. */
    protected                           shadowGenerators        :BABYLON.ShadowGenerator[]              = [];

    /** A collection of all bullet holes in this stage. */
    private             readonly        bulletHoles             :bz.BulletHole[]                        = [];
    /** A collection of all debug meshes in this stage. */
    private             readonly        debugMeshes             :BABYLON.Mesh[]                         = [];

    /** ****************************************************************************************************************
    *   Creates a new custom stage.
    *
    *   @param game          The game instance.
    *   @param ambientColor  The ambient color of the babylon.JS scene that is set as EMISSIVE color for all faces.
    *   @param sceneBgColor  The background color of the babylon.JS scene.
    *   @param initialCamera The initial camera for this stage.
    *******************************************************************************************************************/
    protected constructor
    (
        game          :bz.Game,
        ambientColor  :BABYLON.Color3,
        sceneBgColor  :BABYLON.Color4,
        initialCamera :bz.CameraType
    )
    {
        this.game          = game;
        this.scene         = game.getScene();

        this.ambientColor  = ambientColor;
        this.sceneBgColor  = sceneBgColor;
        this.initialCamera = initialCamera;
    }

    /** ****************************************************************************************************************
    *   Creates the camera system that manages all cameras that appear in this stage.
    *
    *   @return The camera system for this stage.
    *******************************************************************************************************************/
    protected abstract createCameraSystem() : bz.CameraSystem;

    /** ****************************************************************************************************************
    *   Handles stage specific keys.
    *******************************************************************************************************************/
    protected abstract handleStageKeys() : void;

    /** ****************************************************************************************************************
    *   Creates all stage contents.
    *******************************************************************************************************************/
    protected abstract createStageContents() : void;

    /** ****************************************************************************************************************
    *   Creates all shadow generators that appear in this stage.
    *
    *   @return All shadow generators that appear in this stage.
    *******************************************************************************************************************/
    protected abstract createShadowGenerators() : BABYLON.ShadowGenerator[];

    /** ****************************************************************************************************************
    *   Sets up shadows for all meshes.
    *******************************************************************************************************************/
    protected abstract setupShadows() : void;

    /** ****************************************************************************************************************
    *   Inits the stage.
    *******************************************************************************************************************/
    public init() : void
    {
        // assign scene colors
        this.scene.getNativeScene().ambientColor = this.ambientColor;
        this.scene.getNativeScene().clearColor   = this.sceneBgColor;

        // create all stage contents
        this.createStageContents();

        // create camera system and set initial camera
        this.cameraSystem  = this.createCameraSystem();
        this.setActiveCamera( this.initialCamera );

        // create shadow generators
        if ( bz.SettingEngine.ENABLE_SHADOWS )
        {
            this.shadowGenerators = this.createShadowGenerators();
            this.setupShadows();
        }

        // create debug axis
        if ( bz.SettingDebug.DEBUG_COORDINATE_AXIS_ENABLED )
        {
            this.createCoordinalAxis();
        }
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

        // determine impact hit points
        const impactHitPoints:bz.HitPoint[] = Stage.determineImpactHitPoints( hitPoints, shot );

        // impact all hit points
        for ( const impactHitPoint of impactHitPoints )
        {
            const bulletHole:bz.BulletHole = impactHitPoint.causeImpact
            (
                this.scene,
                this.ambientColor,
                shot.getDamage()
            );
            this.addBulletHole( bulletHole );
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
    *   Sets the player for this stage.
    *
    *   @param player The player to set to this stage.
    *******************************************************************************************************************/
    protected setPlayer( player:bz.Player ) : void
    {
        this.player = player;
    }

    /** ****************************************************************************************************************
    *   Adds a skybox to the stage. TODO rename all to 'stage'
    *******************************************************************************************************************/
    protected setSkybox( file:bz.SkyBoxFile, alpha:number ) : void
    {
        this.skybox = new bz.MeshFactory( this.scene ).createSkyBoxCube( file, alpha );
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
    *   Adds a wall to the stage.
    *
    *   @param wall The wall to add to this stage.
    *******************************************************************************************************************/
    protected addWall( wall:bz.Wall ) : void
    {
        this.walls.push( wall );
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
    *   Sets up the coordinal axis lines. X Y and Z axes are aligned by the LEFT HAND RULE.
    *
    *   @return A collection of all meshes that build the coordinal axis lines.
    *******************************************************************************************************************/
    private createCoordinalAxis() : void
    {
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.scene );

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
        bz.Debug.fire.log( ' Checking shot collision with [' + String( this.walls.length ) + '] walls' );
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

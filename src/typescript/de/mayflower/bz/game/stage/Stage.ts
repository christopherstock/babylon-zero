import * as bz from '../..';

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
    public init() : void
    {
        // create stage config
        this.config = this.createStageConfig();

        // assign scene colors from config
        this.scene.getNativeScene().ambientColor = this.config.ambientColor;
        this.scene.getNativeScene().clearColor   = this.config.sceneBgColor;

        // create all stage contents
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.scene, this.config.ambientColor );
        this.createStageContents( meshFactory );

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
                this.config.ambientColor,
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
    protected getScene() : bz.Scene
    {
        return this.scene;
    }

    /** ****************************************************************************************************************
    *   Returns the according config.
    *
    *   @return The config for this stage.
    *******************************************************************************************************************/
    protected getConfig() : bz.StageConfig
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

    protected addRoomWalls(
        meshFactory    :bz.MeshFactory,
        position       :BABYLON.Vector3,
        size           :BABYLON.Vector3,
        rotZ           :number,
        textureWall    :bz.Texture,
        textureFloor   :bz.Texture,
        textureCeiling :bz.Texture,
        doorsX1        :number[] = [],
        windowsX1      :number[] = []
    )
    : void
    {
        // TODO to SettingEngine
        const FLOOR_OFFSET_Y :number = ( 5 * bz.SettingEngine.FACE_DEPTH );
/*
        // wall X1 - door frames
        for ( const doorX1 of doorsX1 )
        {
            roomWalls.push(

                // wall X1
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            meshFactory.createBox
                            (
                                new BABYLON.Vector3( ( doorX1 + ( ( size.x - bz.SettingEngine.DOOR_SIZE ) / 2 ) ), ( position.y + size.y / 2 ), position.z ),
                                textureWall,
                                new BABYLON.Vector3( bz.SettingEngine.DOOR_SIZE, size.y, bz.SettingEngine.WALL_DEPTH ),
                                bz.PhysicSet.STATIC,
                                1.0,
                                bz.MeshAnchor.CENTER_XYZ,
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                            ),
                        ]
                    )
                ),

            );
        }
*/
        // wall X1 - window frames


        // wall X1
        const wallX1 :bz.Wall = new bz.Wall
        (
            this,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( position.x, position.y, position.z ),
                        textureWall,
                        new BABYLON.Vector3( size.x, size.y, bz.SettingEngine.WALL_DEPTH ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ
                    ),
                ]
            )
        );

        // wall X2
        const wallX2 :bz.Wall = new bz.Wall
        (
            this,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( position.x, position.y, ( position.z + size.z ) ),
                        textureWall,
                        new BABYLON.Vector3( size.x, size.y, bz.SettingEngine.WALL_DEPTH ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ
                    ),
                ]
            )
        );

        // wall Z1
        const wallZ1 :bz.Wall = new bz.Wall
        (
            this,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( position.x, position.y, position.z ),
                        textureWall,
                        new BABYLON.Vector3( size.z, size.y, bz.SettingEngine.WALL_DEPTH ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ
                    ),
                ]
            )
        );

        // wall Z2
        const wallZ2 :bz.Wall = new bz.Wall
        (
            this,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( ( position.x + size.x ), position.y, ( position.z + size.z ) ),
                        textureWall,
                        new BABYLON.Vector3( size.z, size.y, bz.SettingEngine.WALL_DEPTH ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ
                    ),
                ]
            )
        );

        // ceiling
        const ceiling :bz.Wall = new bz.Wall
        (
            this,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( position.x, ( position.y + size.y ), position.z ),
                        textureCeiling,
                        new BABYLON.Vector3( size.x, bz.SettingEngine.FACE_DEPTH, size.z ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                    ),
                ]
            )
        );

        // floor
        const floor :bz.Wall = new bz.Wall
        (
            this,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( position.x, ( position.y + FLOOR_OFFSET_Y ), position.z ),
                        textureFloor,
                        new BABYLON.Vector3( size.x, bz.SettingEngine.FACE_DEPTH, size.z ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                    ),
                ]
            )
        )

        // rotate all Z walls by 90.0° around pivot
        wallZ1.getModel().rotateAroundAxisY( position.x, position.z, -90.0 );
        wallZ2.getModel().rotateAroundAxisY( ( position.x + size.x ), ( position.z + size.z ), 90.0 );

        const roomWalls :bz.Wall[] = [];
        roomWalls.push(
            wallX1,
            wallX2,
            wallZ1,
            wallZ2,
            ceiling,
            floor
        );

        // rotate ALL walls around pivot
        for ( const roomWall of roomWalls ) {
            roomWall.getModel().rotateAroundAxisY( position.x, position.z, rotZ );
        }

        // add all walls to stage
        for ( const roomWall of roomWalls ) {
            this.addWall( roomWall );
        }
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

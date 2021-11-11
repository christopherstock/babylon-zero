import * as bz from '../../..';

/** ********************************************************************************************************************
*   Represents the game scene. It wraps the native babylon.JS scene and physics engine
*   and contains loaders for all resource systems ( materials/textures, sprites, sounds, models ).
***********************************************************************************************************************/
export class Scene
{
    /** The current babylon.JS scene. */
    private babylonScene            :BABYLON.Scene                      = null;
    /** The physics plugin being used in the scene. */
    private physicsPlugin           :BABYLON.IPhysicsEnginePlugin       = null;

    /** The material system. */
    private materialSystem          :bz.MaterialSystem                  = null;
    /** The sprite system. */
    private spriteSystem            :bz.SpriteSystem                    = null;
    /** The sound system. */
    private soundSystem             :bz.SoundSystem                     = null;
    /** The mesh import system. */
    private modelSystem             :bz.ModelSystem                     = null;

    /** The callback to invoke when the scene is fully loaded. */
    private onLoadingComplete       :() => void                         = null;

    /** Specifies if the physics are currently running. */
    private physicsRunning          :boolean                            = false;

    /** ****************************************************************************************************************
    *   Inits the babylon.JS scene.
    *
    *   @param engine            The game engine.
    *   @param onLoadingComplete The callback to invoke when the scene is fully loaded.
    *******************************************************************************************************************/
    public init( engine:bz.Engine, onLoadingComplete:() => void ) : void
    {
        this.onLoadingComplete = onLoadingComplete;

        // create babylon.JS scene
        this.babylonScene = engine.createNewScene();

        // set default scene clear color
        this.babylonScene.clearColor = bz.SettingColor.COLOR_RGBA_BLACK_OPAQUE;

        // enable debug collisions for free debug camera
        this.babylonScene.collisionsEnabled = bz.SettingDebug.DEBUG_CAMERA_ENABLE_COLLISIONS;

        // show the babylon.JS debug layer
        if ( bz.SettingDebug.SHOW_SCENE_DEBUG_PANEL )
        {
            this.babylonScene.debugLayer.show().then(
                () :void => {
                    // no need to handle this promise fullfillment
                }
            ).catch(
                () :void => {
                    // no need to catch this promise error
                }
            );
        }

        // create physics engine
        this.createPhysicsEngine();

        // init all materials
        bz.Debug.init.log( 'Init materials' );
        this.materialSystem = new bz.MaterialSystem( bz.Texture.ALL_TEXTURES );
        this.materialSystem.load( this.babylonScene );

        // init all sprites
        bz.Debug.init.log( 'Init sprites' );
        this.spriteSystem = new bz.SpriteSystem( bz.SpriteFile.ALL_SPRITE_FILES );
        this.spriteSystem.load( this.babylonScene );

        // init all sounds
        bz.Debug.init.log( 'Init sounds' );
        this.soundSystem = new bz.SoundSystem(
            bz.SoundFile.ALL_SOUND_FILES,
            () => { this.onSoundsLoaded(); }
        );
        this.soundSystem.load( this.babylonScene );
    }

    /** ****************************************************************************************************************
    *   Delivers a reference to the native babylon.JS scene.
    *
    *   @return The babylon.JS scene.
    *******************************************************************************************************************/
    public getNativeScene() : BABYLON.Scene
    {
        return this.babylonScene;
    }

    /** ****************************************************************************************************************
    *   Delivers the material system.
    *
    *   @return The material system.
    *******************************************************************************************************************/
    public getMaterialSystem() : bz.MaterialSystem
    {
        return this.materialSystem;
    }

    /** ****************************************************************************************************************
    *   Delivers the sprite system.
    *
    *   @return The sprite system.
    *******************************************************************************************************************/
    public getSpriteSystem() : bz.SpriteSystem
    {
        return this.spriteSystem;
    }

    /** ****************************************************************************************************************
    *   Delivers the model system.
    *
    *   @return The model system.
    *******************************************************************************************************************/
    public getModelSystem() : bz.ModelSystem
    {
        return this.modelSystem;
    }

    /** ****************************************************************************************************************
    *   Delivers the sound system.
    *
    *   @return The sound system.
    *******************************************************************************************************************/
    public getSoundSystem() : bz.SoundSystem
    {
        return this.soundSystem;
    }

    /** ****************************************************************************************************************
    *   Renders the babylon.JS scene.
    *******************************************************************************************************************/
    public render() : void
    {
        this.babylonScene.render();
    }

    /** ****************************************************************************************************************
    *   Toggles the state of the physics engine.
    *******************************************************************************************************************/
    public togglePhysics() : void
    {
        this.physicsRunning = !this.physicsRunning;

        this.enablePhysics( this.physicsRunning );
    }

    /** ****************************************************************************************************************
    *   Enables or disables physics for the native physics engine.
    *
    *   @param enabled Specifies if the physics engine shall be enabled or disabled.
    *******************************************************************************************************************/
    public enablePhysics( enabled:boolean ) : void
    {
        bz.Debug.physic.log( 'Set physics engine enabled [' + String( enabled ) + ']' );

        if ( enabled )
        {
            this.physicsPlugin.setTimeStep( bz.SettingEngine.PHYSIC_TIME_STEP_DEFAULT );
            this.physicsRunning = true;
        }
        else
        {
            this.physicsPlugin.setTimeStep( bz.SettingEngine.PHYSIC_TIME_STEP_PAUSED );
            this.physicsRunning = false;
        }
    }

    /** ****************************************************************************************************************
    *   Enables fog for the native scene.
    *
    *   @param color   The fog color to set or <code>null</code> if no fog shall be set.
    *   @param density The fog density.
    *******************************************************************************************************************/
    public enableFog( color:BABYLON.Color3, density:number ) : void
    {
        // Fog Mode 'LINEAR' is faster!
        this.babylonScene.fogMode    = BABYLON.Scene.FOGMODE_EXP2;
        this.babylonScene.fogColor   = color;

        // for exponential mode
        this.babylonScene.fogDensity = density;
/*
        // for linear mode
        this.babylonScene.fogStart = 20.0;
        this.babylonScene.fogEnd = 60.0;
*/
    }

    /** ****************************************************************************************************************
    *   Disables fog for the native scene.
    *******************************************************************************************************************/
    public disableFog() : void
    {
        this.babylonScene.fogMode = BABYLON.Scene.FOGMODE_NONE;
    }

    /** ****************************************************************************************************************
    *   Constructs the physics engine for the babylon.JS scene.
    *******************************************************************************************************************/
    private createPhysicsEngine() : void
    {
        // create physics plugin
        this.physicsPlugin = new BABYLON.CannonJSPlugin
        (
            true,
            bz.SettingEngine.PHYSIC_ENGINE_ITERATIONS
        );

        // stop physics engine immediately
        this.enablePhysics( false );

        // enable physics engine and stop it immediately in order to prevent unwanted startup impulses!
        this.babylonScene.enablePhysics
        (
            bz.SettingEngine.PHYSIC_GLOBAL_STAGE_GRAVITY,
            this.physicsPlugin
        );
    }

    /** ****************************************************************************************************************
    *   Being invoked when all sounds are loaded completely.
    *******************************************************************************************************************/
    private onSoundsLoaded() : void
    {
        // init model importer
        bz.Debug.init.log( 'Init model importer' );
        this.modelSystem = new bz.ModelSystem
        (
            bz.ModelFile.ALL_MESH_FILES,
            this.onLoadingComplete
        );
        this.modelSystem.load( this.babylonScene );
    }
}

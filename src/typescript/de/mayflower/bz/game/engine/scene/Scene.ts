
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Represents the game scene. It wraps the native babylon.JS scene and physics engine
    *   and contains loaders for all resource systems ( materials/textures, sprites, sounds, models ).
    *******************************************************************************************************************/
    export class Scene
    {
        /** The current babylon.JS scene. */
        private                     babylonScene                :BABYLON.Scene                      = null;
        /** The physics plugin for the cannon.js physics engine. */
        private                     physicsPlugin               :BABYLON.CannonJSPlugin             = null;

        /** The material system. */
        private                     materialSystem              :bz.MaterialSystem                  = null;
        /** The sprite system. */
        private                     spriteSystem                :bz.SpriteSystem                    = null;
        /** The sound system. */
        private                     soundSystem                 :bz.SoundSystem                     = null;
        /** The mesh import system. */
        private                     modelSystem                 :bz.ModelSystem                     = null;

        /** The callback to invoke when the scene is fully loaded. */
        private                     onLoadingComplete           :() => void                         = null;

        /** Specifies if the physics are currently running. */
        private                     physicsRunning              :boolean                            = false;

        /** ************************************************************************************************************
        *   Inits the babylon.JS scene.
        *
        *   @param scene             The new babylon.JS scene.
        *   @param onLoadingComplete The callback to invoke when the scene is fully loaded.
        ***************************************************************************************************************/
        public init( scene:BABYLON.Scene, onLoadingComplete:() => void ) : void
        {
            this.onLoadingComplete = onLoadingComplete;

            // create babylon.JS scene
            this.babylonScene = scene;

            // create physics plugin
            const ITERATIONS:number = 30;
            this.physicsPlugin = new BABYLON.CannonJSPlugin( true, ITERATIONS );

            // enable physics engine
            this.babylonScene.enablePhysics
            (
                bz.SettingStage.STAGE_GRAVITY_GLOBAL,
                this.physicsPlugin
            );

            // set default scene clear color
            this.babylonScene.clearColor = bz.SettingColor.COLOR_RGBA_BLACK_OPAQUE;

            // enable debug collisions for free debug camera
            this.babylonScene.collisionsEnabled = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;

            // show the babylon.JS debug layer
            if ( bz.SettingDebug.SHOW_SCENE_DEBUG_PANEL )
            {
                this.babylonScene.debugLayer.show()
            }

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
            this.soundSystem = new bz.SoundSystem( bz.SoundFile.ALL_SOUND_FILES, this.onSoundsLoaded );
            this.soundSystem.load( this.babylonScene );
        }

        /** ************************************************************************************************************
        *   Delivers a reference to the babylon.JS scene.
        *
        *   @return The babylon.JS scene.
        ***************************************************************************************************************/
        public getNativeScene() : BABYLON.Scene
        {
            return this.babylonScene;
        }

        /** ************************************************************************************************************
        *   Delivers the material system.
        *
        *   @return The material system.
        ***************************************************************************************************************/
        public getMaterialSystem() : bz.MaterialSystem
        {
            return this.materialSystem;
        }

        /** ************************************************************************************************************
        *   Delivers the sprite system.
        *
        *   @return The sprite system.
        ***************************************************************************************************************/
        public getSpriteSystem() : bz.SpriteSystem
        {
            return this.spriteSystem;
        }

        /** ************************************************************************************************************
        *   Delivers the model system.
        *
        *   @return The model system.
        ***************************************************************************************************************/
        public getModelSystem() : bz.ModelSystem
        {
            return this.modelSystem;
        }

        /** ************************************************************************************************************
        *   Delivers the sound system.
        *
        *   @return The sound system.
        ***************************************************************************************************************/
        public getSoundSystem() : bz.SoundSystem
        {
            return this.soundSystem;
        }

        /** ************************************************************************************************************
        *   Renders the babylon.JS scene.
        ***************************************************************************************************************/
        public render() : void
        {
            this.babylonScene.render();
        }

        /** ************************************************************************************************************
        *   Toggles the state of the physics engine.
        ***************************************************************************************************************/
        public togglePhysics() : void
        {
            this.physicsRunning = !this.physicsRunning;

            this.enablePhysics( this.physicsRunning );
        }

        /** ************************************************************************************************************
        *   Enables or disables physics for the native physics engine.
        *
        *   @param enabled Specifies if the physics engine shall be enabled or disabled.
        ***************************************************************************************************************/
        public enablePhysics( enabled:boolean ) : void
        {
            if ( enabled )
            {
                this.physicsPlugin.setTimeStep( bz.SettingEngine.PHYSICS_TIME_STEP_DEFAULT );
                this.physicsRunning = true;
            }
            else
            {
                this.physicsPlugin.setTimeStep( bz.SettingEngine.PHYSICS_TIME_STEP_PAUSED );
                this.physicsRunning = false;
            }
        }

        /** ************************************************************************************************************
        *   Being invoked when all sounds are loaded completely.
        ***************************************************************************************************************/
        private onSoundsLoaded=() : void =>
        {
            // init model importer
            bz.Debug.init.log( 'Init model importer' );
            this.modelSystem = new bz.ModelSystem
            (
                bz.ModelFile.ALL_MESH_FILES,
                this.onLoadingComplete
            );
            this.modelSystem.load( this.babylonScene );
        };
    }


    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Wraps the native babylon.JS scene and physics engine and represents the game scene.
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

        /** ************************************************************************************************************
        *   Inits the babylon.JS scene.
        *
        *   @param engine The babylon.JS engine instance.
        ***************************************************************************************************************/
        public init( engine:BABYLON.Engine ) : void
        {
            // create babylon.JS scene
            this.babylonScene = new BABYLON.Scene( engine );

            // create physics plugin
            this.physicsPlugin = new BABYLON.CannonJSPlugin( true, 30 );

            // enable physics engine
            this.babylonScene.enablePhysics
            (
                bz.SettingStage.STAGE_GRAVITY_GLOBAL,
                this.physicsPlugin
            );
            this.setPhysicalTimeStep( bz.SettingEngine.PHYSICS_TIME_STEP_DEFAULT );

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
            this.materialSystem = new bz.MaterialSystem();
            this.materialSystem.init( this.babylonScene );

            // init all sprites
            bz.Debug.init.log( 'Init sprites' );
            this.spriteSystem = new bz.SpriteSystem();
            this.spriteSystem.init( this.babylonScene );

            // init all sounds
            bz.Debug.init.log( 'Init sounds' );
            this.soundSystem = new bz.SoundSystem( bz.SoundFile.ALL_SOUND_FILES, this.onSoundsLoaded );
            this.soundSystem.loadSounds( this.babylonScene );
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
        *   Sets the time step for the physical engine.
        *
        *   @param timeStep The time step to set.
        ***************************************************************************************************************/
        public setPhysicalTimeStep( timeStep:number ) : void
        {
            this.physicsPlugin.setTimeStep( timeStep );
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
                bz.Main.game.onInitGameEngineCompleted
            );
            this.modelSystem.loadModels( this.babylonScene );
        };
    }

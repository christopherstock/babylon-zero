
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Wraps the native babylon.JS scene and physics engine and represents the game scene.
    *******************************************************************************************************************/
    export class Scene
    {
        /** The current babylon.JS scene. */
        private                     babylonScene                :BABYLON.Scene              = null;

        /** The physics plugin for the cannon.js physics engine. */
        private                     physicsPlugin               :BABYLON.CannonJSPlugin     = null;

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
        }

        /** ************************************************************************************************************
        *   Delivers a reference to the babylon.JS scene.
        *
        *   @return The babylon.JS scene.
        ***************************************************************************************************************/
        public getScene() : BABYLON.Scene
        {
            return this.babylonScene;
        }

        /** ************************************************************************************************************
        *   Renders the babylon.JS scene.
        ***************************************************************************************************************/
        public renderScene() : void
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
    }

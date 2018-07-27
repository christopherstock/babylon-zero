
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Specifies the game scene.
    *******************************************************************************************************************/
    export class Scene
    {
        /** The current babylon.JS scene. */
        private                     babylonScene                :BABYLON.Scene              = null;

        /** ************************************************************************************************************
        *   Inits the babylon.JS scene.
        ***************************************************************************************************************/
        public init() : void
        {
            // create babylon.JS scene
            this.babylonScene = new BABYLON.Scene( bz.Main.game.engine.babylonEngine );

            // enable physics engine
            this.babylonScene.enablePhysics
            (
                bz.SettingStage.STAGE_GRAVITY_GLOBAL,
                new BABYLON.CannonJSPlugin( true, 30 )
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
        *   Assigns controls to the scene.
        ***************************************************************************************************************/
        public assignControls() : void
        {
            this.babylonScene.onPointerDown = bz.Main.game.engine.pointerSystem.assignPointerDown;
        }

        /** ************************************************************************************************************
        *   Renders the babylon.JS scene.
        ***************************************************************************************************************/
        public renderScene() : void
        {
            this.babylonScene.render();
        }
    }

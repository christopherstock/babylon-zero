
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

            // set ambient color ( defaults to black .. no effect ? )
            this.babylonScene.ambientColor = bz.SettingGame.COLOR_WHITE;

            // enable physics engine
            this.babylonScene.enablePhysics
            (
                bz.SettingGame.STAGE_GLOBAL_GRAVITY,
                new BABYLON.CannonJSPlugin( true, 30 )
            );

            // set scene bg color
            this.babylonScene.clearColor = bz.SettingGame.COLOR_BLACK_OPAQUE_RGBA;

            // enable debug collisions for free debug camera
            this.babylonScene.collisionsEnabled = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;
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

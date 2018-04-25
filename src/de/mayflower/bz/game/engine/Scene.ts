
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Specifies the game scene.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Scene
    {
        /** The current babylon.JS scene. */
        private                     babylonScene                :BABYLON.Scene              = null;

        /***************************************************************************************************************
        *   Inits the babylon.JS scene.
        ***************************************************************************************************************/
        public init() : void
        {
            // create babylon.JS scene
            this.babylonScene = new BABYLON.Scene( bz.Main.game.engine.babylonEngine );

            // set ambient color ( defaults to black .. no effect ? )
            this.babylonScene.ambientColor = bz.SettingGame.COLOR_WHITE;

            // set physics engine
            this.babylonScene.enablePhysics
            (
/*
                // gravity for physics will stop any gravity for all scene objects ??
                new BABYLON.Vector3( 0, -5.0, 0 ),
                new BABYLON.OimoJSPlugin()
*/
            );

            // enable collisions
            this.babylonScene.collisionsEnabled = true;
/*
            // gravity for camera won't work if enabled!
            this.babylonScene.gravity = new BABYLON.Vector3( 0, bz.SettingGame.GRAVITY, 0 );
*/
            // set clear color
            this.babylonScene.clearColor = bz.SettingGame.COLOR_ORANGE_MAYFLOWER;
        }

        /***************************************************************************************************************
        *   Delivers a reference to the babylon.JS scene.
        *
        *   @return The babylon.JS scene.
        ***************************************************************************************************************/
        public getScene() : BABYLON.Scene
        {
            return this.babylonScene;
        }

        /***************************************************************************************************************
        *   Assigns controls to the scene.
        ***************************************************************************************************************/
        public assignControls() : void
        {
            this.babylonScene.onPointerDown = bz.Main.game.engine.pointer.assignPointerDown;
        }

        /***************************************************************************************************************
        *   Renders the babylon.JS scene.
        ***************************************************************************************************************/
        public renderScene() : void
        {
            this.babylonScene.render();
        }
    }

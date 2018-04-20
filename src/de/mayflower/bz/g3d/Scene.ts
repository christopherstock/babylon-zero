
    import * as bz from '..';

    /*******************************************************************************************************************
    *   Specifies the game scene.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Scene
    {
        /** The current babylon.JS scene. TODO private! */
        public                      babylonScene                :BABYLON.Scene              = null;

        public init() : void
        {
            this.babylonScene = new BABYLON.Scene( bz.Main.game.engine.babylonEngine );

            this.babylonScene.enablePhysics( null, new BABYLON.OimoJSPlugin() );
        }
    }

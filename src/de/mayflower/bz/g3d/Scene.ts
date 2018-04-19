
    import * as bz from '..';

    /*******************************************************************************************************************
    *   Specifies the game scene.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Scene
    {
        public          static                  scene                   :BABYLON.Scene              = null;

        /***************************************************************************************************************
        *   Constructs and fills the scene.
        ***************************************************************************************************************/
        public static createScene()
        {
            //create scene
            Scene.scene = new BABYLON.Scene( bz.Game.engine );
        }

        /***************************************************************************************************************
        *   Being invoked when the scene is set up.
        ***************************************************************************************************************/
        public static initSceneCompleted()
        {
            bz.Debug.init.log( "> Init scene completed" );




            // bz.Game.canvas.getCanvas().style.opacity = "1";



            //NOW hide the loading UI!
            bz.Game.engine.hideLoadingUI();

            //assign controls
            Scene.scene.activeCamera.attachControl( bz.Game.canvas.getCanvas() );
            Scene.scene.onPointerDown = bz.Pointer.assignPointerDown;

            //launch render loop ?? required ??
            bz.Debug.init.log( "Starting the render loop." );
            bz.Game.engine.runRenderLoop( bz.Game.render );
        }
    }

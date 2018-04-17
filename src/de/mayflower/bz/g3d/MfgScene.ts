
    import * as bz from '..';

    /*****************************************************************************
    *   Specifies the game scene.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class MfgScene
    {
        public          static                  scene                   :BABYLON.Scene              = null;

        /*****************************************************************************
        *   Constructs and fills the scene.
        *****************************************************************************/
        public static createScene()
        {
            //create scene
            MfgScene.scene = new BABYLON.Scene( bz.Game.engine );
        }

        /*****************************************************************************
        *   Being invoked when the scene is set up.
        *****************************************************************************/
        public static initSceneCompleted()
        {
            bz.Debug.init.log( "> Init scene completed" );


            // TODO ??
            bz.Game.canvas.getCanvas().style.opacity = "1";



            //NOW hide the loading UI!
            bz.Game.engine.hideLoadingUI();

            //assign controls
            MfgScene.scene.activeCamera.attachControl( bz.Game.canvas.getCanvas() );
            MfgScene.scene.onPointerDown = bz.MfgPointer.assignPointerDown;

            //launch render loop ?? required ??
            bz.Debug.init.log( "Starting the render loop." );
            bz.Game.engine.runRenderLoop( bz.MfgGame.render );
        }
    }

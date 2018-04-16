
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
            MfgScene.scene            = new BABYLON.Scene( bz.MfgInit.engine );
        }

        /*****************************************************************************
        *   Being invoked when the scene is set up.
        *****************************************************************************/
        public static initSceneCompleted()
        {
            bz.MfgDebug.init.log( "> Init scene completed" );

            bz.MfgInit.canvas.style.opacity = "1";

            //NOW hide the loading UI!
            bz.MfgInit.engine.hideLoadingUI();

            //assign controls
            MfgScene.scene.activeCamera.attachControl( bz.MfgInit.canvas );
            MfgScene.scene.onPointerDown = bz.MfgPointer.assignPointerDown;

            //launch render loop ?? required ??
            bz.MfgDebug.init.log( "Starting the render loop." );
            bz.MfgInit.engine.runRenderLoop( bz.MfgGame.render );
        }
    }

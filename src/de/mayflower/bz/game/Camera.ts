
    import * as bz from '..';

    /*******************************************************************************************************************
    *   Specifies the camera control.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Camera
    {
        public              static      camera              :BABYLON.FreeCamera             = null;

        /***************************************************************************************************************
        *   Sets up the scene camera.
        *
        *   @param  startupPosition     The camera startup position.
        *   @param  startupTarget       The camera startup target.
        ***************************************************************************************************************/
        public static init( startupPosition:BABYLON.Vector3, startupTarget:BABYLON.Vector3 )
        {
            Camera.camera = new BABYLON.FreeCamera( "Camera", startupPosition, bz.Scene.scene );

            Camera.camera.setTarget( startupTarget );

            Camera.camera.checkCollisions = true;
            Camera.camera.applyGravity    = true;

            //Set the ellipsoid around the camera (e.g. your player's size)
            Camera.camera.ellipsoid = new BABYLON.Vector3
            (
                bz.SettingGame.PLAYER_SIZE_XZ,
                bz.SettingGame.PLAYER_SIZE_Y,
                bz.SettingGame.PLAYER_SIZE_XZ
            );
        }
    }

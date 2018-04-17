
    import * as bz from '..';

    /*****************************************************************************
    *   Specifies the paramount part of the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class MfgCamera
    {
        public              static      camera              :BABYLON.FreeCamera             = null;

        /*****************************************************************************
        *   Sets up the scene camera.
        *
        *   @param  startupPosition     The camera startup position.
        *   @param  startupTarget       The camera startup target.
        *****************************************************************************/
        public static init( startupPosition:BABYLON.Vector3, startupTarget:BABYLON.Vector3 )
        {
            MfgCamera.camera = new BABYLON.FreeCamera( "Camera", startupPosition, bz.MfgScene.scene );

            MfgCamera.camera.setTarget( startupTarget );

            MfgCamera.camera.checkCollisions = true;
            MfgCamera.camera.applyGravity    = true;

            //Set the ellipsoid around the camera (e.g. your player's size)
            MfgCamera.camera.ellipsoid = new BABYLON.Vector3
            (
                bz.SettingEngine.PLAYER_SIZE_XZ,
                bz.SettingEngine.PLAYER_SIZE_Y,
                bz.SettingEngine.PLAYER_SIZE_XZ
            );
        }
    }

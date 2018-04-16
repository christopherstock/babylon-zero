
    import * as bz from '../..';

    /*****************************************************************************
    *   Handles different level sets.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class MfgLevel
    {
        constructor( cameraStartup:BABYLON.Vector3, cameraTarget:BABYLON.Vector3, clearColor:BABYLON.Color3 )
        {
            bz.MfgCamera.init( cameraStartup, cameraTarget );

            bz.MfgScene.scene.clearColor = clearColor;
            bz.MfgScene.scene.gravity    = new BABYLON.Vector3( 0, bz.MfgSettings.GRAVITY, 0 );
        }
    }

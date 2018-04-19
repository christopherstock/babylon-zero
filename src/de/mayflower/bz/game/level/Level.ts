
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Handles different level sets.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Level
    {
        constructor( cameraStartup:BABYLON.Vector3, cameraTarget:BABYLON.Vector3, clearColor:BABYLON.Color4 )
        {
            bz.Camera.init( cameraStartup, cameraTarget );

            bz.Scene.scene.clearColor = clearColor;
            bz.Scene.scene.gravity    = new BABYLON.Vector3( 0, bz.SettingGame.GRAVITY, 0 );
        }
    }

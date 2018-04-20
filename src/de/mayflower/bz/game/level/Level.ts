
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Represents a custom level set.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Level
    {
        /*******************************************************************************************************************
        *   Handles different level sets.
        *
        *   @author     Christopher Stock
        *   @version    0.0.1
        *******************************************************************************************************************/
        constructor( cameraStartup:BABYLON.Vector3, cameraTarget:BABYLON.Vector3, clearColor:BABYLON.Color4 )
        {
            // TODO fix this weak design!

            bz.Main.game.engine.camera.init( cameraStartup, cameraTarget );

            bz.Main.game.engine.scene.babylonScene.clearColor = clearColor;
            bz.Main.game.engine.scene.babylonScene.gravity    = new BABYLON.Vector3( 0, bz.SettingGame.GRAVITY, 0 );
        }
    }

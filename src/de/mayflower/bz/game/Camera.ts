
    import * as bz from '..';

    /*******************************************************************************************************************
    *   Specifies the camera control.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Camera
    {
        /** The instance of the babylon.JS camera. */
        public                          camera                  :BABYLON.FreeCamera                     = null;

        /***************************************************************************************************************
        *   Sets up the scene camera.
        *
        *   @param  startupPosition     The camera startup position.
        *   @param  startupTarget       The camera startup target.
        ***************************************************************************************************************/
        constructor( startupPosition:BABYLON.Vector3, startupTarget:BABYLON.Vector3 )
        {
            // Change camera controls
            this.camera = new BABYLON.FreeCamera( "Camera", startupPosition, bz.Main.game.engine.scene.getScene() );

            this.camera.setTarget( startupTarget );

            this.camera.checkCollisions = true;
            this.camera.applyGravity    = true;

            //Set the ellipsoid around the camera (the size of the player in our case)
            this.camera.ellipsoid = new BABYLON.Vector3
            (
                bz.SettingGame.PLAYER_SIZE_XZ,
                bz.SettingGame.PLAYER_SIZE_Y,
                bz.SettingGame.PLAYER_SIZE_XZ
            );


            this.camera.attachControl( bz.Main.game.engine.canvas.getCanvas() );

            this.camera.keysUp.push(    bz.KeyCodes.KEY_UP    );
            this.camera.keysDown.push(  bz.KeyCodes.KEY_DOWN  );
            this.camera.keysLeft.push(  bz.KeyCodes.KEY_LEFT  );
            this.camera.keysRight.push( bz.KeyCodes.KEY_RIGHT );



            // bz.Main.game.engine.scene.getScene().activeCamera = ..


            // this.camera.lockedTarget = .. !
        }
    }

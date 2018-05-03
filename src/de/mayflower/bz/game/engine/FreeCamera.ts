
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Specifies the camera control.
    *******************************************************************************************************************/
    export class Camera
    {
        /** The instance of the babylon.JS camera. */
        public                  freeCamera                  :BABYLON.FreeCamera                     = null;

        /***************************************************************************************************************
        *   Sets up the scene camera.
        *
        *   @param  scene               The babylon.JS scene.
        *   @param  startupPosition     The camera startup position.
        *   @param  startupTarget       The camera startup target.
        ***************************************************************************************************************/
        constructor( scene:BABYLON.Scene, startupPosition:BABYLON.Vector3, startupTarget:BABYLON.Vector3 )
        {
            // Change camera controls
            this.freeCamera = new BABYLON.FreeCamera( "Camera", startupPosition, scene );

            this.freeCamera.setTarget( startupTarget );

            this.freeCamera.checkCollisions = true;
            this.freeCamera.applyGravity    = true;

            //Set the ellipsoid around the camera (the size of the player in our case)
            this.freeCamera.ellipsoid = new BABYLON.Vector3
            (
                bz.SettingGame.PLAYER_SIZE_XZ,
                bz.SettingGame.PLAYER_SIZE_Y,
                bz.SettingGame.PLAYER_SIZE_XZ
            );
            this.freeCamera.ellipsoidOffset = new BABYLON.Vector3( 0.0, 0.0, 0.0 );



            // attach debug controls ..
            this.freeCamera.attachControl( bz.Main.game.engine.canvas.getCanvas() );

            this.freeCamera.keysUp.push(    bz.KeyCodes.KEY_UP    );
            this.freeCamera.keysDown.push(  bz.KeyCodes.KEY_DOWN  );
            this.freeCamera.keysLeft.push(  bz.KeyCodes.KEY_LEFT  );
            this.freeCamera.keysRight.push( bz.KeyCodes.KEY_RIGHT );




            // bz.Main.game.engine.scene.getScene().activeCamera = ..
            // this.camera.lockedTarget = .. !
        }
    }

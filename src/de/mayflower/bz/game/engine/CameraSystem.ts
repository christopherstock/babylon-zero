
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Specifies all scene cameras.
    *******************************************************************************************************************/
    export class CameraSystem
    {
        /** The free controllable babylon.JS camera. */
        public                  freeDebugCamera                     :BABYLON.FreeCamera                     = null;
        /** The stationary and targeted babylon.JS camera. */
        public                  stationaryTargetCamera              :BABYLON.TargetCamera                   = null;

        /***************************************************************************************************************
        *   Sets up the scene camera.
        *
        *   @param  scene               The babylon.JS scene.
        *   @param  startupPosition     The camera startup position.
        *   @param  startupTarget       The camera startup target.
        ***************************************************************************************************************/
        constructor( scene:BABYLON.Scene, startupPosition:BABYLON.Vector3, startupTarget:BABYLON.Vector3 )
        {
            this.createFreeDebugCamera(        scene, startupPosition, startupTarget );
            this.createStationaryTargetCamera( scene, startupPosition, startupTarget );



        }

        /***************************************************************************************************************
        *   Creates a free and non-colliding debug camera.
        *
        *   @param  scene               The babylon.JS scene.
        *   @param  startupPosition     The camera startup position.
        *   @param  startupTarget       The camera startup target.
        ***************************************************************************************************************/
        private createFreeDebugCamera( scene:BABYLON.Scene, startupPosition:BABYLON.Vector3, startupTarget:BABYLON.Vector3 ) : void
        {
            this.freeDebugCamera = new BABYLON.FreeCamera( "freeCamera", startupPosition, scene );

            this.freeDebugCamera.setTarget( startupTarget );
/*
            this.debugCamera.checkCollisions = true;
            this.debugCamera.applyGravity    = true;
*/
            this.freeDebugCamera.checkCollisions = false;
            this.freeDebugCamera.applyGravity    = false;

            //Set the ellipsoid around the camera (the size of the player in our case)
            this.freeDebugCamera.ellipsoid = new BABYLON.Vector3
            (
                bz.SettingGame.PLAYER_SIZE_XZ,
                bz.SettingGame.PLAYER_SIZE_Y,
                bz.SettingGame.PLAYER_SIZE_XZ
            );
            this.freeDebugCamera.ellipsoidOffset = new BABYLON.Vector3( 0.0, 0.0, 0.0 );

            // attach debug controls
            this.freeDebugCamera.attachControl( bz.Main.game.engine.canvas.getCanvas() );

            this.freeDebugCamera.keysUp.push(    bz.KeyCodes.KEY_UP    );
            this.freeDebugCamera.keysDown.push(  bz.KeyCodes.KEY_DOWN  );
            this.freeDebugCamera.keysLeft.push(  bz.KeyCodes.KEY_LEFT  );
            this.freeDebugCamera.keysRight.push( bz.KeyCodes.KEY_RIGHT );
        }

        /***************************************************************************************************************
        *   Creates a stationary and targeted camera.
        *
        *   @param  scene               The babylon.JS scene.
        *   @param  startupPosition     The camera startup position.
        *   @param  startupTarget       The camera startup target.
        ***************************************************************************************************************/
        private createStationaryTargetCamera( scene:BABYLON.Scene, startupPosition:BABYLON.Vector3, startupTarget:BABYLON.Vector3 ) : void
        {
            // Change camera controls
            this.stationaryTargetCamera = new BABYLON.TargetCamera( "stationaryCamera", startupPosition, scene );

            this.stationaryTargetCamera.setTarget( startupTarget );
        }





        // bz.Main.game.engine.scene.getScene().activeCamera = ..
        // this.camera.lockedTarget = .. !



/*
            var camera = new BABYLON.FollowCamera("FollowCamera", new BABYLON.Vector3(0,0,0), scene);
            camera.heightOffset = 8; //how high up from the object to place the camera
            camera.radius = 30; // how far from the object to follow
            camera.rotationOffset = 180; //rotate around the object (if it's imported strangely or you want to follow from the front)
            //camera.setTarget( myMeshObject ); //any mesh or object with a "position" Vector3        scene.activeCamera = camera; //set the active camera
*/
        public lockStationaryTargetCameraTo( mesh:BABYLON.Mesh )
        {
            this.stationaryTargetCamera.lockedTarget = mesh;




        }
    }


    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Specifies all scene cameras.
    *******************************************************************************************************************/
    export class CameraSystem
    {
        /** The instance of the babylon.JS camera used for debug purposes. */
        public                  debugCamera                     :BABYLON.FreeCamera                     = null;

        /***************************************************************************************************************
        *   Sets up the scene camera.
        *
        *   @param  scene               The babylon.JS scene.
        *   @param  startupPosition     The camera startup position.
        *   @param  startupTarget       The camera startup target.
        ***************************************************************************************************************/
        constructor( scene:BABYLON.Scene, startupPosition:BABYLON.Vector3, startupTarget:BABYLON.Vector3 )
        {
            this.createDebugCamera( scene, startupPosition, startupTarget );



        }

        /***************************************************************************************************************
        *   Creates a free and non-colliding debug camera.
        *
        *   @param  scene               The babylon.JS scene.
        *   @param  startupPosition     The camera startup position.
        *   @param  startupTarget       The camera startup target.
        ***************************************************************************************************************/
        private createDebugCamera( scene:BABYLON.Scene, startupPosition:BABYLON.Vector3, startupTarget:BABYLON.Vector3 ) : void
        {
            // Change camera controls
            this.debugCamera = new BABYLON.FreeCamera( "Camera", startupPosition, scene );

            this.debugCamera.setTarget( startupTarget );
/*
            this.freeCamera.checkCollisions = true;
            this.freeCamera.applyGravity    = true;
*/
            this.debugCamera.checkCollisions = false;
            this.debugCamera.applyGravity    = false;

            //Set the ellipsoid around the camera (the size of the player in our case)
            this.debugCamera.ellipsoid = new BABYLON.Vector3
            (
                bz.SettingGame.PLAYER_SIZE_XZ,
                bz.SettingGame.PLAYER_SIZE_Y,
                bz.SettingGame.PLAYER_SIZE_XZ
            );
            this.debugCamera.ellipsoidOffset = new BABYLON.Vector3( 0.0, 0.0, 0.0 );

            // attach debug controls ..
            this.debugCamera.attachControl( bz.Main.game.engine.canvas.getCanvas() );

            this.debugCamera.keysUp.push(    bz.KeyCodes.KEY_UP    );
            this.debugCamera.keysDown.push(  bz.KeyCodes.KEY_DOWN  );
            this.debugCamera.keysLeft.push(  bz.KeyCodes.KEY_LEFT  );
            this.debugCamera.keysRight.push( bz.KeyCodes.KEY_RIGHT );

            // bz.Main.game.engine.scene.getScene().activeCamera = ..
            // this.camera.lockedTarget = .. !




            var camera = new BABYLON.FollowCamera("FollowCamera", new BABYLON.Vector3(0,0,0), scene);
            camera.heightOffset = 8; //how high up from the object to place the camera
            camera.radius = 30; // how far from the object to follow
            camera.rotationOffset = 180; //rotate around the object (if it's imported strangely or you want to follow from the front)
            //camera.setTarget( myMeshObject ); //any mesh or object with a "position" Vector3        scene.activeCamera = camera; //set the active camera



        }

        public lockToPlayer( mesh:BABYLON.Mesh )
        {
            this.debugCamera.lockedTarget = mesh;




        }
    }

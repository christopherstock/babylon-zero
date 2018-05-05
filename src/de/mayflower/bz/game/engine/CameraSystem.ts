
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   All supplied camera types the app supports.
    *******************************************************************************************************************/
    export enum CameraType
    {
        FREE_DEBUG_CAMERA,
        STATIONARY_TARGET_CAMERA,
        FOLLOW_CAMERA,
    }

    /*******************************************************************************************************************
    *   Specifies all scene cameras.
    *******************************************************************************************************************/
    export class CameraSystem
    {
        /** The free controllable babylon.JS camera. */
        private                 freeDebugCamera                     :BABYLON.FreeCamera                     = null;

        /** The stationary and targeted babylon.JS camera. */
        public                  stationaryTargetCamera              :BABYLON.TargetCamera                   = null;
        /** The startup position for the stationary target camera. */
        public                  stationaryTargetCameraPosition      :BABYLON.Vector3                        = null;

        /** The follow babylon.JS camera. */
        public                  followCamera                        :BABYLON.FollowCamera                   = null;

        /***************************************************************************************************************
        *   Sets up the scene camera.
        *
        *   @param scene                           The babylon.JS scene.
        *   @param startupPositionFreeDebugCamera  The camera startup position for the free debug camera.
        *   @param startupPositionStationaryCamera The camera startup position for the stationary camera.
        *   @param startupTarget                   The camera startup target.
        ***************************************************************************************************************/
        constructor
        (
            scene                           :BABYLON.Scene,
            startupPositionFreeDebugCamera  :BABYLON.Vector3,
            startupPositionStationaryCamera :BABYLON.Vector3,
            startupTarget                   :BABYLON.Vector3
        )
        {
            this.createFreeDebugCamera(        scene, startupPositionFreeDebugCamera, startupTarget );
            this.createStationaryTargetCamera( scene, startupPositionStationaryCamera );
            this.createFollowCamera(           scene, startupPositionFreeDebugCamera );


        }

        public setActiveSceneCamera( scene:BABYLON.Scene, camera:CameraType )
        {
            switch ( camera )
            {
                case CameraType.FREE_DEBUG_CAMERA:
                {
                    scene.activeCamera = this.freeDebugCamera;
                    this.freeDebugCamera.attachControl( bz.Main.game.engine.canvas.getCanvas() );
                    break;
                }

                case CameraType.STATIONARY_TARGET_CAMERA:
                {
                    scene.activeCamera = this.stationaryTargetCamera;
                    this.freeDebugCamera.detachControl( bz.Main.game.engine.canvas.getCanvas() );
                    break;
                }

                case CameraType.FOLLOW_CAMERA:
                {
                    scene.activeCamera = this.followCamera;
                    this.freeDebugCamera.detachControl( bz.Main.game.engine.canvas.getCanvas() );
                    break;
                }
            }
        }

        /***************************************************************************************************************
        *   Creates a free and non-colliding debug camera.
        *
        *   @param scene           The babylon.JS scene.
        *   @param startupPosition The camera startup position.
        *   @param startupTarget   The camera startup target.
        ***************************************************************************************************************/
        private createFreeDebugCamera( scene:BABYLON.Scene, startupPosition:BABYLON.Vector3, startupTarget:BABYLON.Vector3 ) : void
        {
            this.freeDebugCamera = new BABYLON.FreeCamera( "freeCamera", startupPosition, scene );

            // set startup direction
            this.freeDebugCamera.setTarget( startupTarget );

            // disable collisions and gravity
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

            this.freeDebugCamera.keysUp.push(    bz.KeyCodes.KEY_UP    );
            this.freeDebugCamera.keysDown.push(  bz.KeyCodes.KEY_DOWN  );
            this.freeDebugCamera.keysLeft.push(  bz.KeyCodes.KEY_LEFT  );
            this.freeDebugCamera.keysRight.push( bz.KeyCodes.KEY_RIGHT );
        }

        /***************************************************************************************************************
        *   Creates a stationary and targeted camera.
        *
        *   @param scene           The babylon.JS scene.
        *   @param startupPosition The camera startup position.
        ***************************************************************************************************************/
        private createStationaryTargetCamera( scene:BABYLON.Scene, startupPosition:BABYLON.Vector3 ) : void
        {
            this.stationaryTargetCamera         = new BABYLON.TargetCamera( "stationaryCamera", startupPosition, scene );
            this.stationaryTargetCameraPosition = startupPosition;
        }

        /***************************************************************************************************************
        *   Creates a following camera.
        *
        *   @param scene           The babylon.JS scene.
        *   @param startupPosition The camera startup position.
        ***************************************************************************************************************/
        private createFollowCamera( scene:BABYLON.Scene, startupPosition:BABYLON.Vector3 ) : void
        {
            this.followCamera = new BABYLON.FollowCamera( "followCamera", startupPosition, scene );

            this.followCamera.heightOffset = 8; //how high up from the object to place the camera
            this.followCamera.radius = 30; // how far from the object to follow
            this.followCamera.rotationOffset = 180; //rotate around the object (if it's imported strangely or you want to follow from the front)
        }

        public lockStationaryTargetCameraTo( mesh:BABYLON.Mesh )
        {
            this.stationaryTargetCamera.lockedTarget = mesh;
        }

        public lockFollowCameraTo( mesh:BABYLON.Mesh )
        {
            this.followCamera.lockedTarget = mesh;
        }
    }

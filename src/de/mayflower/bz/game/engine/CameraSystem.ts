
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   All supplied camera types the app supports.
    *******************************************************************************************************************/
    export enum CameraType
    {
        FREE_DEBUG,
        STATIONARY,
        FOLLOW,
        FIRST_PERSON,
    }

    /*******************************************************************************************************************
    *   Specifies all scene cameras.
    *******************************************************************************************************************/
    export class CameraSystem
    {
        private                 activeCamera                        :CameraType                             = null;

        /** The free controllable babylon.JS camera. */
        private                 freeDebugCamera                     :BABYLON.FreeCamera                     = null;
        /** The stationary and targeted babylon.JS camera. */
        private                 stationaryCamera                    :BABYLON.TargetCamera                   = null;
        /** The follow babylon.JS camera. */
        private                 followCamera                        :BABYLON.FollowCamera                   = null;
        /** The first person babylon.JS camera. */
        private                 firstPersonCamera                   :BABYLON.FreeCamera                     = null;

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
            this.createStationaryTargetCamera( scene, startupPositionStationaryCamera               );
            this.createFollowCamera(           scene, startupPositionFreeDebugCamera                );
            this.createFirstPersonCamera(      scene                                                );
        }

        public setActiveSceneCamera( scene:BABYLON.Scene, camera:CameraType ) : void
        {
            this.activeCamera = camera;

            switch ( camera )
            {
                case CameraType.FREE_DEBUG:
                {
                    scene.activeCamera = this.freeDebugCamera;
                    this.setControlsForFreeDebugCameraEnabled( true );
                    bz.Main.game.level.player.setVisible( true );
                    break;
                }

                case CameraType.STATIONARY:
                {
                    scene.activeCamera = this.stationaryCamera;
                    this.setControlsForFreeDebugCameraEnabled( false );
                    bz.Main.game.level.player.setVisible( true );
                    break;
                }

                case CameraType.FOLLOW:
                {
                    scene.activeCamera = this.followCamera;
                    this.setControlsForFreeDebugCameraEnabled( false );
                    bz.Main.game.level.player.setVisible( true );
                    break;
                }

                case CameraType.FIRST_PERSON:
                default:
                {
                    scene.activeCamera = this.firstPersonCamera;
                    this.setControlsForFreeDebugCameraEnabled( false );
                    bz.Main.game.level.player.setVisible( false );
                    break;
                }
            }
        }

        public lockStationaryTargetCameraTo( mesh:BABYLON.Mesh ) : void
        {
            this.stationaryCamera.lockedTarget = mesh;
        }

        public lockFollowCameraTo( mesh:BABYLON.Mesh ) : void
        {
            this.followCamera.lockedTarget = mesh;
        }

        public setFirstPersonCameraInside( mesh:BABYLON.Mesh ) : void
        {
            this.firstPersonCamera.parent = mesh;
        }

        public isFirstPersonCameraActive() : boolean
        {
            return ( this.activeCamera === bz.CameraType.FIRST_PERSON );
        }

        /***************************************************************************************************************
        *   Creates a free and non-colliding debug camera.
        *
        *   @param scene           The babylon.JS scene.
        *   @param startupPosition The camera startup position.
        *   @param startupTarget   The camera startup target.
        ***************************************************************************************************************/
        private createFreeDebugCamera
        (
            scene           :BABYLON.Scene,
            startupPosition :BABYLON.Vector3,
            startupTarget   :BABYLON.Vector3
        )
        : void
        {
            this.freeDebugCamera = new BABYLON.FreeCamera( 'freeCamera', startupPosition, scene );

            // set startup direction
            this.freeDebugCamera.setTarget( startupTarget );

            // disable collisions and gravity
            this.freeDebugCamera.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;
            this.freeDebugCamera.applyGravity    = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;

            // set the ellipsoid around the camera (the size of the player in our case)
            this.freeDebugCamera.ellipsoid       = bz.SettingEngine.CAMERA_FREE_ELLIPSOID;
            this.freeDebugCamera.ellipsoidOffset = BABYLON.Vector3.Zero();

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
            this.stationaryCamera = new BABYLON.TargetCamera( 'stationaryCamera', startupPosition, scene );
        }

        /***************************************************************************************************************
        *   Creates a following camera.
        *
        *   @param scene           The babylon.JS scene.
        *   @param startupPosition The camera startup position.
        ***************************************************************************************************************/
        private createFollowCamera( scene:BABYLON.Scene, startupPosition:BABYLON.Vector3 ) : void
        {
            this.followCamera = new BABYLON.FollowCamera( 'followCamera', startupPosition, scene );

            this.followCamera.heightOffset       = bz.SettingEngine.CAMERA_FOLLOW_HEIGHT_OFFSET;
            this.followCamera.radius             = bz.SettingEngine.CAMERA_FOLLOW_RADIUS;
            this.followCamera.rotationOffset     = bz.SettingEngine.CAMERA_FOLLOW_ROTATION_OFFSET;
            this.followCamera.cameraAcceleration = bz.SettingEngine.CAMERA_FOLLOW_ACCELERATION_SPEED;
            this.followCamera.maxCameraSpeed     = bz.SettingEngine.CAMERA_FOLLOW_MAX_SPEED;
        }

        /***************************************************************************************************************
        *   Creates the first person camera.
        *
        *   @param scene           The babylon.JS scene.
        ***************************************************************************************************************/
        private createFirstPersonCamera( scene:BABYLON.Scene ) : void
        {
            this.firstPersonCamera = new BABYLON.FreeCamera
            (
                'firstPersonCamera',
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                scene
            );
        }

        private setControlsForFreeDebugCameraEnabled( enable:boolean ) : void
        {
            if ( enable )
            {
                this.freeDebugCamera.attachControl( bz.Main.game.engine.canvas.getCanvas() );
            }
            else
            {
                this.freeDebugCamera.detachControl( bz.Main.game.engine.canvas.getCanvas() );
            }
        }
    }

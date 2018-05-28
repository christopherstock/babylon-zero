
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   All supplied camera types the app supports.
    *******************************************************************************************************************/
    export enum CameraType
    {
        /** A free controllable debug camera. */
        FREE_DEBUG,
        /** A stationary level camera. */
        STATIONARY,
        /** A camera that follows the player's body. */
        FOLLOW,
        /** The first person camera being fixed in the player's head mesh. */
        FIRST_PERSON,
    }

    /** ****************************************************************************************************************
    *   Manages all scene cameras.
    *******************************************************************************************************************/
    export class CameraSystem
    {
        /** The currently active scene camera type. */
        private                 activeCameraType                    :CameraType                             = null;

        /** The free controllable babylon.JS camera. */
        private                 freeDebugCamera                     :BABYLON.FreeCamera                     = null;
        /** The stationary and targeted babylon.JS camera. */
        private                 stationaryCamera                    :BABYLON.TargetCamera                   = null;
        /** The follow babylon.JS camera. */
        private                 followCamera                        :BABYLON.FollowCamera                   = null;
        /** The first person babylon.JS camera. */
        private                 firstPersonCamera                   :BABYLON.FreeCamera                     = null;

        /** ************************************************************************************************************
        *   Sets up all scene cameras.
        *
        *   @param scene                           The babylon.JS scene.
        *   @param startupPositionFreeDebugCamera  The camera startup position for the free debug camera.
        *   @param startupPositionStationaryCamera The camera startup position for the stationary camera.
        *   @param startupTargetFreeDebugCamera    The camera startup target for the free debug camera.
        ***************************************************************************************************************/
        constructor
        (
            scene                           :BABYLON.Scene,
            startupPositionFreeDebugCamera  :BABYLON.Vector3,
            startupPositionStationaryCamera :BABYLON.Vector3,
            startupTargetFreeDebugCamera    :BABYLON.Vector3
        )
        {
            this.createFreeDebugCamera(        scene, startupPositionFreeDebugCamera, startupTargetFreeDebugCamera );
            this.createStationaryTargetCamera( scene, startupPositionStationaryCamera                              );
            this.createFollowCamera(           scene, startupPositionFreeDebugCamera                               );
            this.createFirstPersonCamera(      scene                                                               );
        }

        /** ************************************************************************************************************
        *   Sets the specified camera as the scene's active camera.
        *
        *   @param scene  The babylon.JS scene to set the active camera for.
        *   @param camera The type of camera to set as the scene's active camera.
        ***************************************************************************************************************/
        public setActiveSceneCamera( scene:BABYLON.Scene, camera:CameraType ) : void
        {
            this.activeCameraType = camera;

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

        /** ************************************************************************************************************
        *   Locks the stationary camera to the specified target.
        *
        *   @param mesh The mesh to lock the stationary camera to.
        ***************************************************************************************************************/
        public lockStationaryTargetCameraTo( mesh:BABYLON.AbstractMesh ) : void
        {
            this.stationaryCamera.lockedTarget = mesh;
        }

        /** ************************************************************************************************************
        *   Locks the follow camera to the specified target.
        *
        *   @param mesh The mesh to lock the follow camera to.
        ***************************************************************************************************************/
        public lockFollowCameraTo( mesh:BABYLON.AbstractMesh ) : void
        {
            this.followCamera.lockedTarget = mesh;
        }

        /** ************************************************************************************************************
        *   Locks the first person camera inside the specified target.
        *
        *   @param mesh The mesh to lock the first person camera to.
        ***************************************************************************************************************/
        public setFirstPersonCameraInside( mesh:BABYLON.AbstractMesh ) : void
        {
            this.firstPersonCamera.parent = mesh;
        }

        /** ************************************************************************************************************
        *   Checks if the first person camera is currently active.
        *
        *   @return <code>true</code> if the first person camera is currently active.
        ***************************************************************************************************************/
        public isFirstPersonCameraActive() : boolean
        {
            return ( this.activeCameraType === bz.CameraType.FIRST_PERSON );
        }

        /** ************************************************************************************************************
        *   Creates the free debug camera.
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

            this.freeDebugCamera.keysUp.push(    38 );
            this.freeDebugCamera.keysDown.push(  40 );
            this.freeDebugCamera.keysLeft.push(  37 );
            this.freeDebugCamera.keysRight.push( 39 );
        }

        /** ************************************************************************************************************
        *   Creates the stationary camera.
        *
        *   @param scene           The babylon.JS scene.
        *   @param startupPosition The camera startup position.
        ***************************************************************************************************************/
        private createStationaryTargetCamera( scene:BABYLON.Scene, startupPosition:BABYLON.Vector3 ) : void
        {
            this.stationaryCamera = new BABYLON.TargetCamera( 'stationaryCamera', startupPosition, scene );
        }

        /** ************************************************************************************************************
        *   Creates the follow camera.
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

        /** ************************************************************************************************************
        *   Creates the first person camera.
        *
        *   @param scene The babylon.JS scene.
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

        /** ************************************************************************************************************
        *   Enables or disables the debug controls for the free debug camera.
        *
        *   @param enable Whether to enable the debug controls or not.
        ***************************************************************************************************************/
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

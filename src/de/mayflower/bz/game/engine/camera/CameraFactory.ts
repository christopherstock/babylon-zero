
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Creates instances for all scene cameras.
    *******************************************************************************************************************/
    export abstract class CameraFactory
    {
        /** The ID for the next created camera to assign. */
        private     static      nextCameraId            :number                         = 0;

        /** ************************************************************************************************************
        *   Creates the free debug camera.
        *
        *   @param scene           The babylon.JS scene.
        *   @param startupPosition The camera startup position.
        *   @param startupTarget   The camera startup target.
        ***************************************************************************************************************/
        public static createFreeCamera
        (
            scene           :BABYLON.Scene,
            startupPosition :BABYLON.Vector3,
            startupTarget   :BABYLON.Vector3
        )
        : BABYLON.FreeCamera
        {
            const freeCamera:BABYLON.FreeCamera = new BABYLON.FreeCamera
            (
                bz.CameraFactory.getNextCameraId(),
                startupPosition,
                scene
            );

            // set startup direction
            freeCamera.setTarget( startupTarget );

            // disable collisions and gravity
            freeCamera.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;
            freeCamera.applyGravity    = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;

            // set the ellipsoid around the camera (the size of the player in our case)
            freeCamera.ellipsoid       = bz.SettingEngine.CAMERA_FREE_ELLIPSOID;
            freeCamera.ellipsoidOffset = BABYLON.Vector3.Zero();

            freeCamera.keysUp.push(    38 );
            freeCamera.keysDown.push(  40 );
            freeCamera.keysLeft.push(  37 );
            freeCamera.keysRight.push( 39 );

            return freeCamera;
        }

        /** ************************************************************************************************************
        *   Creates the stationary camera.
        *
        *   @param scene           The babylon.JS scene.
        *   @param startupPosition The camera startup position.
        ***************************************************************************************************************/
        public static createStationaryTargetCamera
        (
            scene           :BABYLON.Scene,
            startupPosition :BABYLON.Vector3
        )
        : BABYLON.TargetCamera
        {
            return new BABYLON.TargetCamera
            (
                bz.CameraFactory.getNextCameraId(),
                startupPosition,
                scene
            );
        }

        /** ************************************************************************************************************
        *   Creates the follow camera.
        *
        *   @param scene           The babylon.JS scene.
        *   @param startupPosition The camera startup position.
        *
        *   @return The follow camera.
        ***************************************************************************************************************/
        public static createFollowCamera( scene:BABYLON.Scene, startupPosition:BABYLON.Vector3 ) : BABYLON.FollowCamera
        {
            const followCamera:BABYLON.FollowCamera = new BABYLON.FollowCamera
            (
                bz.CameraFactory.getNextCameraId(),
                startupPosition,
                scene
            );

            followCamera.heightOffset       = bz.SettingEngine.CAMERA_FOLLOW_HEIGHT_OFFSET;
            followCamera.radius             = bz.SettingEngine.CAMERA_FOLLOW_RADIUS;
            followCamera.rotationOffset     = bz.SettingEngine.CAMERA_FOLLOW_ROTATION_OFFSET;
            followCamera.cameraAcceleration = bz.SettingEngine.CAMERA_FOLLOW_ACCELERATION_SPEED;
            followCamera.maxCameraSpeed     = bz.SettingEngine.CAMERA_FOLLOW_MAX_SPEED;

            return followCamera;
        }

        /** ************************************************************************************************************
        *   Creates the first person camera.
        *
        *   @param scene The babylon.JS scene.
        *
        *   @return A free camera.
        ***************************************************************************************************************/
        public static createFirstPersonCamera( scene:BABYLON.Scene ) : BABYLON.FreeCamera
        {
            return new BABYLON.FreeCamera
            (
                bz.CameraFactory.getNextCameraId(),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                scene
            );
        }

        /** ************************************************************************************************************
        *   Creates the arc rotation camera.
        *
        *   @param scene The babylon.JS scene.
        *
        *   @return An arc rotation camera.
        ***************************************************************************************************************/
        public static createArcRotateCamera( scene:BABYLON.Scene ) : BABYLON.ArcRotateCamera
        {
            return new BABYLON.ArcRotateCamera
            (
                bz.CameraFactory.getNextCameraId(),
                bz.MathUtil.degreesToRad( -20.0 ),
                bz.MathUtil.degreesToRad( 70.0  ),
                250,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                scene
            );
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new camera to create.
        *
        *   @return The next free unique id for a new camera to create.
        ***************************************************************************************************************/
        private static getNextCameraId() : string
        {
            return 'camera' + CameraFactory.nextCameraId++;
        }
    }

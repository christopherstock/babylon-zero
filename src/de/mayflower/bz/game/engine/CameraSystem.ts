
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

        public setActiveSceneCamera( scene:BABYLON.Scene, camera:CameraType )
        {
            switch ( camera )
            {
                case CameraType.FREE_DEBUG:
                {
                    scene.activeCamera = this.freeDebugCamera;
                    this.setControlsForFreeDebugCameraEnabled( true );
                    bz.Main.game.engine.level.player.setVisible( true );
                    break;
                }

                case CameraType.STATIONARY:
                {
                    scene.activeCamera = this.stationaryCamera;
                    this.setControlsForFreeDebugCameraEnabled( false );
                    bz.Main.game.engine.level.player.setVisible( true );
                    break;
                }

                case CameraType.FOLLOW:
                {
/*
                    if ( scene.activeCamera )
                    {
                        this.followCamera.position = scene.activeCamera.position;
//                        this.followCamera.setTarget( scene.activeCamera.getLeftTarget() );
                    }
*/
                    scene.activeCamera = this.followCamera;
                    this.setControlsForFreeDebugCameraEnabled( false );
                    bz.Main.game.engine.level.player.setVisible( true );
                    break;
                }

                case CameraType.FIRST_PERSON:
                {
                    scene.activeCamera = this.firstPersonCamera;
                    this.setControlsForFreeDebugCameraEnabled( false );
                    bz.Main.game.engine.level.player.setVisible( false );
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
            this.freeDebugCamera.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;
            this.freeDebugCamera.applyGravity    = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;

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
            this.stationaryCamera = new BABYLON.TargetCamera( "stationaryCamera", startupPosition, scene );
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

            this.followCamera.heightOffset       = 6;     // camera height offset
            this.followCamera.radius             = 15;    // how far from the object to follow
            this.followCamera.rotationOffset     = 180;   // offset rotation (for front following etc.)
            this.followCamera.cameraAcceleration = 0.075; // camera acceleration after target change. defaults to 0.05
            this.followCamera.maxCameraSpeed     = 10.0;  // max camera moving speed. defaults to 20.
        }

        /***************************************************************************************************************
        *   Creates the first person camera.
        *
        *   @param scene           The babylon.JS scene.
        ***************************************************************************************************************/
        private createFirstPersonCamera( scene:BABYLON.Scene ) : void
        {
            this.firstPersonCamera = new BABYLON.FreeCamera( "firstPersonCamera", new BABYLON.Vector3( 0.0, 0.0, 0.0 ), scene );
        }

        public lockStationaryTargetCameraTo( mesh:BABYLON.Mesh )
        {
            this.stationaryCamera.lockedTarget = mesh;
        }

        public lockFollowCameraTo( mesh:BABYLON.Mesh )
        {
            this.followCamera.lockedTarget = mesh;
        }

        public setFirstPersonCameraInside( mesh:BABYLON.Mesh )
        {
            this.firstPersonCamera.parent = mesh;
        }

        private setControlsForFreeDebugCameraEnabled( enable:boolean )
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

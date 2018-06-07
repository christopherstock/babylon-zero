
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Manages all scene cameras.
    *******************************************************************************************************************/
    export class CameraSystem
    {
        /** The currently active scene camera type. */
        private                         activeCameraType                :bz.CameraType                          = null;

        /** The free controllable babylon.JS camera. */
        private         readonly        freeCamera                      :BABYLON.FreeCamera                     = null;
        /** The stationary and targeted babylon.JS camera. */
        private         readonly        stationaryCamera                :BABYLON.TargetCamera                   = null;
        /** The follow babylon.JS camera. */
        private         readonly        followCamera                    :BABYLON.FollowCamera                   = null;
        /** The first person babylon.JS camera. */
        private         readonly        firstPersonCamera               :BABYLON.FreeCamera                     = null;
        /** The player that might change visibility by camera switch. */
        private         readonly        player                          :bz.Player                              = null;
        /** The HTML canvas that might change debug controls on camera switch. */
        private         readonly        canvas                          :HTMLCanvasElement                      = null;

        /** ************************************************************************************************************
        *   Sets up all scene cameras.
        *
        *   @param scene                           The babylon.JS scene.
        *   @param player                          The player that might change visibility by camera switch.
        *   @param canvas                          The HTML canvas that might change debug controls on camera switch.
        *   @param startupPositionFreeDebugCamera  The camera startup position for the free debug camera.
        *   @param startupPositionStationaryCamera The camera startup position for the stationary camera.
        *   @param startupTargetFreeDebugCamera    The camera startup target for the free debug camera.
        *   @param stationaryCameraTarget          The target node for the starionary camera.
        *   @param followCameraTarget              The target node for the follow camera.
        *   @param firstPersonCameraTarget         The target mesh for the first person camera.
        *   @param initialActiveCamera             The initial camera to set as the active camera.
        ***************************************************************************************************************/
        constructor
        (
            scene                           :BABYLON.Scene,
            player                          :bz.Player,
            canvas                          :HTMLCanvasElement,

            startupPositionFreeDebugCamera  :BABYLON.Vector3,
            startupPositionStationaryCamera :BABYLON.Vector3,
            startupTargetFreeDebugCamera    :BABYLON.Vector3,

            stationaryCameraTarget          :any,
            followCameraTarget              :any,
            firstPersonCameraTarget         :BABYLON.AbstractMesh,

            initialActiveCamera             :bz.CameraType
        )
        {
            this.player = player;
            this.canvas = canvas;

            this.freeCamera        = bz.CameraFactory.createFreeCamera
            (
                scene,
                startupPositionFreeDebugCamera,
                startupTargetFreeDebugCamera
            );
            this.stationaryCamera  = bz.CameraFactory.createStationaryTargetCamera
            (
                scene,
                startupPositionStationaryCamera
            );
            this.followCamera      = bz.CameraFactory.createFollowCamera
            (
                scene,
                startupPositionFreeDebugCamera
            );
            this.firstPersonCamera = bz.CameraFactory.createFirstPersonCamera
            (
                scene
            );

            // assign camera targets
            if ( stationaryCameraTarget != null )
            {
                this.lockStationaryTargetCameraTo( stationaryCameraTarget );
            }
            if ( followCameraTarget != null )
            {
                this.lockFollowCameraTo( followCameraTarget );
            }
            if ( firstPersonCameraTarget != null )
            {
                this.setFirstPersonCameraTo( firstPersonCameraTarget );
            }

            this.setActiveCamera( scene, initialActiveCamera );
        }

        /** ************************************************************************************************************
        *   Sets the specified camera as the scene's active camera.
        *
        *   @param scene  The babylon.JS scene to set the active camera for.
        *   @param camera The type of camera to set as the scene's active camera.
        ***************************************************************************************************************/
        public setActiveCamera
        (
            scene  :BABYLON.Scene,
            camera :bz.CameraType
        )
        : void
        {
            this.activeCameraType = camera;

            switch ( camera )
            {
                case bz.CameraType.FREE_DEBUG:
                {
                    scene.activeCamera = this.freeCamera;
                    this.setControlsForFreeDebugCameraEnabled( true, this.canvas );

                    if ( this.player != null )
                    {
                        this.player.setVisible( true );
                    }
                    break;
                }

                case bz.CameraType.STATIONARY:
                {
                    scene.activeCamera = this.stationaryCamera;
                    this.setControlsForFreeDebugCameraEnabled( false, this.canvas );

                    if ( this.player != null )
                    {
                        this.player.setVisible( true );
                    }
                    break;
                }

                case bz.CameraType.FOLLOW:
                {
                    scene.activeCamera = this.followCamera;
                    this.setControlsForFreeDebugCameraEnabled( false, this.canvas );

                    if ( this.player != null )
                    {
                        this.player.setVisible( true );
                    }
                    break;
                }

                case bz.CameraType.FIRST_PERSON:
                default:
                {
                    scene.activeCamera = this.firstPersonCamera;
                    this.setControlsForFreeDebugCameraEnabled( false, this.canvas );

                    if ( this.player != null )
                    {
                        this.player.setVisible( false );
                    }
                    break;
                }
            }
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
        *   Removes all cameras from the babylon.JS scene.
        ***************************************************************************************************************/
        public dispose() : void
        {
            this.freeCamera.dispose();
            this.stationaryCamera.dispose();
            this.followCamera.dispose();
            this.firstPersonCamera.dispose();
        }

        /** ************************************************************************************************************
        *   Locks the stationary camera to the specified target.
        *
        *   @param mesh The mesh to lock the stationary camera to.
        ***************************************************************************************************************/
        private lockStationaryTargetCameraTo( mesh:any ) : void
        {
            this.stationaryCamera.lockedTarget = mesh;
        }

        /** ************************************************************************************************************
        *   Locks the follow camera to the specified target.
        *
        *   @param mesh The mesh to lock the follow camera to.
        ***************************************************************************************************************/
        private lockFollowCameraTo( mesh:any ) : void
        {
            this.followCamera.lockedTarget = mesh;
        }

        /** ************************************************************************************************************
        *   Locks the first person camera inside the specified target.
        *
        *   @param mesh The mesh to lock the first person camera to.
        ***************************************************************************************************************/
        private setFirstPersonCameraTo( mesh:BABYLON.AbstractMesh ) : void
        {
            this.firstPersonCamera.parent = mesh;
        }

        /** ************************************************************************************************************
        *   Enables or disables the debug controls for the free debug camera.
        *
        *   @param enable Whether to enable the debug controls or not.
        *   @param canvas The HTML canvas to enable or disable debug controls.
        ***************************************************************************************************************/
        private setControlsForFreeDebugCameraEnabled( enable:boolean, canvas:HTMLCanvasElement ) : void
        {
            if ( enable )
            {
                this.freeCamera.attachControl( canvas );
            }
            else
            {
                this.freeCamera.detachControl( canvas );
            }
        }
    }

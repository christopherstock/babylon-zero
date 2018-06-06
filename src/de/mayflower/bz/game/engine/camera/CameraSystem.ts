
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Manages all scene cameras.
    *******************************************************************************************************************/
    export class CameraSystem
    {
        /** The currently active scene camera type. */
        private                         activeCameraType                :bz.CameraType                          = null;

        /** The free controllable babylon.JS camera. */
        private         readonly        freeCamera                     :BABYLON.FreeCamera                      = null;
        /** The stationary and targeted babylon.JS camera. */
        private         readonly        stationaryCamera                :BABYLON.TargetCamera                   = null;
        /** The follow babylon.JS camera. */
        private         readonly        followCamera                    :BABYLON.FollowCamera                   = null;
        /** The first person babylon.JS camera. */
        private         readonly        firstPersonCamera               :BABYLON.FreeCamera                     = null;

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
            this.freeCamera        = bz.CameraFactory.createFreeCamera(             scene, startupPositionFreeDebugCamera, startupTargetFreeDebugCamera );
            this.stationaryCamera  = bz.CameraFactory.createStationaryTargetCamera( scene, startupPositionStationaryCamera );
            this.followCamera      = bz.CameraFactory.createFollowCamera(           scene, startupPositionFreeDebugCamera  );
            this.firstPersonCamera = bz.CameraFactory.createFirstPersonCamera(      scene                                  );
        }

        /** ************************************************************************************************************
        *   Sets the specified camera as the scene's active camera.
        *
        *   @param scene  The babylon.JS scene to set the active camera for.
        *   @param camera The type of camera to set as the scene's active camera.
        ***************************************************************************************************************/
        public setActiveSceneCamera( scene:BABYLON.Scene, camera:bz.CameraType ) : void
        {
            this.activeCameraType = camera;

            switch ( camera )
            {
                case bz.CameraType.FREE_DEBUG:
                {
                    scene.activeCamera = this.freeCamera;
                    this.setControlsForFreeDebugCameraEnabled( true );

                    if ( bz.Main.game.stage.getPlayer() != null )
                    {
                        bz.Main.game.stage.getPlayer().setVisible( true );
                    }
                    break;
                }

                case bz.CameraType.STATIONARY:
                {
                    scene.activeCamera = this.stationaryCamera;
                    this.setControlsForFreeDebugCameraEnabled( false );

                    if ( bz.Main.game.stage.getPlayer() != null )
                    {
                        bz.Main.game.stage.getPlayer().setVisible( true );
                    }
                    break;
                }

                case bz.CameraType.FOLLOW:
                {
                    scene.activeCamera = this.followCamera;
                    this.setControlsForFreeDebugCameraEnabled( false );

                    if ( bz.Main.game.stage.getPlayer() != null )
                    {
                        bz.Main.game.stage.getPlayer().setVisible( true );
                    }
                    break;
                }

                case bz.CameraType.FIRST_PERSON:
                default:
                {
                    scene.activeCamera = this.firstPersonCamera;
                    this.setControlsForFreeDebugCameraEnabled( false );

                    if ( bz.Main.game.stage.getPlayer() != null )
                    {
                        bz.Main.game.stage.getPlayer().setVisible( false );
                    }
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
        *   Enables or disables the debug controls for the free debug camera.
        *
        *   @param enable Whether to enable the debug controls or not.
        ***************************************************************************************************************/
        private setControlsForFreeDebugCameraEnabled( enable:boolean ) : void
        {
            if ( enable )
            {
                this.freeCamera.attachControl( bz.Main.game.engine.canvas.getCanvas() );
            }
            else
            {
                this.freeCamera.detachControl( bz.Main.game.engine.canvas.getCanvas() );
            }
        }
    }

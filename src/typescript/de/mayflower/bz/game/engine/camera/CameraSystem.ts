
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Offers different scene cameras.
    *******************************************************************************************************************/
    export class CameraSystem
    {
        /** Next ID to assign for animation creation. TODO to animation system. */
        private     static              nextAnimationId                 :number                                 = 0;

        /** The currently active camera type. */
        private                         activeCameraType                :bz.CameraType                          = null;

        // TODO remove custom camera journey system

        /** The current camera that is on a journey. */
        private                         journeyCamera                   :BABYLON.Camera                         = null;
        /** The current target point for the journey camera. */
        private                         journeyTarget                   :BABYLON.Vector3                        = null;
        /** The current speed for the journey camera. */
        private                         journeySpeed                    :number                                 = 0;

        /** The free controllable babylon.JS (debug) camera. */
        private         readonly        freeCamera                      :BABYLON.FreeCamera                     = null;
        /** The stationary and targeted babylon.JS camera. */
        private         readonly        stationaryCamera                :BABYLON.TargetCamera                   = null;
        /** The follow babylon.JS camera. */
        private         readonly        followCamera                    :BABYLON.FollowCamera                   = null;
        /** The first person babylon.JS camera. */
        private         readonly        firstPersonCamera               :BABYLON.FreeCamera                     = null;
        /** The babylon.JS axis camera. */
        private         readonly        arcRotateCamera                 :BABYLON.ArcRotateCamera                = null;

        /** ************************************************************************************************************
        *   Sets up all scene cameras.
        *
        *   @param scene                           The babylon.JS scene.
        *
        *   @param startupPositionFreeDebugCamera  The camera startup position for the free debug camera.
        *   @param startupPositionStationaryCamera The camera startup position for the stationary camera.
        *   @param startupTargetFreeDebugCamera    The camera startup target for the free debug camera.
        *
        *   @param stationaryCameraTarget          The target node for the starionary camera.
        *   @param followCameraTarget              The target node for the follow camera.
        *   @param firstPersonCameraTarget         The target mesh for the first person camera.
        ***************************************************************************************************************/
        public constructor
        (
            scene                           :BABYLON.Scene,

            startupPositionFreeDebugCamera  :BABYLON.Vector3,
            startupPositionStationaryCamera :BABYLON.Vector3,
            startupTargetFreeDebugCamera    :BABYLON.Vector3,

            stationaryCameraTarget          :any,
            followCameraTarget              :any,
            firstPersonCameraTarget         :BABYLON.AbstractMesh
        )
        {
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
                scene,
                bz.SettingPlayer.PLAYER_DEFAULT_FIELD_OF_VIEW
            );

            this.arcRotateCamera = bz.CameraFactory.createArcRotateCamera
            (
                scene,
                0.0,
                0.0,
                200,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                100.0,
                400.0
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
        }

        /** ************************************************************************************************************
        *   Sets the specified camera as the scene's active camera.
        *
        *   @param cameraType The type of camera to set as the scene's active camera.
        *   @param scene      The babylon.JS scene to set the active camera for.
        *   @param canvas     The HTML canvas that might change debug controls on camera switch.
        *   @param player     The player instance that will show or hide according to the currently set camera.
        *   @param gui        The stage GUI that may be shown or hidden according to the selected camera.
        ***************************************************************************************************************/
        public setActiveCamera
        (
            cameraType :bz.CameraType,
            scene      :BABYLON.Scene,
            canvas     :HTMLCanvasElement,
            player     :bz.Player,
            gui        :bz.GUI
        )
        : void
        {
            this.activeCameraType = cameraType;
            scene.activeCamera    = this.getCameraFromType( cameraType );

            switch ( cameraType )
            {
                case bz.CameraType.FREE_DEBUG:
                {
                    this.setCameraControlsEnabled( this.freeCamera,      true,  canvas );
                    this.setCameraControlsEnabled( this.arcRotateCamera, false, canvas );

                    if ( player != null ) player.setVisible( true );
                    if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( false );

                    break;
                }

                case bz.CameraType.STATIONARY:
                {
                    this.setCameraControlsEnabled( this.freeCamera,      false, canvas );
                    this.setCameraControlsEnabled( this.arcRotateCamera, false, canvas );

                    if ( player != null ) player.setVisible( true );
                    if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( false );

                    break;
                }

                case bz.CameraType.FOLLOW:
                {
                    this.setCameraControlsEnabled( this.freeCamera,      false, canvas );
                    this.setCameraControlsEnabled( this.arcRotateCamera, false, canvas );

                    if ( player != null ) player.setVisible( true );
                    if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( false );

                    break;
                }

                case bz.CameraType.FIRST_PERSON:
                {
                    this.setCameraControlsEnabled( this.freeCamera,      false, canvas );
                    this.setCameraControlsEnabled( this.arcRotateCamera, false, canvas );

                    if ( player != null ) player.setVisible( false );
                    if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( true );

                    break;
                }

                case bz.CameraType.ARC_ROTATE:
                {
                    this.setCameraControlsEnabled( this.freeCamera,      false, canvas );
                    this.setCameraControlsEnabled( this.arcRotateCamera, true,  canvas );

                    if ( player != null ) player.setVisible( true );
                    if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( false );

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
        *   Set light to arc rotation camera.
        *
        *   @param light The light to append to the arc rotation camera by setting the camera as parent.
        ***************************************************************************************************************/
        public setLightToArcRotationCamera( light:BABYLON.Light ) : void
        {
            light.parent = this.arcRotateCamera;
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
            this.arcRotateCamera.dispose();
        }

        /** ************************************************************************************************************
        *   Returns the arc rotation camera from the system.
        *
        *   @raram The arc rotating camera.
        ***************************************************************************************************************/
        public getArcRotateCamera() : BABYLON.ArcRotateCamera
        {
            return this.arcRotateCamera;
        }

        /** ************************************************************************************************************
        *   Sets the field of view for the first person camera.
        *
        *   @param fov The field of view to set for the first person camera.
        ***************************************************************************************************************/
        public setFirstPersonCameraFieldOfView( fov:number ) : void
        {
            this.firstPersonCamera.fov = fov;
        }

        /** ************************************************************************************************************
        *   Starts a camera journey for the specified camera. TODO remove!
        *
        *   @param cameraType     The camera type to perform a journey with.
        *   @param targetPosition The target position for the specified journey camera.
        *   @param speed          The speed of the journey camera.
        ***************************************************************************************************************/
        public startJourney
        (
            cameraType     :bz.CameraType,
            targetPosition :BABYLON.Vector3,
            speed          :number
        )
        : void
        {
            this.journeyCamera = this.getCameraFromType( cameraType );
            this.journeyTarget = targetPosition;
            this.journeySpeed  = speed;
        }

        /** ************************************************************************************************************
        *   Renders the camera system for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            this.animateJourneyCamera();
        }

        /** ************************************************************************************************************
        *   Animates the position of the specified camera to the desired destination.
        *
        *   @param cameraType  The camera to animate.
        *   @param destination The destination of the camera position.
        *   @param onFinish    Being invoked when the target is reached.
        ***************************************************************************************************************/
        public animateCameraPosition
        (
            cameraType  :bz.CameraType,
            destination :BABYLON.Vector3,
            onFinish    : () => void
        )
        : void
        {
            const camera     :BABYLON.Camera    = this.getCameraFromType( cameraType );

            // TODO param speed in seconds!
            const frameCount :number            = 120;

            const ease       :BABYLON.CubicEase = new BABYLON.CubicEase();

            ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
            BABYLON.Animation.CreateAndStartAnimation
            (
                CameraSystem.createNextAnimationId(),
                camera,
                'position',
                bz.SettingEngine.CAMERA_ANIMATION_FRAMES_PER_SECOND,
                frameCount,
                camera.position,
                destination,
                0,
                ease,
                onFinish
            );
        }

        /** ************************************************************************************************************
        *   Animates the target of the specified camera to the desired destination.
        *
        *   @param camera      The target camera.
        *   @param destination The destination of the camera target.
        *   @param speed       The moving speed of the camera in distance per tick.
        *   @param onFinish    Being invoked when the target is reached.
        ***************************************************************************************************************/
        public animateCameraTarget
        (
            camera      :BABYLON.ArcRotateCamera,
            destination :BABYLON.Vector3,
            speed       : number,
            onFinish    :() => void
        )
        : void
        {
            const frameCount :number            = 200;
            const ease       :BABYLON.CubicEase = new BABYLON.CubicEase();

            ease.setEasingMode( BABYLON.EasingFunction.EASINGMODE_EASEINOUT );
            BABYLON.Animation.CreateAndStartAnimation
            (
                CameraSystem.createNextAnimationId(),
                camera,
                'target',
                speed,
                frameCount,
                camera.target,
                destination,
                0,
                ease,
                onFinish
            );
        }

        /** ************************************************************************************************************
        *   Returns the according camera for the specified camera type.
        *
        *   @param cameraType The camera type to deliver the according camera for.
        *
        *   @return The concrete camera instance for the asked camera type.
        ***************************************************************************************************************/
        private getCameraFromType( cameraType:bz.CameraType ) : BABYLON.Camera
        {
            switch ( cameraType )
            {
                case bz.CameraType.ARC_ROTATE:
                {
                    return this.arcRotateCamera;
                }

                case bz.CameraType.FIRST_PERSON:
                {
                    return this.firstPersonCamera;
                }

                case bz.CameraType.FOLLOW:
                {
                    return this.followCamera;
                }

                case bz.CameraType.FREE_DEBUG:
                {
                    return this.freeCamera;
                }

                case bz.CameraType.STATIONARY:
                {
                    return this.stationaryCamera;
                }
            }

            return null;
        }

        /** ************************************************************************************************************
        *   Animates the journey camera for one tick if the game loop. TODO remove!
        ***************************************************************************************************************/
        private animateJourneyCamera() : void
        {
            // only if a journey camera is assigned
            if ( this.journeyCamera != null )
            {
                const diff:BABYLON.Vector3 = this.journeyCamera.position.subtract( this.journeyTarget );
                diff.scaleInPlace( this.journeySpeed );

                this.journeyCamera.position.subtractInPlace( diff );

                // check target reach
                if
                (
                       Math.abs( diff.x as number ) < bz.SettingEngine.CAMERA_JOURNEY_MINIMUM_MOVE.x
                    && Math.abs( diff.y as number ) < bz.SettingEngine.CAMERA_JOURNEY_MINIMUM_MOVE.y
                    && Math.abs( diff.z as number ) < bz.SettingEngine.CAMERA_JOURNEY_MINIMUM_MOVE.z
                )
                {
                    bz.Debug.camera.log( 'Target reached' );

                    // unassign journey camera
                    this.journeyCamera = null;
                    this.journeyTarget = null;
                    this.journeySpeed  = 0.0;
                }
            }
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
        *   Enables or disables the debug controls for the specified camera.
        *
        *   @param camera The camera to attach or detach control to.
        *   @param enable Whether to enable the canvas controls or not.
        *   @param canvas The HTML canvas to enable or disable debug controls.
        ***************************************************************************************************************/
        private setCameraControlsEnabled
        (
            camera :BABYLON.Camera,
            enable :boolean,
            canvas :HTMLCanvasElement
        )
        : void
        {
            if ( enable )
            {
                camera.attachControl( canvas );
            }
            else
            {
                camera.detachControl( canvas );
            }
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new animation to create.
        *
        *   @return The next free unique id for a new animation to create.
        ***************************************************************************************************************/
        private static createNextAnimationId() : string
        {
            return 'animation' + CameraSystem.nextAnimationId++;
        }
    }

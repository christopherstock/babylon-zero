
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Offers different scene cameras.
    *******************************************************************************************************************/
    export class CameraSystem
    {
        /** Next ID to assign for animation creation. */
        private     static              nextCameraAnimationId           :number                                 = 0;

        /** The currently active camera type. */
        private                         activeCameraType                :bz.CameraType                          = null;

        /** The native babylon.JS scene these cameras belong to. */
        private             readonly    scene                           :BABYLON.Scene                          = null;
        /** The canvas this camera system is connected with. */
        private             readonly    canvas                          :HTMLCanvasElement                      = null;

        /** The free controllable babylon.JS (debug) camera. */
        private             readonly    freeCamera                      :BABYLON.FreeCamera                     = null;
        /** The stationary and targeted babylon.JS camera. */
        private             readonly    stationaryCamera                :BABYLON.TargetCamera                   = null;
        /** The follow babylon.JS camera. */
        private             readonly    followCamera                    :BABYLON.FollowCamera                   = null;
        /** The first person babylon.JS camera. */
        private             readonly    firstPersonCamera               :BABYLON.FreeCamera                     = null;
        /** The babylon.JS axis camera. */
        private             readonly    arcRotateCamera                 :BABYLON.ArcRotateCamera                = null;

        /** ************************************************************************************************************
        *   Sets up all scene cameras.
        *
        *   @param scene                           The babylon.JS scene to create these cameras for.
        *   @param canvas                          The canvas this camera system is linked to.
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
            canvas                          :HTMLCanvasElement,

            startupPositionFreeDebugCamera  :BABYLON.Vector3,
            startupPositionStationaryCamera :BABYLON.Vector3,
            // TODO change with previous parameter
            startupTargetFreeDebugCamera    :BABYLON.Vector3,

            stationaryCameraTarget          :any,
            followCameraTarget              :any,
            firstPersonCameraTarget         :BABYLON.AbstractMesh
        )
        {
            this.scene  = scene;
            this.canvas = canvas;

            this.freeCamera        = bz.CameraFactory.createFreeCamera
            (
                this.scene,
                startupPositionFreeDebugCamera,
                startupTargetFreeDebugCamera
            );
            this.stationaryCamera  = bz.CameraFactory.createStationaryTargetCamera
            (
                this.scene,
                startupPositionStationaryCamera
            );
            this.followCamera      = bz.CameraFactory.createFollowCamera
            (
                this.scene,
                startupPositionFreeDebugCamera
            );
            this.firstPersonCamera = bz.CameraFactory.createFirstPersonCamera
            (
                this.scene,
                bz.SettingEngine.DEFAULT_FIELD_OF_VIEW
            );
            this.arcRotateCamera = bz.CameraFactory.createArcRotateCamera
            (
                this.scene,
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
        *   Delivers the active babylon.JS camera.
        *
        *   @return The currently active native camera.
        ***************************************************************************************************************/
        public getActiveCamera() : BABYLON.Camera
        {
            return this.scene.activeCamera;
        }

        /** ************************************************************************************************************
        *   Sets the specified camera as the scene's active camera.
        *
        *   @param cameraType The type of camera to set as the scene's active camera.
        *   @param player     The player instance that will show or hide according to the currently set camera.
        *   @param gui        The stage GUI that may be shown or hidden according to the selected camera.
        ***************************************************************************************************************/
        public setActiveCamera
        (
            cameraType :bz.CameraType,
            player     :bz.Player,
            gui        :bz.GUI
        )
        : void
        {
            this.activeCameraType   = cameraType;
            this.scene.activeCamera = this.getCameraFromType( cameraType );

            switch ( cameraType )
            {
                case bz.CameraType.FREE_DEBUG:
                {
                    this.setCameraControlsEnabled( this.freeCamera,      true,  this.canvas );
                    this.setCameraControlsEnabled( this.arcRotateCamera, false, this.canvas );

                    if ( player != null ) player.setVisible( true );
                    if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( false );

                    break;
                }

                case bz.CameraType.STATIONARY:
                {
                    this.setCameraControlsEnabled( this.freeCamera,      false, this.canvas );
                    this.setCameraControlsEnabled( this.arcRotateCamera, false, this.canvas );

                    if ( player != null ) player.setVisible( true );
                    if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( false );

                    break;
                }

                case bz.CameraType.FOLLOW:
                {
                    this.setCameraControlsEnabled( this.freeCamera,      false, this.canvas );
                    this.setCameraControlsEnabled( this.arcRotateCamera, false, this.canvas );

                    if ( player != null ) player.setVisible( true );
                    if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( false );

                    break;
                }

                case bz.CameraType.FIRST_PERSON:
                {
                    this.setCameraControlsEnabled( this.freeCamera,      false, this.canvas );
                    this.setCameraControlsEnabled( this.arcRotateCamera, false, this.canvas );

                    if ( player != null ) player.setVisible( false );
                    if ( gui    != null ) gui.setFirstPlayerViewComponentsVisibility( true );

                    break;
                }

                case bz.CameraType.ARC_ROTATE:
                {
                    this.setCameraControlsEnabled( this.freeCamera,      false, this.canvas );
                    this.setCameraControlsEnabled( this.arcRotateCamera, true,  this.canvas );

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
        *   Animates the position of the specified camera to the desired destination.
        *
        *   @param cameraType  The camera to animate.
        *   @param destination The destination of the camera position.
        *   @param seconds     The seconds for the animation to take.
        *   @param ease        The easing class instance or <code>null</code> for no easing.
        *   @param onFinish    Being invoked when the target is reached.
        ***************************************************************************************************************/
        public animateCameraPosition
        (
            cameraType  :bz.CameraType,
            destination :BABYLON.Vector3,
            seconds     :number,
            ease        :BABYLON.EasingFunction,
            onFinish    :() => void
        )
        : void
        {
            const camera     :BABYLON.Camera = this.getCameraFromType( cameraType );
            const frameCount :number         = ( seconds * bz.SettingEngine.CAMERA_ANIMATION_FRAMES_PER_SECOND );

            if ( ease != null )
            {
                ease.setEasingMode( BABYLON.EasingFunction.EASINGMODE_EASEINOUT );
            }

            BABYLON.Animation.CreateAndStartAnimation
            (
                CameraSystem.createNextCameraAnimationId(),
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
        *   @param seconds     The seconds for the animation to take.
        *   @param ease        The easing class instance or <code>null</code> for no easing.
        *   @param onFinish    Being invoked when the target is reached.
        ***************************************************************************************************************/
        public animateCameraTarget
        (
            camera      :BABYLON.ArcRotateCamera,
            destination :BABYLON.Vector3,
            seconds     :number,
            ease        :BABYLON.EasingFunction,
            onFinish    :() => void
        )
        : void
        {
            const frameCount:number = ( seconds * bz.SettingEngine.CAMERA_ANIMATION_FRAMES_PER_SECOND );

            if ( ease != null )
            {
                ease.setEasingMode( BABYLON.EasingFunction.EASINGMODE_EASEINOUT );
            }

            BABYLON.Animation.CreateAndStartAnimation
            (
                CameraSystem.createNextCameraAnimationId(),
                camera,
                'target',
                bz.SettingEngine.CAMERA_ANIMATION_FRAMES_PER_SECOND,
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
        *   Tests some post processing pipelining.
        *
        *   @param engine The native babylon.JS engine that manages this pp rendering pipeline.
        ***************************************************************************************************************/
        private testPostProcessingPipeline( engine:BABYLON.Engine ) : void
        {
            const pipeline :BABYLON.PostProcessRenderPipeline = new BABYLON.PostProcessRenderPipeline
            (
                engine,
                'standardPipeline'
            );
            const effect   :BABYLON.PostProcessRenderEffect = new BABYLON.PostProcessRenderEffect
            (
                engine,
                'fxaa',
                () : BABYLON.FxaaPostProcess => {
                    return new BABYLON.FxaaPostProcess
                    (
                        'antialias',
                        2,
                        null,
                        BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
                        engine,
                        !0
                    );
                }
            );
            pipeline.addEffect( effect );
            this.scene.postProcessRenderPipelineManager.addPipeline( pipeline );

            this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(
                'standardPipeline',
                this.stationaryCamera
            );
        }

        /** ************************************************************************************************************
        *   Tests some post processing effects on the stationary camera.
        ***************************************************************************************************************/
        private testPostProcessing() : void
        {
            // black and white
            const blackAndWhite:BABYLON.BlackAndWhitePostProcess = new BABYLON.BlackAndWhitePostProcess
            (
                'BW',
                1.0,
                this.stationaryCamera
            );

            // blur
            const kernel:number = 16;
            const blur:BABYLON.BlurPostProcess = new BABYLON.BlurPostProcess
            (
                'Horizontal blur',
                new BABYLON.Vector2( 1.0, 0 ),
                kernel,
                0.25,
                this.stationaryCamera
            );

            // highlight
            const postProcess = new BABYLON.HighlightsPostProcess
            (
                'highlights',
                1.0,
                this.stationaryCamera
            );
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new animation to create.
        *
        *   @return The next free unique id for a new animation to create.
        ***************************************************************************************************************/
        private static createNextCameraAnimationId() : string
        {
            return 'cameraAnimation' + CameraSystem.nextCameraAnimationId++;
        }
    }

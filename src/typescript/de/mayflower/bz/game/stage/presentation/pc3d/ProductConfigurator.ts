
    import * as bz from '../../../..';

    /** ****************************************************************************************************************
    *   The 'product viewer' stage offers an exploration of a 3D model that can be viewed from all angles.
    *   Aditionally, predefined animations of the product can be triggered.
    *******************************************************************************************************************/
    export class ProductConfigurator extends bz.Stage
    {
        /** Referenced imported helmet. */
        private                         model                   :bz.Model                   = null;
        /** Referenced visir of the helmet. */
        private                         visor                   :BABYLON.AbstractMesh       = null;
        /** Referenced helmet of the helmet. */
        private                         helmet                  :BABYLON.AbstractMesh       = null;

        /** Referenced product presentation light. */
        private                         directionalLight        :BABYLON.DirectionalLight   = null;
        /** Flags if the helmet animation is currently running. */
        private                         animationState          :bz.HelmetState             = bz.HelmetState.CLOSED;

        /** Tests target camera animation. */
        private     readonly            camTarget               :boolean                    = false;

        /** ************************************************************************************************************
        *   Creates a new product viewer stage.
        *
        *   @param scene  The scene reference.
        *   @param canvas The canvas system this stage is displayed on.
        ***************************************************************************************************************/
        public constructor( scene:bz.Scene, canvas:bz.CanvasSystem )
        {
            super
            (
                scene,
                canvas,

                bz.SettingColor.COLOR_RGB_GREY_QUARTER,
                new BABYLON.Color4( 0.95, 0.95, 0.95, 1.0 ),
                bz.CameraType.ARC_ROTATE
            );
        }

        /** ************************************************************************************************************
        *   Changes the visir color.
        *
        *   @param color The color to set as the visor color.
        ***************************************************************************************************************/
        public requestVisorColorChange( color:BABYLON.Color3 ) : void
        {
            bz.Debug.pc3d.log( 'Change visor color' );

            const visorMultiMaterial:BABYLON.MultiMaterial = this.visor.material as BABYLON.MultiMaterial;
            const subMaterials:BABYLON.Material[] = visorMultiMaterial.subMaterials;

            bz.Debug.pc3d.log( 'Sub-Materials of visor: [' + String( subMaterials.length ) + ']' );

            // pick 1st submaterial
            const visorMaterial:BABYLON.StandardMaterial = subMaterials[ 16 ] as BABYLON.StandardMaterial;

            visorMaterial.diffuseColor  = color;
        }

        /** ************************************************************************************************************
        *   Changes the helmet color.
        *
        *   @param color The color to set as the helmet color.
        ***************************************************************************************************************/
        public requestHelmetColorChange( color:BABYLON.Color3 ) : void
        {
            bz.Debug.pc3d.log( 'Change helmet color' );

            const helmetMultiMaterial:BABYLON.MultiMaterial = this.helmet.material as BABYLON.MultiMaterial;
            const subMaterials:BABYLON.Material[] = helmetMultiMaterial.subMaterials;

            bz.Debug.pc3d.log( 'Sub-Materials of helmet : [' + String( subMaterials.length ) + ']' );

            // pick affected submaterials
            const stripeMaterial :BABYLON.StandardMaterial = subMaterials[ 0 ] as BABYLON.StandardMaterial;
            const frontMaterial  :BABYLON.StandardMaterial = subMaterials[ 1 ] as BABYLON.StandardMaterial;
            const helmetMaterial :BABYLON.StandardMaterial = subMaterials[ 8 ] as BABYLON.StandardMaterial;

            stripeMaterial.diffuseColor = color;
            frontMaterial.diffuseColor  = color;
            helmetMaterial.diffuseColor = color;
        }

        /** ************************************************************************************************************
        *   Requests a toggle of the animation phase for the visor.
        *   May not be performed if an animation is currently running.
        ***************************************************************************************************************/
        public requestVisorAnimationToggle() : void
        {
            switch ( this.animationState )
            {
                case bz.HelmetState.CLOSED:
                {
                    this.animationState = bz.HelmetState.OPENING;
                    bz.GUIFactory.setVisorToggleButtonText
                    (
                        ( this.gui as bz.GUIProductConfigurator ).visorToggleButton,
                        'Close Visor'
                    );

                    bz.MeshManipulation.performAnimation
                    (
                        this.scene.getNativeScene(),
                        this.visor,
                        0,
                        20,
                        false,
                        () => {

                            this.animationState = bz.HelmetState.OPEN;

                            bz.MeshManipulation.performAnimation
                            (
                                this.scene.getNativeScene(),
                                this.visor,
                                20,
                                21,
                                true,
                                () => {}
                            );
                        }
                    );
                    break;
                }

                case bz.HelmetState.OPEN:
                {
                    this.animationState = bz.HelmetState.CLOSING;
                    bz.GUIFactory.setVisorToggleButtonText
                    (
                        ( this.gui as bz.GUIProductConfigurator ).visorToggleButton,
                        'Open Visor'
                    );

                    bz.MeshManipulation.performAnimation
                    (
                        this.scene.getNativeScene(),
                        this.visor,
                        20,
                        0,
                        false,
                        () => {
                            this.animationState = bz.HelmetState.CLOSED;
                        }
                    );
                    break;
                }

                case bz.HelmetState.OPENING:
                case bz.HelmetState.CLOSING:
                {
                    // do nothing if an animation is currently running.
                    break;
                }
            }
        }

        /** ************************************************************************************************************
        *   Sets up the player for this stage.
        *
        *   @return The player instance for this stage.
        ***************************************************************************************************************/
        protected createPlayer() : bz.Player
        {
            return null;
        }

        /** ************************************************************************************************************
        *   Creates the camera system that manages all cameras that appear in this level.
        *
        *   @return The camera system for this stage.
        ***************************************************************************************************************/
        protected createCameraSystem() : bz.CameraSystem
        {
            return new bz.CameraSystem
            (
                this.scene.getNativeScene(),
                this.canvas.getNativeCanvas(),

                new BABYLON.Vector3( 0.0,   0.0, 0.0 ),
                new BABYLON.Vector3( 250.0, 0.0, 0.0 ),
                new BABYLON.Vector3( 0.0,   0.0, 0.0 ),

                new BABYLON.Vector3( 0.0,   0.0, 0.0 ),
                new BABYLON.Vector3( 0.0,   0.0, 0.0  ),
                null,
                null
            );
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        *
        *   @param keySystem The key system to use for key determination.
        ***************************************************************************************************************/
        protected handleLevelKeys( keySystem:bz.KeySystem ) : void
        {
            if ( keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

                this.gui.addGuiMessage( 'toggle visor [' + bz.String.getDateTimeString() + ']' );

                this.requestVisorAnimationToggle();
/*
                // test camera animation
                bz.CameraSystem.animateCameraTarget
                (
                    this.getCameraSystem().getArcRotateCamera(),
                    ( this.camTarget ? BABYLON.Vector3.Zero() : new BABYLON.Vector3( 100.0, 1.0, 100.0 ) )
                );
                this.camTarget = !this.camTarget;
*/
            }
        }

        /** ************************************************************************************************************
        *   Creates and returns all walls this stage consists of.
        *
        *   @return All walls of this stage.
        ***************************************************************************************************************/
        protected createWalls() : bz.Wall[]
        {
            // import mesh model
            this.model = bz.MeshFactory.createImportedModel
            (
                this.scene,
                bz.ModelFile.MOTORCYCLE_HELMET,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Physic.NONE,
                bz.ModelCompoundType.NONE
            );

            // reference single meshes
            this.helmet = this.model.getMesh( 0 );
            this.visor  = this.model.getMesh( 1 );

            return [

                new bz.Wall
                (
                    this,
                    this.model
                ),

            ];
        }

        /** ************************************************************************************************************
        *   Creates and returns all items this stage consists of.
        *
        *   @return All items of this stage.
        ***************************************************************************************************************/
        protected createItems() : bz.Item[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates and returns all bots this stage consists of.
        *
        *   @return All bots of this stage.
        ***************************************************************************************************************/
        protected createBots() : bz.Bot[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Sets up the skybox.
        *
        *   @return The created skybox for this stage.
        ***************************************************************************************************************/
        protected createSkybox() : BABYLON.Mesh
        {
            return null;
        }

        /** ************************************************************************************************************
        *   Creates all sprites that appear in the stage.
        *
        *   @return All sprites that appear in this stage.
        ***************************************************************************************************************/
        protected createSprites() : bz.Sprite[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates all lights that appear in this level.
        *
        *   @return All lights that appear in this stage.
        ***************************************************************************************************************/
        protected createLights() : BABYLON.Light[]
        {
            this.directionalLight = bz.LightFactory.createDirectional
            (
                this.scene.getNativeScene(),
                new BABYLON.Vector3( 0.0, 0.0, 1.0 ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                1.0,
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                true
            );

            // stick light to arc rotate camera
            this.cameraSystem.setLightToArcRotationCamera( this.directionalLight );

            return [ this.directionalLight ];
        }

        /** ************************************************************************************************************
        *   Creates all shadow generators that appear in this level.
        *
        *   @return All shadow generators that appear in this stage.
        ***************************************************************************************************************/
        protected createShadowGenerators() : BABYLON.ShadowGenerator[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected setupShadows() : void
        {
        }

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected setupFog() : void
        {
            this.scene.disableFog();
        }

        /** ************************************************************************************************************
        *   Sets up the pointer system.
        ***************************************************************************************************************/
        protected createPointerSystem() : bz.PointerSystem
        {
            return new bz.PointerSystem( this, this.canvas, false, false );
        }

        /** ************************************************************************************************************
        *   Creates the GUI for this stage.
        *
        *   @return The created GUI.
        ***************************************************************************************************************/
        protected createGUI() : bz.GUI
        {
            const gui:bz.GUIProductConfigurator = new bz.GUIProductConfigurator( this.scene.getNativeScene(), this );
            gui.init();

            return gui;
        }

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected onInitComplete() : void
        {
            // position arc rotate camera
            this.cameraSystem.getArcRotateCamera().alpha = bz.MathUtil.degreesToRad( -110.0 );
            this.cameraSystem.getArcRotateCamera().beta  = bz.MathUtil.degreesToRad( 70.0   );

            // link arc rotate camera zoom to slider
            this.cameraSystem.getArcRotateCamera().onViewMatrixChangedObservable.add(
                () => {

                    ( this.gui as bz.GUIProductConfigurator ).cameraZoomSlider.value =
                    (
//                        400.0 + 100.0 - Math.floor( this.getCameraSystem().arcRotateCamera.radius )
                        400.0 + 100.0 - this.getCameraSystem().getArcRotateCamera().radius
                    );
                }
            );

            // enable auto rotation for arc rotate camera
            this.cameraSystem.getArcRotateCamera().useAutoRotationBehavior = true;
        }
    }

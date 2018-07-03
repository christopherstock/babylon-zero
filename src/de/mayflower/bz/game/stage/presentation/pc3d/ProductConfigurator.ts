
    import * as bz      from '../../../..';
    import * as BABYLON from 'babylonjs';

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

        /** ************************************************************************************************************
        *   Creates a new product viewer stage.
        *
        *   @param scene The babylon.JS scene reference.
        ***************************************************************************************************************/
        public constructor( scene:BABYLON.Scene )
        {
            super
            (
                scene,
                bz.SettingColor.COLOR_RGB_GREY_QUARTER,
                new BABYLON.Color4( 0.95, 0.95, 0.95, 1.0 )
            );
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // invoke parent method
            super.render();
/*
            // rotate whole model
            for ( const mesh of this.model )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ
                (
                    mesh,
                    0.0,
                    0.0,
                    0.0
                );
            }
*/
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        ***************************************************************************************************************/
        public handleLevelKeys() : void
        {
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

                this.requestVisorAnimationToggle();
            }
        }

        /** ************************************************************************************************************
        *   Changes the visir color.
        *
        *   @param color The color to set as the visor color.
        ***************************************************************************************************************/
        public requestVisorColorChange( color:BABYLON.Color3 ) : void
        {
            bz.Debug.pc.log( 'Change visor color' );

            const visorMultiMaterial:BABYLON.MultiMaterial = this.visor.material as BABYLON.MultiMaterial;
            const subMaterials:BABYLON.Material[] = visorMultiMaterial.subMaterials;

            bz.Debug.pc.log( 'Sub-Materials of visor: [' + subMaterials.length + ']' );

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
            bz.Debug.pc.log( 'Change helmet color' );

            const helmetMultiMaterial:BABYLON.MultiMaterial = this.helmet.material as BABYLON.MultiMaterial;
            const subMaterials:BABYLON.Material[] = helmetMultiMaterial.subMaterials;

            bz.Debug.pc.log( 'Sub-Materials of helmet : [' + subMaterials.length + ']' );

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
                    bz.GuiFactory.setVisorToggleButtonText
                    (
                        ( this.hud as bz.ProductConfiguratorHUD ).visorToggleButton,
                        'Close Visor'
                    );

                    bz.MeshManipulation.performAnimation
                    (
                        this.visor,
                        0,
                        20,
                        false,
                        () => {

                            this.animationState = bz.HelmetState.OPEN;

                            bz.MeshManipulation.performAnimation
                            (
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
                    bz.GuiFactory.setVisorToggleButtonText
                    (
                        ( this.hud as bz.ProductConfiguratorHUD ).visorToggleButton,
                        'Open Visor'
                    );

                    bz.MeshManipulation.performAnimation
                    (
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
        *   Creates and returns all walls this stage consists of.
        *
        *   @return All walls of this stage.
        ***************************************************************************************************************/
        protected createWalls() : bz.Wall[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates and returns all movables this stage consists of.
        *
        *   @return All movables of this stage.
        ***************************************************************************************************************/
        protected createMovables() : bz.Movable[]
        {
            return [];
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
        *   Creates and returns all imported models this stage consists of.
        *
        *   @return All imported models of this stage.
        ***************************************************************************************************************/
        protected createImportedMeshes() : bz.Model[]
        {
            bz.Debug.stage.log( 'Importing stage meshes' );

            // import mesh model
            this.model = bz.MeshFactory.createImportedMesh
            (
                bz.ModelFile.MOTORCYCLE_HELMET,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.MeshPivotAnchor.CENTER_XYZ,
                this.scene
            );

            // reference single meshes
            this.helmet = this.model.getMeshes()[ 0 ];
            this.visor  = this.model.getMeshes()[ 1 ];

            return [ this.model ];
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
        protected createSprites() : BABYLON.Sprite[]
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
                this.scene,
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
        *   Creates the camera system that manages all cameras that appear in this level.
        *
        *   @return The camera system for this stage.
        ***************************************************************************************************************/
        protected createCameraSystem() : bz.CameraSystem
        {
            return new bz.CameraSystem
            (
                this.scene,
                this.player,
                bz.Main.game.engine.canvas.getCanvas(),

                new BABYLON.Vector3( 0.0,   0.0, 0.0 ),
                new BABYLON.Vector3( 250.0, 0.0, 0.0 ),
                new BABYLON.Vector3( 0.0,   0.0, 0.0 ),

                new BABYLON.Vector3( 0.0,   0.0, 0.0  ),
                null,
                null,

                bz.CameraType.ARC_ROTATE
            );
        }

        /** ************************************************************************************************************
        *   Creates the HUD for this stage.
        ***************************************************************************************************************/
        protected createHUD() : void
        {
            this.guiFg = bz.GuiFactory.createGUI( bz.Main.game.engine.scene.getScene(), true );

            this.hud = new bz.ProductConfiguratorHUD();
            ( this.hud as bz.ProductConfiguratorHUD ).init( this );
        }

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected onInitComplete() : void
        {
            // link arc rotate camera zoom to slider
            this.cameraSystem.getArcRotateCamera().onViewMatrixChangedObservable.add(
                () => {

                    ( this.hud as bz.ProductConfiguratorHUD ).cameraZoomSlider.value =
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

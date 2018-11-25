
    import * as bz      from '../../../..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   The 'human body partitions' stage offers an interactive body model where
    *   specific partitions can be selected. Various information shall be displayed after picking one body partition.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class HumanBodyPartitions extends bz.Stage
    {
        /** The overlay color for selected meshes. */
        private     static  readonly    MESH_HIGHLIGHT_COLOR    :BABYLON.Color3             = bz.SettingColor.COLOR_RGB_RED;

        /** The current highlighted mesh. */
        private                         currentSelectedMesh     :BABYLON.AbstractMesh       = null;
        /** Referenced imported helmet. */
        private                         model                   :bz.Model                   = null;
        /** Referenced product presentation light. */
        private                         directionalLight        :BABYLON.DirectionalLight   = null;

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
                bz.SettingColor.COLOR_RGB_GREY_HALF,
                new BABYLON.Color4( 0.75, 0.75, 0.75, 1.0 ),
                bz.CameraType.ARC_ROTATE
            );
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        *
        *   @param pause Specifies if the pause state is currently active.
        ***************************************************************************************************************/
        public render( pause:boolean ) : void
        {
            // invoke parent method
            super.render( pause );
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        ***************************************************************************************************************/
        protected handleLevelKeys() : void
        {
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );
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
            // import mesh model
            this.model = bz.MeshFactory.createImportedModel
            (
                bz.ModelFile.HUMAN_BODY,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                this.scene,
                bz.Physic.NONE,
                bz.ModelCompoundType.NONE
            );

            bz.Debug.hbp.log( 'Imported human model with [' + this.model.getMeshCount() + '] meshes' );

            return [

                new bz.Wall
                (
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
        *   Sets up the pointer callback.
        *
        *   @return The pointer callback method to invoke or <code>null</code> if not supported.
        ***************************************************************************************************************/
        protected createPointerCallback() : ( evt:PointerEvent, pickResult:BABYLON.PickingInfo ) => void
        {
            return this.onPointerDown;
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

                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                null
            );
        }

        /** ************************************************************************************************************
        *   Creates the GUI for this stage.
        *
        *   @return The created GUI.
        ***************************************************************************************************************/
        protected createGUI() : bz.GUI
        {
            const gui:bz.GUIHumanBodyPartitions = new bz.GUIHumanBodyPartitions( this );
            gui.init();

            return gui;
        }

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected onInitComplete() : void
        {
            // position arc rotate camera
            this.cameraSystem.getArcRotateCamera().alpha = bz.MathUtil.degreesToRad( -60.0 );
            this.cameraSystem.getArcRotateCamera().beta  = bz.MathUtil.degreesToRad( 90.0  );

            // link arc rotate camera zoom to slider
            this.cameraSystem.getArcRotateCamera().onViewMatrixChangedObservable.add(
                () => {

                    ( this.gui as bz.GUIHumanBodyPartitions ).cameraZoomSlider.value =
                    (
//                        400.0 + 100.0 - Math.floor( this.getCameraSystem().arcRotateCamera.radius )
                        400.0 + 100.0 - this.getCameraSystem().getArcRotateCamera().radius
                    );
                }
            );

            // enable auto rotation for arc rotate camera
            this.cameraSystem.getArcRotateCamera().useAutoRotationBehavior = true;
        }

        /** ************************************************************************************************************
        *   Being invoked when the pointer is down on this stage.
        *
        *   @param evt        The pointer event being propagated by the system.
        *   @param pickResult More information about the location of the 3D space where the pointer is down.
        ***************************************************************************************************************/
        private onPointerDown=( evt:PointerEvent, pickResult:BABYLON.PickingInfo ) : void =>
        {
            // check if the pointer hit
            // if ( pickResult.hit )
            {
                // check if the pointer picked a mesh
                if ( pickResult.pickedMesh )
                {
                    bz.Debug.hbp.log( 'Picked a mesh' );
                    this.toggleHighlight( pickResult.pickedMesh );
                }
                else
                {
                    bz.Debug.hbp.log( 'Picked no mesh' );
                    this.toggleHighlight( null );
                }
            }
        };

        /** ************************************************************************************************************
        *   Toggles the highlight for this mesh.
        *
        *   @param meshToHightlight The mesh to toggle highlighting for.
        ***************************************************************************************************************/
        private toggleHighlight( meshToHightlight:BABYLON.AbstractMesh ) : void
        {
            // disable current selected mesh
            if ( this.currentSelectedMesh != null )
            {
                // disable highlighting
                const newMaterial:BABYLON.StandardMaterial = ( this.currentSelectedMesh.material as BABYLON.StandardMaterial ).clone( bz.MaterialSystem.createNextMaterialId() );
                newMaterial.diffuseColor = bz.SettingColor.COLOR_RGB_WHITE;
                this.currentSelectedMesh.material = newMaterial;

                // check if the current mesh has been deselected - break in that case
                if ( meshToHightlight === this.currentSelectedMesh )
                {
                    // clear current selected mesh
                    this.currentSelectedMesh = null;

                    return;
                }

                // clear current selected mesh
                this.currentSelectedMesh = null;
            }

            // browse all meshes
            for ( let i:number = 0; i < this.model.getMeshCount(); ++i )
            {
                // pick browsed mesh
                const mesh:BABYLON.AbstractMesh = this.model.getMesh( i );

                // check if this mesh is currently selected
                if ( mesh === meshToHightlight )
                {
                    // highlight this mesh
                    const newMaterial:BABYLON.StandardMaterial = ( mesh.material as BABYLON.StandardMaterial ).clone( bz.MaterialSystem.createNextMaterialId() );
                    newMaterial.diffuseColor = HumanBodyPartitions.MESH_HIGHLIGHT_COLOR;
                    mesh.material = newMaterial;

                    // assign current selected mesh
                    this.currentSelectedMesh = mesh;
                }
            }
        }
    }

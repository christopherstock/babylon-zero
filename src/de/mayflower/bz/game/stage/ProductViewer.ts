
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   All possible states concerning the helmet animation.
    *******************************************************************************************************************/
    enum HelmetState
    {
        /** The Helmet is closed and no animation is running. */
        CLOSED,
        /** The Helmet is opening and an animation is running. */
        OPENING,
        /** The Helmet is open and no animation is running. */
        OPEN,
        /** The Helmet is closing and an animation is running. */
        CLOSING,
    }

    /** ****************************************************************************************************************
    *   The 'product viewer' stage offers an exploration of a 3D model that can be viewed from all angles.
    *******************************************************************************************************************/
    export class ProductViewer extends bz.Stage
    {
        /** Referenced imported helmet. */
        private                         helmet                  :BABYLON.AbstractMesh[]     = null;
        /** Referenced visir of the helmet. */
        private                         visir                   :BABYLON.AbstractMesh       = null;

        /** Referenced point light. */
        private                         pointLight              :BABYLON.PointLight         = null;
        /** Flags if the helmet animation is currently running. */
        private                         animationState          :HelmetState                = HelmetState.CLOSED;
        /** Index of the current visir material. */
        private                         currentVisirMaterial    :number                     = 0;

        /** ************************************************************************************************************
        *   Creates a new product viewer stage.
        *
        *   @param scene The babylon.JS scene reference.
        ***************************************************************************************************************/
        public constructor( scene:BABYLON.Scene )
        {
            super
            (
                new BABYLON.Color3( 0.25, 0.25, 0.25 ),
                scene
            );
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // invoke parent method
            super.render();

            // rotate logo
            for ( const mesh of this.helmet )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ
                (
                    mesh,
                    0.0,
                    0.0,
                    0.0
                );
            }
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        ***************************************************************************************************************/
        public handleLevelKeys() : void
        {
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

                this.requestVisirAnimationToggle();
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_SPACE ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_SPACE );

                this.requestVisirColorChange();
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
        *   Creates and returns all imported meshes this stage consists of.
        *
        *   @return All imported meshes of this stage.
        ***************************************************************************************************************/
        protected createImportedMeshes() : BABYLON.AbstractMesh[][]
        {
            bz.Debug.stage.log( 'Importing stage meshes' );

            this.helmet = bz.MeshFactory.createImportedMesh
            (
                bz.MeshImport.HELMET,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                this.scene
            );

            // reference visir
            this.visir = this.helmet[ this.helmet.length - 1 ];

            return [ this.helmet ];
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
            this.pointLight = bz.LightFactory.createPoint
            (
                this.scene,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                400.0,
                2.0
            );

            // stick light to arc rotate camera
            this.cameraSystem.setLightToArcRotationCamera( this.pointLight );

            return [ this.pointLight ];
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
        *   Requests a toggle of the animation phase for the visir.
        *   May not be performed if an animation is currently running.
        ***************************************************************************************************************/
        private requestVisirAnimationToggle() : void
        {
            switch ( this.animationState )
            {
                case HelmetState.CLOSED:
                {
                    this.animationState = HelmetState.OPENING;

                    bz.Main.game.engine.scene.getScene().beginAnimation(
                        this.visir, 0, 20, false, 1.0, () => {

                            this.animationState = HelmetState.OPEN;

                            bz.Main.game.engine.scene.getScene().beginAnimation(
                                this.visir, 20, 21, true, 1.0, () => { }
                            );
                        }
                    );
                    break;
                }

                case HelmetState.OPEN:
                {
                    this.animationState = HelmetState.CLOSING;

                    bz.Main.game.engine.scene.getScene().beginAnimation(
                        this.visir, 20, 0, false, 1.0, () => {
                            this.animationState = HelmetState.CLOSED;
                        }
                    );
                    break;
                }

                case HelmetState.OPENING:
                case HelmetState.CLOSING:
                {
                    // do nothing if an animation is currently running.
                    break;
                }
            }
        }

        /** ************************************************************************************************************
        *   Changes the visir color.
        ***************************************************************************************************************/
        private requestVisirColorChange() : void
        {
            const visirMaterial:BABYLON.StandardMaterial = this.visir.material as BABYLON.StandardMaterial;

            this.currentVisirMaterial += 1;
            if ( this.currentVisirMaterial === 4 ) this.currentVisirMaterial = 0;

            switch ( this.currentVisirMaterial )
            {
                case 0:
                {
                    visirMaterial.diffuseColor = new BABYLON.Color3( 0.9647, 0.8235, 0.4392 );
                    break;
                }
                case 1:
                {
                    visirMaterial.diffuseColor = new BABYLON.Color3( 1.0, 1.0, 1.0 );
                    break;
                }
                case 2:
                {
                    visirMaterial.diffuseColor = new BABYLON.Color3( 0.85, 0.4, 0.0 );
                    break;
                }
                case 3:
                {
                    visirMaterial.diffuseColor = new BABYLON.Color3( 0.8, 0.15, 0.15 );
                    break;
                }
            }
        }
    }

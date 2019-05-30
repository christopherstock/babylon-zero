
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Specifies the 'spaceship' level.
    *******************************************************************************************************************/
    export class SpaceshipScene extends bz.Stage
    {
        /** ************************************************************************************************************
        *   Creates a new spaceship scene.
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

                bz.SettingColor.COLOR_RGB_WHITE,
                bz.SettingColor.COLOR_RGBA_WHITE_OPAQUE,
                bz.CameraType.FOLLOW
            );
        }

        /** ************************************************************************************************************
        *   Sets up the player for this stage.
        *
        *   @return The player instance for this stage.
        ***************************************************************************************************************/
        protected createPlayer() : bz.Player
        {
            return new bz.PlayerSpaceship
            (
                this,
                this.scene,
                new BABYLON.Vector3( 0.0, 10.0, 25.0 ),
                90.0,
                this.ambientColor
            );
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

                new BABYLON.Vector3( 10.0,   10.0, 10.0 ),
                new BABYLON.Vector3( 20.0,   5.0,  20.0 ),
                new BABYLON.Vector3( -500.0, 0.0,  50.0 ),

                new BABYLON.Vector3( 0.0,    0.0,  0.0  ),
                this.player.getThirdPersonCameraTargetMesh(),
                this.player.getThirdPersonCameraTargetMesh(),
                this.player.getFirstPersonCameraTargetMesh()
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

                // add GUI message to queue
                this.gui.addGuiMessage( 'Test in SpaceshipScene level' );
            }
        }

        /** ************************************************************************************************************
        *   Creates and returns all walls this stage consists of.
        *
        *   @return All walls of this stage.
        ***************************************************************************************************************/
        protected createWalls() : bz.Wall[]
        {
            return [
/*
                // crate
                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.CRATE,
                        new BABYLON.Vector3( 10.0, 5.0, 5.0 ),
                        bz.Physic.LIGHT_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),
*/
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // static ground
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 0.0, -bz.MeshFactory.FACE_DEPTH, 0.0  ),
                                bz.MeshPivotAnchor.NONE,
                                new BABYLON.Vector3( 5000.0, bz.MeshFactory.FACE_DEPTH, 50.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_TEST,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    ),
                ),
/*
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // static glass wall
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 0.0, bz.MeshFactory.FACE_DEPTH, 0.0  ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 15.0, 5.0, 0.5 ),
                                new BABYLON.Vector3( 0.0, 10.0, 0.0 ),
                                bz.Texture.WALL_GLASS,
                                null,
                                bz.Physic.STATIC,
                                0.5,
                                this.ambientColor
                            ),

                            // box primitive from MeshFactory
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 5.0, 5.0, 5.0 ),

                                bz.MeshPivotAnchor.LOWEST_XYZ,

                                new BABYLON.Vector3( 1.5, 1.5, 1.5 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_GRASS,
                                null,

                                bz.Physic.SOLID_WOOD,
                                // bz.Physic.NONE,

                                0.5,
                                this.ambientColor
                            ),
                        ]
                    )
                ),
*/
            ];
        }

        /** ************************************************************************************************************
        *   Creates and returns all items this stage consists of.
        *
        *   @return All items of this stage.
        ***************************************************************************************************************/
        protected createItems() : bz.Item[]
        {
            return [
            ];
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
            return bz.MeshFactory.createSkyBoxCube( this.scene.getNativeScene(), bz.SkyBoxFile.BLUE_SKY, 1.0 );
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
            return [];
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
            // if ( false ) this.scene.enableFog( new BABYLON.Color3( 1.0, 1.0, 1.0 ), 0.01 );
        }

        /** ************************************************************************************************************
        *   Sets up the pointer callback.
        ***************************************************************************************************************/
        protected createPointerCallback() : ( evt:PointerEvent, pickResult:BABYLON.PickingInfo ) => void
        {
            return new bz.PointerSystem( this ).defaultPointerDown;
        }

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected onInitComplete() : void
        {
        }

        /** ************************************************************************************************************
        *   Creates the GUI for this stage.
        ***************************************************************************************************************/
        protected createGUI() : bz.GUI
        {
            const gui:bz.GUIGame = new bz.GUIGame( this.scene.getNativeScene() );
            gui.init();

            return gui;
        }
    }

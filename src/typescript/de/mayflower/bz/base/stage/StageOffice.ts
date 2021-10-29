
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Specifies the 'office' level.
    *******************************************************************************************************************/
    export class StageOffice extends bz.Stage
    {
        private                             OFFSET_X                :number                                 = 200.0;
        private                             OFFSET_Z                :number                                 = 200.0;

        /** A testwise mesh - made from a single 3dsmax Mesh. */
        protected                           chairSingle             :bz.Model                               = null;
        /** A testwise mesh - made from multiple 3dsmax Meshes. */
        protected                           chairMulti              :bz.Model                               = null;
        /** A testwise mesh - made from multiple 3dsmax Meshes with multiple physics?. */
        protected                           chairMultiPhysics       :bz.Model                               = null;

        /** A testwise mesh 'compound spheres'. */
        // protected                           compoundSpheres         :bz.Model                               = null;
        /** The testwise rotation X for the testwise chair. */
        // protected                        chairRot                :number                                 = 0.0;
        /** Testwise camera target toggle. */
        private                             camTarget               :boolean                                = false;

        /** ************************************************************************************************************
        *   Creates a new test office.
        *
        *   @param game The game instance.
        ***************************************************************************************************************/
        public constructor( game:bz.Game )
        {
            super
            (
                game,
                new BABYLON.Color3( 0.2, 0.2, 0.2 ),
                bz.SettingColor.COLOR_RGBA_BLACK_OPAQUE,
                bz.CameraType.FIRST_PERSON
            );
        }

        /** ************************************************************************************************************
        *   Sets up the player for this stage.
        *
        *   @return The player instance for this stage.
        ***************************************************************************************************************/
        protected createPlayer() : bz.Player
        {
            return new bz.Player
            (
                this,
                this.scene,
                new BABYLON.Vector3(
                    this.OFFSET_X + 2.5,
                    ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ),
                    this.OFFSET_Z + 2.6
                ),
                45.0,
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
                this.game,

                new BABYLON.Vector3( 10.0, 10.0, 10.0 ),
                new BABYLON.Vector3( 20.0, 5.0,  20.0 ),
                new BABYLON.Vector3( 0.0,  0.0,  0.0  ),

                new BABYLON.Vector3( 0.0,  0.0,  0.0  ),
                this.player.getThirdPersonCameraTargetMesh(),
                this.player.getThirdPersonCameraTargetMesh(),
                this.player.getFirstPersonCameraTargetMesh()
            );
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        ***************************************************************************************************************/
        protected handleLevelKeys() : void
        {
            const keySystem :bz.KeySystem = this.game.getKeySystem();

            if ( keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

                // add GUI messages to queue and start various debug actions

                // explode compound spheres
                this.game.getGUI().addGuiMessage( 'explode compound spheres [' + bz.StringUtil.getDateTimeString() + ']' );
                // this.compoundSpheres.removeCompoundMesh( this.scene.getNativeScene() );

                // perform a camera animation for the stationary target camera
                this.game.getGUI().addGuiMessage( 'start camera journey [' + bz.StringUtil.getDateTimeString() + ']' );
                this.cameraSystem.animateCameraPosition
                (
                    bz.CameraType.STATIONARY,
                    ( this.camTarget ? BABYLON.Vector3.Zero() : new BABYLON.Vector3( 40.0, 10.0, 40.0 ) ),
                    2.5,
                    new BABYLON.PowerEase(),
                    () => { bz.Debug.camera.log( 'Cam reached target' ) }
                );
                this.camTarget = !this.camTarget;

                // show hurt GUI effect
                this.game.getGUI().addGuiFx( bz.GUIFxType.HURT );
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
            this.chairSingle = bz.MeshFactory.createImportedModel
            (
                this.scene,
                bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                new BABYLON.Vector3( 15.0, 5.0, 17.5 ),
                bz.PhysicBehaviour.SOLID_CONCRETE,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_DISABLED
            );
/*
            this.chairMulti = bz.MeshFactory.createImportedModel
            (
                this.scene,
                bz.ModelFile.OFFICE_CHAIR_1,
                new BABYLON.Vector3( 20.0, 3.75, 20.0 ),
                bz.Physic.CONCRETE,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_DISABLED
            );
            this.chairMultiPhysics = bz.MeshFactory.createImportedModel
            (
                this.scene,
                bz.ModelFile.OFFICE_CHAIR_3,
                new BABYLON.Vector3( 20.0, 4.0, 30.0 ),
                null,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_ENABLED
            );
            this.compoundSpheres = bz.MeshFactory.createImportedModel
            (
                this.scene,
                bz.ModelFile.DOUBLE_SPHERE_1,
                new BABYLON.Vector3( 60.0, 10.0, 50.0 ),
                null,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_DISABLED
            );

            const tv:BABYLON.Mesh = bz.MeshFactory.createBox
            (
                this.scene,
                new BABYLON.Vector3( 3.0, 2.5, 25.0 ),
                bz.MeshPivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( ( 4 * 0.560 ), ( 4 * 0.320 ), bz.MeshFactory.FACE_DEPTH ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Texture.VIDEO_TEST,
                null,
                // bz.Physic.STATIC,
                bz.Physic.NONE,
                1.0,
                this.ambientColor
            );
*/
            let walls :bz.Wall[] = [
/*
                // black sphere UNCOMPOUND from imported model ( uses physic impostor from 3dsmax file! )
                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.DOUBLE_SPHERE_1,
                        new BABYLON.Vector3( 30.0, 10.0, 50.0 ),
                        null,
                        bz.ModelCompoundType.NONE
                    )
                ),

                // black sphere COMPOUND from imported model ( uses physic impostor from 3dsmax file! )
                new bz.Wall
                (
                    this,
                    this.compoundSpheres
                ),
*/
                // movable wooden crate
                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.CRATE,
                        new BABYLON.Vector3( 10.0, 30.0, 5.0 ),
                        bz.PhysicBehaviour.LIGHT_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),

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
//                                new BABYLON.Vector3( 5.0, bz.MeshFactory.FACE_DEPTH, 1.0  ),
                                new BABYLON.Vector3( 0.0, bz.MeshFactory.FACE_DEPTH, 0.0  ),

                                bz.MeshPivotAnchor.LOWEST_XYZ,
//                                bz.MeshPivotAnchor.NONE,

                                new BABYLON.Vector3( 15.0, 5.0, 0.5 ),
                                new BABYLON.Vector3( 0.0, 10.0, 0.0 ),
                                bz.Texture.WALL_GLASS,
                                null,

                                bz.PhysicBehaviour.STATIC,
//                                bz.Physic.NONE,

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

                                bz.PhysicBehaviour.SOLID_WOOD,
                                // bz.Physic.NONE,

                                0.5,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                // 3ds chair single-meshed
                new bz.Wall
                (
                    this,
                    this.chairSingle,
                    3
                ),
/*
                // tv
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            tv,
                        ]
                    )
                ),
*/
/*
                // 3ds chair - multi-meshes with same physics
                new bz.Wall
                (
                    this,
                    this.chairMulti,
                    5
                ),
*/
/*
                // 3ds chair - multi-meshes with specific physics
                new bz.Wall
                (
                    this,
                    this.chairMultiPhysics,
                    5
                ),
*/
/*
                // red sphere from own model
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createSphere
                            (
                                this.scene,
                                new BABYLON.Vector3( 10.0, 0.0, 10.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                3.0,
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                null,
                                bz.SettingColor.COLOR_RGB_RED,
                                bz.Physic.SOLID_WOOD,
                                1.0,
                                bz.SettingColor.COLOR_RGB_RED // this.ambientColor
                            ),
                        ]
                    )
                ),
*/
                // test wall green
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 3.0, 2.5, 1.0  ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 15.0, 5.0, 0.5 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_GRASS,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),
/*
                // test wall (flying obstacle)
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 20.0, 3.0, 2.0  ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 15.0, 5.0, 5.0 ),
                                new BABYLON.Vector3( 0.0, 270.0, 0.0 ),
                                bz.Texture.WALL_WOOD,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),
*/
                // static elevated ground
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 0.0, -bz.MeshFactory.FACE_DEPTH, 0.0  ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 40.0, bz.MeshFactory.FACE_DEPTH,  40.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 160.0 ),
                                bz.Texture.WALL_GRASS,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                // bz.Physic.NONE,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                // heightmap ground
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createHeightMapGround
                            (
                                this.scene,
                                this.ambientColor,
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.PhysicBehaviour.STATIC
                            ),
                        ]
                    )
                ),



                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // tree - standing (crossed)
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 5.0,  0.0, 20.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 3.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0   ),
                                bz.Texture.WALL_TREE,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 6.5,  0.0, 18.5   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 3.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0, 270.0, 0.0   ),
                                bz.Texture.WALL_TREE,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // plane - amiga at world origin
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 0.0,  0.0, 0.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 2.0,  4.0, bz.MeshFactory.FACE_DEPTH   ),
                                new BABYLON.Vector3( 0.0, 45.0, 0.0   ),
                                bz.Texture.WALL_AMIGA,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // plane - amiga plane 45° - BACKSIDE
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 15.0, 0.0, 6.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 7.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0, -45.0, 0.0 ),
                                bz.Texture.WALL_AMIGA,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // plane - amiga plane 45° - FRONTSIDE
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 21.0, 0.0, 30.0 - bz.MeshFactory.FACE_DEPTH ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 7.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0, 65.0, 0.0 ),
                                bz.Texture.WALL_AMIGA,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // plane - amiga 180° - FRONTSIDE
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 8.0, 0.0, 6.0 - bz.MeshFactory.FACE_DEPTH ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 7.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_GRASS,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // plane - amiga 180° - BACKSIDE
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 8.0, 0.0, 6.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 7.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_GRASS,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // box - amiga light frontside
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 20.0, 0.0, 11.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 1.0, 7.0, 7.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_AMIGA,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // box - amiga light backside
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 10.0, 0.0, 18.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 1.0, 7.0, 7.0 ),
                                new BABYLON.Vector3( 0.0, 180.0, 0.0 ),
                                bz.Texture.WALL_AMIGA,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // movable glass pane
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 2.0,  0.0, 15.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 2.0, 3.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0,  135.0, 0.0   ),
                                bz.Texture.WALL_GLASS,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                0.5,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // triangle
                            bz.MeshFactory.createPolygon
                            (
                                this.scene,
                                [
                                    new BABYLON.Vector3( 0.0,  0.0,  13.0    ),
                                    new BABYLON.Vector3( 10.0, 0.0,  13.0    ),
                                    new BABYLON.Vector3( 10.0, 0.0,  0.0     ),
                                ],
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 270.0, 0.0, 0.0 ),
                                bz.SettingColor.COLOR_RGB_RED,
                                bz.PhysicBehaviour.STATIC,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // movable crate - small
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 12.0, 0.0, 12.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 1.0, 1.0, 1.0 ),
                                new BABYLON.Vector3( 0.0, 45.0, 0.0 ),
                                bz.Texture.WALL_WOOD,
                                null,
                                bz.PhysicBehaviour.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // movable crate - big
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( -1.0,  3.0, 5.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 2.0, 2.0, 2.0 ),
                                new BABYLON.Vector3( 0.0, 30.0, 0.0 ),
                                bz.Texture.WALL_WOOD,
                                null,
                                bz.PhysicBehaviour.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // movable crate - different UVs for all sides
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 24.0,  0.0, 12.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 1.0, 2.0, 3.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_TEST,
                                null,
                                bz.PhysicBehaviour.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // movable glass quader
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 2.0,  0.0, 2.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 1.0, 2.0, 3.0    ),
                                new BABYLON.Vector3( 0.0,  45.0, 0.0   ),
                                bz.Texture.WALL_GLASS,
                                null,
                                bz.PhysicBehaviour.LIGHT_WOOD,
                                0.5,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // small crate - density crafting
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 5.5, 0.0, 22.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 1.0, 1.0, 1.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_WOOD,
                                null,
                                bz.PhysicBehaviour.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // medium crate - density crafting
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 5.5, 0.0, 25.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 2.0, 2.0, 2.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_WOOD,
                                null,
                                bz.PhysicBehaviour.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // large crate - density crafting
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 5.5, 0.0, 30.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 3.0, 3.0, 3.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_WOOD,
                                null,
                                bz.PhysicBehaviour.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // sphere
                            bz.MeshFactory.createSphere
                            (
                                this.scene,
                                new BABYLON.Vector3( 10.5, 0.0, 30.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                3.0,
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_TEST,
                                null,
                                bz.PhysicBehaviour.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                        new BABYLON.Vector3( -10.0, 20.0, 0.0 ),
                        bz.PhysicBehaviour.SOLID_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),

                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                        new BABYLON.Vector3( -10.0, 20.0, 10.0 ),
                        bz.PhysicBehaviour.SOLID_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),

                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                        new BABYLON.Vector3( -10.0, 20.0, 15.0 ),
                        bz.PhysicBehaviour.SOLID_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),

            ];

            const levelGroundWalls :bz.Wall[] = this.createLevelGroundWalls();
            const boxesWalls       :bz.Wall[] = this.createBoxesWalls();
            walls = walls.concat( levelGroundWalls );
            walls = walls.concat( boxesWalls );

            return walls;
        }

        /** ************************************************************************************************************
        *   Creates and returns all items this stage consists of.
        *
        *   @return All items of this stage.
        ***************************************************************************************************************/
        protected createItems() : bz.Item[]
        {
            return [

                new bz.Item
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.SHELLS,
                        new BABYLON.Vector3( 20.0, 0.0, 20.0 ),
                        null,
                        bz.ModelCompoundType.NONE
                    )
                ),

                new bz.Item
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.SHELLS,
                        new BABYLON.Vector3( 25.0, 0.0, 20.0 ),
                        null,
                        bz.ModelCompoundType.NONE
                    )
                ),

                new bz.Item
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.SHELLS,
                        new BABYLON.Vector3( 30.0, 0.0, 20.0 ),
                        null,
                        bz.ModelCompoundType.NONE
                    )
                ),

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
            return bz.MeshFactory.createSkyBoxCube( this.scene.getNativeScene(), bz.SkyBoxFile.BLUE_SKY, 0.5 );
        }

        /** ************************************************************************************************************
        *   Creates all sprites that appear in the stage.
        *
        *   @return All sprites that appear in this stage.
        ***************************************************************************************************************/
        protected createSprites() : bz.Sprite[]
        {
/*
            // create and animate a sprite
            const animatedTestSprite:bz.Sprite = new bz.Sprite
            (
                this.scene,
                bz.SpriteFile.TEST,
                new BABYLON.Vector3( 70.0, 0.0, 50.0  ),
                10.0,
                20.0,
                bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y,
                bz.SpriteCollidable.NO
            );
            animatedTestSprite.animate( 0, 43, true );
*/
            return [

                // animatedTestSprite,

                new bz.Sprite
                (
                    this.scene,
                    bz.SpriteFile.PALM,
                    new BABYLON.Vector3( this.OFFSET_X + 30.0, 0.0, this.OFFSET_Z + 10.0 ),
                    10.0,
                    10.0,
                    bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y,
                    bz.SpriteCollidable.YES,
                    0.5
                ),
                new bz.Sprite
                (
                    this.scene,
                    bz.SpriteFile.TREE,
                    new BABYLON.Vector3( this.OFFSET_X + 50.0, 0.0, this.OFFSET_Z + 10.0 ),
                    10.0,
                    10.0,
                    bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y,
                    bz.SpriteCollidable.YES,
                    0.5
                ),
                new bz.Sprite
                (
                    this.scene,
                    bz.SpriteFile.PALM,
                    new BABYLON.Vector3( this.OFFSET_X + 70.0, 0.0, this.OFFSET_Z + 10.0 ),
                    10.0,
                    10.0,
                    bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y,
                    bz.SpriteCollidable.YES,
                    0.5
                ),
                new bz.Sprite
                (
                    this.scene,
                    bz.SpriteFile.TREE,
                    new BABYLON.Vector3( this.OFFSET_X + 80.0, 0.0, this.OFFSET_Z + 10.0 ),
                    10.0,
                    10.0,
                    bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y,
                    bz.SpriteCollidable.YES,
                    0.5
                ),
            ];
        }

        /** ************************************************************************************************************
        *   Creates all lights that appear in this level.
        *
        *   @return All lights that appear in this stage.
        ***************************************************************************************************************/
        protected createLights() : BABYLON.Light[]
        {
            return [

                // hemispheric light
                bz.LightFactory.createHemispheric
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 0.0, 1.0, 0.0 ),
                    new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                    new BABYLON.Color3( 0.1, 0.1, 0.1 ),
                    new BABYLON.Color3( 0.0, 0.0, 0.0 ),
                    false
                ),

                // directional light
                bz.LightFactory.createDirectional
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 0.5, -1.0, 0.0 ),
                    new BABYLON.Vector3( 20.0, 20.0, 20.0 ),
                    1.0,
                    new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                    new BABYLON.Color3( 1.0, 0.5, 0.0 ),
                    false
                ),

                // spot light
                bz.LightFactory.createSpot
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 15.0, 20.0, 15.0 ),
                    new BABYLON.Vector3( 0.0, -1.0, 0.0 ),
                    30.0,
                    2,
                    new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                    new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                    50.0,
                    false
                ),

                // point light
                bz.LightFactory.createPoint
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 15.0, 3.0, 16.0 ),
                    new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                    new BABYLON.Color3( 0.0, 0.0, 0.0 ),
                    50.0,
                    1.0,
                    true
                ),

                // point light
                bz.LightFactory.createPoint
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( this.OFFSET_X + 15.0, 3.0, this.OFFSET_Z + 16.0 ),
                    new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                    new BABYLON.Color3( 0.0, 0.0, 0.0 ),
                    50.0,
                    1.0,
                    true
                ),

            ];
        }

        /** ************************************************************************************************************
        *   Creates all shadow generators that appear in this level.
        *
        *   @return All shadow generators that appear in this stage.
        ***************************************************************************************************************/
        protected createShadowGenerators() : BABYLON.ShadowGenerator[]
        {
            const shadowGenerators:BABYLON.ShadowGenerator[] = [
                new BABYLON.ShadowGenerator( 2048, ( this.lights[ 2 ] as BABYLON.SpotLight ) ),
            ];

            shadowGenerators[ 0 ].useExponentialShadowMap = true;
            shadowGenerators[ 0 ].usePoissonSampling      = true;

            return shadowGenerators;
        }

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected setupShadows() : void
        {
            // set shadows for all walls
            for ( const wall of this.walls )
            {
                wall.getModel().applyShadowGenerator( this.shadowGenerators[ 0 ] );
            }
        }

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected setupFog() : void
        {
            this.scene.disableFog();

            // green poison steam..
            // this.scene.enableFog( new BABYLON.Color3( 101 / 256, 206 / 256, 143 / 256 ), 0.05 );
        }

        private createLevelGroundWalls() : bz.Wall[]
        {
            return [
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 0.0, -2.5, 0.0  ),
                                bz.MeshPivotAnchor.NONE,
                                new BABYLON.Vector3( 200.0, 2.5, 200.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_TEST,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),

                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 200.0, -2.5, 200.0  ),
                                bz.MeshPivotAnchor.NONE,
                                new BABYLON.Vector3( this.OFFSET_X, 2.5, this.OFFSET_Z ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_TEST,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),
            ]
        }

        private createBoxesWalls() : bz.Wall[]
        {
            return [

                // wooden test crates

                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.CRATE,
                        new BABYLON.Vector3( this.OFFSET_X + 15.0, 0.0, this.OFFSET_Z + 15.0 ),
                        bz.PhysicBehaviour.LIGHT_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),
                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.CRATE,
                        new BABYLON.Vector3( this.OFFSET_X + 17.5, 0.0, this.OFFSET_Z + 17.5 ),
                        bz.PhysicBehaviour.LIGHT_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),
                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.CRATE,
                        new BABYLON.Vector3( this.OFFSET_X + 17.5, 0.0, this.OFFSET_Z + 15.0 ),
                        bz.PhysicBehaviour.LIGHT_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),
                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.CRATE,
                        new BABYLON.Vector3( this.OFFSET_X + 17.5, 2.5, this.OFFSET_Z + 17.5 ),
                        bz.PhysicBehaviour.LIGHT_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),
                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.CRATE,
                        new BABYLON.Vector3( this.OFFSET_X + 17.5, 5.0, this.OFFSET_Z + 17.5 ),
                        bz.PhysicBehaviour.LIGHT_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),
            ]
        }
    }

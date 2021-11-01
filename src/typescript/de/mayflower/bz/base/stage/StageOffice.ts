
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Specifies the 'office' level.
    *******************************************************************************************************************/
    export class StageOffice extends bz.Stage
    {
        private                 readonly    OFFSET_X                :number                                 = 0.0;
        private                 readonly    OFFSET_Z                :number                                 = 0.0;

        /** A testwise mesh - made from a single 3dsmax Mesh. */
        private                             chairCompoundDestroyable            :bz.Wall                    = null;
        /** A testwise mesh - made from multiple 3dsmax Meshes. */
        private                             chairMultiMeshesNoCompound          :bz.Wall                    = null;
        /** A testwise mesh - made from multiple 3dsmax Meshes with multiple physics?. */
        private                             chairCompoundSingleShotOff          :bz.Wall                    = null;

        /** A testwise mesh 'compound spheres'. */
        // protected                        compoundSpheres         :bz.Model                               = null;
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

                // new BABYLON.Color3( 0.1, 0.1, 0.1 ), // night
                new BABYLON.Color3( 0.6, 0.6, 0.6 ), // evening

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
                this.game.getGUI().addGuiMessage(
                    'explode compound spheres [' + bz.StringUtil.getDateTimeString() + ']'
                );
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
            // multi mesh chair with compound .. desired!
            this.chairCompoundDestroyable = new bz.Wall
            (
                this,
                bz.MeshFactory.createImportedModel
                (
                    this.scene,
                    bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                    new BABYLON.Vector3( this.OFFSET_X + 20.0, 5.0, this.OFFSET_Z + 25.5 ),
                    bz.PhysicBehaviour.SOLID_CONCRETE,
                    bz.ModelCompoundType.COMPOUND_SHOT_OFF_DISABLED
                ),
                10.0
            );
            // multi mesh chair without compound .. immediately collapses!
            this.chairMultiMeshesNoCompound = new bz.Wall
            (
                this,
                bz.MeshFactory.createImportedModel
                (
                    this.scene,
                    bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                    new BABYLON.Vector3( this.OFFSET_X - 5.0, 18.0, this.OFFSET_Z + 35.0 ),
                    bz.PhysicBehaviour.SOLID_WOOD,
                    bz.ModelCompoundType.NONE
                ),
                10.0
            );

            this.chairCompoundSingleShotOff = new bz.Wall
            (
                this,
                bz.MeshFactory.createImportedModel
                (
                    this.scene,
                    bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                    new BABYLON.Vector3( 20.0, 3.75, 20.0 ),
                    bz.PhysicBehaviour.CONCRETE,
                    bz.ModelCompoundType.COMPOUND_SHOT_OFF_ENABLED
                ),
                10.0
            );
/*
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

                // office chair - multi meshed - destroyable compound
                this.chairCompoundDestroyable,

                // office chair - multi meshed - destroyable compound
                this.chairCompoundSingleShotOff,

                // office chair - multi meshed - single meshes destroyable
                this.chairMultiMeshesNoCompound,

                // solid white sphere
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createSphere
                            (
                                this.scene,
                                new BABYLON.Vector3( this.OFFSET_X + 10.5, 1.5, this.OFFSET_Z + 30.0 ),
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
/*
                // elevated grass ground
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3(
                                    this.OFFSET_X + 0.0,
                                    -bz.MeshFactory.FACE_DEPTH,
                                    this.OFFSET_Z + 60.0
                                ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 40.0, bz.MeshFactory.FACE_DEPTH,  100.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 160.0 ),
                                bz.Texture.WALL_GRASS,
                                null,
                                bz.PhysicBehaviour.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),
*/
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
                                new BABYLON.Vector3( this.OFFSET_X - 5.0, 0.0, this.OFFSET_Z + 0.0 ),
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
                            // movable glass pane
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( this.OFFSET_X + 0.0,  2.5, this.OFFSET_Z + 0.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 2.5, 5.0, bz.MeshFactory.FACE_DEPTH ),
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
                        new BABYLON.Vector3( this.OFFSET_X + 10.0, 0.0, this.OFFSET_Z + 50.0 ),
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
                        new BABYLON.Vector3( this.OFFSET_X + 10.0, 0.0, this.OFFSET_Z + 55.0 ),
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
                        new BABYLON.Vector3( this.OFFSET_X + 10.0, 0.0, this.OFFSET_Z + 60.0 ),
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
                    new BABYLON.Vector3( this.OFFSET_X + 30.0, 0.0, this.OFFSET_Z + 20.0 ),
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
                    new BABYLON.Vector3( this.OFFSET_X + 40.0, 0.0, this.OFFSET_Z + 20.0 ),
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
                    new BABYLON.Vector3( this.OFFSET_X + 40.0, 0.0, this.OFFSET_Z + 10.0 ),
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
/*
                // hemispheric light
                bz.LightFactory.createHemispheric
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 0.0, 1.0, 0.0 ),
                    new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                    new BABYLON.Color3( 0.1, 0.1, 0.1 ),
                    new BABYLON.Color3( 0.0, 0.0, 0.0 ),
                    0.1,
                    false
                ),
*/
/*
                // directional light ?
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

                // spot light ?
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
*/
/*
                // point light
                bz.LightFactory.createPoint
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( this.OFFSET_X + 15.0, 3.0, this.OFFSET_Z - 16.0 ),
                    new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                    new BABYLON.Color3( 0.0, 0.0, 0.0 ),
                    50.0,
                    1.0,
                    true
                ),
*/
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
                new BABYLON.ShadowGenerator( 2048, ( this.lights[ 0 ] as BABYLON.PointLight ) ),
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
            if ( false )
            {
                // set shadows for all walls
                for ( const wall of this.walls )
                {
                    wall.getModel().applyShadowGenerator( this.shadowGenerators[ 0 ] );
                }
            }

            this.chairCompoundDestroyable.getModel().applyShadowGenerator( this.shadowGenerators[ 0 ] );
        }

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected setupFog() : void
        {
            this.scene.disableFog();
            // green poison steam..
            // this.scene.enableFog( bz.SettingColor.COLOR_RGB_GREEN, 0.05 );
        }

        // TODO move to StageContentsFactory ?? :)
        private createLevelGroundWalls() : bz.Wall[]
        {
            return [

                // test planes
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( this.OFFSET_X, 12.5, this.OFFSET_Z  ),
                                bz.MeshPivotAnchor.NONE,
                                new BABYLON.Vector3( 50.0, 2.5, 50.0 ),
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

                // heightmap ground (hills)
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createHeightMapGround
                            (
                                this.scene,
                                new BABYLON.Vector3( this.OFFSET_X + 0.0, 0.0, this.OFFSET_Z - 0.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                400.0,
                                5.0,
                                'res/image/texture/heightMap/heightMap5.png',
                                this.ambientColor,
                                new BABYLON.Vector3( 0.0, 90.0, 0.0 ),
                                bz.PhysicBehaviour.STATIC
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
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( this.OFFSET_X + 25.0, 2.5, this.OFFSET_Z + 25.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 2.5, 2.5, 2.5 ),
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
                            // movable glass cube
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( this.OFFSET_X + 3.0,  2.5, this.OFFSET_Z + 20.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 2.5, 2.5, 2.5    ),
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
            ]
        }
    }
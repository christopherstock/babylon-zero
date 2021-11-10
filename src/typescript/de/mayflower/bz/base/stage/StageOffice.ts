import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies the 'office' stage.
***********************************************************************************************************************/
export class StageOffice extends bz.Stage
{
    private                 readonly    OFFSET_X                        :number                     = 0.0;
    private                 readonly    OFFSET_Z                        :number                     = 0.0;

    /** A testwise mesh - made from a single 3dsmax Mesh. */
    private                             chairCompoundDestroyable        :bz.Wall                    = null;
    /** A testwise mesh - made from multiple 3dsmax Meshes. */
    private                             chairMultiMeshesNoCompound      :bz.Wall                    = null;
    /** A testwise mesh - made from multiple 3dsmax Meshes with multiple physics?. */
    private                             chairCompoundSingleShotOff      :bz.Wall                    = null;

    /** Testwise camera target toggle. */
    private                             camTarget                       :boolean                    = false;

    /** ****************************************************************************************************************
    *   Creates a new test office.
    *
    *   @param game The game instance.
    *******************************************************************************************************************/
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

    /** ****************************************************************************************************************
    *   Creates the camera system that manages all cameras that appear in this level.
    *
    *   @return The camera system for this stage.
    *******************************************************************************************************************/
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

    /** ****************************************************************************************************************
    *   Handles level specific keys.
    *******************************************************************************************************************/
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

    /** ****************************************************************************************************************
    *   Creates all stage contents.
    *******************************************************************************************************************/
    protected createStageContents() : void
    {
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.scene );

        this.setPlayer(
            new bz.Player
            (
                this,
                this.scene,
                new BABYLON.Vector3(
                    this.OFFSET_X + 3.5,
                    ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ),
                    this.OFFSET_Z + 3.5
                ),
                45.0,
                this.ambientColor
            )
        );

        // create and animate a sprite
        const animatedTestSprite:bz.Sprite = new bz.Sprite
        (
            this.scene,
            bz.SpriteFile.FIRE,
            new BABYLON.Vector3( 20.0, 0.0, 20.0 ),
            10.0,
            20.0,
            bz.SpriteCollidable.NO
        );
        animatedTestSprite.animate( 0, 24, true );

        this.addSprite( animatedTestSprite );

        this.addSprite(
            new bz.Sprite
            (
                this.scene,
                bz.SpriteFile.PALM,
                new BABYLON.Vector3( this.OFFSET_X + 30.0, 0.0, this.OFFSET_Z + 10.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5,
                bz.MeshAnchor.CENTER_XZ_LOWEST_Y,
                bz.MathUtil.getRandomInt( -10.0, 10.0 )
            )
        );

        this.addSprite(
            new bz.Sprite
            (
                this.scene,
                bz.SpriteFile.TREE,
                new BABYLON.Vector3( this.OFFSET_X + 30.0, 0.0, this.OFFSET_Z + 20.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5
            )
        );

        this.addSprite(
            new bz.Sprite
            (
                this.scene,
                bz.SpriteFile.PALM,
                new BABYLON.Vector3( this.OFFSET_X + 40.0, 0.0, this.OFFSET_Z + 20.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5,
                bz.MeshAnchor.CENTER_XZ_LOWEST_Y,
                bz.MathUtil.getRandomInt( -10.0, 10.0 )
            )
        );

        this.addSprite(
            new bz.Sprite
            (
                this.scene,
                bz.SpriteFile.TREE,
                new BABYLON.Vector3( this.OFFSET_X + 40.0, 0.0, this.OFFSET_Z + 10.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5
            )
        );

        this.addLevelGroundWalls( meshFactory );
        this.addBoxesWalls(       meshFactory );
        this.addChairsWalls(      meshFactory );
        this.addStuffWalls(        meshFactory );

        this.addItem(
            new bz.Item
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SHELLS,
                    new BABYLON.Vector3( this.OFFSET_X + 10.0, 0.0, this.OFFSET_Z + 50.0 ),
                    null,
                    bz.ModelCompoundType.NONE
                )
            )
        );
        this.addItem(
            new bz.Item
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SHELLS,
                    new BABYLON.Vector3( this.OFFSET_X + 10.0, 0.0, this.OFFSET_Z + 55.0 ),
                    null,
                    bz.ModelCompoundType.NONE
                )
            )
        );
        this.addItem(
            new bz.Item
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SHELLS,
                    new BABYLON.Vector3( this.OFFSET_X + 10.0, 0.0, this.OFFSET_Z + 60.0 ),
                    null,
                    bz.ModelCompoundType.NONE
                )
            )
        );

        // point light
        const pointLight :BABYLON.PointLight = bz.LightFactory.createPoint
        (
            this.scene.getNativeScene(),
            new BABYLON.Vector3( this.OFFSET_X + 20.0, 2.5, this.OFFSET_Z + 20.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 ),
            50.0,
            1.0,
            true
        );
        this.addLight( pointLight );
    }

    /** ****************************************************************************************************************
    *   Sets up the skybox.
    *
    *   @return The created skybox for this stage.
    *******************************************************************************************************************/
    protected createSkybox() : BABYLON.Mesh
    {
        return new bz.MeshFactory( this.scene ).createSkyBoxCube( bz.SkyBoxFile.BLUE_SKY, 0.5 );
    }

    /** ****************************************************************************************************************
    *   Creates all shadow generators that appear in this level.
    *
    *   @return All shadow generators that appear in this stage.
    *******************************************************************************************************************/
    protected createShadowGenerators() : BABYLON.ShadowGenerator[]
    {
        const shadowGenerators:BABYLON.ShadowGenerator[] = [
            new BABYLON.ShadowGenerator( 2048, ( this.lights[ 0 ] as BABYLON.PointLight ) ),
        ];

        shadowGenerators[ 0 ].useExponentialShadowMap = true;
        shadowGenerators[ 0 ].usePoissonSampling      = true;

        return shadowGenerators;
    }

    /** ****************************************************************************************************************
    *   Sets up shadows for all meshes.
    *******************************************************************************************************************/
    protected setupShadows() : void
    {
        if ( false )
        {
            // set shadows for all walls
            for ( const wall of this.walls )
            {
                wall.getModel().applyShadowGenerator( this.shadowGenerators[ 0 ] );
            }

            // this.chairCompoundDestroyable.getModel().applyShadowGenerator( this.shadowGenerators[ 0 ] );
        }
    }

    /** ****************************************************************************************************************
    *   Sets up shadows for all meshes.
    *******************************************************************************************************************/
    protected setupFog() : void
    {
        this.scene.disableFog();
        // green poison steam..
        // this.scene.enableFog( bz.SettingColor.COLOR_RGB_GREEN, 0.05 );
    }

    /** ****************************************************************************************************************
    *   Creates the ground walls for this level.
    *******************************************************************************************************************/
    private addLevelGroundWalls( meshFactory:bz.MeshFactory ) : void
    {
        // hills ( heightmap ground )
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createHeightMapGround
                        (
                            new BABYLON.Vector3( this.OFFSET_X, 0.0, this.OFFSET_Z ),
                            bz.MeshAnchor.CENTER_XYZ,
                            300.0,
                            10.0,
                            bz.TextureFile.HEIGHTMAP_VALLEY,
                            this.ambientColor,
                            new BABYLON.Vector3( 0.0, 90.0, 0.0 ),
                            bz.PhysicSet.STATIC
                        ),
                    ]
                )
            )
        );

        // ceiling
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            this.ambientColor,
                            new BABYLON.Vector3( this.OFFSET_X, 15.5, this.OFFSET_Z  ),
                            bz.Texture.WALL_TEST,
                            new BABYLON.Vector3( 50.0, 2.5, 50.0 ),
                            bz.PhysicSet.STATIC
                        ),
                    ]
                )
            )
        );
    }

    /** ****************************************************************************************************************
    *   Adds all boxes to this level.
    *******************************************************************************************************************/
    private addBoxesWalls( meshFactory:bz.MeshFactory ) : void
    {
        // wooden crates from 3ds models
        this.addWall(
            new bz.Wall
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CRATE,
                    new BABYLON.Vector3( this.OFFSET_X + 15.0, 0.0, this.OFFSET_Z + 15.0 ),
                    bz.PhysicSet.CRATE_WOOD,
                    bz.ModelCompoundType.NONE
                )
            )
        );

        this.addWall(
            new bz.Wall
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CRATE,
                    new BABYLON.Vector3( this.OFFSET_X + 17.5, 0.0, this.OFFSET_Z + 17.5 ),
                    bz.PhysicSet.CRATE_WOOD,
                    bz.ModelCompoundType.NONE
                )
            )
        );

        this.addWall(
            new bz.Wall
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CRATE,
                    new BABYLON.Vector3( this.OFFSET_X + 17.5, 0.0, this.OFFSET_Z + 15.0 ),
                    bz.PhysicSet.CRATE_WOOD,
                    bz.ModelCompoundType.NONE
                )
            )
        );

        this.addWall(
            new bz.Wall
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CRATE,
                    new BABYLON.Vector3( this.OFFSET_X + 17.5, 2.5, this.OFFSET_Z + 17.5 ),
                    bz.PhysicSet.CRATE_WOOD,
                    bz.ModelCompoundType.NONE
                )
            )
        );

        this.addWall(
            new bz.Wall
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CRATE,
                    new BABYLON.Vector3( this.OFFSET_X + 17.5, 5.0, this.OFFSET_Z + 17.5 ),
                    bz.PhysicSet.CRATE_WOOD,
                    bz.ModelCompoundType.NONE
                )
            )
        );

        // metal box
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            this.ambientColor,
                            new BABYLON.Vector3( this.OFFSET_X + 25.0, 2.5, this.OFFSET_Z + 25.0   ),
                            bz.Texture.WALL_METAL,
                            new BABYLON.Vector3( 2.5, 2.5, 2.5 ),
                            bz.PhysicSet.CRATE_STEEL,
                            1.0,
                            bz.MeshAnchor.CENTER_XYZ,
                            new BABYLON.Vector3( 0.0, 45.0, 0.0 )
                        ),
                    ]
                )
            )
        );

        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        // movable glass cube
                        meshFactory.createBox
                        (
                            this.ambientColor,
                            new BABYLON.Vector3( this.OFFSET_X + 3.0,  2.5, this.OFFSET_Z + 20.0   ),
                            bz.Texture.WALL_GLASS,
                            new BABYLON.Vector3( 2.5, 2.5, 2.5    ),
                            bz.PhysicSet.CRATE_STEEL,
                            0.5,
                            bz.MeshAnchor.CENTER_XYZ,
                            new BABYLON.Vector3( 0.0,  45.0, 0.0   )
                        ),
                    ]
                )
            )
        );
    }

    private addChairsWalls( meshFactory:bz.MeshFactory ) : void
    {
        // multi mesh chair with compound .. scatters after being shot multiple times!
        this.chairCompoundDestroyable = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                new BABYLON.Vector3( this.OFFSET_X + 20.0, 3.5, this.OFFSET_Z + 35.0 ),
                bz.PhysicSet.OFFICE_CHAIR,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_DISABLED
            ),
            5.0
        );
        // multi mesh chair without compound .. immediately collapses!
        this.chairMultiMeshesNoCompound = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                new BABYLON.Vector3( this.OFFSET_X - 5.0, 18.0, this.OFFSET_Z + 35.0 ),
                bz.PhysicSet.OFFICE_CHAIR,
                bz.ModelCompoundType.NONE
            ),
            5.0
        );
        // office chair - multi meshed - single meshes destroyable
        this.chairCompoundSingleShotOff = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                new BABYLON.Vector3( 20.0, 3.5, 45.0 ),
                bz.PhysicSet.OFFICE_CHAIR,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_ENABLED
            ),
            5.0
        );

        this.addWall( this.chairCompoundDestroyable   );
        this.addWall( this.chairMultiMeshesNoCompound );
        this.addWall( this.chairCompoundSingleShotOff );
    }

    private addStuffWalls( meshFactory:bz.MeshFactory ) : void
    {
        // tv
        const tv:bz.Wall = new bz.Wall
        (
            this,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        this.ambientColor,
                        new BABYLON.Vector3( 3.0, 2.5, 25.0 ),
                        bz.Texture.VIDEO_TEST,
                        // new BABYLON.Vector3( ( 4 * 0.560 ), ( 4 * 0.320 ), 1.0 ),
                        new BABYLON.Vector3( ( 4 * 0.640 ), ( 4 * 0.360 ), 1.0 ),
                        bz.PhysicSet.CRATE_WOOD,
                        1.0,
                        bz.MeshAnchor.CENTER_XYZ,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                    ),
                ]
            )
        );

        this.addWall( tv );

        // solid white sphere
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createSphere
                        (
                            new BABYLON.Vector3( this.OFFSET_X + 10.5, 1.5, this.OFFSET_Z + 30.0 ),
                            bz.MeshAnchor.CENTER_XYZ,
                            3.0,
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.Texture.WALL_TEST,
                            null,
                            bz.PhysicSet.WHITE_TEST_SPHERE,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                )
            )
        );

        // box - amiga light frontside
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            this.ambientColor,
                            new BABYLON.Vector3( this.OFFSET_X - 5.0, 0.0, this.OFFSET_Z ),
                            bz.Texture.WALL_AMIGA,
                            new BABYLON.Vector3( 1.0, 7.0, 7.0 ),
                            bz.PhysicSet.STATIC
                        ),
                    ]
                )
            )
        );

        // static glass pane
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            this.ambientColor,
                            new BABYLON.Vector3( this.OFFSET_X, 0.0, this.OFFSET_Z ),
                            bz.Texture.WALL_GLASS,
                            new BABYLON.Vector3( 2.5, 5.0, bz.MeshFactory.FACE_DEPTH ),
                            bz.PhysicSet.STATIC,
                            0.5,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            )
        );
    }
}

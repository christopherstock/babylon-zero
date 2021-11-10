import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies the 'office' stage.
***********************************************************************************************************************/
export class StageOffice extends bz.Stage
{
    private readonly OFFSET_X                       :number                 = 0.0;
    private readonly OFFSET_Z                       :number                 = 0.0;

    /** A testwise mesh - made from a single 3dsmax Mesh. */
    private          chairCompoundDestroyable       :bz.Wall                = null;
    /** A testwise mesh - made from multiple 3dsmax Meshes. */
    private          chairMultiMeshesNoCompound     :bz.Wall                = null;
    /** A testwise mesh - made from multiple 3dsmax Meshes with multiple physics?. */
    private          chairCompoundSingleShotOff     :bz.Wall                = null;

    /** Testwise camera target toggle. */
    private          camTarget                      :boolean                = false;

    /** ****************************************************************************************************************
    *   Creates the stage config that is applied on initializing this stage.
    *******************************************************************************************************************/
    protected createStageConfig() : bz.StageConfig
    {
        return new bz.StageConfig(
            // new BABYLON.Color3( 0.1, 0.1, 0.1 ), // night
            new BABYLON.Color3( 0.6, 0.6, 0.6 ), // evening
            bz.SettingColor.COLOR_RGBA_BLACK_OPAQUE,
            bz.CameraType.FIRST_PERSON
        );
    }

    /** ****************************************************************************************************************
    *   Creates all stage contents.
    *******************************************************************************************************************/
    protected createStageContents( meshFactory:bz.MeshFactory ) : void
    {
        this.setPlayer(
            new bz.Player
            (
                this,
                this.getScene(),
                new BABYLON.Vector3(
                    this.OFFSET_X + 3.5,
                    ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ),
                    this.OFFSET_Z + 3.5
                ),
                45.0,
                this.getConfig().ambientColor
            )
        );

        // create and animate a sprite
        const animatedTestSprite:bz.Sprite = new bz.Sprite
        (
            this.getScene(),
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
                this.getScene(),
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
                this.getScene(),
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
                this.getScene(),
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
                this.getScene(),
                bz.SpriteFile.TREE,
                new BABYLON.Vector3( this.OFFSET_X + 40.0, 0.0, this.OFFSET_Z + 10.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5
            )
        );

        this.addGroundWalls( meshFactory );
        this.addBoxesWalls(  meshFactory );
        this.addChairsWalls( meshFactory );
        this.addStuffWalls(  meshFactory );

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
            this.getScene().getNativeScene(),
            new BABYLON.Vector3( this.OFFSET_X + 20.0, 2.5, this.OFFSET_Z + 20.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 ),
            50.0,
            1.0,
            true
        );
        this.addLight( pointLight );

        // blue skybox half alpha
        this.setSkybox( bz.SkyBoxFile.BLUE_SKY, 0.5 );

        // add fog
        // this.scene.enableFog( bz.SettingColor.COLOR_RGB_GREEN, 0.05 ); // green steam

        // add shadows for point light
        this.addShadowGenerator( pointLight );
    }

    /** ****************************************************************************************************************
    *   Handles stage specific keys.
    *******************************************************************************************************************/
    protected handleStageKeys() : void
    {
        const keySystem :bz.KeySystem = this.getGame().getKeySystem();

        if ( keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
        {
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

            // add GUI messages to queue and start various debug actions

            // explode compound spheres
            this.getGame().getGUI().addGuiMessage(
                'explode compound spheres [' + bz.StringUtil.getDateTimeString() + ']'
            );
            // this.compoundSpheres.removeCompoundMesh( this.scene.getNativeScene() );

            // perform a camera animation for the stationary target camera
            this.getGame().getGUI().addGuiMessage( 'start camera journey [' + bz.StringUtil.getDateTimeString() + ']' );
            this.getCameraSystem().animateCameraPosition
            (
                bz.CameraType.STATIONARY,
                ( this.camTarget ? BABYLON.Vector3.Zero() : new BABYLON.Vector3( 40.0, 10.0, 40.0 ) ),
                2.5,
                new BABYLON.PowerEase(),
                () => { bz.Debug.camera.log( 'Cam reached target' ) }
            );
            this.camTarget = !this.camTarget;

            // show hurt GUI effect
            this.getGame().getGUI().addGuiFx( bz.GUIFxType.HURT );
        }
    }

    /** ****************************************************************************************************************
    *   Creates the ground walls for this stage.
    *******************************************************************************************************************/
    private addGroundWalls( meshFactory:bz.MeshFactory ) : void
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
    *   Adds all boxes to this stage.
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
                            bz.PhysicSet.WHITE_TEST_SPHERE
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
                            new BABYLON.Vector3( this.OFFSET_X, 0.0, this.OFFSET_Z ),
                            bz.Texture.WALL_GLASS,
                            new BABYLON.Vector3( 2.5, 5.0, bz.SettingEngine.FACE_DEPTH ),
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

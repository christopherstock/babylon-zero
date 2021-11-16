import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies the 'office' stage.
***********************************************************************************************************************/
export class StageOffice extends bz.Stage
{
    /** A testwise mesh - made from a single 3dsmax Mesh. */
    private          chairCompoundDestroyable       :bz.Wall                = null;
    /** A testwise mesh - made from multiple 3dsmax Meshes with multiple physics?. */
    private          chairCompoundSingleShotOff     :bz.Wall                = null;
    /** A testwise mesh - made from multiple 3dsmax Meshes. */
    private          chairMultiMeshesNoCompound     :bz.Wall                = null;
    private          desk                           :bz.Wall                = null;

    /** Testwise camera target toggle. */
    private          camTarget                      :boolean                = false;

    /** ****************************************************************************************************************
    *   Creates the stage config that is applied on initializing this stage.
    *******************************************************************************************************************/
    public createDefaultConfig() : bz.StageConfig
    {
        return new bz.StageConfig(
            new BABYLON.Color3( 0.1, 0.1, 0.1 ),
            bz.SettingColor.COLOR_RGBA_BLACK_OPAQUE,
            bz.CameraType.FIRST_PERSON,
            new BABYLON.Vector3(
                ( bz.SettingEngine.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 ),
                ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ) + bz.SettingEngine.FLOOR_OFFSET_Y,
                ( bz.SettingEngine.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 )
            ),
            new BABYLON.Vector3( 0.0, 70.0, 0.0 )
        );
    }

    /** ****************************************************************************************************************
    *   Creates all stage contents.
    *******************************************************************************************************************/
    protected createStageContents( meshFactory:bz.MeshFactory ) : void
    {
        // blue skybox
        this.setSkybox( bz.SkyBoxFile.BLUE_SKY, 0.5 );

        // ground walls
        // this.addGroundWalls( meshFactory );

        // player
        this.setPlayer( new bz.Player( this ) );

        // small office
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            new BABYLON.Vector3( 40.0, bz.SettingEngine.WALL_HEIGHT, 40.0 ),
            0.0,
            bz.TextureFile.WALL_WOOD_HORZ, [], [],
            null, [], [],
            bz.TextureFile.WALL_WOOD_HORZ, [], [],
            bz.TextureFile.WALL_WOOD_HORZ, [], [],
            bz.TextureFile.WALL_CARPET_2,
            bz.TextureFile.WALL_CEILING
        );

        // point light in small office
        const pointLight :BABYLON.PointLight = bz.LightFactory.createPoint
        (
            this.getScene().getNativeScene(),
            new BABYLON.Vector3( 10.0, 5.0, 5.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 )
        );
        this.addLight( pointLight );

        // light yard
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 40.0, 0.0, bz.SettingEngine.HALLWAY_WIDTH ),
            new BABYLON.Vector3( 40.0, bz.SettingEngine.WALL_HEIGHT, 40.0 - 2 * bz.SettingEngine.HALLWAY_WIDTH ),
            0.0,
            null, [], [],
            null, [], [],
            null, [], [],
            null, [ 1.0 ], [],
            bz.TextureFile.WALL_STONES_3,
            null
        );

        // passways around light square
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 40.0, 0.0, 0.0 ),
            new BABYLON.Vector3( 40.0, bz.SettingEngine.WALL_HEIGHT, bz.SettingEngine.HALLWAY_WIDTH ),
            0.0,
            bz.TextureFile.WALL_WOOD_HORZ, [], [],
            null, [], [],
            null, [], [],
            null, [ 1.0 ], [],
            bz.TextureFile.WALL_CARPET_2,
            bz.TextureFile.WALL_CEILING
        );
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 40.0, 0.0, 40.0 - bz.SettingEngine.HALLWAY_WIDTH ),
            new BABYLON.Vector3( 40.0, bz.SettingEngine.WALL_HEIGHT, bz.SettingEngine.HALLWAY_WIDTH ),
            0.0,
            null, [], [],
            null, [], [],
            bz.TextureFile.WALL_WOOD_HORZ, [], [],
            null, [ 1.0 ], [],
            bz.TextureFile.WALL_CARPET_2,
            bz.TextureFile.WALL_CEILING
        );

        // 2nd office
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 80.0, 0.0, 0.0 ),
            new BABYLON.Vector3( 80.0, bz.SettingEngine.WALL_HEIGHT, 40.0 ),
            0.0,
            bz.TextureFile.WALL_WOOD_HORZ, [], [],
            bz.TextureFile.WALL_WOOD_HORZ, [ 10.0 ], [],
            bz.TextureFile.WALL_WOOD_HORZ, [], [],
            null, [], [],
            bz.TextureFile.WALL_CARPET_2,
            bz.TextureFile.WALL_CEILING
        );

        // point light in 2nd office
        const pointLight2 :BABYLON.PointLight = bz.LightFactory.createPoint
        (
            this.getScene().getNativeScene(),
            new BABYLON.Vector3( 115.0, 5.0, 15.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 )
        );
        this.addLight( pointLight2 );

        // boxes pile in small office
        bz.StageFactory.addBoxesWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 20.0, bz.SettingEngine.FLOOR_OFFSET_Y, 20.0 )
        );

        // boxes pile in light yard
        bz.StageFactory.addBoxesWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 50.0, bz.SettingEngine.FLOOR_OFFSET_Y, 20.0 )
        );

        // boxes pile in 2nd office
        bz.StageFactory.addBoxesWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 110.0, bz.SettingEngine.FLOOR_OFFSET_Y, 20.0 )
        );

        this.addFurniture( meshFactory );

        this.addStuffWalls(  meshFactory );

        this.addTrees(  meshFactory );

        // add 3 items
        this.addItem(
            new bz.Item
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.ITEM_SHELLS,
                    new BABYLON.Vector3( 38.0, 3.8, 14.0 ),
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
                    bz.ModelFile.ITEM_SHELLS,
                    new BABYLON.Vector3( 38.0, 3.8, 18.0 ),
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
                    bz.ModelFile.ITEM_SHELLS,
                    new BABYLON.Vector3( 11.5, 3.8, 9.5 ),
                    null,
                    bz.ModelCompoundType.NONE
                )
            )
        );

        // add stage switch door
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3(
                                160.0 + ( bz.SettingEngine.WALL_DEPTH / 2 ),
                                bz.SettingEngine.FLOOR_OFFSET_Y,
                                10.0 + ( bz.SettingEngine.DOOR_WIDTH / 2 )
                            ),
                            bz.TextureFile.WALL_DOOR_1,
                            new BABYLON.Vector3(
                                bz.SettingEngine.DOOR_WIDTH,
                                bz.SettingEngine.DOOR_HEIGHT,
                                bz.SettingEngine.WALL_DEPTH
                            ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.CENTER_XZ_LOWEST_Y,
                            new BABYLON.Vector3( 0.0, 90.0, 0.0 )
                        ),
                    ]
                ),
                bz.GameObject.UNBREAKABLE,
                [
                    new bz.Event(
                        bz.EventType.SWITCH_TO_STAGE,
                        new bz.EventDataStageSwitch(
                            bz.StageId.OUTSIDE,
                            new BABYLON.Vector3(
                                ( bz.SettingEngine.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 ),
                                ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ) + bz.SettingEngine.FLOOR_OFFSET_Y,
                                ( bz.SettingEngine.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 )
                            ),
                            new BABYLON.Vector3( 0.0, 60.0, 0.0 )
                        )
                    ),
                ]
            )
        );
/*
        // add fog
        // this.scene.enableFog( bz.SettingColor.COLOR_RGB_GREEN, 0.05 ); // green steam

        // add shadows for point light
        this.addShadowGenerator( pointLight );
*/
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

            // perform a camera animation for the stationary target camera
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
    *   Adds all chairs to this stage.
    *
    *   @param meshFactory The MeshFactory instance.
    *******************************************************************************************************************/
    private addFurniture( meshFactory:bz.MeshFactory ) : void
    {
        // multi mesh chair with compound .. scatters after being shot multiple times!
        this.chairCompoundDestroyable = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                new BABYLON.Vector3( 5.0, 2.1, 30.0 ),
                bz.PhysicSet.OFFICE_CHAIR,
                bz.ModelCompoundType.COMPOUND
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
                new BABYLON.Vector3( 10.0, 2.1, 30.0 ),
                bz.PhysicSet.OFFICE_CHAIR,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_ENABLED
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
                new BABYLON.Vector3( 15.0, 2.1, 30.0 ),
                bz.PhysicSet.OFFICE_CHAIR,
                bz.ModelCompoundType.NONE
            ),
            5.0
        );

        this.addWall( this.chairCompoundDestroyable   );
        this.addWall( this.chairCompoundSingleShotOff );
        this.addWall( this.chairMultiMeshesNoCompound );

        // office desk 1
        this.desk = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_DESK_1,
                new BABYLON.Vector3( 10.0, 1.7, 7.0 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE, // bz.ModelCompoundType.COMPOUND,
                90.0
            ),
            5.0
        );
        this.addWall( this.desk );

        // screen 1
        const screen1 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.SCREEN_1,
                new BABYLON.Vector3( 12.5, 4.5, 5.5 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                -90.0
            ),
            5.0,
            [
                new bz.Event(
                    bz.EventType.SHOW_GUI_MESSAGE,
                    new bz.EventDataShowGuiMessage( 'All cleared for today.' )
                ),
                new bz.Event(
                    bz.EventType.SHOW_GUI_MESSAGE,
                    new bz.EventDataShowGuiMessage( 'No more work for today.' )
                ),
            ],
            bz.InteractionType.ONCE
        );
        this.addWall( screen1 );

        // shelves
        const shelves1 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.SHELVES_1,
                new BABYLON.Vector3( 33.5, 3.15, 37.0 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                10.0
            ),
            5.0
        );
        this.addWall( shelves1 );

        // office desk 2
        const officeDesk2 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_DESK_2,
                new BABYLON.Vector3( 38.5, 1.6, 16.5 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                85.0
            ),
            5.0
        );
        this.addWall( officeDesk2 );

        // soda machine 2
        const sodaMachine2 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.SODA_MACHINE_2,
                new BABYLON.Vector3( 5.5, 3.15, 37.5 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                0.0
            ),
            5.0
        );
        this.addWall( sodaMachine2 );

        // sofa 1
        const sofa1 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.SOFA_1,
                new BABYLON.Vector3( 25.5, 1.8, 2.5 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                180.0
            ),
            5.0
        );
        this.addWall( sofa1 );

        // car 1
        const car1 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.CAR_1,
                new BABYLON.Vector3( 100.0, 3.0, 20.5 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                180.0
            ),
            5.0
        );
        this.addWall( car1 );

        // bench 1
        const bench1 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.BENCH_1,
                new BABYLON.Vector3( 60.0, 1.3, 6.0 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                180.0
            ),
            5.0
        );
        this.addWall( bench1 );
    }

    /** ****************************************************************************************************************
    *   Adds all stuff walls to this stage.
    *
    *   @param meshFactory The MeshFactory instance.
    *******************************************************************************************************************/
    private addStuffWalls( meshFactory:bz.MeshFactory ) : void
    {
        // tv (65 inch)
        const tv:bz.Wall = new bz.Wall
        (
            this,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( 17.0, 5.0, 39.5 ),
                        bz.TextureFile.VIDEO_TEST,
                        new BABYLON.Vector3( ( 15.0 * 0.640 ), ( 15.0 * 0.360 ), 0.25 ),
                        bz.PhysicSet.SHELVES,
                        1.0,
                        bz.MeshAnchor.CENTER_XYZ,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                    ),
                ]
            ),
            bz.GameObject.UNBREAKABLE,
            [
                new bz.Event(
                    bz.EventType.SHOW_GUI_MESSAGE,
                    new bz.EventDataShowGuiMessage( 'Nothing on the television today' )
                ),
                new bz.Event(
                    bz.EventType.SHOW_GUI_MESSAGE,
                    new bz.EventDataShowGuiMessage( 'I think I should go home now.' )
                ),
            ],
            bz.InteractionType.ONCE
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
                            new BABYLON.Vector3( 10.5, 1.5, 30.0 ),
                            bz.MeshAnchor.CENTER_XYZ,
                            3.0,
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.TextureFile.WALL_TEST,
                            null,
                            bz.PhysicSet.WHITE_TEST_SPHERE
                        ),
                    ]
                )
            )
        );
    }

    /** ****************************************************************************************************************
    *   Adds some trees to this stage.
    *
    *   @param meshFactory The MeshFactory instance.
    *******************************************************************************************************************/
    private addTrees( meshFactory :bz.MeshFactory ) :void
    {
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
                new BABYLON.Vector3( 130.0, 0.0, 10.0 ),
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
                new BABYLON.Vector3( 130.0, 0.0, 20.0 ),
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
                new BABYLON.Vector3( 140.0, 0.0, 20.0 ),
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
                new BABYLON.Vector3( 140.0, 0.0, 10.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5
            )
        );
    }
}

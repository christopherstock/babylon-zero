import * as bz from '../../..';

/** ********************************************************************************************************************
*   Configuration set for a Door game object.
*
*   TODO add rotations for all rooms/objects :p
*        new Wall().getModel().rotateAroundAxisY
***********************************************************************************************************************/
export class AECFactory
{
    /** ****************************************************************************************************************
    *   Adds a 'residental street' location to the stage.
    *******************************************************************************************************************/
    public static addResidentalStreet(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0
    )
    : void
    {
        bz.StageFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 80.0, 7.5, 40.0 ),
            rotY,
            bz.TextureFile.WALL_WOOD_VERT_1, [], [
            ], 0,
            bz.TextureFile.WALL_WOOD_VERT_2, [], [
            ], 0,
            null, [
            ], [], 0,
            null, [
            ], [
            ], 0,
            bz.TextureFile.WALL_PAVEMENT_MILANO,
            null
        );

        // gothic church
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.GOTHIC_CHURCH,
                    position.add( new BABYLON.Vector3( 50.0, 0.0, 100.0 ) ),
                    bz.PhysicSet.STATIC,
                    bz.ModelCompoundType.NONE,
                    180.0
                )
            )
        );

        // house 1
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.HOUSE_1,
                    position.add( new BABYLON.Vector3( 45.0, 0.0, 35.0 ) ),
                    bz.PhysicSet.STATIC,
                    90.0,
                    135.0
                )
            )
        );

        // 3d tree 1
        const tree1:bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model(
                meshFactory.genrateTree(
                    position.add( new BABYLON.Vector3( 10.0, 0.0, 30.0 ) )
                )
            )
        );
        stage.addWall( tree1 );
    }

    /** ****************************************************************************************************************
    *   Adds a 'small park' location to the stage.
    *******************************************************************************************************************/
    public static addSmallPark(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0
    )
    : void
    {
        const CORNER_SIZE :number = 17.5;

        bz.StageFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 100.0, 6.5, 100.0 ),
            rotY,
            null, [], [
            ], 0.0,
            bz.TextureFile.WALL_WOOD_VERT_2, [], [
                // new bz.WindowData( 6.5,  true, true ),
                // new bz.WindowData( 11.0, true, true ),
            ], CORNER_SIZE,
            null, [
            ], [], 0.0,
            bz.TextureFile.WALL_WOOD_VERT_2, [
            ], [
                // new bz.WindowData( 2.0,  false ),
            ], CORNER_SIZE,
            bz.TextureFile.WALL_GRASS_1,
            null
        );

        // 3d trees
        for ( let x:number = 25.0; x <= 100.0; x += 50.0 )
        {
            for ( let z:number = 25.0; z <= 100.0; z += 50.0 )
            {
                const tree:bz.Wall = new bz.Wall
                (
                    stage,
                    new bz.Model(
                        meshFactory.genrateTree(
                            position.add( new BABYLON.Vector3( x, 0.0, z ) )
                        )
                    )
                );
                stage.addWall( tree );
            }
        }

        // bench 1
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.BENCH_1,
                    position.add( new BABYLON.Vector3( 60.0, 1.3, 12.5 ) ),
                    bz.PhysicSet.SHELVES,
                    180.0,
                    bz.ModelCompoundType.NONE
                ),
                8.0
            )
        );
        // bench 1
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.BENCH_1,
                    position.add( new BABYLON.Vector3( 52.5, 1.3, 60.5 ) ),
                    bz.PhysicSet.SHELVES,
                    90.0,
                    bz.ModelCompoundType.NONE
                ),
                8.0
            )
        );
    }

    /** ****************************************************************************************************************
    *   Adds a hallway to the stage.
    *******************************************************************************************************************/
    public static addHallway(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0
    )
    : void
    {
        bz.StageFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 80.0, bz.SettingAEC.WALL_HEIGHT, bz.SettingAEC.HALLWAY_WIDTH ),
            rotY,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [], [
                new bz.WindowData( 2.0,  false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 16.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 52.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 66.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
            ], 0,
            null, [], [
                // new bz.WindowData( 6.5,  true, true ),
                // new bz.WindowData( 11.0, true, true ),
            ], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
            ], [
                new bz.WindowData( 2.0,  false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 16.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 52.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 66.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
            ], 0,
            null, [
            ], [
            ], 0,
            bz.TextureFile.WALL_CARPET_RASPBERRY,
            bz.TextureFile.WALL_CEILING_1
        );
    }

    /** ****************************************************************************************************************
    *   Adds a large office to the stage.
    *******************************************************************************************************************/
    public static addLargeOffice(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0,
        pointLights :BABYLON.Light[]
    ) : void
    {
        bz.StageFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 80.0, bz.SettingAEC.WALL_HEIGHT, 40.0 ),
            rotY,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [], [
                new bz.WindowData( 2.0,  false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 16.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 52.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 66.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
            ], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [], [
                // new bz.WindowData( 6.5,  true, true ),
                // new bz.WindowData( 11.0, true, true ),
            ], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
                new bz.DoorData( 5.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),
                new bz.DoorData( 65.0, [], bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, true ),
            ], [], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
            ], [
                // new bz.WindowData( 2.0,  false ),
            ], 0,
            bz.TextureFile.WALL_CARPET_RASPBERRY,
            bz.TextureFile.WALL_CEILING_1
        );

        // tv (65 inch)
        const tv:bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model
            (
                meshFactory.createBox
                (
                    position.add( new BABYLON.Vector3( 24.0, 5.0, 39.5 ) ),
                    bz.TextureFile.VIDEO_TEST,
                    new BABYLON.Vector3( ( 15.0 * 0.640 ), ( 15.0 * 0.360 ), 0.25 ),
                    bz.PhysicSet.STATIC,
                    1.0,
                    bz.MeshAnchor.CENTER_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                )
            ),
            bz.GameObject.UNBREAKABLE,
            false,
            false,
            [
                new bz.Event(
                    bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                    new bz.EventDataShowGuiTextMessage( 'Nothing on the television today' )
                ),
                new bz.Event(
                    bz.EventType.TIME_DELAY,
                    new bz.EventDataTimeDelay( ( 2 * 60 ) )
                ),
                new bz.Event(
                    bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                    new bz.EventDataShowGuiTextMessage( 'DELAYED: I will turn the lights off :)' )
                ),
                new bz.Event(
                    bz.EventType.TOGGLE_LIGHT,
                    new bz.EventDataToggleLight( pointLights )
                ),
            ],
            bz.InteractionType.REPEATED
        );
        stage.addWall( tv );

        // solid sphere
        stage.addWall(
            new bz.Wall
            (
                stage,
                new bz.Model
                (
                    meshFactory.createSphere
                    (
                        position.add( new BABYLON.Vector3( 10.5, 1.5, 30.0 ) ),
                        bz.MeshAnchor.CENTER_XYZ,
                        3.0,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                        bz.TextureFile.MODEL_WOOD_HORZ,
                        null,
                        bz.PhysicSet.WHITE_TEST_SPHERE
                    )
                )
            )
        );
    }

    /** ****************************************************************************************************************
    *   Adds a medium office to the stage.
    *******************************************************************************************************************/
    public static addMediumOffice(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number = 0
    ) : void
    {
        bz.StageFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 58.0, bz.SettingAEC.WALL_HEIGHT, 40.0 ),
            rotY,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [], [
                new bz.WindowData( 2.0,  false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 16.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 30.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 44.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
            ], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [], [
                // new bz.WindowData( 6.5,  true, true ),
                // new bz.WindowData( 11.0, true, true ),
            ], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
                new bz.DoorData(
                    10.0,
                    [],
                    bz.DoorAnimation.SWING_A_CLOCKWISE,
                    true,
                    bz.TextureFile.WALL_DOOR_WOOD_1,
                    -1,
                    false
                ),
                new bz.DoorData(
                    43.0,
                    [],
                    bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE,
                    true,
                    bz.TextureFile.WALL_DOOR_WOOD_1,
                    -1,
                    true
                ),
            ], [], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
            ], [
                // new bz.WindowData( 2.0,  false ),
            ], 0,
            bz.TextureFile.WALL_CARPET_RASPBERRY,
            bz.TextureFile.WALL_CEILING_1
        );

        // office desk 2
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.OFFICE_DESK_2,
                    position.add( new BABYLON.Vector3( 21.0, 1.6, 37.5 ) ),
                    bz.PhysicSet.SHELVES,
                    0.0,
                    bz.ModelCompoundType.NONE
                ),
                5.0
            )
        );

        // shelves
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SHELVES_1,
                    position.add( new BABYLON.Vector3( 33.5, 3.15, 37.5 ) ),
                    bz.PhysicSet.SHELVES,
                    2.0,
                    bz.ModelCompoundType.NONE
                ),
                5.0
            )
        );

        // computer desk
        AECFactory.addComputerDesk( stage, meshFactory, new BABYLON.Vector3( 12.0, 1.7, 7.0 ), 90.0  );
        AECFactory.addComputerDesk( stage, meshFactory, new BABYLON.Vector3( 46.0, 1.7, 7.0 ), -90.0 );

        // sofa 1
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SOFA_1,
                    position.add( new BABYLON.Vector3( 25.5, 2.0, 2.5 ) ),
                    bz.PhysicSet.SHELVES,
                    180.0,
                    bz.ModelCompoundType.NONE
                ),
                5.0
            )
        );

        // office chair 1
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                    position.add( new BABYLON.Vector3( 20.0, 2.3, 14.0 ) ),
                    bz.PhysicSet.OFFICE_CHAIR,
                    0.0,
                    bz.ModelCompoundType.COMPOUND
                ),
                5.0
            )
        );

        // office chair 1
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                    position.add( new BABYLON.Vector3( 8.5, 2.3, 14.0 ) ),
                    bz.PhysicSet.OFFICE_CHAIR,
                    0.0,
                    bz.ModelCompoundType.PHYSICS_JOINT_TYPE_LOCK
                ),
                5.0
            )
        );


        if ( true ) return;

        // office desk 3
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.WORKBENCH,
                    position.add( new BABYLON.Vector3( 10.0, 0.0, 25.0 ) ),
                    bz.PhysicSet.SHELVES,
                    30.0
                ),
                10.0
            )
        );

        // soda machine 2 TODO to casino
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SODA_MACHINE_2,
                    position.add( new BABYLON.Vector3( 5.5, 3.15, 37.5 ) ),
                    bz.PhysicSet.SODA_MACHINE,
                    0.0,
                    bz.ModelCompoundType.NONE
                ),
                7.0
            )
        );
    }

    /** ****************************************************************************************************************
    *   Adds a small office to the stage.
    *******************************************************************************************************************/
    public static addSmallOffice(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0
    ) : void
    {
        bz.StageFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 30.0, bz.SettingAEC.WALL_HEIGHT, 20.0 ),
            rotY,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [], [
                new bz.WindowData( 2.0,  false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 16.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                // new bz.WindowData( 30.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                // new bz.WindowData( 44.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
            ], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [], [
                // new bz.WindowData( 6.5,  true, true ),
                // new bz.WindowData( 11.0, true, true ),
            ], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
                new bz.DoorData( 5.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),
            ], [], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
            ], [
                // new bz.WindowData( 2.0,  false ),
            ], 0,
            bz.TextureFile.WALL_CARPET_RASPBERRY,
            bz.TextureFile.WALL_CEILING_1
        );
    }

    /** ****************************************************************************************************************
    *   Adds a 'parking lot' location to the stage.
    *******************************************************************************************************************/
    public static addParkingLot(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0
    ) : void
    {
        bz.StageFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 40.0, 3.0, 60.0 ),
            rotY,
            bz.TextureFile.WALL_STONES_DARK_GRANITE, [
            new bz.DoorData( 5.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),

            ], [
//                new bz.WindowData( 2.0,  false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
//                new bz.WindowData( 16.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                // new bz.WindowData( 30.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                // new bz.WindowData( 44.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
            ], 0,
            bz.TextureFile.WALL_STONES_DARK_GRANITE, [], [
                // new bz.WindowData( 6.5,  true, true ),
                // new bz.WindowData( 11.0, true, true ),
            ], 0,
            bz.TextureFile.WALL_STONES_DARK_GRANITE, [
                new bz.DoorData( 10.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),
//                new bz.DoorData( 5.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),
                // new bz.DoorData( 32.0, [], bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, true ),
            ], [], 0,
            bz.TextureFile.WALL_STONES_DARK_GRANITE, [
            ], [
                // new bz.WindowData( 2.0,  false ),
            ], 0,
            bz.TextureFile.MODEL_CONCRETE,
            null
        );

        // car camaro
        const carCamaro :bz.Wall = new bz.Wall
        (
            stage,
            meshFactory.createImportedModel
            (
                bz.ModelFile.CAR_CAMARO,
                position.add( new BABYLON.Vector3(10.0, 0.0, 30.0 ) ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                180.0
            ),
            12.0
        );
        stage.addWall( carCamaro );

        // car cadillac
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CAR_CADILLAC,
                    position.add( new BABYLON.Vector3(50.0, 0.0, 30.0 ) ),
                    bz.PhysicSet.SHELVES,
                    null
                ),
                10.0
            )
        );

        // bike suzuki
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.BIKE_SUZUKI,
                    position.add( new BABYLON.Vector3( 70.0, 0.0, 30.0 ) ),
                    bz.PhysicSet.SHELVES,
                    null
                ),
                10.0
            )
        );

        // garage 1
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.GARAGE_1,
                    position.add( new BABYLON.Vector3( 100.0, 0.0, 100.0 ) ),
                    bz.PhysicSet.SHELVES,
                    null,
                    180.0
                ),
                10.0
            )
        );

        // sewerage pumping
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SEWERAGE_PUMPING,
                    new BABYLON.Vector3( 15.0, 0.0, -20.0 ),
                    bz.PhysicSet.SHELVES,
                    0.0
                ),
                10.0
            )
        );
    }

    /** ****************************************************************************************************************
    *   Adds a 'backyard' location to the stage.
    *******************************************************************************************************************/
    public static addBackyard(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0
    ) : void
    {
        bz.StageFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 40.0, 3.0, 60.0 ),
            rotY,
            bz.TextureFile.WALL_STONES_DARK_GRANITE, [
            new bz.DoorData(
                5.0,
                [],
                bz.DoorAnimation.SWING_A_CLOCKWISE,
                true,
                bz.TextureFile.WALL_DOOR_WOOD_1,
                -1,
                false
            ),
            ], [
            ], 0,
            null, [], [
            ], 0,
            bz.TextureFile.WALL_STONES_DARK_GRANITE, [
                new bz.DoorData(
                    10.0,
                    [],
                    bz.DoorAnimation.SWING_A_CLOCKWISE,
                    true,
                    bz.TextureFile.WALL_DOOR_WOOD_1,
                    -1,
                    false
                ),
            ], [], 0,
            null, [
            ], [
                // new bz.WindowData( 2.0,  false ),
            ], 0,
            bz.TextureFile.WALL_ASPHALT_CRACKED,
            null
        );

        // wooden fence
        bz.AECFactory.createFence(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3(0.0, 0.0, 0.0 ) ),
            [ 1, 2, 3, 4, 5 ],
            0.0
        );

        // 3d tree 1
        const tree1:bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model(
                meshFactory.genrateTree(
                    position.add( new BABYLON.Vector3( -10.0, 0.0, 15.0 ) )
                )
            )
        );
        stage.addWall( tree1 );

        // 3d tree 2
        const tree2:bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model(
                meshFactory.genrateTree(
                    position.add( new BABYLON.Vector3( -10.0, 0.0, 30.0 ) )
                )
            )
        );
        stage.addWall( tree2 );

        // trash container blue
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.WASTE_CONTAINER,
                    position.add( new BABYLON.Vector3( 20.0, 0.0, 15.0 ) ),
                    bz.PhysicSet.SHELVES,
                    null
                ),
                10.0
            )
        );

        // trash container green
        const trashContainer :bz.Wall = new bz.Wall
        (
            stage,
            meshFactory.createImportedModel
            (
                bz.ModelFile.WASTE_CONTAINER,
                position.add( new BABYLON.Vector3( 35.0, 0.0, 15.0 ) ),
                bz.PhysicSet.SHELVES,
                null
            ),
            10.0
        );
        trashContainer.getModel().changeTexture(
            stage.getScene(),
            bz.SettingResource.PATH_MODEL + 'object/wasteContainer_blue.jpg',
            bz.SettingResource.PATH_MODEL + 'object/wasteContainer_green.jpg'
        );
        stage.addWall( trashContainer );

        // big bin
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.BIG_BIN,
                    position.add( new BABYLON.Vector3( 45.0, 0.0, 10.0 ) ),
                    bz.PhysicSet.SHELVES,
                    0.0
                ),
                10.0
            )
        );

        // car opel record
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CAR_OPEL_RECORD,
                    position.add( new BABYLON.Vector3(30.0, 0.0, 30.0 ) ),
                    bz.PhysicSet.SHELVES,
                    30.0
                ),
                10.0
            )
        );
    }

    /** ****************************************************************************************************************
    *   Adds a 'warehouse' location to the stage.
    *******************************************************************************************************************/
    public static addWarehouse(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0
    ) : void
    {
        bz.StageFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 60.0, bz.SettingAEC.WALL_HEIGHT, 60.0 ),
            rotY,
            bz.TextureFile.WALL_CONCRETE_NEW, [
            new bz.DoorData( 5.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),

            ], [
//                new bz.WindowData( 2.0,  false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
//                new bz.WindowData( 16.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                // new bz.WindowData( 30.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                // new bz.WindowData( 44.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
            ], 0,
            bz.TextureFile.WALL_CONCRETE_NEW, [], [
                // new bz.WindowData( 6.5,  true, true ),
                // new bz.WindowData( 11.0, true, true ),
            ], 0,
            bz.TextureFile.WALL_CONCRETE_NEW, [
                new bz.DoorData( 10.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),
            ], [], 0,
            bz.TextureFile.WALL_CONCRETE_NEW, [
            ], [
                // new bz.WindowData( 2.0,  false ),
            ], 0,
            bz.TextureFile.WALL_DIAMOND_PLATE_1,
            bz.TextureFile.WALL_CEILING_1
        );

        // pallet cement 1
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.PALLET_CEMENT_1,
                    position.add( new BABYLON.Vector3( 15.0, 0.0, 10.0 ) ),
                    bz.PhysicSet.SHELVES,
                    0.0
                ),
                10.0
            )
        );

        // pallet cement 2
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.PALLET_CEMENT_2,
                    position.add( new BABYLON.Vector3( 25.0, 0.0, 10.0 ) ),
                    bz.PhysicSet.SHELVES,
                    0.0
                ),
                10.0
            )
        );

        // pallet cement 3
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.PALLET_CEMENT_3,
                    position.add( new BABYLON.Vector3( 10.0, 0.0, 25.0 ) ),
                    bz.PhysicSet.SHELVES,
                    0.0
                ),
                10.0
            )
        );

        // transpallet
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.TRANSPALLET,
                    position.add( new BABYLON.Vector3(-5.0, 0.0, -5.0 ) ),
                    bz.PhysicSet.SHELVES,
                    45.0
                ),
                10.0
            )
        );

        // boxes pile
        bz.AECFactory.addCratesPile(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 5.0, 0.0, 25.0 ) )
        );

        // pillar from new concrete
        bz.AECFactory.addPillar(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 15.0, 0.0, 20.0 ) )
        );
        // pillar from new concrete
        bz.AECFactory.addPillar(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 25.0, 0.0, 20.0 ) )
        );
        // pillar from new concrete
        bz.AECFactory.addPillar(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 15.0, 0.0, 30.0 ) )
        );
        // pillar from new concrete
        bz.AECFactory.addPillar(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 25.0, 0.0, 30.0 ) )
        );
    }

    /** ****************************************************************************************************************
    *   Creates a fence.
    *
    *   @param stage       Stage to create the fence in.
    *   @param meshFactory The meshFactory for model creation.
    *   @param position    The initial position of the fence.
    *   @param ids         The ids of the fence pieces.
    *   @param rotY        Rotation on axis Y for the fence.
    *
    *   @return The created wooden crate.
    *******************************************************************************************************************/
    public static createFence(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        ids         :number[],
        rotY        :number
    )
    : void
    {
        const fenceWalls  :bz.Wall[]       = [];

        const FENCE_WIOTH :number          = 8.5;
        const anchor      :BABYLON.Vector3 = position.clone();
        let   z           :number          = position.z;

        for ( const id of ids )
        {
            let fileName :string = null;
            switch ( id )
            {
                case 1: fileName = bz.ModelFile.WOODEN_FENCE_1; break;
                case 2: fileName = bz.ModelFile.WOODEN_FENCE_2; break;
                case 3: fileName = bz.ModelFile.WOODEN_FENCE_3; break;
                case 4: fileName = bz.ModelFile.WOODEN_FENCE_4; break;
                case 5:
                default:
                {
                    fileName = bz.ModelFile.WOODEN_FENCE_5;
                    break;
                }
            }

            fenceWalls.push(
                new bz.Wall
                (
                    stage,
                    meshFactory.createImportedModel
                    (
                        fileName,
                        new BABYLON.Vector3( anchor.x, anchor.y, z + ( FENCE_WIOTH / 2 ) ),
                        bz.PhysicSet.SHELVES,
                        0.0
                    )
                )
            );

            z += FENCE_WIOTH;
        }

        // rotate all fence walls around pivot
        for ( const fenceWall of fenceWalls )
        {
            fenceWall.getModel().rotateAroundAxisY( position.x, position.z, rotY );
        }

        // add fence walls to stage
        stage.addWall( fenceWalls );
    }


    /** ****************************************************************************************************************
    *   Adds a pile of boxes to this stage.
    *
    *   @param stage       The stage to apply the pile of boxes to.
    *   @param meshFactory The MeshFactory instance.
    *   @param pos         center bottom position of the boxes pile to set.
    *******************************************************************************************************************/
    public static addCratesPile( stage:bz.Stage, meshFactory:bz.MeshFactory, pos:BABYLON.Vector3 ) : void
    {
        // add 5 wooden crates
        stage.addWall(
            bz.AECFactory.createWoodenCrate(
                stage,
                meshFactory,
                new BABYLON.Vector3( pos.x, pos.y, pos.z )
            )
        );
        stage.addWall(
            bz.AECFactory.createWoodenCrate(
                stage,
                meshFactory,
                new BABYLON.Vector3( pos.x + 2.5, pos.y, pos.z + 2.5 )
            )
        );
        stage.addWall(
            bz.AECFactory.createWoodenCrate(
                stage,
                meshFactory,
                new BABYLON.Vector3( pos.x + 2.5, pos.y, pos.z ) )
        );
        stage.addWall(
            bz.AECFactory.createWoodenCrate(
                stage,
                meshFactory,
                new BABYLON.Vector3( pos.x + 2.5, pos.y + 2.5, pos.z + 2.5 )
            )
        );
        stage.addWall(
            bz.AECFactory.createWoodenCrate(
                stage,
                meshFactory,
                new BABYLON.Vector3( pos.x + 2.5, pos.y + 5.0, pos.z + 2.5 )
            )
        );
    }


    /** ****************************************************************************************************************
    *   Creates one wooden crate.
    *
    *   @param stage Stage to create the crate in.
    *   @param meshFactory The meshFactory for model creation.
    *   @param position    The initial position of the crate.
    *
    *   @return The created wooden crate.
    *******************************************************************************************************************/
    public static createWoodenCrate(
        stage              :bz.Stage,
        meshFactory        :bz.MeshFactory,
        position           :BABYLON.Vector3
    )
    : bz.Wall
    {
        return new bz.Wall
        (
            stage,
            meshFactory.createImportedModel
            (
                bz.ModelFile.CRATE,
                position,
                bz.PhysicSet.CRATE_WOOD
            ),
            bz.MathUtil.getRandomInt( bz.SettingGame.CRATE_MIN_ENERGY, bz.SettingGame.CRATE_MAX_ENERGY )
        )
    }

    private static addPillar(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3
    )
    : void
    {
        stage.addWall(
            new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            position,
                            bz.TextureFile.WALL_CONCRETE_NEW,
                            new BABYLON.Vector3(
                                bz.SettingAEC.PILLAR_WIDTH,
                                bz.SettingAEC.WALL_HEIGHT,
                                bz.SettingAEC.PILLAR_WIDTH
                            ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            )
        );
    }

    // TODO to FurnitureFactory !

    private static addComputerDesk(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number = 0.0
    )
    : void
    {
        // office desk 1
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.OFFICE_DESK_1,
                    position,
                    bz.PhysicSet.SHELVES,
                    rotY,
                    bz.ModelCompoundType.NONE // bz.ModelCompoundType.COMPOUND,
                ),
                5.0
            )
        );

        // pc screen 1
        const screen :bz.Wall = new bz.Wall
        (
            stage,
            meshFactory.createImportedModel
            (
                bz.ModelFile.PC_SCREEN_1,
                position.add( new BABYLON.Vector3( 2.5, 2.8, 2.5 ) ),
                bz.PhysicSet.SHELVES,
                180.0,
                bz.ModelCompoundType.NONE
            ),
            5.0,
            true,
            false,
            [
                new bz.Event(
                    bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                    new bz.EventDataShowGuiTextMessage( 'All cleared for today.' )
                ),
                new bz.Event(
                    bz.EventType.TIME_DELAY,
                    new bz.EventDataTimeDelay( 600 )
                ),
                new bz.Event(
                    bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                    new bz.EventDataShowGuiTextMessage( 'DELAYED: No more work for today.' )
                ),
            ],
            bz.InteractionType.ONCE
        );
        screen.getModel().rotateAroundAxisY( position.x, position.z, rotY );
        stage.addWall( screen );
    }
}

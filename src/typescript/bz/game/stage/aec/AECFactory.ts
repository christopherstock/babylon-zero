// noinspection JSUnusedLocalSymbols

import * as bz from '../../..';

/** ********************************************************************************************************************
*   Configuration set for a Door game object.
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
        bz.RoomFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 140.0, 7.5, 140.0 ),
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
                    position.add( new BABYLON.Vector3( 100.0, 0.0, 35.0 ) ),
                    bz.PhysicSet.STATIC,
                    90.0,
                    135.0
                )
            )
        );

        // 3d trees
        const tree1:bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model(
                meshFactory.genrateTree(
                    position.add( new BABYLON.Vector3( 15.0, 0.0, 30.0 ) )
                )
            )
        );
        stage.addWall( tree1 );
        const tree2:bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model(
                meshFactory.genrateTree(
                    position.add( new BABYLON.Vector3( 50.0, 0.0, 30.0 ) )
                )
            )
        );
        stage.addWall( tree2 );
        const tree3:bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model(
                meshFactory.genrateTree(
                    position.add( new BABYLON.Vector3( 75.0, 0.0, 30.0 ) )
                )
            )
        );
        stage.addWall( tree3 );
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

        bz.RoomFactory.addRoomWalls(
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
        rotY        :number  = 0.0,
        length      :number  = 80.0,
        leftWall    :boolean = true,
        rightWall   :boolean = true
    )
    : void
    {
        bz.RoomFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( length, bz.SettingAEC.WALL_HEIGHT, bz.SettingAEC.HALLWAY_WIDTH ),
            rotY,
            ( leftWall ? bz.TextureFile.WALL_DARK_WOOD_PARQUET : null ), [], [
                // new bz.WindowData( 2.0,  false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                // new bz.WindowData( 16.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                // new bz.WindowData( 52.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                // new bz.WindowData( 66.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
            ], 0,
            null, [], [
                // new bz.WindowData( 6.5,  true, true ),
                // new bz.WindowData( 11.0, true, true ),
            ], 0,
            ( rightWall ? bz.TextureFile.WALL_DARK_WOOD_PARQUET : null ), [
            ], [
                new bz.WindowData( 2.0,  false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 16.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 30.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 44.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
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
        rotY        :number = 0
    )
    : void
    {
        bz.RoomFactory.addRoomWalls(
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
                new bz.DoorData(
                    5.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true,
                    bz.TextureFile.WALL_DOOR_WOOD_1, -1, false
                ),
                new bz.DoorData(
                    65.0, [], bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE, true,
                    bz.TextureFile.WALL_DOOR_WOOD_1, -1, true
                ),
            ], [], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
            ], [
                // new bz.WindowData( 2.0,  false ),
            ], 0,
            bz.TextureFile.WALL_CARPET_RASPBERRY,
            bz.TextureFile.WALL_CEILING_1
        );

        // solid sphere
        bz.FurnitureFactory.addWoodenSphere1(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 10.5, 1.5, 30.0 ) )
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
        bz.RoomFactory.addRoomWalls(
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

        // point light
        bz.AECFactory.addPointLight(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 10.0, 5.0, 10.0 ) )
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
        bz.FurnitureFactory.addShelves1(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 33.5, 3.15, 37.5 ) ),
            2.0
        );

        // computer desk
        bz.FurnitureFactory.addComputerDesk( stage, meshFactory, new BABYLON.Vector3( 12.0, 1.7, 7.0 ), 90.0  );
        bz.FurnitureFactory.addComputerDesk( stage, meshFactory, new BABYLON.Vector3( 46.0, 1.7, 7.0 ), -90.0 );

        // sofa 1
        bz.FurnitureFactory.addSofa1(
            stage, meshFactory, position.add( new BABYLON.Vector3( 25.5, 2.0, 2.5 ) ), 180.0
        );

        // office chair 1
        bz.FurnitureFactory.addOfficeChair1(
            stage, meshFactory, position.add( new BABYLON.Vector3( 3.5, 2.3, 14.0 ) ), 45.0
        );

        // office chair 1
        bz.FurnitureFactory.addOfficeChair1(
            stage, meshFactory, position.add( new BABYLON.Vector3( 46.0, 2.3, 7.5 ) ), 225.0
        );
    }

    /** ****************************************************************************************************************
    *   Adds a 'casino' location to this stage.
    *
    *   @param stage       The stage to add the location to.
    *   @param meshFactory The MeshFactory instance.
    *   @param position    The position to place this location.
    *   @param rotY        The initial Y rotation of the location.
    *******************************************************************************************************************/
    public static addCasino(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number = 0
    )
    : void
    {
        const DIAMOND_CORNER_SIZE :number = 10.0;

        // add casino room (half diamond shaped?)
        bz.RoomFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 58.0, bz.SettingAEC.WALL_HEIGHT, 58.0 ),
            rotY,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [], [
/*
                new bz.WindowData( 2.0,  false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 16.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 30.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                new bz.WindowData( 44.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
*/
            ],
            DIAMOND_CORNER_SIZE,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
                new bz.DoorData(
                    ( 4.0 + bz.SettingAEC.WALL_DEPTH ), [], bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE,
                    true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, true,
                    ( bz.SettingAEC.HALLWAY_WIDTH + 4.0 ), true
                ),
            ], [
                // new bz.WindowData( 6.5,  true, true ),
                // new bz.WindowData( 11.0, true, true ),
            ],
            DIAMOND_CORNER_SIZE,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
            ],
            [],
            DIAMOND_CORNER_SIZE,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
                new bz.DoorData(
                    ( 24.0 - bz.SettingAEC.WALL_DEPTH ), [], bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE,
                    true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, true,
                    ( bz.SettingAEC.HALLWAY_WIDTH + 4.0 ), true
                ),
            ], [
                // new bz.WindowData( 2.0,  false ),
            ],
            DIAMOND_CORNER_SIZE,
            bz.TextureFile.WALL_CARPET_RASPBERRY,
            bz.TextureFile.WALL_CEILING_1
        );

        // point light
        bz.AECFactory.addPointLight(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 29.0, 5.0, 29.0 ) )
        );

        // soda machine 2
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
                7.0,
                true,
                false,
                [
                    new bz.Event(
                        bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                        new bz.EventDataShowGuiTextMessage(
                            'I need a painkiller to get a coke',
                            true
                        ),
                        () : boolean =>
                        {
                            return ( stage.getPlayer().getInventory().numberOfPainkillers === 0 );
                        }
                    ),
                    new bz.Event(
                        bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                        new bz.EventDataShowGuiTextMessage(
                            'I have a painkiller - now I can get a coke',
                            true
                        ),
                        () : boolean =>
                        {
                            return ( stage.getPlayer().getInventory().numberOfPainkillers > 0 );
                        }
                    ),
                ],
                bz.InteractionType.REPEATED
            )
        );
/*
        // sofa 1
        bz.FurnitureFactory.addSofa1(
            stage, meshFactory, position.add( new BABYLON.Vector3( 25.5, 2.0, 20.5 ) ), 180.0
        );
*/
        // soda machine 2
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SODA_MACHINE_2,
                    position.add( new BABYLON.Vector3( 15.5, 3.15, 37.5 ) ),
                    bz.PhysicSet.SODA_MACHINE,
                    0.0,
                    bz.ModelCompoundType.NONE
                ),
                7.0,
                true,
                false,
                [
                ],
                bz.InteractionType.REPEATED
            )
        );

        // soda machine 2
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SODA_MACHINE_2,
                    position.add( new BABYLON.Vector3( 25.5, 3.15, 37.5 ) ),
                    bz.PhysicSet.SODA_MACHINE,
                    0.0,
                    bz.ModelCompoundType.NONE
                ),
                7.0,
                true,
                false,
                [
                ],
                bz.InteractionType.REPEATED
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
        bz.RoomFactory.addRoomWalls(
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
                new bz.DoorData(
                    5.0,
                    [],
                    bz.DoorAnimation.SWING_A_CLOCKWISE,
                    true,
                    bz.TextureFile.WALL_DOOR_WOOD_1,
                    -1,
                    false
                ),
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
        bz.RoomFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 200.0, 3.0, 200.0 ),
            rotY,
            bz.TextureFile.WALL_STONES_DARK_GRANITE, [
                new bz.DoorData(
                    5.0,
                    [],
                    bz.DoorAnimation.SWING_A_CLOCKWISE,
                    false,
                    bz.TextureFile.WALL_DOOR_WOOD_1,
                    -1,
                    false
                ),
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

        // car opel record
        const carOpelRecord :bz.Wall = new bz.Wall
        (
            stage,
            meshFactory.createImportedModel
            (
                bz.ModelFile.CAR_OPEL_RECORD,
                position.add( new BABYLON.Vector3(40.0, 0.0, 60.0 ) ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                180.0
            ),
            12.0
        );
        stage.addWall( carOpelRecord );

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

        // office desk 3
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.WORKBENCH,
                    position.add( new BABYLON.Vector3( 60.0, 0.0, 35.0 ) ),
                    bz.PhysicSet.SHELVES,
                    30.0
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
        bz.RoomFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 60.0, 3.0, 60.0 ),
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
        bz.RoomFactory.addRoomWalls(
            stage,
            meshFactory,
            position,
            new BABYLON.Vector3( 60.0, bz.SettingAEC.WALL_HEIGHT, 60.0 ),
            rotY,
            bz.TextureFile.WALL_CONCRETE_NEW, [
                new bz.DoorData(
                    5.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true,
                    bz.TextureFile.WALL_DOOR_WOOD_1, -1, false
                ),
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
                new bz.DoorData(
                    10.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true,
                    bz.TextureFile.WALL_DOOR_WOOD_1, -1, false
                ),
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
            position.add( new BABYLON.Vector3( 30.0, 0.0, 30.0 ) )
        );

        // pillar from new concrete
        bz.AECFactory.addPillar(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 20.0, 0.0, 20.0 ) )
        );
        // pillar from new concrete
        bz.AECFactory.addPillar(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 40.0, 0.0, 20.0 ) )
        );
        // pillar from new concrete
        bz.AECFactory.addPillar(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 20.0, 0.0, 40.0 ) )
        );
        // pillar from new concrete
        bz.AECFactory.addPillar(
            stage,
            meshFactory,
            position.add( new BABYLON.Vector3( 40.0, 0.0, 40.0 ) )
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

    /** ****************************************************************************************************************
    *   Adds a pillar from new concrete to the stage.
    *
    *   @param stage       The stage to add the pillar to.
    *   @param meshFactory The MeshFactory instance.
    *   @param position    Where to place the pillar.
    *******************************************************************************************************************/
    public static addPillar(
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

    /** ****************************************************************************************************************
    *   Adds a point light to the stage.
    *
    *   @param stage       The stage to add the light to.
    *   @param meshFactory The MeshFactory instance.
    *   @param position    Where to place the light.
    *******************************************************************************************************************/
    public static addPointLight(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3
    )
    :void
    {
        const pointLights :BABYLON.PointLight[] = bz.LightFactory.createPoint
        (
            [ stage.getScene().getNativeSceneBG(), stage.getScene().getNativeSceneFG() ],
            position,
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.75, 0.75, 0.75 ),
            125.0,
            1.25
        );
        stage.addLight( pointLights );
    }

    /** ****************************************************************************************************************
    *   Adds a 'lightyard' location to the stage.
    *******************************************************************************************************************/
    public static addLightyard(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0
    )
    : void
    {
        // create lightyard
    }

    /** ****************************************************************************************************************
    *   Adds a 'office kitchen' location to the stage.
    *******************************************************************************************************************/
    public static addOfficeKitchen(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0
    )
    : void
    {
        // create office kitchen
    }

    /** ****************************************************************************************************************
    *   Adds a 'kicker lounge' location to the stage.
    *******************************************************************************************************************/
    public static addKickerLounge(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0
    )
    : void
    {
        // create kicker lounge
    }
}

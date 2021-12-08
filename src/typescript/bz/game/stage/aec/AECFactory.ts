import * as bz from '../../..';

/** ********************************************************************************************************************
*   Configuration set for a Door game object.
***********************************************************************************************************************/
export class AECFactory
{
    public static addResidentalStreet(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0
    )
    : void
    {

    }

    public static addSmallPark(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number          = 0
    )
    : void
    {

    }

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
                // new bz.DoorData( 5.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),
                // new bz.DoorData( 65.0, [], bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, true ),
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

    public static addLargeOffice(
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
    }

    public static addMediumOffice(
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
                new bz.DoorData( 21.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),
                new bz.DoorData( 32.0, [], bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, true ),
            ], [], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
            ], [
                // new bz.WindowData( 2.0,  false ),
            ], 0,
            bz.TextureFile.WALL_CARPET_RASPBERRY,
            bz.TextureFile.WALL_CEILING_1
        );
    }

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
                // new bz.DoorData( 32.0, [], bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, true ),
            ], [], 0,
            bz.TextureFile.WALL_DARK_WOOD_PARQUET, [
            ], [
                // new bz.WindowData( 2.0,  false ),
            ], 0,
            bz.TextureFile.WALL_CARPET_RASPBERRY,
            bz.TextureFile.WALL_CEILING_1
        );
    }

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
                position.addInPlaceFromFloats( 10.0, 0.0, 30.0 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                180.0
            ),
            12.0
        );
        stage.addWall( carCamaro );

        // car opel record
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CAR_OPEL_RECORD,
                    position.addInPlaceFromFloats( 30.0, 0.0, 30.0 ),
                    bz.PhysicSet.SHELVES,
                    null
                ),
                10.0
            )
        );

        // car cadillac
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CAR_CADILLAC,
                    position.addInPlaceFromFloats( 50.0, 0.0, 30.0 ),
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
                    new BABYLON.Vector3( 70.0, 0.0, 30.0 ),
                    bz.PhysicSet.SHELVES,
                    null
                ),
                10.0
            )
        );
    }

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
            new bz.DoorData( 5.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),

            ], [
//                new bz.WindowData( 2.0,  false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
//                new bz.WindowData( 16.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                // new bz.WindowData( 30.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
                // new bz.WindowData( 44.0, false, false, bz.SettingAEC.WINDOW_WIDTH_WIDE ),
            ], 0,
            null, [], [
                // new bz.WindowData( 6.5,  true, true ),
                // new bz.WindowData( 11.0, true, true ),
            ], 0,
            bz.TextureFile.WALL_STONES_DARK_GRANITE, [
                new bz.DoorData( 10.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),
//                new bz.DoorData( 5.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),
                // new bz.DoorData( 32.0, [], bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, true ),
            ], [], 0,
            null, [
            ], [
                // new bz.WindowData( 2.0,  false ),
            ], 0,
            bz.TextureFile.WALL_ASPHALT_CRACKED,
            null
        );
    }

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
//                new bz.DoorData( 5.0, [], bz.DoorAnimation.SWING_A_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, false ),
                // new bz.DoorData( 32.0, [], bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE, true, bz.TextureFile.WALL_DOOR_WOOD_1, -1, true ),
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
                    position.addInPlaceFromFloats( 15.0, 0.0, 10.0 ),
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
                    position.addInPlaceFromFloats( 25.0, 0.0, 10.0 ),
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
                    position.addInPlaceFromFloats( 10.0, 0.0, 25.0 ),
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
                    position.addInPlaceFromFloats( -5.0, 0.0, -5.0 ),
                    bz.PhysicSet.SHELVES,
                    45.0
                ),
                10.0
            )
        );
    }
}

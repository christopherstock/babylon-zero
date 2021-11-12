import * as bz from '../..';

/** ********************************************************************************************************************
*   Offers creation methods for stage construction.
***********************************************************************************************************************/
export class StageFactory
{
    public static addRoomWalls(
        stage          :bz.Stage,
        meshFactory    :bz.MeshFactory,
        position       :BABYLON.Vector3,
        size           :BABYLON.Vector3,
        rotZ           :number,
        textureWall    :bz.Texture,
        textureFloor   :bz.Texture,
        textureCeiling :bz.Texture,
        doorsX1        :number[] = [],
        windowsX1      :number[] = []
    )
    : void
    {
        // all walls to add to the stage at the end of this method
        const roomWalls :bz.Wall[] = [];

        // wall X1 - door frames
        for ( const doorX1 of doorsX1 )
        {
            const doorFrameX1 :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( doorX1, position.y + size.y - bz.SettingEngine.DOOR_FRAME_HEIGHT, position.z ),
                            bz.Texture.WALL_TEST,
                            new BABYLON.Vector3( bz.SettingEngine.DOOR_WIDTH, bz.SettingEngine.DOOR_FRAME_HEIGHT, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );

            roomWalls.push( doorFrameX1 );
        }

        // wall X1 - window frames
        for ( const windowX1 of windowsX1 )
        {
            // top window frame X1
            const topWindowFrameX1 :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( windowX1, position.y + size.y - bz.SettingEngine.WINDOW_TOP_FRAME_HEIGHT, position.z ),
                            bz.Texture.WALL_TEST,
                            new BABYLON.Vector3( bz.SettingEngine.WINDOW_WIDTH, bz.SettingEngine.WINDOW_TOP_FRAME_HEIGHT, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );

            // window glass X1
            const windowGlassX1 :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( windowX1, position.y + size.y - bz.SettingEngine.WINDOW_TOP_FRAME_HEIGHT - bz.SettingEngine.WINDOW_HEIGHT, position.z ),
                            bz.Texture.WALL_GLASS,
                            new BABYLON.Vector3( bz.SettingEngine.WINDOW_WIDTH, bz.SettingEngine.WINDOW_HEIGHT, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            0.25,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );

            // bottom window frame X1
            const bottomWindowFrameX1 :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( windowX1, position.y, position.z ),
                            bz.Texture.WALL_TEST,
                            new BABYLON.Vector3( bz.SettingEngine.WINDOW_WIDTH, bz.SettingEngine.WINDOW_BOTTOM_FRAME_HEIGHT, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );

            roomWalls.push( topWindowFrameX1    );
            roomWalls.push( windowGlassX1       );
            roomWalls.push( bottomWindowFrameX1 );
        }

        // wall X1

        // collect all busy walls X1
        const busyWallsX1 :BABYLON.Vector2[] = [];
        for ( const windowX1 of windowsX1 )
        {
            StageFactory.pushSortedByX(
                busyWallsX1,
                new BABYLON.Vector2( position.x + windowX1, position.x + windowX1 + bz.SettingEngine.WINDOW_WIDTH )
            );
        }
        for ( const doorX1 of doorsX1 )
        {
            StageFactory.pushSortedByX(
                busyWallsX1,
                new BABYLON.Vector2( position.x + doorX1, position.x + doorX1 + bz.SettingEngine.DOOR_WIDTH )
            );
        }

        console.log( busyWallsX1 );

        const freeWallsX1 :number[] = [];
        freeWallsX1.push( position.x );
        for ( const busyWallX1 of busyWallsX1 )
        {
            freeWallsX1.push( busyWallX1.x );
            freeWallsX1.push( busyWallX1.y );
        }
        freeWallsX1.push( position.x + size.x );

        for ( let i = 0; i < freeWallsX1.length; i += 2 )
        {
            const wallX1 :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( freeWallsX1[ i ], position.y, position.z ),
                            bz.Texture.WALL_TEST,
                            new BABYLON.Vector3( ( freeWallsX1[ i + 1 ] - freeWallsX1[ i ] ), size.y, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );

            roomWalls.push( wallX1 );
        }

        // wall X2
        const wallX2 :bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( position.x + bz.SettingEngine.WALL_DEPTH, position.y, ( position.z + size.z ) ),
                        bz.Texture.WALL_METAL,
                        new BABYLON.Vector3( size.x, size.y, bz.SettingEngine.WALL_DEPTH ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ
                    ),
                ]
            )
        );

        // wall Z1
        const wallZ1 :bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( ( position.x - size.z - bz.SettingEngine.WALL_DEPTH ), position.y, position.z ),
                        bz.Texture.WALL_BRICKS_2,
                        new BABYLON.Vector3( size.z, size.y, bz.SettingEngine.WALL_DEPTH ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ
                    ),
                ]
            )
        );

        // wall Z2
        const wallZ2 :bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( ( position.x + size.x ), position.y, ( position.z + size.z ) ),
                        bz.Texture.WALL_WOOD_VERT,
                        new BABYLON.Vector3( size.z, size.y, bz.SettingEngine.WALL_DEPTH ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ
                    ),
                ]
            )
        );

        // ceiling
        const ceiling :bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( position.x, ( position.y + size.y ), position.z ),
                        textureCeiling,
                        new BABYLON.Vector3( size.x, bz.SettingEngine.FACE_DEPTH, size.z ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                    ),
                ]
            )
        );
        roomWalls.push( ceiling );

        // floor
        const floor :bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( position.x, ( position.y + bz.SettingEngine.FLOOR_OFFSET_Y ), position.z ),
                        textureFloor,
                        new BABYLON.Vector3( size.x, bz.SettingEngine.FACE_DEPTH, size.z ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                    ),
                ]
            )
        )
        roomWalls.push( floor );

        // rotate all Z walls by 90.0° around pivot
        wallZ1.getModel().rotateAroundAxisY( position.x, position.z, 90.0 );
        wallZ2.getModel().rotateAroundAxisY( ( position.x + size.x ), ( position.z + size.z ), 90.0 );

        roomWalls.push(
            wallX2,
            wallZ1,
            wallZ2
        );

        // rotate ALL walls around pivot and all all walls to stage
        for ( const roomWall of roomWalls ) {
            roomWall.getModel().rotateAroundAxisY( position.x, position.z, rotZ );
            stage.addWall( roomWall );
        }
    }

    private static pushSortedByX( busyWalls:BABYLON.Vector2[], vecArr:BABYLON.Vector2 ) :void
    {
        busyWalls.push( vecArr );
    }
}

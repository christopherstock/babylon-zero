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

        StageFactory.createWall(
            roomWalls, doorsX1, windowsX1, stage, meshFactory,
            position.x, size.x, position.y, size.y, position.z,
            0.0,
            bz.Texture.WALL_TEST,
            bz.Texture.WALL_GLASS
        );

        StageFactory.createWall(
            roomWalls, doorsX1, windowsX1, stage, meshFactory,
            position.x + size.x, size.z, position.y, size.y, position.z + bz.SettingEngine.WALL_DEPTH,
            -90.0,
            bz.Texture.WALL_METAL,
            bz.Texture.WALL_GLASS
        );
/*
        // walls X2
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
*/
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
/*
        // rotate all Z walls by 90.0° around pivot
        wallZ1.getModel().rotateAroundAxisY( position.x, position.z, 90.0 );
        wallZ2.getModel().rotateAroundAxisY( ( position.x + size.x ), ( position.z + size.z ), 90.0 );
*/
/*
        roomWalls.push(
            wallX2,
            wallZ1,
            wallZ2
        );
*/
        // rotate ALL walls around pivot and all all walls to stage
        for ( const roomWall of roomWalls ) {
            roomWall.getModel().rotateAroundAxisY( position.x, position.z, rotZ );
            stage.addWall( roomWall );
        }
    }

    private static calculateFreeWalls( start:number, size:number, windows:number[], doors:number[] ) : number[]
    {
        // collect all busy walls
        let busyWalls :BABYLON.Vector2[] = [];
        for ( const window of windows )
        {
            busyWalls.push(
                new BABYLON.Vector2( start + window, start + window + bz.SettingEngine.WINDOW_WIDTH )
            );
        }
        for ( const door of doors )
        {
            busyWalls.push(
                new BABYLON.Vector2( start + door, start + door + bz.SettingEngine.DOOR_WIDTH )
            );
        }

        // sort busy walls by 1st value (X)
        busyWalls = busyWalls.sort(
            ( a:BABYLON.Vector2, b:BABYLON.Vector2 ) => {
                return ( a.x > b.x ? 1 : -1 );
            }
        );

        const freeWalls :number[] = [];
        freeWalls.push( start );
        for ( const busyWall of busyWalls )
        {
            freeWalls.push( busyWall.x );
            freeWalls.push( busyWall.y );
        }
        freeWalls.push( start + size );

        return freeWalls;
    }

    private static createWall(
        roomWalls    :bz.Wall[],
        doorsX1      :number[],
        windowsX1    :number[],
        stage        :bz.Stage,
        meshFactory  :bz.MeshFactory,
        x            :number,
        sizeX        :number,
        y            :number,
        sizeY        :number,
        z            :number,
        rotY         :number,
        textureWall  :bz.Texture,
        textureGlass :bz.Texture
    )
    : void
    {
        const walls :bz.Wall[] = [];

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
                            new BABYLON.Vector3( x + doorX1, y + sizeY - bz.SettingEngine.DOOR_FRAME_HEIGHT, z ),
                            textureWall,
                            new BABYLON.Vector3( bz.SettingEngine.DOOR_WIDTH, bz.SettingEngine.DOOR_FRAME_HEIGHT, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );

            walls.push( doorFrameX1 );
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
                            new BABYLON.Vector3( x + windowX1, y + sizeY - bz.SettingEngine.WINDOW_TOP_FRAME_HEIGHT, z ),
                            textureWall,
                            new BABYLON.Vector3( bz.SettingEngine.WINDOW_WIDTH, bz.SettingEngine.WINDOW_TOP_FRAME_HEIGHT, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );
            walls.push( topWindowFrameX1    );

            // window glass X1
            const windowGlassX1 :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( x + windowX1, y + sizeY - bz.SettingEngine.WINDOW_TOP_FRAME_HEIGHT - bz.SettingEngine.WINDOW_HEIGHT, z ),
                            textureGlass,
                            new BABYLON.Vector3( bz.SettingEngine.WINDOW_WIDTH, bz.SettingEngine.WINDOW_HEIGHT, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            0.25,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );
            walls.push( windowGlassX1       );

            // bottom window frame X1
            const bottomWindowFrameX1 :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( x + windowX1, y, z ),
                            textureWall,
                            new BABYLON.Vector3( bz.SettingEngine.WINDOW_WIDTH, bz.SettingEngine.WINDOW_BOTTOM_FRAME_HEIGHT, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );
            walls.push( bottomWindowFrameX1 );
        }

        // walls X1
        const freeWallsX1 :number[] = StageFactory.calculateFreeWalls( x, sizeX, windowsX1, doorsX1 );
        for ( let i:number = 0; i < freeWallsX1.length; i += 2 )
        {
            const wallX1 :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( freeWallsX1[ i ], y, z ),
                            textureWall,
                            new BABYLON.Vector3( ( freeWallsX1[ i + 1 ] - freeWallsX1[ i ] ), sizeY, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );
            walls.push( wallX1 );
        }

        // rotate if desired
        for ( const wall of walls )
        {
            wall.getModel().rotateAroundAxisY( x, z, rotY );
        }

        // add all to walls array
        for ( const wall of walls )
        {
            roomWalls.push( wall );
        }
    }
}

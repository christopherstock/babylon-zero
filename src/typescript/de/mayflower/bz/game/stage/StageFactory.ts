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
        doorsPos       :number[] = [],
        windowsPos     :number[] = []
    )
    : void
    {
        // all walls to add to the stage at the end of this method
        const roomWalls :bz.Wall[] = [];

        StageFactory.createWall(
            roomWalls, doorsPos, windowsPos, stage, meshFactory,
            position.x,
            size.x,
            position.y,
            size.y,
            position.z,
            0.0, position.x, position.z,
            bz.Texture.WALL_TEST,
            bz.Texture.WALL_GLASS
        );

        StageFactory.createWall(
            roomWalls, doorsPos, windowsPos, stage, meshFactory,
            position.x + size.x + bz.SettingEngine.WALL_DEPTH,
            size.z,
            position.y,
            size.y,
            position.z,
            -90.0, position.x + size.x + bz.SettingEngine.WALL_DEPTH, position.z,
            bz.Texture.WALL_METAL,
            bz.Texture.WALL_GLASS
        );

        StageFactory.createWall(
            roomWalls, doorsPos, windowsPos, stage, meshFactory,
            position.x + size.x + bz.SettingEngine.WALL_DEPTH,
            size.x,
            position.y,
            size.y,
            position.z + size.z + bz.SettingEngine.WALL_DEPTH,
            -180.0, position.x + size.x + bz.SettingEngine.WALL_DEPTH, position.z + size.z + bz.SettingEngine.WALL_DEPTH,
            bz.Texture.WALL_BRICKS_2,
            bz.Texture.WALL_GLASS
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

        // rotate ALL walls around pivot and add all walls to stage
        for ( const roomWall of roomWalls ) {
            roomWall.getModel().rotateAroundAxisY( position.x, position.z, rotZ );
            stage.addWall( roomWall );
        }
    }

    /** ****************************************************************************************************************
    *   Calculates all free positions of the wall in between windows and doors.
    *******************************************************************************************************************/
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
        roomWalls      :bz.Wall[],
        doorsPos       :number[],
        windowsPos     :number[],
        stage          :bz.Stage,
        meshFactory    :bz.MeshFactory,
        x              :number,
        sizeX          :number,
        y              :number,
        sizeY          :number,
        z              :number,
        rotY           :number,
        rotationPivotX :number,
        rotationPivotZ :number,
        textureWall    :bz.Texture,
        textureGlass   :bz.Texture
    )
    : void
    {
        const walls :bz.Wall[] = [];

        // door frames
        for ( const doorPos of doorsPos )
        {
            const doorFrame :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( x + doorPos, y + sizeY - bz.SettingEngine.DOOR_FRAME_HEIGHT, z ),
                            textureWall,
                            new BABYLON.Vector3( bz.SettingEngine.DOOR_WIDTH, bz.SettingEngine.DOOR_FRAME_HEIGHT, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );

            walls.push( doorFrame );
        }

        // window frames
        for ( const window of windowsPos )
        {
            // top window frame
            const topWindowFrame :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( x + window, y + sizeY - bz.SettingEngine.WINDOW_TOP_FRAME_HEIGHT, z ),
                            textureWall,
                            new BABYLON.Vector3( bz.SettingEngine.WINDOW_WIDTH, bz.SettingEngine.WINDOW_TOP_FRAME_HEIGHT, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );
            walls.push( topWindowFrame    );

            // window glass
            const windowGlass :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( x + window, y + sizeY - bz.SettingEngine.WINDOW_TOP_FRAME_HEIGHT - bz.SettingEngine.WINDOW_HEIGHT, z ),
                            textureGlass,
                            new BABYLON.Vector3( bz.SettingEngine.WINDOW_WIDTH, bz.SettingEngine.WINDOW_HEIGHT, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            0.25,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );
            walls.push( windowGlass       );

            // bottom window frame
            const bottomWindowFrame :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( x + window, y, z ),
                            textureWall,
                            new BABYLON.Vector3( bz.SettingEngine.WINDOW_WIDTH, bz.SettingEngine.WINDOW_BOTTOM_FRAME_HEIGHT, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );
            walls.push( bottomWindowFrame );
        }

        // walls
        const freeWalls :number[] = StageFactory.calculateFreeWalls( x, sizeX, windowsPos, doorsPos );
        for ( let i:number = 0; i < freeWalls.length; i += 2 )
        {
            const wall :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( freeWalls[ i ], y, z ),
                            textureWall,
                            new BABYLON.Vector3( ( freeWalls[ i + 1 ] - freeWalls[ i ] ), sizeY, bz.SettingEngine.WALL_DEPTH ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            );
            walls.push( wall );
        }

        // rotate if desired
        for ( const wall of walls )
        {
            wall.getModel().rotateAroundAxisY( rotationPivotX, rotationPivotZ, rotY );
        }

        // add all to walls array
        for ( const wall of walls )
        {
            roomWalls.push( wall );
        }
    }
}

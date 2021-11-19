import * as bz from '../..';

/** ********************************************************************************************************************
*   Offers creation methods for stage construction.
***********************************************************************************************************************/
export abstract class StageFactory
{
    /** ****************************************************************************************************************
    *   Creates one room.
    *******************************************************************************************************************/
    public static addRoomWalls(
        stage              :bz.Stage,
        meshFactory        :bz.MeshFactory,
        position           :BABYLON.Vector3,
        size               :BABYLON.Vector3,
        rotZ               :number,
        textureFileWallA   :bz.TextureFile = null, doorsWallA :number[] = [], windowsWallA :number[] = [],
        textureFileWallB   :bz.TextureFile = null, doorsWallB :number[] = [], windowsWallB :number[] = [],
        textureFileWallC   :bz.TextureFile = null, doorsWallC :number[] = [], windowsWallC :number[] = [],
        textureFileWallD   :bz.TextureFile = null, doorsWallD :number[] = [], windowsWallD :number[] = [],
        textureFileFloor   :bz.TextureFile = null,
        textureFileCeiling :bz.TextureFile = null
    )
    : void
    {
        // all walls to add to the stage at the end of this method
        const roomWalls :bz.Wall[] = [];

        if ( textureFileWallA !== null )
        {
            StageFactory.createWall(
                roomWalls, doorsWallA, windowsWallA, stage, meshFactory,
                position.x,
                size.x,
                position.y,
                size.y,
                position.z,
                0.0,
                textureFileWallA,
                bz.TextureFile.WALL_GLASS
            );
        }

        if ( textureFileWallB !== null )
        {
            StageFactory.createWall(
                roomWalls, doorsWallB, windowsWallB, stage, meshFactory,
                position.x + size.x + bz.SettingGame.WALL_DEPTH,
                size.z,
                position.y,
                size.y,
                position.z,
                -90.0,
                textureFileWallB,
                bz.TextureFile.WALL_GLASS
            );
        }

        if ( textureFileWallC !== null )
        {
            StageFactory.createWall(
                roomWalls, doorsWallC, windowsWallC, stage, meshFactory,
                position.x + size.x + bz.SettingGame.WALL_DEPTH,
                size.x,
                position.y,
                size.y,
                position.z + size.z + bz.SettingGame.WALL_DEPTH,
                -180.0,
                textureFileWallC,
                bz.TextureFile.WALL_GLASS
            );
        }

        if ( textureFileWallD !== null )
        {
            StageFactory.createWall(
                roomWalls, doorsWallD, windowsWallD, stage, meshFactory,
                position.x,
                size.z,
                position.y,
                size.y,
                position.z + size.z + bz.SettingGame.WALL_DEPTH,
                -270.0,
                textureFileWallD,
                bz.TextureFile.WALL_GLASS
            );
        }

        // ceiling
        if ( textureFileCeiling !== null )
        {
            const ceiling :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3(
                                ( position.x + bz.SettingGame.WALL_DEPTH / 2 ),
                                ( position.y + size.y - bz.SettingGame.DEPTH_FLOOR_CEILING ),
                                ( position.z + bz.SettingGame.WALL_DEPTH / 2 )
                            ),
                            textureFileCeiling,
                            new BABYLON.Vector3(
                                size.x,
                                bz.SettingGame.DEPTH_FLOOR_CEILING,
                                size.z
                            ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                        ),
                    ]
                )
            );
            roomWalls.push( ceiling );
        }

        // floor
        if ( textureFileFloor !== null )
        {
            const floor :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createPlane
                        (
                            new BABYLON.Vector3(
                                ( position.x + ( size.x + bz.SettingGame.WALL_DEPTH ) / 2 ),
                                ( position.y + bz.SettingGame.FLOOR_OFFSET_Y ),
                                ( position.z + ( size.z + bz.SettingGame.WALL_DEPTH ) / 2 )
                            ),
                            bz.MeshAnchor.CENTER_XYZ,
                            size.x,
                            size.z,
                            new BABYLON.Vector3( 90.0, 0.0, 0.0 ),
                            textureFileFloor,
                            null,
                            bz.PhysicSet.STATIC,
                            1.0,
                            0
                        ),
                    ]
                )
            )
            roomWalls.push( floor );
        }

        // rotate ALL walls around pivot and add all walls to stage
        for ( const roomWall of roomWalls ) {
            roomWall.getModel().rotateAroundAxisY( position.x, position.z, rotZ );
            stage.addWall( roomWall );
        }
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
        stage.addWall( bz.WallFactory.createWoodenCrate( stage, meshFactory, new BABYLON.Vector3( pos.x,       pos.y,       pos.z       ) ) );
        stage.addWall( bz.WallFactory.createWoodenCrate( stage, meshFactory, new BABYLON.Vector3( pos.x + 2.5, pos.y,       pos.z + 2.5 ) ) );
        stage.addWall( bz.WallFactory.createWoodenCrate( stage, meshFactory, new BABYLON.Vector3( pos.x + 2.5, pos.y,       pos.z       ) ) );
        stage.addWall( bz.WallFactory.createWoodenCrate( stage, meshFactory, new BABYLON.Vector3( pos.x + 2.5, pos.y + 2.5, pos.z + 2.5 ) ) );
        stage.addWall( bz.WallFactory.createWoodenCrate( stage, meshFactory, new BABYLON.Vector3( pos.x + 2.5, pos.y + 5.0, pos.z + 2.5 ) ) );
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
            if ( start + window >= start + size ) {
                continue;
            }
            busyWalls.push(
                new BABYLON.Vector2( start + window, start + window + bz.SettingGame.WINDOW_WIDTH )
            );
        }
        for ( const door of doors )
        {
            if ( start + door >= start + size ) {
                continue;
            }
            busyWalls.push(
                new BABYLON.Vector2( start + door, start + door + bz.SettingGame.DOOR_WIDTH )
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

    /** ****************************************************************************************************************
    *   Creates one straight wall for a room.
    *******************************************************************************************************************/
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
        textureFileWall    :bz.TextureFile,
        textureFileGlass   :bz.TextureFile
    )
    : void
    {
        const walls :bz.Wall[] = [];

        // door frames
        for ( const doorPos of doorsPos )
        {
            if ( doorPos >= sizeX ) {
                continue;
            }

            if ( sizeY < bz.SettingGame.DOOR_HEIGHT + bz.SettingGame.DOOR_FRAME_HEIGHT )
            {
                continue;
            }

            const doorFrame :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( x + doorPos, y + sizeY - bz.SettingGame.DOOR_FRAME_HEIGHT, z ),
                            textureFileWall,
                            new BABYLON.Vector3(
                                bz.SettingGame.DOOR_WIDTH,
                                bz.SettingGame.DOOR_FRAME_HEIGHT,
                                bz.SettingGame.WALL_DEPTH
                            ),
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
        for ( const windowPos of windowsPos )
        {
            if ( windowPos >= sizeX ) {
                continue;
            }

            // top window frame
            const topWindowFrame :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3(
                                x + windowPos,
                                y + sizeY - bz.SettingGame.WINDOW_TOP_FRAME_HEIGHT,
                                z
                            ),
                            textureFileWall,
                            new BABYLON.Vector3(
                                bz.SettingGame.WINDOW_WIDTH,
                                bz.SettingGame.WINDOW_TOP_FRAME_HEIGHT,
                                bz.SettingGame.WALL_DEPTH
                            ),
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
                            new BABYLON.Vector3(
                                x + windowPos,
                                y + sizeY - bz.SettingGame.WINDOW_TOP_FRAME_HEIGHT - bz.SettingGame.WINDOW_HEIGHT,
                                z
                            ),
                            textureFileGlass,
                            new BABYLON.Vector3(
                                bz.SettingGame.WINDOW_WIDTH,
                                bz.SettingGame.WINDOW_HEIGHT,
                                bz.SettingGame.WALL_DEPTH
                            ),
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
                            new BABYLON.Vector3( x + windowPos, y, z ),
                            textureFileWall,
                            new BABYLON.Vector3(
                                bz.SettingGame.WINDOW_WIDTH,
                                bz.SettingGame.WINDOW_BOTTOM_FRAME_HEIGHT,
                                bz.SettingGame.WALL_DEPTH
                            ),
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
                            textureFileWall,
                            new BABYLON.Vector3(
                                ( freeWalls[ i + 1 ] - freeWalls[ i ] ),
                                sizeY,
                                bz.SettingGame.WALL_DEPTH
                            ),
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
            wall.getModel().rotateAroundAxisY( x, z, rotY );
        }

        // add all to walls array
        for ( const wall of walls )
        {
            roomWalls.push( wall );
        }
    }
}

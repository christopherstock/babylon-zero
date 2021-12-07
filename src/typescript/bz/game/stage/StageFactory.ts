/* eslint-disable max-classes-per-file */
import * as bz from '../..';

/** ********************************************************************************************************************
*   Configuration set for a Door game object.
***********************************************************************************************************************/
export class DoorData
{
    public position         :number           = 0;
    public events           :bz.Event[]       = [];
    public animation        :bz.DoorAnimation = null;
    public noBody           :boolean          = false;
    public texture          :bz.TextureFile   = null;
    public linkedDoorIndex  :number           = -1;
    public reverseTextureX  :boolean          = false;

    /** ****************************************************************************************************************
    *   Creates one door config.
    *******************************************************************************************************************/
    public constructor(
        position  :number,
        events    :bz.Event[]       = [],
        animation :bz.DoorAnimation = bz.DoorAnimation.NONE,
        noBody    :boolean          = false,
        texture   :bz.TextureFile   = bz.TextureFile.WALL_DOOR_INDUSTRIAL,
        linkedDoorIndex :number = -1,
        reverseTextureX :boolean = false
    )
    {
        this.position  = position;
        this.events    = events;
        this.animation = animation;
        this.noBody    = noBody;
        this.texture   = texture;
        this.linkedDoorIndex = linkedDoorIndex;
        this.reverseTextureX = reverseTextureX;
    }
}

/** ********************************************************************************************************************
*   Configuration set for a Window game object.
***********************************************************************************************************************/
export class WindowData
{
    public position     :number  = 0.0;
    public fullHeight   :boolean = false;
    public nonBreakable :boolean = false;

    /** ****************************************************************************************************************
    *   Creates the data that describes one window.
    *
    *   @param position     The position of this window inside the wall.
    *   @param fullHeight   If <code>true</code>, the top and bottom window frames will not be drawn
    *                       and the window's height is extended to the wall height.
    *   @param nonBreakable If the glass is bullet proof and won't break.
    *******************************************************************************************************************/
    public constructor( position:number, fullHeight:boolean = false, nonBreakable:boolean = false )
    {
        this.position     = position;
        this.fullHeight   = fullHeight;
        this.nonBreakable = nonBreakable;
    }
}

/** ********************************************************************************************************************
*   Offers creation methods for stage construction.
***********************************************************************************************************************/
export abstract class StageFactory
{
    /** ****************************************************************************************************************
    *   Creates one room.
    *******************************************************************************************************************/
    public static addRoomWalls(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        size        :BABYLON.Vector3,
        rotY        :number,

        textureWallA   :bz.TextureFile = null,
        doorsWallA :bz.DoorData[] = [],
        windowsWallA :bz.WindowData[] = [],
        diamondCornerA :number = 0,

        textureWallB   :bz.TextureFile = null,
        doorsWallB :bz.DoorData[] = [],
        windowsWallB :bz.WindowData[] = [],
        diamondCornerB :number = 0,

        textureWallC   :bz.TextureFile = null,
        doorsWallC :bz.DoorData[] = [],
        windowsWallC :bz.WindowData[] = [],
        diamondCornerC :number = 0,

        textureWallD   :bz.TextureFile = null,
        doorsWallD :bz.DoorData[] = [],
        windowsWallD :bz.WindowData[] = [],
        diamondCornerD :number = 0,

        textureFloor   :bz.TextureFile = null,
        textureCeiling :bz.TextureFile = null
    )
    : void
    {
        // all walls to add to the stage at the end of this method
        const roomWalls :bz.Wall[] = [];

        if ( textureWallA !== null )
        {
            const diamondModX :number = diamondCornerA + ( diamondCornerA > 0 ? bz.SettingGame.WALL_DEPTH : 0 );
            const diamondModSizeX :number = - diamondCornerA - ( diamondCornerA > 0 ? bz.SettingGame.WALL_DEPTH : 0 );

            StageFactory.createWall(
                roomWalls, doorsWallA, windowsWallA, stage, meshFactory,
                position.x + diamondModX,
                size.x  + diamondModSizeX - diamondCornerB,
                position.y,
                size.y,
                position.z,
                0.0,
                textureWallA,
                bz.TextureFile.WALL_GLASS_1
            );

            if ( diamondCornerA > 0 )
            {
                const sizeCornerA :number = Math.sqrt( 2 * Math.pow( diamondCornerA + bz.SettingGame.WALL_DEPTH, 2 ) );
                StageFactory.createWall(
                    roomWalls, [], [], stage, meshFactory,
                    position.x,
                    sizeCornerA,
                    position.y,
                    size.y,
                    ( position.z + diamondCornerA + bz.SettingGame.WALL_DEPTH ),
                    45.0,
                    textureWallA,
                    bz.TextureFile.WALL_GLASS_1
                );
            }
        }

        if ( textureWallB !== null )
        {
            const diamondModX :number = diamondCornerB + ( diamondCornerB > 0 ? bz.SettingGame.WALL_DEPTH : 0 );
            const diamondModSizeX :number = - diamondCornerB - ( diamondCornerB > 0 ? bz.SettingGame.WALL_DEPTH : 0 );

            StageFactory.createWall(
                roomWalls, doorsWallB, windowsWallB, stage, meshFactory,
                position.x + size.x + bz.SettingGame.WALL_DEPTH,
                size.z + diamondModSizeX - diamondCornerC,
                position.y,
                size.y,
                position.z + diamondModX,
                -90.0,
                textureWallB,
                bz.TextureFile.WALL_GLASS_1
            );

            if ( diamondCornerB > 0 )
            {
                const sizeCornerB :number = Math.sqrt( 2 * Math.pow( diamondCornerB + bz.SettingGame.WALL_DEPTH, 2 ) );
                StageFactory.createWall(
                    roomWalls, [], [], stage, meshFactory,
                    position.x + size.x - diamondCornerB,
                    sizeCornerB,
                    position.y,
                    size.y,
                    position.z, // ( position.z + diamondCornerB + 2 * bz.SettingGame.WALL_DEPTH ),
                    -45.0,
                    textureWallB,
                    bz.TextureFile.WALL_GLASS_1
                );
            }
        }

        if ( textureWallC !== null )
        {
            const diamondModX :number = - diamondCornerC - ( diamondCornerC > 0 ? bz.SettingGame.WALL_DEPTH : 0 );
            const diamondModSizeX :number = - diamondCornerC - ( diamondCornerC > 0 ? bz.SettingGame.WALL_DEPTH : 0 );

            StageFactory.createWall(
                roomWalls, doorsWallC, windowsWallC, stage, meshFactory,
                position.x + size.x + bz.SettingGame.WALL_DEPTH + diamondModX,
                size.x + diamondModSizeX - diamondCornerD,
                position.y,
                size.y,
                position.z + size.z + bz.SettingGame.WALL_DEPTH,
                -180.0,
                textureWallC,
                bz.TextureFile.WALL_GLASS_1
            );

            if ( diamondCornerC > 0 )
            {
                const sizeCornerC :number = Math.sqrt( 2 * Math.pow( diamondCornerC + bz.SettingGame.WALL_DEPTH, 2 ) );
                StageFactory.createWall(
                    roomWalls, [], [], stage, meshFactory,
                    position.x + size.x + bz.SettingGame.WALL_DEPTH,
                    sizeCornerC,
                    position.y,
                    size.y,
                    position.z + size.z - diamondCornerC,
                    -135.0,
                    textureWallC,
                    bz.TextureFile.WALL_GLASS_1
                );
            }
        }

        if ( textureWallD !== null )
        {
            const diamondModX     :number = - diamondCornerD - ( diamondCornerD > 0 ? bz.SettingGame.WALL_DEPTH : 0 );
            const diamondModSizeX :number = - diamondCornerD - ( diamondCornerD > 0 ? bz.SettingGame.WALL_DEPTH : 0 );

            StageFactory.createWall(
                roomWalls, doorsWallD, windowsWallD, stage, meshFactory,
                position.x,
                ( size.z - diamondCornerA + diamondModSizeX ),
                position.y,
                size.y,
                position.z + size.z + bz.SettingGame.WALL_DEPTH + diamondModX,
                -270.0,
                textureWallD,
                bz.TextureFile.WALL_GLASS_1
            );

            if ( diamondCornerD > 0 )
            {
                const sizeCornerD :number = Math.sqrt( 2 * Math.pow( diamondCornerD + bz.SettingGame.WALL_DEPTH, 2 ) );
                StageFactory.createWall(
                    roomWalls, [], [], stage, meshFactory,
                    position.x + diamondCornerD + bz.SettingGame.WALL_DEPTH,
                    sizeCornerD,
                    position.y,
                    size.y,
                    position.z + size.z + bz.SettingGame.WALL_DEPTH,
                    -225.0,
                    textureWallD,
                    bz.TextureFile.WALL_GLASS_1
                );
            }
        }

        // ceiling
        if ( textureCeiling !== null )
        {
            const ceiling :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3(
                            ( position.x + bz.SettingGame.WALL_DEPTH / 2 ),
                            ( position.y + size.y - bz.SettingGame.CEILING_HEIGHT - bz.SettingGame.CEILING_OFFSET_Y ),
                            ( position.z + bz.SettingGame.WALL_DEPTH / 2 )
                        ),
                        textureCeiling,
                        new BABYLON.Vector3(
                            size.x,
                            bz.SettingGame.CEILING_HEIGHT,
                            size.z
                        ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                    )
                )
            );
            roomWalls.push( ceiling );
        }

        // floor
        if ( textureFloor !== null )
        {
            const floor :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    meshFactory.createPlane
                    (
                        new BABYLON.Vector3(
                            ( position.x + ( bz.SettingGame.WALL_DEPTH / 2 ) ),
                            position.y + bz.SettingGame.FLOOR_OFFSET_Y,
                            ( position.z + ( bz.SettingGame.WALL_DEPTH / 2 ) )
                        ),
                        size.x,
                        size.z,
                        textureFloor,
                        null,
                        bz.PhysicSet.STATIC,
                        diamondCornerA,
                        diamondCornerB,
                        diamondCornerC,
                        diamondCornerD
                    )
                )
            )
            roomWalls.push( floor );
        }

        // rotate ALL walls around pivot
        for ( const roomWall of roomWalls )
        {
            roomWall.getModel().rotateAroundAxisY( position.x, position.z, rotY );

            if ( roomWall instanceof bz.Door )
            {
                roomWall.rotateDoorTurnPointAroundAxisY( position.x, position.z, rotY );
            }
        }

        // add all room walls to stage
        stage.addWall( roomWalls );
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
            bz.WallFactory.createWoodenCrate(
                stage,
                meshFactory,
                new BABYLON.Vector3( pos.x, pos.y, pos.z )
            )
        );
        stage.addWall(
            bz.WallFactory.createWoodenCrate(
                stage,
                meshFactory,
                new BABYLON.Vector3( pos.x + 2.5, pos.y, pos.z + 2.5 )
            )
        );
        stage.addWall(
            bz.WallFactory.createWoodenCrate(
                stage,
                meshFactory,
                new BABYLON.Vector3( pos.x + 2.5, pos.y, pos.z ) )
        );
        stage.addWall(
            bz.WallFactory.createWoodenCrate(
                stage,
                meshFactory,
                new BABYLON.Vector3( pos.x + 2.5, pos.y + 2.5, pos.z + 2.5 )
            )
        );
        stage.addWall(
            bz.WallFactory.createWoodenCrate(
                stage,
                meshFactory,
                new BABYLON.Vector3( pos.x + 2.5, pos.y + 5.0, pos.z + 2.5 )
            )
        );
    }

    /** ****************************************************************************************************************
    *   Creates one staircase.
    *******************************************************************************************************************/
    public static addStaircase(
        stage          :bz.Stage,
        meshFactory    :bz.MeshFactory,
        position       :BABYLON.Vector3,
        rotY           :number,

        textureWalls   :bz.TextureFile = bz.TextureFile.WALL_DARK_WOOD_PARQUET,
        textureFloor   :bz.TextureFile = bz.TextureFile.WALL_CARPET_RASPBERRY,
        textureCeiling :bz.TextureFile = bz.TextureFile.WALL_CEILING_1
    )
    : void
    {
        const STAIRCASE_SIZE :BABYLON.Vector3 = new BABYLON.Vector3(
            20.0,
            ( 2 * bz.SettingGame.WALL_HEIGHT ),
            20.0
        );
        const QUARTER_HEIGHT :number          = ( STAIRCASE_SIZE.y / 4 );

        const STAIRSTEP_SIZE :number          = 5.0;
        const STAIRS_SIZE    :number          = 1.18 + ( STAIRCASE_SIZE.x - ( 2 * STAIRSTEP_SIZE ) );
        const STAIR_ANGLE    :number          = 26.6;

        // all walls to add to the stage at the end of this method
        const roomWalls :bz.Wall[] = [];

        // ceiling
        if ( textureCeiling !== null )
        {
            const ceiling :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3(
                            ( position.x + bz.SettingGame.WALL_DEPTH / 2 ),
                            ( position.y + STAIRCASE_SIZE.y - bz.SettingGame.CEILING_HEIGHT - bz.SettingGame.CEILING_OFFSET_Y ),
                            ( position.z + bz.SettingGame.WALL_DEPTH / 2 )
                        ),
                        textureCeiling,
                        new BABYLON.Vector3(
                            STAIRCASE_SIZE.x,
                            bz.SettingGame.CEILING_HEIGHT,
                            STAIRCASE_SIZE.z
                        ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ
                    )
                )
            );
            roomWalls.push( ceiling );
        }

        // lower floor
        const lowerFloor :bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model
            (
                meshFactory.createPlane
                (
                    new BABYLON.Vector3(
                        ( position.x + ( bz.SettingGame.WALL_DEPTH / 2 ) ),
                        position.y + bz.SettingGame.FLOOR_OFFSET_Y,
                        ( position.z + ( bz.SettingGame.WALL_DEPTH / 2 ) )
                    ),
                    STAIRCASE_SIZE.x,
                    STAIRCASE_SIZE.z,
                    textureFloor,
                    null,
                    bz.PhysicSet.STATIC
                )
            )
        )
        roomWalls.push( lowerFloor );

        // upper floor
        const upperFloor :bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model
            (
                meshFactory.createPlane
                (
                    new BABYLON.Vector3(
                        ( position.x + STAIRCASE_SIZE.x - STAIRSTEP_SIZE + ( bz.SettingGame.WALL_DEPTH / 2 ) ),
                        ( position.y + ( STAIRCASE_SIZE.y / 2 ) ) + bz.SettingGame.FLOOR_OFFSET_Y,
                        ( position.z + ( bz.SettingGame.WALL_DEPTH / 2 ) )
                    ),
                    STAIRSTEP_SIZE,
                    STAIRCASE_SIZE.z,
                    textureFloor,
                    null,
                    bz.PhysicSet.STATIC
                )
            )
        )
        roomWalls.push( upperFloor );

        // mid floor
        const midFloor :bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model
            (
                meshFactory.createPlane
                (
                    new BABYLON.Vector3(
                        ( position.x + ( bz.SettingGame.WALL_DEPTH / 2 ) ),
                        ( position.y + QUARTER_HEIGHT ),
                        ( position.z + ( bz.SettingGame.WALL_DEPTH / 2 ) )
                    ),
                    STAIRSTEP_SIZE,
                    STAIRCASE_SIZE.z,
                    textureFloor,
                    null,
                    bz.PhysicSet.STATIC
                )
            )
        )
        roomWalls.push( midFloor );

        // lower stairs
        const lowerStairs :bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model
            (
                meshFactory.createPlane
                (
                    new BABYLON.Vector3(
                        ( position.x + STAIRSTEP_SIZE + ( bz.SettingGame.WALL_DEPTH / 2 ) ),
                        ( position.y + QUARTER_HEIGHT ),
                        ( position.z + ( bz.SettingGame.WALL_DEPTH / 2 ) )
                    ),
                    STAIRS_SIZE,
                    ( STAIRCASE_SIZE.z / 2 ),
                    bz.TextureFile.WALL_STAIRS_1,
                    null,
                    bz.PhysicSet.STATIC
                )
            )
        )
        lowerStairs.getModel().rotateAroundAxisZ(
            ( position.x + STAIRSTEP_SIZE ),
            ( position.y + QUARTER_HEIGHT ),
            -STAIR_ANGLE
        );
        roomWalls.push( lowerStairs );

        // upper stairs
        const upperStairs :bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model
            (
                meshFactory.createPlane
                (
                    new BABYLON.Vector3(
                        ( position.x + STAIRSTEP_SIZE + ( bz.SettingGame.WALL_DEPTH / 2 ) ),
                        ( position.y + QUARTER_HEIGHT ),
                        ( position.z + ( bz.SettingGame.WALL_DEPTH / 2 ) + ( STAIRCASE_SIZE.z / 2 ) )
                    ),
                    STAIRS_SIZE,
                    ( STAIRCASE_SIZE.z / 2 ),
                    bz.TextureFile.WALL_STAIRS_1,
                    null,
                    bz.PhysicSet.STATIC
                )
            )
        )
        upperStairs.getModel().rotateAroundAxisZ(
            ( position.x + STAIRSTEP_SIZE ),
            ( position.y + QUARTER_HEIGHT ),
            STAIR_ANGLE
        );
        roomWalls.push( upperStairs );



        // center railing wall

        // TODO replace with wall method!

        const centerRailingWall :bz.Wall = new bz.Wall
        (
            stage,
            new bz.Model
            (
                meshFactory.createBox
                (
                    new BABYLON.Vector3(
                        position.x + STAIRSTEP_SIZE,
                        position.y,
                        position.z + ( STAIRCASE_SIZE.z / 2 )
                    ),
                    textureWalls,
                    new BABYLON.Vector3(
                        STAIRCASE_SIZE.x - ( 2 * STAIRSTEP_SIZE ),
                        STAIRCASE_SIZE.y,
                        bz.SettingGame.WALL_DEPTH
                    ),
                    bz.PhysicSet.STATIC,
                    1.0,
                    bz.MeshAnchor.LOWEST_XYZ
                )
            )
        );
        // centerRailingWall.getModel().rotateAroundAxisY( x, z, rotY );
        roomWalls.push( centerRailingWall );

        // left wall
        // TODO use wall method!

        // rear wall
        // TODO use wall method!

        // right wall
        // TODO use wall method!

        // rotate ALL walls around pivot TODO extract to method!
        for ( const roomWall of roomWalls )
        {
            roomWall.getModel().rotateAroundAxisY( position.x, position.z, rotY );

            if ( roomWall instanceof bz.Door )
            {
                roomWall.rotateDoorTurnPointAroundAxisY( position.x, position.z, rotY );
            }
        }

        // add all room walls to stage
        stage.addWall( roomWalls );
    }

    /** ****************************************************************************************************************
    *   Calculates all free positions of the wall in between windows and doors.
    *******************************************************************************************************************/
    private static calculateBlankWalls(
        start:number,
        size:number,
        windows:bz.WindowData[],
        doors:bz.DoorData[]
    )
    : number[]
    {
        // collect all busy walls
        let busyWalls :BABYLON.Vector2[] = [];
        for ( const window of windows )
        {
            if ( start + window.position >= start + size )
            {
                continue;
            }
            busyWalls.push(
                new BABYLON.Vector2( start + window.position, start + window.position + bz.SettingGame.WINDOW_WIDTH )
            );
        }
        for ( const door of doors )
        {
            if ( start + door.position >= start + size )
            {
                continue;
            }
            busyWalls.push(
                new BABYLON.Vector2( start + door.position, start + door.position + bz.SettingGame.DOOR_WIDTH )
            );
        }

        // sort busy walls by 1st value (X)
        busyWalls = busyWalls.sort(
            ( a:BABYLON.Vector2, b:BABYLON.Vector2 ) =>
            {
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
        roomWalls        :bz.Wall[],
        doorsData        :bz.DoorData[],
        windowsData      :bz.WindowData[],
        stage            :bz.Stage,
        meshFactory      :bz.MeshFactory,
        x                :number,
        sizeX            :number,
        y                :number,
        sizeY            :number,
        z                :number,
        rotY             :number,
        textureWall  :bz.TextureFile,
        textureGlass :bz.TextureFile
    )
    : void
    {
        const walls :bz.Wall[] = [];

        // door frames
        const createdDoors :bz.Door[] = [];
        for ( const doorData of doorsData )
        {
            if ( doorData.position >= sizeX )
            {
                continue;
            }

            if ( sizeY < bz.SettingGame.DOOR_HEIGHT + bz.SettingGame.DOOR_FRAME_HEIGHT )
            {
                // skip door frame drawing
            }
            else
            {
                // door frame
                const doorFrame :bz.Wall = new bz.Wall
                (
                    stage,
                    new bz.Model
                    (
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3(
                                x + doorData.position,
                                y + sizeY - bz.SettingGame.DOOR_FRAME_HEIGHT,
                                z
                            ),
                            textureWall,
                            new BABYLON.Vector3(
                                bz.SettingGame.DOOR_WIDTH,
                                bz.SettingGame.DOOR_FRAME_HEIGHT,
                                bz.SettingGame.WALL_DEPTH
                            ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        )
                    )
                );
                walls.push( doorFrame );
            }

            // door
            if ( !doorData.noBody )
            {
                const doorPosition2D :BABYLON.Vector2 = new BABYLON.Vector2(
                    x + ( doorData.position + bz.SettingGame.DOOR_WIDTH / 2 ),
                    z + ( bz.SettingGame.WALL_DEPTH / 2 )
                );
                const doorPosition :BABYLON.Vector3 = new BABYLON.Vector3(
                    doorPosition2D.x,
                    y,
                    doorPosition2D.y
                );
                const turnPoint2D :BABYLON.Vector2 = new BABYLON.Vector2( x, z );
                const doorTurnPoint2D:BABYLON.Vector2 = bz.MathUtil.rotateVector2( turnPoint2D, -rotY, doorPosition2D );
                const doorTurnPoint :BABYLON.Vector3 = new BABYLON.Vector3(
                    doorTurnPoint2D.x,
                    y,
                    doorTurnPoint2D.y
                );
                const door:bz.Door = new bz.Door
                (
                    stage,
                    doorPosition,
                    rotY,
                    doorData.animation,
                    doorData.events,
                    doorTurnPoint,
                    doorData.texture,
                    doorData.reverseTextureX
                );
                walls.push( door );

                createdDoors.push( door );
            }
        }

        // link doors if specified
        for ( let i:number = 0; i < doorsData.length; ++i )
        {
            if ( doorsData[ i ].linkedDoorIndex !== -1 )
            {
                createdDoors[ i ].setLinkedDoor( createdDoors[ doorsData[ i ].linkedDoorIndex ] );
                createdDoors[ doorsData[ i ].linkedDoorIndex ].setLinkedDoor( createdDoors[ i ] );
            }
        }

        // window frames
        for ( const windowPos of windowsData )
        {
            if ( windowPos.position >= sizeX )
            {
                continue;
            }

            // calculate window dimensions
            let windowHeight            :number = bz.SettingGame.WINDOW_HEIGHT;
            let windowTopFrameHeight    :number = bz.SettingGame.WINDOW_TOP_FRAME_HEIGHT;
            let windowBottomFrameHeight :number = bz.SettingGame.WINDOW_BOTTOM_FRAME_HEIGHT;
            if ( windowPos.fullHeight )
            {
                windowHeight            = sizeY;
                windowTopFrameHeight    = 0.0;
                windowBottomFrameHeight = 0.0;
            }

            if ( sizeY < windowHeight + windowTopFrameHeight )
            {
                continue;
            }

            // top window frame
            if ( windowTopFrameHeight > 0.0 )
            {
                const topWindowFrame :bz.Wall = new bz.Wall
                (
                    stage,
                    new bz.Model
                    (
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3(
                                x + windowPos.position,
                                y + sizeY - windowTopFrameHeight,
                                z
                            ),
                            textureWall,
                            new BABYLON.Vector3(
                                bz.SettingGame.WINDOW_WIDTH,
                                windowTopFrameHeight,
                                bz.SettingGame.WALL_DEPTH
                            ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        )
                    )
                );
                walls.push( topWindowFrame );
            }

            // window glass
            const windowGlass :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3(
                            x + windowPos.position,
                            y + sizeY - windowTopFrameHeight - windowHeight,
                            z
                        ),
                        textureGlass,
                        new BABYLON.Vector3(
                            bz.SettingGame.WINDOW_WIDTH,
                            windowHeight,
                            bz.SettingGame.WALL_DEPTH
                        ),
                        bz.PhysicSet.STATIC,
                        0.25,
                        bz.MeshAnchor.LOWEST_XYZ
                    )
                ),
                windowPos.nonBreakable
                    ? bz.GameObject.UNBREAKABLE
                    : bz.MathUtil.getRandomInt( bz.SettingGame.WINDOW_MIN_ENERGY, bz.SettingGame.WINDOW_MAX_ENERGY ),
                false,
                true
            );
            walls.push( windowGlass );

            // bottom window frame
            if (
                sizeY < (
                    windowHeight
                    + windowTopFrameHeight
                    + windowBottomFrameHeight
                )
            )
            {
                continue;
            }

            if ( windowBottomFrameHeight > 0.0 )
            {
                const bottomWindowFrame :bz.Wall = new bz.Wall
                (
                    stage,
                    new bz.Model
                    (
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( x + windowPos.position, y, z ),
                            textureWall,
                            new BABYLON.Vector3(
                                bz.SettingGame.WINDOW_WIDTH,
                                windowBottomFrameHeight,
                                bz.SettingGame.WALL_DEPTH
                            ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        )
                    )
                );
                walls.push( bottomWindowFrame );
            }
        }

        // blank walls ( all walls beside doors and windows )
        const blankWalls :number[] = StageFactory.calculateBlankWalls( x, sizeX, windowsData, doorsData );
        for ( let i:number = 0; i < blankWalls.length; i += 2 )
        {
            const from  :number = blankWalls[ i ];
            const to    :number = blankWalls[ i + 1 ];
            const width :number = ( to - from );

            if ( width === 0.0 )
            {
                continue;
            }

            const wall :bz.Wall = new bz.Wall
            (
                stage,
                new bz.Model
                (
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( from, y, z ),
                        textureWall,
                        new BABYLON.Vector3(
                            width,
                            sizeY,
                            bz.SettingGame.WALL_DEPTH
                        ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.LOWEST_XYZ
                    )
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

import * as bz from '../..';

export enum DoorAnimation
{
    NONE,
    SLIDE_DEFAULT,
    SLIDE_REVERSED,
    SWING_A_CLOCKWISE,
    SWING_B_CLOCKWISE,
    SWING_A_COUNTER_CLOCKWISE,
    SWING_B_COUNTER_CLOCKWISE,
}

export enum DoorState
{
    CLOSED,
    OPEN,
    OPENING,
    CLOSING,
}

/** ********************************************************************************************************************
*   Represents a Door with different interaction presets.
***********************************************************************************************************************/
export class Door extends bz.Wall
{
    private readonly animation       :DoorAnimation   = null;
    private          doorRotY        :number          = null;
    private          doorTurnPoint   :BABYLON.Vector3 = null;
    private          state           :DoorState       = DoorState.CLOSED;
    private          animationTicks  :number          = 0;
    private          debugSphereMesh :BABYLON.Mesh    = null;

    /** ****************************************************************************************************************
    *   Creates a new door instance.
    *
    *   @param stage         The stage this wall belongs to.
    *   @param position      Where to place the door.
    *   @param doorRotY      Door rotation Y for animation appliance. Will not be applied!
    *   @param animation     The door animation to perform when an interaction with this door is triggered.
    *   @param events        All events to trigger when a user interaction is performed.
    *   @param doorTurnPoint The CENTER_XZ_LOWEST_Y point of the door.
    *******************************************************************************************************************/
    public constructor(
        stage         :bz.Stage,
        position      :BABYLON.Vector3,
        doorRotY      :number          = 0.0,
        animation     :DoorAnimation   = bz.DoorAnimation.NONE,
        events        :bz.Event[]      = [],
        doorTurnPoint :BABYLON.Vector3 = position
    ) {
        super(
            stage,
            new bz.Model
            (
                [
                    new bz.MeshFactory( stage.getScene(), stage.getConfig().ambientColor ).createBox
                    (
                        position,
                        bz.TextureFile.WALL_DOOR_INDUSTRIAL,
                        new BABYLON.Vector3(
                            bz.SettingGame.DOOR_WIDTH,
                            bz.SettingGame.DOOR_HEIGHT,
                            bz.SettingGame.WALL_DEPTH
                        ),
                        bz.PhysicSet.STATIC,
                        1.0,
                        bz.MeshAnchor.CENTER_XZ_LOWEST_Y,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                    ),
                ]
            ),
            bz.GameObject.UNBREAKABLE,
            true,
            false,
            events,
            bz.InteractionType.REPEATED
        );

        this.animation     = animation;
        this.doorRotY      = doorRotY;
        this.doorTurnPoint = doorTurnPoint;

        // manipulate door turn point for certain animation types
        this.manipulateTurnPointForSwingAnimations();

        this.addDebugDoorTurnPoint();
    }

    public performInteraction( stage:bz.Stage ) : void
    {
        // launch all events if any
        super.performInteraction( stage );

        // start door animation if designed
        switch ( this.state )
        {
            case DoorState.CLOSED:
            {
                // start open slide door animation
                this.animationTicks = bz.SettingGame.DOOR_OPEN_CLOSE_TICKS;
                this.state          = DoorState.OPENING;

                break;
            }
            case DoorState.OPEN:
            {
                // start close slide door animation
                this.animationTicks = bz.SettingGame.DOOR_OPEN_CLOSE_TICKS;
                this.state          = DoorState.CLOSING;

                break;
            }
            case DoorState.OPENING:
            case DoorState.CLOSING:
            {
                console.log( '>> door is currently opening/closing! Interaction is denied!' );
                break;
            }
        }
    }

    /** ****************************************************************************************************************
    *   Renders one tick of the game loop for this door.
    *******************************************************************************************************************/
    public render() : void
    {
        // animate swing or slide door animation
        switch ( this.state )
        {
            case DoorState.OPENING:
            {
                switch ( this.animation )
                {
                    case bz.DoorAnimation.SLIDE_DEFAULT:
                    {
                        const tickDelta :number = ( bz.SettingGame.DOOR_WIDTH / bz.SettingGame.DOOR_OPEN_CLOSE_TICKS );
                        const deltaX :number = tickDelta * bz.MathUtil.cosDegrees( this.doorRotY );
                        const deltaZ :number = ( -1.0 * tickDelta * bz.MathUtil.sinDegrees( this.doorRotY ) );

                        this.model.translatePosition( new BABYLON.Vector3( deltaX, 0.0, deltaZ ) );

                        break;
                    }

                    case bz.DoorAnimation.SLIDE_REVERSED:
                    {
                        const tickDelta :number = ( bz.SettingGame.DOOR_WIDTH / bz.SettingGame.DOOR_OPEN_CLOSE_TICKS );
                        const deltaX :number = ( -1.0 * tickDelta * bz.MathUtil.cosDegrees( this.doorRotY ) );
                        const deltaZ :number = tickDelta * bz.MathUtil.sinDegrees( this.doorRotY );

                        this.model.translatePosition( new BABYLON.Vector3( deltaX, 0.0, deltaZ ) );

                        break;
                    }

                    case bz.DoorAnimation.SWING_A_CLOCKWISE:
                    case bz.DoorAnimation.SWING_B_CLOCKWISE:
                    {
                        const rotDelta :number = ( 90.0 / bz.SettingGame.DOOR_OPEN_CLOSE_TICKS );
                        this.model.rotateAroundAxisY( this.doorTurnPoint.x, this.doorTurnPoint.z, rotDelta );

                        break;
                    }

                    case bz.DoorAnimation.SWING_A_COUNTER_CLOCKWISE:
                    case bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE:
                    {
                        const rotDelta :number = -( 90.0 / bz.SettingGame.DOOR_OPEN_CLOSE_TICKS );
                        this.model.rotateAroundAxisY( this.doorTurnPoint.x, this.doorTurnPoint.z, rotDelta );

                        break;
                    }
                }

                if ( --this.animationTicks <= 0 )
                {
                    this.state = bz.DoorState.OPEN;
                }
                break;
            }
            case DoorState.CLOSING:
            {
                switch ( this.animation )
                {
                    case bz.DoorAnimation.SLIDE_DEFAULT:
                    {
                        const tickDelta :number = ( bz.SettingGame.DOOR_WIDTH / bz.SettingGame.DOOR_OPEN_CLOSE_TICKS );
                        const deltaX :number = ( -1.0 * tickDelta * bz.MathUtil.cosDegrees( this.doorRotY ) );
                        const deltaZ :number = tickDelta * bz.MathUtil.sinDegrees( this.doorRotY );

                        this.model.translatePosition( new BABYLON.Vector3( deltaX, 0.0, deltaZ ) );

                        break;
                    }

                    case bz.DoorAnimation.SLIDE_REVERSED:
                    {
                        const tickDelta :number = ( bz.SettingGame.DOOR_WIDTH / bz.SettingGame.DOOR_OPEN_CLOSE_TICKS );
                        const deltaX :number = tickDelta * bz.MathUtil.cosDegrees( this.doorRotY );
                        const deltaZ :number = -1.0 * tickDelta * bz.MathUtil.sinDegrees( this.doorRotY );

                        this.model.translatePosition( new BABYLON.Vector3( deltaX, 0.0, deltaZ ) );

                        break;
                    }

                    case bz.DoorAnimation.SWING_A_CLOCKWISE:
                    case bz.DoorAnimation.SWING_B_CLOCKWISE:
                    {
                        const rotDelta :number = ( -90.0 / bz.SettingGame.DOOR_OPEN_CLOSE_TICKS );
                        this.model.rotateAroundAxisY( this.doorTurnPoint.x, this.doorTurnPoint.z, rotDelta );

                        break;
                    }

                    case bz.DoorAnimation.SWING_A_COUNTER_CLOCKWISE:
                    case bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE:
                    {
                        const rotDelta :number = ( 90.0 / bz.SettingGame.DOOR_OPEN_CLOSE_TICKS );
                        this.model.rotateAroundAxisY( this.doorTurnPoint.x, this.doorTurnPoint.z, rotDelta );

                        break;
                    }
                }

                if ( --this.animationTicks <= 0 )
                {
                    this.state = bz.DoorState.CLOSED;
                }
                break;
            }
            case DoorState.OPEN:
            case DoorState.CLOSED:
            {
                // no animation takes place
                break;
            }
        }
    }

    /** ****************************************************************************************************************
    *   Disposes all meshes of this bullet hole.
    *******************************************************************************************************************/
    public dispose() : void
    {
        super.dispose();

        if ( this.debugSphereMesh !== null )
        {
            this.debugSphereMesh.dispose();
        }
    }

    public rotateDoorTurnPointAroundAxisY( x:number, z:number, rotY:number ) : void
    {
        const rotationPivot   :BABYLON.Vector2 = new BABYLON.Vector2( x, z );
        const doorTurnPoint2d :BABYLON.Vector2 = new BABYLON.Vector2( this.doorTurnPoint.x, this.doorTurnPoint.z );

        const rotatedDoorTurnPoint2d :BABYLON.Vector2 = bz.MathUtil.rotatePoint(
            rotationPivot, -rotY, doorTurnPoint2d
        );

        this.doorTurnPoint = new BABYLON.Vector3(
            rotatedDoorTurnPoint2d.x,
            this.doorTurnPoint.y,
            rotatedDoorTurnPoint2d.y
/*
            this.doorTurnPoint.x, // x + ( this.doorTurnPoint.x - x ) * bz.MathUtil.cosDegrees( rotY ),
            this.doorTurnPoint.y, // this.doorTurnPoint.y,
            this.doorTurnPoint.z  // , z + ( this.doorTurnPoint.z - z ) * bz.MathUtil.sinDegrees( rotY ) // correct!
*/
        );

        // update stored rotation Y !
        this.doorRotY += rotY;

        // update sphere position ?
        if ( bz.SettingDebug.SHOW_DOOR_TURN_POINTS )
        {
            this.debugSphereMesh.position = this.doorTurnPoint;
        }
    }

    private manipulateTurnPointForSwingAnimations() : void
    {
        switch ( this.animation )
        {
            case bz.DoorAnimation.SWING_A_CLOCKWISE:
            case bz.DoorAnimation.SWING_A_COUNTER_CLOCKWISE:
            {
                // door turns on left edge
                this.doorTurnPoint.x -= bz.MathUtil.cosDegrees( this.doorRotY ) * ( bz.SettingGame.DOOR_WIDTH / 2 );
                this.doorTurnPoint.z += bz.MathUtil.sinDegrees( this.doorRotY ) * ( bz.SettingGame.DOOR_WIDTH / 2 );
                break;
            }
            case bz.DoorAnimation.SWING_B_CLOCKWISE:
            case bz.DoorAnimation.SWING_B_COUNTER_CLOCKWISE:
            {
                // door turns on right edge
                this.doorTurnPoint.x += bz.MathUtil.cosDegrees( this.doorRotY ) * ( bz.SettingGame.DOOR_WIDTH / 2 );
                this.doorTurnPoint.z -= bz.MathUtil.sinDegrees( this.doorRotY ) * ( bz.SettingGame.DOOR_WIDTH / 2 );
                break;
            }
        }
    }

    private addDebugDoorTurnPoint() : void
    {
        if ( bz.SettingDebug.SHOW_DOOR_TURN_POINTS )
        {
            const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.stage.getScene(), bz.SettingColor.COLOR_RGB_YELLOW );
            this.debugSphereMesh = meshFactory.createSphere
            (
                this.doorTurnPoint,
                bz.MeshAnchor.CENTER_XYZ,
                0.50,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.SettingColor.COLOR_RGB_YELLOW,
                bz.PhysicSet.NONE,
                1.0
            );
        }
    }
}

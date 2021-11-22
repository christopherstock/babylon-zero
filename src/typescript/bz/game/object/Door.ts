import * as bz from '../..';

export enum DoorAnimation
{
    NONE,
    SLIDE_DEFAULT,
    SLIDE_REVERSED,
    SWING,
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
    private readonly animation    :DoorAnimation   = null;
    private readonly basePosition :BABYLON.Vector3 = null;
    private readonly doorRotY     :number          = null;
    private          state        :DoorState       = DoorState.CLOSED;
    private          animationTicks :number          = 0;

    /** ****************************************************************************************************************
    *   Creates a new door instance.
    *
    *   @param stage     The stage this wall belongs to.
    *   @param position  Where to place the door.
    *   @param doorRotY  Door rotation Y for animation appliance. Will not be applied!
    *   @param animation The door animation to perform when an interaction with this door is triggered.
    *   @param events    All events to trigger when a user interaction is performed.
    *******************************************************************************************************************/
    public constructor(
        stage     :bz.Stage,
        position  :BABYLON.Vector3,
        doorRotY  :number,
        animation :DoorAnimation,
        events    :bz.Event[]
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

        this.animation    = animation;
        this.basePosition = position;
        this.doorRotY     = doorRotY;
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
}

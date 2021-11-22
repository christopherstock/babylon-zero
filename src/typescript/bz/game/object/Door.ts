import * as bz from '../..';

export enum DoorAnimation
{
    NONE,
    SLIDE,
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
    private          state        :DoorState       = DoorState.CLOSED;
    private          animationTicks :number          = 0;

    /** ****************************************************************************************************************
    *   Creates a new door instance.
    *
    *   @param stage     The stage this wall belongs to.
    *   @param position  Where to place the door.
    *   @param animation The door animation to perform when an interaction with this door is triggered.
    *   @param events    All events to trigger when a user interaction is performed.
    *******************************************************************************************************************/
    public constructor(
        stage     :bz.Stage,
        position  :BABYLON.Vector3,
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
    }

    public performInteraction( stage:bz.Stage ) : void
    {
        // launch all events if any
        super.performInteraction( stage );

        // start door animation if designed
        switch ( this.animation )
        {
            case DoorAnimation.SLIDE:
            {
                // start slide door animation
                console.log( '>> Perform door slide interaction' );
                console.log( '   current door state: ' + this.state );

                switch ( this.state )
                {
                    case DoorState.CLOSED:
                    {
                        console.log( '>> TODO closed door will be opened!' );

                        this.animationTicks = bz.SettingGame.DOOR_SLIDE_OPEN_CLOSE_TICKS;
                        this.state          = DoorState.OPENING;

                        break;
                    }
                    case DoorState.OPEN:
                    {
                        console.log( '>> TODO open door will be closed!' );

                        this.animationTicks = bz.SettingGame.DOOR_SLIDE_OPEN_CLOSE_TICKS;
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
                break;
            }
            case DoorAnimation.SWING:
            {
                // start swing door animation
                console.log( '>> Perform door swing animation' );

                break;
            }
            case DoorAnimation.NONE:
            default:
            {
                // do not start door animations
                console.log( '>> NO door animation to perform' );

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
                const deltaX :number = ( bz.SettingGame.DOOR_WIDTH / bz.SettingGame.DOOR_SLIDE_OPEN_CLOSE_TICKS );
                this.model.translatePosition( new BABYLON.Vector3( deltaX, 0.0, 0.0 ) );

                if ( --this.animationTicks <= 0 )
                {
                    this.state = bz.DoorState.OPEN;
                }
                break;
            }
            case DoorState.CLOSING:
            {
                const deltaX :number = -1.0 * ( bz.SettingGame.DOOR_WIDTH / bz.SettingGame.DOOR_SLIDE_OPEN_CLOSE_TICKS );
                this.model.translatePosition( new BABYLON.Vector3( deltaX, 0.0, 0.0 ) );

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

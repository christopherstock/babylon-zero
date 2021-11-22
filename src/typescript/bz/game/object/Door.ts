import * as bz from '../..';

export enum DoorAnimation
{
    NONE,
    SLIDE,
    SWING,
}

/** ********************************************************************************************************************
*   Represents a Door with different interaction presets.
***********************************************************************************************************************/
export class Door extends bz.Wall
{
    private animation    :bz.DoorAnimation = null;
    private basePosition :BABYLON.Vector3  = null;

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

        this.animation         = animation;
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
                console.log( '>> Perform door slide animation' );

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

    }
}

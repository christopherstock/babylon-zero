import * as bz from '../..';

export enum DoorType
{
    SLIDE_DOOR,
    SWING_DOOR,
    EVENTS_ONLY,
}

/** ********************************************************************************************************************
*   Represents a Door with different interaction presets.
***********************************************************************************************************************/
export class Door extends bz.Wall
{
    private             type        :bz.DoorType            = null;

    /** ****************************************************************************************************************
    *   Creates a new door instance.
    *
    *   @param stage    The stage this wall belongs to.
    *   @param position Where to place the door.
    *   @param events   What happens on user interaction.
    *******************************************************************************************************************/
    public constructor(
        stage    :bz.Stage,
        position :BABYLON.Vector3,
        type     :DoorType,
        events   :bz.Event[]
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

        this.type = type;
    }

    public performInteraction( stage:bz.Stage ) : void
    {
        // launch all events if any
        super.performInteraction( stage );

        // start door animation if designed
        switch ( this.type )
        {
            case DoorType.SLIDE_DOOR:
            {
                // start slide door animation
                break;
            }
            case DoorType.SWING_DOOR:
            {
                // start swing door animation
                break;
            }
            case DoorType.EVENTS_ONLY:
            default:
            {
                // do not start door animations
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

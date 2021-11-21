import * as bz from '../..';

export enum DoorType
{
    EVENT_LAUNCHER,
    SLIDE_DOOR,
    SWING_DOOR,
}

/** ********************************************************************************************************************
*   Represents a Door with different interaction presets.
***********************************************************************************************************************/
export class Door extends bz.Wall
{
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
    }

    /** ****************************************************************************************************************
    *   Renders one tick of the game loop for this door.
    *******************************************************************************************************************/
    public render() : void
    {
    }
}

import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a Door with different interaction presets.
***********************************************************************************************************************/
export class Door extends bz.Wall
{
    /** ****************************************************************************************************************
    *   Creates a new door instance.
    *
    *   @param stage  The stage this wall belongs to.
    *   @param model  The model that represents this wall.
    *   @param events
    *******************************************************************************************************************/
    public constructor(
        stage  :bz.Stage,
        model  :bz.Model,
        events :bz.Event[]
    ) {
        super(
            stage,
            model,
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

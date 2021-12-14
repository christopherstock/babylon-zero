import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents one game event that may happen in the game.
*
*   TODO make abstract and add a direct inheritance with EventData?
***********************************************************************************************************************/
export class Event
{
    /** The type of event. */
    public type       :bz.EventType  = null;
    /** The data that specifies this event. */
    public data       :bz.EventData  = null;
    /** The constraint for triggering this event. */
    public constraint :() => boolean = null;

    /** ****************************************************************************************************************
    *   Creates a new game event.
    *
    *   @param type       The type of event.
    *   @param data       The data that specifies this event.
    *   @param constraint The constraint for triggering this event.
    *******************************************************************************************************************/
    public constructor(
        type :bz.EventType,
        data :bz.EventData,
        constraint :() => boolean = null
    )
    {
        this.type       = type;
        this.data       = data;
        this.constraint = constraint;
    }
}

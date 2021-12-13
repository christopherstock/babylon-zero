import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents one game event that may happen in the game.
*
*   TODO make a direct connection with EventData ?
***********************************************************************************************************************/
export class Event
{
    /** The type of event. */
    public type :bz.EventType = null;
    /** The data that specifies this event. */
    public data :bz.EventData = null;

    /** ****************************************************************************************************************
    *   Creates a new game event.
    *
    *   @param type The type of event.
    *   @param data The data that specifies this event.
    *******************************************************************************************************************/
    public constructor( type :bz.EventType, data :bz.EventData )
    {
        this.type = type;
        this.data = data;
    }
}

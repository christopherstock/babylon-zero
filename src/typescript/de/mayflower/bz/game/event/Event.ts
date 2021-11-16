import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies all types of events that may happen in the game.
***********************************************************************************************************************/
export class Event
{
    public type :bz.EventType = null;
    public data :bz.EventData = null;

    public constructor( type :bz.EventType, data :bz.EventData )
    {
        this.type = type;
        this.data = data;
    }
}

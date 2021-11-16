import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies all types of events that may happen in the game.
***********************************************************************************************************************/
export class Event
{
    public type :bz.EventType = null;

    public constructor( type :bz.EventType )
    {
        this.type = type;
    }
}

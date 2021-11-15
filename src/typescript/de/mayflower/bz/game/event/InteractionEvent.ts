import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents one event that results from an interaction.
***********************************************************************************************************************/
export class InteractionEvent
{
    public action :number = 0;

    /** ****************************************************************************************************************
    *   Creates a new InteractionEvent.
    *
    *   @param action       The action to invoke when this event is triggered.
    *******************************************************************************************************************/
    public constructor( action :number )
    {
        this.action = action;
    }
}

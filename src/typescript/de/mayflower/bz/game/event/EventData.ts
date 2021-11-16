import * as bz from '../..';

/** ********************************************************************************************************************
*   A bundle of data that is associated to an event. Type of event data varies by the according EventType.
***********************************************************************************************************************/
export abstract class EventData
{
}

/** ********************************************************************************************************************
*   The event data for the event type { @see EventType.SWITCH_TO_STAGE }.
***********************************************************************************************************************/
export class EventDataStageSwitch extends EventData
{
    public targetStage     :bz.StageId;
    public startupPosition :BABYLON.Vector3;
}

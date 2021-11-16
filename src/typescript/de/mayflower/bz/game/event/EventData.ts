// eslint-disable-next-line max-classes-per-file
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
    public startupRotation :BABYLON.Vector3;

    /** ****************************************************************************************************************
    *   Creates the data for the event 'Switch Stage'.
    *
    *   @param targetStage
    *   @param startupPosition
    *   @param startupRotation
    *******************************************************************************************************************/
    public constructor( targetStage:bz.StageId, startupPosition:BABYLON.Vector3, startupRotation:BABYLON.Vector3 )
    {
        super();

        this.targetStage     = targetStage;
        this.startupPosition = startupPosition;
        this.startupRotation = startupRotation;
    }
}

/** ********************************************************************************************************************
*   The event data for the event type { @see EventType.SHOW_GUI_MESSAGE }.
***********************************************************************************************************************/
export class EventDataShowGuiMessage extends EventData
{
    public message :string;

    /** ****************************************************************************************************************
    *   Creates the data for the event 'Show GUI Message'.
    *
    *   @param message The message to display in the GUI.
    *******************************************************************************************************************/
    public constructor( message:string )
    {
        super();

        this.message = message;
    }
}

/** ********************************************************************************************************************
*   The event data for the event type { @see EventType.SHOW_GUI_EFFECT }.
***********************************************************************************************************************/
export class EventDataShowGuiEffect extends EventData
{
    public guiEffect :bz.GUIFxType;

    /** ****************************************************************************************************************
    *   Creates the data for the event 'Show GUI Effect'.
    *
    *   @param guiEffect The GUI effect to perform.
    *******************************************************************************************************************/
    public constructor( guiEffect:bz.GUIFxType )
    {
        super();

        this.guiEffect = guiEffect;
    }
}

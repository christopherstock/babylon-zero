/* eslint-disable max-classes-per-file */

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
export class EventDataShowGuiTextMessage extends EventData
{
    public message    :string;
    public noFlooding :boolean;

    /** ****************************************************************************************************************
    *   Creates the data for the event 'Show GUI Message'.
    *
    *   @param message    The message to display in the GUI.
    *   @param noFlooding Will not display this message if the last GUI message had the same content!
    *******************************************************************************************************************/
    public constructor( message:string, noFlooding:boolean = false )
    {
        super();

        this.message    = message;
        this.noFlooding = noFlooding;
    }
}

/** ********************************************************************************************************************
*   The event data for the event type { @see EventType.SHOW_GUI_GAME_MESSAGE }.
***********************************************************************************************************************/
export class EventDataShowGuiGameMessage extends EventData
{
    public image   :bz.GUIGameMessagePic;
    public message :string;

    /** ****************************************************************************************************************
    *   Creates the data for the event 'Show GUI Game Message'.
    *
    *   @param image   The message to display in the GUI.
    *   @param message The message to display in the GUI.
    *******************************************************************************************************************/
    public constructor( image:bz.GUIGameMessagePic, message:string )
    {
        super();

        this.image   = image;
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

/** ********************************************************************************************************************
*   The event data for the event type { @link EventType.TIME_DELAY }.
***********************************************************************************************************************/
export class EventDataTimeDelay extends EventData
{
    public delayInFrames :number;
    public elapsed       :number;

    /** ****************************************************************************************************************
    *   Creates the data for the event 'Time Delay'.
    *
    *   @param delayInFrames The number of frames to delay.
    *******************************************************************************************************************/
    public constructor( delayInFrames:number )
    {
        super();

        this.delayInFrames = delayInFrames;
        this.elapsed       = 0;
    }
}

/** ********************************************************************************************************************
*   The event data for the event type { @link EventType.CAST_EXPLOSION }.
***********************************************************************************************************************/
export class EventDataCastExplosion extends EventData
{
    public center   :BABYLON.Vector3;
    public radius   :number;
    public strength :number;

    /** ****************************************************************************************************************
    *   Creates the data for the event 'Cast Explosion'.
    *
    *   @param center   The center point of the explosion.
    *   @param radius   The radius of the explosion.
    *   @param strength The strength for this explosion to apply.
    *******************************************************************************************************************/
    public constructor( center:BABYLON.Vector3, radius:number, strength:number )
    {
        super();

        this.center   = center;
        this.radius   = radius;
        this.strength = strength;
    }
}

/** ********************************************************************************************************************
*   The event data for the event type { @link EventType.GAIN_PAINKILLER }.
***********************************************************************************************************************/
export class EventDataGainPainkillers extends EventData
{
    public amount :number;

    /** ****************************************************************************************************************
    *   Creates the data for the event 'Gain Painkillers'.
    *
    *   @param amount The number of painkillers to gain.
    *******************************************************************************************************************/
    public constructor( amount:number )
    {
        super();

        this.amount = amount;
    }
}

/** ********************************************************************************************************************
*   The event data for the event type { @link EventType.TOGGLE_LIGHT }.
***********************************************************************************************************************/
export class EventDataToggleLight extends EventData
{
    public light :BABYLON.Light;

    /** ****************************************************************************************************************
    *   Creates the data for the event 'Toggle light'.
    *
    *   @param light The light to toggle.
    *******************************************************************************************************************/
    public constructor( light:BABYLON.Light )
    {
        super();

        this.light = light;
    }
}
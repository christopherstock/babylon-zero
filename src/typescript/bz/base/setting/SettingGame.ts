import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies all settings for the game.
***********************************************************************************************************************/
export abstract class SettingGame
{
    /** The stage the application starts up with. */
    public static readonly STAGE_STARTUP                            :bz.StageId         = bz.StageId.PARKING_LOT;

    public static readonly CRATE_MIN_ENERGY                         :number             = 3.0;
    public static readonly CRATE_MAX_ENERGY                         :number             = 6.0;

    public static readonly WINDOW_MIN_ENERGY                        :number             = 1.0;
    public static readonly WINDOW_MAX_ENERGY                        :number             = 3.0;

    public static readonly DOOR_OPEN_CLOSE_TICKS                    :number             = 60.0;
}

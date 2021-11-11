/** ********************************************************************************************************************
*   Specifies all adjustments and balancings for the human player.
***********************************************************************************************************************/
export class SettingPlayer
{
    /** The player's diameter on the XZ axis. */
    public static readonly DIAMETER_BODY_XZ                         :number             = 3.0;
    /** The player's head diameter on all axis. */
    public static readonly DIAMETER_HEAD                            :number             = 1.0;

    /** The player's height on the Y axis. */
    public static readonly HEIGHT_Y_STANDING                        :number             = 4.0;
    /** The player's height on ducking. */
    public static readonly HEIGHT_Y_DUCKING                         :number             = 2.0;

    /** The player's physical force horizontal impulse for moving. */
    public static readonly MOVE_IMPULSE                             :number             = 25000.0;
    /** The player's physical force horizontal impulse for running. */
    public static readonly RUN_IMPULSE                              :number             = 50000.0;
    /** The player's physical force horizontal impulse for straving. */
    public static readonly SPEED_STRAVE                             :number             = 20000.0;
    /** The player's physical velocity y that determines falling. */
    public static readonly FALLING_VELOCITY_Y                       :number             = -1.0;

    /** The player's physical force downscale multiplier for horizontal movements. */
    public static readonly MOVE_VELOCITY_MITIGATION                 :number             = 0.5;
    /** The player's physical force upscale multiplier descending. */
    public static readonly FALLING_VELOCITY_MULTIPLIER              :number             = 1.05;

    /** The player's weight in kg. */
    public static readonly PLAYER_MASS                              :number             = 1413.0;

    /** The player's turning speed in degrees per tick. */
    public static readonly SPEED_TURN                               :number             = 2.5;
    /** The player's looking up/down speed in degrees per tick. */
    public static readonly SPEED_LOOK_UP_DOWN                       :number             = 2.0;
    /** The player's speed for rapidly centering the up/down view aim in degrees per tick. */
    public static readonly SPEED_CENTER_LOOK_UP_DOWN                :number             = 1.0;
    /** The player's speed for ducking in world coordinates per tick. */
    public static readonly SPEED_DUCKING                            :number             = 0.4;
    /** The player's speed for standing up in world coordinates per tick. */
    public static readonly SPEED_STANDING_UP                        :number             = 0.25;

    /** Enable player head shaking. */
    public static readonly HEAD_SHAKING_ENABLED                     :boolean            = false;
    /** The player's head shaking velocity multiplier. */
    public static readonly HEAD_SHAKING_VELOCITY_MULTIPLIER         :number             = 0.04;
    /** The player's head shaking range Y. */
    public static readonly HEAD_SHAKING_RANGE_Y                     :number             = 0.1;

    /** Specifies if the player may jump. ( acts as a feature flag ) */
    public static readonly JUMP_ENABLED                             :boolean            = false;
    /** The player's physical force ascend impulse for jumping. */
    public static readonly JUMP_ASCEND_IMPULSE_Y                    :number             = 10000.0;

    /** The player's maximum rotation Z (looking up/down) in degrees. */
    public static readonly MAX_ROT_Z                                :number             = 60.0;
    /** Enable centering rotation Z (look up/down) centering on walking. */
    public static readonly ENABLE_CENTERING_ROT_Z_ON_WALKING        :boolean            = false;

    /** Multiplier for mapping pointer movements XY to player rotation YZ. */
    public static readonly POINTER_MOVEMENT_MULTIPLIER              :number             = 0.7;
}


    /** ****************************************************************************************************************
    *   Specifies all adjustments and balancings for the player.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SettingPlayer
    {
        /** The player's diameter on the XZ axis. */
        public  static  readonly    PLAYER_DIAMETER_BODY_XZ                     :number             = 3.0;
        /** The player's head diameter on all axis. */
        public  static  readonly    PLAYER_DIAMETER_HEAD                        :number             = 1.0;

        /** The player's height on the Y axis. */
        public  static  readonly    PLAYER_HEIGHT_Y_STANDING                    :number             = 4.0;
        /** The player's height on ducking. */
        public  static  readonly    PLAYER_HEIGHT_Y_DUCKED                      :number             = 2.0;

        /** The player's physical mass. */
        public  static  readonly    PLAYER_MASS                                 :number             = 50.0;

        /** The player's physical force multiplier for horizontal movements. TODO remove! */
        public  static  readonly    PLAYER_MOVE_IMPULSE_MULTIPLIER              :number             = 1500;

        /** The player's physical force multiplier for horizontal movements. */
        public  static  readonly    PLAYER_MOVE_VELOCITY_MULTIPLIER             :number             = 0.5;
        /** The player's physical falling multiplier per tick. */
        public  static  readonly    PLAYER_FALLING_VELOCITY_MULTIPLIER          :number             = 1.05;
        /** The player's physical ascend distance multiplied by remaining jump ascending ticks. */
        public  static  readonly    PLAYER_JUMP_ASCEND_IMPULSE_Y               :number             = 300.0;
        /** The player's physical velocity y that determines falling. */
        public  static  readonly    PLAYER_FALLING_VELOCITY_Y                   :number             = -1.0;

        /** The player's moving speed in world coordinate per tick. */
        public  static  readonly    PLAYER_SPEED_MOVE                           :number             = 0.2;
        /** The player's running speed in world coordinate per tick. */
        public  static  readonly    PLAYER_SPEED_RUN                            :number             = 0.3;
        /** The player's straving speed in world coordinate per tick. */
        public  static  readonly    PLAYER_SPEED_STRAVE                         :number             = 0.225;
        /** The player's turning speed in degrees per tick. */
        public  static  readonly    PLAYER_SPEED_TURN                           :number             = 2.5;
        /** The player's looking up/down speed in degrees per tick. */
        public  static  readonly    PLAYER_SPEED_LOOK_UP_DOWN                   :number             = 2.0;
        /** The player's speed for rapidly centering the up/down view aim in degrees per tick. */
        public  static  readonly    PLAYER_SPEED_CENTER_LOOK_UP_DOWN            :number             = 1.0;
        /** The player's speed for ducking. */
        public  static  readonly    PLAYER_SPEED_DUCKING                        :number             = 0.4;
        /** The player's speed for standing up. */
        public  static  readonly    PLAYER_SPEED_STANDING_UP                    :number             = 0.25;

        /** Enable player head shaking. */
        public  static  readonly    PLAYER_HEAD_SHAKING                         :boolean            = true;
        /** The player's head shaking speed multiplier. */
        public  static  readonly    PLAYER_HEAD_SHAKING_SPEED_MULTIPLIER        :number             = 40.0;
        /** The player's head shaking range Y. */
        public  static  readonly    PLAYER_HEAD_SHAKING_RANGE_Y                 :number             = 0.1;

        /** The default field of view of the player's 1st person camera. */
        public  static  readonly    PLAYER_DEFAULT_FIELD_OF_VIEW                :number             = 1.0;

        /** The player's maximum looking up/down in degrees. */
        public  static  readonly    PLAYER_MAX_LOOK_UP_DOWN                     :number             = 60.0;
    }

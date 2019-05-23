
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

        /** The player's physical force downscale multiplier for horizontal movements. */
        public  static  readonly    PLAYER_MOVE_VELOCITY_MULTIPLIER             :number             = 0.5;
        /** The player's physical force upscale multiplier descending. */
        public  static  readonly    PLAYER_FALLING_VELOCITY_MULTIPLIER          :number             = 1.05;
        /** The player's physical force ascend impulse for jumping. */
        public  static  readonly    PLAYER_JUMP_ASCEND_IMPULSE_Y                :number             = 300.0;

        /** The player's physical force horizontal impulse for moving. */
        public  static  readonly    PLAYER_MOVE_IMPULSE                         :number             = 200.0;
        /** The player's physical force horizontal impulse for running. */
        public  static  readonly    PLAYER_RUN_IMPULSE                          :number             = 300.0;
        /** The player's physical force horizontal impulse for straving. */
        public  static  readonly    PLAYER_SPEED_STRAVE                         :number             = 225.0;
        /** The player's physical velocity y that determines falling. */
        public  static  readonly    PLAYER_FALLING_VELOCITY_Y                   :number             = -1.0;

        /** The player's turning speed in degrees per tick. */
        public  static  readonly    PLAYER_SPEED_TURN                           :number             = 2.5;
        /** The player's looking up/down speed in degrees per tick. */
        public  static  readonly    PLAYER_SPEED_LOOK_UP_DOWN                   :number             = 2.0;
        /** The player's speed for rapidly centering the up/down view aim in degrees per tick. */
        public  static  readonly    PLAYER_SPEED_CENTER_LOOK_UP_DOWN            :number             = 1.0;
        /** The player's speed for ducking in world coordinates per tick. */
        public  static  readonly    PLAYER_SPEED_DUCKING                        :number             = 0.4;
        /** The player's speed for standing up in world coordinates per tick. */
        public  static  readonly    PLAYER_SPEED_STANDING_UP                    :number             = 0.25;

        /** Enable player head shaking. */
        public  static  readonly    PLAYER_HEAD_SHAKING_ENABLED                 :boolean            = true;
        /** The player's head shaking velocity multiplier. */
        public  static  readonly    PLAYER_HEAD_SHAKING_VELOCITY_MULTIPLIER     :number             = 0.04;
        /** The player's head shaking range Y. */
        public  static  readonly    PLAYER_HEAD_SHAKING_RANGE_Y                 :number             = 0.1;

        /** The default field of view of the player's 1st person camera. */
        public  static  readonly    PLAYER_DEFAULT_FIELD_OF_VIEW                :number             = 1.0;

        /** The player's maximum looking up/down in degrees. */
        public  static  readonly    PLAYER_MAX_LOOK_UP_DOWN                     :number             = 60.0;
    }

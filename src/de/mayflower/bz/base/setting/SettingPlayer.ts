
    /** ****************************************************************************************************************
    *   Specifies all adjustments and balancings for the player.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SettingPlayer
    {
        /** The player's diameter on the XZ axis. */
        public  static  readonly    PLAYER_DIAMETER_BODY_XZ                     :number             = 2.35;
        /** The player's height on the Y axis. */
        public  static  readonly    PLAYER_HEIGHT_Y                             :number             = 4.0;
        /** The player's position Y of the hands. */
        public  static  readonly    PLAYER_HAND_HEIGHT                          :number             = 2.5;
        /** The player's head diameter on all axis. */
        public  static  readonly    PLAYER_DIAMETER_HEAD                        :number             = 1.0;

        /** The player's moving speed in world coordinate per tick. */
        public  static  readonly    PLAYER_SPEED_MOVE                           :number             = 0.25;
        /** The player's straving speed in world coordinate per tick. */
        public  static  readonly    PLAYER_SPEED_STRAVE                         :number             = 0.35;
        /** The player's turning speed in degrees per tick. */
        public  static  readonly    PLAYER_SPEED_TURN                           :number             = 2.5;
        /** The player's looking up/down speed in degrees per tick. */
        public  static  readonly    PLAYER_SPEED_LOOK_UP_DOWN                   :number             = 2.0;
        /** The player's speed for rapidly centering the up/down view aim in degrees per tick. */
        public  static  readonly    PLAYER_SPEED_CENTER_LOOK_UP_DOWN            :number             = 1.0;
        /** The player's speed for ducking. */
        public  static  readonly    PLAYER_SPEED_DUCKING                        :number             = 0.06;
        /** The player's speed for standing up. */
        public  static  readonly    PLAYER_SPEED_STANDING_UP                    :number             = 0.05;

        /** The player's maximum looking up/down in degrees. */
        public  static  readonly    PLAYER_MAX_LOOK_UP_DOWN                     :number             = 60.0;

        /** The player's height scale factor on ducking. */
        public  static  readonly    PLAYER_DUCK_HEIGHT_SCALE_RATIO              :number             = 0.6;
    }

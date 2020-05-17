
    /** ****************************************************************************************************************
    *   Specifies all adjustments and balancings for the spaceship player.
    *******************************************************************************************************************/
    export class SettingPlayerSpaceship
    {
        /** The player's default speed without explicit controls. */
        public  static  readonly    SPEED_DEFAULT                           :number             = 0.1;

        /** The player's physical force horizontal impulse for straving. */
        public  static  readonly    SPEED_STRAVE                            :number             = 0.3;

        /** The player's physical force vertical impulse for straving. */
        public  static  readonly    SPEED_RAISE                             :number             = 0.3;
    }


    /** ****************************************************************************************************************
    *   Specifies all adjustments and balancings for the game.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SettingHUD
    {
        /** The number of ticks for a HUD message to be displayed. */
        public      static  readonly        HUD_MESSAGE_LIFETIME                :number         = 100;
        /** The number of ticks of a HUD message's lifetime to fade out. */
        public      static  readonly        HUD_MESSAGE_FADE_OUT_TICKS          :number         = 5;

        /** The width of the horizontal border for all HUD elements. */
        public      static  readonly        HUD_BORDER_X                        :number         = 50.0;
        /** The height of the horizontal border for all HUD elements. */
        public      static  readonly        HUD_BORDER_Y                        :number         = 50.0;
    }

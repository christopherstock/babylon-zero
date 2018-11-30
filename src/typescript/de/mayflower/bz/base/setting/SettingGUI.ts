
    /** ****************************************************************************************************************
    *   Specifies all adjustments and balancings for the Graohical User Interface.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SettingGUI
    {
        /** The number of ticks for a GUI message to be displayed. */
        public      static  readonly        GUI_MESSAGE_LIFETIME                :number         = 100;
        /** The number of ticks of a GUI message's lifetime to fade out. */
        public      static  readonly        GUI_MESSAGE_FADE_OUT_TICKS          :number         = 5;
        /** The offset Y between message lines. */
        public      static  readonly        GUI_MESSAGE_LINES_DISTANCE_Y        :number         = 7;

        /** The number of ticks for a GUI effect to be displayed. */
        public      static  readonly        GUI_FX_LIFETIME                     :number         = 30;
        /** The initial alpha value for GUI effects. */
        public      static  readonly        GUI_FX_INITIAL_ALPHA                :number         = 0.8;

        /** The width of the horizontal border for all GUI elements. */
        public      static  readonly        GUI_BORDER_X                        :number         = 50.0;
        /** The height of the horizontal border for all GUI elements. */
        public      static  readonly        GUI_BORDER_Y                        :number         = 50.0;

        /** The default font size for GUI texts. */
        public      static  readonly        GUI_FONT_SIZE_DEFAULT               :number         = 20.0;

        /** The medium font size for GUI texts. */
        public      static  readonly        GUI_FONT_SIZE_MEDIUM                :number         = 15.0;
    }

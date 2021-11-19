/* eslint-disable max-len */

/** ********************************************************************************************************************
*   Specifies all adjustments and balancings for the Graohical User Interface.
*
*   TODO remove 'GUI' in constant namings
***********************************************************************************************************************/
export class SettingGUI
{
    /** The number of ticks for a GUI message to be displayed. */
    public static readonly GUI_TEXT_MESSAGE_LIFETIME                :number         = 300;
    /** The number of ticks of a GUI message's lifetime to fade out. */
    public static readonly GUI_TEXT_MESSAGE_FADE_OUT_TICKS          :number         = 25;
    /** The offset Y between message lines. */
    public static readonly GUI_TEXT_MESSAGE_LINES_DISTANCE_Y        :number         = 7;

    /** The number of ticks for a GUI game message to be displayed. */
    public static readonly GUI_GAME_MESSAGE_LIFETIME                :number         = 325
    /** The number of ticks of a GUI game message's lifetime to fade in. */
    public static readonly GUI_GAME_MESSAGE_FADE_IN_TICKS           :number         = 25;
    /** The number of ticks of a GUI game message's lifetime to fade out. */
    public static readonly GUI_GAME_MESSAGE_FADE_OUT_TICKS          :number         = 25;
    /** The number of ticks between two GUI game messages are displayed. */
    public static readonly GUI_GAME_MESSAGE_DELAY_BETWEEN_MESSAGES  :number         = 25;

    /** The number of ticks for a GUI effect to be displayed. */
    public static readonly GUI_FX_LIFETIME                          :number         = 30;
    /** The initial alpha value for GUI effects. */
    public static readonly GUI_FX_INITIAL_ALPHA                     :number         = 0.8;

    /** The width of the horizontal border for all GUI elements. */
    public static readonly GUI_BORDER_X                             :number         = 50.0;
    /** The height of the horizontal border for all GUI elements. */
    public static readonly GUI_BORDER_Y                             :number         = 50.0;

    /** The default font size for GUI texts. */
    public static readonly GUI_FONT_SIZE_DEFAULT                    :number         = 24.0;
    /** The default font line spacing for GUI texts. */
    public static readonly GUI_FONT_LINESPACING                     :number         = 4.0;

    /** The height of the game message bg. Specified in number of lines - 1st and last lines remain free. */
    public static readonly GUI_GAME_MESSAGE_BG_HEIGHT               :number         = 200;

    public static readonly GUI_GAME_MESSAGE_IMAGE_WIDTH             :number         = SettingGUI.GUI_GAME_MESSAGE_BG_HEIGHT;

    /** If navigation through pause menu items is wrapped before first and after last item. */
    public static readonly GUI_WRAP_PAUSE_MENU_ITEMS                :boolean        = true;
}

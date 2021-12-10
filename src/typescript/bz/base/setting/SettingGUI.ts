/** ********************************************************************************************************************
*   Specifies all adjustments and balancings for the Graohical User Interface.
***********************************************************************************************************************/
export abstract class SettingGUI
{
    public static readonly FONT_FAMILY                          :string         = '\'Open Sans\', Arial, sans-serif';
     /** The weight of the Open Sans font. 300 = light, 400 = regular. */
    public static readonly FONT_WEIGHT                          :string         = '300';
     /** The default font size for GUI texts. */
    public static readonly FONT_SIZE_DEFAULT                    :number         = 22.0;
    /** The default font line spacing for GUI texts. */
    public static readonly FONT_LINESPACING                     :number         = 2.5;

    /** The number of ticks for a GUI message to be displayed. */
    public static readonly TEXT_MESSAGE_LIFETIME                :number         = 325;
    /** The number of ticks of a GUI message's lifetime to fade out. */
    public static readonly TEXT_MESSAGE_FADE_OUT_TICKS          :number         = 25;
    /** The offset Y between message lines. */
    public static readonly TEXT_MESSAGE_LINES_DISTANCE_Y        :number         = 7;

    /** The number of ticks for a GUI game message to be displayed. */
    public static readonly GAME_MESSAGE_LIFETIME                :number         = 325
    /** The number of ticks of a GUI game message's lifetime to fade in. */
    public static readonly GAME_MESSAGE_FADE_IN_TICKS           :number         = 25;
    /** The number of ticks of a GUI game message's lifetime to fade out. */
    public static readonly GAME_MESSAGE_FADE_OUT_TICKS          :number         = 25;
    /** The number of ticks between two GUI game messages are displayed. */
    public static readonly GAME_MESSAGE_DELAY_BETWEEN_MESSAGES  :number         = 25;

    /** The number of ticks for a GUI effect to be displayed. */
    public static readonly FX_LIFETIME                          :number         = 30;
    /** The initial alpha value for GUI effects. */
    public static readonly FX_INITIAL_ALPHA                     :number         = 0.8;

    /** The width of the horizontal border for all GUI elements. */
    public static readonly BORDER_X                             :number         = 50.0;
    /** The height of the horizontal border for all GUI elements. */
    public static readonly BORDER_Y                             :number         = 50.0;

    /** The height of the game message bg. Specified in number of lines - 1st and last lines remain free. */
    public static readonly GAME_MESSAGE_BG_HEIGHT               :number         = 200;

    // noinspection JSSuspiciousNameCombination

    /** The width of the GUI Game Message pic. */
    public static readonly GAME_MESSAGE_IMAGE_WIDTH             :number         = SettingGUI.GAME_MESSAGE_BG_HEIGHT;

    /** If navigation through pause menu items is wrapped before first and after last item. */
    public static readonly WRAP_PAUSE_MENU_ITEMS                :boolean        = true;

    /** The bg color for the GUI. */
    public static readonly PAUSE_GUI_BG_COLOR                   :string         = 'rgba( 0.0, 0.0, 0.0, 0.5 )';
}

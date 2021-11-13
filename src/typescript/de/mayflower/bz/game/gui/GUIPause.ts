import * as bz          from '../..';
import * as BABYLON_GUI from 'babylonjs-gui'

/** ********************************************************************************************************************
*   Represents the Graphical User Interface of the pause screen / menu.
***********************************************************************************************************************/
export class GUIPause
{
    /** All items of the GUI menu. */
    private static readonly GUI_MENU_ITEMS  :bz.GUIMenuItem[]           =
    [
        new bz.GUIMenuItem( 'Stage 1 - Office',                  bz.GUIAction.SWITCH_TO_STAGE_1 ),
        new bz.GUIMenuItem( 'Stage 2 - Intro Logo',              bz.GUIAction.SWITCH_TO_STAGE_2 ),
        new bz.GUIMenuItem( 'Resume Game',                       bz.GUIAction.RESUME_GAME       ),
    ];

    /** The translucent background. */
    private        readonly bg              :BABYLON_GUI.Rectangle      = null;
    /** The 'pause explanation' textblock. */
    private        readonly explanation     :BABYLON_GUI.TextBlock      = null;
    /** The 'pause menu' headline text. */
    private        readonly menuHeadline    :BABYLON_GUI.TextBlock      = null;
    /** The GUI menu. */
    private        readonly menu            :bz.GUIMenu                 = null;

    /** ****************************************************************************************************************
    *   Initializes all components of the pause screen and adds them to the given component.
    *
    *   @param guiFg The gui to append all components to.
    *******************************************************************************************************************/
    public constructor( guiFg:BABYLON_GUI.AdvancedDynamicTexture )
    {
        // paws bg
        this.bg = bz.GUIFactory.createRectangle
        (
            0,
            0,
            0,
            0,
            bz.SettingColor.COLOR_CSS_TRANSPARENT,
            bz.SettingEngine.PAUSE_GUI_BG_COLOR
        );
        this.bg.width  = '100%';
        this.bg.height = '100%';
        guiFg.addControl( this.bg );

        // explanation
        this.explanation = bz.GUIFactory.createTextBlock
        (
            'Try to find out what is happening!\n\n'
                + 'Interact with the environment and use the following keys:' + '\n\n'
                + 'W A S D = Walk and Strave' + '\n'
                + 'Q E = Turn Left/Right' + '\n'
                + 'T G = Look Up/Down' + '\n'
                + 'X = Aim' + '\n'
                + 'Y = Duck' + '\n'
                + 'Ctlr/Strg = Fire' + '\n',
            bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
            bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
            bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
            0,
            bz.SettingGUI.GUI_BORDER_Y,
            500,
            500
        );
        guiFg.addControl( this.explanation );

        // menu headline
        this.menuHeadline = bz.GUIFactory.createTextBlock
        (
            'Paws Menu',
            bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
            bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
            bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
            0,
            ( bz.SettingGUI.GUI_BORDER_Y + 350.0 ),
            250,
            50
        );
        guiFg.addControl( this.menuHeadline );

        // create GUI menu
        this.menu = new bz.GUIMenu
        (
            guiFg,
            GUIPause.GUI_MENU_ITEMS,
            ( bz.SettingGUI.GUI_BORDER_Y + 350 + 50 ),
            bz.SettingGUI.GUI_WRAP_PAUSE_MENU_ITEMS
        );
    }

    /** ****************************************************************************************************************
    *   Shows or hides the pause GUI.
    *
    *   @param visible The visibility to set for the pause GUI.
    *******************************************************************************************************************/
    public setVisibility( visible:boolean ) : void
    {
        this.menuHeadline.isVisible = visible;
        this.explanation.isVisible  = visible;
        this.bg.isVisible           = visible;

        this.menu.setVisibility( visible );
    }

    /** ****************************************************************************************************************
    *   Updates the pause GUI information for the current game tick.
    *
    *   @param game      The game instance.
    *   @param keySystem The key system to use for key determination.
    *******************************************************************************************************************/
    public render( game:bz.Game, keySystem:bz.KeySystem ) : void
    {
        this.handlePauseKeys( game, keySystem );
    }

    /** ****************************************************************************************************************
    *   Delivers the current selected index of the pause menu.
    *
    *   @return The current active pause menu index.
    *******************************************************************************************************************/
    public getPauseMenuIndex() : number
    {
        return this.menu.getPauseMenuIndex();
    }

    /** ****************************************************************************************************************
    *   Sets the active index for the pause menu.
    *
    *   @param index The index of the pause menu item to set.
    *******************************************************************************************************************/
    public setPauseMenuIndex( index:number ) : void
    {
        this.menu.setPauseMenuIndex( index );
    }

    /** ****************************************************************************************************************
    *   Handles pressed keys in the pause menu.
    *
    *   @param game      The game instance.
    *   @param keySystem The key system to use for key determination.
    *******************************************************************************************************************/
    private handlePauseKeys( game:bz.Game, keySystem:bz.KeySystem ) : void
    {
        if
        (
            keySystem.isPressed( bz.KeyCodes.KEY_W  )
            ||  keySystem.isPressed( bz.KeyCodes.KEY_UP )
        )
        {
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_W  );
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_UP );

            this.menu.selectPreviousItem();
        }

        if
        (
            keySystem.isPressed( bz.KeyCodes.KEY_S    )
            ||  keySystem.isPressed( bz.KeyCodes.KEY_DOWN )
        )
        {
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_S    );
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_DOWN );

            this.menu.selectNextItem();
        }

        if ( keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
        {
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

            this.menu.performMenuItem( game );
        }
    }
}

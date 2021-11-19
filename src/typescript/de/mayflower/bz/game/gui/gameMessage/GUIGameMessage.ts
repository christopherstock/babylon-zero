import * as bz          from '../../..';
import * as BABYLON_GUI from 'babylonjs-gui';

/** ********************************************************************************************************************
*   Represents one GUI game message that's displayed on top of the player's viewfield and disappears after some time.
***********************************************************************************************************************/
export class GUIGameMessage
{
    /** The number of ticks this message is still visible. */
    private          lifetimeTicks :number                  = 0;

    // TODO rename redundandy - also in  bz.GUIMessage

    /** The image that displays the initiator of this message. */
    private readonly messageBg      :BABYLON_GUI.Rectangle  = null;
    /** The image that displays the initiator of this message. */
    private readonly messageImage  :BABYLON_GUI.Image       = null;
    /** The text block that contains this single message. */
    private readonly messageText   :BABYLON_GUI.TextBlock   = null;

    /** ****************************************************************************************************************
    *   Creates a new game message.
    *
    *   @param gui The gui to append the image and text block to.
    *   @param img The image to use for this game message.
    *   @param msg The text to display in this text block.
    *******************************************************************************************************************/
    public constructor
    (
        gui :BABYLON_GUI.AdvancedDynamicTexture,
        img :bz.GUIGameMessagePic,
        msg :string
    )
    {
        this.lifetimeTicks = bz.SettingGUI.GUI_GAME_MESSAGE_LIFETIME;

        this.messageBg = bz.GUIFactory.createRectangle
        (
            0,
            bz.SettingGUI.GUI_BORDER_Y,
            0,
            bz.SettingGUI.GUI_GAME_MESSAGE_BG_HEIGHT,
            bz.SettingColor.COLOR_CSS_TRANSPARENT,
            bz.SettingColor.COLOR_CSS_GRAY_HALF_ALPHA
        );
        this.messageBg.width  = '100%';
        // this.messageBg.height = '100%';

        this.messageImage = bz.GUIFactory.createImage
        (
            'gameMessage/woman1.jpg',
            bz.SettingGUI.GUI_BORDER_X,
            bz.SettingGUI.GUI_BORDER_Y,
            BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
            null
        );

        this.messageText = bz.GUIFactory.createTextBlock
        (
            msg,
            bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
            bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
            bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
            0,
            bz.SettingGUI.GUI_BORDER_Y + bz.SettingGUI.GUI_FONT_SIZE_DEFAULT + bz.SettingGUI.GUI_FONT_LINESPACING,
            ( window.innerWidth - 3 * bz.SettingGUI.GUI_BORDER_X - bz.SettingGUI.GUI_GAME_MESSAGE_IMAGE_WIDTH ),
            bz.SettingGUI.GUI_GAME_MESSAGE_BG_HEIGHT - ( bz.SettingGUI.GUI_FONT_SIZE_DEFAULT + bz.SettingGUI.GUI_FONT_LINESPACING ),
            BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
            null,
            true
        );
        this.messageText.width = '100%';
        this.messageText.paddingLeft = (
            String( 2 * bz.SettingGUI.GUI_BORDER_X + bz.SettingGUI.GUI_GAME_MESSAGE_IMAGE_WIDTH )
        ) + 'px';
        this.messageText.paddingRight = bz.SettingGUI.GUI_BORDER_X + 'px';

        this.messageBg.isVisible = false;
        this.messageImage.isVisible = false;
        this.messageText.isVisible  = false;

        gui.addControl( this.messageBg    );
        gui.addControl( this.messageImage );
        gui.addControl( this.messageText  );
    }

    /** ****************************************************************************************************************
    *   Renders this GUI game message for one game tick.
    *******************************************************************************************************************/
    public render() : void
    {
        // show on first render
        if ( this.lifetimeTicks === bz.SettingGUI.GUI_GAME_MESSAGE_LIFETIME )
        {
            this.messageBg.isVisible    = true;
            this.messageImage.isVisible = true;
            this.messageText.isVisible  = true;
        }

        // decrease number of lifetime ticks
        --this.lifetimeTicks;

        // assign opacity according to lifetime ticks
        if ( this.lifetimeTicks < bz.SettingGUI.GUI_GAME_MESSAGE_FADE_OUT_TICKS )
        {
            const alpha :number = ( this.lifetimeTicks / bz.SettingGUI.GUI_TEXT_MESSAGE_FADE_OUT_TICKS );

            this.messageBg.alpha    = alpha;
            this.messageImage.alpha = alpha;
            this.messageText.alpha  = alpha;
        }
        else if ( this.lifetimeTicks > bz.SettingGUI.GUI_GAME_MESSAGE_LIFETIME - bz.SettingGUI.GUI_GAME_MESSAGE_FADE_IN_TICKS )
        {
            const alpha :number = ( ( bz.SettingGUI.GUI_GAME_MESSAGE_LIFETIME - this.lifetimeTicks ) / bz.SettingGUI.GUI_GAME_MESSAGE_FADE_IN_TICKS );

            this.messageBg.alpha    = alpha;
            this.messageText.alpha  = alpha;
            this.messageImage.alpha = alpha;
        }
    }

    /** ****************************************************************************************************************
    *   Checks if the lifetime is over for this GUI game message.
    *
    *   @return If this GUI message's lifetime is over.
    *******************************************************************************************************************/
    public isLifetimeOver() : boolean
    {
        return ( this.lifetimeTicks <= 0 );
    }

    /** ****************************************************************************************************************
    *   Disposes this GUI message's text block.
    *******************************************************************************************************************/
    public dispose() : void
    {
        this.messageBg.dispose();
        this.messageImage.dispose();
        this.messageText.dispose();
    }
}

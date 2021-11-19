import * as bz          from '../../..';
import * as BABYLON_GUI from 'babylonjs-gui';

/** ********************************************************************************************************************
*   Represents one GUI game message that's displayed on top of the player's viewfield and disappears after some time.
***********************************************************************************************************************/
export class GUIGameMessage
{
    /** The number of ticks this message is still visible. */
    private          lifetimeTicks :number                  = 0;

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

        this.messageImage = bz.GUIFactory.createImage
        (
            'wearpon/autoShotgun.png',
            bz.SettingGUI.GUI_BORDER_X,
            0,
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
            bz.SettingGUI.GUI_BORDER_X,
            bz.SettingGUI.GUI_BORDER_Y,
            500,
            100,
            BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
            null
        );

        this.messageImage.isVisible = false;
        this.messageText.isVisible  = false;

        gui.addControl( this.messageImage );
        gui.addControl( this.messageText  );
    }

    /** ****************************************************************************************************************
    *   Renders this GUI game message for one game tick.
    *******************************************************************************************************************/
    public render() : void
    {
        // decrease number of lifetime ticks
        --this.lifetimeTicks;

        // show former hidden game message's GUI elements
        this.messageImage.isVisible = true;
        this.messageText.isVisible  = true;

        // assign opacity according to lifetime ticks
        if ( this.lifetimeTicks < bz.SettingGUI.GUI_GAME_MESSAGE_FADE_OUT_TICKS )
        {
            const alpha :number = ( this.lifetimeTicks / bz.SettingGUI.GUI_MESSAGE_FADE_OUT_TICKS );

            this.messageText.alpha  = alpha;
            this.messageImage.alpha = alpha;
        }
        else if ( this.lifetimeTicks > bz.SettingGUI.GUI_GAME_MESSAGE_LIFETIME - bz.SettingGUI.GUI_GAME_MESSAGE_FADE_IN_TICKS )
        {
            const alpha :number = ( ( bz.SettingGUI.GUI_GAME_MESSAGE_LIFETIME - this.lifetimeTicks ) / bz.SettingGUI.GUI_GAME_MESSAGE_FADE_IN_TICKS );

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
        this.messageImage.dispose();
        this.messageText.dispose();
    }
}

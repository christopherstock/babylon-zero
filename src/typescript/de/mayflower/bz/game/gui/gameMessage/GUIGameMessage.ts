import * as bz          from '../../..';
import * as BABYLON_GUI from 'babylonjs-gui';

/** ********************************************************************************************************************
*   Represents one GUI game message that's displayed on top of the player's viewfield and disappears after some time.
***********************************************************************************************************************/
export class GUIGameMessage
{
    /** The number of ticks this message is still visible. */
    private          lifetimeTicks  :number                 = 0;

    /** The image that displays the initiator of this message. */
    private readonly bg             :BABYLON_GUI.Rectangle  = null;
    /** The image that displays the initiator of this message. */
    private readonly img            :BABYLON_GUI.Image      = null;
    /** The text block that contains this single message. */
    private readonly text           :BABYLON_GUI.TextBlock  = null;

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
        this.lifetimeTicks = bz.SettingGUI.GAME_MESSAGE_LIFETIME;

        this.bg = bz.GUIFactory.createRectangle
        (
            0,
            bz.SettingGUI.BORDER_Y,
            0,
            bz.SettingGUI.GAME_MESSAGE_BG_HEIGHT,
            bz.SettingColor.COLOR_CSS_TRANSPARENT,
            bz.SettingColor.COLOR_CSS_GRAY_HALF_ALPHA
        );
        this.bg.width  = '100%';
        // this.messageBg.height = '100%';

        this.img = bz.GUIFactory.createImage
        (
            GUIGameMessage.getImageFromImageType( img ),
            bz.SettingGUI.BORDER_X,
            bz.SettingGUI.BORDER_Y,
            BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
            null
        );

        this.text = bz.GUIFactory.createTextBlock
        (
            msg,
            bz.SettingGUI.FONT_SIZE_DEFAULT,
            bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
            bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
            0,
            bz.SettingGUI.BORDER_Y,
            0,
            bz.SettingGUI.GAME_MESSAGE_BG_HEIGHT,
            BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
            null,
            true
        );
        this.text.width = '100%';
        this.text.paddingLeftInPixels = (
            2 * bz.SettingGUI.BORDER_X + bz.SettingGUI.GAME_MESSAGE_IMAGE_WIDTH
        );
        this.text.paddingRightInPixels = bz.SettingGUI.BORDER_X;
        this.text.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_CENTER;

        this.bg.isVisible = false;
        this.img.isVisible = false;
        this.text.isVisible  = false;

        gui.addControl( this.bg    );
        gui.addControl( this.img );
        gui.addControl( this.text  );
    }

    /** ****************************************************************************************************************
    *   Renders this GUI game message for one game tick.
    *******************************************************************************************************************/
    public render() : void
    {
        // show on first render
        if ( this.lifetimeTicks === bz.SettingGUI.GAME_MESSAGE_LIFETIME )
        {
            this.bg.isVisible    = true;
            this.img.isVisible = true;
            this.text.isVisible  = true;
        }

        // decrease number of lifetime ticks
        --this.lifetimeTicks;

        // assign opacity according to lifetime ticks
        if ( this.lifetimeTicks < bz.SettingGUI.GAME_MESSAGE_FADE_OUT_TICKS )
        {
            const alpha :number = ( this.lifetimeTicks / bz.SettingGUI.TEXT_MESSAGE_FADE_OUT_TICKS );

            this.bg.alpha    = alpha;
            this.img.alpha = alpha;
            this.text.alpha  = alpha;
        }
        else if ( this.lifetimeTicks > bz.SettingGUI.GAME_MESSAGE_LIFETIME - bz.SettingGUI.GAME_MESSAGE_FADE_IN_TICKS )
        {
            const alpha :number = (
                ( bz.SettingGUI.GAME_MESSAGE_LIFETIME - this.lifetimeTicks )
                / bz.SettingGUI.GAME_MESSAGE_FADE_IN_TICKS
            );

            this.bg.alpha    = alpha;
            this.text.alpha  = alpha;
            this.img.alpha = alpha;
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
        this.bg.dispose();
        this.img.dispose();
        this.text.dispose();
    }

    /** ****************************************************************************************************************
    *   Deliver the image resource for the specified image type.
    *
    *   @param pic The pic to get the filename for.
    *
    *   @return The image file name resource.
    *******************************************************************************************************************/
    private static getImageFromImageType( pic:bz.GUIGameMessagePic ) : string
    {
        switch ( pic )
        {
            case bz.GUIGameMessagePic.OFFICE_WOMAN_1:
            {
                return 'gameMessage/woman1.jpg';
            }
        }

        return null;
    }
}

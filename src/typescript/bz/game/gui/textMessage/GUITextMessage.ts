import * as bz          from '../../..';
import * as BABYLON_GUI from 'babylonjs-gui';

/** ********************************************************************************************************************
*   Represents one GUI message that's displayed in the GUI message queue and disappearing after some time.
***********************************************************************************************************************/
export class GUITextMessage
{
    public          msg           :string                  = null;

    /** The number of ticks this message is still visible. */
    private          lifetimeTicks :number                  = 0;

    /** The text block that contains this single message. */
    private readonly text          :BABYLON_GUI.TextBlock   = null;

    /** ****************************************************************************************************************
    *   Creates a new message text.
    *
    *   @param gui The gui to append this message text block to.
    *   @param msg The message to display in this text block.
    *******************************************************************************************************************/
    public constructor
    (
        gui :BABYLON_GUI.AdvancedDynamicTexture,
        msg :string
    )
    {
        this.lifetimeTicks = bz.SettingGUI.TEXT_MESSAGE_LIFETIME;
        this.msg           = msg;

        this.text = bz.GUIFactory.createTextBlock
        (
            msg,
            bz.SettingGUI.FONT_SIZE_DEFAULT,
            bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
            bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
            bz.SettingGUI.BORDER_X,
            0,
            500,
            25,
            BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
            null
        );

        gui.addControl( this.text );
    }

    /** ****************************************************************************************************************
    *   Renders this GUI message for one game tick.
    *******************************************************************************************************************/
    public render() : void
    {
        // decrease number of lifetime ticks
        --this.lifetimeTicks;

        // assign opacity according to lifetime ticks
        if ( this.lifetimeTicks < bz.SettingGUI.TEXT_MESSAGE_FADE_OUT_TICKS )
        {
            this.text.alpha = ( this.lifetimeTicks / bz.SettingGUI.TEXT_MESSAGE_FADE_OUT_TICKS );
        }
    }

    /** ****************************************************************************************************************
    *   Checks if the lifetime is over for this GUI message.
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
        this.text.dispose();
    }

    /** ****************************************************************************************************************
    *   Assigns this GUI message's location Y according to its index and the total number of GUI messages.
    *
    *   @param index The index of this GUI message.
    *   @param total The total nuber of GUI messages.
    *******************************************************************************************************************/
    public setPositionY( index:number, total:number ) : void
    {
        const MESSAGE_LINE_HEIGHT:number =
        (
            bz.SettingGUI.FONT_SIZE_DEFAULT + bz.SettingGUI.TEXT_MESSAGE_LINES_DISTANCE_Y
        );

        this.text.top =
        (
            -bz.SettingGUI.BORDER_Y
            - ( ( total - 1 ) * MESSAGE_LINE_HEIGHT )
            + ( index         * MESSAGE_LINE_HEIGHT )
        );
    }
}
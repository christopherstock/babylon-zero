
    import * as bz          from '../../../..';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   Represents one HUD message that's displayed in the HUD message queue and disappearing after some time.
    *******************************************************************************************************************/
    export class HUDMessage
    {
        /** The text block that contains this single message. */
        private             readonly        messageText                 :BABYLON_GUI.TextBlock              = null;

        /** ************************************************************************************************************
        *   Creates a new message text.
        *
        *   @param gui The gui to append this message text block to.
        *   @param msg The message to display in this text block.
        *   @param y   Draw position Y of the message.
        ***************************************************************************************************************/
        public constructor
        (
            gui :BABYLON_GUI.AdvancedDynamicTexture,
            msg :string,
            y   :number
        )
        {
            this.messageText = bz.GuiFactory.createTextBlock
            (
                msg,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                bz.GameHUD.HUD_BORDER_X,
                y,
                500,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
                null
            );

            gui.addControl( this.messageText );
        }
    }

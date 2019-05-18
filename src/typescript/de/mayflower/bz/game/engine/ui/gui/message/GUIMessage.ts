
    import * as bz          from '../../../../..';
    import * as bjsg from "babylonjs-gui";

    /** ****************************************************************************************************************
    *   Represents one GUI message that's displayed in the GUI message queue and disappearing after some time.
    *******************************************************************************************************************/
    export class GUIMessage
    {
        /** The number of ticks this message is still visible. */
        private                             lifetimeTicks               :number                             = 0;

        /** The text block that contains this single message. */
        private             readonly        messageText                 :bjsg.TextBlock                     = null;

        /** ************************************************************************************************************
        *   Creates a new message text.
        *
        *   @param gui The gui to append this message text block to.
        *   @param msg The message to display in this text block.
        ***************************************************************************************************************/
        public constructor
        (
            gui :bjsg.AdvancedDynamicTexture,
            msg :string
        )
        {
            this.lifetimeTicks = bz.SettingGUI.GUI_MESSAGE_LIFETIME;

            this.messageText = bz.GUIFactory.createTextBlock
            (
                msg,
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                bz.SettingGUI.GUI_BORDER_X,
                0,
                500,
                25,
                bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT,
                bjsg.Control.VERTICAL_ALIGNMENT_BOTTOM,
                null
            );

            gui.addControl( this.messageText );
        }

        /** ************************************************************************************************************
        *   Renders this GUI message for one game tick.
        ***************************************************************************************************************/
        public render() : void
        {
            // decrease number of lifetime ticks
            --this.lifetimeTicks;

            // assign opacity according to lifetime ticks
            if ( this.lifetimeTicks < bz.SettingGUI.GUI_MESSAGE_FADE_OUT_TICKS )
            {
                this.messageText.alpha = ( this.lifetimeTicks / bz.SettingGUI.GUI_MESSAGE_FADE_OUT_TICKS );
            }
        }

        /** ************************************************************************************************************
        *   Checks if the lifetime is over for this GUI message.
        *
        *   @return If this GUI message's lifetime is over.
        ***************************************************************************************************************/
        public isLifetimeOver() : boolean
        {
            return ( this.lifetimeTicks <= 0 );
        }

        /** ************************************************************************************************************
        *   Disposes this GUI message's text block.
        ***************************************************************************************************************/
        public dispose() : void
        {
            this.messageText.dispose();
        }

        /** ************************************************************************************************************
        *   Assigns this GUI message's location Y according to its index and the total number of GUI messages.
        *
        *   @param index The index of this GUI message.
        *   @param total The total nuber of GUI messages.
        ***************************************************************************************************************/
        public setPositionY( index:number, total:number ) : void
        {
            const MESSAGE_LINE_HEIGHT:number =
            (
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT + bz.SettingGUI.GUI_MESSAGE_LINES_DISTANCE_Y
            );

            this.messageText.top =
            (
                -bz.SettingGUI.GUI_BORDER_Y
                - ( ( total - 1 ) * MESSAGE_LINE_HEIGHT )
                + ( index         * MESSAGE_LINE_HEIGHT )
            );
        }
    }

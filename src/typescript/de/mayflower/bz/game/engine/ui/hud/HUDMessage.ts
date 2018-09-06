
    import * as bz          from '../../../..';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   Represents one HUD message that's displayed in the HUD message queue and disappearing after some time.
    *******************************************************************************************************************/
    export class HUDMessage
    {
        /** The number of ticks this message is still visible. */
        private                             lifetimeTicks               :number                             = 0;

        /** The text block that contains this single message. */
        private             readonly        messageText                 :BABYLON_GUI.TextBlock              = null;

        /** ************************************************************************************************************
        *   Creates a new message text.
        *
        *   @param gui The gui to append this message text block to.
        *   @param msg The message to display in this text block.
        ***************************************************************************************************************/
        public constructor
        (
            gui :BABYLON_GUI.AdvancedDynamicTexture,
            msg :string
        )
        {
            this.lifetimeTicks = bz.SettingHUD.HUD_MESSAGE_LIFETIME;

            this.messageText = bz.GuiFactory.createTextBlock
            (
                msg,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                bz.SettingHUD.HUD_BORDER_X,
                0,
                500,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
                null
            );

            gui.addControl( this.messageText );
        }

        /** ************************************************************************************************************
        *   Renders this HUD message for one game tick.
        ***************************************************************************************************************/
        public render() : void
        {
            // decrease number of lifetime ticks
            --this.lifetimeTicks;

            // assign opacity according to lifetime ticks
            if ( this.lifetimeTicks < bz.SettingHUD.HUD_MESSAGE_FADE_OUT_TICKS )
            {
                this.messageText.alpha = ( this.lifetimeTicks / bz.SettingHUD.HUD_MESSAGE_FADE_OUT_TICKS );
            }
        }

        /** ************************************************************************************************************
        *   Checks if the lifetime is over for this HUD message.
        *
        *   @return If this HUD message's lifetime is over.
        ***************************************************************************************************************/
        public isLifetimeOver() : boolean
        {
            return ( this.lifetimeTicks <= 0 );
        }

        /** ************************************************************************************************************
        *   Disposes this HUD message's text block.
        ***************************************************************************************************************/
        public dispose() : void
        {
            this.messageText.dispose();
        }

        /** ************************************************************************************************************
        *   Assigns this HUD message's location Y according to its index and the total number of HUD messages.
        *
        *   @param index The index of this HUD message.
        *   @param total The total nuber of HUD messages.
        ***************************************************************************************************************/
        public setPositionY( index:number, total:number ) : void
        {
            const HUD_MESSAGE_LINE_HEIGHT:number = 25;

            this.messageText.top =
            (
                -bz.SettingHUD.HUD_BORDER_Y
                - ( ( total - 1 ) * HUD_MESSAGE_LINE_HEIGHT )
                + ( index         * HUD_MESSAGE_LINE_HEIGHT )
            );
        }
    }

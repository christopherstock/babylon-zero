
    import * as bz   from '../../..';
    import * as bjsg from 'babylonjs-gui'

    /** ****************************************************************************************************************
    *   Represents one GUI fx that's displayed in fullscreen and slowly disappearing.
    *******************************************************************************************************************/
    export class GUIFx
    {
        /** The number of ticks this fx is still visible. */
        private                             lifetimeTicks               :number                             = 0;

        /** The fullscreen rect that represents this fx. */
        private             readonly        fxRect                      :bjsg.Rectangle                     = null;

        /** ************************************************************************************************************
        *   Creates a new GUI effect.
        *
        *   @param gui  The gui to append this effect to.
        *   @param type The type of effect to display.
        ***************************************************************************************************************/
        public constructor
        (
            gui  :bjsg.AdvancedDynamicTexture,
            type :bz.GUIFxType
        )
        {
            this.lifetimeTicks = bz.SettingGUI.GUI_FX_LIFETIME;

            let color:string = null;
            switch ( type )
            {
                case bz.GUIFxType.HURT:
                {
                    color = bz.SettingColor.COLOR_CSS_RED_OPAQUE;
                    break;
                }

                case bz.GUIFxType.GAIN_ENERGY:
                {
                    color = bz.SettingColor.COLOR_CSS_WHITE_OPAQUE;
                    break;
                }
            }

            this.fxRect = bz.GUIFactory.createRectangle
            (
                0,
                0,
                0,
                0,
                bz.SettingColor.COLOR_CSS_TRANSPARENT,
                color
            );
            this.fxRect.width  = '100%';
            this.fxRect.height = '100%';

            gui.addControl( this.fxRect );
        }

        /** ************************************************************************************************************
        *   Renders this GUI message for one game tick.
        ***************************************************************************************************************/
        public render() : void
        {
            // decrease number of lifetime ticks
            --this.lifetimeTicks;

            // assign opacity according to lifetime ticks
            this.fxRect.alpha = (
                bz.SettingGUI.GUI_FX_INITIAL_ALPHA * this.lifetimeTicks / bz.SettingGUI.GUI_FX_LIFETIME
            );
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
            this.fxRect.dispose();
        }
    }
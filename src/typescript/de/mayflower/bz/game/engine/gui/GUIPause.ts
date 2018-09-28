
    import * as BABYLON_GUI from 'babylonjs-gui';
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Represents the Graphical User Interface of the pause screen / menu.
    *******************************************************************************************************************/
    export class GUIPause
    {
        /** The bg color for the GUI. */
        // tslint:disable-next-line:max-line-length
        private     static  readonly        GUI_COLOR_BG            :string                                 = 'rgba( 100, 100, 100, 0.25 )';

        /** The translucent background. */
        private             readonly        bg                      :BABYLON_GUI.Rectangle                  = null;
        /** The 'pause' headline text. */
        private             readonly        headline               :BABYLON_GUI.TextBlock                   = null;

        /** ************************************************************************************************************
        *   Initializes all components of the pause screen and adds them to the given component.
        *
        *   @param guiFg The gui to append all components to.
        ***************************************************************************************************************/
        public constructor( guiFg:BABYLON_GUI.AdvancedDynamicTexture )
        {
            // bg
            this.bg = bz.GUIFactory.createRectangle
            (
                0,
                0,
                bz.Main.game.engine.canvas.getWidth(),
                bz.Main.game.engine.canvas.getHeight(),
                bz.SettingColor.COLOR_CSS_TRANSPARENT,
                GUIPause.GUI_COLOR_BG
            );
            guiFg.addControl( this.bg );

            // pause text
            this.headline = bz.GUIFactory.createTextBlock
            (
                'PAUSE MENU',
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                0,
                bz.SettingGUI.GUI_BORDER_Y,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            guiFg.addControl( this.headline );







            // initially hide all components
            this.setVisibility( false );
        }

        /** ************************************************************************************************************
        *   Shows or hides the pause GUI.
        *
        *   @param visible The visibility to set for the pause GUI.
        ***************************************************************************************************************/
        public setVisibility( visible:boolean ) : void
        {
            this.headline.isVisible = visible;
            this.bg.isVisible       = visible;
        }
    }

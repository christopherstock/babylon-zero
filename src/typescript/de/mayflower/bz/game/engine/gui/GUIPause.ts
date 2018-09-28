
    import * as BABYLON_GUI from 'babylonjs-gui';
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Represents the Graphical User Interface of the pause screen / menu.
    *******************************************************************************************************************/
    export class GUIPause
    {
        /** The PAUSE text block. */
        private             readonly        pauseText               :BABYLON_GUI.TextBlock                  = null;

        /** ************************************************************************************************************
        *   Initializes all components of the pause screen.
        ***************************************************************************************************************/
        public constructor( guiFg:BABYLON_GUI.AdvancedDynamicTexture )
        {
            // pause text
            this.pauseText = bz.GUIFactory.createTextBlock
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
            guiFg.addControl( this.pauseText );





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
            this.pauseText.isVisible = visible;
        }
    }

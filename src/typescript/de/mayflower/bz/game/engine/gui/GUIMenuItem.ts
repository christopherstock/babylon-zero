
    import * as BABYLON_GUI from 'babylonjs-gui';
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Represents one menu item shown in the GUI menu.
    *******************************************************************************************************************/
    export class GUIMenuItem
    {
        /** The label of this menu item. */
        private             readonly        label                       :string                         = null;

        /** Flags if this menu item is currently selected. */
        private             readonly        selected                    :boolean                        = false;

        /** ************************************************************************************************************
        *   Creates a new menu item.
        *
        *   @param label The caption for this menu item to display.
        ***************************************************************************************************************/
        public constructor( label:string )
        {
            this.label = label;
        }

        /** ************************************************************************************************************
        *   Creates a text block for this menu item.
        *
        *   @param y The position Y for this menu item's text block.
        ***************************************************************************************************************/
        public createTextBlock( y:number ) : BABYLON_GUI.TextBlock
        {
            return bz.GUIFactory.createTextBlock
            (
                this.label,
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                0,
                y,
                500,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
        }
    }

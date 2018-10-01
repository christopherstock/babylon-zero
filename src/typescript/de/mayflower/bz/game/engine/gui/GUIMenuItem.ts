
    import * as BABYLON_GUI from 'babylonjs-gui';
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Represents one menu item shown in the GUI menu.
    *******************************************************************************************************************/
    export abstract class GUIMenuItem
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


    }

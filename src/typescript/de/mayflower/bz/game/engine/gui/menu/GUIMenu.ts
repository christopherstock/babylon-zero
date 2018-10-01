
    import * as BABYLON_GUI from 'babylonjs-gui';
    import * as bz from '../../../..';

    /** ****************************************************************************************************************
    *   Represents a menu shown in the GUI.
    *******************************************************************************************************************/
    export class GUIMenu
    {
        /** The menu items texts. */
        private             readonly        menuItems                   :bz.GUIMenuItem[]               = [];

        /** The index of the current selected item of the pause menu. */
        private                             currentSelectedItem         :number                         = 0;

        /** ************************************************************************************************************
        *   Creates a new GUI menu.
        *
        *   @param guiFg     The GUI to append the menu item text blocks to.
        *   @param menuItems The menu items to create for the menu.
        *   @param y         The position Y for this GUI menu.
        ***************************************************************************************************************/
        public constructor( guiFg:BABYLON_GUI.AdvancedDynamicTexture, menuItems:bz.GUIMenuItem[], y:number )
        {
            this.menuItems = menuItems;

            // create all menu item text blocks
            for ( let index:number = 0; index < this.menuItems.length; ++index )
            {
                // add menu item text blocks
                this.menuItems[ index ].createTextBlock( guiFg, y + index * 35  );
            }
            this.updateMenuItems();
        }

        /** ************************************************************************************************************
        *   Shows or hides the pause GUI.
        *
        *   @param visible The visibility to set for the pause GUI.
        ***************************************************************************************************************/
        public setVisibility( visible:boolean ) : void
        {
            for ( const menuItem of this.menuItems )
            {
                menuItem.setVisibility( visible );
            }
        }

        /** ************************************************************************************************************
        *   Selects the previous active menu item considering the top bound.
        ***************************************************************************************************************/
        public selectPreviousItem() : void
        {
            if ( this.currentSelectedItem > 0 )
            {
                --this.currentSelectedItem;
                this.updateMenuItems();
            }
        }

        /** ************************************************************************************************************
        *   Selects the next active menu item considering the bottom bound.
        ***************************************************************************************************************/
        public selectNextItem() : void
        {
            if ( this.currentSelectedItem < this.menuItems.length - 1 )
            {
                ++this.currentSelectedItem;
                this.updateMenuItems();
            }
        }

        /** ************************************************************************************************************
        *   Performs the action for the current selected menu item.
        ***************************************************************************************************************/
        public performMenuItem() : void
        {
            this.menuItems[ this.currentSelectedItem ].perform();
        }

        /** ************************************************************************************************************
        *   Updates the selected and unselected states of all menu items.
        ***************************************************************************************************************/
        private updateMenuItems() : void
        {
            // browse all menu items
            for ( let index:number = 0; index < this.menuItems.length; ++index )
            {
                if ( index === this.currentSelectedItem )
                {
                    this.menuItems[ index ].select();
                }
                else
                {
                    this.menuItems[ index ].unselect();
                }
            }
        }
    }

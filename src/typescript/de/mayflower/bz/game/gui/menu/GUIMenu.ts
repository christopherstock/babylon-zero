
    import * as bz   from '../../..';
    import * as bjsg from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   Represents a menu shown in the GUI.
    *******************************************************************************************************************/
    export class GUIMenu
    {
        /** The menu items texts. */
        private             readonly        menuItems                   :bz.GUIMenuItem[]               = [];
        /** Specifies if selection wrapping is enabled by selecting items out of bounds. */
        private             readonly        wrapSelection               :boolean                        = false;

        /** The index of the current selected item of the pause menu. */
        private                             currentSelectedItem         :number                         = 0;

        /** ************************************************************************************************************
        *   Creates a new GUI menu.
        *
        *   @param guiFg         The GUI to append the menu item text blocks to.
        *   @param menuItems     The menu items to create for the menu.
        *   @param y             The position Y for this GUI menu.
        *   @param wrapSelection Allows selection wrapping on selecting items out of bounds.
        ***************************************************************************************************************/
        public constructor
        (
            guiFg         :bjsg.AdvancedDynamicTexture,
            menuItems     :bz.GUIMenuItem[],
            y             :number,
            wrapSelection :boolean
        )
        {
            this.menuItems           = menuItems;
            this.wrapSelection       = wrapSelection;

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
            else if ( this.wrapSelection )
            {
                this.currentSelectedItem = ( this.menuItems.length - 1 );
                this.updateMenuItems();
            }
        }

        /** ************************************************************************************************************
        *   Selects the next active menu item considering the bottom bound.
        ***************************************************************************************************************/
        public selectNextItem() : void
        {
            if ( this.currentSelectedItem < ( this.menuItems.length - 1 ) )
            {
                ++this.currentSelectedItem;
                this.updateMenuItems();
            }
            else if ( this.wrapSelection )
            {
                this.currentSelectedItem = 0;
                this.updateMenuItems();
            }
        }

        /** ************************************************************************************************************
        *   Performs the action for the current selected menu item.
        ***************************************************************************************************************/
        public performMenuItem( game ) : void
        {
            this.menuItems[ this.currentSelectedItem ].perform( game );
        }

        /** ************************************************************************************************************
        *   Delivers the current selected index of the pause menu.
        *
        *   @return The current active pause menu index.
        ***************************************************************************************************************/
        public getPauseMenuIndex() : number
        {
            return this.currentSelectedItem;
        }

        /** ************************************************************************************************************
        *   Directly sets the active index for the pause menu.
        *
        *   @param index The index of the pause menu item to set.
        ***************************************************************************************************************/
        public setPauseMenuIndex( index:number ) : void
        {
            this.currentSelectedItem = index;
            this.updateMenuItems();
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

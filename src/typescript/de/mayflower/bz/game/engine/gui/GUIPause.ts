
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

        /** All items of the GUI menu. */
        private     static  readonly        GUI_MENU_ITEMS          :bz.GUIMenuItem[]                       =
        [
            new bz.GUIMenuItem( 'Resume Game'                       ),
            new bz.GUIMenuItem( 'Level 1 - Office'                  ),
            new bz.GUIMenuItem( 'Level 2 - Test Level'              ),
            new bz.GUIMenuItem( 'Level 3 - Room Viewer'             ),
            new bz.GUIMenuItem( 'Level 4 - 3D Product Configurator' ),
            new bz.GUIMenuItem( 'Level 5 - Intro Logo'              ),
        ];

        /** The translucent background. */
        private             readonly        bg                      :BABYLON_GUI.Rectangle                  = null;
        /** The 'pause' headline text. */
        private             readonly        headline                :BABYLON_GUI.TextBlock                  = null;
        /** The menu items texts. */
        private             readonly        menuItems               :BABYLON_GUI.TextBlock[]                = [];

        /** The index of the current selected item of the pause menu. */
        private                             currentSelectedItem     :number                                 = 0;

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

            // browse all menu items
            for ( let index:number = 0; index < GUIPause.GUI_MENU_ITEMS.length; ++index )
            {
                // add menu item text
                const newMenuItemText:BABYLON_GUI.TextBlock = GUIPause.GUI_MENU_ITEMS[ index ].createTextBlock
                (
                    ( bz.SettingGUI.GUI_BORDER_Y + 100 + index * 35 )
                );
                guiFg.addControl( newMenuItemText );

                // append to array
                this.menuItems.push( newMenuItemText );
            }
            this.updateMenuItems();

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

            for ( const menuItem of this.menuItems )
            {
                menuItem.isVisible = visible;
            }
        }

        /** ************************************************************************************************************
        *   Updates the pause GUI information for the current game tick.
        ***************************************************************************************************************/
        public render() : void
        {
            this.handlePauseKeys();
        }

        /** ************************************************************************************************************
        *   Handles pressed keys in the pause menu.
        ***************************************************************************************************************/
        private handlePauseKeys() : void
        {
            if
            (
                    bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_W  )
                ||  bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_UP )
            )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_W  );
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_UP );

                if ( this.currentSelectedItem > 0 )
                {
                    --this.currentSelectedItem;
                }
                this.updateMenuItems();
            }

            if
            (
                    bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_S    )
                ||  bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_DOWN )
            )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_S    );
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_DOWN );

                if ( this.currentSelectedItem < bz.GUIPause.GUI_MENU_ITEMS.length - 1 )
                {
                    ++this.currentSelectedItem;
                }
                this.updateMenuItems();
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

                this.performMenuItem();
            }
        }

        /** ************************************************************************************************************
        *   Updates the selected and unselected states of all menu items.
        ***************************************************************************************************************/
        private updateMenuItems() : void
        {
            // browse all menu items
            for ( let index:number = 0; index < GUIPause.GUI_MENU_ITEMS.length; ++index )
            {
                if ( index === this.currentSelectedItem )
                {
                    this.menuItems[ index ].color = bz.SettingColor.COLOR_CSS_MAYFLOWER_ORANGE_OPAQUE;
                }
                else
                {
                    this.menuItems[ index ].color = bz.SettingColor.COLOR_CSS_WHITE_OPAQUE;
                }
            }
        }

        /** ************************************************************************************************************
        *   Performs the action for the current selected menu item.
        ***************************************************************************************************************/
        private performMenuItem() : void
        {
            switch ( this.currentSelectedItem )
            {
                case 0:
                {
                    bz.Main.game.togglePause();
                    break;
                }

                case 1:
                {
                    bz.Main.game.switchStage( bz.StageId.STAGE_TEST_OFFICE );
                    break;
                }

                case 2:
                {
                    bz.Main.game.switchStage( bz.StageId.STAGE_TEST_LEVEL );
                    break;
                }

                case 3:
                {
                    bz.Main.game.switchStage( bz.StageId.STAGE_ROOM_VIEWER );
                    break;
                }

                case 4:
                {
                    bz.Main.game.switchStage( bz.StageId.STAGE_PRODUCT_CONFIGURATOR );
                    break;
                }

                case 5:
                {
                    bz.Main.game.switchStage( bz.StageId.STAGE_INTRO_LOGO );
                    break;
                }
            }
        }
    }

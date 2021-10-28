
    import * as bz   from '../../../..';
    import * as bjsg from 'babylonjs-gui'

    /** ****************************************************************************************************************
    *   Represents the Graphical User Interface of the pause screen / menu.
    *******************************************************************************************************************/
    export class GUIPause
    {
        /** The bg color for the GUI. */
        private     static  readonly        GUI_COLOR_BG            :string                                 = (
            'rgba( 100, 100, 100, 0.25 )'
        );

        /** All items of the GUI menu. */
        private     static  readonly        GUI_MENU_ITEMS          :bz.GUIMenuItem[]                       =
        [
            new bz.GUIMenuItem( 'Level 1 - Office',                  bz.GUIAction.SWITCH_TO_STAGE_1 ),
            new bz.GUIMenuItem( 'Level 2 - Test Level',              bz.GUIAction.SWITCH_TO_STAGE_2 ),
            new bz.GUIMenuItem( 'Level 3 - Room Viewer',             bz.GUIAction.SWITCH_TO_STAGE_3 ),
            new bz.GUIMenuItem( 'Level 4 - 3D Product Configurator', bz.GUIAction.SWITCH_TO_STAGE_4 ),
            new bz.GUIMenuItem( 'Level 5 - Intro Logo',              bz.GUIAction.SWITCH_TO_STAGE_5 ),
            new bz.GUIMenuItem( 'Level 6 - Human Body Partitions',   bz.GUIAction.SWITCH_TO_STAGE_6 ),
            new bz.GUIMenuItem( 'Level 7 - Spacescene',              bz.GUIAction.SWITCH_TO_STAGE_7 ),
            new bz.GUIMenuItem( 'Resume Game',                       bz.GUIAction.RESUME_GAME       ),
        ];

        /** The translucent background. */
        private             readonly        bg                      :bjsg.Rectangle                 = null;
        /** The 'pause' headline text. */
        private             readonly        headline                :bjsg.TextBlock                 = null;
        /** The GUI menu. */
        private             readonly        menu                    :bz.GUIMenu                     = null;

        /** ************************************************************************************************************
        *   Initializes all components of the pause screen and adds them to the given component.
        *
        *   @param guiFg The gui to append all components to.
        ***************************************************************************************************************/
        public constructor( guiFg:bjsg.AdvancedDynamicTexture )
        {
            // bg
            this.bg = bz.GUIFactory.createRectangle
            (
                0,
                0,
                0,
                0,
                bz.SettingColor.COLOR_CSS_TRANSPARENT,
                GUIPause.GUI_COLOR_BG
            );
            this.bg.width  = '100%';
            this.bg.height = '100%';
            guiFg.addControl( this.bg );

            // headline
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
                bjsg.Control.HORIZONTAL_ALIGNMENT_CENTER,
                bjsg.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            guiFg.addControl( this.headline );

            // create GUI menu
            this.menu = new bz.GUIMenu
            (
                guiFg,
                GUIPause.GUI_MENU_ITEMS,
                ( bz.SettingGUI.GUI_BORDER_Y + 100 ),
                bz.SettingGUI.WRAP_PAUSE_MENU_ITEMS
            );

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

            this.menu.setVisibility( visible );
        }

        /** ************************************************************************************************************
        *   Updates the pause GUI information for the current game tick.
        *
        *   @param keySystem The key system to use for key determination.
        ***************************************************************************************************************/
        public render( keySystem:bz.KeySystem ) : void
        {
            this.handlePauseKeys( keySystem );
        }

        /** ************************************************************************************************************
        *   Delivers the current selected index of the pause menu.
        *
        *   @return The current active pause menu index.
        ***************************************************************************************************************/
        public getPauseMenuIndex() : number
        {
            return this.menu.getPauseMenuIndex();
        }

        /** ************************************************************************************************************
        *   Sets the active index for the pause menu.
        *
        *   @param index The index of the pause menu item to set.
        ***************************************************************************************************************/
        public setPauseMenuIndex( index:number ) : void
        {
            this.menu.setPauseMenuIndex( index );
        }

        /** ************************************************************************************************************
        *   Handles pressed keys in the pause menu.
        *
        *   @param keySystem The key system to use for key determination.
        ***************************************************************************************************************/
        private handlePauseKeys( keySystem:bz.KeySystem ) : void
        {
            if
            (
                    keySystem.isPressed( bz.KeyCodes.KEY_W  )
                ||  keySystem.isPressed( bz.KeyCodes.KEY_UP )
            )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_W  );
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_UP );

                this.menu.selectPreviousItem();
            }

            if
            (
                    keySystem.isPressed( bz.KeyCodes.KEY_S    )
                ||  keySystem.isPressed( bz.KeyCodes.KEY_DOWN )
            )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_S    );
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_DOWN );

                this.menu.selectNextItem();
            }

            if ( keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

                this.menu.performMenuItem();
            }
        }
    }

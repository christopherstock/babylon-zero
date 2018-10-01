
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
            new bz.GUIMenuItem( 'Resume Game',                       bz.GUIAction.RESUME_GAME       ),
            new bz.GUIMenuItem( 'Level 1 - Office',                  bz.GUIAction.SWITCH_TO_LEVEL_1 ),
            new bz.GUIMenuItem( 'Level 2 - Test Level',              bz.GUIAction.SWITCH_TO_LEVEL_2 ),
            new bz.GUIMenuItem( 'Level 3 - Room Viewer',             bz.GUIAction.SWITCH_TO_LEVEL_3 ),
            new bz.GUIMenuItem( 'Level 4 - 3D Product Configurator', bz.GUIAction.SWITCH_TO_LEVEL_4 ),
            new bz.GUIMenuItem( 'Level 5 - Intro Logo',              bz.GUIAction.SWITCH_TO_LEVEL_5 ),
        ];

        /** The translucent background. */
        private             readonly        bg                      :BABYLON_GUI.Rectangle                  = null;
        /** The 'pause' headline text. */
        private             readonly        headline                :BABYLON_GUI.TextBlock                  = null;
        /** The GUI menu. */
        private             readonly        menu                    :bz.GUIMenu                             = null;

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
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            guiFg.addControl( this.headline );

            // create GUI menu
            this.menu = new bz.GUIMenu
            (
                guiFg,
                GUIPause.GUI_MENU_ITEMS,
                ( bz.SettingGUI.GUI_BORDER_Y + 100 )
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

                this.menu.selectPreviousItem();
            }

            if
            (
                    bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_S    )
                ||  bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_DOWN )
            )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_S    );
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_DOWN );

                this.menu.selectNextItem();
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

                this.menu.performMenuItem();
            }
        }
    }

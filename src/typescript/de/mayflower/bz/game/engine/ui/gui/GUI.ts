
    import * as BABYLON_GUI from 'babylonjs-gui';
    import * as bz from '../../../..';

    /** ****************************************************************************************************************
    *   Represents a Graphical User Interface that is displayed in the foreground of the screen.
    *******************************************************************************************************************/
    export abstract class GUI
    {
        /** The fullscreen gui in foreground. */
        protected           readonly        guiFg                   :BABYLON_GUI.AdvancedDynamicTexture     = null;
        /** The FPS text block. */
        private             readonly        fpsText                 :BABYLON_GUI.TextBlock                  = null;
        /** The manager for GUI messages. */
        private             readonly        messageManager          :bz.GUIMessageManager                   = null;
        /** The manager for GUI effects. */
        private             readonly        fxManager               :bz.GUIFxManager                        = null;

        /** The pause GUI. */
        private             readonly        pauseGui                :bz.GUIPause                            = null;

        /** ************************************************************************************************************
        *   Creates a new abstract Heads Up Display.
        *
        *   @param scene The scene to create this GUI for.
        ***************************************************************************************************************/
        protected constructor( scene:BABYLON.Scene )
        {
            // create foreground GUI
            this.guiFg = bz.GUIFactory.createGUI( scene, true );

            // pause GUI
            this.pauseGui = new bz.GUIPause( this.guiFg );

            // FPS text
            this.fpsText = bz.GUIFactory.createTextBlock
            (
                '',
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                -bz.SettingGUI.GUI_BORDER_X,
                bz.SettingGUI.GUI_BORDER_Y,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.guiFg.addControl( this.fpsText );
            if ( !bz.SettingDebug.SHOW_FPS ) this.fpsText.isVisible = false;

            // create the message and fx managers
            this.messageManager = new bz.GUIMessageManager();
            this.fxManager      = new bz.GUIFxManager();
        }

        /** ************************************************************************************************************
        *   Inits all GUI components for the 3D Product Configurator..
        ***************************************************************************************************************/
        public abstract init() : void;

        /** ************************************************************************************************************
        *   Sets visibility for the first player view components.
        *
        *   @param visible If the first player view components should be visible or not.
        ***************************************************************************************************************/
        public setFirstPlayerViewComponentsVisibility( visible:boolean ) : void
        {
            // change nothing
        }

        /** ************************************************************************************************************
        *   Updates the GUIs to the specified dimensions.
        *
        *   @param width  The width  to set as the new GUI width.
        *   @param height The height to set as the new GUI height.
        ***************************************************************************************************************/
        public updateSize( width:number, height:number ) : void
        {
            this.guiFg.idealWidth  = width;
            this.guiFg.idealHeight = height;

            this.guiFg.scaleTo( width, height );
        }

        /** ************************************************************************************************************
        *   Disposes all elements of this GUI.
        ***************************************************************************************************************/
        public dispose() : void
        {
            this.guiFg.dispose();
        }

        /** ************************************************************************************************************
        *   Updates the GUI information for the current game tick.
        *
        *   @param pause Specifies if the pause state is currently active.
        ***************************************************************************************************************/
        public render( pause:boolean ) : void
        {
            this.updateFps();

            this.messageManager.render();
            this.fxManager.render();

            if ( pause )
            {
                this.pauseGui.render();
            }
        }

        /** ************************************************************************************************************
        *   Adds a message to the message queue.
        *
        *   @param msg The message to add to the message queue.
        ***************************************************************************************************************/
        public addGuiMessage( msg:string ) : void
        {
            this.messageManager.addGuiMessage( this.guiFg, msg );
        }

        /** ************************************************************************************************************
        *   Adds an effect to the fx queue.
        *
        *   @param type The type of GUI effect to add to the message queue.
        ***************************************************************************************************************/
        public addGuiFx( type:bz.GUIFxType ) : void
        {
            this.fxManager.addGuiFx( this.guiFg, type );
        }

        /** ************************************************************************************************************
        *   Shows or hides the pause GUI.
        *
        *   @param visible The visibility to set for the pause GUI.
        ***************************************************************************************************************/
        public setPauseGuiVisibility( visible:boolean ) : void
        {
            this.pauseGui.setVisibility( visible );
        }

        /** ************************************************************************************************************
        *   Delivers the current selected index of the pause menu.
        *
        *   @return The current active pause menu index.
        ***************************************************************************************************************/
        public getPauseMenuIndex() : number
        {
            return this.pauseGui.getPauseMenuIndex();
        }

        /** ************************************************************************************************************
        *   Sets the active index for the pause menu.
        *
        *   @param index The index of the pause menu item to set.
        ***************************************************************************************************************/
        public setPauseMenuIndex( index:number ) : void
        {
            this.pauseGui.setPauseMenuIndex( index );
        }

        /** ************************************************************************************************************
        *   Updates the Frames Per Second counter.
        ***************************************************************************************************************/
        private updateFps() : void
        {
            // update and assign fps
            this.fpsText.text = bz.Main.game.getEngine().getFps().toFixed( 2 ) + ' fps';
        }
    }

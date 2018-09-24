
    import * as BABYLON_GUI from 'babylonjs-gui';
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Represents a Heads Up Display that is displayed in the foreground of the stage.
    *******************************************************************************************************************/
    export abstract class HUD
    {
        /** The fullscreen gui in foreground. */
        protected           readonly        guiFg                   :BABYLON_GUI.AdvancedDynamicTexture     = null;
        /** The FPS text block. */
        private             readonly        fpsText                 :BABYLON_GUI.TextBlock                  = null;
        /** The manager for HUD messages. */
        private             readonly        messageManager          :bz.HUDMessageManager                   = null;

        /** ************************************************************************************************************
        *   Creates a new abstract Heads Up Display.
        ***************************************************************************************************************/
        protected constructor()
        {
            this.guiFg = bz.GuiFactory.createGUI( bz.Main.game.engine.scene.getScene(), true );

            this.fpsText = bz.GuiFactory.createTextBlock
            (
                '',
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                -bz.SettingHUD.HUD_BORDER_X,
                bz.SettingHUD.HUD_BORDER_Y,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.guiFg.addControl( this.fpsText );

            this.messageManager = new bz.HUDMessageManager();
        }

        /** ************************************************************************************************************
        *   Inits all HUD components for the 3D Product Configurator..
        ***************************************************************************************************************/
        public abstract init() : void;

        /** ************************************************************************************************************
        *   Sets visibility for the first player view components.
        *
        *   @param visible If the first player view components should be visible or not.
        ***************************************************************************************************************/
        public abstract setFirstPlayerViewComponentsVisibility( visible:boolean ) : void;

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
        *   Disposes all elements of this HUD.
        ***************************************************************************************************************/
        public dispose() : void
        {
            this.guiFg.dispose();
        }

        /** ************************************************************************************************************
        *   Updates the HUD information for the current game tick.
        ***************************************************************************************************************/
        public render() : void
        {
            this.updateFps();
            this.messageManager.render();
        }

        /** ************************************************************************************************************
        *   Adds a message to the message queue.
        *
        *   @param msg The message to add to the message queue.
        ***************************************************************************************************************/
        public addHudMessage( msg:string ) : void
        {
            this.messageManager.addHudMessage( this.guiFg, msg );
        }

        /** ************************************************************************************************************
        *   Updates the Frames Per Second counter.
        ***************************************************************************************************************/
        private updateFps() : void
        {
            // update and assign fps
            this.fpsText.text = bz.Main.game.engine.getFps().toFixed( 2 ) + ' fps';
        }
    }

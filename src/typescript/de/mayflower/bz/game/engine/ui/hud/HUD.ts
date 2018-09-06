
    import * as BABYLON_GUI from 'babylonjs-gui';
    import * as bz from '../../../..';

    /** ****************************************************************************************************************
    *   Represents a Heads Up Display that is displayed in the foreground of the stage.
    *******************************************************************************************************************/
    export abstract class HUD
    {
        /** The fullscreen gui in foreground. */
        protected           readonly        guiFg                   :BABYLON_GUI.AdvancedDynamicTexture     = null;
        /** The FPS text block. */
        private             readonly        fpsText                 :BABYLON_GUI.TextBlock                  = null;

        /** All HUD messages currently displayed. */
        private             readonly        messageQueue            :bz.HUDMessage[]                        = [];

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

            for ( const hudMessage of this.messageQueue )
            {
                hudMessage.dispose();
            }
        }

        /** ************************************************************************************************************
        *   Updates the HUD information for the current game tick.
        ***************************************************************************************************************/
        public render() : void
        {
            this.updateFps();
            this.updateHudMessages();
        }

        /** ************************************************************************************************************
        *   Adds a message to the message queue.
        *
        *   @param msg The message to add to the message queue.
        ***************************************************************************************************************/
        public addHudMessage( msg:string ) : void
        {
            this.messageQueue.push
            (
                new bz.HUDMessage
                (
                    this.guiFg,
                    msg,
                )
            );

            this.relocateAllHudMessages();
        }

        /** ************************************************************************************************************
        *   Updates the Frames Per Second counter.
        ***************************************************************************************************************/
        private updateFps() : void
        {
            // update and assign fps
            this.fpsText.text = bz.Main.game.engine.getFps().toFixed( 2 ) + ' fps';
        }

        /** ************************************************************************************************************
        *   Updates the displayed HUD messages.
        ***************************************************************************************************************/
        private updateHudMessages() : void
        {
            // render HUD messages
            for ( const hudMessage of this.messageQueue )
            {
                hudMessage.render();
            }

            // dispose obsolete HUD messages
            let relocationRequired:boolean = false;
            for ( let index:number = this.messageQueue.length - 1; index >= 0; --index )
            {
                if ( this.messageQueue[ index ].isLifetimeOver() )
                {
                    this.messageQueue[ index ].dispose();
                    this.messageQueue.splice( index, 1 );

                    relocationRequired = true;
                }
            }

            // relocate HUD messages if required
            if ( relocationRequired )
            {
                this.relocateAllHudMessages();
            }
        }

        /** ************************************************************************************************************
        *   Relocates all HUD messages concerning the Y location.
        ***************************************************************************************************************/
        private relocateAllHudMessages() : void
        {
            for ( let index:number = 0; index < this.messageQueue.length; ++index )
            {
                this.messageQueue[ index ].setPositionY( index, this.messageQueue.length );
            }
        }
    }

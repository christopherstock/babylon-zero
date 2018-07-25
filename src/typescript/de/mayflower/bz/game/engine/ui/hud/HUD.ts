
    import * as BABYLON_GUI from 'babylonjs-gui';
    import * as bz from '../../../..';

    /** ****************************************************************************************************************
    *   Represents a Heads Up Display that is displayed in the foreground and in the background of the stage.
    *******************************************************************************************************************/
    export abstract class HUD
    {
        /** The fullscreen gui in foreground. */
        protected                           guiFg                   :BABYLON_GUI.AdvancedDynamicTexture     = null;

        /** ************************************************************************************************************
        *   Creates a new abstract Heads Up Display.
        ***************************************************************************************************************/
        protected constructor()
        {
            this.guiFg = bz.GuiFactory.createGUI( bz.Main.game.engine.scene.getScene(), true );
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
        *   Disposes all elements of this HUD.
        ***************************************************************************************************************/
        public dispose() : void
        {
            this.guiFg.dispose();
        }

        /** ************************************************************************************************************
        *   Inits all HUD components for the 3D Product Configurator..
        ***************************************************************************************************************/
        public abstract init() : void;

        /** ************************************************************************************************************
        *   Updates the HUD information for the current game tick.
        ***************************************************************************************************************/
        public abstract update() : void;
    }

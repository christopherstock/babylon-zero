
    import * as bz          from '../../..';
    import * as BABYLON     from 'babylonjs';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   Manages the Heads Up Display that contains all GUI elements for one game level.
    *******************************************************************************************************************/
    export class GameHUD extends bz.HUD
    {
        /** The width of the horizontal border for all HUD elements. */
        private     static  readonly        HUD_BORDER_X            :number                                 = 50.0;
        /** The height of the horizontal border for all HUD elements. */
        private     static  readonly        HUD_BORDER_Y            :number                                 = 50.0;

        /** The FPS text block. */
        protected                           fpsText                 :BABYLON_GUI.TextBlock                  = null;

        /** ************************************************************************************************************
        *   Creates a new Heads Up Display for one game level.
        *
        *   @param guiFg The babylon.JS GUI element to append all controls to.
        ***************************************************************************************************************/
        public constructor( guiFg:BABYLON_GUI.AdvancedDynamicTexture )
        {
            super();

            this.fpsText = bz.GuiFactory.createTextBlock
            (
                '',
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                -GameHUD.HUD_BORDER_X,
                GameHUD.HUD_BORDER_Y,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                null
            );
            guiFg.addControl( this.fpsText );
        }

        /** ************************************************************************************************************
        *   Updates the HUD information for the current game tick.
        ***************************************************************************************************************/
        public update() : void
        {
            // update and assign fps
            this.fpsText.text = bz.Main.game.engine.babylonEngine.getFps().toFixed( 2 ) + ' fps';


        }
    }

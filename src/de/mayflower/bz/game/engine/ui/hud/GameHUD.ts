
    import * as bz          from '../../../..';
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
        /** The wearpon image. */
        protected                           wearponImage            :BABYLON_GUI.Image                      = null;
        /** The corsshair. */
        protected                           crosshair               :BABYLON_GUI.Line[]                     = null;

        /** ************************************************************************************************************
        *   Creates a new Heads Up Display for a game level.
        ***************************************************************************************************************/
        public constructor()
        {
            super();
        }

        /** ************************************************************************************************************
        *   Initializes the Heads Up Display for a game level.
        ***************************************************************************************************************/
        public init() : void
        {
            const CANVAS_WIDTH  :number = bz.Main.game.engine.canvas.getWidth();
            const CANVAS_HEIGHT :number = bz.Main.game.engine.canvas.getHeight();

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
            this.guiFg.addControl( this.fpsText );

            this.wearponImage = bz.GuiFactory.createImage
            (
                'wearpon/autoShotgun.png',
                -GameHUD.HUD_BORDER_X,
                0,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
                null
            );
            this.guiFg.addControl( this.wearponImage );

            this.crosshair =
            [
                bz.GuiFactory.createLine
                (
                    ( CANVAS_WIDTH  / 2 ),
                    ( CANVAS_HEIGHT / 2 ) - 20,
                    ( CANVAS_WIDTH  / 2 ),
                    ( CANVAS_HEIGHT / 2 ) - 10,
                    1,
                    bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                    bz.SettingColor.COLOR_CSS_BLACK_OPAQUE
                ),
                bz.GuiFactory.createLine
                (
                    ( CANVAS_WIDTH  / 2 ),
                    ( CANVAS_HEIGHT / 2 ) + 20,
                    ( CANVAS_WIDTH  / 2 ),
                    ( CANVAS_HEIGHT / 2 ) + 10,
                    1,
                    bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                    bz.SettingColor.COLOR_CSS_BLACK_OPAQUE
                ),
                bz.GuiFactory.createLine
                (
                    ( CANVAS_WIDTH  / 2 ) - 20,
                    ( CANVAS_HEIGHT / 2 ),
                    ( CANVAS_WIDTH  / 2 ) - 10,
                    ( CANVAS_HEIGHT / 2 ),
                    1,
                    bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                    bz.SettingColor.COLOR_CSS_BLACK_OPAQUE
                ),
                bz.GuiFactory.createLine
                (
                    ( CANVAS_WIDTH  / 2 ) + 10,
                    ( CANVAS_HEIGHT / 2 ),
                    ( CANVAS_WIDTH  / 2 ) + 20,
                    ( CANVAS_HEIGHT / 2 ),
                    1,
                    bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                    bz.SettingColor.COLOR_CSS_BLACK_OPAQUE
                ),
            ];
            for ( const crosshairLine of this.crosshair ) this.guiFg.addControl( crosshairLine );
        }

        /** ************************************************************************************************************
        *   Updates the HUD information for the current game tick.
        ***************************************************************************************************************/
        public update() : void
        {
            // update and assign fps
            this.fpsText.text = bz.Main.game.engine.babylonEngine.getFps().toFixed( 2 ) + ' fps';
        }

        /** ************************************************************************************************************
        *   Sets visibility for the first player view components.
        *
        *   @param visible If the first player view components should be visible or not.
        ***************************************************************************************************************/
        public setFirstPlayerViewComponentsVisibility( visible:boolean ) : void
        {
            this.wearponImage.isVisible = visible;
            for ( const crosshairLine of this.crosshair ) crosshairLine.isVisible = visible;
        }
    }

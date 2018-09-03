
    import * as bz          from '../../../..';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   Manages the Heads Up Display that contains all GUI elements for one game level.
    *******************************************************************************************************************/
    export class GameHUD extends bz.HUD
    {
        /** The wearpon image. */
        protected                           wearponImage            :BABYLON_GUI.Image                      = null;
        /** The corsshair. */
        protected                           crosshair               :BABYLON_GUI.Image                      = null;

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
            this.wearponImage = bz.GuiFactory.createImage
            (
                'wearpon/autoShotgun.png',
                -bz.SettingHUD.HUD_BORDER_X,
                0,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
                null
            );
            this.guiFg.addControl( this.wearponImage );

            this.crosshair = bz.GuiFactory.createImage
            (
                'crosshair/default.png',
                0,
                0,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_CENTER,
                null
            );
            this.guiFg.addControl( this.crosshair );
        }

        /** ************************************************************************************************************
        *   Updates the HUD for the current game tick.
        ***************************************************************************************************************/
        public render() : void
        {
            super.render();
        }

        /** ************************************************************************************************************
        *   Sets visibility for the first player view components.
        *
        *   @param visible If the first player view components should be visible or not.
        ***************************************************************************************************************/
        public setFirstPlayerViewComponentsVisibility( visible:boolean ) : void
        {
            this.wearponImage.isVisible = visible;
            this.crosshair.isVisible    = visible;
        }
    }

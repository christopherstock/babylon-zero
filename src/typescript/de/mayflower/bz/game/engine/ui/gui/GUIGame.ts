
    import * as bz   from '../../../..';
    import * as bjsg from 'babylonjs-gui'

    /** ****************************************************************************************************************
    *   Manages the Graphical User Interface that contains all GUI elements for one game level.
    *******************************************************************************************************************/
    export class GUIGame extends bz.GUI
    {
        /** The wearpon image. */
        protected                           wearponImage            :bjsg.Image                         = null;
        /** The corsshair. */
        protected                           crosshair               :bjsg.Image                         = null;

        /** ************************************************************************************************************
        *   Creates a new Heads Up Display for a game level.
        *
        *   @param scene     The babylon.JS scene to create this GUI for.
        *   @param keySystem The key system to use for key determination.
        ***************************************************************************************************************/
        public constructor( scene:BABYLON.Scene, keySystem:bz.KeySystem )
        {
            super( scene, keySystem );
        }

        /** ************************************************************************************************************
        *   Initializes the Heads Up Display for a game level.
        ***************************************************************************************************************/
        public init() : void
        {
            this.wearponImage = bz.GUIFactory.createImage
            (
                'wearpon/autoShotgun.png',
                -bz.SettingGUI.GUI_BORDER_X,
                0,
                bjsg.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                bjsg.Control.VERTICAL_ALIGNMENT_BOTTOM,
                null
            );
            this.guiFg.addControl( this.wearponImage );

            this.crosshair = bz.GUIFactory.createImage
            (
                'crosshair/default.png',
                0,
                0,
                bjsg.Control.HORIZONTAL_ALIGNMENT_CENTER,
                bjsg.Control.VERTICAL_ALIGNMENT_CENTER,
                null
            );
            this.guiFg.addControl( this.crosshair );
        }

        /** ************************************************************************************************************
        *   Updates the GUI information for the current game tick.
        *
        *   @param pause Specifies if the pause state is currently active.
        ***************************************************************************************************************/
        public render( pause:boolean ) : void
        {
            super.render( pause );
        }

        /** ************************************************************************************************************
        *   Sets visibility for the first player view components.
        *
        *   @param visible If the first player view components should be visible or not.
        ***************************************************************************************************************/
        public setFirstPlayerViewComponentsVisibility( visible:boolean ) : void
        {
            // change visibility for wearpon and crosshair
            this.wearponImage.isVisible = visible;
            this.crosshair.isVisible    = visible;
        }
    }

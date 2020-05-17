
    import * as bz   from '../../../..';
    import * as bjsg from 'babylonjs-gui'

    /** ****************************************************************************************************************
    *   The GUI for the 'Human Body Partitions' stage.
    *******************************************************************************************************************/
    export class GUIHumanBodyPartitions extends bz.GUI
    {
        /** The bg color for the GUI. */
        // tslint:disable-next-line:max-line-length
        public      static  readonly    GUI_COLOR_BG            :string                             = 'rgba( 0, 0, 0, 0.125 )';
        /** The text color for the GUI. */
        // tslint:disable-next-line:max-line-length
        public      static  readonly    GUI_COLOR_TEXT          :string                             = bz.SettingColor.COLOR_CSS_WHITE_OPAQUE;
        /** The text shadow color for the GUI. */
        // tslint:disable-next-line:max-line-length
        public      static  readonly    GUI_COLOR_SHADOW        :string                             = bz.SettingColor.COLOR_CSS_BLACK_OPAQUE;
        /** The border color for the GUI. */
        public      static  readonly    GUI_COLOR_BORDER        :string                             = '#ffffff';

        /** A reference to the camera zoom slider. */
        public                          cameraZoomSlider        :bjsg.Slider                        = null;

        /** The description GUI for one selected body part. */
        public                          descriptionGUI          :bz.GUIHumanPartitionDescription    = null;

        /** A reference to the Human Body Partition stage. */
        private                         parent                  :bz.HumanBodyPartitions             = null;

        /** ************************************************************************************************************
        *   Creates a new GUI for the Product Configurator.
        *
        *   @param scene  The babylon.JS scene to create this GUI for.
        *   @param parent The Product Configurator Stage.
        ***************************************************************************************************************/
        public constructor( scene:BABYLON.Scene, parent:bz.HumanBodyPartitions )
        {
            super( scene );

            this.parent = parent;
        }

        /** ************************************************************************************************************
        *   Inits all GUI components for the 3D Product Configurator.
        ***************************************************************************************************************/
        public init() : void
        {
            const rectangleLeftTop:bjsg.Rectangle = bz.GUIFactory.createRectangle
            (
                25,
                25,
                300,
                200,
                GUIHumanBodyPartitions.GUI_COLOR_BORDER,
                GUIHumanBodyPartitions.GUI_COLOR_BG
            );
            this.guiFg.addControl( rectangleLeftTop );

            const logo:bjsg.Image = bz.GUIFactory.createImage
            (
                bz.SettingEngine.BRANDING.getHbpGuiLogo(),
                50,
                50,
                bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT,
                bjsg.Control.VERTICAL_ALIGNMENT_TOP,
                GUIHumanBodyPartitions.GUI_COLOR_SHADOW
            );
            this.guiFg.addControl( logo );

            const titleRow:bjsg.TextBlock = bz.GUIFactory.createTextBlock
            (
                'Human Body Partitions, v.0.0.1, PoC',
                bz.SettingGUI.GUI_FONT_SIZE_MEDIUM,
                GUIHumanBodyPartitions.GUI_COLOR_TEXT,
                GUIHumanBodyPartitions.GUI_COLOR_SHADOW,
                50,
                115,
                250,
                25,
                bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT,
                bjsg.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            titleRow.textHorizontalAlignment = bjsg.Control.HORIZONTAL_ALIGNMENT_CENTER;
            this.guiFg.addControl( titleRow );

            const line1:bjsg.Rectangle = bz.GUIFactory.createRectangle
            (
                50,
                145,
                250,
                1,
                GUIHumanBodyPartitions.GUI_COLOR_BORDER,
                GUIHumanBodyPartitions.GUI_COLOR_BG
            );
            this.guiFg.addControl( line1 );

            const textCameraZoom:bjsg.TextBlock = bz.GUIFactory.createTextBlock
            (
                'Zoom',
                bz.SettingGUI.GUI_FONT_SIZE_MEDIUM,
                GUIHumanBodyPartitions.GUI_COLOR_TEXT,
                GUIHumanBodyPartitions.GUI_COLOR_SHADOW,
                50,
                155,
                250,
                25,
                bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT,
                bjsg.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            textCameraZoom.textHorizontalAlignment = bjsg.Control.HORIZONTAL_ALIGNMENT_CENTER;
            this.guiFg.addControl( textCameraZoom );

            this.cameraZoomSlider = bz.GUIFactory.createSlider
            (
                175.0,
                145.0,
                400.0,
                bz.SettingEngine.BRANDING.getPrimalColorCss(),
                bz.SettingColor.COLOR_CSS_COMPUTY_GRAY_OPAQUE,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                50,
                180,
                250,
                20,
                ( value:number ) :void =>
                {
                    // bz.Debug.gui.log( 'slider changed to [' + value + ']' );

                    this.parent.getCameraSystem().getArcRotateCamera().radius = ( 400.0 + 100.0 - value );
                }
            );
            this.guiFg.addControl( this.cameraZoomSlider );

            // init description gui
            this.descriptionGUI = new bz.GUIHumanPartitionDescription( this.guiFg );
            this.descriptionGUI.setBodyPartDescription( false, null );
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
    }

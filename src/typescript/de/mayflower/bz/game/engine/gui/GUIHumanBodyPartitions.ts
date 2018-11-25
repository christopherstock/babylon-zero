
    import * as bz          from '../../..';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   The GUI for the 'Human Body Partitions' stage.
    *******************************************************************************************************************/
    export class GUIHumanBodyPartitions extends bz.GUI
    {
        /** The bg color for the GUI. */
        // tslint:disable-next-line:max-line-length
        private     static  readonly    GUI_COLOR_BG                :string                     = 'rgba( 121, 120, 119, 0.25 )';
        /** The text color for the GUI. */
        // tslint:disable-next-line:max-line-length
        private     static  readonly    GUI_COLOR_TEXT              :string                     = bz.SettingColor.COLOR_CSS_WHITE_OPAQUE;
        /** The text shadow color for the GUI. */
        // tslint:disable-next-line:max-line-length
        private     static  readonly    GUI_COLOR_SHADOW            :string                     = bz.SettingColor.COLOR_CSS_BLACK_OPAQUE;
        /** The border color for the GUI. */
        private     static  readonly    GUI_COLOR_BORDER            :string                     = '#ffffff';

        /** A reference to the camera zoom slider. */
        public                          cameraZoomSlider            :BABYLON_GUI.Slider         = null;

        /** A reference to the Human Body Partition stage. */
        private                         parent                      :bz.HumanBodyPartitions     = null;

        /** The left bottom body part descriptor panel. */
        private                         rectangleLeftBottom         :BABYLON_GUI.Rectangle      = null;

        /** ************************************************************************************************************
        *   Creates a new GUI for the Product Configurator.
        *
        *   @param parent The Product Configurator Stage.
        ***************************************************************************************************************/
        public constructor( parent:bz.HumanBodyPartitions )
        {
            super();

            this.parent = parent;
        }

        /** ************************************************************************************************************
        *   Inits all GUI components for the 3D Product Configurator.
        ***************************************************************************************************************/
        public init() : void
        {
            const rectangleLeftTop:BABYLON_GUI.Rectangle = bz.GUIFactory.createRectangle
            (
                25,
                25,
                300,
                200,
                GUIHumanBodyPartitions.GUI_COLOR_BORDER,
                GUIHumanBodyPartitions.GUI_COLOR_BG
            );
            this.guiFg.addControl( rectangleLeftTop );

            const logo:BABYLON_GUI.Image = bz.GUIFactory.createImage
            (
                'hbp/compLogo.png',
                50,
                50,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                GUIHumanBodyPartitions.GUI_COLOR_SHADOW
            );
            this.guiFg.addControl( logo );

            const titleRow:BABYLON_GUI.TextBlock = bz.GUIFactory.createTextBlock
            (
                'Human Body Partitions, v.0.0.1, PoC',
                bz.SettingGUI.GUI_FONT_SIZE_MEDIUM,
                GUIHumanBodyPartitions.GUI_COLOR_TEXT,
                GUIHumanBodyPartitions.GUI_COLOR_SHADOW,
                50,
                115,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            titleRow.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            this.guiFg.addControl( titleRow );

            const line1:BABYLON_GUI.Rectangle = bz.GUIFactory.createRectangle
            (
                50,
                145,
                250,
                1,
                GUIHumanBodyPartitions.GUI_COLOR_BORDER,
                GUIHumanBodyPartitions.GUI_COLOR_BG
            );
            this.guiFg.addControl( line1 );

            const textCameraZoom:BABYLON_GUI.TextBlock = bz.GUIFactory.createTextBlock
            (
                'Zoom',
                bz.SettingGUI.GUI_FONT_SIZE_MEDIUM,
                GUIHumanBodyPartitions.GUI_COLOR_TEXT,
                GUIHumanBodyPartitions.GUI_COLOR_SHADOW,
                50,
                155,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            textCameraZoom.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            this.guiFg.addControl( textCameraZoom );

            this.cameraZoomSlider = bz.GUIFactory.createSlider
            (
                175.0,
                145.0,
                400.0,
                bz.SettingColor.COLOR_CSS_COMPUTY_GREEN_OPAQUE,
                bz.SettingColor.COLOR_CSS_COMPUTY_GRAY_OPAQUE,
                bz.SettingColor.COLOR_CSS_COMPUTY_GRAY_OPAQUE,
                50,
                180,
                250,
                20,
                ( value:number ) =>
                {
                    // bz.Debug.gui.log( 'slider changed to [' + value + ']' );

                    this.parent.getCameraSystem().getArcRotateCamera().radius = ( 400.0 + 100.0 - value );
                }
            );
            this.guiFg.addControl( this.cameraZoomSlider );

            // TODO outsource to separate class

            this.rectangleLeftBottom = bz.GUIFactory.createRectangle
            (
                25,
                250,
                300,
                200,
                GUIHumanBodyPartitions.GUI_COLOR_BORDER,
                GUIHumanBodyPartitions.GUI_COLOR_BG
            );
            this.guiFg.addControl( this.rectangleLeftBottom );
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
        }

        /** ************************************************************************************************************
        *   Being invoked when a visor color checkbox is clicked.
        *
        *   @param checkboxId The ID of the visir color checkbox being clicked.
        ***************************************************************************************************************/
/*
        private onCheckVisorColorRadioButton( checkboxId:number ) : void
        {
            bz.Debug.pc3d.log( 'Clicked Visor color change radiobutton [' + checkboxId + ']' );

            // change visor color
            this.parent.requestVisorColorChange( GUIHumanBodyPartitions.VISOR_COLORS[ checkboxId ] );
        }
*/
        /** ************************************************************************************************************
        *   Being invoked when a helmet color checkbox is clicked.
        *
        *   @param checkboxId The ID of the helmet color checkbox being clicked.
        ***************************************************************************************************************/
/*
        private onCheckHelmetColorRadioButton( checkboxId:number ) : void
        {
            bz.Debug.pc3d.log( 'Clicked Helmet color change radiobutton [' + checkboxId + ']' );

            // change helmet color
            this.parent.requestHelmetColorChange( GUIHumanBodyPartitions.HELMET_COLORS[ checkboxId ] );
        }
*/
    }

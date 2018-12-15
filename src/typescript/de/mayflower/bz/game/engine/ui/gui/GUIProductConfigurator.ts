
    import * as bz          from '../../../..';
    import * as BABYLON     from 'babylonjs';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   The GUI for the '3D product configurator' stage.
    *******************************************************************************************************************/
    export class GUIProductConfigurator extends bz.GUI
    {
        /** The colors for the visor. */
        private     static  readonly    VISOR_COLORS                :BABYLON.Color3[]           =
        [
            new BABYLON.Color3( 0.3,    0.4,    0.3    ),
            new BABYLON.Color3( 0.9647, 0.8235, 0.4392 ),
            new BABYLON.Color3( 0.65,   0.65,   0.65   ),
            new BABYLON.Color3( 0.33,   0.33,   0.33   ),
        ];
        /** The colors for the visor text shadows. */
        private     static  readonly    VISOR_COLOR_SHADOWS         :string[]                   =
        [
            bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
            bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
            bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
            bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
        ];
        /** The color names for the visor. */
        private     static  readonly    VISOR_COLOR_NAMES           :string[]                   =
        [
            'Verde Granturismo',
            'Pearl Beige',
            'Grigio Touring Metallic',
            'Grigio Granito',
        ];

        /** The colors for the helmet. */
        private     static  readonly    HELMET_COLORS               :BABYLON.Color3[]           =
        [
            new BABYLON.Color3( 0.4392, 0.4392, 0.4392 ),
            new BABYLON.Color3( 1.0,    1.0,    1.0    ),
            new BABYLON.Color3( 0.85,   0.4,    0.0    ),
            new BABYLON.Color3( 0.8,    0.15,   0.15   ),
        ];
        /** The colors for the helmet text shadows. */
        private     static  readonly    HELMET_COLOR_SHADOWS        :string[]                   =
        [
            bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
            bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
            bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
            bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
        ];
        /** The color names for the helmet. */
        private     static  readonly    HELMET_COLOR_NAMES          :string[]                   =
        [
            'Grigio Titanio',
            'Bianco Eldorado',
            'Arancio Trionfale',
            'Rosso Corallo',
        ];

        /** The bg color for the GUI. */
        // tslint:disable-next-line:max-line-length
        private     static  readonly    GUI_COLOR_BG                :string                     = 'rgba( 100, 100, 100, 0.5 )';
        /** The text color for the GUI. */
        // tslint:disable-next-line:max-line-length
        private     static  readonly    GUI_COLOR_TEXT              :string                     = bz.SettingColor.COLOR_CSS_WHITE_OPAQUE;
        /** The text shadow color for the GUI. */
        // tslint:disable-next-line:max-line-length
        private     static  readonly    GUI_COLOR_SHADOW            :string                     = bz.SettingColor.COLOR_CSS_BLACK_OPAQUE;
        /** The border color for the GUI. */
        private     static  readonly    GUI_COLOR_BORDER            :string                     = '#c9c9c9';

        /** A reference to the camera zoom slider. */
        public                          cameraZoomSlider            :BABYLON_GUI.Slider         = null;
        /** A reference to the toggle button to open and close the visor. */
        public                          visorToggleButton           :BABYLON_GUI.Button         = null;

        /** All checkboxes that change the visor color. */
        private                         visorColorRadioButtons      :BABYLON_GUI.RadioButton[]  = [];
        /** All checkboxes that change the helmet color. */
        private                         helmetColorRadioButtons     :BABYLON_GUI.RadioButton[]  = [];
        /** A reference to the Product Configurator stage. */
        private                         parent                      :bz.ProductConfigurator     = null;

        /** ************************************************************************************************************
        *   Creates a new GUI for the Product Configurator.
        *
        *   @param scene  The babylon.JS scene to create this GUI for.
        *   @param parent The Product Configurator Stage.
        ***************************************************************************************************************/
        public constructor( scene:BABYLON.Scene, parent:bz.ProductConfigurator )
        {
            super( scene );

            this.parent = parent;
        }

        /** ************************************************************************************************************
        *   Inits all GUI components for the 3D Product Configurator.
        ***************************************************************************************************************/
        public init() : void
        {
            const rectangleOuter:BABYLON_GUI.Rectangle = bz.GUIFactory.createRectangle
            (
                22,
                22,
                306,
                646,
                GUIProductConfigurator.GUI_COLOR_BORDER,
                bz.SettingColor.COLOR_CSS_TRANSPARENT
            );
            this.guiFg.addControl( rectangleOuter );

            const rectangleOuter2:BABYLON_GUI.Rectangle = bz.GUIFactory.createRectangle
            (
                23,
                23,
                304,
                644,
                GUIProductConfigurator.GUI_COLOR_BORDER,
                bz.SettingColor.COLOR_CSS_TRANSPARENT
            );
            this.guiFg.addControl( rectangleOuter2 );

            const rectangleInner:BABYLON_GUI.Rectangle = bz.GUIFactory.createRectangle
            (
                25,
                25,
                300,
                640,
                GUIProductConfigurator.GUI_COLOR_BORDER,
                GUIProductConfigurator.GUI_COLOR_BG
            );
            this.guiFg.addControl( rectangleInner );

            const logo:BABYLON_GUI.Image = bz.GUIFactory.createImage
            (
                'pc3d/mfLogo.png',
                50,
                50,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                GUIProductConfigurator.GUI_COLOR_SHADOW
            );
            this.guiFg.addControl( logo );

            const titleRow1:BABYLON_GUI.TextBlock = bz.GUIFactory.createTextBlock
            (
                '3D Product',
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                GUIProductConfigurator.GUI_COLOR_TEXT,
                GUIProductConfigurator.GUI_COLOR_SHADOW,
                160,
                50,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.guiFg.addControl( titleRow1 );
            const titleRow2:BABYLON_GUI.TextBlock = bz.GUIFactory.createTextBlock
            (
                'Configurator',
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                GUIProductConfigurator.GUI_COLOR_TEXT,
                GUIProductConfigurator.GUI_COLOR_SHADOW,
                160,
                80,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.guiFg.addControl( titleRow2 );
            const titleRow3:BABYLON_GUI.TextBlock = bz.GUIFactory.createTextBlock
            (
                'v.0.4.1, MVP',
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                GUIProductConfigurator.GUI_COLOR_TEXT,
                GUIProductConfigurator.GUI_COLOR_SHADOW,
                160,
                110,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.guiFg.addControl( titleRow3 );

            const line1:BABYLON_GUI.Line = bz.GUIFactory.createLine
            (
                50,
                160,
                300,
                160,
                1,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_TRANSPARENT
            );
            this.guiFg.addControl( line1 );

            const textColorChoserVisor:BABYLON_GUI.TextBlock = bz.GUIFactory.createTextBlock
            (
                'Color Visor',
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                GUIProductConfigurator.GUI_COLOR_TEXT,
                GUIProductConfigurator.GUI_COLOR_SHADOW,
                50,
                170,
                300,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.guiFg.addControl( textColorChoserVisor );

            for (let i:number = 0; i < GUIProductConfigurator.VISOR_COLORS.length; ++i )
            {
                const visorColor :BABYLON.Color3 = GUIProductConfigurator.VISOR_COLORS[ i ];
                const colorCss   :string         = (
                    'rgb( '
                    + ( visorColor.r * 255 )
                    + ', '
                    + ( visorColor.g * 255 )
                    + ', '
                    + ( visorColor.b * 255 )
                    + ' )'
                );
                const radioButton:BABYLON_GUI.RadioButton = bz.GUIFactory.createRadioButton
                (
                    'visorColorSelect',
                    bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                    GUIProductConfigurator.GUI_COLOR_BG,
                    50,
                    203 + ( i * 30 ),
                    20,
                    20,
                    ( checked:boolean ) => {
                        bz.Debug.pc3d.log( 'RadioButton clicked [' + i + '][' + checked + ']' );
                        if ( checked )
                        {
                            this.onCheckVisorColorRadioButton( i );
                        }
                        else
                        {
                            bz.GUIFactory.checkRadioButtonIfAllAreUnchecked( this.visorColorRadioButtons, i );
                        }
                    }
                );
                this.visorColorRadioButtons.push( radioButton );
                this.guiFg.addControl( radioButton );

                const colorCaption:BABYLON_GUI.TextBlock = bz.GUIFactory.createTextBlock
                (
                    GUIProductConfigurator.VISOR_COLOR_NAMES[ i ],
                    bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                    colorCss,
                    GUIProductConfigurator.VISOR_COLOR_SHADOWS[ i ],
                    80,
                    203 + ( i * 30 ),
                    300,
                    20,
                    BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                    BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                    () => {
                        bz.Debug.pc3d.log( 'text clicked! [' + i + ' ]' );
                        radioButton.isChecked = true;
                    }
                );
                this.guiFg.addControl( colorCaption );
            }
            this.visorColorRadioButtons[ 0 ].isChecked = true;

            const line2:BABYLON_GUI.Line = bz.GUIFactory.createLine
            (
                50,
                330,
                300,
                330,
                1,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_TRANSPARENT
            );
            this.guiFg.addControl( line2 );

            const textColorChoserHelmet:BABYLON_GUI.TextBlock = bz.GUIFactory.createTextBlock
            (
                'Color Helmet',
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                GUIProductConfigurator.GUI_COLOR_TEXT,
                GUIProductConfigurator.GUI_COLOR_SHADOW,
                50,
                340,
                300,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.guiFg.addControl( textColorChoserHelmet );

            for (let i:number = 0; i < GUIProductConfigurator.HELMET_COLORS.length; ++i )
            {
                const helmetColor :BABYLON.Color3 = GUIProductConfigurator.HELMET_COLORS[ i ];
                const colorCss   :string         = (
                    'rgb( '
                    + ( helmetColor.r * 255 )
                    + ', '
                    + ( helmetColor.g * 255 )
                    + ', '
                    + ( helmetColor.b * 255 )
                    + ' )'
                );
                const radioButton:BABYLON_GUI.RadioButton = bz.GUIFactory.createRadioButton
                (
                    'helmetColorSelect',
                    bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                    GUIProductConfigurator.GUI_COLOR_BG,
                    50,
                    373 + ( i * 30 ),
                    20,
                    20,
                    ( checked:boolean ) => {
                        bz.Debug.pc3d.log( 'RadioButton clicked [' + i + '][' + checked + ']' );
                        if ( checked )
                        {
                            this.onCheckHelmetColorRadioButton( i );
                        }
                        else
                        {
                            bz.GUIFactory.checkRadioButtonIfAllAreUnchecked( this.helmetColorRadioButtons, i );
                        }
                    }
                );
                this.helmetColorRadioButtons.push( radioButton );
                this.guiFg.addControl( radioButton );

                const colorCaption:BABYLON_GUI.TextBlock = bz.GUIFactory.createTextBlock
                (
                    GUIProductConfigurator.HELMET_COLOR_NAMES[ i ],
                    bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                    colorCss,
                    GUIProductConfigurator.HELMET_COLOR_SHADOWS[ i ],
                    80,
                    373 + ( i * 30 ),
                    300,
                    20,
                    BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                    BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                    () => {
                        bz.Debug.pc3d.log( 'text clicked! [' + i + ' ]' );
                        radioButton.isChecked = true;
                    }
                );
                this.guiFg.addControl( colorCaption );
            }
            this.helmetColorRadioButtons[ 0 ].isChecked = true;

            const line3:BABYLON_GUI.Line = bz.GUIFactory.createLine
            (
                50,
                500,
                300,
                500,
                1,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_TRANSPARENT
            );
            this.guiFg.addControl( line3 );

            const textCameraZoom:BABYLON_GUI.TextBlock = bz.GUIFactory.createTextBlock
            (
                'Zoom',
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                GUIProductConfigurator.GUI_COLOR_TEXT,
                GUIProductConfigurator.GUI_COLOR_SHADOW,
                50,
                510,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.guiFg.addControl( textCameraZoom );

            this.cameraZoomSlider = bz.GUIFactory.createSlider
            (
                175.0,
                175.0,
                400.0,
                bz.SettingColor.COLOR_CSS_MAYFLOWER_ORANGE_OPAQUE,
                '#707070',
                '#707070',
                50,
                545,
                250,
                20,
                ( value:number ) =>
                {
                    // bz.Debug.gui.log( 'slider changed to [' + value + ']' );

                    // this.getCameraSystem().arcRotateCamera.radius = ( 400.0 + 100.0 - Math.floor( value ) );
                    this.parent.getCameraSystem().getArcRotateCamera().radius = ( 400.0 + 100.0 - value );
                }
            );
            this.guiFg.addControl( this.cameraZoomSlider );

            const line4:BABYLON_GUI.Line = bz.GUIFactory.createLine
            (
                50,
                580,
                300,
                580,
                1,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_TRANSPARENT
            );
            this.guiFg.addControl( line4 );

            this.visorToggleButton = bz.GUIFactory.createButton
            (
                'Open Visor',
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_MAYFLOWER_ORANGE_OPAQUE,
                50,
                600,
                250,
                35,
                () => {
                    this.parent.requestVisorAnimationToggle();
                }
            );
            this.guiFg.addControl( this.visorToggleButton );
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
        *   Being invoked when a visor color checkbox is clicked.
        *
        *   @param checkboxId The ID of the visir color checkbox being clicked.
        ***************************************************************************************************************/
        private onCheckVisorColorRadioButton( checkboxId:number ) : void
        {
            bz.Debug.pc3d.log( 'Clicked Visor color change radiobutton [' + checkboxId + ']' );

            // change visor color
            this.parent.requestVisorColorChange( GUIProductConfigurator.VISOR_COLORS[ checkboxId ] );
        }

        /** ************************************************************************************************************
        *   Being invoked when a helmet color checkbox is clicked.
        *
        *   @param checkboxId The ID of the helmet color checkbox being clicked.
        ***************************************************************************************************************/
        private onCheckHelmetColorRadioButton( checkboxId:number ) : void
        {
            bz.Debug.pc3d.log( 'Clicked Helmet color change radiobutton [' + checkboxId + ']' );

            // change helmet color
            this.parent.requestHelmetColorChange( GUIProductConfigurator.HELMET_COLORS[ checkboxId ] );
        }
    }
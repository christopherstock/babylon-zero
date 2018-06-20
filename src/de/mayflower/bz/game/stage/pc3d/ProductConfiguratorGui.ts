
    import * as bz          from '../../..';
    import * as BABYLON     from 'babylonjs';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   The GUI for the 'product viewer' stage.
    *******************************************************************************************************************/
    export class ProductConfiguratorGui
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
            '#ffffff',
            '#000000',
            '#000000',
            '#ffffff',
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
            '#ffffff',
            '#000000',
            '#ffffff',
            '#ffffff',
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
        private     static  readonly    GUI_COLOR_BG                :string                     = 'rgba( 100, 100, 100, 0.5 )';
        /** The text color for the GUI. */
        private     static  readonly    GUI_COLOR_TEXT              :string                     = '#ffffff';
        /** The text shadow color for the GUI. */
        private     static  readonly    GUI_COLOR_SHADOW            :string                     = '#000000';
        /** The border color for the GUI. */
        private     static  readonly    GUI_COLOR_BORDER            :string                     = '#c9c9c9';

        /** A reference to the camera zoom slider. */
        public                          cameraZoomSlider            :BABYLON_GUI.Slider         = null;

        /** All checkboxes that change the visor color. */
        private                         visorColorRadioButtons      :BABYLON_GUI.RadioButton[]  = [];
        /** All checkboxes that change the helmet color. */
        private                         helmetColorRadioButtons     :BABYLON_GUI.RadioButton[]  = [];
        /** A reference to the toggle button to open and close the visor. */
        private                         visorToggleButton           :BABYLON_GUI.Button         = null;
        /** A reference to the Product Configurator stage. */
        private                         parent                      :bz.ProductConfigurator     = null;

        /** ************************************************************************************************************
        *   Inits all GUI components for the 3D Product Configurator.
        *
        *   @param parent The Product Configurator Stage.
        ***************************************************************************************************************/
        public init( parent:bz.ProductConfigurator ) : void
        {
            this.parent = parent;

            const rectangleOuter:BABYLON_GUI.Rectangle = bz.GuiFactory.createRectangle
            (
                22,
                22,
                306,
                646,
                ProductConfiguratorGui.GUI_COLOR_BORDER,
                'transparent'
            );
            this.parent.guiFg.addControl( rectangleOuter );

            const rectangleOuter2:BABYLON_GUI.Rectangle = bz.GuiFactory.createRectangle
            (
                23,
                23,
                304,
                644,
                ProductConfiguratorGui.GUI_COLOR_BORDER,
                'transparent'
            );
            this.parent.guiFg.addControl( rectangleOuter2 );

            const rectangleInner:BABYLON_GUI.Rectangle = bz.GuiFactory.createRectangle
            (
                25,
                25,
                300,
                640,
                ProductConfiguratorGui.GUI_COLOR_BORDER,
                ProductConfiguratorGui.GUI_COLOR_BG
            );
            this.parent.guiFg.addControl( rectangleInner );

            const logo:BABYLON_GUI.Image = bz.GuiFactory.createImage
            (
                'mfLogo.png',
                50,
                50,
                ProductConfiguratorGui.GUI_COLOR_SHADOW
            );
            this.parent.guiFg.addControl( logo );

            const titleRow1:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                '3D Product',
                ProductConfiguratorGui.GUI_COLOR_TEXT,
                ProductConfiguratorGui.GUI_COLOR_SHADOW,
                160,
                50,
                250,
                25,
                null
            );
            this.parent.guiFg.addControl( titleRow1 );
            const titleRow2:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'Configurator',
                ProductConfiguratorGui.GUI_COLOR_TEXT,
                ProductConfiguratorGui.GUI_COLOR_SHADOW,
                160,
                80,
                250,
                25,
                null
            );
            this.parent.guiFg.addControl( titleRow2 );
            const titleRow3:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'v.0.4.1, MVP',
                ProductConfiguratorGui.GUI_COLOR_TEXT,
                ProductConfiguratorGui.GUI_COLOR_SHADOW,
                160,
                110,
                250,
                25,
                null
            );
            this.parent.guiFg.addControl( titleRow3 );

            const line1:BABYLON_GUI.Line = bz.GuiFactory.createLine
            (
                50,
                160,
                300,
                160,
                1,
                'white',
                'transparent'
            );
            this.parent.guiFg.addControl( line1 );

            const textColorChoserVisor:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'Color Visor',
                ProductConfiguratorGui.GUI_COLOR_TEXT,
                ProductConfiguratorGui.GUI_COLOR_SHADOW,
                50,
                170,
                300,
                25,
                null
            );
            this.parent.guiFg.addControl( textColorChoserVisor );

            for ( let i:number = 0; i < ProductConfiguratorGui.VISOR_COLORS.length; ++i )
            {
                const visorColor :BABYLON.Color3 = ProductConfiguratorGui.VISOR_COLORS[ i ];
                const colorCss   :string         = (
                    'rgb( '
                    + ( visorColor.r * 255 )
                    + ', '
                    + ( visorColor.g * 255 )
                    + ', '
                    + ( visorColor.b * 255 )
                    + ' )'
                );
                const radioButton:BABYLON_GUI.RadioButton = bz.GuiFactory.createRadioButton
                (
                    'visorColorSelect',
                    'white',
                    ProductConfiguratorGui.GUI_COLOR_BG,
                    50,
                    203 + ( i * 30 ),
                    20,
                    20,
                    ( checked:boolean ) => {
                        bz.Debug.gui.log( 'RadioButton clicked [' + i + '][' + checked + ']' );
                        if ( checked )
                        {
                            this.checkVisorColorRadioButton( i );
                        }
                        else
                        {
                            bz.GuiFactory.checkRadioButtonIfAllAreUnchecked( this.visorColorRadioButtons, i );
                        }
                    }
                );
                this.visorColorRadioButtons.push( radioButton );
                this.parent.guiFg.addControl( radioButton );

                const colorCaption:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
                (
                    ProductConfiguratorGui.VISOR_COLOR_NAMES[ i ],
                    colorCss,
                    ProductConfiguratorGui.VISOR_COLOR_SHADOWS[ i ],
                    80,
                    203 + ( i * 30 ),
                    300,
                    20,
                    () => {
                        bz.Debug.gui.log( 'text clicked! [' + i + ' ]' );
                        radioButton.isChecked = true;
                    }
                );
                this.parent.guiFg.addControl( colorCaption );
            }
            this.visorColorRadioButtons[ 0 ].isChecked = true;

            const line2:BABYLON_GUI.Line = bz.GuiFactory.createLine
            (
                50,
                330,
                300,
                330,
                1,
                'white',
                'transparent'
            );
            this.parent.guiFg.addControl( line2 );

            const textColorChoserHelmet:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'Color Helmet',
                ProductConfiguratorGui.GUI_COLOR_TEXT,
                ProductConfiguratorGui.GUI_COLOR_SHADOW,
                50,
                340,
                300,
                25,
                null
            );
            this.parent.guiFg.addControl( textColorChoserHelmet );

            for ( let i:number = 0; i < ProductConfiguratorGui.HELMET_COLORS.length; ++i )
            {
                const helmetColor :BABYLON.Color3 = ProductConfiguratorGui.HELMET_COLORS[ i ];
                const colorCss   :string         = (
                    'rgb( '
                    + ( helmetColor.r * 255 )
                    + ', '
                    + ( helmetColor.g * 255 )
                    + ', '
                    + ( helmetColor.b * 255 )
                    + ' )'
                );
                const radioButton:BABYLON_GUI.RadioButton = bz.GuiFactory.createRadioButton
                (
                    'helmetColorSelect',
                    'white',
                    ProductConfiguratorGui.GUI_COLOR_BG,
                    50,
                    373 + ( i * 30 ),
                    20,
                    20,
                    ( checked:boolean ) => {
                        bz.Debug.gui.log( 'RadioButton clicked [' + i + '][' + checked + ']' );
                        if ( checked )
                        {
                            this.checkHelmetColorRadioButton( i );
                        }
                        else
                        {
                            bz.GuiFactory.checkRadioButtonIfAllAreUnchecked( this.helmetColorRadioButtons, i );
                        }
                    }
                );
                this.helmetColorRadioButtons.push( radioButton );
                this.parent.guiFg.addControl( radioButton );

                const colorCaption:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
                (
                    ProductConfiguratorGui.HELMET_COLOR_NAMES[ i ],
                    colorCss,
                    ProductConfiguratorGui.HELMET_COLOR_SHADOWS[ i ],
                    80,
                    373 + ( i * 30 ),
                    300,
                    20,
                    () => {
                        bz.Debug.gui.log( 'text clicked! [' + i + ' ]' );
                        radioButton.isChecked = true;
                    }
                );
                this.parent.guiFg.addControl( colorCaption );
            }
            this.helmetColorRadioButtons[ 0 ].isChecked = true;

            const line3:BABYLON_GUI.Line = bz.GuiFactory.createLine
            (
                50,
                500,
                300,
                500,
                1,
                'white',
                'transparent'
            );
            this.parent.guiFg.addControl( line3 );

            const textCameraZoom:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'Zoom',
                ProductConfiguratorGui.GUI_COLOR_TEXT,
                ProductConfiguratorGui.GUI_COLOR_SHADOW,
                50,
                510,
                250,
                25,
                null
            );
            this.parent.guiFg.addControl( textCameraZoom );

            this.cameraZoomSlider = bz.GuiFactory.createSlider
            (
                175.0,
                175.0,
                400.0,
                '#ed7304',
                '#707070',
                50,
                545,
                250,
                20,
                ( value:number ) =>
                {
                    // bz.Debug.gui.log( 'slider changed to [' + value + ']' );

                    // this.getCameraSystem().arcRotateCamera.radius = ( 400.0 + 100.0 - Math.floor( value ) );
                    this.parent.getCameraSystem().arcRotateCamera.radius = ( 400.0 + 100.0 - value );
                }
            );
            this.parent.guiFg.addControl( this.cameraZoomSlider );

            const line4:BABYLON_GUI.Line = bz.GuiFactory.createLine
            (
                50,
                580,
                300,
                580,
                1,
                'white',
                'transparent'
            );
            this.parent.guiFg.addControl( line4 );

            this.visorToggleButton = bz.GuiFactory.createButton
            (
                'Open Visor',
                'white',
                '#ed7304',
                50,
                600,
                250,
                35,
                () => {
                    this.parent.requestVisirAnimationToggle();
                }
            );
            this.parent.guiFg.addControl( this.visorToggleButton );
        }

        /** ************************************************************************************************************
        *   Sets a new caption for the button that toggles the visor.
        *
        *   @param newText The text to set as the button's caption.
        ***************************************************************************************************************/
        public setVisorToggleButtonText( newText:string ) : void
        {
            const textName  :string                = this.visorToggleButton.name + '_button';
            const textBlock :BABYLON.GUI.TextBlock = this.visorToggleButton.getChildByType
            (
                textName,
                'TextBlock'
            ) as BABYLON.GUI.TextBlock;

            textBlock.text = newText;
        }

        /** ************************************************************************************************************
        *   Being invoked when a visor color checkbox is clicked.
        *
        *   @param checkboxId The ID of the visir color checkbox being clicked.
        ***************************************************************************************************************/
        private checkVisorColorRadioButton( checkboxId:number ) : void
        {
            bz.Debug.gui.log( 'Clicked Visor color change radiobutton [' + checkboxId + ']' );

            // change visor color
            this.parent.requestVisorColorChange( ProductConfiguratorGui.VISOR_COLORS[ checkboxId ] );
        }

        /** ************************************************************************************************************
        *   Being invoked when a helmet color checkbox is clicked.
        *
        *   @param checkboxId The ID of the helmet color checkbox being clicked.
        ***************************************************************************************************************/
        private checkHelmetColorRadioButton( checkboxId:number ) : void
        {
            bz.Debug.gui.log( 'Clicked Helmet color change radiobutton [' + checkboxId + ']' );

            // change helmet color
            this.parent.requestHelmetColorChange( ProductConfiguratorGui.HELMET_COLORS[ checkboxId ] );
        }
    }

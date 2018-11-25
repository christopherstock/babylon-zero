
    import * as bz          from '../../..';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   The GUI for the 'Human Body Partitions' stage.
    *******************************************************************************************************************/
    export class GUIHumanBodyPartitions extends bz.GUI
    {
        /** The bg color for the GUI. */
        // tslint:disable-next-line:max-line-length
        private     static  readonly    GUI_COLOR_BG                :string                     = 'rgba( 0, 0, 0, 0.125 )';
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
        /** The left bottom title field. */
        private                         bodyPartTitle               :BABYLON_GUI.TextBlock      = null;
        /** The left bottom text field. */
        private                         bodyPartText                :BABYLON_GUI.TextBlock      = null;

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
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
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

            this.bodyPartTitle = bz.GUIFactory.createTextBlock
            (
                '',
                bz.SettingGUI.GUI_FONT_SIZE_MEDIUM,
                GUIHumanBodyPartitions.GUI_COLOR_TEXT,
                GUIHumanBodyPartitions.GUI_COLOR_SHADOW,
                50,
                275,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.bodyPartTitle.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            this.guiFg.addControl( this.bodyPartTitle );

            this.bodyPartText = bz.GUIFactory.createTextBlock
            (
                '',
                bz.SettingGUI.GUI_FONT_SIZE_MEDIUM,
                GUIHumanBodyPartitions.GUI_COLOR_TEXT,
                GUIHumanBodyPartitions.GUI_COLOR_SHADOW,
                50,
                315,
                250,
                125,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.bodyPartText.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            this.bodyPartText.textWrapping = true;
            this.guiFg.addControl( this.bodyPartText );

            this.setBodyPartDescription( false, null );
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
        *   Sets visibility and content for the 'Body Part Description' rectangle.
        *
        *   @param visible  If the field shall be visible or not.
        *   @param meshName The name of the mesh that has been selected.
        ***************************************************************************************************************/
        public setBodyPartDescription( visible:boolean, meshName:string ) : void
        {
            bz.Debug.hbp.log( 'Show info for mesh [' + meshName + ']' );

            // show or hide all compontnts
            this.rectangleLeftBottom.isVisible = visible;
            this.bodyPartTitle.isVisible       = visible;
            this.bodyPartText.isVisible        = visible;

            // assign texts
            switch ( meshName )
            {
                case 'body':
                {
                    this.bodyPartTitle.text = 'Upper Body';
                    this.bodyPartText.text = 'If you want an effective upper body workout optimized for muscle growth, then you need to read this article.\n'
                        + 'When it comes to picking a workout split that maximizes muscle growth, there’s a lot of factors that need to be considered.';
                    break;
                }

                case 'head':
                {
                    this.bodyPartTitle.text = 'Head';
                    this.bodyPartText.text = 'Nearly everyone has had headache pain, and most of us have had it many times. A minor headache is little more than a nuisance that\'s relieved by an over-the-counter pain reliever, some food or coffee, or a short rest.';
                    break;
                }

                case 'legs_upper':
                {
                    this.bodyPartTitle.text = 'Upper Thigh';
                    this.bodyPartText.text = 'The upper leg is often called the thigh. It’s the area that runs from the hip to the knee in each leg. The hamstrings are three muscles located on the back of the thigh. They allow the knees to bend.';
                    break;
                }

                case 'knees':
                {
                    this.bodyPartTitle.text = 'Knees';
                    this.bodyPartText.text = 'In humans and other primates, the knee joins the thigh with the leg and consists of two joints: one between the femur and tibia (tibiofemoral joint).';
                    break;
                }

                case 'legs_lower':
                {
                    this.bodyPartTitle.text = 'Lower Thigh';
                    this.bodyPartText.text = 'The lower leg is a major anatomical part of the skeletal system. Together with the upper leg, it forms the lower extremity. It lies between the knee and the ankle, while the upper leg lies between the hip and the knee.';
                    break;
                }

                case 'feet':
                {
                    this.bodyPartTitle.text = 'Feet';
                    this.bodyPartText.text = 'The foot (plural feet) is an anatomical structure found in many vertebrates. It is the terminal portion of a limb which bears weight and allows locomotion. In many animals with feet, the foot is a separate organ at the terminal part of the leg.';
                    break;
                }
            }
        }
    }

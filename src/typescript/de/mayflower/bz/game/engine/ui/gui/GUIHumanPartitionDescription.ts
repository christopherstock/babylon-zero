
    import * as bz   from '../../../..';
    import * as bjsg from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   The GUI part with the description panel.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class GUIHumanPartitionDescription
    {
        /** The left bottom body part descriptor panel. */
        private             readonly    rectangleLeftBottom         :bjsg.Rectangle      = null;
        /** The left bottom title field. */
        private             readonly    bodyPartTitle               :bjsg.TextBlock      = null;
        /** The left bottom text field. */
        private             readonly    bodyPartText                :bjsg.TextBlock      = null;

        /** ************************************************************************************************************
        *   Creates a new GUI for the Product Configurator.
        *
        *   @param guiFg The gui to append all components to.
        ***************************************************************************************************************/
        public constructor( guiFg:bjsg.AdvancedDynamicTexture )
        {
            this.rectangleLeftBottom = bz.GUIFactory.createRectangle
            (
                25,
                250,
                300,
                200,
                bz.GUIHumanBodyPartitions.GUI_COLOR_BORDER,
                bz.GUIHumanBodyPartitions.GUI_COLOR_BG
            );
            guiFg.addControl( this.rectangleLeftBottom );

            this.bodyPartTitle = bz.GUIFactory.createTextBlock
            (
                '',
                bz.SettingGUI.GUI_FONT_SIZE_MEDIUM,
                bz.GUIHumanBodyPartitions.GUI_COLOR_TEXT,
                bz.GUIHumanBodyPartitions.GUI_COLOR_SHADOW,
                50,
                275,
                250,
                25,
                bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT,
                bjsg.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.bodyPartTitle.textHorizontalAlignment = bjsg.Control.HORIZONTAL_ALIGNMENT_CENTER;
            guiFg.addControl( this.bodyPartTitle );

            this.bodyPartText = bz.GUIFactory.createTextBlock
            (
                '',
                bz.SettingGUI.GUI_FONT_SIZE_MEDIUM,
                bz.GUIHumanBodyPartitions.GUI_COLOR_TEXT,
                bz.GUIHumanBodyPartitions.GUI_COLOR_SHADOW,
                50,
                315,
                250,
                125,
                bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT,
                bjsg.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.bodyPartText.textHorizontalAlignment = bjsg.Control.HORIZONTAL_ALIGNMENT_CENTER;
            this.bodyPartText.textWrapping = true;
            guiFg.addControl( this.bodyPartText );
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
                    this.bodyPartText.text = 'If you want an effective upper body workout optimized for muscle growth, then you need to read this article.\nWhen it comes to picking a workout split that maximizes muscle growth, there’s a lot of factors that need to be considered.';
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

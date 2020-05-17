
    import * as bz   from '../../../..';
    import * as bjsg from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   Creates all types of GUI components.
    *******************************************************************************************************************/
    export abstract class GUIFactory
    {
        /** Next ID to assign for GUI component creation. */
        private         static          nextGuiId                           :number                 = 0;

        /** ************************************************************************************************************
        *   Creates a fullscreen GUI in bg or fg.
        *
        *   @param scene      The scene that contains this light.
        *   @param foreground Specifies if this GUI shall be set in foreground of this scene.
        *                     <code>false</code> will put this GUI into the background.
        *
        *   @return The fullscreen GUI.
        ***************************************************************************************************************/
        public static createGUI
        (
            scene      :BABYLON.Scene,
            foreground :boolean
        )
        : bjsg.AdvancedDynamicTexture
        {
            const gui:bjsg.AdvancedDynamicTexture = bjsg.AdvancedDynamicTexture.CreateFullscreenUI
            (
                GUIFactory.createNextGuiId(),
                foreground
/*
                scene,
                BABYLON.Texture.NEAREST_SAMPLINGMODE
*/
            );

            gui.renderAtIdealSize = true;
            gui.useSmallestIdeal  = false;
            gui.renderScale       = 1.0;

            return gui;
        }

        /** ************************************************************************************************************
        *   Creates a rectangle for the GUI.
        *
        *   @param x           Position of the left edge.
        *   @param y           Position of the top edge.
        *   @param width       The horizontal dimension.
        *   @param height      The vertical dimension.
        *   @param colorBorder A css value for the border color.
        *   @param colorFill   A css value for the fill color.
        *
        *   @return The specified rectangle.
        ***************************************************************************************************************/
        public static createRectangle
        (
            x             :number,
            y             :number,
            width         :number,
            height        :number,
            colorBorder   :string,
            colorFill     :string
        )
        : bjsg.Rectangle
        {
            const rectangle:bjsg.Rectangle = new bjsg.Rectangle( GUIFactory.createNextGuiId() );

            rectangle.left       = x;
            rectangle.top        = y;
            rectangle.width      = String( width  ) + 'px';
            rectangle.height     = String( height ) + 'px';
            rectangle.color      = colorBorder;
            rectangle.background = colorFill;

            rectangle.horizontalAlignment = bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT;
            rectangle.verticalAlignment   = bjsg.Control.VERTICAL_ALIGNMENT_TOP;

            return rectangle;
        }

        /** ************************************************************************************************************
        *   Creates a text block for the GUI.
        *
        *   @param text          The text to set into the block.
        *   @param fontSize      The font size of the text to display.
        *   @param color         A css value for the text color.
        *   @param shadowColor   A css value for the text's shadow color.
        *   @param x             Position of the left edge.
        *   @param y             Position of the top edge.
        *   @param width         The horizontal dimension.
        *   @param height        The vertical   dimension.
        *   @param alignmentHorz The horizontal alignment.
        *   @param alignmentVert The vertical   alignment.
        *   @param onPointerDown A callback to invoke when the pointer is down.
        *
        *   @return The specified text block.
        ***************************************************************************************************************/
        public static createTextBlock
        (
            text          :string,
            fontSize      :number,
            color         :string,
            shadowColor   :string,
            x             :number,
            y             :number,
            width         :number,
            height        :number,
            alignmentHorz :number,
            alignmentVert :number,
            onPointerDown :() => void
        )
        : bjsg.TextBlock
        {
            const textBlock:bjsg.TextBlock = new bjsg.TextBlock(  GUIFactory.createNextGuiId()  );

            textBlock.text     = text;
            textBlock.left     = x;
            textBlock.top      = y;
            textBlock.width    = String( width    ) + 'px';
            textBlock.height   = String( height   ) + 'px';
            textBlock.fontSize = String( fontSize ) + 'px';
            textBlock.color    = color;

            if ( shadowColor !== null )
            {
                textBlock.shadowColor   = shadowColor;
                textBlock.shadowBlur    = 0.0;
                textBlock.shadowOffsetX = 1.0;
                textBlock.shadowOffsetY = 1.0;
            }

            textBlock.horizontalAlignment     = alignmentHorz;
            textBlock.verticalAlignment       = alignmentVert;
            textBlock.textHorizontalAlignment = alignmentHorz;
            textBlock.textVerticalAlignment   = alignmentVert;

            if ( onPointerDown )
            {
                textBlock.onPointerDownObservable.add
                (
                    () : void => {
                        onPointerDown();
                    }
                );
            }

            return textBlock;
        }

        /** ************************************************************************************************************
        *   Creates an input field for the GUI.
        *
        *   @param text    The text to set as default text.
        *   @param colorFg A css value for the text color.
        *   @param colorBg A css value for the background color.
        *   @param x       Position of the left edge.
        *   @param y       Position of the top edge.
        *   @param width   The horizontal dimension.
        *   @param height  The vertical dimension.
        *
        *   @return The specified input field.
        ***************************************************************************************************************/
        public static createInputField
        (
            text    :string,
            colorFg :string,
            colorBg :string,
            x       :number,
            y       :number,
            width   :number,
            height  :number
        )
        : bjsg.InputText
        {
            const inputField:bjsg.InputText = new bjsg.InputText( GUIFactory.createNextGuiId() );

            inputField.text       = text;
            inputField.color      = colorFg;
            inputField.background = colorBg;
            inputField.left       = x;
            inputField.top        = y;
            inputField.width      = String( width ) + 'px';
            inputField.height     = String(height ) + 'px';

            inputField.horizontalAlignment = bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT;
            inputField.verticalAlignment   = bjsg.Control.VERTICAL_ALIGNMENT_TOP;

            return inputField;
        }

        /** ************************************************************************************************************
        *   Creates a button for the GUI.
        *
        *   @param text    The text to set into the block.
        *   @param colorFg A css value for the text color.
        *   @param colorBg A css value for the background color.
        *   @param x       Position of the left edge.
        *   @param y       Position of the top edge.
        *   @param width   The horizontal dimension.
        *   @param height  The vertical dimension.
        *   @param onClick The callback to invoke when the button is clicked.
        *
        *   @return The specified button.
        ***************************************************************************************************************/
        public static createButton
        (
            text    :string,
            colorFg :string,
            colorBg :string,
            x       :number,
            y       :number,
            width   :number,
            height  :number,
            onClick :() => void
        )
        : bjsg.Button
        {
            const button:bjsg.Button = bjsg.Button.CreateSimpleButton
            (
                GUIFactory.createNextGuiId(),
                text
            );

            button.color      = colorFg;
            button.background = colorBg;
            button.left       = x;
            button.top        = y;
            button.width      = String( width  ) + 'px';
            button.height     = String( height ) + 'px';

            button.horizontalAlignment = bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT;
            button.verticalAlignment   = bjsg.Control.VERTICAL_ALIGNMENT_TOP;

            button.onPointerClickObservable.add
            (
                () :void => {
                    onClick();
                }
            );

            return button;
        }

        /** ************************************************************************************************************
        *   Creates a checkbox for the GUI.
        *
        *   @param isChecked Specifies if the checkbox is initially checked.
        *   @param colorFg   A css value for the foreground color.
        *   @param colorBg   A css value for the background color.
        *   @param x         Position of the left edge.
        *   @param y         Position of the top edge.
        *   @param width     The horizontal dimension.
        *   @param height    The vertical dimension.
        *   @param onToggle  The callback to invoke when the checkbox is toggled.
        *
        *   @return The specified checkbox.
        ***************************************************************************************************************/
        public static createCheckbox
        (
            isChecked :boolean,
            colorFg   :string,
            colorBg   :string,
            x         :number,
            y         :number,
            width     :number,
            height    :number,
            onToggle  :() => void
        )
        : bjsg.Checkbox
        {
            const checkbox:bjsg.Checkbox = new bjsg.Checkbox
            (
                GUIFactory.createNextGuiId()
            );

            checkbox.isChecked  = isChecked;
            checkbox.color      = colorFg;
            checkbox.background = colorBg;
            checkbox.left       = x;
            checkbox.top        = y;
            checkbox.width      = String( width  ) + 'px';
            checkbox.height     = String( height ) + 'px';

            checkbox.horizontalAlignment = bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT;
            checkbox.verticalAlignment   = bjsg.Control.VERTICAL_ALIGNMENT_TOP;

            checkbox.onPointerClickObservable.add
            (
                () :void => {
                    onToggle();
                }
            );

            return checkbox;
        }

        /** ************************************************************************************************************
        *   Creates a radiobutton for the GUI that is assigned to a selection group.
        *
        *   @param group     The name of the group this radio button belongs to.
        *   @param colorFg   A css value for the foreground color.
        *   @param colorBg   A css value for the background color.
        *   @param x         Position of the left edge.
        *   @param y         Position of the top edge.
        *   @param width     The horizontal dimension.
        *   @param height    The vertical dimension.
        *   @param onCheck  The callback to invoke when this radiobutton is checked.
        *
        *   @return The specified radiobutton.
        ***************************************************************************************************************/
        public static createRadioButton
        (
            group     :string,
            colorFg   :string,
            colorBg   :string,
            x         :number,
            y         :number,
            width     :number,
            height    :number,
            onCheck   :( checked:boolean ) => void
        )
        : bjsg.RadioButton
        {
            const radioButton:bjsg.RadioButton = new bjsg.RadioButton
            (
                GUIFactory.createNextGuiId()
            );

            radioButton.group      = group;
            radioButton.color      = colorFg;
            radioButton.background = colorBg;
            radioButton.left       = x;
            radioButton.top        = y;
            radioButton.width      = String( width  ) + 'px';
            radioButton.height     = String( height ) + 'px';

            radioButton.horizontalAlignment = bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT;
            radioButton.verticalAlignment   = bjsg.Control.VERTICAL_ALIGNMENT_TOP;

            radioButton.onIsCheckedChangedObservable.add
            (
                ( checked:boolean ) :void => {
                    onCheck( checked );
                }
            );

            return radioButton;
        }

        /** ************************************************************************************************************
        *   Creates a slider for the GUI.
        *
        *   @param value       The initial value of this slider.
        *   @param minimum     The minimum value of this slider.
        *   @param maximum     The maximum value of this slider.
        *   @param colorFg     A css value for the fg color.
        *   @param colorBg     A css value for the bg color.
        *   @param colorBorder A css value for the border color.
        *   @param x           Position of the left edge.
        *   @param y           Position of the top edge.
        *   @param width       The horizontal dimension.
        *   @param height      The vertical dimension.
        *   @param onChange    The callback to invoke when the slider value has changed.
        *
        *   @return The specified slider.
        ***************************************************************************************************************/
        public static createSlider
        (
            value       :number,
            minimum     :number,
            maximum     :number,
            colorFg     :string,
            colorBg     :string,
            colorBorder :string,
            x           :number,
            y           :number,
            width       :number,
            height      :number,
            onChange    :( value:number ) => void
        )
        : bjsg.Slider
        {
            const slider:bjsg.Slider = new bjsg.Slider
            (
                GUIFactory.createNextGuiId()
            );

            slider.value       = value;
            slider.minimum     =  minimum;
            slider.maximum     =  maximum;

            slider.color       = colorFg;
            slider.background  = colorBg;
            slider.borderColor = colorBorder;

            slider.left        = x;
            slider.top         = y;
            slider.width       = String( width  ) + 'px';
            slider.height      = String( height ) + 'px';

            slider.horizontalAlignment = bjsg.Control.HORIZONTAL_ALIGNMENT_LEFT;
            slider.verticalAlignment   = bjsg.Control.VERTICAL_ALIGNMENT_TOP;

            slider.onValueChangedObservable.add( onChange );

            return slider;
        }

        /** ************************************************************************************************************
        *   Creates a line for the GUI.
        *   The line looks blurry and shabby - Consider using createRect with a height of one instead.
        *
        *   @param x1          Start position X.
        *   @param y1          Start position Y.
        *   @param x2          End position X.
        *   @param y2          End position Y.
        *   @param width       The line width in pixels.
        *   @param color       The color of the line.
        *   @param shadowColor The color of the shadow or <code>null</code> for no shadow.
        *
        *   @return The specified line.
        ***************************************************************************************************************/
        public static createLine
        (
            x1          :number,
            y1          :number,
            x2          :number,
            y2          :number,
            width       :number,
            color       :string,
            shadowColor :string
        )
        : bjsg.Line
        {
            const line:bjsg.Line = new bjsg.Line
            (
                GUIFactory.createNextGuiId()
            );

            line.x1 = x1;
            line.y1 = y1;
            line.x2 = x2;
            line.y2 = y2;

            line.color     = color;
            line.lineWidth = width;

            if ( shadowColor !== null )
            {
                line.shadowColor   = shadowColor;
                line.shadowBlur    = 0.0;
                line.shadowOffsetX = 1.0;
                line.shadowOffsetY = 1.5;
            }

            return line;
        }

        /** ************************************************************************************************************
        *   Creates an image for the GUI.
        *
        *   @param filename    The name of the image file to display.
        *   @param x           Left edge of the image.
        *   @param y           Top edge of the image.
        *   @param alignHorz   Horizontal alignment.
        *   @param alignVert   Vertical alignment.
        *   @param shadowColor The color of the shadow or <code>null</code> for no shadow.
        *
        *   @return The specified image.
        ***************************************************************************************************************/
        public static createImage
        (
            filename    :string,
            x           :number,
            y           :number,
            alignHorz   :number,
            alignVert   :number,
            shadowColor :string
        )
        : bjsg.Image
        {
            const image:bjsg.Image = new bjsg.Image
            (
                GUIFactory.createNextGuiId(),
                bz.SettingResource.PATH_IMAGE_GUI + filename
            );

            image.horizontalAlignment = alignHorz;
            image.verticalAlignment   = alignVert;
            image.autoScale           = true;
            image.stretch             = bjsg.Image.STRETCH_NONE;

            image.left = x;
            image.top  = y;

            if ( shadowColor !== null )
            {
                image.shadowColor   = shadowColor;
                image.shadowBlur    = 0.0;
                image.shadowOffsetX = 1.0;
                image.shadowOffsetY = 1.0;
            }

            return image;
        }

        /** ************************************************************************************************************
        *   This is a workaround because babylon.JS allows unselection of the selected radio button in a group.
        *
        *   @param radioButtons All radio buttons of the radio button group.
        *   @param index        The index of the radio button in the group to check if all buttons are unchecked.
        ***************************************************************************************************************/
        public static checkRadioButtonIfAllAreUnchecked( radioButtons:bjsg.RadioButton[], index:number ) : void
        {
            let allRadioButtonsUnchecked:boolean = true;
            for ( const radioButton of radioButtons )
            {
                if ( radioButton.isChecked )
                {
                    allRadioButtonsUnchecked = false;
                }
            }

            // check if all buttons are unchecked
            if ( allRadioButtonsUnchecked )
            {
                // check the specified button again
                radioButtons[ index ].isChecked = true;
            }
        }

        /** ************************************************************************************************************
        *   Sets a new caption for the specified button.
        *
        *   @param button  The button to set a new text for.
        *   @param newText The text to set as the button's caption.
        ***************************************************************************************************************/
        public static setVisorToggleButtonText( button:bjsg.Button, newText:string ) : void
        {
            const textName  :string         = button.name + '_button';
            const textBlock :bjsg.TextBlock = button.getChildByType
            (
                textName,
                'TextBlock'
            ) as bjsg.TextBlock;

            textBlock.text = newText;
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new gui component to create.
        *
        *   @return The next free unique id for a new gui component to create.
        ***************************************************************************************************************/
        private static createNextGuiId() : string
        {
            return 'gui' + String( GUIFactory.nextGuiId++ );
        }
    }

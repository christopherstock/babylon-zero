
    import * as bz          from '../../index';
    import * as BABYLON     from 'babylonjs';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   Creates all types of GUI components.
    *******************************************************************************************************************/
    export abstract class GuiFactory
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
        : BABYLON_GUI.AdvancedDynamicTexture
        {
            const gui:BABYLON_GUI.AdvancedDynamicTexture = BABYLON_GUI.AdvancedDynamicTexture.CreateFullscreenUI
            (
                GuiFactory.createNextGuiId(),
                foreground,
                scene,
                BABYLON.Texture.NEAREST_SAMPLINGMODE
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
            x           :number,
            y           :number,
            width       :number,
            height      :number,
            colorBorder :string,
            colorFill   :string
        )
        : BABYLON_GUI.Rectangle
        {
            const rectangle:BABYLON_GUI.Rectangle = new BABYLON_GUI.Rectangle( GuiFactory.createNextGuiId() );

            rectangle.left       = x;
            rectangle.top        = y;
            rectangle.width      = width  + 'px';
            rectangle.height     = height + 'px';
            rectangle.color      = colorBorder;
            rectangle.background = colorFill;

            rectangle.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            rectangle.verticalAlignment   = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP;

            return rectangle;
        }

        /** ************************************************************************************************************
        *   Creates a text block for the GUI.
        *
        *   @param text        The text to set into the block.
        *   @param color       A css value for the text color.
        *   @param shadowColor A css value for the text's shadow color.
        *   @param x           Position of the left edge.
        *   @param y           Position of the top edge.
        *   @param width       The horizontal dimension.
        *   @param height      The vertical dimension.
        *
        *   @return The specified text block.
        ***************************************************************************************************************/
        public static createTextBlock
        (
            text        :string,
            color       :string,
            shadowColor :string,
            x           :number,
            y           :number,
            width       :number,
            height      :number
        )
        : BABYLON_GUI.TextBlock
        {
            const textBlock:BABYLON_GUI.TextBlock = new BABYLON_GUI.TextBlock(  GuiFactory.createNextGuiId()  );

            textBlock.text   = text;
            textBlock.left   = x;
            textBlock.top    = y;
            textBlock.width  = width  + 'px';
            textBlock.height = height + 'px';
            textBlock.color  = color;

            if ( shadowColor != null )
            {
                textBlock.shadowColor   = shadowColor;
                textBlock.shadowBlur    = 0.0;
                textBlock.shadowOffsetX = 1.0;
                textBlock.shadowOffsetY = 1.0;
            }

            textBlock.horizontalAlignment     = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            textBlock.verticalAlignment       = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP;
            textBlock.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            textBlock.textVerticalAlignment   = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_CENTER;

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
        : BABYLON_GUI.InputText
        {
            const inputField:BABYLON_GUI.InputText = new BABYLON_GUI.InputText( GuiFactory.createNextGuiId() );

            inputField.text       = text;
            inputField.color      = colorFg;
            inputField.background = colorBg;
            inputField.left       = x;
            inputField.top        = y;
            inputField.width      = width  + 'px';
            inputField.height     = height + 'px';

            inputField.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            inputField.verticalAlignment   = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP;

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
        : BABYLON_GUI.Button
        {
            const button:BABYLON_GUI.Button = BABYLON_GUI.Button.CreateSimpleButton
            (
                GuiFactory.createNextGuiId(),
                text
            );

            button.color      = colorFg;
            button.background = colorBg;
            button.left       = x;
            button.top        = y;
            button.width      = width  + 'px';
            button.height     = height + 'px';

            button.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            button.verticalAlignment   = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP;

            button.onPointerClickObservable.add
            (
                () => {
                    onClick();
                }
            );

            return button;
        }

        /** ************************************************************************************************************
        *   Creates a checkbox for the GUI.
        *
        *   @param isChecked Specifies if the checkbox is initially checked.
        *   @param color     A css value for the color.
        *   @param x         Position of the left edge.
        *   @param y         Position of the top edge.
        *   @param width     The horizontal dimension.
        *   @param height    The vertical dimension.
        *   @param onToggle  The callback to invoke when the checknox is toggled.
        *
        *   @return The specified checkbox.
        ***************************************************************************************************************/
        public static createCheckbox
        (
            isChecked :boolean,
            color     :string,
            x         :number,
            y         :number,
            width     :number,
            height    :number,
            onToggle  :() => void
        )
        : BABYLON_GUI.Checkbox
        {
            const checkbox:BABYLON_GUI.Checkbox = new BABYLON_GUI.Checkbox
            (
                GuiFactory.createNextGuiId()
            );

            checkbox.isChecked  = isChecked;
            checkbox.color      = color;
            checkbox.left       = x;
            checkbox.top        = y;
            checkbox.width      = width  + 'px';
            checkbox.height     = height + 'px';

            checkbox.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            checkbox.verticalAlignment   = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP;

            checkbox.onPointerClickObservable.add
            (
                () => {
                    onToggle();
                }
            );

            return checkbox;
        }

        /** ************************************************************************************************************
        *   Creates a slider for the GUI.
        *
        *   @param value     The initial value of this slider.
        *   @param minimum   The minimum value of this slider.
        *   @param maximum   The maximum value of this slider.
        *   @param colorFg   A css value for the fg color.
        *   @param colorBg   A css value for the bg color.
        *   @param x         Position of the left edge.
        *   @param y         Position of the top edge.
        *   @param width     The horizontal dimension.
        *   @param height    The vertical dimension.
        *   @param onChange  The callback to invoke when the slider value has changed.
        *
        *   @return The specified slider.
        ***************************************************************************************************************/
        public static createSlider
        (
            value    :number,
            minimum  :number,
            maximum  :number,
            colorFg  :string,
            colorBg  :string,
            x        :number,
            y        :number,
            width    :number,
            height   :number,
            onChange :( value:number ) => void
        )
        : BABYLON_GUI.Slider
        {
            const slider:BABYLON_GUI.Slider = new BABYLON_GUI.Slider
            (
                GuiFactory.createNextGuiId()
            );

            slider.value       = value;
            slider.minimum    =  minimum;
            slider.maximum    =  maximum;

            slider.color      = colorFg;
            slider.background = colorBg;
            slider.left       = x;
            slider.top        = y;
            slider.width      = width  + 'px';
            slider.height     = height + 'px';

            slider.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            slider.verticalAlignment   = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP;

            slider.onValueChangedObservable.add( onChange );

            return slider;
        }

        /** ************************************************************************************************************
        *   Creates a line for the GUI.
        *
        *   @param x1    Start position X.
        *   @param y1    Start position Y.
        *   @param x2    End position X.
        *   @param y2    End position Y.
        *   @param width The line width in pixels.
        *   @param color The color of the line.
        *
        *   @return The specified line.
        ***************************************************************************************************************/
        public static createLine
        (
            x1    :number,
            y1    :number,
            x2    :number,
            y2    :number,
            width :number,
            color :string,
        )
        : BABYLON_GUI.Line
        {
            const line:BABYLON_GUI.Line = new BABYLON_GUI.Line
            (
                GuiFactory.createNextGuiId()
            );

            line.x1 = x1;
            line.y1 = y1;
            line.x2 = x2;
            line.y2 = y2;

            line.color     = color;
            line.lineWidth = width;

            return line;
        }

        /** ************************************************************************************************************
        *   Creates an image for the GUI.
        *
        *   @param filename The name of the image file to display.
        *   @param x        Left edge of the image.
        *   @param y        Top edge of the image.
        *
        *   @return The specified image.
        ***************************************************************************************************************/
        public static createImage
        (
            filename :string,
            x        :number,
            y        :number,
        )
        : BABYLON_GUI.Image
        {
            const image:BABYLON_GUI.Image = new BABYLON_GUI.Image
            (
                GuiFactory.createNextGuiId(),
                bz.SettingEngine.PATH_IMAGE_GUI + filename
            );

            image.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            image.verticalAlignment   = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP;
            image.autoScale           = true;
            image.stretch             = BABYLON_GUI.Image.STRETCH_NONE;

            image.left = x;
            image.top  = y;

            return image;
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new gui component to create.
        *
        *   @return The next free unique id for a new gui component to create.
        ***************************************************************************************************************/
        private static createNextGuiId() : string
        {
            return 'gui' + GuiFactory.nextGuiId++;
        }
    }

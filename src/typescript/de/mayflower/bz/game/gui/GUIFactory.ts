import * as bz          from '../..';
import * as BABYLON_GUI from 'babylonjs-gui';

/** ********************************************************************************************************************
*   Creates all types of GUI components.
***********************************************************************************************************************/
export abstract class GUIFactory
{
    /** Next ID to assign for GUI component creation. */
    private static nextGuiId :number = 0;

    /** ****************************************************************************************************************
    *   Creates a fullscreen GUI in bg or fg.
    *
    *   @param scene      The scene that contains this light.
    *   @param foreground Specifies if this GUI shall be set in foreground of this scene.
    *                     <code>false</code> will put this GUI into the background.
    *
    *   @return The fullscreen GUI.
    *******************************************************************************************************************/
    public static createGUI
    (
        scene      :BABYLON.Scene,
        foreground :boolean
    )
    : BABYLON_GUI.AdvancedDynamicTexture
    {
        const gui:BABYLON_GUI.AdvancedDynamicTexture = BABYLON_GUI.AdvancedDynamicTexture.CreateFullscreenUI
        (
            GUIFactory.createNextGuiId(),
            foreground
        );

        gui.renderAtIdealSize = true;
        gui.useSmallestIdeal  = false;
        gui.renderScale       = 1.0;

        return gui;
    }

    /** ****************************************************************************************************************
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
    *******************************************************************************************************************/
    public static createRectangle
    (
        x             :number,
        y             :number,
        width         :number,
        height        :number,
        colorBorder   :string,
        colorFill     :string
    )
    : BABYLON_GUI.Rectangle
    {
        const rectangle:BABYLON_GUI.Rectangle = new BABYLON_GUI.Rectangle( GUIFactory.createNextGuiId() );

        rectangle.left       = x;
        rectangle.top        = y;
        rectangle.width      = String( width  ) + 'px';
        rectangle.height     = String( height ) + 'px';
        rectangle.color      = colorBorder;
        rectangle.background = colorFill;

        rectangle.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        rectangle.verticalAlignment   = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP;

        return rectangle;
    }

    /** ****************************************************************************************************************
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
    *******************************************************************************************************************/
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
        alignmentHorz :number = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
        alignmentVert :number = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
        onPointerDown :() => void = ():void => { /* empty */ }
    )
    : BABYLON_GUI.TextBlock
    {
        const textBlock:BABYLON_GUI.TextBlock = new BABYLON_GUI.TextBlock(  GUIFactory.createNextGuiId()  );

        textBlock.text     = text;
        textBlock.left     = x;
        textBlock.top      = y;
        textBlock.width    = String( width    ) + 'px';
        textBlock.height   = String( height   ) + 'px';
        textBlock.fontSize = String( fontSize ) + 'px';
        textBlock.color    = color;

        textBlock.lineSpacing = String( 2 ) + 'px';

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

    /** ****************************************************************************************************************
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
    *******************************************************************************************************************/
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
    : BABYLON_GUI.Line
    {
        const line:BABYLON_GUI.Line = new BABYLON_GUI.Line
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

    /** ****************************************************************************************************************
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
    *******************************************************************************************************************/
    public static createImage
    (
        filename    :string,
        x           :number,
        y           :number,
        alignHorz   :number,
        alignVert   :number,
        shadowColor :string
    )
    : BABYLON_GUI.Image
    {
        const image:BABYLON_GUI.Image = new BABYLON_GUI.Image
        (
            GUIFactory.createNextGuiId(),
            bz.SettingResource.PATH_IMAGE_GUI + filename
        );

        image.horizontalAlignment = alignHorz;
        image.verticalAlignment   = alignVert;
        image.autoScale           = true;
        image.stretch             = BABYLON_GUI.Image.STRETCH_NONE;

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

    /** ****************************************************************************************************************
    *   Returns the next id for a new gui component to create.
    *
    *   @return The next free unique id for a new gui component to create.
    *******************************************************************************************************************/
    private static createNextGuiId() : string
    {
        return 'gui' + String( GUIFactory.nextGuiId++ );
    }
}

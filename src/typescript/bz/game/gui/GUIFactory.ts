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
    *   @param textWrapping  If the text should be wrapped according to the width of this text block.
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
        alignmentHorz :number     = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
        alignmentVert :number     = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
        onPointerDown :() => void = ():void => { /* empty */ },
        textWrapping  :boolean    = false
    )
    : BABYLON_GUI.TextBlock
    {
        const textBlock:BABYLON_GUI.TextBlock = new BABYLON_GUI.TextBlock(  GUIFactory.createNextGuiId()  );

        textBlock.text     = text;
        textBlock.left     = x;
        textBlock.top      = y;
        textBlock.width    = String( width    ) + 'px';
        textBlock.height   = String( height   ) + 'px';
        textBlock.color    = color;

        textBlock.fontSize    = String( fontSize ) + 'px';
        textBlock.fontWeight  = bz.SettingGUI.FONT_WEIGHT;
        textBlock.fontFamily  = bz.SettingGUI.FONT_FAMILY;
        textBlock.lineSpacing = String( bz.SettingGUI.FONT_LINESPACING ) + 'px';
        // textBlock.fontOffset = { ascent: 0, height: 0, descent: 0 }; // no effect

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

        textBlock.textWrapping            = textWrapping;

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
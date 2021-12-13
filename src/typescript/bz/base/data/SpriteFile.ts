/** ********************************************************************************************************************
*   Specifies all sprite files to load with their according frame size information.
***********************************************************************************************************************/
export class SpriteFile
{
    public static readonly EXPLOSION        :SpriteFile   = new SpriteFile( 'explosion.png', 14,  256, 248 );
    public static readonly FIRE             :SpriteFile   = new SpriteFile( 'fire.png',      100, 128  );
    public static readonly PALM             :SpriteFile   = new SpriteFile( 'palm.png',      0,   1024 );
    public static readonly TREE             :SpriteFile   = new SpriteFile( 'tree.png',      0,   357  );

    /** Lists all sprite files in an array. */
    public static readonly ALL_SPRITE_FILES :SpriteFile[] =
    [
        SpriteFile.EXPLOSION,
        SpriteFile.FIRE,
        SpriteFile.PALM,
        SpriteFile.TREE,
    ];

    /** The filename of this texture's image. */
    public readonly fileName       :string = null;
    public readonly animationDelay :number = 0;
    /** Specifies the width and height of one square frame inside this sprite. */
    public readonly frameWidth     :number = 0;
    public readonly frameHeight    :number = 0;

    /** ****************************************************************************************************************
    *   Creates a sprite configuration.
    *
    *   @param fileName    The filename of the image to load for this material.
    *   @param frameWidth  The width  of a (square) frame in pixels.
    *   @param frameHeight The height of the frame. Only to be specified if one frame is not square.
    *******************************************************************************************************************/
    private constructor( fileName:string, animationDelay:number = 0, frameWidth:number, frameHeight:number = frameWidth )
    {
        this.fileName       = fileName;
        this.animationDelay = animationDelay;
        this.frameWidth     = frameWidth;
        this.frameHeight    = frameHeight;
    }
}

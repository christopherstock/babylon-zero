/** ********************************************************************************************************************
*   Specifies all sprite files to load with their according frame size information.
***********************************************************************************************************************/
export class SpriteFile
{
    public static readonly EXPLOSION        :SpriteFile   = new SpriteFile( 'fx/explosion.png',  14,  256, 248, 0, 47 );
    public static readonly FIRE             :SpriteFile   = new SpriteFile( 'fx/fire.png',       100, 128, 128, 0, 24 );
    public static readonly MUZZLE_FLASH_1   :SpriteFile   = new SpriteFile( 'muzzleFlash/1.png', 100, 512, 512, 0, 0  );
    public static readonly PALM             :SpriteFile   = new SpriteFile( 'stage/palm.png',    0,   1024 );
    public static readonly TREE             :SpriteFile   = new SpriteFile( 'stage/tree.png',    0,   357  );

    /** Lists all sprite files in an array. */
    public static readonly ALL_SPRITE_FILES :SpriteFile[] =
    [
        SpriteFile.EXPLOSION,
        SpriteFile.FIRE,
        SpriteFile.MUZZLE_FLASH_1,
        SpriteFile.PALM,
        SpriteFile.TREE,
    ];

    /** The filename of this texture's image. */
    public readonly fileName       :string = null;
    public readonly animationDelay :number = 0;
    /** Specifies the width and height of one square frame inside this sprite. */
    public readonly frameWidth     :number = 0;
    public readonly frameHeight    :number = 0;
    public readonly animFrameFirst :number = 0;
    public readonly animFrameLast  :number = 0;

    // noinspection JSSuspiciousNameCombination

    /** ****************************************************************************************************************
    *   Creates a sprite configuration.
    *
    *   @param fileName       The filename of the image to load for this material.
    *   @param animationDelay Frame delay between two animation ticks.
    *   @param frameWidth     The width  of a (square) frame in pixels.
    *   @param frameHeight    The height of the frame. Only to be specified if one frame is not square.
    *   @param animFrameFirst Fist animation frame index.
    *   @param animFrameLast  Last animation frame index.
    *******************************************************************************************************************/
    private constructor(
        fileName       :string,
        animationDelay :number,
        frameWidth     :number,
        frameHeight    :number = frameWidth,
        animFrameFirst :number = 0,
        animFrameLast  :number = 0
    )
    {
        this.fileName       = fileName;
        this.animationDelay = animationDelay;
        this.frameWidth     = frameWidth;
        this.frameHeight    = frameHeight;
        this.animFrameFirst = animFrameFirst;
        this.animFrameLast  = animFrameLast;
    }
}

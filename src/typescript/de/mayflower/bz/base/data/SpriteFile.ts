/* eslint-disable max-len */

/** ********************************************************************************************************************
*   Specifies all sprite files to load with their according frame size information.
***********************************************************************************************************************/
export class SpriteFile
{
    /** The sprite 'tree'. */
    public      static  readonly    TREE                    :SpriteFile             = new SpriteFile( 'tree.png',       357 );
    /** The sprite 'tree white'. */
    public      static  readonly    TREE_WHITE              :SpriteFile             = new SpriteFile( 'palm.png',  357 );
    /** The sprite 'palm'. */
    public      static  readonly    PALM                    :SpriteFile             = new SpriteFile( 'palm.png',       1024 );
    /** The sprite 'test'. */
    public      static  readonly    TEST                    :SpriteFile             = new SpriteFile( 'test.png',       64  );

    /** Lists all sprite files in an array. */
    public      static  readonly    ALL_SPRITE_FILES        :SpriteFile[]           =
    [
        SpriteFile.TREE,
        SpriteFile.TREE_WHITE,
        SpriteFile.PALM,
        SpriteFile.TEST,
    ];

    /** The filename of this texture's image. */
    public              readonly    fileName                :string             = null;
    /** Specifies the width and height of one square frame inside this sprite. */
    public              readonly    frameSize               :number             = 0;

    /** ****************************************************************************************************************
    *   Creates a sprite configuration.
    *
    *   @param fileName  The filename of the image to load for this material.
    *   @param frameSize The size of a square frame in pixels.
    *******************************************************************************************************************/
    public constructor( fileName:string, frameSize:number )
    {
        this.fileName  = fileName;
        this.frameSize = frameSize;
    }
}


    /** ****************************************************************************************************************
    *   Specifies all sprite files to load.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SpriteFile
    {
        /** The sprite 'tree'. */
        public      static      TREE                :SpriteFile             = new SpriteFile( 'tree.png',      357 );
        /** The sprite 'tree white'. */
        public      static      TREE_WHITE          :SpriteFile             = new SpriteFile( 'treeWhite.png', 357 );

        /** Lists all sprite files in an array. */
        public      static      ALL_FILES           :SpriteFile[]           =
        [
            SpriteFile.TREE,
            SpriteFile.TREE_WHITE,
        ];

        /** The filename of this texture's image. */
        public                  fileName            :string                 = null;
        /** Specifies the size of a square frame in pixels in this sprite. */
        public                  frameSize           :number                 = 0;

        /** ************************************************************************************************************
        *   Creates a sprite configuration.
        *
        *   @param fileName  The filename of the image to load for this material.
        *   @param frameSize The size of a square frame in pixels.
        ***************************************************************************************************************/
        public constructor( fileName:string, frameSize:number )
        {
            this.fileName  = fileName;
            this.frameSize = frameSize;
        }
    }

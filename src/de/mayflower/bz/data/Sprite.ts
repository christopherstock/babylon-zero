
    /** ****************************************************************************************************************
    *   Specifies all sprite files to load.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class Sprite
    {
        /** The sprite 'tree'. */
        public      static      TREE                :Sprite             = new Sprite( 'tree.png',       357 );
        /** The sprite 'tree white'. */
        public      static      TREE_WHITE          :Sprite             = new Sprite( 'treeWhite.png',  357 );
        /** The sprite 'test'. */
        public      static      TEST                :Sprite             = new Sprite( 'test.png',       64  );

        /** Lists all sprite files in an array. */
        public      static      ALL_FILES           :Sprite[]           =
        [
            Sprite.TREE,
            Sprite.TREE_WHITE,
            Sprite.TEST,
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

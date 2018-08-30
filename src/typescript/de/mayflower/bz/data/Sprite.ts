
    /** ****************************************************************************************************************
    *   Specifies all sprite files to load.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class Sprite
    {
        /** The sprite 'tree'. */
        public      static  readonly    TREE                    :Sprite             = new Sprite( 'tree.png',       357 );
        /** The sprite 'tree white'. */
        public      static  readonly    TREE_WHITE              :Sprite             = new Sprite( 'treeWhite.png',  357 );
        /** The sprite 'test'. */
        public      static  readonly    TEST                    :Sprite             = new Sprite( 'test.png',       64  );

        /** Lists all sprite files in an array. */
        public      static  readonly    ALL_SPRITE_FILES        :Sprite[]           =
        [
            Sprite.TREE,
            Sprite.TREE_WHITE,
            Sprite.TEST,
        ];

        /** The filename of this texture's image. */
        public              readonly    fileName                :string             = null;
        /** Specifies the width and height of one square frame inside this sprite. */
        public              readonly    frameSize               :number             = 0;

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

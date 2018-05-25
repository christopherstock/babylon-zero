
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Specifies all textures to load.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class Texture
    {
        /** The texture 'test'. */
        public      static      TEST                :Texture                = new Texture( 'test.jpg',   bz.TextureHasAlpha.NO, bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'mayflower logo'. */
        public      static      MAYFLOWER_LOGO      :Texture                = new Texture( 'mfLogo.jpg', bz.TextureHasAlpha.NO, bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'amiga'. */
        public      static      AMIGA               :Texture                = new Texture( 'amiga.jpg',  bz.TextureHasAlpha.NO, bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'wood'. */
        public      static      WOOD                :Texture                = new Texture( 'wood.jpg',   bz.TextureHasAlpha.NO, bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'grass'. */
        public      static      GRASS               :Texture                = new Texture( 'grass.jpg',  bz.TextureHasAlpha.NO, bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'glas'. */
        public      static      GLASS               :Texture                = new Texture( 'glass.jpg',  bz.TextureHasAlpha.NO, bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'tree'. */
        public      static      TREE                :Texture                = new Texture( 'tree.png',   bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE );

        /** The filename of this texture's image. */
        public                  fileName            :string                 = null;
        /** Specifies if this texture has an alpha channel. */
        public                  textureHasAlpha     :bz.TextureHasAlpha     = null;
        /** The UV tiling strategy to apply for this texture. */
        public                  textureUV           :bz.TextureUV           = null;

        /** ************************************************************************************************************
        *   Creates a texture configuration.
        *
        *   @param fileName        The filename of the image to load for this material.
        *   @param textureHasAlpha Specifies alpha occurance in texture image.
        *   @param textureUV       The UV tiling strategy for this texture.
        ***************************************************************************************************************/
        public constructor( fileName:string, textureHasAlpha:bz.TextureHasAlpha, textureUV:bz.TextureUV )
        {
            this.fileName        = fileName;
            this.textureHasAlpha = textureHasAlpha;
            this.textureUV       = textureUV;
        }
    }

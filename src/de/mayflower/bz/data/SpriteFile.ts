
    import * as bz from '..';

    /** ****************************************************************************************************************
    *   Specifies all sprites to load.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SpriteFile
    {
        /** The texture 'test'. */
        public      static      TREE                :SpriteFile             = new SpriteFile( 'tree.png' );

        /** The filename of this texture's image. */
        public                  fileName            :string                 = null;

        /** Specifies if this texture has an alpha channel. */
        // public                  textureHasAlpha     :bz.TextureHasAlpha     = null;
        /** The UV tiling strategy to apply for this texture. */
        // public                  textureUV           :bz.TextureUV           = null;

        /** ************************************************************************************************************
        *   Creates a sprite configuration.
        *
        *   @param fileName        The filename of the image to load for this material.
        *   @param textureHasAlpha Specifies alpha occurance in texture image.
        *   @param textureUV       The UV tiling strategy for this texture.
        ***************************************************************************************************************/
        public constructor( fileName:string /* , textureHasAlpha:bz.TextureHasAlpha, textureUV:bz.TextureUV */ )
        {
            this.fileName        = fileName;
/*
            this.textureHasAlpha = textureHasAlpha;
            this.textureUV       = textureUV;
*/
        }
    }

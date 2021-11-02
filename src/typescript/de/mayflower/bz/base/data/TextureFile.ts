/* eslint-disable max-len */

import * as bz from '../..';

/** ****************************************************************************************************************
*   Specifies all texture files to load with their according texture information.
*******************************************************************************************************************/
export class TextureFile
{
    /** The texture file 'test'. */
    public      static  readonly    TEST                        :TextureFile                = new TextureFile( 'wall/test.jpg',     bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );

    /** The filename of this texture's image. */
    public              readonly    fileName                :string             = null;
    /** Specifies if this texture contains alpha information. */
    public              readonly    textureHasAlpha         :bz.TextureHasAlpha = null;
    /** The UV tiling strategy to apply for this texture. */
    public              readonly    strategyUV              :bz.TextureUV       = null;

    /** ************************************************************************************************************
    *   Creates a sprite configuration.
    *
    *   @param fileName        The filename of the image to load for this material.
    *   @param textureHasAlpha The size of a square frame in pixels.
    ***************************************************************************************************************/
    public constructor( fileName:string, textureHasAlpha:bz.TextureHasAlpha, strategyUV:bz.TextureUV )
    {
        this.fileName        = fileName;
        this.textureHasAlpha = textureHasAlpha;
        this.strategyUV      = strategyUV;
    }
}

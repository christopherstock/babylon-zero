/* eslint-disable max-len */

import * as bz from '../..';

/** ****************************************************************************************************************
*   Specifies all texture files to load with their according texture information.
*******************************************************************************************************************/
export class TextureFile
{
    /** The texture file 'test'. */
    public      static  readonly    BULLET_HOLE_CONCRETE                :TextureFile                = new TextureFile( 'bulletHole/concrete.png',   bz.TextureHasAlpha.YES,  bz.TextureUV.ALL_TO_ONE );
    /** The texture file 'test'. */
    public      static  readonly    BULLET_HOLE_WOOD                    :TextureFile                = new TextureFile( 'bulletHole/wood.png',       bz.TextureHasAlpha.YES,  bz.TextureUV.ALL_TO_ONE );
    /** The texture file 'test'. */
    public      static  readonly    BULLET_HOLE_GLASS                   :TextureFile                = new TextureFile( 'bulletHole/glass.png',      bz.TextureHasAlpha.YES,  bz.TextureUV.ALL_TO_ONE );
    /** The texture file 'test'. */
    public      static  readonly    WALL_TEST                           :TextureFile                = new TextureFile( 'wall/test.jpg',             bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
    /** The texture file 'test'. */
    public      static  readonly    WALL_MAYFLOWER_LOGO                 :TextureFile                = new TextureFile( 'wall/mfLogo.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
    /** The texture file 'test'. */
    public      static  readonly    WALL_AMIGA                          :TextureFile                = new TextureFile( 'wall/amiga.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
    /** The texture file 'test'. */
    public      static  readonly    WALL_WOOD                           :TextureFile                = new TextureFile( 'wall/wood.jpg',             bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
    /** The texture file 'test'. */
    public      static  readonly    WALL_GRASS                          :TextureFile                = new TextureFile( 'wall/grass.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
    /** The texture file 'test'. */
    public      static  readonly    WALL_GLASS                          :TextureFile                = new TextureFile( 'wall/glass.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
    /** The texture file 'test'. */
    public      static  readonly    WALL_SKIN_ROSE                      :TextureFile                = new TextureFile( 'wall/skinRose.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );

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
    *   @param strategyUV      Mapping strategy to use for this texture.
    ***************************************************************************************************************/
    public constructor( fileName:string, textureHasAlpha:bz.TextureHasAlpha, strategyUV:bz.TextureUV )
    {
        this.fileName        = fileName;
        this.textureHasAlpha = textureHasAlpha;
        this.strategyUV      = strategyUV;
    }
}

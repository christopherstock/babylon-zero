/* eslint-disable max-len */

import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies all texture files to load with their according texture information.
***********************************************************************************************************************/
export class TextureFile
{
    /** The texture file 'bullet hole concrete'. */
    public static readonly BULLET_HOLE_CONCRETE         :TextureFile            = new TextureFile( 'bulletHole/concrete.png',   bz.TextureHasAlpha.YES,  bz.TextureUV.ALL_TO_ONE, null, bz.TextureType.WALL );
    /** The texture file 'bullet hole wood'. */
    public static readonly BULLET_HOLE_WOOD             :TextureFile            = new TextureFile( 'bulletHole/wood.png',       bz.TextureHasAlpha.YES,  bz.TextureUV.ALL_TO_ONE, null, bz.TextureType.WALL );
    /** The texture file 'bullet hole glass'. */
    public static readonly BULLET_HOLE_GLASS            :TextureFile            = new TextureFile( 'bulletHole/glass.png',      bz.TextureHasAlpha.YES,  bz.TextureUV.ALL_TO_ONE, null, bz.TextureType.WALL );
    /** The texture file 'bullet hole glass'. */
    public static readonly BULLET_HOLE_METAL            :TextureFile            = new TextureFile( 'bulletHole/metal.png',      bz.TextureHasAlpha.YES,  bz.TextureUV.ALL_TO_ONE, null, bz.TextureType.WALL );

    /** The texture file 'wall test'. */
    public static readonly WALL_TEST                    :TextureFile            = new TextureFile( 'wall/test.jpg',             bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_CONCRETE, bz.TextureType.WALL );
    /** The texture file 'wall mayflower logo'. */
    public static readonly WALL_MAYFLOWER_LOGO          :TextureFile            = new TextureFile( 'wall/mfLogo.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_WOOD, bz.TextureType.WALL );
    /** The texture file 'wall amiga'. */
    public static readonly WALL_AMIGA                   :TextureFile            = new TextureFile( 'wall/amiga.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_WOOD, bz.TextureType.WALL );
    /** The texture file 'wall wood'. */
    public static readonly WALL_WOOD                    :TextureFile            = new TextureFile( 'wall/wood.jpg',             bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_WOOD, bz.TextureType.WALL );
    /** The texture file 'wall grass'. */
    public static readonly WALL_GRASS                   :TextureFile            = new TextureFile( 'wall/grass.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_CONCRETE, bz.TextureType.WALL );
    /** The texture file 'wall glass'. */
    public static readonly WALL_GLASS                   :TextureFile            = new TextureFile( 'wall/glass.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_GLASS, bz.TextureType.WALL );
    /** The texture file 'wall skin rose'. */
    public static readonly WALL_SKIN_ROSE               :TextureFile            = new TextureFile( 'wall/skinRose.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_WOOD, bz.TextureType.WALL );
    /** The texture file 'wall metal'. */
    public static readonly WALL_METAL                   :TextureFile            = new TextureFile( 'wall/metal.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_METAL, bz.TextureType.WALL );

    /** The texture file 'heightmap valley'. */
    public static readonly HEIGHTMAP_VALLEY             :TextureFile            = new TextureFile( 'heightMap/valley.png',      bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE, null, bz.TextureType.WALL );

    /** The texture file 'test video'. */
    public static readonly VIDEO_TEST                   :TextureFile            = new TextureFile( 'video/news.mp4',            bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE, TextureFile.BULLET_HOLE_GLASS, bz.TextureType.VIDEO );

    /** The filename of this texture's image. */
    public        readonly fileName                     :string                 = null;
    /** Specifies if this texture contains alpha information. */
    public        readonly textureHasAlpha              :bz.TextureHasAlpha     = null;
    /** The UV tiling strategy to apply for this texture. */
    public        readonly strategyUV                   :bz.TextureUV           = null;
    /** The according bullet hole texture for this texture. */
    public        readonly bulletHoleTexture            :bz.TextureFile         = null;
    /** Specifies the type of texture. */
    public        readonly textureType                  :bz.TextureType         = null;

    /** ****************************************************************************************************************
    *   Creates a sprite configuration.
    *
    *   @param fileName          The filename of the image to load for this material.
    *   @param textureHasAlpha   The size of a square frame in pixels.
    *   @param strategyUV        Mapping strategy to use for this texture.
    *   @param bulletHoleTexture The texture for bullet holes that occur onto this texture.
    *   @param textureType       The type of this texture.
    *******************************************************************************************************************/
    public constructor(
        fileName          :string,
        textureHasAlpha   :bz.TextureHasAlpha,
        strategyUV        :bz.TextureUV,
        bulletHoleTexture :bz.TextureFile,
        textureType       :bz.TextureType
    )
    {
        this.fileName          = ( bz.SettingResource.PATH_IMAGE_TEXTURE + fileName );
        this.textureHasAlpha   = textureHasAlpha;
        this.strategyUV        = strategyUV;
        this.bulletHoleTexture = bulletHoleTexture;
        this.textureType       = textureType;
    }
}

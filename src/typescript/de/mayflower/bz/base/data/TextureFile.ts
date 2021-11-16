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
    /** The texture file 'wall stones 3'. */
    public static readonly WALL_STONES_3                :TextureFile            = new TextureFile( 'wall/stones3.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_METAL, bz.TextureType.WALL );
    /** The texture file 'wall mayflower logo'. */
    public static readonly WALL_MAYFLOWER_LOGO          :TextureFile            = new TextureFile( 'wall/mfLogo.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_WOOD, bz.TextureType.WALL );
    /** The texture file 'wall amiga'. */
    public static readonly WALL_AMIGA                   :TextureFile            = new TextureFile( 'wall/amiga.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_WOOD, bz.TextureType.WALL );
    /** The texture file 'wall wood horizontal'. */
    public static readonly WALL_WOOD_HORZ               :TextureFile            = new TextureFile( 'wall/woodHorz.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_WOOD, bz.TextureType.WALL );
    /** The texture file 'wall wood vertical'. */
    public static readonly WALL_WOOD_VERT               :TextureFile            = new TextureFile( 'wall/woodVert.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_WOOD, bz.TextureType.WALL );
    /** The texture file 'wall grass'. */
    public static readonly WALL_GRASS                   :TextureFile            = new TextureFile( 'wall/grass.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_CONCRETE, bz.TextureType.WALL );
    /** The texture file 'wall glass'. */
    public static readonly WALL_GLASS                   :TextureFile            = new TextureFile( 'wall/glass.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_GLASS, bz.TextureType.WALL );
    /** The texture file 'wall skin rose'. */
    public static readonly WALL_SKIN_ROSE               :TextureFile            = new TextureFile( 'wall/skinRose.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_WOOD, bz.TextureType.WALL );
    /** The texture file 'wall metal'. */
    public static readonly WALL_METAL                   :TextureFile            = new TextureFile( 'wall/metal.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_METAL, bz.TextureType.WALL );
    /** The texture file 'bricks 1'. */
    public static readonly WALL_BRICKS_1                :TextureFile            = new TextureFile( 'wall/bricks1.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_CONCRETE, bz.TextureType.WALL );
    /** The texture file 'bricks 2'. */
    public static readonly WALL_BRICKS_2                :TextureFile            = new TextureFile( 'wall/bricks2.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_CONCRETE, bz.TextureType.WALL );
    /** The texture file 'carpet 1'. */
    public static readonly WALL_CARPET_1                :TextureFile            = new TextureFile( 'wall/carpet1.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_METAL,  bz.TextureType.WALL );
    /** The texture file 'carpet 2'. */
    public static readonly WALL_CARPET_2                :TextureFile            = new TextureFile( 'wall/carpet2.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_METAL,  bz.TextureType.WALL );
    /** The texture file 'ceiling'. */
    public static readonly WALL_CEILING                 :TextureFile            = new TextureFile( 'wall/ceiling.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_METAL,  bz.TextureType.WALL );
    /** The texture file 'concrete'. */
    public static readonly WALL_CONCRETE                :TextureFile            = new TextureFile( 'wall/concrete.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_METAL,  bz.TextureType.WALL );
    /** The texture file 'leather'. */
    public static readonly WALL_LEATHER                 :TextureFile            = new TextureFile( 'wall/leather.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_METAL,  bz.TextureType.WALL );
    /** The texture file 'marble'. */
    public static readonly WALL_MARBLE                  :TextureFile            = new TextureFile( 'wall/marble.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, TextureFile.BULLET_HOLE_METAL,  bz.TextureType.WALL );
    /** The texture file 'door 1'. */
    public static readonly WALL_DOOR_1                  :TextureFile            = new TextureFile( 'wall/door1.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE, TextureFile.BULLET_HOLE_METAL,  bz.TextureType.WALL );

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

    /** ****************************************************************************************************************
    *   Checks if this texture is a video texture.
    *
    *   @return <code>true</code> if this texture is a video texture.
    *******************************************************************************************************************/
    public getIsVideoTexture() : boolean
    {
        return this.textureType === bz.TextureType.VIDEO;
    }

    /** ****************************************************************************************************************
    *   Determines if this texture uses an alpha channel.
    *
    *   @return <code>true</code> if this texture makes use of an alpha channel.
    *******************************************************************************************************************/
    public hasAlpha() : boolean
    {
        return ( this.textureHasAlpha === bz.TextureHasAlpha.YES );
    }

    /** ****************************************************************************************************************
    *   Determines this texture's UV strategy.
    *
    *   @return The UV strategy of this texture.
    *******************************************************************************************************************/
    public getStrategyUV() : bz.TextureUV
    {
        return this.strategyUV;
    }
}

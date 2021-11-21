/* eslint-disable max-len */

import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies all texture files to load with their according texture information.
***********************************************************************************************************************/
export class TextureFile
{
    public static readonly BULLET_HOLE_CONCRETE         :TextureFile            = new TextureFile( 'bulletHole/concrete.png',   bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,         null,                              bz.TextureType.WALL );
    public static readonly BULLET_HOLE_GLASS            :TextureFile            = new TextureFile( 'bulletHole/glass.png',      bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,         null,                              bz.TextureType.WALL );
    public static readonly BULLET_HOLE_IRON             :TextureFile            = new TextureFile( 'bulletHole/iron.png',       bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,         null,                              bz.TextureType.WALL );
    public static readonly BULLET_HOLE_METAL            :TextureFile            = new TextureFile( 'bulletHole/metal.png',      bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,         null,                              bz.TextureType.WALL );
    public static readonly BULLET_HOLE_PLASTIC          :TextureFile            = new TextureFile( 'bulletHole/plastic.png',    bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,         null,                              bz.TextureType.WALL );
    public static readonly BULLET_HOLE_WOOD             :TextureFile            = new TextureFile( 'bulletHole/wood.png',       bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,         null,                              bz.TextureType.WALL );

    public static readonly WALL_ASPHALT_1               :TextureFile            = new TextureFile( 'wall/asphalt1.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_CONCRETE,  bz.TextureType.WALL );
    public static readonly WALL_BRICKS_1                :TextureFile            = new TextureFile( 'wall/bricks1.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_CONCRETE,  bz.TextureType.WALL );
    public static readonly WALL_BRICKS_2                :TextureFile            = new TextureFile( 'wall/bricks2.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_CONCRETE,  bz.TextureType.WALL );
    public static readonly WALL_BRICKS_3                :TextureFile            = new TextureFile( 'wall/bricks3.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.Y_ONE_XZ_TILED,     TextureFile.BULLET_HOLE_CONCRETE,  bz.TextureType.WALL );
    public static readonly WALL_CARPET_1                :TextureFile            = new TextureFile( 'wall/carpet1.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,     bz.TextureType.WALL );
    public static readonly WALL_CARPET_2                :TextureFile            = new TextureFile( 'wall/carpet2.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_CARPET_3                :TextureFile            = new TextureFile( 'wall/carpet3.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_CEILING_1               :TextureFile            = new TextureFile( 'wall/ceiling1.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_CHECKERS_1              :TextureFile            = new TextureFile( 'wall/checkers1.jpg',        bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_CHECKERS_2              :TextureFile            = new TextureFile( 'wall/checkers2.jpg',        bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_COBBLES_1               :TextureFile            = new TextureFile( 'wall/cobbles1.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_COBBLES_2               :TextureFile            = new TextureFile( 'wall/cobbles2.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_COBBLES_3               :TextureFile            = new TextureFile( 'wall/cobbles3.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_COBBLES_4               :TextureFile            = new TextureFile( 'wall/cobbles4.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_COBBLES_5               :TextureFile            = new TextureFile( 'wall/cobbles5.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_CONCRETE_2              :TextureFile            = new TextureFile( 'wall/concrete2.jpg',        bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_CONCRETE_3              :TextureFile            = new TextureFile( 'wall/concrete3.jpg',        bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_DIAMOND_PLATE_1         :TextureFile            = new TextureFile( 'wall/diamondPlate1.jpg',    bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_DIAMOND_PLATE_2         :TextureFile            = new TextureFile( 'wall/diamondPlate2.jpg',    bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_DOOR_1                  :TextureFile            = new TextureFile( 'wall/door1.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE,         TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_GLASS_1                 :TextureFile            = new TextureFile( 'wall/glass1.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_GLASS,    bz.TextureType.WALL );
    public static readonly WALL_GRASS_1                 :TextureFile            = new TextureFile( 'wall/grass1.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_CONCRETE, bz.TextureType.WALL );
    public static readonly WALL_GRASS_2                 :TextureFile            = new TextureFile( 'wall/grass2.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_CONCRETE, bz.TextureType.WALL );
    public static readonly WALL_GRASS_3                 :TextureFile            = new TextureFile( 'wall/grass3.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_CONCRETE, bz.TextureType.WALL );
    public static readonly WALL_LEATHER_1               :TextureFile            = new TextureFile( 'wall/leather1.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_LEATHER_2               :TextureFile            = new TextureFile( 'wall/leather2.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_MARBLE_1                :TextureFile            = new TextureFile( 'wall/marble1.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_MARBLE_TILES            :TextureFile            = new TextureFile( 'wall/marbleTiles.jpg',      bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_MAYFLOWER_CALENDAR      :TextureFile            = new TextureFile( 'wall/mfCalendar.jpg',       bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE,         TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL );
    public static readonly WALL_MAYFLOWER_LOGO          :TextureFile            = new TextureFile( 'wall/mfLogo.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE,         TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL );
    public static readonly WALL_PAVEMENT_MILANO         :TextureFile            = new TextureFile( 'wall/pavementMilano.jpg',   bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_SHINGLES_1              :TextureFile            = new TextureFile( 'wall/shingles1.jpg',        bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL );
    public static readonly WALL_SKIN_1                  :TextureFile            = new TextureFile( 'wall/skin1.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL );
    // TODO improve names ! 1 2 3 4 > YELLOW etc
    public static readonly WALL_STONES_1                :TextureFile            = new TextureFile( 'wall/stones1.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_STONES_2                :TextureFile            = new TextureFile( 'wall/stones2.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_STONES_3                :TextureFile            = new TextureFile( 'wall/stones3.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_STONES_4                :TextureFile            = new TextureFile( 'wall/stones4.jpg',          bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE_HALF, TextureFile.BULLET_HOLE_METAL,    bz.TextureType.WALL );
    public static readonly WALL_TEST                    :TextureFile            = new TextureFile( 'wall/test.jpg',             bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_CONCRETE, bz.TextureType.WALL );
    public static readonly WALL_TILES_1                 :TextureFile            = new TextureFile( 'wall/tiles1.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_CONCRETE, bz.TextureType.WALL );
    public static readonly WALL_WOOD_OLIVE              :TextureFile            = new TextureFile( 'wall/woodOlive.jpg',        bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL );
    public static readonly WALL_WOOD_PLANKS             :TextureFile            = new TextureFile( 'wall/woodPlanks.jpg',       bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL );
    public static readonly WALL_WOOD_STRUCTURE          :TextureFile            = new TextureFile( 'wall/woodStructure.jpg',    bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL );
    public static readonly WALL_WOOD_VERT_1             :TextureFile            = new TextureFile( 'wall/woodVert1.jpg',        bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL );
    public static readonly WALL_WOOD_VERT_2             :TextureFile            = new TextureFile( 'wall/woodVert2.jpg',        bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL );

    public static readonly MODEL_WOOD_HORZ              :TextureFile            = new TextureFile( 'furniture/woodHorz.jpg',    bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL_AND_MODEL );
    public static readonly MODEL_WOOD_LIGHT             :TextureFile            = new TextureFile( 'furniture/woodLight.jpg',   bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL_AND_MODEL );
    public static readonly MODEL_CHROME                 :TextureFile            = new TextureFile( 'furniture/chrome.jpg',      bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL_AND_MODEL );
    public static readonly MODEL_CONCRETE               :TextureFile            = new TextureFile( 'furniture/concrete.jpg',    bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_CONCRETE, bz.TextureType.WALL_AND_MODEL );
    public static readonly MODEL_CRATE_1                :TextureFile            = new TextureFile( 'furniture/crate1.jpg',      bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL_AND_MODEL );
    public static readonly MODEL_LEATHER_RED            :TextureFile            = new TextureFile( 'furniture/leatherRed.jpg',  bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL_AND_MODEL );
    public static readonly MODEL_PLASTIC_1              :TextureFile            = new TextureFile( 'furniture/plastic1.jpg',    bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE,      TextureFile.BULLET_HOLE_WOOD,     bz.TextureType.WALL_AND_MODEL );

    public static readonly VIDEO_TEST                   :TextureFile            = new TextureFile( 'tv/news1.mp4',              bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE,         TextureFile.BULLET_HOLE_GLASS,    bz.TextureType.VIDEO );

    // The heightmap texture files are just filenames - The textures will not be preloaded!

    public static readonly HEIGHTMAP_VALLEY             :TextureFile            = new TextureFile( 'heightMap/valley.png',      bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE,         null,                             bz.TextureType.WALL );
    public static readonly HEIGHTMAP_DAM                :TextureFile            = new TextureFile( 'heightMap/dam.png',         bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE,         null,                             bz.TextureType.WALL );
    public static readonly HEIGHTMAP_HILLS              :TextureFile            = new TextureFile( 'heightMap/hills.png',       bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE,         null,                             bz.TextureType.WALL );

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
        bulletHoleTexture :TextureFile,
        textureType       :bz.TextureType
    )
    {
        this.fileName          = TextureFile.createFullFileName( textureType, fileName );
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
        return ( this.textureType === bz.TextureType.VIDEO );
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

    /** ****************************************************************************************************************
    *   Creates a new Babylon.js texture from this TextureFile.
    *
    *   @param repeatU The amount for U repeating this texture.
    *   @param repeatV The amount for V repeating this texture.
    *******************************************************************************************************************/
    public createNewTextureInstance( repeatU:number, repeatV:number ) : BABYLON.Texture
    {
        // do not clone native video textures! ( babylon.JS will hang otherwise! )
        const newTexture:BABYLON.Texture =
        (
            this.getIsVideoTexture()
                ? bz.Texture.getNativeTexture( this )
                // is seems that cloning is not required and getNativeTexture is also working here
                : bz.Texture.cloneNativeTexture( this )
        );

        if ( this.getIsVideoTexture() )
        {
            newTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
            newTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
        }
        else
        {
            newTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
            newTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;

            // working around poor typings for scaling ..
            if ( repeatU !== -1 )
            {
                ( newTexture as any ).uScale = repeatU;
            }
            if ( repeatV !== -1 )
            {
                ( newTexture as any ).vScale = repeatV;
            }
        }

        newTexture.hasAlpha = this.hasAlpha();

        return newTexture;
    }

    /** ****************************************************************************************************************
    *   Determines the full qualified path and fileName for the specified texture type.
    *
    *   @param textureType The type of texture.
    *   @param fileName    The path to the file, without the resources root path.
    *
    *   @return The complete resources path to the texture file.
    *******************************************************************************************************************/
    private static createFullFileName( textureType:bz.TextureType, fileName:string ) : string
    {
        switch ( textureType )
        {
            case bz.TextureType.WALL:
            {
                return ( bz.SettingResource.PATH_IMAGE_TEXTURE + fileName );
            }
            case bz.TextureType.WALL_AND_MODEL:
            {
                return ( bz.SettingResource.PATH_MODEL + fileName );
            }
            case bz.TextureType.VIDEO:
            {
                return ( bz.SettingResource.PATH_VIDEO + fileName );
            }
        }
    }
}

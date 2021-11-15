/* eslint-disable max-len */

import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies all textures to load.
***********************************************************************************************************************/
export class Texture
{
    // TODO remove constants and use TextureFile.ID as ID ?

    /** The texture 'bullet hole concreate'. */
    public static readonly BULLET_HOLE_CONCRETE         :Texture                = new Texture( bz.TextureFile.BULLET_HOLE_CONCRETE );
    /** The texture 'bullet hole wood'. */
    public static readonly BULLET_HOLE_WOOD             :Texture                = new Texture( bz.TextureFile.BULLET_HOLE_WOOD );
    /** The texture 'bullet hole glass'. */
    public static readonly BULLET_HOLE_GLASS            :Texture                = new Texture( bz.TextureFile.BULLET_HOLE_GLASS );
    /** The texture 'bullet hole metal'. */
    public static readonly BULLET_HOLE_METAL            :Texture                = new Texture( bz.TextureFile.BULLET_HOLE_METAL );

    /** The texture 'wall test'. */
    public static readonly WALL_TEST                    :Texture                = new Texture( bz.TextureFile.WALL_TEST );
    /** The texture 'wall stones 3'. */
    public static readonly WALL_STONES_3                :Texture                = new Texture( bz.TextureFile.WALL_STONES_3 );
    /** The texture 'wall mayflower logo'. */
    public static readonly WALL_MAYFLOWER_LOGO          :Texture                = new Texture( bz.TextureFile.WALL_MAYFLOWER_LOGO );
    /** The texture 'wall amiga'. */
    public static readonly WALL_AMIGA                   :Texture                = new Texture( bz.TextureFile.WALL_AMIGA );
    /** The texture 'wall wood horizontal'. */
    public static readonly WALL_WOOD_HORZ               :Texture                = new Texture( bz.TextureFile.WALL_WOOD_HORZ );
    /** The texture 'wall wood vertical'. */
    public static readonly WALL_WOOD_VERT               :Texture                = new Texture( bz.TextureFile.WALL_WOOD_VERT );
    /** The texture 'wall grass'. */
    public static readonly WALL_GRASS                   :Texture                = new Texture( bz.TextureFile.WALL_GRASS );
    /** The texture 'wall glas'. */
    public static readonly WALL_GLASS                   :Texture                = new Texture( bz.TextureFile.WALL_GLASS );
    /** The texture 'wall skin rosé'. */
    public static readonly WALL_SKIN_ROSE               :Texture                = new Texture( bz.TextureFile.WALL_SKIN_ROSE );
    /** The texture 'wall metal'. */
    public static readonly WALL_METAL                   :Texture                = new Texture( bz.TextureFile.WALL_METAL );

    /** The texture 'bricks 1'. */
    public static readonly WALL_BRICKS_1                :Texture                = new Texture( bz.TextureFile.WALL_BRICKS_1 );
    /** The texture 'bricks 2'. */
    public static readonly WALL_BRICKS_2                :Texture                = new Texture( bz.TextureFile.WALL_BRICKS_2 );
    /** The texture 'wall carpet 1'. */
    public static readonly WALL_CARPET_1                :Texture                = new Texture( bz.TextureFile.WALL_CARPET_1 );
    /** The texture 'wall carpet 2'. */
    public static readonly WALL_CARPET_2                :Texture                = new Texture( bz.TextureFile.WALL_CARPET_2 );
    /** The texture 'wall metal'. */
    public static readonly WALL_CEILING                 :Texture                = new Texture( bz.TextureFile.WALL_CEILING );
    /** The texture 'wall metal'. */
    public static readonly WALL_CONCRETE                :Texture                = new Texture( bz.TextureFile.WALL_CONCRETE );
    /** The texture 'wall metal'. */
    public static readonly WALL_LEATHER                 :Texture                = new Texture( bz.TextureFile.WALL_LEATHER );
    /** The texture 'wall metal'. */
    public static readonly WALL_MARBLE                  :Texture                = new Texture( bz.TextureFile.WALL_MARBLE );
    /** The texture 'wall door 1'. */
    public static readonly WALL_DOOR_1                  :Texture                = new Texture( bz.TextureFile.WALL_DOOR_1 );

    /** The video texture 'wall test'. */
    public static readonly VIDEO_TEST                   :Texture                = new Texture( bz.TextureFile.VIDEO_TEST );

    /** Contains all texture data objects. */
    public static readonly ALL_TEXTURES                 :Texture[]              =
    [
        Texture.BULLET_HOLE_CONCRETE,
        Texture.BULLET_HOLE_WOOD,
        Texture.BULLET_HOLE_GLASS,
        Texture.BULLET_HOLE_METAL,

        Texture.WALL_TEST,
        Texture.WALL_STONES_3,
        Texture.WALL_MAYFLOWER_LOGO,
        Texture.WALL_AMIGA,
        Texture.WALL_WOOD_HORZ,
        Texture.WALL_WOOD_VERT,
        Texture.WALL_GRASS,
        Texture.WALL_GLASS,
        Texture.WALL_SKIN_ROSE,
        Texture.WALL_METAL,

        Texture.WALL_BRICKS_1,
        Texture.WALL_BRICKS_2,
        Texture.WALL_CARPET_1,
        Texture.WALL_CARPET_2,
        Texture.WALL_CEILING,
        Texture.WALL_CONCRETE,
        Texture.WALL_LEATHER,
        Texture.WALL_MARBLE,
        Texture.WALL_DOOR_1,

        Texture.VIDEO_TEST,
    ];

    /** The according texture file. */
    private readonly file           :bz.TextureFile         = null;
    /** The babylon.JS texture data. */
    private          nativeTexture  :BABYLON.Texture        = null;

    /** ****************************************************************************************************************
    *   Creates a texture configuration.
    *
    *   @param file The texture file to create this Texture from.
    *******************************************************************************************************************/
    public constructor( file :bz.TextureFile )
    {
        this.file = file;
    }

    /** ****************************************************************************************************************
    *   Loads the texture image.
    *
    *   @param scene The babylon.JS scene to append all textures to.
    *******************************************************************************************************************/
    public loadTexture( scene:BABYLON.Scene ) : void
    {
        switch ( this.file.textureType )
        {
            case bz.TextureType.WALL:
            {
                // create default texture
                this.nativeTexture = new BABYLON.Texture(
                    this.file.fileName,
                    scene
                );
                break;
            }

            case bz.TextureType.VIDEO:
            {
                // create video texture and mute audio
                const videoTexture:BABYLON.VideoTexture = new BABYLON.VideoTexture(
                    this.file.fileName,
                    this.file.fileName,
                    scene,
                    true
                );
                videoTexture.video.muted    = true;
                videoTexture.video.autoplay = true;
                videoTexture.video.play().then(
                    () :void => {
                        // handle promise fullfillment
                    }
                ).catch(
                    () :void => {
                        // catch promise error
                    }
                );

                this.nativeTexture = videoTexture;
                break;
            }
        }
    }

    /** ****************************************************************************************************************
    *   Returns a clone of this texture's babylon.JS data.
    *
    *   @return A clone of this texture's native texture data.
    *******************************************************************************************************************/
    public cloneNativeTexture() : BABYLON.Texture
    {
        return this.nativeTexture.clone();
    }

    /** ****************************************************************************************************************
    *   Returns the texture's babylon.JS data.
    *
    *   @return The texture's native texture data.
    *******************************************************************************************************************/
    public getNativeTexture() : BABYLON.Texture
    {
        return this.nativeTexture;
    }

    /** ****************************************************************************************************************
    *   Checks if this texture is a video texture.
    *
    *   @return <code>true</code> if this texture is a video texture.
    *******************************************************************************************************************/
    public getIsVideoTexture() : boolean
    {
        return this.file.textureType === bz.TextureType.VIDEO;
    }

    /** ****************************************************************************************************************
    *   Determines if this texture uses an alpha channel.
    *
    *   @return <code>true</code> if this texture makes use of an alpha channel.
    *******************************************************************************************************************/
    public hasAlpha() : boolean
    {
        return ( this.file.textureHasAlpha === bz.TextureHasAlpha.YES );
    }

    /** ****************************************************************************************************************
    *   Determines this texture's UV strategy.
    *
    *   @return The UV strategy of this texture.
    *******************************************************************************************************************/
    public getStrategyUV() : bz.TextureUV
    {
        return this.file.strategyUV;
    }

    /** ****************************************************************************************************************
    *   Delivers the according bullet hole for the given native mesh.
    *
    *   @param mesh The mesh to determine the Bullet Hole Texture for.
    *
    *   @return The according bullet hole texture.
    *******************************************************************************************************************/
    public static getAccordingBulletHoleTextureForMesh( mesh:BABYLON.AbstractMesh ) : bz.Texture
    {
        const DEFAULT_BULLET_HOLE_TEXTURE:Texture = Texture.BULLET_HOLE_CONCRETE;

        // try to pick the texture filename
        if
        (
            mesh !== null
            && mesh.material !== null
            && mesh.material.getActiveTextures() !== null
            && mesh.material.getActiveTextures().length > 0
        )
        {
            // pick texture filename
            const meshTextureFileName:string = mesh.material.getActiveTextures()[ 0 ].name;

            const bulletHoleTexture :Texture = Texture.getBulletHoleTextureForModelTexture( meshTextureFileName );
            if ( bulletHoleTexture !== null )
            {
                return bulletHoleTexture;
            }

            // compare with all existent textures
            for ( const texture of Texture.ALL_TEXTURES )
            {
                if ( texture.file.fileName === meshTextureFileName )
                {
                    if ( texture.file.bulletHoleTexture !== null )
                    {
                        for ( const tex of Texture.ALL_TEXTURES )
                        {
                            if ( tex.file.fileName === texture.file.bulletHoleTexture.fileName )
                            {
                                return tex;
                            }
                        }
                    }
                }
            }
        }

        return DEFAULT_BULLET_HOLE_TEXTURE;
    }

    /** ****************************************************************************************************************
    *   Delivers the BulletHole Texture for a 3ds max model's texture file specification.
    *
    *   @param meshTextureFileName The filename of the 3ds max model's used texture -- without any directory component.
    *******************************************************************************************************************/
    private static getBulletHoleTextureForModelTexture( meshTextureFileName:string ) :bz.Texture
    {
        switch ( meshTextureFileName )
        {
            case 'crate1.jpg':
            {
                return Texture.BULLET_HOLE_WOOD;
            }
        }

        return null;
    }
}

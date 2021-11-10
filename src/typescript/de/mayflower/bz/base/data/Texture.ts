/* eslint-disable max-len */

import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies all textures to load.
***********************************************************************************************************************/
export class Texture
{
    /** The texture 'bullet hole concreate'. */
    public      static  readonly    BULLET_HOLE_CONCRETE        :Texture                = new Texture( bz.TextureFile.BULLET_HOLE_CONCRETE );
    /** The texture 'bullet hole wood'. */
    public      static  readonly    BULLET_HOLE_WOOD            :Texture                = new Texture( bz.TextureFile.BULLET_HOLE_WOOD );
    /** The texture 'bullet hole glass'. */
    public      static  readonly    BULLET_HOLE_GLASS           :Texture                = new Texture( bz.TextureFile.BULLET_HOLE_GLASS );
    /** The texture 'bullet hole metal'. */
    public      static  readonly    BULLET_HOLE_METAL           :Texture                = new Texture( bz.TextureFile.BULLET_HOLE_METAL );

    /** The texture 'wall test'. */
    public      static  readonly    WALL_TEST                   :Texture                = new Texture( bz.TextureFile.WALL_TEST );
    /** The texture 'wall mayflower logo'. */
    public      static  readonly    WALL_MAYFLOWER_LOGO         :Texture                = new Texture( bz.TextureFile.WALL_MAYFLOWER_LOGO );
    /** The texture 'wall amiga'. */
    public      static  readonly    WALL_AMIGA                  :Texture                = new Texture( bz.TextureFile.WALL_AMIGA );
    /** The texture 'wall wood'. */
    public      static  readonly    WALL_WOOD                   :Texture                = new Texture( bz.TextureFile.WALL_WOOD );
    /** The texture 'wall grass'. */
    public      static  readonly    WALL_GRASS                  :Texture                = new Texture( bz.TextureFile.WALL_GRASS );
    /** The texture 'wall glas'. */
    public      static  readonly    WALL_GLASS                  :Texture                = new Texture( bz.TextureFile.WALL_GLASS );
    /** The texture 'wall skin rosé'. */
    public      static  readonly    WALL_SKIN_ROSE              :Texture                = new Texture( bz.TextureFile.WALL_SKIN_ROSE );
    /** The texture 'wall metal'. */
    public      static  readonly    WALL_METAL                  :Texture                = new Texture( bz.TextureFile.WALL_METAL );

    /** The video texture 'wall test'. */
    public      static  readonly    VIDEO_TEST                  :Texture                = new Texture( bz.TextureFile.VIDEO_TEST );

    /** Contains all texture data objects. */
    public      static  readonly    ALL_TEXTURES                :Texture[]              =
    [
        Texture.BULLET_HOLE_CONCRETE,
        Texture.BULLET_HOLE_WOOD,
        Texture.BULLET_HOLE_GLASS,
        Texture.BULLET_HOLE_METAL,

        Texture.WALL_TEST,
        Texture.WALL_MAYFLOWER_LOGO,
        Texture.WALL_AMIGA,
        Texture.WALL_WOOD,
        Texture.WALL_GRASS,
        Texture.WALL_GLASS,
        Texture.WALL_SKIN_ROSE,
        Texture.WALL_METAL,

        Texture.VIDEO_TEST,
    ];

    /** The according texture file. */
    private             readonly    file                        :bz.TextureFile         = null;

    /** The babylon.JS texture data. */
    private                         nativeTexture               :BABYLON.Texture        = null;

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

            // TODO outsource hardcoded model texture mapping
            switch ( meshTextureFileName )
            {
                case 'crate1.jpg':
                {
                    return Texture.BULLET_HOLE_WOOD;
                }
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
}

import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies all textures to load.
***********************************************************************************************************************/
export class Texture
{
    /** Contains all textures that contain the preloaded texture data. */
    public static readonly ALL_TEXTURES :Texture[] =
    [
        new Texture( bz.TextureFile.BULLET_HOLE_CONCRETE ),
        new Texture( bz.TextureFile.BULLET_HOLE_WOOD ),
        new Texture( bz.TextureFile.BULLET_HOLE_GLASS ),
        new Texture( bz.TextureFile.BULLET_HOLE_METAL ),

        new Texture( bz.TextureFile.WALL_TEST ),
        new Texture( bz.TextureFile.WALL_STONES_3 ),
        new Texture( bz.TextureFile.WALL_MAYFLOWER_LOGO ),
        new Texture( bz.TextureFile.WALL_AMIGA ),
        new Texture( bz.TextureFile.WALL_WOOD_HORZ ),
        new Texture( bz.TextureFile.WALL_WOOD_VERT ),
        new Texture( bz.TextureFile.WALL_GRASS ),
        new Texture( bz.TextureFile.WALL_GLASS ),
        new Texture( bz.TextureFile.WALL_SKIN_ROSE ),
        new Texture( bz.TextureFile.WALL_METAL ),

        new Texture( bz.TextureFile.WALL_BRICKS_1 ),
        new Texture( bz.TextureFile.WALL_BRICKS_2 ),
        new Texture( bz.TextureFile.WALL_CARPET_1 ),
        new Texture( bz.TextureFile.WALL_CARPET_2 ),
        new Texture( bz.TextureFile.WALL_CEILING ),
        new Texture( bz.TextureFile.WALL_CONCRETE ),
        new Texture( bz.TextureFile.WALL_LEATHER ),
        new Texture( bz.TextureFile.WALL_MARBLE ),
        new Texture( bz.TextureFile.WALL_DOOR_1 ),

        new Texture( bz.TextureFile.VIDEO_TEST ),
    ];

    /** The according texture file. */
    private readonly file          :bz.TextureFile  = null;
    /** The babylon.JS texture data. */
    private          nativeTexture :BABYLON.Texture = null;

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
    *   Returns the texture's babylon.JS data.
    *
    *   @return The texture's native texture data.
    *******************************************************************************************************************/
    public static getNativeTexture( textureFile:bz.TextureFile ) : BABYLON.Texture
    {
        return Texture.getTextureFromFileName( textureFile ).nativeTexture;
    }

    /** ****************************************************************************************************************
    *   Returns a clone of this texture's babylon.JS data.
    *
    *   @return A clone of this texture's native texture data.
    *******************************************************************************************************************/
    public static cloneNativeTexture( textureFile:bz.TextureFile ) : BABYLON.Texture
    {
        return Texture.getTextureFromFileName( textureFile ).nativeTexture.clone();
    }

    /** ****************************************************************************************************************
    *   Delivers the according bullet hole for the given native mesh.
    *
    *   @param mesh The mesh to determine the Bullet Hole Texture for.
    *
    *   @return The according bullet hole texture.
    *******************************************************************************************************************/
    public static getBulletHoleTextureForMesh(mesh:BABYLON.AbstractMesh ) : bz.TextureFile
    {
        const DEFAULT_BULLET_HOLE_TEXTURE:bz.TextureFile = bz.TextureFile.BULLET_HOLE_CONCRETE;

        // try to pick the texture filename
        if
        (
            mesh !== null
            && mesh.material !== null
            && mesh.material.getActiveTextures() !== null
            && mesh.material.getActiveTextures().length > 0
        )
        {
            // pick texture filename from Texture field 'url'
            let meshTextureFullFileName:string = ( mesh.material.getActiveTextures()[ 0 ] as BABYLON.Texture ).url;
            if ( meshTextureFullFileName === null )
            {
                // video textures have their file path in field 'name'
                meshTextureFullFileName = ( mesh.material.getActiveTextures()[ 0 ] as BABYLON.Texture ).name;
            }

            // TODO Add model texture files back to TEXTURES.ALL_FILES ???
            // TODO could be replaced by removing redundant model/wall textures??
            const bulletHoleTexture :bz.TextureFile = Texture.MAGICgetBulletHoleTexForMeshTex( meshTextureFullFileName );
            if ( bulletHoleTexture !== null )
            {
                return bulletHoleTexture;
            }

            // compare with all existent textures
            for ( const texture of Texture.ALL_TEXTURES )
            {
                if ( texture.file.fileName === meshTextureFullFileName )
                {
                    if ( texture.file.bulletHoleTexture !== null )
                    {
                        for ( const tex of Texture.ALL_TEXTURES )
                        {
                            if ( tex.file.fileName === texture.file.bulletHoleTexture.fileName )
                            {
                                return tex.file;
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
    *   TODO could be removed by adding TextureType.MODEL again :)
    *
    *   @param meshTextureFileUrl The filename of the 3ds max model's used texture -- without any directory component.
    *******************************************************************************************************************/
    private static MAGICgetBulletHoleTexForMeshTex( meshTextureFileUrl:string ) :bz.TextureFile
    {
        switch ( meshTextureFileUrl )
        {
            case bz.SettingResource.PATH_MODEL + 'furniture/crate1.jpg':
            case bz.SettingResource.PATH_MODEL + 'furniture/woodLight.jpg':
            {
                return bz.TextureFile.BULLET_HOLE_WOOD;
            }
        }

        return null;
    }

    /** ****************************************************************************************************************
    *   Returns the Texture from the specified TextureFile.
    *
    *   @return The texture data from the specified file name.
    *******************************************************************************************************************/
    private static getTextureFromFileName( textureFile:bz.TextureFile ) : bz.Texture
    {
        // pick from loaded textures
        for ( const texture of Texture.ALL_TEXTURES )
        {
            if ( texture.file  === textureFile )
            {
                return texture;
            }
        }

        return null;
    }
}

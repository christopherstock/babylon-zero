
    import * as bz from '..';

    /** ****************************************************************************************************************
    *   Specifies all textures to load.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class Texture
    {
        /** The texture 'bullet hole concreate'. */
        public      static  readonly    BULLET_HOLE_CONCRETE        :Texture                = new Texture( 'bulletHole/concrete.png',   bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,    null,                           bz.TextureType.WALL     );
        /** The texture 'bullet hole wood'. */
        public      static  readonly    BULLET_HOLE_WOOD            :Texture                = new Texture( 'bulletHole/wood.png',       bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,    null,                           bz.TextureType.WALL     );
        /** The texture 'bullet hole glass'. */
        public      static  readonly    BULLET_HOLE_GLASS           :Texture                = new Texture( 'bulletHole/glass.png',      bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,    null,                           bz.TextureType.WALL     );

        /** The texture 'wall test'. */
        public      static  readonly    WALL_TEST                   :Texture                = new Texture( 'wall/test.jpg',             bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_CONCRETE,   bz.TextureType.WALL     );
        /** The texture 'wall mayflower logo'. */
        public      static  readonly    WALL_MAYFLOWER_LOGO         :Texture                = new Texture( 'wall/mfLogo.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_WOOD,       bz.TextureType.WALL     );
        /** The texture 'wall amiga'. */
        public      static  readonly    WALL_AMIGA                  :Texture                = new Texture( 'wall/amiga.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_WOOD,       bz.TextureType.WALL     );
        /** The texture 'wall wood'. */
        public      static  readonly    WALL_WOOD                   :Texture                = new Texture( 'wall/wood.jpg',             bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_WOOD,       bz.TextureType.WALL     );
        /** The texture 'wall grass'. */
        public      static  readonly    WALL_GRASS                  :Texture                = new Texture( 'wall/grass.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_WOOD,       bz.TextureType.WALL     );
        /** The texture 'wall glas'. */
        public      static  readonly    WALL_GLASS                  :Texture                = new Texture( 'wall/glass.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_GLASS,      bz.TextureType.WALL     );
        /** The texture 'wall tree'. */
        public      static  readonly    WALL_TREE                   :Texture                = new Texture( 'wall/tree.png',             bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,    Texture.BULLET_HOLE_WOOD,       bz.TextureType.WALL     );
        /** The texture 'wall skin rosé'. */
        public      static  readonly    WALL_SKIN_ROSE              :Texture                = new Texture( 'wall/skinRose.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_WOOD,       bz.TextureType.WALL     );

        /** The video texture 'wall test'. */
        public      static  readonly    VIDEO_TEST                  :Texture                = new Texture( 'test.mp4',                  bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE,    Texture.BULLET_HOLE_GLASS,      bz.TextureType.VIDEO    );

        /** The model texture 'crate'. */
        public      static  readonly    MODEL_CRATE                 :Texture                = new Texture( 'crate1.jpg',                bz.TextureHasAlpha.NO,  bz.TextureUV.ALL_TO_ONE,    Texture.BULLET_HOLE_WOOD,       bz.TextureType.MODEL    );

        /** Contains all texture data objects. */
        public      static  readonly    ALL_TEXTURES                :Texture[]              =
        [
            Texture.BULLET_HOLE_CONCRETE,
            Texture.BULLET_HOLE_WOOD,
            Texture.BULLET_HOLE_GLASS,

            Texture.WALL_TEST,
            Texture.WALL_MAYFLOWER_LOGO,
            Texture.WALL_AMIGA,
            Texture.WALL_WOOD,
            Texture.WALL_GRASS,
            Texture.WALL_GLASS,
            Texture.WALL_TREE,
            Texture.WALL_SKIN_ROSE,

            Texture.VIDEO_TEST,

            Texture.MODEL_CRATE,
        ];

        /** The filename of this texture's image. */
        private             readonly    fileName                    :string                 = null;
        /** The according bullet hole texture for this texture. */
        private             readonly    bulletHoleTexture           :bz.Texture             = null;
        /** Specifies if this texture has an alpha channel. */
        private             readonly    textureHasAlpha             :bz.TextureHasAlpha     = null;
        /** The UV tiling strategy to apply for this texture. */
        private             readonly    strategyUV                  :bz.TextureUV           = null;
        /** Specifies the type of texture. */
        private             readonly    textureType                 :bz.TextureType         = null;

        /** The babylon.JS texture data. */
        private                         nativeTexture               :BABYLON.Texture        = null;

        /** ************************************************************************************************************
        *   Creates a texture configuration.
        *
        *   @param fileName          The filename of the image to load for this material.
        *   @param textureHasAlpha   Specifies alpha occurance in texture image.
        *   @param strategyUV        The UV tiling strategy for this texture.
        *   @param bulletHoleTexture The texture for bullet holes that occur onto this texture.
        *   @param textureType       The type of this texture.
        ***************************************************************************************************************/
        public constructor
        (
            fileName          :string,
            textureHasAlpha   :bz.TextureHasAlpha,
            strategyUV        :bz.TextureUV,
            bulletHoleTexture :bz.Texture,
            textureType       :bz.TextureType
        )
        {
            this.textureType       = textureType;

            this.fileName          = this.getFileName( fileName );
            this.textureHasAlpha   = textureHasAlpha;
            this.strategyUV        = strategyUV;
            this.bulletHoleTexture = bulletHoleTexture;
        }

        /** ************************************************************************************************************
        *   Loads the texture image.
        *
        *   @param scene The babylon.JS scene to append all textures to.
        ***************************************************************************************************************/
        public loadTexture( scene:BABYLON.Scene ) : void
        {
            switch ( this.textureType )
            {
                case bz.TextureType.WALL:
                {
                    // create default texture
                    this.nativeTexture = new BABYLON.Texture( this.fileName, scene );
                    break;
                }

                case bz.TextureType.VIDEO:
                {
                    // create video texture and mute audio
                    const videoTexture:BABYLON.VideoTexture = new BABYLON.VideoTexture( this.fileName, this.fileName, scene, true );
                    videoTexture.video.muted    = true;
                    videoTexture.video.autoplay = true;
                    videoTexture.video.play();

                    this.nativeTexture = videoTexture;
                    break;
                }

                case bz.TextureType.MODEL:
                {
                    // do not load model textures explicitly
                    break;
                }
            }
        }

        /** ************************************************************************************************************
        *   Returns a clone of this texture's babylon.JS data.
        *
        *   @return A clone of this texture's native texture data.
        ***************************************************************************************************************/
        public cloneNativeTexture() : BABYLON.Texture
        {
            return this.nativeTexture.clone();
        }

        /** ************************************************************************************************************
        *   Returns the texture's babylon.JS data.
        *
        *   @return The texture's native texture data.
        ***************************************************************************************************************/
        public getNativeTexture() : BABYLON.Texture
        {
            return this.nativeTexture;
        }

        /** ************************************************************************************************************
        *   Checks if this texture is a video texture.
        *
        *   @return <code>true</code> if this texture is a video texture.
        ***************************************************************************************************************/
        public getIsVideoTexture() : boolean
        {
            return this.textureType === bz.TextureType.VIDEO;
        }

        /** ************************************************************************************************************
        *   Determines if this texture uses an alpha channel.
        *
        *   @return <code>true</code> if this texture makes use of an alpha channel.
        ***************************************************************************************************************/
        public hasAlpha() : boolean
        {
            return ( this.textureHasAlpha === bz.TextureHasAlpha.YES );
        }

        /** ************************************************************************************************************
        *   Determines this texture's UV strategy.
        *
        *   @return The UV strategy of this texture.
        ***************************************************************************************************************/
        public getStrategyUV() : bz.TextureUV
        {
            return this.strategyUV;
        }

        /** ************************************************************************************************************
        *   Delivers the full qualified filename to this texture resource file.
        *
        *   @param fileName The partial filename to this texture resource file.
        *
        *   @return The full qualified filename to this texture resource file.
        ***************************************************************************************************************/
        private getFileName( fileName:string ) : string
        {
            switch ( this.textureType )
            {
                case bz.TextureType.WALL:
                {
                    return bz.SettingResource.PATH_IMAGE_TEXTURE + fileName;
                }

                case bz.TextureType.VIDEO:
                {
                    return bz.SettingResource.PATH_VIDEO_TEXTURE + fileName;
                }

                case bz.TextureType.MODEL:
                {
                    return fileName;
                }
            }

            return '';
        }

        /** ************************************************************************************************************
        *   Delivers the according bullet hole for the given native mesh.
        *
        *   @param mesh The mesh to determine the Bullet Hole Texture for.
        *
        *   @return The according bullet hole texture.
        ***************************************************************************************************************/
        public static getAccordingBulletHoleTextureForMesh( mesh:BABYLON.AbstractMesh ) : bz.Texture
        {
            const DEFAULT_BULLET_HOLE_TEXTURE:Texture = Texture.BULLET_HOLE_CONCRETE;

            // try to pick the texture filename
            if
            (
                mesh != null
                && mesh.material != null
                && mesh.material.getActiveTextures() != null
                && mesh.material.getActiveTextures().length > 0
            )
            {
                // pick texture filename
                const meshTextureFileName:string = mesh.material.getActiveTextures()[ 0 ].name;

                // compare with all existent textures
                for ( const texture of Texture.ALL_TEXTURES )
                {
                    if ( texture.fileName === meshTextureFileName )
                    {
                        if ( texture.bulletHoleTexture != null )
                        {
                            return texture.bulletHoleTexture;
                        }
                    }
                }
            }

            return DEFAULT_BULLET_HOLE_TEXTURE;
        }
    }

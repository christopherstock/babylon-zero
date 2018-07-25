
    import * as bz from '..';

    /** ****************************************************************************************************************
    *   Specifies all textures to load.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class Texture
    {
        /** The texture 'bullet hole concreate'. */
        public      static      BULLET_HOLE_CONCRETE        :Texture                = new Texture( 'bulletHole/concrete.png',   bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,    null                            );
        /** The texture 'bullet hole wood'. */
        public      static      BULLET_HOLE_WOOD            :Texture                = new Texture( 'bulletHole/wood.png',       bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,    null                            );

        /** The texture 'wall test'. */
        public      static      WALL_TEST                    :Texture               = new Texture( 'wall/test.jpg',             bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_CONCRETE    );
        /** The texture 'wall mayflower logo'. */
        public      static      WALL_MAYFLOWER_LOGO          :Texture               = new Texture( 'wall/mfLogo.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_WOOD        );
        /** The texture 'wall amiga'. */
        public      static      WALL_AMIGA                   :Texture               = new Texture( 'wall/amiga.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_WOOD        );
        /** The texture 'wall wood'. */
        public      static      WALL_WOOD                    :Texture               = new Texture( 'wall/wood.jpg',             bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_WOOD        );
        /** The texture 'wall grass'. */
        public      static      WALL_GRASS                   :Texture               = new Texture( 'wall/grass.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_WOOD        );
        /** The texture 'wall glas'. */
        public      static      WALL_GLASS                   :Texture               = new Texture( 'wall/glass.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_WOOD        );
        /** The texture 'wall tree'. */
        public      static      WALL_TREE                    :Texture               = new Texture( 'wall/tree.png',             bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE,    Texture.BULLET_HOLE_WOOD        );
        /** The texture 'wall skin rosé'. */
        public      static      WALL_SKIN_ROSE               :Texture               = new Texture( 'wall/skinRose.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE, Texture.BULLET_HOLE_WOOD        );

        /** Contains all texture data objects. */
        public      static      ALL_TEXTURES                :Texture[]              =
        [
            Texture.BULLET_HOLE_CONCRETE,
            Texture.BULLET_HOLE_WOOD,

            Texture.WALL_TEST,
            Texture.WALL_MAYFLOWER_LOGO,
            Texture.WALL_AMIGA,
            Texture.WALL_WOOD,
            Texture.WALL_GRASS,
            Texture.WALL_GLASS,
            Texture.WALL_TREE,
            Texture.WALL_SKIN_ROSE,
        ];

        /** The filename of this texture's image. */
        public                  fileName                    :string                 = null;
        /** The according bullet hole texture for this texture. */
        public                  bulletHoleTexture           :bz.Texture             = null;
        /** Specifies if this texture has an alpha channel. */
        public                  textureHasAlpha             :bz.TextureHasAlpha     = null;
        /** The UV tiling strategy to apply for this texture. */
        public                  textureUV                   :bz.TextureUV           = null;

        /** The babylon.JS texture data. */
        public                  texture                     :BABYLON.Texture        = null;

        /** ************************************************************************************************************
        *   Creates a texture configuration.
        *
        *   @param fileName          The filename of the image to load for this material.
        *   @param textureHasAlpha   Specifies alpha occurance in texture image.
        *   @param textureUV         The UV tiling strategy for this texture.
        *   @param bulletHoleTexture The texture for bullet holes that occur onto this texture.
        ***************************************************************************************************************/
        public constructor
        (
            fileName          :string,
            textureHasAlpha   :bz.TextureHasAlpha,
            textureUV         :bz.TextureUV,
            bulletHoleTexture :bz.Texture
        )
        {
            this.fileName          = bz.SettingEngine.PATH_IMAGE_TEXTURE + fileName;
            this.textureHasAlpha   = textureHasAlpha;
            this.textureUV         = textureUV;
            this.bulletHoleTexture = bulletHoleTexture;
        }

        /** ************************************************************************************************************
        *   Loads the texture image.
        *
        *   @param scene The babylon.JS scene to append all textures to.
        ***************************************************************************************************************/
        public loadTexture( scene:BABYLON.Scene ) : void
        {
            this.texture = new BABYLON.Texture
            (
                this.fileName,
                scene
            );
        }

        /** ************************************************************************************************************
        *   Determines the specified meshe's active texture and tries to return the according
        *   Texture by comparing the specified filename.
        *
        *   @param mesh The mesh to determine the Texture for.
        ***************************************************************************************************************/
        public static getTextureFromMeshByName( mesh:BABYLON.AbstractMesh ) : bz.Texture
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

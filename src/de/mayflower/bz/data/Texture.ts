
    import * as bz from '..';

    /** ****************************************************************************************************************
    *   Specifies all textures to load.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class Texture
    {
        /** The texture 'wall test'. */
        public      static      WALL_TEST                    :Texture               = new Texture( 'wall/test.jpg',             bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'wall mayflower logo'. */
        public      static      WALL_MAYFLOWER_LOGO          :Texture               = new Texture( 'wall/mfLogo.jpg',           bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'wall amiga'. */
        public      static      WALL_AMIGA                   :Texture               = new Texture( 'wall/amiga.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'wall wood'. */
        public      static      WALL_WOOD                    :Texture               = new Texture( 'wall/wood.jpg',             bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'wall grass'. */
        public      static      WALL_GRASS                   :Texture               = new Texture( 'wall/grass.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'wall glas'. */
        public      static      WALL_GLASS                   :Texture               = new Texture( 'wall/glass.jpg',            bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );
        /** The texture 'wall tree'. */
        public      static      WALL_TREE                    :Texture               = new Texture( 'wall/tree.png',             bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'wall skin rosé'. */
        public      static      WALL_SKIN_ROSE               :Texture               = new Texture( 'wall/skinRose.jpg',         bz.TextureHasAlpha.NO,  bz.TextureUV.TILED_BY_SIZE );

        /** The texture 'bullet hole concreate'. */
        public      static      BULLET_HOLE_CONCRETE        :Texture                = new Texture( 'bulletHole/concrete.png',   bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );
        /** The texture 'bullet hole wood'. */
        public      static      BULLET_HOLE_WOOD            :Texture                = new Texture( 'bulletHole/wood.png',       bz.TextureHasAlpha.YES, bz.TextureUV.ALL_TO_ONE    );

        /** Contains all texture data objects. */
        public      static      ALL_TEXTURES                :Texture[]              =
        [
            Texture.WALL_TEST,
            Texture.WALL_MAYFLOWER_LOGO,
            Texture.WALL_AMIGA,
            Texture.WALL_WOOD,
            Texture.WALL_GRASS,
            Texture.WALL_GLASS,
            Texture.WALL_TREE,
            Texture.WALL_SKIN_ROSE,
            Texture.BULLET_HOLE_CONCRETE,
            Texture.BULLET_HOLE_WOOD,
        ];

        /** The filename of this texture's image. */
        public                  fileName                    :string                 = null;
        /** Specifies if this texture has an alpha channel. */
        public                  textureHasAlpha             :bz.TextureHasAlpha     = null;
        /** The UV tiling strategy to apply for this texture. */
        public                  textureUV                   :bz.TextureUV           = null;

        /** The babylon.JS texture data. */
        public                  texture                     :BABYLON.Texture        = null;

        /** ************************************************************************************************************
        *   Creates a texture configuration.
        *
        *   @param fileName        The filename of the image to load for this material.
        *   @param textureHasAlpha Specifies alpha occurance in texture image.
        *   @param textureUV       The UV tiling strategy for this texture.
        ***************************************************************************************************************/
        public constructor( fileName:string, textureHasAlpha:bz.TextureHasAlpha, textureUV:bz.TextureUV )
        {
            this.fileName        = fileName;
            this.textureHasAlpha = textureHasAlpha;
            this.textureUV       = textureUV;
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
                bz.SettingEngine.PATH_IMAGE_TEXTURE + this.fileName,
                scene
            );
        }
    }

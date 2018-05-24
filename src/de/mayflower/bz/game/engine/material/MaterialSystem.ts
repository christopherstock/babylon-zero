
    import * as bz from '../../..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Specifies all textures and materials.
    *******************************************************************************************************************/
    export class MaterialSystem
    {
        /** Next ID to assign for material creation. */
        private             static              nextMaterialId                  :number                     = 0;

        /** ************************************************************************************************************
        *   Inits all materials being used in the game.
        ***************************************************************************************************************/
        public init() : void
        {
        }

        /** ************************************************************************************************************
        *   Creates a material from the given texture or color.
        *
        *   @param texture         The desired texture.
        *   @param textureHasAlpha Specified if the texture image contains alpha information.
        *   @param textureUV       The UV strategy for the specified texture.
        *   @param sizeU           The texture U size for the texture.
        *   @param sizeV           The texture V size for the texture.
        *   @param color           The desired solid color to apply.
        *   @param alpha           The opacity for the applied texture.
        *   @param emissiveColor   The emissive color for this material.
        ***************************************************************************************************************/
        public createMaterial
        (
            // TODO bundle to bz.Texture!
            texture         :bz.Texture,
            textureHasAlpha :bz.TextureHasAlpha,
            textureUV       :bz.TextureUV,
            sizeU           :number,
            sizeV           :number,

            color           :BABYLON.Color3,
            alpha           :number,
            emissiveColor   :BABYLON.Color3
        )
        : BABYLON.StandardMaterial
        {
            const material:BABYLON.StandardMaterial = new BABYLON.StandardMaterial
            (
                'material' + MaterialSystem.nextMaterialId++,
                bz.Main.game.engine.scene.getScene()
            );

            if ( texture != null )
            {
                let textureU:number = -1;
                let textureV:number = -1;

                if ( textureUV === bz.TextureUV.TILED_BY_SIZE )
                {
                    textureU = sizeU;
                    textureV = sizeV;
                }
                else if ( textureUV === bz.TextureUV.ALL_TO_ONE )
                {
                    textureU = 1.0;
                    textureV = 1.0;
                }

                material.diffuseTexture = this.createTexture
                (
                    texture.toString(),
                    textureU,
                    textureV,
                    alpha,
                    textureHasAlpha
                );
            }
            else if ( color != null )
            {
                material.diffuseColor = color;
            }

            material.alpha           = alpha;
            material.emissiveColor   = emissiveColor;
            material.backFaceCulling = ( textureHasAlpha === bz.TextureHasAlpha.YES );

            return material;
        }

        /** ************************************************************************************************************
        *   Creates a textured material.
        *
        *   @param fileName        The filename of the image to load for this material.
        *   @param repeatU         The amount for U repeating this texture.
        *   @param repeatV         The amount for V repeating this texture.
        *   @param alpha           Alpha for this texture.
        *   @param textureHasAlpha Specifies alpha occurance in texture image.
        ***************************************************************************************************************/
        private createTexture
        (
            fileName        :string,
            repeatU         :number,
            repeatV         :number,
            alpha           :number,
            textureHasAlpha :bz.TextureHasAlpha
        )
        : BABYLON.Texture
        {
            const texture:BABYLON.Texture = new BABYLON.Texture
            (
                bz.SettingEngine.PATH_IMAGE_TEXTURE + fileName,
                bz.Main.game.engine.scene.getScene()
            );

            texture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
            texture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;

            // working around poor typings for scaling ..
            if ( repeatU !== -1 )
            {
                ( texture as any ).uScale = repeatU;
            }
            if ( repeatV !== -1 )
            {
                ( texture as any ).vScale = repeatV;
            }

            texture.hasAlpha = ( textureHasAlpha === bz.TextureHasAlpha.YES );

            return texture;
        }
    }

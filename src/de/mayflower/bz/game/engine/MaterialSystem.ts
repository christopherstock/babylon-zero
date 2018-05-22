
    import * as bz from '../..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Specifies all textures and materials.
    *******************************************************************************************************************/
    export class MaterialSystem
    {
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
        *   @param materialAlpha   The opacity for the applied texture.
        *   @param emissiveColor   The emissive color for this material.
        ***************************************************************************************************************/
        public static createMaterial
        (
            texture         :bz.Texture,
            textureHasAlpha :bz.TextureHasAlpha,
            textureUV       :bz.TextureUV,
            sizeU           :number,
            sizeV           :number,
            color           :BABYLON.Color3,
            materialAlpha   :number,
            emissiveColor   :BABYLON.Color3
        )
        : BABYLON.StandardMaterial
        {
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

                return bz.TextureSystem.createTexture
                (
                    texture.toString(),
                    textureU,
                    textureV,
                    materialAlpha,
                    false,
                    emissiveColor,
                    textureHasAlpha
                );
            }
            else if ( color != null )
            {
                return bz.MaterialSystem.createSolid( color, emissiveColor );
            }

            return null;
        }

        /** ************************************************************************************************************
        *   Creates a solid material of the specified color.
        *
        *   @param color         The solid and emissive color for this material.
        *   @param emissiveColor The emissive color for this material.
        ***************************************************************************************************************/
        public static createSolid( color:BABYLON.Color3, emissiveColor:BABYLON.Color3 ) : BABYLON.StandardMaterial
        {
            const solidMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial
            (
                'material' + bz.TextureSystem.nextMaterialId++,
                bz.Main.game.engine.scene.getScene()
            );

            solidMaterial.diffuseColor    = color;
            solidMaterial.emissiveColor   = emissiveColor;
            solidMaterial.backFaceCulling = false;

            return solidMaterial;
        }
    }

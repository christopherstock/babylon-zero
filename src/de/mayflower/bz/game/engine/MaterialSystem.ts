
    import * as bz from '../..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Specifies all textures and materials.
    *******************************************************************************************************************/
    export class MaterialSystem
    {
        /** The pre-creatred solid color material 'black'. */
        public              solidBlack              :BABYLON.StandardMaterial           = null;
        /** The pre-creatred solid color material 'red'. */
        public              solidRed                :BABYLON.StandardMaterial           = null;
        /** The pre-creatred solid color material 'green'. */
        public              solidGreen              :BABYLON.StandardMaterial           = null;
        /** The pre-creatred solid color material 'blue'. */
        public              solidBlue               :BABYLON.StandardMaterial           = null;
        /** The pre-creatred solid color material 'grey'. */
        public              solidGrey               :BABYLON.StandardMaterial           = null;
        /** The pre-creatred solid color material 'white'. */
        public              solidWhite              :BABYLON.StandardMaterial           = null;

        /** ************************************************************************************************************
        *   Inits all materials being used in the game.
        ***************************************************************************************************************/
        public init() : void
        {
            this.solidBlack = MaterialSystem.createSolid( new BABYLON.Color3( 0.0, 0.0, 0.0 ), bz.SettingGame.COLOR_BLACK );
            this.solidRed   = MaterialSystem.createSolid( new BABYLON.Color3( 1.0, 0.0, 0.0 ), bz.SettingGame.COLOR_BLACK );
            this.solidGreen = MaterialSystem.createSolid( new BABYLON.Color3( 0.0, 1.0, 0.0 ), bz.SettingGame.COLOR_BLACK );
            this.solidBlue  = MaterialSystem.createSolid( new BABYLON.Color3( 0.0, 0.0, 1.0 ), bz.SettingGame.COLOR_BLACK );
            this.solidGrey  = MaterialSystem.createSolid( new BABYLON.Color3( 0.5, 0.5, 0.5 ), bz.SettingGame.COLOR_BLACK );
            this.solidWhite = MaterialSystem.createSolid( new BABYLON.Color3( 1.0, 1.0, 1.0 ), bz.SettingGame.COLOR_BLACK );
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
            color           :BABYLON.StandardMaterial,
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
                return color;
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

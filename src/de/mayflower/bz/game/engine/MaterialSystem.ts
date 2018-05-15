
    import * as bz from '../..';
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   Specifies all textures and materials.
    *******************************************************************************************************************/
    export class MaterialSystem
    {
        public              solidBlack              :BABYLON.StandardMaterial           = null;
        public              solidRed                :BABYLON.StandardMaterial           = null;
        public              solidGreen              :BABYLON.StandardMaterial           = null;
        public              solidBlue               :BABYLON.StandardMaterial           = null;
        public              solidGrey               :BABYLON.StandardMaterial           = null;
        public              solidWhite              :BABYLON.StandardMaterial           = null;

        /***************************************************************************************************************
        *   Inits all materials being used in the game.
        ***************************************************************************************************************/
        public init()
        {
            this.solidBlack    = MaterialSystem.createSolid( new BABYLON.Color3( 0.0, 0.0, 0.0 ) );
            this.solidRed      = MaterialSystem.createSolid( new BABYLON.Color3( 1.0, 0.0, 0.0 ) );
            this.solidGreen    = MaterialSystem.createSolid( new BABYLON.Color3( 0.0, 1.0, 0.0 ) );
            this.solidBlue     = MaterialSystem.createSolid( new BABYLON.Color3( 0.0, 0.0, 1.0 ) );
            this.solidGrey     = MaterialSystem.createSolid( new BABYLON.Color3( 0.5, 0.5, 0.5 ) );
            this.solidWhite    = MaterialSystem.createSolid( new BABYLON.Color3( 1.0, 1.0, 1.0 ) );
        }

        public static createMaterial
        (
            texture         :bz.Texture,
            textureHasAlpha :bz.TextureHasAlpha,
            textureUV       :bz.TextureUV,
            sizeU           :number,
            sizeV           :number,
            color           :BABYLON.StandardMaterial,
            materialAlpha   :number
        )
        : BABYLON.StandardMaterial
        {
            if ( texture != null )
            {
                let textureU:number = -1;
                let textureV:number = -1;

                // TODO add _IGNORE
                if ( textureUV == bz.TextureUV.TILED_BY_SIZE )
                {
                    textureU = sizeU;
                    textureV = sizeV;
                }
                else if ( textureUV == bz.TextureUV.ALL_TO_ONE )
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
                    bz.SettingGame.COLOR_WHITE,
                    textureHasAlpha
                );
            }
            else if ( color != null )
            {
                return color;
            }

            return null;
        }

        /***************************************************************************************************************
        *   Creates a solid material of the specified color.
        *
        *   @param color The solid and emissive color for this material.
        ***************************************************************************************************************/
        public static createSolid( color:BABYLON.Color3 ) : BABYLON.StandardMaterial
        {
            let solidMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( "name", bz.Main.game.engine.scene.getScene() );

            solidMaterial.diffuseColor    = color;
            solidMaterial.emissiveColor   = color;
            solidMaterial.backFaceCulling = false;

            return solidMaterial;
        }
    }

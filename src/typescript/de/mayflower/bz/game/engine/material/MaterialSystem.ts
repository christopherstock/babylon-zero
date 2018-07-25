
    import * as bz      from '../../..';
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
        *
        *   @param scene The babylon.JS scene to append all textures to.
        ***************************************************************************************************************/
        public init( scene:BABYLON.Scene ) : void
        {
            // load all texture images
            for ( const texture of bz.Texture.ALL_TEXTURES )
            {
                texture.loadTexture( scene );
            }
        }

        /** ************************************************************************************************************
        *   Creates a material from the given texture or color.
        *
        *   @param texture            The desired texture.
        *   @param ommitTextureTiling Specifies if tiling for the given texture shall be omitted.
        *   @param sizeU              The texture U size for the texture.
        *   @param sizeV              The texture V size for the texture.
        *   @param color              The desired solid color to apply.
        *   @param alpha              The opacity for the applied texture.
        *   @param emissiveColor      The emissive color for this material.
        ***************************************************************************************************************/
        public createMaterial
        (
            texture            :bz.Texture,
            ommitTextureTiling :boolean,

            sizeU              :number,
            sizeV              :number,

            color              :BABYLON.Color3,
            alpha              :number,
            emissiveColor      :BABYLON.Color3
        )
        : BABYLON.StandardMaterial
        {
            const material:BABYLON.StandardMaterial = new BABYLON.StandardMaterial
            (
                bz.MaterialSystem.createNextMaterialId(),
                bz.Main.game.engine.scene.getScene()
            );

            if ( texture != null )
            {
                let textureU:number = -1;
                let textureV:number = -1;

                if ( !ommitTextureTiling )
                {
                    switch ( texture.textureUV )
                    {
                        case bz.TextureUV.TILED_BY_SIZE:
                        {
                            textureU = sizeU;
                            textureV = sizeV;
                            break;
                        }

                        case bz.TextureUV.ALL_TO_ONE:
                        {
                            textureU = 1.0;
                            textureV = 1.0;
                            break;
                        }
                    }
                }

                material.diffuseTexture = this.createTexture
                (
                    texture,
                    textureU,
                    textureV
                );

                material.backFaceCulling = ( texture.textureHasAlpha === bz.TextureHasAlpha.YES );
            }
            else if ( color != null )
            {
                material.diffuseColor    = color;
                material.backFaceCulling = false;
            }

            material.alpha         = alpha;
            material.emissiveColor = emissiveColor;

            return material;
        }

        /** ************************************************************************************************************
        *   Creates a textured material.
        *
        *   @param texture The texture to create.
        *   @param repeatU The amount for U repeating this texture.
        *   @param repeatV The amount for V repeating this texture.
        ***************************************************************************************************************/
        private createTexture
        (
            texture :bz.Texture,
            repeatU :number,
            repeatV :number
        )
        : BABYLON.Texture
        {
            const newTexture:BABYLON.Texture = texture.texture.clone();

            newTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
            newTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;

            // working around poor typings for scaling ..
            if ( repeatU !== -1 )
            {
                ( newTexture as any ).uScale = repeatU;
            }
            if ( repeatV !== -1 )
            {
                ( newTexture as any ).vScale = repeatV;
            }

            newTexture.hasAlpha = ( texture.textureHasAlpha === bz.TextureHasAlpha.YES );

            return newTexture;
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new mesh to create.
        *
        *   @return The next free unique id for a new mesh to create.
        ***************************************************************************************************************/
        public static createNextMaterialId() : string
        {
            return 'material' + MaterialSystem.nextMaterialId++;
        }
    }

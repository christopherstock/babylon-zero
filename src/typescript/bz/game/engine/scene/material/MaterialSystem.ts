import * as bz from '../../../..';

/** ********************************************************************************************************************
*   Specifies all textures and materials.
***********************************************************************************************************************/
export class MaterialSystem
{
    /** Next ID to assign for material creation. */
    private static          nextMaterialId      :number                 = 0;

    /** All textures to load. */
    private        readonly textures            :bz.Texture[]           = [];

    /** ****************************************************************************************************************
    *   Creates a new material system.
    *
    *   @param textures All textures to load.
    *******************************************************************************************************************/
    public constructor( textures:bz.Texture[] )
    {
        this.textures = textures;
    }

    /** ****************************************************************************************************************
    *   Inits all materials being used in the game.
    *
    *   @param scene The babylon.JS scene to append all textures to.
    *******************************************************************************************************************/
    public load( scene:BABYLON.Scene ) : void
    {
        // load all texture images
        for ( const texture of this.textures )
        {
            texture.loadTexture( scene );
        }
    }

    /** ****************************************************************************************************************
    *   Creates a material from the given texture or color.
    *
    *   @param scene              The scene where the new material to creat.
    *   @param textureFile        The desired texture.
    *   @param ommitTextureTiling Specifies if tiling for the given texture shall be omitted.
    *   @param sizeU              The texture U size for the texture.
    *   @param sizeV              The texture V size for the texture.
    *   @param color              The desired solid color to apply.
    *   @param alpha              The opacity for the applied texture.
    *   @param emissiveColor      The emissive color for this material.
    *******************************************************************************************************************/
    public createMaterial
    (
        scene              :BABYLON.Scene,
        textureFile        :bz.TextureFile,
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
            scene
        );

        if ( textureFile !== null )
        {
            let textureRepeatU:number = -1;
            let textureRepeatV:number = -1;

            if ( !ommitTextureTiling )
            {
                switch ( textureFile.getStrategyUV() )
                {
                    case bz.TextureUV.TILED:
                    {
                        textureRepeatU = ( sizeU * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV );
                        textureRepeatV = ( sizeV * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV );
                        break;
                    }

                    case bz.TextureUV.TILED_HALF:
                    {
                        textureRepeatU = ( sizeU * 0.5 * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV );
                        textureRepeatV = ( sizeV * 0.5 * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV );
                        break;
                    }

                    case bz.TextureUV.ALL_ONE:
                    {
                        textureRepeatU = 1.0;
                        textureRepeatV = 1.0;
                        break;
                    }
                }
            }

            material.diffuseTexture = textureFile.createNewTextureInstance( textureRepeatU, textureRepeatV );

            // this will light the texture - try more lighting helper map textures later?
            // material.emissiveTexture = textureFile.createNewTextureInstance( textureRepeatU, textureRepeatV );

            material.backFaceCulling = ( textureFile.hasAlpha() || alpha < 1.0 );
        }
        else if ( color !== null )
        {
            material.diffuseColor    = color;
            material.backFaceCulling = false;
        }

        material.alpha         = alpha;
        material.emissiveColor = emissiveColor;

        return material;
    }

    /** ****************************************************************************************************************
    *   Returns the next id for a new mesh to create.
    *
    *   @return The next free unique id for a new mesh to create.
    *******************************************************************************************************************/
    public static createNextMaterialId() : string
    {
        return 'material' + String( MaterialSystem.nextMaterialId++ );
    }
}

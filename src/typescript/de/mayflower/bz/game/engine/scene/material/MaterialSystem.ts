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
    *   @param textureFile            The desired texture.
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
            let textureU:number = -1;
            let textureV:number = -1;

            if ( !ommitTextureTiling )
            {
                switch ( textureFile.getStrategyUV() )
                {
                    case bz.TextureUV.TILED_BY_SIZE:
                    {
                        textureU = ( sizeU * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV );
                        textureV = ( sizeV * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV );
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

            material.diffuseTexture = MaterialSystem.createTexture
            (
                textureFile,
                textureU,
                textureV
            );

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

    /** ****************************************************************************************************************
    *   Creates a textured material.
    *
    *   @param textureFile The texture to create.
    *   @param repeatU The amount for U repeating this texture.
    *   @param repeatV The amount for V repeating this texture.
    *******************************************************************************************************************/
    private static createTexture
    (
        textureFile :bz.TextureFile,
        repeatU     :number,
        repeatV     :number
    )
    : BABYLON.Texture
    {
        // do not clone native video textures! ( babylon.JS will hang otherwise! )
        const newTexture:BABYLON.Texture =
        (
            textureFile.getIsVideoTexture()
                ? bz.Texture.getNativeTexture( textureFile )
                // is seems that cloning is not required and getNativeTexture is also working here
                : bz.Texture.cloneNativeTexture( textureFile )
        );

        if ( textureFile.getIsVideoTexture() )
        {
            newTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
            newTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
        }
        else
        {
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
        }

        newTexture.hasAlpha = textureFile.hasAlpha();

        return newTexture;
    }
}

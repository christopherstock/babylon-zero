
    import * as bz from '../..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Offers texture creation and management.
    *
    *   TODO unify with MaterialSystem!
    *******************************************************************************************************************/
    export class TextureSystem
    {
        /** Next ID to assign for material creation. */
        public              static              nextMaterialId                  :number                     = 0;

        /** ************************************************************************************************************
        *   Creates a textured material.
        *
        *   @param fileName        The filename of the image to load for this material.
        *   @param repeatU         The amount for U repeating this texture.
        *   @param repeatV         The amount for V repeating this texture.
        *   @param alpha           Alpha for this texture.
        *   @param backFaceCulling Specifies if the drawing for the backside of this texture shall be omitted.
        *   @param emissiveColor   The color this texture emits.
        *   @param textureHasAlpha Specifies alpha occurance in texture image.
        ***************************************************************************************************************/
        public static createTexture
        (
            fileName        :string,
            repeatU         :number,
            repeatV         :number,
            alpha           :number,
            backFaceCulling :boolean,
            emissiveColor   :BABYLON.Color3,
            textureHasAlpha :bz.TextureHasAlpha
        )
        : BABYLON.StandardMaterial
        {
            const textureMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial
            (
                'material' + TextureSystem.nextMaterialId++,
                bz.Main.game.engine.scene.getScene()
            );

            textureMaterial.diffuseTexture       = new BABYLON.Texture
            (
                bz.SettingEngine.PATH_IMAGE_TEXTURE + fileName,
                bz.Main.game.engine.scene.getScene()
            );

            textureMaterial.diffuseTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
            textureMaterial.diffuseTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;

            // working around poor typings for scaling ..
            if ( repeatU !== -1 )
            {
                ( textureMaterial.diffuseTexture as any ).uScale = repeatU;
            }
            if ( repeatV !== -1 )
            {
                ( textureMaterial.diffuseTexture as any ).vScale = repeatV;
            }

            textureMaterial.diffuseTexture.hasAlpha = ( textureHasAlpha === bz.TextureHasAlpha.YES );

            textureMaterial.alpha           = alpha;
            textureMaterial.backFaceCulling = backFaceCulling;

            // textureMaterial.diffuseTexture.hasAlpha = false;

            if ( emissiveColor != null )
            {
                textureMaterial.emissiveColor   = emissiveColor;
            }

            return textureMaterial;
        }
    }

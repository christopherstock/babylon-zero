
    import * as bz from '..';
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   Constructs 3D meshes.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class FactoryMaterial
    {
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

        /***************************************************************************************************************
        *   Creates a textured material.
        *
        *   @param fileName        The filename of the image to load for this material.
        *   @param repeatU          The amount for U repeating this texture.
        *   @param repeatV          The amount for V repeating this texture.
        *   @param alpha           Opacity for this texture.
        *   @param backFaceCulling Specifies if both sides of this texture shall be textured.
        *   @param emissiveColor   The color this texture emits.
        ***************************************************************************************************************/
        public static createTexture
        (
            fileName        :string,
            repeatU         :number,
            repeatV         :number,
            alpha           :number,
            backFaceCulling :boolean,
            emissiveColor   :BABYLON.Color3
        )
        : BABYLON.StandardMaterial
        {
            let textureMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( "name", bz.Main.game.engine.scene.getScene() );

            textureMaterial.diffuseTexture       = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + fileName, bz.Main.game.engine.scene.getScene() );
/*
            textureMaterial.diffuseTexture.wrapU = wrapU;
            textureMaterial.diffuseTexture.wrapV = wrapV;
*/

            textureMaterial.diffuseTexture.wrapU = 1; // WRAP_ADDRESSMODE
            textureMaterial.diffuseTexture.wrapV = 1; // WRAP_ADDRESSMODE

            // working around poor typings for scaling ..
            ( textureMaterial.diffuseTexture as any ).uScale = repeatU;
            ( textureMaterial.diffuseTexture as any ).vScale = repeatV;

            textureMaterial.alpha                = alpha;
            textureMaterial.backFaceCulling      = backFaceCulling;

            // textureMaterial.diffuseTexture.hasAlpha = false;

            if ( emissiveColor != null )
            {
                textureMaterial.emissiveColor   = emissiveColor;
            }

            return textureMaterial;
        }
    }

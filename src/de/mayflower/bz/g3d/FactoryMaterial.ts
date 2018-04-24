
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

            solidMaterial.diffuseColor  = color;
            solidMaterial.emissiveColor = color;
            solidMaterial.backFaceCulling = false;

            return solidMaterial;
        }

        /***************************************************************************************************************
        *   Creates a textured material.
        *
        *   @param fileName        The filename of the image to load for this material.
        *   @param wrapU           The amount for U wrapping this texture.
        *   @param wrapV           The amount for V wrapping this texture.
        *   @param alpha           Opacity for this texture.
        *   @param backFaceCulling Specifies if both sides of this texture shall be textured.
        *   @param emissiveColor   The color this texture emits.
        ***************************************************************************************************************/
        public static createTexture
        (
            fileName:string,
            wrapU:number,
            wrapV:number,
            alpha:number,
            backFaceCulling:boolean,
            emissiveColor:BABYLON.Color3
        )
        : BABYLON.StandardMaterial
        {
            let textureMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( "name", bz.Main.game.engine.scene.getScene() );

            textureMaterial.diffuseTexture       = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + fileName, bz.Main.game.engine.scene.getScene() );
            textureMaterial.diffuseTexture.wrapU = wrapU;
            textureMaterial.diffuseTexture.wrapV = wrapV;

            textureMaterial.alpha                = alpha;
            textureMaterial.backFaceCulling      = backFaceCulling;

            if ( emissiveColor != null )
            {
                textureMaterial.emissiveColor   = emissiveColor;
            }

            return textureMaterial;
        }
    }

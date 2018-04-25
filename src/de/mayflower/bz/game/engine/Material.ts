
    import * as bz from '../..';
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   Specifies all textures and materials.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Material
    {
        public              textureTest             :BABYLON.StandardMaterial           = null;
        public              textureMfLogo           :BABYLON.StandardMaterial           = null;
        public              textureAmiga            :BABYLON.StandardMaterial           = null;
        public              textureWood             :BABYLON.StandardMaterial           = null;
        public              textureGrass            :BABYLON.StandardMaterial           = null;
        public              textureGlass            :BABYLON.StandardMaterial           = null;

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
            this.textureTest   = Material.createTexture( "test.jpg",   1.0, 1.0, 1.0, false, bz.SettingGame.COLOR_WHITE );
            this.textureMfLogo = Material.createTexture( "mfLogo.jpg", 5.0, 5.0, 1.0, false, bz.SettingGame.COLOR_WHITE );
            this.textureAmiga  = Material.createTexture( "amiga.jpg",  1.0, 1.0, 1.0, false, bz.SettingGame.COLOR_WHITE );
            this.textureWood   = Material.createTexture( "wood.jpg",   1.0, 1.0, 1.0, false, bz.SettingGame.COLOR_WHITE );
            this.textureGrass  = Material.createTexture( "grass.jpg",  5.0, 5.0, 1.0, false, bz.SettingGame.COLOR_WHITE );
            this.textureGlass  = Material.createTexture( "glass.jpg",  1.0, 1.0, 0.5, true,  null                       );

            this.solidBlack    = Material.createSolid( new BABYLON.Color3( 0.0, 0.0, 0.0 ) );
            this.solidRed      = Material.createSolid( new BABYLON.Color3( 1.0, 0.0, 0.0 ) );
            this.solidGreen    = Material.createSolid( new BABYLON.Color3( 0.0, 1.0, 0.0 ) );
            this.solidBlue     = Material.createSolid( new BABYLON.Color3( 0.0, 0.0, 1.0 ) );
            this.solidGrey     = Material.createSolid( new BABYLON.Color3( 0.5, 0.5, 0.5 ) );
            this.solidWhite    = Material.createSolid( new BABYLON.Color3( 1.0, 1.0, 1.0 ) );
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
        private static createTexture
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

        /***************************************************************************************************************
        *   Creates a solid material of the specified color.
        *
        *   @param color The solid and emissive color for this material.
        ***************************************************************************************************************/
        private static createSolid( color:BABYLON.Color3 ) : BABYLON.StandardMaterial
        {
            let solidMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( "name", bz.Main.game.engine.scene.getScene() );

            solidMaterial.diffuseColor    = color;
            solidMaterial.emissiveColor   = color;
            solidMaterial.backFaceCulling = false;

            return solidMaterial;
        }
    }

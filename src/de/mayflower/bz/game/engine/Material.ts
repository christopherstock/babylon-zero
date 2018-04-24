
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
        public              texturewood             :BABYLON.StandardMaterial           = null;
        public              textureGrass            :BABYLON.StandardMaterial           = null;
        public              textureGlass            :BABYLON.StandardMaterial           = null;

        public              solidBlack              :BABYLON.StandardMaterial           = null;
        public              solidRed                :BABYLON.StandardMaterial           = null;
        public              solidGreen              :BABYLON.StandardMaterial           = null;
        public              solidBlue               :BABYLON.StandardMaterial           = null;
        public              solidGrey               :BABYLON.StandardMaterial           = null;

        /***************************************************************************************************************
        *   Inits all materials being used in the game.
        ***************************************************************************************************************/
        public init( scene:BABYLON.Scene )
        {
            // textures
            this.textureTest = bz.FactoryMaterial.createTexture( "test.jpg", 1.0, 1.0 );




            this.textureMfLogo = new BABYLON.StandardMaterial( "amiga", scene );
            this.textureMfLogo.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "mfLogo.jpg", scene );
            this.textureMfLogo.emissiveColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            this.textureMfLogo.diffuseTexture.wrapU = 5;
            this.textureMfLogo.diffuseTexture.wrapV = 5;

            this.textureAmiga = new BABYLON.StandardMaterial( "amiga", scene );
            this.textureAmiga.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "mosaic.jpg", scene );
            this.textureAmiga.emissiveColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );

            this.texturewood = new BABYLON.StandardMaterial( "wood", scene );
            this.texturewood.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "wood.jpg", scene );
            this.texturewood.emissiveColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );

            this.textureGrass = new BABYLON.StandardMaterial( "grass", scene );
            this.textureGrass.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "grass.jpg", scene );
            this.textureGrass.diffuseTexture.wrapU = 5.0;      //Repeat 5 times on the Vertical Axes
            this.textureGrass.diffuseTexture.wrapV = 5.0;      //Repeat 5 times on the Horizontal Axes
            this.textureGrass.backFaceCulling = false;          //Always show the front and the back of an element

            this.textureGlass = new BABYLON.StandardMaterial( "glass", scene );
            this.textureGlass.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "glass.jpg", scene );
          //this.materialGlass.diffuseColor   = new BABYLON.Color3( 1, 0, 0 ); //Red
            this.textureGlass.alpha = 0.5;


            // colors
            this.solidGrey  = bz.FactoryMaterial.createSolid( new BABYLON.Color3( 0.5, 0.5, 0.5 ) );
            this.solidBlack = bz.FactoryMaterial.createSolid( new BABYLON.Color3( 0.0, 0.0, 0.0 ) );
            this.solidRed   = bz.FactoryMaterial.createSolid( new BABYLON.Color3( 1.0, 0.0, 0.0 ) );
            this.solidGreen = bz.FactoryMaterial.createSolid( new BABYLON.Color3( 0.0, 1.0, 0.0 ) );
            this.solidBlue  = bz.FactoryMaterial.createSolid( new BABYLON.Color3( 0.0, 0.0, 1.0 ) );
        }
    }

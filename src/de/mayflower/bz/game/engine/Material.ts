
    import * as bz from '../..';
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   Specifies the game material.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Material
    {
        public              materialTest1           :BABYLON.StandardMaterial           = null;
        public              materialMFLogo          :BABYLON.StandardMaterial           = null;
        public              materialAmiga           :BABYLON.StandardMaterial           = null;
        public              materialGround          :BABYLON.StandardMaterial           = null;
        public              materialWood            :BABYLON.StandardMaterial           = null;
        public              materialGrass           :BABYLON.StandardMaterial           = null;
        public              materialGlass           :BABYLON.StandardMaterial           = null;

        /***************************************************************************************************************
        *   Inits all materials being used in the game.
        ***************************************************************************************************************/
        public initMaterials( scene:BABYLON.Scene )
        {
            this.materialTest1 = new BABYLON.StandardMaterial( "test", scene );
            this.materialTest1.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "test1.jpg", scene );
            this.materialTest1.emissiveColor = new BABYLON.Color3( 1.0, 1.0, 1.0 );
            this.materialTest1.diffuseTexture.wrapU = 1;
            this.materialTest1.diffuseTexture.wrapV = 1;

            this.materialMFLogo = new BABYLON.StandardMaterial( "amiga", scene );
            this.materialMFLogo.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "mfLogo.jpg", scene );
            this.materialMFLogo.emissiveColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            this.materialMFLogo.diffuseTexture.wrapU = 5;
            this.materialMFLogo.diffuseTexture.wrapV = 5;

            this.materialAmiga = new BABYLON.StandardMaterial( "amiga", scene );
            this.materialAmiga.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "mosaic.jpg", scene );
            this.materialAmiga.emissiveColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );

            this.materialGround = new BABYLON.StandardMaterial( "groundMat", scene );
            this.materialGround.diffuseColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            this.materialGround.emissiveColor = new BABYLON.Color3( 0.2, 0.2, 0.2 );
            this.materialGround.backFaceCulling = false;

            this.materialWood = new BABYLON.StandardMaterial( "wood", scene );
            this.materialWood.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "wood.jpg", scene );
            this.materialWood.emissiveColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );

            this.materialGrass = new BABYLON.StandardMaterial( "grass", scene );
            this.materialGrass.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "grass.jpg", scene );
            this.materialGrass.diffuseTexture.wrapU = 5.0;      //Repeat 5 times on the Vertical Axes
            this.materialGrass.diffuseTexture.wrapV = 5.0;      //Repeat 5 times on the Horizontal Axes
            this.materialGrass.backFaceCulling = false;          //Always show the front and the back of an element

            this.materialGlass = new BABYLON.StandardMaterial( "glass", scene );
            this.materialGlass.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "glass.jpg", scene );
          //this.materialGlass.diffuseColor   = new BABYLON.Color3( 1, 0, 0 ); //Red
            this.materialGlass.alpha = 0.5;
        }
    }


    import * as bz from '..';
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   Specifies the game material.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Material
    {
        public          static              materialTest1           :BABYLON.StandardMaterial           = null;
        public          static              materialMFLogo          :BABYLON.StandardMaterial           = null;
        public          static              materialAmiga           :BABYLON.StandardMaterial           = null;
        public          static              materialGround          :BABYLON.StandardMaterial           = null;
        public          static              materialWood            :BABYLON.StandardMaterial           = null;
        public          static              materialGrass           :BABYLON.StandardMaterial           = null;
        public          static              materialGlass           :BABYLON.StandardMaterial           = null;

        /***************************************************************************************************************
        *   Inits all materials being used in the game.
        ***************************************************************************************************************/
        public static initMaterials( scene:BABYLON.Scene )
        {
            Material.materialTest1 = new BABYLON.StandardMaterial( "test", scene );
            Material.materialTest1.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "test1.jpg", scene );
            Material.materialTest1.emissiveColor = new BABYLON.Color3( 1.0, 1.0, 1.0 );
            Material.materialTest1.diffuseTexture.wrapU = 1;
            Material.materialTest1.diffuseTexture.wrapV = 1;

            Material.materialMFLogo = new BABYLON.StandardMaterial( "amiga", scene );
            Material.materialMFLogo.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "mfLogo.jpg", scene );
            Material.materialMFLogo.emissiveColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            Material.materialMFLogo.diffuseTexture.wrapU = 5;
            Material.materialMFLogo.diffuseTexture.wrapV = 5;

            Material.materialAmiga = new BABYLON.StandardMaterial( "amiga", scene );
            Material.materialAmiga.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "mosaic.jpg", scene );
            Material.materialAmiga.emissiveColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );

            Material.materialGround = new BABYLON.StandardMaterial( "groundMat", scene );
            Material.materialGround.diffuseColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            Material.materialGround.emissiveColor = new BABYLON.Color3( 0.2, 0.2, 0.2 );
            Material.materialGround.backFaceCulling = false;

            Material.materialWood = new BABYLON.StandardMaterial( "wood", bz.Scene.scene );
            Material.materialWood.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "wood.jpg", scene );
            Material.materialWood.emissiveColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );

            Material.materialGrass = new BABYLON.StandardMaterial( "grass", scene );
            Material.materialGrass.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "grass.jpg", scene );
            Material.materialGrass.diffuseTexture.wrapU = 5.0;      //Repeat 5 times on the Vertical Axes
            Material.materialGrass.diffuseTexture.wrapV = 5.0;      //Repeat 5 times on the Horizontal Axes
            Material.materialGrass.backFaceCulling = false;          //Always show the front and the back of an element

            Material.materialGlass = new BABYLON.StandardMaterial( "glass", scene );
            Material.materialGlass.diffuseTexture = new BABYLON.Texture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "glass.jpg", scene );
          //Material.materialGlass.diffuseColor   = new BABYLON.Color3( 1, 0, 0 ); //Red
            Material.materialGlass.alpha = 0.5;
        }
    }

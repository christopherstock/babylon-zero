
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

        /***************************************************************************************************************
        *   Inits all materials being used in the game.
        ***************************************************************************************************************/
        public init( scene:BABYLON.Scene )
        {
            // textures
            this.textureTest   = bz.FactoryMaterial.createTexture( "test.jpg",   1.0, 1.0, 1.0, false, bz.SettingGame.COLOR_WHITE );
            this.textureMfLogo = bz.FactoryMaterial.createTexture( "mfLogo.jpg", 5.0, 5.0, 1.0, false, bz.SettingGame.COLOR_WHITE );
            this.textureAmiga  = bz.FactoryMaterial.createTexture( "amiga.jpg",  1.0, 1.0, 1.0, false, bz.SettingGame.COLOR_WHITE );
            this.textureWood   = bz.FactoryMaterial.createTexture( "wood.jpg",   1.0, 1.0, 1.0, false, bz.SettingGame.COLOR_WHITE );
            this.textureGrass  = bz.FactoryMaterial.createTexture( "grass.jpg",  5.0, 5.0, 1.0, false, bz.SettingGame.COLOR_WHITE );
            this.textureGlass  = bz.FactoryMaterial.createTexture( "glass.jpg",  1.0, 1.0, 0.5, true,  null                       );

            // colors
            this.solidGrey     = bz.FactoryMaterial.createSolid( new BABYLON.Color3( 0.5, 0.5, 0.5 ) );
            this.solidBlack    = bz.FactoryMaterial.createSolid( new BABYLON.Color3( 0.0, 0.0, 0.0 ) );
            this.solidRed      = bz.FactoryMaterial.createSolid( new BABYLON.Color3( 1.0, 0.0, 0.0 ) );
            this.solidGreen    = bz.FactoryMaterial.createSolid( new BABYLON.Color3( 0.0, 1.0, 0.0 ) );
            this.solidBlue     = bz.FactoryMaterial.createSolid( new BABYLON.Color3( 0.0, 0.0, 1.0 ) );
        }
    }

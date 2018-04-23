
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
        ***************************************************************************************************************/
        public static createSolid( color:BABYLON.Color3 )
        {
            let solidMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( "name", bz.Main.game.engine.scene.getScene() );

            solidMaterial.diffuseColor  = color;
            solidMaterial.emissiveColor = color;
            solidMaterial.backFaceCulling = false;

            return solidMaterial;
        }




    }

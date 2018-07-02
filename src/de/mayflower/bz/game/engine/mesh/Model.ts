
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Represents a compund collection of meshes.
    *******************************************************************************************************************/
    export class Model
    {
        /** All meshes that belong to this model. */
        public                                  meshes                  :BABYLON.AbstractMesh[]         = null;

        /** ************************************************************************************************************
        *   Creates a new model.
        *
        *   @param meshes All meshes that belong to this model.
        ***************************************************************************************************************/
        protected constructor( meshes:BABYLON.AbstractMesh[] )
        {
            this.meshes = meshes;
        }
    }

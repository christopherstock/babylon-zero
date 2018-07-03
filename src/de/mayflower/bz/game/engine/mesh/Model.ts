
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Represents a compund collection of meshes.
    *******************************************************************************************************************/
    export class Model
    {
        /** All meshes that belong to this model. */
        private             readonly            meshes                  :BABYLON.AbstractMesh[]             = null;

        /** ************************************************************************************************************
        *   Creates a new model.
        *
        *   @param meshes All meshes that belong to this model.
        ***************************************************************************************************************/
        public constructor( meshes:BABYLON.AbstractMesh[] )
        {
            this.meshes = meshes;
        }

        /** ************************************************************************************************************
        *   Disposes all meshes of this model.
        ***************************************************************************************************************/
        public dispose() : void
        {
            for ( const mesh of this.meshes )
            {
                mesh.dispose();
            }
        }

        /** ************************************************************************************************************
        *   Returns all meshes this model consists of.
        *
        *   TODO Replace with specific methods!
        *
        *   @return All meshes that build up this model.
        ***************************************************************************************************************/
        public getMeshes() : BABYLON.AbstractMesh[]
        {
            return this.meshes;
        }
    }

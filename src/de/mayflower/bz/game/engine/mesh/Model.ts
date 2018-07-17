
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
        *   @return All meshes that build up this model.
        ***************************************************************************************************************/
        public getMeshes() : BABYLON.AbstractMesh[]
        {
            return this.meshes;
        }

        /** ************************************************************************************************************
        *   Scales down the linear velocity by 10 %.
        *   This is mandatory for stopping squares from rolling endlessly.
        ***************************************************************************************************************/
        public lowerLinearVelocity() : void
        {
            for ( const mesh of this.meshes )
            {
                if ( mesh.physicsImpostor != null )
                {
                    mesh.physicsImpostor.setLinearVelocity( mesh.physicsImpostor.getLinearVelocity().scale( 0.99 ) );
                }
            }
        }

        /** ************************************************************************************************************
        *   Scales down the angular velocity by 10 %.
        *   This is mandatory for stopping squares from spinning endlessly.
        ***************************************************************************************************************/
        public lowerAngularVelocity() : void
        {
            for ( const mesh of this.meshes )
            {
                if ( mesh.physicsImpostor != null )
                {
                    mesh.physicsImpostor.setAngularVelocity( mesh.physicsImpostor.getAngularVelocity().scale( 0.99 ) );
                }
            }
        }
    }

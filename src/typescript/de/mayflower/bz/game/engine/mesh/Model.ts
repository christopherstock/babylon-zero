
    import * as BABYLON from 'babylonjs';
    import * as bz      from '../../../index';

    /** ****************************************************************************************************************
    *   Represents a collection of meshes that may be compound.
    *******************************************************************************************************************/
    export class Model
    {
        /** All meshes belonging to this model. */
        private             readonly            meshes                  :BABYLON.AbstractMesh[]             = null;

        /** The compound mesh for all meshes. */
        private                                 compoundParent          :BABYLON.AbstractMesh               = null;

        /** ************************************************************************************************************
        *   Creates a new model.
        *
        *   @param meshes         All meshes that belong to this model.
        *   @param compoundParent The parent mesh of all meshes.
        ***************************************************************************************************************/
        public constructor( meshes:BABYLON.AbstractMesh[], compoundParent:BABYLON.AbstractMesh = null )
        {
            this.meshes         = meshes;
            this.compoundParent = compoundParent;
        }

        /** ************************************************************************************************************
        *   Disposes all meshes of this model.
        ***************************************************************************************************************/
        public dispose() : void
        {
            for ( const mesh of this.meshes )
            {
                mesh.parent = null;
                mesh.dispose();
            }

            if ( this.compoundParent != null )
            {
                this.compoundParent.dispose();
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
        *   Sets visibility for all meshes of this model.
        *   Invisible meshes become non pickable.
        *
        *   @param visible The new visibility for this model.
        ***************************************************************************************************************/
        public setVisible( visible:boolean ) : void
        {
            for ( const mesh of this.meshes )
            {
                mesh.isVisible  = visible;
                mesh.isPickable = visible;
            }
        }

        /** ************************************************************************************************************
        *   Returns the mesh with the specified index.
        *
        *   @param index The index of the mesh to return.
        *
        *   @return The mesh with the specified index.
        ***************************************************************************************************************/
        public getMesh( index:number ) : BABYLON.AbstractMesh
        {
            return this.meshes[ index ];
        }

        /** ************************************************************************************************************
        *   Returns a cloned collection of this models' meshes.
        *
        *   @return All cloned meshes from this model.
        ***************************************************************************************************************/
        public cloneMeshes() : BABYLON.AbstractMesh[]
        {
            const clonedMeshes:BABYLON.AbstractMesh[] = [];

            for ( const mesh of this.meshes )
            {
                clonedMeshes.push( mesh.clone( '', null ) );
            }

            return clonedMeshes;
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

        /** ************************************************************************************************************
        *   Rotates all meshes if this model.
        *
        *   @param rotX The rotation X in degrees.
        *   @param rotY The rotation Y in degrees.
        *   @param rotZ The rotation Z in degrees.
        ***************************************************************************************************************/
        public setAbsoluteRotationXYZ( rotX:number, rotY:number, rotZ:number ) : void
        {
            for ( const mesh of this.getMeshes() )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ
                (
                    mesh,
                    rotX,
                    rotY,
                    rotZ
                );
            }
        }

        /** ************************************************************************************************************
        *   Checks an intersection with the specified model.
        *
        *   @param otherModel The model to check intersection with.
        *
        *   @return If any mesh of this model collides with the specified model.
        ***************************************************************************************************************/
        public intersects( otherModel:bz.Model ) : boolean
        {
            for ( const otherMesh of otherModel.meshes )
            {
                for ( const ownMesh of this.meshes )
                {
                    if ( ownMesh.intersectsMesh( otherMesh ) )
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        /** ************************************************************************************************************
        *   Removed the parent compound mesh from all meshes. This will cause all meshes to collapse.
        ***************************************************************************************************************/
        public removeCompoundParent() : void
        {
            if ( this.compoundParent != null )
            {
                bz.Debug.stage.log( 'Removing compound parent from model' );

                // free all meshes
                for ( const mesh of this.meshes )
                {
                    // free mesh from parent
                    mesh.setParent( null );

                    // apply physics to all cloned meshes
                    bz.Physic.SOLID_WOOD.applyPhysicToMesh
                    (
                        mesh,
                        1.0,
                        BABYLON.PhysicsImpostor.BoxImpostor,
                        bz.Main.game.engine.scene.getScene()
                    );
                    mesh.physicsImpostor.forceUpdate();
                }

                // this.compoundParent.physicsImpostor.forceUpdate();

                // dispose the compound mesh
                this.compoundParent.dispose();
                this.compoundParent = null;
            }
        }
    }

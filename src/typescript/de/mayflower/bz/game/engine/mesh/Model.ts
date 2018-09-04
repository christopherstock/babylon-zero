
    import * as BABYLON from 'babylonjs';
    import * as bz      from '../../../index';

    /** ****************************************************************************************************************
    *   Represents a collection of meshes that may be compound.
    *******************************************************************************************************************/
    export class Model
    {
        /** All meshes belonging to this model. */
        private             readonly            meshes                  :BABYLON.AbstractMesh[]             = null;

        /** The physical impostors for all meshes of this model. */
        private                                 impostors               :bz.PhysicImpostorParams[]          = null;
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
        *   Performs a ray collision check on all meshes and returns the babylon.JS picking information.
        *
        *   @param ray The ray to check for intersections on all meshes.
        *
        *   @return The babylon.JS picking data that contains the collision information.
        ***************************************************************************************************************/
        public applyRayCollision( ray:BABYLON.Ray ) : BABYLON.PickingInfo[]
        {
            return ray.intersectsMeshes( this.meshes );
        }

        /** ************************************************************************************************************
        *   Applies the specified shadow generator to all of this model's meshes.
        *
        *   @param shadowGenerator The shadow generator to add all meshes to.
        ***************************************************************************************************************/
        public applyShadowGenerator( shadowGenerator:BABYLON.ShadowGenerator ) : void
        {
            for ( const mesh of this.meshes )
            {
                shadowGenerator.getShadowMap().renderList.push( mesh );
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
                // remove physical impostors of all meshes if still present
                if ( mesh.physicsImpostor != null )
                {
                    mesh.physicsImpostor.dispose();
                    mesh.physicsImpostor = null;
                }

                // clone this mesh ( without a physics impostor )
                const clonedMesh:BABYLON.AbstractMesh = mesh.clone( '', null );
                clonedMeshes.push( clonedMesh );
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
            if ( this.compoundParent != null )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ( this.compoundParent, rotX, rotY, rotZ );
            }
            else
            {
                for ( const mesh of this.meshes )
                {
                    bz.MeshManipulation.setAbsoluteRotationXYZ( mesh, rotX, rotY, rotZ );
                }
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
        *   All meshes will be equipped with their original physics impostor.
        *
        *   @param scene The scene to create the new physics impostor in.
        ***************************************************************************************************************/
        public removeCompoundParent( scene:BABYLON.Scene ) : void
        {
            if ( this.compoundParent != null )
            {
                bz.Debug.physic.log( 'Removing compound parent from model' );

                // free all meshes from parent compound
                for ( const mesh of this.meshes )
                {
                    // free mesh from parent
                    mesh.setParent( null );
                }

                // apply physics to all cloned meshes TODO apply ORIGINAL impostors???
                for ( let i:number = 0; i < this.meshes.length; ++i )
                {
                    if ( this.impostors[ i ] == null )
                    {
                        bz.Debug.physic.log( ' Applying DEFAULT impostor to SCATTERED mesh ' );

                        bz.Physic.SOLID_WOOD.applyPhysicToMesh
                        (
                            this.meshes[ i ],
                            1.0,
                            BABYLON.PhysicsImpostor.BoxImpostor,
                            bz.Main.game.engine.scene.getScene()
                        );
                    }
                    else
                    {
                        bz.Debug.physic.log
                        (
                            ' Applying impostor to SCATTERED mesh '
                            + '[' + this.impostors[ i ].type        + ']'
                            + '[' + this.impostors[ i ].mass        + ']'
                            + '[' + this.impostors[ i ].friction    + ']'
                            + '[' + this.impostors[ i ].restitution + ']'
                        );

                        this.meshes[ i ].physicsImpostor = new BABYLON.PhysicsImpostor
                        (
                            this.meshes[ i ],
                            this.impostors[ i ].type,
                            {
                                mass:        this.impostors[ i ].mass,
                                friction:    this.impostors[ i ].friction,
                                restitution: this.impostors[ i ].restitution,
                            },
                            scene
                        );
                    }

                    // update physics for all meshes
                    this.meshes[ i ].physicsImpostor.forceUpdate();
                }

                // compound parent doesn't need to be updated
                // this.compoundParent.physicsImpostor.forceUpdate();

                // dispose the compound mesh
                this.compoundParent.dispose();
                this.compoundParent = null;
            }
        }

        public saveImpostors( impostors:bz.PhysicImpostorParams[] ) : void
        {
            this.impostors = impostors;
        }

        /** ************************************************************************************************************
        *   Extracts all impostor parameters for all meshes of this model.
        ***************************************************************************************************************/
        public extractPhysicsImpostors() : void
        {
            this.impostors = [];

            for ( const mesh of this.meshes )
            {
                if ( mesh.physicsImpostor != null )
                {
                    this.impostors.push( new bz.PhysicImpostorParams( mesh.physicsImpostor ) );
                }
                else
                {
                    this.impostors.push( null );
                }
            }
        }

        /** ************************************************************************************************************
        *   Returns the physics impostors of all meshes of this model.
        *
        *   @return The physics impostor parameters of all meshes.
        ***************************************************************************************************************/
        public getImpostors() : bz.PhysicImpostorParams[]
        {
            return this.impostors;
        }

        /** ************************************************************************************************************
        *   Assigns all physical impostors onto the specified meshes.
        *
        *   @param meshes    The meshes where the physical impostors shall be applied.
        *   @param impostors The impostors to assign to the specified meshes
        *   @param scene     The scene where a new physical impostor may be added to.
        ***************************************************************************************************************/
        public static assignImpostors
        (
            meshes    :BABYLON.AbstractMesh[],
            impostors :bz.PhysicImpostorParams[],
            scene     :BABYLON.Scene
        )
        : void
        {
            bz.Debug.physic.log( 'Applying impostors to cloned meshes:' );

            for ( let i:number = 0; i < meshes.length; ++i )
            {
                const mesh     :BABYLON.AbstractMesh    = meshes[ i ];
                const impostor :bz.PhysicImpostorParams = impostors[ i ];

                if ( impostor != null )
                {
                    bz.Debug.physic.log
                    (
                        ' Applying impostor to mesh '
                        + '[' + impostor.type        + ']'
                        + '[' + impostor.mass        + ']'
                        + '[' + impostor.friction    + ']'
                        + '[' + impostor.restitution + ']'
                    );

                    mesh.physicsImpostor = new BABYLON.PhysicsImpostor
                    (
                        mesh,
                        impostor.type,
                        {
                            mass:        impostor.mass,
                            friction:    impostor.friction,
                            restitution: impostor.restitution,
                        },
                        scene
                    );
                }
            }
        }
    }

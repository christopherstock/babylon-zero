
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
        private                                 compoundMesh            :BABYLON.AbstractMesh               = null;

        /** ************************************************************************************************************
        *   Creates a new model consisting of the specified meshes.
        *
        *   @param meshes All meshes that belong to this model.
        ***************************************************************************************************************/
        public constructor( meshes:BABYLON.AbstractMesh[] )
        {
            this.meshes = meshes;
        }

        /** ************************************************************************************************************
        *   Creates and applies a compound parent to this model.
        *
        *   @param position The position for the compound parent to appear.
        *   @param scene    The scene for the new compound parent to be created in.
        ***************************************************************************************************************/
        public addCompoundParent( position:BABYLON.Vector3, scene:BABYLON.Scene ) : void
        {
            // create compound mesh
            this.compoundMesh = bz.MeshFactory.createBox
            (
                position,
                bz.MeshPivotAnchor.CENTER_XYZ,
                new BABYLON.Vector3( 0.001, 0.001, 0.001 ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Texture.WALL_GRASS,
                null,
                bz.Main.game.engine.scene.getScene(),
                bz.Physic.NONE,
                1.0,
                BABYLON.Color3.Red()
            );

            // set compound as parent
            for ( const mesh of this.meshes )
            {
                mesh.setParent( this.compoundMesh );
            }

            // set physics for compound
            bz.Physic.SOLID_WOOD.applyPhysicToMesh
            (
                this.compoundMesh,
                1.0,
                BABYLON.PhysicsImpostor.BoxImpostor,
                scene
            );
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

            if ( this.compoundMesh != null )
            {
                this.compoundMesh.dispose();
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
            if ( this.compoundMesh != null )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ( this.compoundMesh, rotX, rotY, rotZ );
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
            if ( this.compoundMesh != null )
            {
                bz.Debug.physic.log( 'Removing compound parent from model' );

                // free all meshes from parent compound
                for ( const mesh of this.meshes )
                {
                    // free mesh from parent
                    mesh.setParent( null );
                }

                // apply physics to all cloned meshes
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
                this.compoundMesh.dispose();
                this.compoundMesh = null;
            }
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
                    this.impostors.push( bz.PhysicImpostorParams.fromImpostor( mesh.physicsImpostor ) );
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
        *   Returns the number of meshes this model consists of.
        *
        *   @return The mesh count of this model.
        ***************************************************************************************************************/
        public getMeshCount() : number
        {
            return this.meshes.length;
        }

        /** ************************************************************************************************************
        *   Assigns all physical impostors onto the meshes of this model.
        *
        *   @param impostors The impostors to assign to this model's meshes
        *   @param scene     The scene where the new physical impostors are added to.
        ***************************************************************************************************************/
        public assignImpostors( impostors:bz.PhysicImpostorParams[], scene:BABYLON.Scene ) : void
        {
            bz.Debug.physic.log( 'Applying impostors to cloned meshes:' );

            // save impostors for later use ( e.g. when the model scatters )
            this.impostors = impostors;

            // browse all meshes and apply impostors to each mesh
            for ( let i:number = 0; i < this.meshes.length; ++i )
            {
                const mesh     :BABYLON.AbstractMesh    = this.meshes[ i ];
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

                    impostor.applyPhysicsImpostor( mesh, scene );
                }
            }
        }

        /** ************************************************************************************************************
        *   Translates all meshes of the model.
        *
        *   @param translation The translation to apply onto this model.
        ***************************************************************************************************************/
        public translatePosition( translation:BABYLON.Vector3 ) : void
        {
            for ( const mesh of this.meshes )
            {
                bz.MeshManipulation.translatePosition( mesh, translation )
            }
        }

        /** ************************************************************************************************************
        *   Returns a cloned instance of this model.
        *   The cloned model does NOT contain any physical impostors!
        *
        *   @return A cloned instance of this model.
        ***************************************************************************************************************/
        public clone() : Model
        {
            const clonedMeshes:BABYLON.AbstractMesh[] = this.cloneMeshes();

            // setup all cloned meshes
            for ( const clonedMesh of clonedMeshes )
            {
                clonedMesh.id = bz.MeshFactory.createNextMeshId();

                // show this mesh
                clonedMesh.visibility = 1.0;

                // specify debug settings for the cloned mesh
                clonedMesh.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;
                clonedMesh.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;
                clonedMesh.isPickable = true;
            }

            return new bz.Model( clonedMeshes );
        }

        /** ************************************************************************************************************
        *   Returns a cloned collection of this models' meshes.
        *   All physic impostors are gone on all cloned meshes.
        *
        *   @return All cloned meshes from this model.
        ***************************************************************************************************************/
        private cloneMeshes() : BABYLON.AbstractMesh[]
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
    }


    // noinspection JSUnusedGlobalSymbols

    import * as bz from '../../../..';

    /** ****************************************************************************************************************
    *   Represents a collection of meshes that may be compound.
    *******************************************************************************************************************/
    export class Model
    {
        /** All meshes belonging to this model. */
        private             readonly            meshes                  :BABYLON.AbstractMesh[]             = null;

        /** The compound mesh for all meshes. */
        private                                 compoundMesh            :BABYLON.AbstractMesh               = null;
        /** The physical impostors for all meshes of this model. */
        private                                 impostors               :bz.PhysicImpostorParams[]          = null;

        /** Specifies if the compound enables single meshes to be shot off. */
        private                                 enableSingleShotOffs    :boolean                            = false;

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
        *   Disposes all meshes of this model.
        ***************************************************************************************************************/
        public dispose() : void
        {
            for ( const mesh of this.meshes )
            {
                mesh.parent = null;
                mesh.dispose();
            }

            if ( this.compoundMesh !== null )
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
            return ray.intersectsMeshes(
                this.meshes as any
            );
        }

        /** ************************************************************************************************************
        *   Applies the specified shadow generator onto all meshes of this model.
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
        *   Translates all meshes of the model by the given delta.
        *
        *   @param delta The translation to apply onto this model.
        ***************************************************************************************************************/
        public translatePosition( delta:BABYLON.Vector3 ) : void
        {
            for ( const mesh of this.meshes )
            {
                bz.MeshManipulation.translatePosition( mesh, delta )
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
            if ( this.compoundMesh !== null )
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
        *   Creates and applies a compound parent to all meshes of this model.
        *
        *   @param scene                The scene for the new compound parent to be created in.
        *   @param position             The position for the compound parent to appear.
        *   @param enableSingleShotOffs Specifies if the compound enables single meshes to be shot off.
        ***************************************************************************************************************/
        public addCompoundMesh( scene:bz.Scene, position:BABYLON.Vector3, enableSingleShotOffs:boolean ) : void
        {
            this.enableSingleShotOffs = enableSingleShotOffs;

            this.compoundMesh = new bz.MeshFactory( scene ).createBox
            (
                position,
                bz.MeshPositionAnchor.CENTER_XYZ,
                new BABYLON.Vector3( 0.001, 0.001, 0.001 ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Texture.WALL_GRASS,
                null,
                bz.PhysicBehaviour.NONE,
                1.0,
                BABYLON.Color3.Red()
            );

            // set the compound mesh as parent for all meshes
            for ( const mesh of this.meshes )
            {
                mesh.setParent( this.compoundMesh );
            }

            // set physics for compound
            bz.PhysicBehaviour.COMPOUND.applyPhysicToMesh
            (
                scene.getNativeScene(),
                this.compoundMesh,
                1.0,
                BABYLON.PhysicsImpostor.BoxImpostor
            );
        }

        /** ************************************************************************************************************
        *   Removed the parent compound mesh from all meshes. This will cause all meshes to collapse.
        *   All meshes will be equipped with their original physics impostor.
        *
        *   @param scene The scene to create the new physics impostor in.
        ***************************************************************************************************************/
        public removeCompoundMesh( scene:BABYLON.Scene ) : void
        {
            if ( this.compoundMesh !== null )
            {
                bz.Debug.physic.log( 'Removing compound parent from model' );

                // remove the compound from all meshes
                for ( let i:number = 0; i < this.meshes.length; ++i )
                {
                    this.removeCompoundMeshFromMesh( scene, i );
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
                if ( mesh.physicsImpostor !== undefined )
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
        *   Assigns all physical impostors onto the meshes of this model.
        *
        *   @param scene     The scene where the new physical impostors are added to.
        *   @param impostors The impostors to assign to this model's meshes
        ***************************************************************************************************************/
        public assignImpostors( scene:BABYLON.Scene, impostors:bz.PhysicImpostorParams[] ) : void
        {
            bz.Debug.physic.log( 'Applying impostors to cloned meshes:' );

            // save impostors for later use ( e.g. when the model scatters )
            this.impostors = impostors;

            // browse all meshes and apply impostors to each mesh
            for ( let i:number = 0; i < this.meshes.length; ++i )
            {
                const mesh     :BABYLON.AbstractMesh    = this.meshes[ i ];
                const impostor :bz.PhysicImpostorParams = impostors[ i ];

                if ( impostor !== null )
                {
                    bz.Debug.physic.log
                    (
                        ' Applying impostor to mesh '
                        + '[' + String( impostor.type        ) + ']'
                        + '[' + String( impostor.mass        ) + ']'
                        + '[' + String( impostor.friction    ) + ']'
                        + '[' + String( impostor.restitution ) + ']'
                    );

                    impostor.applyPhysicsImpostor( mesh, scene );
                }
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
                clonedMesh.isVisible = true;

                // specify debug settings for the cloned mesh
                clonedMesh.checkCollisions = bz.SettingDebug.DEBUG_CAMERA_ENABLE_COLLISIONS;
                clonedMesh.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;
                clonedMesh.isPickable = true;
            }

            return new bz.Model( clonedMeshes );
        }

        /** ************************************************************************************************************
        *   Darkens all meshes according to the given ratio.
        *
        *   @param scene The babylon.JS scene to create new materials for.
        *   @param ratio The ratio for the current mesh color to darken.
        ***************************************************************************************************************/
        public darkenMeshes( scene:BABYLON.Scene, ratio:number ) : void
        {
            for ( const mesh of this.meshes )
            {
                // handle default material
                if ( mesh.material instanceof BABYLON.StandardMaterial )
                {
                    const numberToSubtract    :number                   = ratio; // 0.025 * bz.MathUtil.getRandomInt();

                    const oldStandardMaterial :BABYLON.StandardMaterial = mesh.material;
                    const oldAmbientColor     :BABYLON.Color3           = oldStandardMaterial.ambientColor;
                    const oldR                :number                   = oldAmbientColor.r;
                    const oldG                :number                   = oldAmbientColor.g;
                    const oldB                :number                   = oldAmbientColor.b;

                    const newR                :number                   = oldR - numberToSubtract;
                    const newG                :number                   = oldG - numberToSubtract;
                    const newB                :number                   = oldB - numberToSubtract;
                    const newAmbientColor     :BABYLON.Color3           = new BABYLON.Color3( newR, newG, newB );
                    const newStandardMaterial :BABYLON.StandardMaterial = new BABYLON.StandardMaterial
                    (
                        bz.MaterialSystem.createNextMaterialId(),
                        scene
                    );
                    newStandardMaterial.ambientColor    = newAmbientColor;
                    newStandardMaterial.backFaceCulling = false;

                    // console.log( ' > old ambient [' + oldStandardMaterial.ambientColor  + ']' );
                    // console.log( ' > number to substract [' + numberToSubtract + ']' );
                    // console.log( ' > new ambient [' + newStandardMaterial.ambientColor  + ']' );

                    mesh.material = newStandardMaterial;
                }
/*
                let multiMaterial:BABYLON.MultiMaterial = ( mesh.material as BABYLON.MultiMaterial );
                var blackMaterial = new BABYLON.StandardMaterial( 'mat2', bz.Main.game.engine.scene.getScene() );
                blackMaterial.emissiveColor = new BABYLON.Color3( 0.0, 0, 0.0 );
                multiMaterial.subMaterials.push( blackMaterial );
*/
            }
        }

        /** ************************************************************************************************************
        *   Shots off the specified mesh from the compound.
        *
        *   @param scene The native babylon.JS scene.
        *   @param mesh  The mesh to shot off the compound.
        ***************************************************************************************************************/
        public shotOffCompound( scene:BABYLON.Scene, mesh:BABYLON.AbstractMesh ) : void
        {
            if ( this.enableSingleShotOffs )
            {
                bz.Debug.fire.log( 'Shot off one mesh from the compound ..' );

                // remove the compound from all meshes
                for ( let i:number = 0; i < this.meshes.length; ++i )
                {
                    if ( this.meshes[ i ] === mesh )
                    {
                        bz.Debug.fire.log( 'Mesh to shot off adressed..' );

                        this.removeCompoundMeshFromMesh( scene, i );

                        break;
                    }
                }
            }
        }

        /** ************************************************************************************************************
        *   Scales down the linear and angular velocities of all SPHERICAL meshes this model consists of by one percent.
        ***************************************************************************************************************/
        public lowerSphereVelocities() : void
        {
            for ( const mesh of this.meshes )
            {
                if
                (
                       mesh.physicsImpostor             !== undefined
                    && mesh.physicsImpostor.physicsBody !== null
                    && mesh.physicsImpostor.type        === BABYLON.PhysicsImpostor.SphereImpostor
                )
                {
                    mesh.physicsImpostor.setLinearVelocity(  mesh.physicsImpostor.getLinearVelocity().scale(  0.99 ) );
                    mesh.physicsImpostor.setAngularVelocity( mesh.physicsImpostor.getAngularVelocity().scale( 0.99 ) );
                }
            }
        }

        /** ************************************************************************************************************
        *   Scales down the linear velocity of all meshes this model consists of by one percent.
        ***************************************************************************************************************/
        public lowerLinearVelocity() : void
        {
            for ( const mesh of this.meshes )
            {
                if ( mesh.physicsImpostor !== undefined && mesh.physicsImpostor.physicsBody !== null )
                {
                    mesh.physicsImpostor.setLinearVelocity( mesh.physicsImpostor.getLinearVelocity().scale( 0.99 ) );
                }
            }
        }

        /** ************************************************************************************************************
        *   Scales down the angular velocity of all meshes this model consists of by one percent.
        ***************************************************************************************************************/
        public lowerAngularVelocity() : void
        {
            for ( const mesh of this.meshes )
            {
                if ( mesh.physicsImpostor !== undefined && mesh.physicsImpostor.physicsBody !== null )
                {
                    mesh.physicsImpostor.setAngularVelocity( mesh.physicsImpostor.getAngularVelocity().scale( 0.99 ) );
                }
            }
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
                if ( mesh.physicsImpostor !== undefined )
                {
                    mesh.physicsImpostor.dispose();
                    mesh.physicsImpostor = null;
                }

                // clone this mesh ( without a physics impostor )
                const clonedMesh:BABYLON.AbstractMesh = mesh.clone( mesh.name, null );
                clonedMeshes.push( clonedMesh );
            }

            return clonedMeshes;
        }

        /** ************************************************************************************************************
        *   Frees the mesh with the specified index from the compound parent
        *   and reassigns its original physical impostor.
        *
        *   @param scene The babylon.JS scene where a new impostor is potentially created.
        *   @param index The index of the mesh to free from the compound.
        ***************************************************************************************************************/
        private removeCompoundMeshFromMesh( scene:BABYLON.Scene, index:number ) : void
        {
            const mesh:     BABYLON.AbstractMesh    = this.meshes[    index ];
            const impostor: bz.PhysicImpostorParams = this.impostors[ index ];

            // only if this mesh has a parent compound.
            if ( mesh.parent !== null )
            {
                // free mesh from parent
                mesh.setParent( null );

                // apply impostor
                if ( impostor === null )
                {
                    bz.Debug.physic.log( ' Applying DEFAULT impostor to SCATTERED mesh ' );

                    bz.PhysicBehaviour.SOLID_WOOD.applyPhysicToMesh
                    (
                        scene,
                        mesh,
                        1.0,
                        BABYLON.PhysicsImpostor.BoxImpostor
                    );
                }
                else
                {
                    bz.Debug.physic.log
                    (
                        ' Applying impostor to SCATTERED mesh '
                        + '[' + String( impostor.type        ) + ']'
                        + '[' + String( impostor.mass        ) + ']'
                        + '[' + String( impostor.friction    ) + ']'
                        + '[' + String( impostor.restitution ) + ']'
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

                // update physics for all meshes
                mesh.physicsImpostor.forceUpdate();
            }
        }
    }

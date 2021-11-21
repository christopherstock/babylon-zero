// noinspection JSUnusedGlobalSymbols

import * as bz from '../../../..';

/** ********************************************************************************************************************
*   Represents a collection of meshes that may be compound.
***********************************************************************************************************************/
export class Model
{
    /** All meshes belonging to this model. */
    private readonly meshes                 :BABYLON.AbstractMesh[]             = null;

    /** The compound mesh for all meshes. */
    private          compoundMesh           :BABYLON.AbstractMesh               = null;
    /** The physical impostors for all meshes of this model. */
    private          impostors              :bz.PhysicImpostorParams[]          = null;

    /** Specifies if the compound enables single meshes to be shot off. */
    private          enableSingleShotOffs   :boolean                            = false;
    /** The physics set for this model if any. */
    private          physicSet              :bz.PhysicSet                       = null;

    /** ****************************************************************************************************************
    *   Creates a new model consisting of the specified meshes.
    *
    *   @param meshes All meshes that belong to this model.
    *******************************************************************************************************************/
    public constructor( meshes:BABYLON.AbstractMesh[] = [] )
    {
        this.meshes = meshes;
    }

    /** ****************************************************************************************************************
    *   Returns the mesh with the specified index.
    *
    *   @param index The index of the mesh to return.
    *
    *   @return The mesh with the specified index.
    *******************************************************************************************************************/
    public getMesh( index:number ) : BABYLON.AbstractMesh
    {
        return this.meshes[ index ];
    }

    /** ****************************************************************************************************************
    *   Returns the physics impostors of all meshes of this model.
    *
    *   @return The physics impostor parameters of all meshes.
    *******************************************************************************************************************/
    public getImpostors() : bz.PhysicImpostorParams[]
    {
        return this.impostors;
    }

    /** ****************************************************************************************************************
    *   Returns the number of meshes this model consists of.
    *
    *   @return The mesh count of this model.
    *******************************************************************************************************************/
    public getMeshCount() : number
    {
        return this.meshes.length;
    }

    /** ****************************************************************************************************************
    *   Disposes all meshes of this model.
    *******************************************************************************************************************/
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

    /** ****************************************************************************************************************
    *   Sets visibility for all meshes of this model.
    *   Invisible meshes become non pickable.
    *
    *   @param visible The new visibility for this model.
    *******************************************************************************************************************/
    public setVisible( visible:boolean ) : void
    {
        for ( const mesh of this.meshes )
        {
            mesh.isVisible  = visible;
            mesh.isPickable = visible;
        }
    }

    /** ****************************************************************************************************************
    *   Performs a ray collision check on all meshes and returns the babylon.JS picking information.
    *
    *   @param ray The ray to check for intersections on all meshes.
    *
    *   @return The babylon.JS picking data that contains the collision information.
    *******************************************************************************************************************/
    public applyRayCollision( ray:BABYLON.Ray ) : BABYLON.PickingInfo[]
    {
        return ray.intersectsMeshes(
            this.meshes as any
        );
    }

    /** ****************************************************************************************************************
    *   Applies the specified shadow generator onto all meshes of this model.
    *
    *   @param shadowGenerator The shadow generator to add all meshes to.
    *******************************************************************************************************************/
    public applyShadowGenerator( shadowGenerator:BABYLON.ShadowGenerator ) : void
    {
        for ( const mesh of this.meshes )
        {
            shadowGenerator.getShadowMap().renderList.push( mesh );
        }
    }

    /** ****************************************************************************************************************
    *   Translates all meshes of the model by the given delta.
    *
    *   @param delta The translation to apply onto this model.
    *******************************************************************************************************************/
    public translatePosition( delta:BABYLON.Vector3 ) : void
    {
        for ( const mesh of this.meshes )
        {
            bz.MeshManipulation.translatePosition( mesh, delta )
        }
    }

    /** ****************************************************************************************************************
    *   Scales all meshes of the model by the given ratio.
    *
    *   @param ratio The scale ratio to apply to all three axes.
    *******************************************************************************************************************/
    public scaleSize( ratio:BABYLON.Vector3 ) : void
    {
        for ( const mesh of this.meshes )
        {
            bz.MeshManipulation.scaleSize( mesh, ratio )
        }
    }

    /** ****************************************************************************************************************
    *   Rotates all meshes of this model around the model's center point.
    *
    *   @param rotX The rotation X in degrees.
    *   @param rotY The rotation Y in degrees.
    *   @param rotZ The rotation Z in degrees.
    *******************************************************************************************************************/
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

    /** ****************************************************************************************************************
    *   Rotates all meshes of this model along axis X around the given point.
    *
    *   @param y    Pivot point Y.
    *   @param z    Pivot point Z.
    *   @param rotX The rotation X in degrees to apply.
    *******************************************************************************************************************/
    public rotateAroundAxisX( y:number, z:number, rotX:number ) : void
    {
        for ( const mesh of this.meshes )
        {
            bz.MeshManipulation.rotateAroundAxisX( mesh, y, z,rotX );
        }
    }

    /** ****************************************************************************************************************
    *   Rotates all meshes of this model along axis Y around the given point.
    *
    *   @param x    Pivot point X.
    *   @param z    Pivot point Z.
    *   @param rotY The rotation Y in degrees to apply.
    *******************************************************************************************************************/
    public rotateAroundAxisY( x:number, z:number, rotY:number ) : void
    {
        for ( const mesh of this.meshes )
        {
            bz.MeshManipulation.rotateAroundAxisY( mesh, x, z,rotY );
        }
    }

    /** ****************************************************************************************************************
    *   Rotates all meshes of this model along axis Z around the given point.
    *
    *   @param x    Pivot point X.
    *   @param y    Pivot point Y.
    *   @param rotZ The rotation Z in degrees to apply.
    *******************************************************************************************************************/
    public rotateAroundAxisZ( x:number, y:number, rotZ:number ) : void
    {
        for ( const mesh of this.meshes )
        {
            bz.MeshManipulation.rotateAroundAxisZ( mesh, x, y,rotZ );
        }
    }

    /** ****************************************************************************************************************
    *   Checks an intersection with the specified model.
    *
    *   @param otherModel The model to check intersection with.
    *
    *   @return If any mesh of this model collides with the specified model.
    *
    *   @deprecated Expensive as all meshes of both models are checked for intersection with all others.
    *******************************************************************************************************************/
    public intersectsOtherModel( otherModel:bz.Model ) : boolean
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

    /** ****************************************************************************************************************
    *   Creates and applies a compound parent to all meshes of this model.
    *
    *   @param scene                The scene for the new compound parent to be created in.
    *   @param position             The position for the compound parent to appear.
    *   @param enableSingleShotOffs Specifies if the compound enables single meshes to be shot off.
    *******************************************************************************************************************/
    public addCompoundMesh( scene:bz.Scene, position:BABYLON.Vector3, enableSingleShotOffs:boolean ) : void
    {
        this.enableSingleShotOffs = enableSingleShotOffs;

        /** Implicit depth for 2D faces */
        const COMPOUND_MESH_SIZE :number = 0.001;

        this.compoundMesh = new bz.MeshFactory( scene, BABYLON.Color3.Red() ).createBox
        (
            position,
            bz.TextureFile.WALL_GRASS_1,
            new BABYLON.Vector3(
                COMPOUND_MESH_SIZE,
                COMPOUND_MESH_SIZE,
                COMPOUND_MESH_SIZE
            )
        );

        // set the compound mesh as parent for all meshes
        for ( const mesh of this.meshes )
        {
            mesh.setParent( this.compoundMesh );
        }

        // set physics for compound
        new bz.PhysicBody( bz.PhysicSet.SYNTHETIC_IMPOSTOR ).applyPhysicToMesh
        (
            scene.getNativeScene(),
            this.compoundMesh,
            BABYLON.PhysicsImpostor.BoxImpostor
        );
    }

    /** ****************************************************************************************************************
    *   Removed the parent compound mesh from all meshes. This will cause all meshes to collapse.
    *   All meshes will be equipped with their original physics impostor.
    *
    *   @param scene The scene to create the new physics impostor in.
    *******************************************************************************************************************/
    public removeCompoundMesh( scene:BABYLON.Scene ) : void
    {
        if ( this.compoundMesh !== null )
        {
            bz.Debug.physic.log( 'Remove compound parent from model' );

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

    /** ****************************************************************************************************************
    *   Removed the physical 'static' state of all meshes by setting a physical mass for all meshes.
    *******************************************************************************************************************/
    public removeStaticState() : void
    {
        bz.Debug.physic.log( 'Remove static state from model ' );

        for ( const mesh of this.meshes )
        {
            // only consider STATIC meshes
            if ( mesh.physicsImpostor.mass === 0 )
            {
                // determine and set original physical mass
                let newMass :number = 0;
                if ( this.physicSet !== null )
                {
                    newMass = this.physicSet.weight;
                }
                else
                {
                    newMass = 1.0;
                }
                bz.Debug.physic.log( ' Apply new mass to mesh [' + String( newMass ) + ']' );
                mesh.physicsImpostor.mass = newMass;

                // reset pivot point
                mesh.setPivotPoint( new BABYLON.Vector3( 0.0, 0.0, 0.0 ), BABYLON.Space.LOCAL );

                // no effect
                // mesh.physicsImpostor.forceUpdate();
            }
        }
    }

    /** ****************************************************************************************************************
    *   Changes the specified texture inside this model to a different one.
    *
    *   @param scene Type scene reference.
    *   @param from  Resource string of the Texture to change.
    *   @param to    Resource string of the new Texture to apply.
    *
    *   @return A reference to this Model instance.
    *******************************************************************************************************************/
    public changeTexture( scene:bz.Scene, from:string, to:string ) : bz.Model
    {
        // browse all meshes
        for ( const mesh of this.meshes )
        {
            // get existing material
            const material :BABYLON.StandardMaterial = mesh.material as BABYLON.StandardMaterial;
            const texture  :BABYLON.Texture          = material.diffuseTexture as BABYLON.Texture;

            // check source texture
            if ( texture.url === from )
            {
                const newMaterial :BABYLON.StandardMaterial = mesh.material.clone(
                    'ChangedTextureMaterial' + bz.MeshFactory.createNextMeshId()
                ) as BABYLON.StandardMaterial;

                newMaterial.diffuseTexture = null;
                newMaterial.diffuseTexture = new BABYLON.Texture(
                    to,
                    scene.getNativeScene()
                );

                mesh.material = null;
                mesh.material = newMaterial;
            }
        }

        return this;
    }

    /** ****************************************************************************************************************
    *   Extracts all impostor parameters for all meshes of this model.
    *******************************************************************************************************************/
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

    /** ****************************************************************************************************************
    *   Assigns all physical impostors onto the meshes of this model.
    *
    *   @param scene     The scene where the new physical impostors are added to.
    *   @param impostors The impostors to assign to this model's meshes
    *******************************************************************************************************************/
    public assignImpostors( scene:BABYLON.Scene, impostors:bz.PhysicImpostorParams[] ) : void
    {
        bz.Debug.physic.log( 'Apply impostors to cloned meshes:' );

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
                    ' Apply impostor to mesh '
                    + '[' + String( impostor.type        ) + ']'
                    + '[' + String( impostor.mass        ) + ']'
                    + '[' + String( impostor.friction    ) + ']'
                    + '[' + String( impostor.restitution ) + ']'
                );

                impostor.applyPhysicsImpostor( mesh, scene );
            }
        }
    }

    /** ****************************************************************************************************************
    *   Returns a cloned instance of this model.
    *   The cloned model does NOT contain any physical impostors!
    *
    *   @return A cloned instance of this model.
    *******************************************************************************************************************/
    public clone( physicSet:bz.PhysicSet ) : Model
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

        const model :bz.Model = new bz.Model( clonedMeshes );
        model.physicSet = physicSet;
        return model;
    }

    /** ****************************************************************************************************************
    *   Darkens all meshes according to the given ratio.
    *
    *   @param scene          The babylon.JS scene to create new materials for.
    *   @param darkeningAlpha Darkening ratio to set. From 0.0 (no darkening) to 1.0 (black).
    *******************************************************************************************************************/
    public setMeshDarkening( scene:BABYLON.Scene, darkeningAlpha:number ) : void
    {
        for ( const mesh of this.meshes )
        {
            mesh.overlayColor  = BABYLON.Color3.Black();
            mesh.renderOverlay = true;
            mesh.overlayAlpha  = darkeningAlpha;
        }
    }

    /** ****************************************************************************************************************
    *   Shots off the specified mesh from the compound.
    *
    *   @param scene The native babylon.JS scene.
    *   @param mesh  The mesh to shot off the compound.
    *******************************************************************************************************************/
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

    /** ****************************************************************************************************************
    *   Mitigates the linear and angular velocities of all SPHERICAL meshes this model consists of by one percent.
    *******************************************************************************************************************/
    public mitigateSphereVelocities() : void
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

    /** ****************************************************************************************************************
    *   Mitigates the linear velocity of all meshes this model consists of by one percent.
    *******************************************************************************************************************/
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

    /** ****************************************************************************************************************
    *   Mitigates the angular velocity of all meshes this model consists of by one percent.
    *******************************************************************************************************************/
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

    public sliceMesh(
        scene:BABYLON.Scene,
        mesh:BABYLON.Mesh,
        slicePoint:BABYLON.Vector3,
        sliceRotation:BABYLON.Vector3
    )
    : void
    {
        const boxSlicerSize :number = 100;
        const boxSlicer :BABYLON.Mesh = BABYLON.Mesh.CreateBox( 'boxSlicer', boxSlicerSize, scene );
        boxSlicer.rotation = sliceRotation;
        boxSlicer.position = new BABYLON.Vector3(
            0.5 * boxSlicerSize + slicePoint.x, slicePoint.y, 0.5 * boxSlicerSize + slicePoint.z
        );

        const meshCSG      :BABYLON.CSG  = BABYLON.CSG.FromMesh( mesh );
        const slicerCSG    :BABYLON.CSG  = BABYLON.CSG.FromMesh( boxSlicer );
        const meshSliceSub :BABYLON.Mesh = meshCSG.subtract(slicerCSG).toMesh(mesh.name + '_slice_left');
        meshSliceSub.physicsImpostor = new BABYLON.PhysicsImpostor(
            meshSliceSub,
            BABYLON.PhysicsImpostor.BoxImpostor,
            {mass: 10, restitution: 0.5},
            scene
        );
        const meshSliceInt :BABYLON.Mesh = meshCSG.intersect(slicerCSG).toMesh(mesh.name + '_slice_right');
        meshSliceInt.physicsImpostor = new BABYLON.PhysicsImpostor( meshSliceInt,
            BABYLON.PhysicsImpostor.BoxImpostor,
            {mass: 10, restitution: 0.5},
            scene
        );

        // prune old mesh!
        if ( false ) mesh.dispose();
        boxSlicer.dispose();

        console.log( '  meshes in this model: ' + this.meshes.length );



    }

    /** ****************************************************************************************************************
    *   Returns a cloned collection of this models' meshes.
    *   All physic impostors are gone on all cloned meshes.
    *
    *   @return All cloned meshes from this model.
    *******************************************************************************************************************/
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

    /** ****************************************************************************************************************
    *   Frees the mesh with the specified index from the compound parent
    *   and reassigns its original physical impostor.
    *
    *   @param scene The babylon.JS scene where a new impostor is potentially created.
    *   @param index The index of the mesh to free from the compound.
    *******************************************************************************************************************/
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
                bz.Debug.physic.log( ' Apply DEFAULT (synthetic) impostor to SCATTERED mesh ' );

                new bz.PhysicBody( bz.PhysicSet.SYNTHETIC_IMPOSTOR ).applyPhysicToMesh
                (
                    scene,
                    mesh,
                    BABYLON.PhysicsImpostor.BoxImpostor
                );
            }
            else
            {
                bz.Debug.physic.log
                (
                    ' Apply impostor to SCATTERED mesh '
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

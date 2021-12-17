import * as bz from '../..';

/** ********************************************************************************************************************
*   The parent class of all game objects.
***********************************************************************************************************************/
export abstract class GameObject
{
    /** An energy amount that represents that this game object is unbreakable. */
    public    static readonly UNBREAKABLE               :number     = -1;

    /** The stage this game object belongs to. */
    protected        readonly stage                     :bz.Stage   = null;
    /** All meshes this game object consists of. */
    protected        readonly model                     :bz.Model   = null;
    /** The initial energy of this game object. */
    private          readonly initialEnergy             :number     = 0;
    private          readonly darkenMeshesOnEnergyLoss  :boolean    = false;
    private          readonly splitHitMeshOnEnergyLoss  :boolean    = false;

    /** The current energy of this wall. */
    private                   currentEnergy             :number     = 0;
    /** Flags if this wall is broken. */
    private                   destroyed                 :boolean    = false;
    /** The next z-index for the bullet hole to assign. */
    private                   nextBulletHoleZIndex      :number     = 0;

    /** ****************************************************************************************************************
    *   Creates a new game object.
    *
    *   @param stage                    The stage this game object belongs to.
    *   @param model                    The model for this game object.
    *   @param energy                   The initial energy of this game object.
    *   @param darkenMeshesOnEnergyLoss If mesh darking shall be applied when this game object loses energy.
    *   @param splitHitMeshOnEnergyLoss If the hit mesh shall be split into two meshes when energy drops to 0.
    *******************************************************************************************************************/
    protected constructor(
        stage                    :bz.Stage,
        model                    :bz.Model,
        energy                   :number  = GameObject.UNBREAKABLE,
        darkenMeshesOnEnergyLoss :boolean = true,
        splitHitMeshOnEnergyLoss :boolean = false
    )
    {
        this.stage                    = stage;
        this.model                    = model;
        this.initialEnergy            = energy;
        this.currentEnergy            = energy;
        this.darkenMeshesOnEnergyLoss = darkenMeshesOnEnergyLoss;
        this.splitHitMeshOnEnergyLoss = splitHitMeshOnEnergyLoss;
    }

    /** ****************************************************************************************************************
    *   Returns the next z-index for the next bullet hole to append onto this mesh.
    *   The internal index is increased by one in this step.
    *
    *   @return The z-index for the next bullet hole to append onto this mesh.
    *******************************************************************************************************************/
    public getNextBulletHoleIndexZ() : number
    {
        return this.nextBulletHoleZIndex++;
    }

    /** ****************************************************************************************************************
    *   Returns the model of this game object.
    *
    *   @return The physical representation of this game object.
    *******************************************************************************************************************/
    public getModel() : bz.Model
    {
        return this.model;
    }

    /** ****************************************************************************************************************
    *   Renders one tick of the game loop for this game object.
    *******************************************************************************************************************/
    public render() : void
    {
        // descendants may override this
    }

    /** ****************************************************************************************************************
    *   Disposes the model of this game object.
    *******************************************************************************************************************/
    public dispose() : void
    {
        this.model.dispose();
    }

    /** ****************************************************************************************************************
    *   Sets visibility for the model of this game object.
    *
    *   @param visible The new visibility for this game object.
    *******************************************************************************************************************/
    public setVisible( visible:boolean ) : void
    {
        this.model.setVisible( visible );
    }

    /** ****************************************************************************************************************
    *   Applies a shot onto this game object and returns all occurred hit points.
    *
    *   @param shot The shot to apply onto this wall.
    *
    *   @return All hit points being hit in this game object.
    *******************************************************************************************************************/
    public determineHitPoints( shot:bz.Shot ) : bz.HitPoint[]
    {
        const hitPoints    :bz.HitPoint[]         = [];
        const pickingInfos :BABYLON.PickingInfo[] = this.getModel().applyRayCollision( shot.getRay() );

        if ( pickingInfos.length > 0 )
        {
            bz.Debug.fire.log
            (
                '  [' + String( pickingInfos.length ) + '] collision detected on game object.'
            );

            for ( const pickingInfo of pickingInfos )
            {
                const shotDirection     :BABYLON.Vector3 = shot.getRay().direction;
                const impactMeshNormal  :BABYLON.Vector3 = pickingInfo.getNormal( true )

                // const diff :BABYLON.Vector3 = impactMeshNormal.subtract( shotDirection );
                // const mirroredShotAngle :BABYLON.Vector3 = shotDirection.clone().add( diff ).add( diff );

                const mirroredShotAngle :BABYLON.Vector3 = impactMeshNormal.clone();

                hitPoints.push
                (
                    new bz.HitPoint
                    (
                        pickingInfo.pickedPoint,
                        pickingInfo.pickedMesh,
                        impactMeshNormal,
                        mirroredShotAngle,
                        pickingInfo.distance,
                        shotDirection,
                        this
                    )
                );
            }
        }

        return hitPoints;
    }

    /** ****************************************************************************************************************
    *   Being invoked when this game object is hurt by a shot or any other impact source.
    *
    *   @param damage   The damage to apply onto this game object.
    *   @param mesh     The mesh that received the damage.
    *                   May be <code>null</code> if the game object received global damage.
    *   @param hitPoint The hit point that causes this hurt.
    *******************************************************************************************************************/
    public hurt( damage:number, mesh:BABYLON.AbstractMesh, hitPoint:bz.HitPoint ) : void
    {
        // exit if unbreakable
        if ( this.currentEnergy === GameObject.UNBREAKABLE )
        {
            bz.Debug.fire.log( 'Object is unbreakable.' );
            return;
        }

        // exit if already destroyed
        if ( this.destroyed )
        {
            bz.Debug.fire.log( 'Object is already destroyed.' );
            return;
        }

        // exit if no damage occurred
        if ( damage === 0 )
        {
            bz.Debug.fire.log( 'No damage to apply onto this object.' );
            return;
        }

        const scene :BABYLON.Scene = this.stage.getScene().getNativeSceneBG();

        // lower energy and clip to 0
        this.currentEnergy -= damage;
        if ( this.currentEnergy <= 0 )
        {
            this.currentEnergy = 0;
        }
        bz.Debug.fire.log
        (
            'Object got hurt with ['
            + String( damage )
            + '] damage - new energy is ['
            + String( this.currentEnergy ) + ']'
        );

        // set darkening alpha value for this mesh
        if ( this.darkenMeshesOnEnergyLoss )
        {
            const darkenAlpha :number = (
                bz.SettingEngine.MAX_MESH_DARKENING_RATIO
                - ( bz.SettingEngine.MAX_MESH_DARKENING_RATIO * ( this.currentEnergy / this.initialEnergy ) )
            );
            this.model.setMeshDarkening( scene, darkenAlpha );
        }

        // shot off this mesh from the compound - if enabled by the model
        this.model.shotOffCompound( scene, mesh );

        // check if the object is destoyed now
        if ( this.currentEnergy === 0 )
        {
            // flag as destroyed
            this.destroyed = true;
            bz.Debug.fire.log( 'Object is now destroyed.' );

            // remove the compound mesh if any
            this.model.removeCompoundMesh( scene );

            // change static models to gravity by setting mass
            this.model.removeStaticState();

            // slice the mesh if desired
            if ( this.splitHitMeshOnEnergyLoss )
            {
                // check if this hit mesh is available and not already splitted by a different HitPoint of this shot
                if (
                    mesh !== null
                    && !mesh.isDisposed()
                    && mesh instanceof BABYLON.Mesh
                )
                {
                    // remove existing bullet holes
                    this.stage.disposeBulletHolesForGameObject( this );

                    // slice the mesh in two
                    const slicedMeshes :BABYLON.Mesh[] = this.model.sliceMesh(
                        scene,
                        mesh,
                        hitPoint.getPoint()
                    );

                    // apply hit impulses to both submeshes ..
                    hitPoint.applyImpulseToSplitSubmeshes( slicedMeshes, damage );
                }
            }
        }
    }
}

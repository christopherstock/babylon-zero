import * as bz from '../..';

/** ********************************************************************************************************************
*   The parent class of all game objects.
***********************************************************************************************************************/
export abstract class GameObject
{
    /** An energy amount that represents that this game object is unbreakable. */
    public    static readonly UNBREAKABLE          :number   = -1;

    /** The stage this game object belongs to. */
    protected        readonly stage                :bz.Stage = null;
    /** All meshes this game object consists of. */
    protected        readonly model                :bz.Model = null;
    /** The initial energy of this game object. */
    private          readonly initialEnergy        :number   = 0;

    /** The current energy of this wall. */
    private                   currentEnergy        :number   = 0;
    /** Flags if this wall is broken. */
    private                   destroyed            :boolean  = false;
    /** The next z-index for the bullet hole to assign. */
    private                   nextBulletHoleZIndex :number   = 0;

    /** ****************************************************************************************************************
    *   Creates a new game object.
    *
    *   @param stage  The stage this game object belongs to.
    *   @param model  The model for this game object.
    *   @param energy The initial energy of this game object.
    *******************************************************************************************************************/
    protected constructor( stage:bz.Stage, model:bz.Model, energy:number = GameObject.UNBREAKABLE )
    {
        this.stage         = stage;
        this.model         = model;
        this.initialEnergy = energy;
        this.currentEnergy = energy;
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
                hitPoints.push
                (
                    new bz.HitPoint
                    (
                        pickingInfo.pickedPoint,
                        pickingInfo.pickedMesh,
                        pickingInfo.getNormal( true ),
                        pickingInfo.distance,
                        shot.getRay().direction,
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
    *   @param scene  The native babylon.JS scene.
    *   @param damage The damage to apply onto this game object.
    *   @param mesh   The mesh that received the damage.
    *                 May be <code>null</code> if the game object received global damage.
    *******************************************************************************************************************/
    public hurt( scene:BABYLON.Scene, damage:number, mesh:BABYLON.AbstractMesh ) : void
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
        const darkenAlpha :number = (
            bz.SettingEngine.MAX_MESH_DARKENING_RATIO
            - ( bz.SettingEngine.MAX_MESH_DARKENING_RATIO * ( this.currentEnergy / this.initialEnergy ) )
        );
        this.model.setMeshDarkening( scene, darkenAlpha );

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
        }
    }
}

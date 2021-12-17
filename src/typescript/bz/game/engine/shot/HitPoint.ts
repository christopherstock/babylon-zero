import * as bz from '../../..';

/** ********************************************************************************************************************
*   A hit point is a potential shot collision on a specific game object.
***********************************************************************************************************************/
export class HitPoint
{
    /** The exact collision point. */
    private readonly point                :BABYLON.Vector3        = null;
    /** The normal of the face this hit point impacts. */
    private readonly impactMeshNormal     :BABYLON.Vector3        = null;
    private readonly mirroredShotAngle    :BABYLON.Vector3 = null;
    /** The distance from the shot source to this hit point. */
    private readonly distance             :number                 = null;
    /** The direction of the shot that caused this hit point (points from shot source to collision point). */
    private readonly shotDirection        :BABYLON.Vector3        = null;
    /** The reversed direction of the shot that caused this hit point (points back to the shot source). */
    private readonly reverseShotDirection :BABYLON.Vector3        = null;
    /** The affected game object. */
    private readonly gameObject           :bz.GameObject          = null;
    /** The affected mesh of the game object. */
    private          mesh                 :BABYLON.AbstractMesh   = null;

    /** ****************************************************************************************************************
    *   Creates a new hit point that carries collision information.
    *
    *   @param point      The exact point of collision.
    *   @param mesh       The exact mesh of the game object that has been hit.
    *   @param normal     The normal of the face the hit point impacts.
    *   @param distance   The distance from the shot source to this hit point.
    *   @param direction  The direction of the shot that caused this hit point.
    *   @param gameObject The game object that is affected by this hit point.
    *******************************************************************************************************************/
    public constructor
    (
        point      :BABYLON.Vector3,
        mesh       :BABYLON.AbstractMesh,
        normal     :BABYLON.Vector3,
        distance   :number,
        direction  :BABYLON.Vector3,
        gameObject :bz.GameObject
    )
    {
        this.point            = point;
        this.mesh             = mesh;
        this.impactMeshNormal = normal;
        this.distance         = distance;
        this.shotDirection    = direction;
        this.gameObject       = gameObject;

        this.reverseShotDirection = this.shotDirection.clone().negate();
        const directionDelta :BABYLON.Vector3 = this.impactMeshNormal.subtract( this.reverseShotDirection );
        this.mirroredShotAngle = this.reverseShotDirection
            .add( directionDelta )
            .add( directionDelta );
    }

    /** ****************************************************************************************************************
    *   Causes a physical shot impact to the according game object at this hit point.
    *   A bullet hole is created and connected to this hit point.
    *
    *   @param scene         The scene to create the hit point in.
    *   @param emissiveColor The emissive color for the bullet hole to set.
    *   @param damage        The damage of the impact to cause.
    *
    *   @return The bullet hole being caused by this impact.
    *******************************************************************************************************************/
    public causeImpact( scene:bz.Scene, emissiveColor:BABYLON.Color3, damage:number ) : bz.BulletHole
    {
        // hurt the game object - this may break the mesh in two!
        this.gameObject.hurt( damage, this.mesh, this );

        // break and return no BulletHole if the mesh has been destroyed/split
        if ( this.mesh === null )
        {
            return null;
        }

        // apply a physical impulse to the mesh
        this.applyImpulseToMesh( damage * bz.SettingEngine.DAMAGE_IMPULSE_MULTIPLIER );

        // return a bullet hole
        return new bz.BulletHole
        (
            scene,
            this,
            emissiveColor
        );
    }

    /** ****************************************************************************************************************
    *   Applies the specified force as a shot impulse to the affected mesh.
    *
    *   @param force The force to apply. Will be multiplied with the direction vertex.
    *******************************************************************************************************************/
    public applyImpulseToMesh( force:number ) : void
    {
        // check if the mesh is still present
        if (
            this.mesh !== null
            && this.mesh.physicsImpostor !== undefined
            && this.mesh.physicsImpostor !== null
            && this.mesh.physicsImpostor.physicsBody !== null
        )
        {
            bz.Debug.fire.log
            (
                'apply impulse - shot impulse direction: '
                + '[' + String( this.shotDirection.x ) + ']'
                + '[' + String( this.shotDirection.y ) + ']'
                + '[' + String( this.shotDirection.z ) + ']'
            );

            bz.Debug.fire.log
            (
                'affected mesh has mass: '
                + '[' + String( this.mesh.physicsImpostor.mass ) + ']'
            );

            // this operation sadly lacks some performance - understandable
            this.mesh.applyImpulse( this.shotDirection.scale( force ), this.point );
        }
        else
        {
            bz.Debug.fire.log( 'apply impulse not suitable: mesh has no physics impostor' );
        }
    }

    /** ****************************************************************************************************************
    *   Returns the connected game object's next Z index for attached bullet holes.
    *
    *   @return The next Z index for a bullet hole to stick onto the connected game object.
    *******************************************************************************************************************/
    public getGameObjectNextBulletHoleIndexZ() : number
    {
        return this.gameObject.getNextBulletHoleIndexZ();
    }

    /** ****************************************************************************************************************
    *   Returns the impact point of this hit point.
    *
    *   @return The point of impact.
    *******************************************************************************************************************/
    public getPoint() : BABYLON.Vector3
    {
        return this.point;
    }

    /** ****************************************************************************************************************
    *   Returns the impacted mesh of this hit point.
    *
    *   @return The impacted mesh.
    *******************************************************************************************************************/
    public getMesh() : BABYLON.AbstractMesh
    {
        return this.mesh;
    }

    /** ****************************************************************************************************************
    *   Returns the impacted game object of this hit point.
    *
    *   @return The impacted game object.
    *******************************************************************************************************************/
    public getGameObject() : bz.GameObject
    {
        return this.gameObject;
    }

    /** ****************************************************************************************************************
    *   Returns the normal of the shot that caused this hit point.
    *
    *   @return The impacted mesh.
    *******************************************************************************************************************/
    public getNormal() : BABYLON.Vector3
    {
        return this.impactMeshNormal;
    }

    /** ****************************************************************************************************************
    *   Returns the mirrored shot angle for this hit point.
    *
    *   @return The mirrored shot angle.
    *******************************************************************************************************************/
    public getMirroredShotAngle() : BABYLON.Vector3
    {
        return this.mirroredShotAngle;
    }

    /** ****************************************************************************************************************
    *   Applies an impulse to the specified meshes and clears the assigned mesh afterwards.
    *
    *   @param slicedMeshes The two meshes to apply an impulse.
    *   @param damage       The damage of the original shot to apply.
    *******************************************************************************************************************/
    public applyImpulseToSplitSubmeshes( slicedMeshes:BABYLON.Mesh[], damage:number ) : void
    {
        this.mesh = slicedMeshes[ 0 ];
        this.applyImpulseToMesh( damage * bz.SettingEngine.DAMAGE_IMPULSE_MULTIPLIER );
        this.mesh = slicedMeshes[ 1 ];
        this.applyImpulseToMesh( damage * bz.SettingEngine.DAMAGE_IMPULSE_MULTIPLIER );
        this.mesh = null;
    }

    /** ****************************************************************************************************************
    *   Picks the nearest hit point of all specified hit points.
    *
    *   @param hitPoints All hit points.
    *
    *   @return The hit point with the lowest distance.
    *******************************************************************************************************************/
    public static determineNearestHitPoint( hitPoints:bz.HitPoint[] ) : bz.HitPoint
    {
        let lowestDistance  :number      = Infinity;
        let nearestHitpoint :bz.HitPoint = null;

        for ( const hitPoint of hitPoints )
        {
            if ( hitPoint.distance < lowestDistance )
            {
                lowestDistance  = hitPoint.distance;
                nearestHitpoint = hitPoint;
            }
        }

        return nearestHitpoint;
    }
}

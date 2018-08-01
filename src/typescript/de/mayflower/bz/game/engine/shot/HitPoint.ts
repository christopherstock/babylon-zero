
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   A hit point is a shot collision on a specific game object.
    *******************************************************************************************************************/
    export class HitPoint
    {
        // TODO private!
        // TODO Add shot instance!

        /** The affected game object. */
        public          readonly    gameObject                      :bz.GameObject                  = null;
        /** The exact collision point. */
        public          readonly    point                           :BABYLON.Vector3                = null;
        /** The affected mesh of the game object. */
        public          readonly    mesh                            :BABYLON.AbstractMesh           = null;
        /** The normal of the face this hit point impacts. */
        public          readonly    normal                          :BABYLON.Vector3                = null;
        /** The distance from the shot source to this hit point. */
        private         readonly    distance                        :number                         = null;
        /** The direction of the shot that caused this hit point. */
        private         readonly    direction                       :BABYLON.Vector3                = null;

        /** ************************************************************************************************************
        *   Creates a new hit point that carries collision information.
        *
        *   @param gameObject The game object that is affected by this hit point.
        *   @param point      The exact point of collision.
        *   @param mesh       The exact mesh of the game object that has been hit.
        *   @param distance   The distance from the shot source to this hit point.
        *   @param normal     The normal of the face the hit point impacts.
        *   @param direction  The direction of the shot that caused this hit point.
        ***************************************************************************************************************/
        public constructor
        (
            gameObject :bz.GameObject,
            point      :BABYLON.Vector3,
            mesh       :BABYLON.AbstractMesh,
            distance   :number,
            normal     :BABYLON.Vector3,
            direction  :BABYLON.Vector3
        )
        {
            this.gameObject = gameObject;
            this.point      = point;
            this.mesh       = mesh;
            this.distance   = distance;
            this.normal     = normal;
            this.direction  = direction;
        }

        /** ************************************************************************************************************
        *   Causes a physical shot impact to this hit point and sets a bullet hole onto it.
        *
        *   @param emissiveColor The emissive color for the bullet hole to set.
        *
        *   @return The bullet hole being caused by this impact.
        ***************************************************************************************************************/
        public createImpact( emissiveColor:BABYLON.Color3 ) : bz.BulletHole
        {
            // create a bullet hole
            const bulletHole:bz.BulletHole = new bz.BulletHole
            (
                this,
                emissiveColor
            );

            // apply impulse
            this.applyImpulseToMesh( 10 );

            return bulletHole;
        }

        /** ************************************************************************************************************
        *   Applies the shot impulse to the affected mesh.
        *
        *   @param force The force to apply. Will be multiplied with the direction vertex.
        ***************************************************************************************************************/
        public applyImpulseToMesh( force:number ) : void
        {
            if ( this.mesh.physicsImpostor != null && this.mesh.physicsImpostor.physicsBody != null )
            {
                bz.Debug.fire.log
                (
                    'apply impulse - shot impulse direction: '
                    + '[' + this.direction.x + ']'
                    + '[' + this.direction.y + ']'
                    + '[' + this.direction.z + ']'
                );

                this.mesh.applyImpulse( this.direction.scale( force ), this.point );
            }
            else
            {
                bz.Debug.fire.log( 'apply impulse - mesh has no physics.' );
            }
        }

        /** ************************************************************************************************************
        *   Picks the nearest hit point of all specified hit points.
        *
        *   @param hitPoints All hit points.
        *
        *   @return The hit point with the lowest distance.
        ***************************************************************************************************************/
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

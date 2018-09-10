
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   A hit point is a potential shot collision on a specific game object.
    *******************************************************************************************************************/
    export class HitPoint
    {
        /** The exact collision point. */
        private         readonly    point                           :BABYLON.Vector3                = null;
        /** The affected mesh of the game object. */
        private         readonly    mesh                            :BABYLON.AbstractMesh           = null;
        /** The normal of the face this hit point impacts. */
        private         readonly    normal                          :BABYLON.Vector3                = null;
        /** The distance from the shot source to this hit point. */
        private         readonly    distance                        :number                         = null;
        /** The direction of the shot that caused this hit point. */
        private         readonly    direction                       :BABYLON.Vector3                = null;
        /** The affected game object. */
        private         readonly    gameObject                      :bz.GameObject                  = null;

        /** ************************************************************************************************************
        *   Creates a new hit point that carries collision information.
        *
        *   @param point      The exact point of collision.
        *   @param mesh       The exact mesh of the game object that has been hit.
        *   @param normal     The normal of the face the hit point impacts.
        *   @param distance   The distance from the shot source to this hit point.
        *   @param direction  The direction of the shot that caused this hit point.
        *   @param gameObject The game object that is affected by this hit point.
        ***************************************************************************************************************/
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
            this.point      = point;
            this.mesh       = mesh;
            this.normal     = normal;
            this.distance   = distance;
            this.direction  = direction;
            this.gameObject = gameObject;
        }

        /** ************************************************************************************************************
        *   Causes a physical shot impact to the according game object at this hit point.
        *   A bullet hole is created and connected to this hit point.
        *
        *   @param emissiveColor The emissive color for the bullet hole to set.
        *   @param damage        The damage of the impact to cause.
        *
        *   @return The bullet hole being caused by this impact.
        ***************************************************************************************************************/
        public causeImpact( emissiveColor:BABYLON.Color3, damage:number ) : bz.BulletHole
        {
            // create a bullet hole
            const bulletHole:bz.BulletHole = new bz.BulletHole
            (
                this,
                emissiveColor
            );

            // apply impulse
            this.applyImpulseToMesh( damage * bz.SettingEngine.DAMAGE_IMPULSE_MULTIPLIER );

            // hurt the game object
            this.gameObject.hurt( damage );

            return bulletHole;
        }

        /** ************************************************************************************************************
        *   Applies the specified force as a shot impulse to the affected mesh.
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

                bz.Debug.fire.log
                (
                    'affected mesh has mass: '
                    + '[' + this.mesh.physicsImpostor.mass + ']'
                );

                this.mesh.applyImpulse( this.direction.scale( force ), this.point );
            }
            else
            {
                bz.Debug.fire.log( 'applying impulse not suitable: mesh has no physics impostor' );
            }
        }

        /** ************************************************************************************************************
        *   Returns the connected game object's next Z index for attached bullet holes.
        *
        *   @return The next Z index for a bullet hole to stick onto the connected game object.
        ***************************************************************************************************************/
        public getGameObjectNextBulletHoleIndexZ() : number
        {
            return this.gameObject.getNextBulletHoleIndexZ();
        }

        /** ************************************************************************************************************
        *   Returns the impact point of this hit point.
        *
        *   @return The point of impact.
        ***************************************************************************************************************/
        public getPoint() : BABYLON.Vector3
        {
            return this.point;
        }

        /** ************************************************************************************************************
        *   Returns the impacted mesh of this hit point.
        *
        *   @return The impacted mesh.
        ***************************************************************************************************************/
        public getMesh() : BABYLON.AbstractMesh
        {
            return this.mesh;
        }

        /** ************************************************************************************************************
        *   Returns the normal of the shot that caused this hit point.
        *
        *   @return The impacted mesh.
        ***************************************************************************************************************/
        public getNormal() : BABYLON.Vector3
        {
            return this.normal;
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

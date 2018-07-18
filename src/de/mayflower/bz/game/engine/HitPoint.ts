
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   A hit point is a shot collision on a specific game object.
    *******************************************************************************************************************/
    export class HitPoint
    {
        /** The affected game object. */
        private         readonly    gameObject                      :bz.GameObject                  = null;

        /** The exact collision point. */
        private         readonly    point                           :BABYLON.Vector3                = null;

        /** The affected mesh of the game object. */
        private         readonly    mesh                            :BABYLON.AbstractMesh           = null;

        /** The distance from the shot source to this hit point. */
        private         readonly    distance                        :number                         = null;

        /** The normal of the face the hit point impacts. */
        private         readonly    normal                          :BABYLON.Vector3                = null;

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
        *   Creates a debug bullet hole onto this hit point.
        *
        *   @return The created debug bullet hole mesh.
        ***************************************************************************************************************/
        public createDebugBulletHole() : BABYLON.Mesh
        {
            // create debug bullet hole
            const debugBulletHole:BABYLON.Mesh = bz.MeshFactory.createSphere
            (
                this.point.clone(),
                bz.MeshPivotAnchor.CENTER_XYZ,
                0.10,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.SettingColor.COLOR_RGB_ORANGE,
                bz.Main.game.engine.scene.getScene(),
                bz.Physic.NONE,
                1.0,
                bz.SettingColor.COLOR_RGB_ORANGE // this.ambientColor
            );

            // stick to parent
            debugBulletHole.setParent( this.mesh );

            // add to debug meshes array of the stage
            return debugBulletHole;
        }

        /** ************************************************************************************************************
        *   Creates a debug bullet hole normal line onto this hit point.
        *
        *   @return The created debug bullet hole normal line.
        ***************************************************************************************************************/
        public createDebugBulletHoleNormalLine() : BABYLON.Mesh
        {
            // create debug bullet hole
            const debugBulletHole:BABYLON.Mesh = bz.MeshFactory.createLine
            (
                this.point.clone(),
                this.point.clone().add( this.normal ),
                bz.MeshPivotAnchor.CENTER_XYZ,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.SettingColor.COLOR_RGBA_ORANGE_MAYFLOWER_OPAQUE,
                bz.Main.game.engine.scene.getScene()
            );

            // stick to parent
            debugBulletHole.setParent( this.mesh );

            // add to debug meshes array of the stage
            return debugBulletHole;
        }

        /** ************************************************************************************************************
        *   Creates a bullet hole onto this hit point.
        *
        *   @param emissiveColor The emissive color for the bullet hole mesh.
        ***************************************************************************************************************/
        public createBulletHole( emissiveColor:BABYLON.Color3 ) : void
        {
            bz.Debug.fire.log( 'Existent bullet holes on this model: [' + this.gameObject.bulletHoles.length + ']' );

            const bulletHole :BABYLON.Mesh = bz.MeshFactory.createDecal
            (
                this.point.clone(),
                this.mesh,
                this.normal,
                new BABYLON.Vector3( 0.2, 0.2, bz.MeshFactory.FACE_DEPTH ),
                bz.MathUtil.getRandomInt( 0, 359 ),
                this.gameObject.bulletHoles.length,
                bz.Texture.BULLET_HOLE_WOOD,
                null,
                bz.Main.game.engine.scene.getScene(),
                1.0,
                emissiveColor
            );

            // stick to parent
            bulletHole.setParent( this.mesh );

            // add to game object
            this.gameObject.bulletHoles.push( bulletHole );
        }

        /** ************************************************************************************************************
        *   Applies the shot impulse to the affected mesh.
        *
        *   @param force The force to apply. Will be multiplied with the direction vertex.
        ***************************************************************************************************************/
        public applyImpulseToMesh( force:number ) : void
        {
            bz.Debug.fire.log
            (
                'shot impulse direction: '
                + '[' + this.direction.x + ']'
                + '[' + this.direction.y + ']'
                + '[' + this.direction.z + ']'
            );

            this.mesh.applyImpulse( this.direction.scale( force ), this.point );
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

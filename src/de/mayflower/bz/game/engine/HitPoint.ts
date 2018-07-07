
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   A hit point is a shot collision on a specific game object.
    *******************************************************************************************************************/
    export class HitPoint
    {
        /** The affected game object. */
        public                      gameObject                      :bz.GameObject                  = null;

        /** The exact collision point. */
        public                      point                           :BABYLON.Vector3                = null;

        /** The affected mesh of the game object. */
        public                      mesh                            :BABYLON.AbstractMesh           = null;

        /** The distance from the shot source to this hit point. */
        public                      distance                        :number                         = null;

        /** ************************************************************************************************************
        *   Creates a new hit point that carries collision information.
        *
        *   @param gameObject The game object that is affected by this hit point.
        *   @param point      The exact point of collision.
        *   @param mesh       The exact mesh of the game object that has been hit.
        *   @param distance   The distance from the shot source to this hit point.
        ***************************************************************************************************************/
        public constructor
        (
            gameObject :bz.GameObject,
            point      :BABYLON.Vector3,
            mesh       :BABYLON.AbstractMesh,
            distance   :number
        )
        {
            this.gameObject = gameObject;
            this.point      = point;
            this.mesh       = mesh;
            this.distance   = distance;
        }

        /** ************************************************************************************************************
        *   Applies a bullet hole onto this hit point.
        *
        *   @param stage The stage where the bullet hole is appended to.
        ***************************************************************************************************************/
        public appendBulletHole( stage:bz.Stage ) : void
        {
            // add debug hitpoint
            if ( bz.SettingDebug.SHOW_SHOT_DEBUG_LINES_AND_COLLISIONS )
            {
                // create debug hitpoint
                const debugBulletHole:BABYLON.Mesh = bz.MeshFactory.createSphere
                (
                    this.point,
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
                stage.debugMeshes.push( debugBulletHole );
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

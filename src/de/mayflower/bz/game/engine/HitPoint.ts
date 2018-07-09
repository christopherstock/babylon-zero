
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

        /** The normal of the face the hit point impacts. */
        public                      normal                          :BABYLON.Vector3                = null;

        /** ************************************************************************************************************
        *   Creates a new hit point that carries collision information.
        *
        *   @param gameObject The game object that is affected by this hit point.
        *   @param point      The exact point of collision.
        *   @param mesh       The exact mesh of the game object that has been hit.
        *   @param distance   The distance from the shot source to this hit point.
        *   @param normal     The normal of the face the hit point impacts.
        ***************************************************************************************************************/
        public constructor
        (
            gameObject :bz.GameObject,
            point      :BABYLON.Vector3,
            mesh       :BABYLON.AbstractMesh,
            distance   :number,
            normal     :BABYLON.Vector3
        )
        {
            this.gameObject = gameObject;
            this.point      = point;
            this.mesh       = mesh;
            this.distance   = distance;
            this.normal     = normal;
        }

        /** ************************************************************************************************************
        *   Applies a bullet hole onto this hit point.
        *
        *   @param stage The stage where the bullet hole is appended to.
        ***************************************************************************************************************/
        public appendBulletHole( stage:bz.Stage ) : void
        {
            // TODO outsource to separate method!

            // add debug bullet hole
            if ( bz.SettingDebug.SHOW_SHOT_DEBUG_LINES_AND_COLLISIONS )
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
                stage.debugMeshes.push( debugBulletHole );
            }

            bz.Debug.fire.log
            (
                'bullet hole normal: '
                + '[' + this.normal.x + ']'
                + '[' + this.normal.y + ']'
                + '[' + this.normal.z + ']'
            );

            // TODO outsource to static method if solved!

            // calculate bullet hole angles from face normals
            const newRotX:number = BABYLON.Angle.BetweenTwoPoints
            (
                BABYLON.Vector2.Zero(),
                new BABYLON.Vector2( this.normal.z, this.normal.y )
            ).degrees() - 0.0;

            const newRotY:number = -BABYLON.Angle.BetweenTwoPoints
            (
                BABYLON.Vector2.Zero(),
                new BABYLON.Vector2( this.normal.x, this.normal.z )
            ).degrees() + 90.0;

            const newRotZ:number = bz.MathUtil.getRandomInt( 0, 359 );

            bz.Debug.fire.log
            (
                'bullet hole rotation: '
                + '[' + newRotX + ']'
                + '[' + newRotY + ']'
                + '[' + newRotZ + ']'
            );

            // add actual bullet hole
            const bulletHole:BABYLON.Mesh = bz.MeshFactory.createBox
            (
                this.point.clone(),
                bz.MeshPivotAnchor.CENTER_XYZ,
                new BABYLON.Vector3( 0.2, 0.2, bz.MeshFactory.FACE_DEPTH ),
                new BABYLON.Vector3
                (
                    newRotX,
                    newRotY,
                    newRotZ
                ),
                bz.Texture.BULLET_HOLE_WOOD,
                null,
                bz.Main.game.engine.scene.getScene(),
                bz.Physic.NONE,
                1.0,
                stage.ambientColor
            );

            // stick to parent
            bulletHole.setParent( this.mesh );

            // add to debug meshes array of the stage
            stage.bulletHoles.push( bulletHole );
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

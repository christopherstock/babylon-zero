
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Represents a bullet hole on a hit point.
    *******************************************************************************************************************/
    export class BulletHole
    {
        /** This depth asserts being drawn correctly on spheres and not be too scaled around corners! */
        private     static  readonly    BULLET_HOLE_DEPTH               :number                             = 0.025;

        /** The hit point this bullet hole is created for. */
        private             readonly    hitPoint                        :bz.HitPoint                        = null;
        /** The emissive color of the level where this bullet hole is created. */
        private             readonly    emissiveColor                   :BABYLON.Color3                     = null;

        /** The decal mesh of this bullet hole. */
        private                         holeMesh                        :BABYLON.Mesh                       = null;
        /** The debug sphere mesh of this bullet hole. */
        private                         debugSphereMesh                 :BABYLON.Mesh                       = null;
        /** The debug normal line of the hit face. */
        private                         debugNormalLine                 :BABYLON.Mesh                       = null;

        /** ************************************************************************************************************
        *   Creates a new bullet hole.
        *
        *   @param hitPoint      The hit pooint to create this bullet hole for.
        *   @param emissiveColor The emissive color of the level where this bullet hole is applied.
        ***************************************************************************************************************/
        public constructor
        (
            hitPoint      :bz.HitPoint,
            emissiveColor :BABYLON.Color3,
        )
        {
            this.hitPoint      = hitPoint;
            this.emissiveColor = emissiveColor;

            // append a bullet hole
            this.createHoleMesh();

            // append a debug bullet hole
            if ( bz.SettingDebug.SHOW_DEBUG_BULLET_HOLES )
            {
                this.createDebugHoleSphere();
            }

            // append the debug hit face normal
            if ( bz.SettingDebug.SHOW_DEBUG_BULLET_HOLE_NORMAL )
            {
                this.createDebugBulletHoleNormalLine();
            }
        }

        /** ************************************************************************************************************
        *   Disposes all meshes of this bullet hole.
        ***************************************************************************************************************/
        public dispose() : void
        {
            this.holeMesh.dispose();

            if ( this.debugSphereMesh != null ) this.debugSphereMesh.dispose();
            if ( this.debugNormalLine != null ) this.debugNormalLine.dispose();
        }

        /** ************************************************************************************************************
        *   Creates a bullet hole mesh onto the hit point.
        ***************************************************************************************************************/
        private createHoleMesh() : void
        {
            const meshTexture:bz.Texture = bz.Texture.getTextureFromMeshByName( this.hitPoint.mesh );

            this.holeMesh = bz.MeshFactory.createDecal
            (
                this.hitPoint.point.clone(),
                this.hitPoint.mesh,
                this.hitPoint.normal,
                new BABYLON.Vector3( 0.2, 0.2, BulletHole.BULLET_HOLE_DEPTH ),
                bz.MathUtil.getRandomInt( 0, 359 ),
                this.hitPoint.gameObject.getNextBulletHoleIndexZ(),
                meshTexture,
                null,
                bz.Main.game.engine.scene.getScene(),
                1.0,
                this.emissiveColor
            );

            // stick to parent
            this.holeMesh.setParent( this.hitPoint.mesh );
        }

        /** ************************************************************************************************************
        *   Creates a debug bullet hole sphere onto this hit point.
        ***************************************************************************************************************/
        private createDebugHoleSphere() : void
        {
            // create debug bullet hole
            this.debugSphereMesh = bz.MeshFactory.createSphere
            (
                this.hitPoint.point.clone(),
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
            this.debugSphereMesh.setParent( this.hitPoint.mesh );
        }

        /** ************************************************************************************************************
        *   Creates a debug bullet hole normal line onto this hit point.
        ***************************************************************************************************************/
        private createDebugBulletHoleNormalLine() : void
        {
            // create debug bullet hole
            this.debugNormalLine = bz.MeshFactory.createLine
            (
                this.hitPoint.point.clone(),
                this.hitPoint.point.clone().add( this.hitPoint.normal ),
                bz.MeshPivotAnchor.CENTER_XYZ,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.SettingColor.COLOR_RGBA_ORANGE_MAYFLOWER_OPAQUE,
                bz.Main.game.engine.scene.getScene()
            );

            // stick to parent
            this.debugNormalLine.setParent( this.hitPoint.mesh );
        }
    }

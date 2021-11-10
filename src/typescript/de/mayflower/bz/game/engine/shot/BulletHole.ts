import * as bz from '../../..';

/** ********************************************************************************************************************
*   Represents a bullet hole on a hit point.
***********************************************************************************************************************/
export class BulletHole
{
    /** The hit point this bullet hole is created for. */
    private        readonly hitPoint                    :bz.HitPoint            = null;
    /** The emissive color of the stage where this bullet hole is created. */
    private        readonly emissiveColor               :BABYLON.Color3         = null;

    /** The decal mesh of this bullet hole. */
    private                 holeMesh                    :BABYLON.Mesh           = null;
    /** The debug sphere mesh of this bullet hole. */
    private                 debugSphereMesh             :BABYLON.Mesh           = null;
    /** The debug normal line of the hit face. */
    private                 debugNormalLine             :BABYLON.Mesh           = null;

    /** ****************************************************************************************************************
    *   Creates a new bullet hole.
    *
    *   @param scene         The scene to create the bullet hole for.
    *   @param hitPoint      The hit pooint to create this bullet hole for.
    *   @param emissiveColor The emissive color of the stage where this bullet hole is applied.
    *******************************************************************************************************************/
    public constructor
    (
        scene         :bz.Scene,
        hitPoint      :bz.HitPoint,
        emissiveColor :BABYLON.Color3
    )
    {
        this.hitPoint      = hitPoint;
        this.emissiveColor = emissiveColor;

        // append a bullet hole
        this.createHoleMesh( scene );

        // append a debug bullet hole
        if ( bz.SettingDebug.SHOW_DEBUG_BULLET_HOLES )
        {
            this.createDebugHoleSphere( scene );
        }

        // append the debug hit face normal
        if ( bz.SettingDebug.SHOW_DEBUG_BULLET_HOLE_NORMAL )
        {
            this.createDebugHoleNormalLine( scene );
        }
    }

    /** ****************************************************************************************************************
    *   Disposes all meshes of this bullet hole.
    *******************************************************************************************************************/
    public dispose() : void
    {
        this.holeMesh.dispose();

        if ( this.debugSphereMesh !== null )
        {
            this.debugSphereMesh.dispose();
        }
        if ( this.debugNormalLine !== null )
        {
            this.debugNormalLine.dispose();
        }
    }

    /** ****************************************************************************************************************
    *   Creates a bullet hole mesh onto the hit point.
    *
    *   @param scene The scene to create the bullet hole for.
    *******************************************************************************************************************/
    private createHoleMesh( scene:bz.Scene ) : void
    {
        const meshTexture:bz.Texture = bz.Texture.getAccordingBulletHoleTextureForMesh( this.hitPoint.getMesh() );

        this.holeMesh = new bz.MeshFactory( scene, this.emissiveColor ).createDecal
        (
            this.hitPoint.getPoint().clone(),
            this.hitPoint.getMesh(),
            this.hitPoint.getNormal(),
            new BABYLON.Vector3( 0.2, 0.2, bz.SettingEngine.BULLET_HOLE_DEPTH ),
            bz.MathUtil.getRandomInt( 0, 359 ),
            this.hitPoint.getGameObjectNextBulletHoleIndexZ(),
            meshTexture,
            null,
            1.0
        );

        // stick to parent
        this.holeMesh.setParent( this.hitPoint.getMesh() );
    }

    /** ****************************************************************************************************************
    *   Creates a debug bullet hole sphere onto this hit point.
    *
    *   @param scene The scene to create the bullet hole for.
    *******************************************************************************************************************/
    private createDebugHoleSphere( scene:bz.Scene ) : void
    {
        // create debug bullet hole
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( scene, bz.SettingColor.COLOR_RGB_ORANGE );
        this.debugSphereMesh = meshFactory.createSphere
        (
            this.hitPoint.getPoint().clone(),
            bz.MeshAnchor.CENTER_XYZ,
            0.10,
            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            null,
            bz.SettingColor.COLOR_RGB_ORANGE,
            bz.PhysicSet.NONE,
            1.0
        );

        // stick to parent
        this.debugSphereMesh.setParent( this.hitPoint.getMesh() );
    }

    /** ****************************************************************************************************************
    *   Creates a debug bullet hole normal line onto this hit point.
    *
    *   @param scene The native babylon.JS scene to create the bullet hole for.
    *******************************************************************************************************************/
    private createDebugHoleNormalLine( scene:bz.Scene ) : void
    {
        // create debug bullet hole
        this.debugNormalLine = new bz.MeshFactory( scene, bz.SettingColor.COLOR_RGB_ORANGE ).createLine
        (
            this.hitPoint.getPoint().clone(),
            this.hitPoint.getPoint().clone().add( this.hitPoint.getNormal() ),
            bz.SettingColor.COLOR_RGBA_ORANGE_MAYFLOWER_OPAQUE
        );

        // stick to parent
        this.debugNormalLine.setParent( this.hitPoint.getMesh() );
    }
}

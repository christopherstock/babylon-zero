import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents an event trigger.
***********************************************************************************************************************/
export class Trigger extends bz.Collectable
{
    /** The debug sphere that shows the position of the trigger. */
    private          debugSphereMesh :BABYLON.Mesh    = null;
    /** The initial and static position of this item. */
    private readonly triggerPosition :BABYLON.Vector3 = null;

    /** ****************************************************************************************************************
    *   Creates a new event trigger.
    *
    *   @param stage          The stage where this Trigger is created.
    *   @param position       Position of the trigger.
    *   @param eventsOnPicked The events to execute when this trigger is picked.
    *******************************************************************************************************************/
    public constructor(
        stage          :bz.Stage,
        position       :BABYLON.Vector3,
        eventsOnPicked :bz.Event[]
    )
    {
        super(
            stage,
            position,
            eventsOnPicked,
            new bz.Model()
        );

        this.triggerPosition = position;

        // add debug point
        if ( bz.SettingDebug.SHOW_TRIGGER && this.model.getMeshCount() === 0 )
        {
            this.createDebugHoleSphere( stage.getScene(), position );
        }
    }

    /** ****************************************************************************************************************
    *   Flags this trigger as 'picked' and disposes the debug sphere mesh, if any.
    *******************************************************************************************************************/
    public pick() : void
    {
        super.pick();

        // hide debugSphereMesh
        if ( this.debugSphereMesh !== null )
        {
            this.debugSphereMesh.dispose();
            this.debugSphereMesh = null;
        }
    }

    /** ****************************************************************************************************************
    *   Disposes all meshes of this bullet hole.
    *******************************************************************************************************************/
    public dispose() : void
    {
        super.dispose();

        if ( this.debugSphereMesh !== null )
        {
            this.debugSphereMesh.dispose();
        }
    }

    /** ****************************************************************************************************************
    *   Delivers the static position of this trigger.
    *******************************************************************************************************************/
    protected getCurrentPosition() : BABYLON.Vector3
    {
        return this.triggerPosition;
    }

    /** ****************************************************************************************************************
    *   Creates a debug bullet hole sphere at the specified position.
    *
    *   @param scene    The scene to create the bullet hole for.
    *   @param position Position for this debug sphere.
    *******************************************************************************************************************/
    private createDebugHoleSphere( scene:bz.Scene, position:BABYLON.Vector3 ) : void
    {
        // create debug bullet hole
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( scene, bz.SettingColor.COLOR_RGB_GREEN );
        this.debugSphereMesh = meshFactory.createSphere
        (
            position,
            bz.MeshAnchor.CENTER_XYZ,
            0.10,
            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            null,
            bz.SettingColor.COLOR_RGB_GREEN,
            bz.PhysicSet.NONE,
            1.0
        );
    }
}

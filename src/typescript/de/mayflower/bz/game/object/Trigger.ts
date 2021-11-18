import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a pickable item.
***********************************************************************************************************************/
export class Trigger extends bz.GameObject
{
    /** Flags that this item has been picked. */
    protected          picked           :boolean         = false;
    /** The debug normal line of the hit face. */
    private             debugSphereMesh :BABYLON.Mesh    = null;
    /** The initial and static position of this item. */
    private   readonly itemPosition     :BABYLON.Vector3 = null;
    /** The events to perform when this item is picked. */
    private   readonly eventsOnPicked   :bz.Event[]      = [];

    public constructor(
        stage          :bz.Stage,
        position       :BABYLON.Vector3,
        eventsOnPicked :bz.Event[],
        model          :bz.Model = new bz.Model()
    )
    {
        super(
            stage,
            model
        );

        this.itemPosition   = position;
        this.eventsOnPicked = eventsOnPicked;

        // translate model to item position
        this.model.translatePosition( position );

        // add debug point
        if ( bz.SettingDebug.SHOW_TRIGGER && this.model.getMeshCount() === 0 )
        {
            this.createDebugHoleSphere( stage.getScene(), position );
        }
    }

    /** ****************************************************************************************************************
    *   Renders all stage concernings for one tick of the game loop.
    *******************************************************************************************************************/
    public render() : void
    {
        // check if picked by player
        if ( this.checkPick( this.stage.getPlayer().getPosition() ) )
        {
            // add to stage event pipeline
            this.stage.addEventsToPipeline( this.eventsOnPicked );
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
    *   Checks if this item is picked by colliding with the specified model.
    *
    *   @param playerPosition The currenrt player position.
    *
    *   @return <code>true</code> if this item has been picked in this check.
    *******************************************************************************************************************/
    private checkPick( playerPosition:BABYLON.Vector3 ) : boolean
    {
        // only if not picked yet
        if ( !this.picked )
        {
            let currentItemPosition :BABYLON.Vector3;

            // pick pivot point of mesh for Items as Items can be shot to a different position
            if ( this.getModel().getMeshCount() > 0 )
            {
                currentItemPosition = this.getModel().getMesh( 0 ).getAbsolutePivotPoint();
            }
            else
            {
                currentItemPosition = this.itemPosition;
            }

            // get distance between item and player
            const distance :number = BABYLON.Vector3.Distance( currentItemPosition, playerPosition );
            if ( distance < bz.SettingPlayer.RANGE_ITEM_PICK )
            {
                this.pick();

                if ( this.debugSphereMesh !== null )
                {
                    this.debugSphereMesh.isVisible = false;
                }

                return true;
            }
        }

        return false;
    }

    /** ****************************************************************************************************************
    *   Flags this item as 'picked' and makes it invisible.
    *******************************************************************************************************************/
    private pick() : void
    {
        bz.Debug.item.log( 'Item/Trigger picked' );

        this.picked = true;

        // dispose the model and dispose all bullet holes from the stage
        this.model.dispose();
        this.stage.disposeBulletHolesForGameObject( this );
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

import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a pickable item.
***********************************************************************************************************************/
export abstract class Collectable extends bz.GameObject
{
    /** Flags that this item has been picked. */
    protected          picked           :boolean         = false;
    /** The events to perform when this item is picked. */
    private   readonly eventsOnPicked   :bz.Event[]      = [];

    /** ****************************************************************************************************************
    *   Creates a new event trigger.
    *
    *   @param stage    The stage where this Trigger is created.
    *   @param position Position of the trigger.
    *   @param eventsOnPicked The events to execute when this trigger is picked.
    *   @param model          The graphical representation of this trigger/item.
    *******************************************************************************************************************/
    protected constructor(
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

        this.eventsOnPicked = eventsOnPicked;

        // translate model to item position
        this.model.translatePosition( position );
    }

    /** ****************************************************************************************************************
    *   Delivers the current position of this collectable.
    *******************************************************************************************************************/
    protected abstract getCurrentPosition() : BABYLON.Vector3;

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
    *   Flags this item as 'picked'.
    *******************************************************************************************************************/
    protected pick() : void
    {
        bz.Debug.item.log( 'Item/Trigger picked' );

        this.picked = true;
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
            const currentPosition :BABYLON.Vector3 = this.getCurrentPosition();

            // get distance between item and player
            const distance :number = BABYLON.Vector3.Distance( currentPosition, playerPosition );
            if ( distance < bz.SettingPlayer.RANGE_ITEM_PICK )
            {
                this.pick();

                return true;
            }
        }

        return false;
    }
}

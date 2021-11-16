import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a pickable item.
***********************************************************************************************************************/
export class Trigger extends bz.GameObject
{
    /** Flags that this item has been picked. */
    protected          picked         :boolean         = false;
    /** The initial and static position of this item. */
    private   readonly itemPosition   :BABYLON.Vector3 = null;
    /** The events to perform when this item is picked. */
    private   readonly eventsOnPicked :bz.Event[]      = [];

    public constructor(
        stage:bz.Stage,
        position:BABYLON.Vector3,
        eventsOnPicked:bz.Event[],
        model:bz.Model = new bz.Model()
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
    *   Checks if this item is picked by colliding with the specified model.
    *
    *   @param playerPosition The currenrt player position.
    *
    *   @return <code>true</code> if this item was picked.
    *******************************************************************************************************************/
    private checkPick( playerPosition:BABYLON.Vector3 ) : boolean
    {
        if ( !this.picked )
        {
            // get distance between item and player
            const distance :number = BABYLON.Vector3.Distance( this.itemPosition, playerPosition );
            if ( distance < bz.SettingPlayer.RANGE_ITEM_PICK )
            {
                this.pick();

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

        this.model.setVisible( false );
    }
}

import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a pickable item.
***********************************************************************************************************************/
export class Item extends bz.GameObject
{
    /** Flags that this item has been picked. */
    private picked                :boolean         = false;
    /** Current rotation Y for this item. */
    private rotY                  :number          = 0.0;
    /** The initial and static position of this item. */
    private readonly itemPosition :BABYLON.Vector3 = null;

    /** ****************************************************************************************************************
    *   Creates a new item.
    *
    *   @param stage    The stage this item belongs to.
    *   @param position Static position of this item.
    *   @param model    The model that represents this item.
    *   @param itemType The type of item.
    *******************************************************************************************************************/
    public constructor( stage:bz.Stage, position:BABYLON.Vector3, model:bz.Model, itemType:bz.ItemType )
    {
        super(
            stage,
            model
        );

        this.itemPosition = position;
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
            // TODO specify Item events in this class!

            this.stage.getGame().getGUI().addGuiFx( bz.GUIFxType.GAIN_ENERGY );
            this.stage.getGame().getGUI().addGuiMessage( 'Picked up a clip' );

        }

        // rotate this item
        if ( !this.picked )
        {
            this.model.setAbsoluteRotationXYZ
            (
                0.0,
                this.rotY,
                0.0
            );
            this.rotY += 0.5;
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
        bz.Debug.item.log( 'Item picked' );

        this.picked = true;

        this.model.setVisible( false );
    }
}

import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a pickable item.
***********************************************************************************************************************/
export class Item extends bz.Trigger
{
    /** Flags that this item has been picked. */
    private picked                  :boolean            = false;
    /** Current rotation Y for this item. */
    private rotY                    :number             = 0.0;
    /** The initial and static position of this item. */
    private readonly itemPosition   :BABYLON.Vector3    = null;
    /** The events to perform when this item is picked. */
    private readonly eventsOnPicked :bz.Event[]         = [];

    /** ****************************************************************************************************************
    *   Creates a new item.
    *
    *   @param stage    The stage this item belongs to.
    *   @param position Static position of this item.
    *   @param itemType The type of item.
    *******************************************************************************************************************/
    public constructor( stage:bz.Stage, position:BABYLON.Vector3, itemType:bz.ItemType )
    {
        super(
            stage,
            Item.createModelByItemType( stage, itemType )
        );

        this.itemPosition   = position;
        this.eventsOnPicked = Item.createEventsByItemType( itemType );

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

    private static createEventsByItemType( itemType:bz.ItemType ) : bz.Event[]
    {
        switch ( itemType )
        {
            case bz.ItemType.SHOTGUN_SHELLS:
            {
                return [
                    new bz.Event(
                        bz.EventType.SHOW_GUI_MESSAGE,
                        new bz.EventDataShowGuiMessage( 'Picked up some shotgun shells' )
                    ),
                    new bz.Event(
                        bz.EventType.SHOW_GUI_EFFECT,
                        new bz.EventDataShowGuiEffect( bz.GUIFxType.GAIN_ENERGY )
                    ),
                ];
            }

            case bz.ItemType.TRIGGER:
            {
                // events will be overridden in the constructor of bz.Trigger

                return [
                    new bz.Event(
                        bz.EventType.SHOW_GUI_EFFECT,
                        new bz.EventDataShowGuiEffect( bz.GUIFxType.HURT )
                    ),
                    new bz.Event(
                        bz.EventType.SHOW_GUI_MESSAGE,
                        new bz.EventDataShowGuiMessage( 'Ouch .. just hurt myself here ..' )
                    ),
                ];
            }
        }

        return [];
    }

    private static createModelByItemType( stage:bz.Stage, itemType:bz.ItemType ) : bz.Model
    {
        switch ( itemType )
        {
            case bz.ItemType.SHOTGUN_SHELLS:
            {
                return new bz.MeshFactory( stage.getScene(), stage.getConfig().ambientColor )
                    .createImportedModel( bz.ModelFile.ITEM_SHELLS );
            }

            case bz.ItemType.TRIGGER:
            {
                return new bz.Model();
            }
        }
    }
}

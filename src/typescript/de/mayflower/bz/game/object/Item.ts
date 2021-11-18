import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a pickable item.
***********************************************************************************************************************/
export class Item extends bz.Trigger
{
    /** Current rotation Y for this item. */
    private rotY :number = 0.0;

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
            position,
            Item.createEventsByItemType( itemType ),
            Item.createModelByItemType( stage, itemType )
        );
    }

    /** ****************************************************************************************************************
    *   Renders all stage concernings for one tick of the game loop.
    *******************************************************************************************************************/
    public render() : void
    {
        super.render();

        // only render if not picked
        if ( !this.picked )
        {
            // this will prevent the items from tilting
            if ( bz.SettingEngine.KEEP_ITEMS_UPRIGHT_AND_ROTATED )
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
                        new bz.EventDataShowGuiEffect( bz.GUIFxType.PICK_UP_ITEM )
                    ),
                ];
            }

            case bz.ItemType.BULLETS_792MM:
            {
                return [
                    new bz.Event(
                        bz.EventType.SHOW_GUI_MESSAGE,
                        new bz.EventDataShowGuiMessage( 'Picked up some bullets 792mm' )
                    ),
                    new bz.Event(
                        bz.EventType.SHOW_GUI_EFFECT,
                        new bz.EventDataShowGuiEffect( bz.GUIFxType.PICK_UP_ITEM )
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
                return new bz.MeshFactory(
                    stage.getScene(),
                    stage.getConfig().ambientColor
                ).createImportedModel(
                    bz.ModelFile.ITEM_SHOTGUN_SHELLS,
                    BABYLON.Vector3.Zero(),
                    bz.PhysicSet.ITEM
                );
            }

            case bz.ItemType.BULLETS_792MM:
            {
                return new bz.MeshFactory(
                    stage.getScene(),
                    stage.getConfig().ambientColor
                )
                    .createImportedModel(
                        bz.ModelFile.ITEM_SHOTGUN_SHELLS,
                        BABYLON.Vector3.Zero(),
                        bz.PhysicSet.ITEM
                    )
                    .changeTexture(
                        stage.getScene(),
                        bz.SettingResource.PATH_MODEL + 'item/shells.jpg',
                        bz.SettingResource.PATH_MODEL + 'item/bullets792mm.jpg'
                    );
            }
        }
    }
}

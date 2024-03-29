import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a pickable item.
***********************************************************************************************************************/
export class Item extends bz.Collectable
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
            if (
                bz.SettingEngine.ITEMS_ALWAYS_UPRIGHT_AND_ROTATING
                && !bz.SettingEngine.ITEMS_CAN_BE_SHOT
            )
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

    /** ****************************************************************************************************************
    *   Flags this item as 'picked' and disposes the model with all according bullet holes.
    *******************************************************************************************************************/
    public pick() : void
    {
        super.pick();

        // dispose the model and dispose all bullet holes from the stage
        this.model.dispose();
        this.stage.disposeBulletHolesForGameObject( this );
    }

    /** ****************************************************************************************************************
    *   Delivers the current position (1st mesh's pivot point) of the item's physical body.
    *******************************************************************************************************************/
    protected getCurrentPosition() : BABYLON.Vector3
    {
        return this.getModel().getMesh( 0 ).getAbsolutePivotPoint();
    }

    /** ****************************************************************************************************************
    *   Create the default events for this item type.
    *
    *   @param itemType Type of item to create events for.
    *
    *   @return Created events for the specified item type.
    *******************************************************************************************************************/
    private static createEventsByItemType( itemType:bz.ItemType ) : bz.Event[]
    {
        switch ( itemType )
        {
            case bz.ItemType.SHOTGUN_SHELLS:
            {
                return [
                    new bz.Event(
                        bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                        new bz.EventDataShowGuiTextMessage( 'Picked up some shotgun shells' )
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
                        bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                        new bz.EventDataShowGuiTextMessage( 'Picked up some bullets 792mm' )
                    ),
                    new bz.Event(
                        bz.EventType.SHOW_GUI_EFFECT,
                        new bz.EventDataShowGuiEffect( bz.GUIFxType.PICK_UP_ITEM )
                    ),
                ];
            }

            case bz.ItemType.SHOTGUN:
            {
                return [
                    new bz.Event(
                        bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                        new bz.EventDataShowGuiTextMessage( 'Picked up a Benelli M1016 Shotgun' )
                    ),
                    new bz.Event(
                        bz.EventType.SHOW_GUI_EFFECT,
                        new bz.EventDataShowGuiEffect( bz.GUIFxType.PICK_UP_ITEM )
                    ),
                ];
            }

            case bz.ItemType.PAINKILLER:
            {
                return [
                    new bz.Event(
                        bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                        new bz.EventDataShowGuiTextMessage( 'Picked up a Painkiller' )
                    ),
                    new bz.Event(
                        bz.EventType.GAIN_PAINKILLERS,
                        new bz.EventDataGainPainkillers( 1 )
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

    /** ****************************************************************************************************************
    *   Create the representational 3d model for this item type.
    *
    *   @param stage    The stage to create this 3d model in.
    *   @param itemType Type of item to create 3d model for.
    *
    *   @return The created 3d model for the specified item type.
    *******************************************************************************************************************/
    private static createModelByItemType( stage:bz.Stage, itemType:bz.ItemType ) : bz.Model
    {
        switch ( itemType )
        {
            case bz.ItemType.SHOTGUN_SHELLS:
            {
                return stage.getMeshFactory().createImportedModel(
                    bz.ModelFile.ITEM_SHOTGUN_SHELLS,
                    BABYLON.Vector3.Zero(),
                    bz.PhysicSet.ITEM
                );
            }

            case bz.ItemType.BULLETS_792MM:
            {
                return stage.getMeshFactory()
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

            case bz.ItemType.SHOTGUN:
            {
                return stage.getMeshFactory()
                    .createImportedModel(
                        bz.ModelFile.SHOTGUN_M1014,
                        BABYLON.Vector3.Zero(),
                        bz.PhysicSet.ITEM,
                        0.0,
                        bz.ModelCompoundType.NONE
                    ).scaleSize( new BABYLON.Vector3( 0.5, 0.5, 0.5 ) );
            }

            case bz.ItemType.PAINKILLER:
            {
                return stage.getMeshFactory()
                    .createImportedModel(
                        bz.ModelFile.ITEM_SHOTGUN_SHELLS,
                        BABYLON.Vector3.Zero(),
                        bz.PhysicSet.ITEM
                    )
                    .changeTexture(
                        stage.getScene(),
                        bz.SettingResource.PATH_MODEL + 'item/shells.jpg',
                        bz.SettingResource.PATH_MODEL + 'item/bullets44mm.jpg'
                    );
            }
        }
    }
}

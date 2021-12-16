import * as bz from '../../..';

/** ********************************************************************************************************************
*   Offers furniture creator helpers that help to unify the physical behaviour and appearance of furniture game objects.
***********************************************************************************************************************/
export class FurnitureFactory
{
    /** ****************************************************************************************************************
    *   Creates one 'sofa 1' model.
    *******************************************************************************************************************/
    public static addSofa1
    (
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number
    )
    : void
    {
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SOFA_1,
                    position,
                    bz.PhysicSet.SHELVES,
                    rotY,
                    bz.ModelCompoundType.NONE
                ),
                5.0
            )
        );
    }

    /** ****************************************************************************************************************
    *   Creates one 'office chair 1' model.
    *******************************************************************************************************************/
    public static addOfficeChair1
    (
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number
    )
    : void
    {
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                    position,
                    bz.PhysicSet.OFFICE_CHAIR,
                    rotY,
                    bz.ModelCompoundType.COMPOUND
                ),
                5.0
            )
        );
    }

    /** ****************************************************************************************************************
    *   Adds a computer desk to the stage.
    *
    *   @param stage       The stage to add the object to.
    *   @param meshFactory The MeshFactory instance.
    *   @param position    The position to place the desk.
    *   @param rotY        The rotation Y of the desk.
    *******************************************************************************************************************/
    public static addComputerDesk(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number = 0.0
    )
    : void
    {
        // office desk 1
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.OFFICE_DESK_1,
                    position,
                    bz.PhysicSet.SHELVES,
                    rotY,
                    bz.ModelCompoundType.NONE // bz.ModelCompoundType.COMPOUND,
                ),
                5.0
            )
        );

        // pc screen 1
        const screen :bz.Wall = new bz.Wall
        (
            stage,
            meshFactory.createImportedModel
            (
                bz.ModelFile.PC_SCREEN_1,
                position.add( new BABYLON.Vector3( 2.5, 2.8, 2.5 ) ),
                bz.PhysicSet.SHELVES,
                180.0,
                bz.ModelCompoundType.NONE
            ),
            5.0,
            true,
            false,
            [
                new bz.Event(
                    bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                    new bz.EventDataShowGuiTextMessage( 'All cleared for today.' )
                ),
                new bz.Event(
                    bz.EventType.TIME_DELAY,
                    new bz.EventDataTimeDelay( 600 )
                ),
                new bz.Event(
                    bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                    new bz.EventDataShowGuiTextMessage( 'DELAYED: No more work for today.' )
                ),
            ],
            bz.InteractionType.ONCE
        );
        screen.getModel().rotateAroundAxisY( position.x, position.z, rotY );
        stage.addWall( screen );
    }

    /** ****************************************************************************************************************
    *   Adds a 'shelves 1' model to the stage.
    *
    *   @param stage       The stage to add the object to.
    *   @param meshFactory The MeshFactory instance.
    *   @param position    The position to place the object.
    *   @param rotY        The rotation Y of the object.
    *******************************************************************************************************************/
    public static addShelves1(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number = 0.0
    )
    : void
    {
        stage.addWall(
            new bz.Wall
            (
                stage,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SHELVES_1,
                    position,
                    bz.PhysicSet.SHELVES,
                    rotY,
                    bz.ModelCompoundType.NONE
                ),
                5.0
            )
        );
    }

    /** ****************************************************************************************************************
    *   Adds a 'sphere 1' model to the stage.
    *
    *   @param stage       The stage to add the object to.
    *   @param meshFactory The MeshFactory instance.
    *   @param position    The position to place the object.
    *   @param rotY        The rotation Y of the object.
    *******************************************************************************************************************/
    public static addWoodenSphere1(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        rotY        :number = 0.0
    )
    : void
    {
        stage.addWall(
            new bz.Wall
            (
                stage,
                new bz.Model
                (
                    meshFactory.createSphere
                    (
                        position,
                        bz.MeshAnchor.CENTER_XYZ,
                        3.0,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                        bz.TextureFile.MODEL_WOOD_HORZ,
                        null,
                        bz.PhysicSet.WHITE_TEST_SPHERE
                    )
                )
            )
        );
    }
}

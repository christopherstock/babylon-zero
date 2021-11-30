import * as bz from '../..';

/** ********************************************************************************************************************
*   Offers creation methods for walls and models construction.
***********************************************************************************************************************/
export abstract class WallFactory
{
    /** ****************************************************************************************************************
    *   Creates one wooden crate.
    *
    *   @param stage Stage to create the crate in.
    *   @param meshFactory The meshFactory for model creation.
    *   @param position    The initial position of the crate.
    *
    *   @return The created wooden crate.
    *******************************************************************************************************************/
    public static createWoodenCrate(
        stage              :bz.Stage,
        meshFactory        :bz.MeshFactory,
        position           :BABYLON.Vector3
    )
    : bz.Wall
    {
        return new bz.Wall
        (
            stage,
            meshFactory.createImportedModel
            (
                bz.ModelFile.CRATE,
                position,
                bz.PhysicSet.CRATE_WOOD
            ),
            bz.MathUtil.getRandomInt( bz.SettingGame.CRATE_MIN_ENERGY, bz.SettingGame.CRATE_MAX_ENERGY )
        )
    }

    /** ****************************************************************************************************************
    *   Creates a fence.
    *
    *   @param stage       Stage to create the fence in.
    *   @param meshFactory The meshFactory for model creation.
    *   @param position    The initial position of the fence.
    *   @param ids         The ids of the fence pieces.
    *   @param rotY        Rotation on axis Y for the fence.
    *
    *   @return The created wooden crate.
    *******************************************************************************************************************/
    public static createFence(
        stage       :bz.Stage,
        meshFactory :bz.MeshFactory,
        position    :BABYLON.Vector3,
        ids         :number[],
        rotY        :number
    )
    : void
    {
        const fenceWalls  :bz.Wall[]       = [];

        const FENCE_WIOTH :number          = 8.5;
        const anchor      :BABYLON.Vector3 = position.clone();
        let   z           :number          = position.z;

        for ( const id of ids )
        {
            let fileName :string = null;
            switch ( id )
            {
                case 1: fileName = bz.ModelFile.WOODEN_FENCE_1; break;
                case 2: fileName = bz.ModelFile.WOODEN_FENCE_2; break;
                case 3: fileName = bz.ModelFile.WOODEN_FENCE_3; break;
                case 4: fileName = bz.ModelFile.WOODEN_FENCE_4; break;
                case 5:
                default:
                {
                    fileName = bz.ModelFile.WOODEN_FENCE_5;
                    break;
                }
            }

            fenceWalls.push(
                new bz.Wall
                (
                    stage,
                    meshFactory.createImportedModel
                    (
                        fileName,
                        new BABYLON.Vector3( anchor.x, anchor.y, z + ( FENCE_WIOTH / 2 ) ),
                        bz.PhysicSet.SHELVES,
                        0.0
                    )
                )
            );

            z += FENCE_WIOTH;
        }

        // rotate all fence walls around pivot
        for ( const fenceWall of fenceWalls )
        {
            fenceWall.getModel().rotateAroundAxisY( position.x, position.z, rotY );
        }

        // add fence walls to stage
        stage.addWall( fenceWalls );
    }
}

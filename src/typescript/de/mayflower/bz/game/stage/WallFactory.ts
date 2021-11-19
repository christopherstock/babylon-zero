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
}

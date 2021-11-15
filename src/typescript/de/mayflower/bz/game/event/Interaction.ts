import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents one interaction.
***********************************************************************************************************************/
export class Interaction extends bz.Shot
{
    /** ****************************************************************************************************************
    *   Creates a new Interaction.
    *
    *   @param source       The shot source point.
    *   @param rotation     The rotation of the shot source.
    *   @param range        The maximum range of this shot.
    *******************************************************************************************************************/
    public constructor(
        source       :BABYLON.Vector3,
        rotation     :BABYLON.Vector3,
        range        :number
    ) {
        super(
            source,
            rotation,
            range,
            false,
            0
        );
    }
}

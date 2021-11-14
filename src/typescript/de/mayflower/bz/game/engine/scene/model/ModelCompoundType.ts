/** ********************************************************************************************************************
*   Specifies the different compound types for an imported model.
***********************************************************************************************************************/
export enum ModelCompoundType
{
    /** No compound. */
    NONE,

    /** A default compound. No single meshes can be shot off. */
    COMPOUND,

    /** A compound where single meshes can be shot off. This mostly causes weird physical behaviour. */
    COMPOUND_SHOT_OFF_ENABLED,
}

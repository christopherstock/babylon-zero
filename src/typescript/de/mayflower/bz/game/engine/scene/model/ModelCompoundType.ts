/** ****************************************************************************************************************
*   Specifies the different compound types for an imported model.
*******************************************************************************************************************/
export enum ModelCompoundType
{
    /** No compound. */
    NONE,

    /** A compound where no meshes can be shot off. */
    COMPOUND_SHOT_OFF_DISABLED,

    /** A compound where meshes can be shot off. @deprecated Useless! */
    COMPOUND_SHOT_OFF_ENABLED,
}

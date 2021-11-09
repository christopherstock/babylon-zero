/** ********************************************************************************************************************
*   The general physic state of a mesh.
*
*   TODO rename to PhysicBaheviour ?
***********************************************************************************************************************/
export enum PhysicState
{
    /** Specifies a non-collidable object without any physical behaviour. */
    NONE,

    /** Specifies a collidable and non-moving object. */
    STATIC,

    /** Specifies a collidable and movable object. */
    MOVABLE,
}

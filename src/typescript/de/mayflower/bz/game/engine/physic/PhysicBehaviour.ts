/** ********************************************************************************************************************
*   The general physical behaviour of a mesh.
***********************************************************************************************************************/
export enum PhysicBehaviour
{
    /** Mesh is non-collidable and has no physical behaviour. */
    NONE,

    /** Mesh is a collidable and non-moving physical body. */
    STATIC,

    /** Mesh is a collidable and moving physical body. */
    MOVABLE,
}

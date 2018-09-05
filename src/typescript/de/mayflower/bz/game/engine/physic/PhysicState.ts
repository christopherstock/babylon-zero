
    /** ****************************************************************************************************************
    *   The general physic state of a mesh.
    *
    *   TODO This enum makes no sence! STATIC and MOVABLE are equivalent and NONE may be replaced by null!
    *******************************************************************************************************************/
    export enum PhysicState
    {
        /** Specifies a collidable and non-moving object. */
        STATIC,

        /** Specifies a collidable and movable object. */
        MOVABLE,

        /** Specifies a non-collidable object. */
        NONE,
    }

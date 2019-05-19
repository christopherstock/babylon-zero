
    /** ****************************************************************************************************************
    *   The general physic state of a mesh.
    *******************************************************************************************************************/
    export enum PhysicState
    {
        /** Specifies a collidable and non-moving object. */
        STATIC,

        /** Specifies a collidable and movable object. */
        MOVABLE,

        /** Specifies a non-collidable object. */
        NONE,

        /** Direct non-calculated and magic physic attributes. */
        PLAYER,
    }

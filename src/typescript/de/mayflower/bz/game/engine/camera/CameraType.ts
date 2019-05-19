
    /** ****************************************************************************************************************
    *   All supplied camera types the app supports.
    *******************************************************************************************************************/
    export enum CameraType
    {
        // TODO rename to 'FREE_CAMERA' everywhere?

        /** A free controllable debug camera. */
        FREE_DEBUG,
        /** A stationary stage camera. */
        STATIONARY,
        /** A camera that follows the player's body. */
        FOLLOW,
        /** The first person camera being fixed in the player's head mesh. */
        FIRST_PERSON,
        /** The arc rotation camera. */
        ARC_ROTATE,
    }

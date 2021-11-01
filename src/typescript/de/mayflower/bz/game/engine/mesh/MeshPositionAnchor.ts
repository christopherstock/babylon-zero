
    /** ****************************************************************************************************************
    *   Specifies all anchors for positioning a mesh or sprite.
    *******************************************************************************************************************/
    export enum MeshPositionAnchor
    {
        /** No anchor for static non-moving objects like grounds. */
        NONE,

        /** The anchor is the lowest XYZ point. */
        LOWEST_XYZ,

        /** The anchor is the exact center point of the mesh. */
        CENTER_XYZ,

        /** The anchor if the bottom Y point and the center XZ point. */
        CENTER_XZ_LOWEST_Y,
    }

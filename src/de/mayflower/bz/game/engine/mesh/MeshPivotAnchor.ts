
    /** ****************************************************************************************************************
    *   Specifies all valid anchors for a mesh.
    *******************************************************************************************************************/
    export enum MeshPivotAnchor
    {
        /** No anchor for static moving objects like grounds. */
        NONE,

        /** The anchor is the lowest XYZ point. */
        LOWEST_XYZ,

        /** The anchor is the exact center point of the mesh. */
        CENTER_XYZ,

        /** The anchor if the bottom Y point and the center XZ point. */
        CENTER_XZ_LOWEST_Y,
    }

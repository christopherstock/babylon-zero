/** ****************************************************************************************************************
*   Specifies all anchors for positioning a mesh or sprite.
*******************************************************************************************************************/
export enum MeshAnchor
{
    /** The anchor is the center point of the mesh. This is the default behaviour */
    CENTER_XYZ,

    /** The anchor is the lowest XYZ point. */
    LOWEST_XYZ,

    /** The anchor if the bottom Y point and the center XZ point. */
    CENTER_XZ_LOWEST_Y,
}

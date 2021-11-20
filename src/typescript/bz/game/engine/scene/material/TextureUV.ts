/** ********************************************************************************************************************
*   Specifies the UV strategy of the applied texture.
***********************************************************************************************************************/
export enum TextureUV
{
    /** One texture dimension for the whole face size. */
    ALL_TO_ONE,

    /** One texture dimension per 1.0 world unit. */
    TILED_BY_SIZE,

    /** Two texture dimensions per 1.0 world unit. */
    TILED_BY_SIZE_HALF,

    /** One for Y axis and tiled for axis X Z. */
    Y_ONE_XZ_TILED,
}


    import * as BABYLON from 'babylonjs';
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Specifies the UV strategy of the applied texture.
    *
    *   TODO extract to separate class.
    *******************************************************************************************************************/
    export enum TextureUV
    {
        /** One texture dimension for the whole face size. */
        ALL_TO_ONE,

        /** One texture dimension per 1.0 world unit. */
        TILED_BY_SIZE,
    }

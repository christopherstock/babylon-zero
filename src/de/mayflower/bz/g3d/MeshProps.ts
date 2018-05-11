
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   Specifies if a mesh is static so it will never move.
    *******************************************************************************************************************/
    export enum Physics
    {
        STATIC,
        MOVABLE,
        NONE,
    }

    /*******************************************************************************************************************
    *   Specifies if a texture has an alpha value.
    *******************************************************************************************************************/
    export enum TextureHasAlpha
    {
        YES,
        NO,
    }

    /*******************************************************************************************************************
    *   Specifies the UV handling of the applied texture.
    *******************************************************************************************************************/
    export enum TextureUV
    {
        ACCORDING_TO_SIZE,
        ALL_TO_ONE,
    }

    /*******************************************************************************************************************
    *   Specifies all valid anchors for a mesh.
    *******************************************************************************************************************/
    export enum PivotAnchor
    {
        DEBUG_NONE,
        LOWEST_XYZ,
        CENTER_XYZ,
        CENTER_XZ_LOWEST_Y,
    }

    /*******************************************************************************************************************
    *   Specifies possible physical attributes for meshes.
    *******************************************************************************************************************/
    export class PhysicProps
    {
        /** The player has very special physical attributes with the primal goal to keep the user entertained. */
        public      static  readonly        PLAYER                  :BABYLON.PhysicsImpostorParameters  =
        {
            mass:        2.5,
            friction:    0.0,
            restitution: 0.0,
        };

        public      static  readonly        LIGHT_WOOD              :BABYLON.PhysicsImpostorParameters  =
        {
            mass:        0.5,
            friction:    0.75,
            restitution: 0.0
        };

        public      static  readonly        STATIC                  :BABYLON.PhysicsImpostorParameters  =
        {
            mass:        0.0,
            friction:    1.0,
            restitution: 0.0
        };
    }

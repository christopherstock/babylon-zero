
    import * as bz from '../../../index';

    /** ****************************************************************************************************************
    *   Specifies densities with their the physical behaviour of a body.
    *******************************************************************************************************************/
    export enum PhysicDensity
    {
        /** The density value for static bodies. */
        STATIC = 0.0,

        /** The density value for 'light wood'. */
        LIGHT_WOOD = 0.5,
        /** The density value for 'solid wood'. */
        SOLID_WOOD = 1.0,
        /** The density value for 'concrete'. */
        CONCRETE   = 1.5,

        /** The density value for the player. */
        PLAYER     = 2.5,
    }

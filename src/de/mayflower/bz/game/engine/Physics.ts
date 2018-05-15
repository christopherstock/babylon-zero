
    import * as bz      from '../..';
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   The general physic state of a mesh.
    *******************************************************************************************************************/
    export enum PhysicState
    {
        STATIC,
        MOVABLE,
        NONE,
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
            friction:    1.0,
            restitution: 0.0
        };

        public      static  readonly        STATIC                  :BABYLON.PhysicsImpostorParameters  =
        {
            mass:        0.0,
            friction:    1.0,
            restitution: 0.0
        };
    }

    /*******************************************************************************************************************
    *   Specifies the sprite system.
    *******************************************************************************************************************/
    export class Physics
    {
        /** The general physics state. */
        private                     state                           :bz.PhysicState                     = null;

        /** The general physics state. */
        private                     params                          :BABYLON.PhysicsImpostorParameters  = null;
    }

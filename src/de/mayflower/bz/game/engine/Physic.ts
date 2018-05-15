
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

        public static createFromMass() : BABYLON.PhysicsImpostorParameters
        {
            // ..

            return null;
        }
    }

    /*******************************************************************************************************************
    *   Specifies the sprite system.
    *******************************************************************************************************************/
    export class Physic
    {
        /** The general physics state. */
        public                      state                           :bz.PhysicState                     = null;

        /** The general physics state. */
        public                      params                          :BABYLON.PhysicsImpostorParameters  = null;

        constructor( state:bz.PhysicState, params:BABYLON.PhysicsImpostorParameters )
        {
            this.state  = state;
            this.params = params;
        }
    }

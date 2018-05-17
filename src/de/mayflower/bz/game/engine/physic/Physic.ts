
    import * as bz      from '../../..';
    import * as BABYLON from 'babylonjs';

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

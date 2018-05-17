
    import * as bz      from '../../..';
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   The general physic state of a mesh.
    *******************************************************************************************************************/
    export enum PhysicState
    {
        /** Specifies a collidable and non-moving object. */
        STATIC,
        /** Specifies a collidable and movable object. */
        MOVABLE,
        /** Specifies a non-collidable object. */
        NONE,
    }

    /*******************************************************************************************************************
    *   Bundles physical settings to apply to a mesh.
    *******************************************************************************************************************/
    export class Physic
    {
        /** The general physics state. */
        public                      state                           :bz.PhysicState                     = null;

        /** Physical attributes. */
        public                      params                          :BABYLON.PhysicsImpostorParameters  = null;

        /***************************************************************************************************************
        *   Creates a new physical setting.
        *
        *   @param state  The physical state for this setting.
        *   @param params The physical params for this setting.
        ***************************************************************************************************************/
        constructor( state:bz.PhysicState, params:BABYLON.PhysicsImpostorParameters )
        {
            this.state  = state;
            this.params = params;
        }
    }

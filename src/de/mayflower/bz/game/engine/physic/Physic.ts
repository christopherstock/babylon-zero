
    import * as bz      from '../../..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   The general physic state of a mesh.
    *
    *   TODO to PhysicSet!
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

    /** ****************************************************************************************************************
    *   Bundles physical settings to apply to a mesh.
    *******************************************************************************************************************/
    export class Physic
    {
        /** The general physic state. TODO put state to physicSet !! */
        public                      state                           :bz.PhysicState                     = null;

        /** The physical properties. TODO revise name? */
        public                      props                           :bz.PhysicSet                     = null;

        /** ************************************************************************************************************
        *   Creates a new physical setting.
        *
        *   @param state The physical state for this setting.
        *   @param props The physical properties for this setting.
        ***************************************************************************************************************/
        constructor( state:bz.PhysicState, props:bz.PhysicSet )
        {
            this.state = state;
            this.props = props;
        }

        /** ************************************************************************************************************
        *   Creates the physical impostor parameters for these physic set.
        *
        *   @param volume The volume of the mesh to create the impostor parameters for.
        *
        *   @return The impostor parameters for these physical settings.
        ***************************************************************************************************************/
        public createFromDensity( volume:number ) : BABYLON.PhysicsImpostorParameters
        {
            let mass:number = 0.0;

            switch ( this.state )
            {
                case PhysicState.STATIC:
                {
                    mass = 0.0;
                    break;
                }

                case PhysicState.MOVABLE:
                {
                    mass = 1.0;
                    break;
                }

                case PhysicState.NONE:
                {
                    break;
                }
            }

            return {
                mass:        mass,
                friction:    this.props.friction,
                restitution: this.props.restitution
            };
        }
    }

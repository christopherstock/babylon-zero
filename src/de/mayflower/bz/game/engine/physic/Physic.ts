
    import * as bz from '../../../index';

    /** ****************************************************************************************************************
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

    /** ****************************************************************************************************************
    *   Specifies the physical behaviour of a body.
    *******************************************************************************************************************/
    export class Physic
    {
        /** The player has very special physical attributes with the primal goal to keep the user entertained. */
        public  static  readonly    NONE        :Physic             = new Physic
        (
            PhysicState.NONE,
            null,
            0.0,
            0.0
        );

        /** The player has very special physical attributes with the primal goal to keep the user entertained. */
        public  static  readonly    PLAYER      :Physic             = new Physic
        (
            PhysicState.MOVABLE,
            PhysicDensity.PLAYER,
            0.0,
            0.0
        );

        /** Props for light wood. */
        public  static  readonly    LIGHT_WOOD  :Physic             = new Physic
        (
            PhysicState.MOVABLE,
            PhysicDensity.LIGHT_WOOD,
            1.0,
            0.0
        );

        /** Physical properties for a non-moving and collidable body. */
        public  static  readonly    STATIC      :Physic             = new Physic
        (
            PhysicState.STATIC,
            PhysicDensity.STATIC,
            1.0,
            0.0
        );

        /** The general physic state of this physics setting. */
        public          readonly    state       :bz.PhysicState     = null;
        /** The density of this physics setting. */
        public          readonly    density     :bz.PhysicDensity   = null;
        /** The friction of this physics setting */
        public          readonly    friction    :number             = 0.0;
        /** The density of this physics setting */
        public          readonly    restitution :number             = 0.0;

        /** ************************************************************************************************************
        *   Creates a new set of physical properties.
        *
        *   @param state       The general physical state for this setting.
        *   @param density     The density of this physical body setting.
        *   @param friction    The friction of this physical body setting.
        *   @param restitution The restitution of this physical body setting.
        ***************************************************************************************************************/
        public constructor( state:PhysicState, density:PhysicDensity, friction:number, restitution:number )
        {
            this.state       = state;
            this.density     = density;
            this.friction    = friction;
            this.restitution = restitution;
        }

        /** ************************************************************************************************************
        *   Creates the physical impostor parameters for these physic set.
        *
        *   @param volume The volume of the mesh to create the impostor parameters for.
        *
        *   @return The impostor parameters for these physical settings.
        ***************************************************************************************************************/
        public createImpostorParams( volume:number ) : BABYLON.PhysicsImpostorParameters
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
                    mass = ( volume * this.density );
                    break;
                }

                case PhysicState.NONE:
                {
                    break;
                }
            }

            return {
                mass:        mass,
                friction:    this.friction,
                restitution: this.restitution
            };
        }
    }

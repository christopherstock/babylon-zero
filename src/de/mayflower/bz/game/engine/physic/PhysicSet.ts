
    import * as BABYLON from 'babylonjs';

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
    export class PhysicSet
    {
        /** The player has very special physical attributes with the primal goal to keep the user entertained. */
        public  static  readonly    PLAYER      :PhysicSet      = new PhysicSet( PhysicDensity.PLAYER, 0.0, 0.0 );

        /** Props for light wood. */
        public  static  readonly    LIGHT_WOOD  :PhysicSet      = new PhysicSet( PhysicDensity.LIGHT_WOOD, 1.0, 0.0 );

        /** Physical properties for a non-moving and collidable body. */
        public  static  readonly    STATIC      :PhysicSet      = new PhysicSet( PhysicDensity.STATIC, 1.0, 0.0 );

        /** The density of this physics body. */
        public          readonly    density     :number         = 0.0;
        /** The friction of this physics body. */
        public          readonly    friction    :number         = 0.0;
        /** The density of this physics body. */
        public          readonly    restitution :number         = 0.0;

        /** ************************************************************************************************************
        *   Creates a new set of physical properties.
        *
        *   @param density     The density of the physical body.
        *   @param friction    The friction of the physical body.
        *   @param restitution The restitution of the physical body.
        ***************************************************************************************************************/
        public constructor( density:PhysicDensity, friction:number, restitution:number )
        {
            this.density     = density;
            this.friction    = friction;
            this.restitution = restitution;
        }
    }

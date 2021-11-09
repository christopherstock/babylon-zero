import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies different physical objects
***********************************************************************************************************************/
export class PhysicObject
{
    /** A non-collidable and non-gravitational affected physical state. */
    public  static  readonly        NONE                :PhysicObject           = new PhysicObject
    (
        bz.PhysicBehaviour.NONE,
        bz.PhysicFriction.NONE,
        bz.PhysicRestitution.NONE,
        0
    );

    /** Physical properties for a non-moving and collidable body. */
    public  static  readonly        STATIC              :PhysicObject           = new PhysicObject
    (
        bz.PhysicBehaviour.STATIC,
        bz.PhysicFriction.MEDIUM,
        bz.PhysicRestitution.MEDIUM,
        0
    );

    /** The player has very special physical attributes with the primal goal to keep the user entertained. */
    public  static  readonly        PLAYER_HUMAN        :PhysicObject           = new PhysicObject
    (
        bz.PhysicBehaviour.MOVABLE,
        bz.PhysicFriction.NONE,
        bz.PhysicRestitution.NONE,
        1413.0
    );

    /** A wooden crate. */
    public  static  readonly        CRATE_WOOD          :PhysicObject           = new PhysicObject
    (
        bz.PhysicBehaviour.MOVABLE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        2.5
    );

    /** A steel crate. */
    public  static  readonly        CRATE_STEEL         :PhysicObject           = new PhysicObject
    (
        bz.PhysicBehaviour.MOVABLE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        7.75
    );

    /** Synthetic impostor for scattered meshes. */
    public  static  readonly        SYNTHETIC_IMPOSTOR  :PhysicObject           = new PhysicObject
    (
        bz.PhysicBehaviour.MOVABLE,
        bz.PhysicFriction.MEDIUM,
        bz.PhysicRestitution.MEDIUM,
        1.0
    );

    /** Props for solid concrete. */
    public  static  readonly        OFFICE_CHAIR        :PhysicObject           = new PhysicObject
    (
        bz.PhysicBehaviour.MOVABLE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        0.10
    );

    /** Props for white test sphere wood. */
    public  static  readonly        WHITE_TEST_SPHERE   :PhysicObject           = new PhysicObject
    (
        bz.PhysicBehaviour.MOVABLE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        7.0
    );

    /** The general physical behaviour of this physics object. */
    private         readonly        behaviour           :bz.PhysicBehaviour     = null;
    /** The friction of this physics setting */
    private         readonly        friction            :bz.PhysicFriction      = null;
    /** The restitution of this physics setting */
    private         readonly        restitution         :bz.PhysicRestitution   = null;
    /** The weight of this physics setting. */
    private         readonly        weight              :number                 = 0.0;

    /** ****************************************************************************************************************
    *   Creates a new set of physical properties.
    *
    *   @param behaviour       The general physical state for this setting.
    *   @param friction    The friction of this physical body setting.
    *   @param restitution The restitution of this physical body setting.
    *   @param weight      The weight of this physical body in kilograms.
    *******************************************************************************************************************/
    private constructor
    (
        behaviour   :bz.PhysicBehaviour,
        friction    :bz.PhysicFriction,
        restitution :bz.PhysicRestitution,
        weight      :number
    )
    {
        this.behaviour   = behaviour;
        this.friction    = friction;
        this.restitution = restitution;
        this.weight      = weight;
    }
}

import * as bz from '../..';

/** ********************************************************************************************************************
*   Defines different physical object behaviour.
***********************************************************************************************************************/
export class PhysicSet
{
    /** A non-collidable and non-gravitational affected physical state. */
    public static readonly NONE                 :PhysicSet      = new PhysicSet
    (
        bz.PhysicBehaviour.NONE,
        bz.PhysicFriction.NONE,
        bz.PhysicRestitution.NONE,
        0
    );

    /** Physical properties for a non-moving and collidable body. */
    public static readonly STATIC               :PhysicSet      = new PhysicSet
    (
        bz.PhysicBehaviour.STATIC,
        bz.PhysicFriction.MEDIUM,
        bz.PhysicRestitution.NONE,
        0
    );

    /** The player has very special physical attributes. */
    public static readonly PLAYER_HUMAN         :PhysicSet      = new PhysicSet
    (
        bz.PhysicBehaviour.MOVABLE,
        bz.PhysicFriction.NONE,
        bz.PhysicRestitution.NONE,
        bz.SettingPlayer.PLAYER_MASS
    );

    /** The item has special physical attributes. */
    public static readonly ITEM                 :PhysicSet      = new PhysicSet
    (
        bz.PhysicBehaviour.MOVABLE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.MEDIUM,
        1.0
    );

    /** A wooden crate. */
    public static readonly CRATE_WOOD           :PhysicSet      = new PhysicSet
    (
        bz.PhysicBehaviour.MOVABLE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        2.5
    );

    /** Synthetic impostor for scattered meshes. */
    public static readonly SYNTHETIC_IMPOSTOR   :PhysicSet      = new PhysicSet
    (
        bz.PhysicBehaviour.MOVABLE,
        bz.PhysicFriction.MEDIUM,
        bz.PhysicRestitution.MEDIUM,
        1.0
    );

    /** Props for solid concrete. */
    public static readonly OFFICE_CHAIR         :PhysicSet      = new PhysicSet
    (
        bz.PhysicBehaviour.MOVABLE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        0.10
    );

    /** Props for shelves. */
    public static readonly SHELVES              :PhysicSet      = new PhysicSet
    (
        bz.PhysicBehaviour.STATIC,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        25.0
    );

    /** Props for shelves. */
    public static readonly SODA_MACHINE         :PhysicSet      = new PhysicSet
    (
        bz.PhysicBehaviour.STATIC,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        100.0
    );

    /** Props for white test sphere wood. */
    public static readonly WHITE_TEST_SPHERE    :PhysicSet     = new PhysicSet
    (
        bz.PhysicBehaviour.MOVABLE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        7.0
    );

    /** The general physical behaviour of this physics object. */
    public readonly behaviour       :bz.PhysicBehaviour     = null;
    /** The friction of this physics setting */
    public readonly friction        :bz.PhysicFriction      = null;
    /** The restitution of this physics setting */
    public readonly restitution     :bz.PhysicRestitution   = null;
    /** The weight of this physics setting. */
    public readonly weight          :number                 = 0.0;

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

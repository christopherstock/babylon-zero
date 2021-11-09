import * as bz from '../../..';

/** ********************************************************************************************************************
*   Specifies the physical behaviour of a body.
*
*   TODO Simplify / Remove 'density': just using mass everywhere - seems much simpler!
*   TODO outsource constant data (from constructor) to base/data/PhysicsSet etc ?
***********************************************************************************************************************/
export class PhysicBody
{
    /** A non-collidable and non-gravitational affected physical state. */
    public  static  readonly        NONE                :PhysicBody             = new PhysicBody
    (
        bz.PhysicState.NONE,
        bz.PhysicFriction.NONE,
        bz.PhysicRestitution.NONE,
        0
    );

    /** The player has very special physical attributes with the primal goal to keep the user entertained. */
    public  static  readonly        PLAYER_HUMAN        :PhysicBody             = new PhysicBody
    (
        bz.PhysicState.MOVABLE,
        bz.PhysicFriction.NONE,
        bz.PhysicRestitution.NONE,
        1413.0
    );

    /** Props for light wood. */
    public  static  readonly        CRATE_WOOD          :PhysicBody                 = new PhysicBody
    (
        bz.PhysicState.MOVABLE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        2.5
    );

    /** Synthetic impostor for scattered meshes. */
    public  static  readonly        SYNTHETIC_IMPOSTOR  :PhysicBody                 = new PhysicBody
    (
        bz.PhysicState.MOVABLE,
        bz.PhysicFriction.MEDIUM,
        bz.PhysicRestitution.MEDIUM,
        1.0
    );

    /** Props for solid concrete. */
    public  static  readonly        OFFICE_CHAIR        :PhysicBody                 = new PhysicBody
    (
        bz.PhysicState.MOVABLE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        0.10
    );

    /** Physical properties for a non-moving and collidable body. */
    public  static  readonly        STATIC              :PhysicBody                 = new PhysicBody
    (
        bz.PhysicState.STATIC,
        bz.PhysicFriction.MEDIUM,
        bz.PhysicRestitution.MEDIUM,
        0
    );

    /** Props for light wood. */
    public  static  readonly        CRATE_STEEL                 :PhysicBody                 = new PhysicBody
    (
        bz.PhysicState.MOVABLE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        7.75
    );

    /** Props for white test sphere wood. */
    public  static  readonly        WHITE_TEST_SPHERE           :PhysicBody                 = new PhysicBody
    (
        bz.PhysicState.MOVABLE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        7.0
    );

    /** The general physic state of this physics object. */
    private         readonly        state           :bz.PhysicState         = null;
    /** The friction of this physics setting */
    private         readonly        friction        :bz.PhysicFriction      = null;
    /** The restitution of this physics setting */
    private         readonly        restitution     :bz.PhysicRestitution   = null;
    /** The weight of this physics setting. */
    private         readonly        weight          :number                 = 0.0;

    /** ****************************************************************************************************************
    *   Creates a new set of physical properties.
    *
    *   @param state       The general physical state for this setting.
    *   @param friction    The friction of this physical body setting.
    *   @param restitution The restitution of this physical body setting.
    *   @param weight      The weight of this physical body in kilograms.
    *******************************************************************************************************************/
    private constructor
    (
        state       :bz.PhysicState,
        friction    :bz.PhysicFriction,
        restitution :bz.PhysicRestitution,
        weight      :number
    )
    {
        this.state       = state;
        this.friction    = friction;
        this.restitution = restitution;
        this.weight      = weight;
    }

    /** ****************************************************************************************************************
    *   Applies the specified physical behaviour to the given mesh.
    *
    *   @param scene        The babylon.JS scene that manages this impostor.
    *   @param mesh         The native babylon.JS mesh to set the physical behaviour for.
    *   @param impostorType The type of physics impostor to set.
    *******************************************************************************************************************/
    public applyPhysicToMesh
    (
        scene        :BABYLON.Scene,
        mesh         :BABYLON.AbstractMesh,
        impostorType :number
    )
    : void
    {
        switch ( this.state )
        {
            case bz.PhysicState.STATIC:
            case bz.PhysicState.MOVABLE:
            {
                const impostorParams:BABYLON.PhysicsImpostorParameters = this.createImpostorParams();
                mesh.checkCollisions = bz.SettingDebug.DEBUG_CAMERA_ENABLE_COLLISIONS;
                mesh.physicsImpostor = new BABYLON.PhysicsImpostor
                (
                    mesh,
                    impostorType,
                    impostorParams,
                    scene
                );
                mesh.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;

                break;
            }

            case bz.PhysicState.NONE:
            {
                // no collisions or impostor
                break;
            }
        }
    }

    /** ****************************************************************************************************************
    *   Creates the physical impostor parameters for these physic set.
    *
    *   @return The impostor parameters for these physical settings.
    *******************************************************************************************************************/
    public createPhysicImpostorParams() : bz.PhysicImpostorParams
    {
        const mass :number = this.weight;

        return bz.PhysicImpostorParams.fromParams
        (
            BABYLON.PhysicsImpostor.BoxImpostor,
            mass,
            this.friction,
            this.restitution
        );
    }

    /** ****************************************************************************************************************
    *   Creates the physical impostor parameters for these physic set.
    *
    *   @return The impostor parameters for these physical settings.
    *******************************************************************************************************************/
    private createImpostorParams() : BABYLON.PhysicsImpostorParameters
    {
        let mass:number = 0.0;

        switch ( this.state )
        {
            case bz.PhysicState.STATIC:
            {
                mass = 0.0;
                break;
            }

            case bz.PhysicState.MOVABLE:
            {
                mass = this.weight;
                break;
            }

            case bz.PhysicState.NONE:
            {
                break;
            }
        }

        return {
            mass:        mass,
            friction:    this.friction,
            restitution: this.restitution,

            disableBidirectionalTransformation: false,
        };
    }
}

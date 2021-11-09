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
        null,
        bz.PhysicFriction.NONE,
        bz.PhysicRestitution.NONE,
        0
    );

    /** The player has very special physical attributes with the primal goal to keep the user entertained. */
    public  static  readonly        PLAYER_HUMAN        :PhysicBody             = new PhysicBody
    (
        bz.PhysicState.MOVABLE,
        bz.SettingPlayer.MASS,
        bz.PhysicFriction.NONE,
        bz.PhysicRestitution.NONE,
        1413.0
    );

    /** Props for light wood. */
    public  static  readonly        CRATE_WOOD          :PhysicBody                 = new PhysicBody
    (
        bz.PhysicState.MOVABLE,
        0.5,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        2.5
    );

    /** Synthetic impostor for scattered meshes. */
    public  static  readonly        SYNTHETIC_IMPOSTOR  :PhysicBody                 = new PhysicBody
    (
        bz.PhysicState.MOVABLE,
        1.0,
        bz.PhysicFriction.MEDIUM,
        bz.PhysicRestitution.MEDIUM,
        1.0
    );

    /** Props for solid concrete. */
    public  static  readonly        OFFICE_CHAIR        :PhysicBody                 = new PhysicBody
    (
        bz.PhysicState.MOVABLE,
        2.5,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        0.10
    );

    /** Physical properties for a non-moving and collidable body. */
    public  static  readonly        STATIC              :PhysicBody                 = new PhysicBody
    (
        bz.PhysicState.STATIC,
        0.0,
        bz.PhysicFriction.MEDIUM,
        bz.PhysicRestitution.MEDIUM,
        0
    );

    /** Props for light wood. */
    public  static  readonly        CRATE_STEEL                 :PhysicBody                 = new PhysicBody
    (
        bz.PhysicState.MOVABLE,
        0.5,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        7.75
    );

    /** Props for white test sphere wood. */
    public  static  readonly        WHITE_TEST_SPHERE           :PhysicBody                 = new PhysicBody
    (
        bz.PhysicState.MOVABLE,
        0.5,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE,
        7.0
    );

    /** The general physic state of this physics object. */
    private         readonly        state           :bz.PhysicState         = null;
    /** The density of this physics setting. */
    private         readonly        density         :number                 = 0.0;
    /** The weight of this physics setting. */
    private         readonly        weight          :number                 = 0.0;
    /** The friction of this physics setting */
    private         readonly        friction        :bz.PhysicFriction      = null;
    /** The restitution of this physics setting */
    private         readonly        restitution     :bz.PhysicRestitution   = null;

    /** ****************************************************************************************************************
    *   Creates a new set of physical properties.
    *
    *   @param state       The general physical state for this setting.
    *   @param density     The density of this physical body setting.
    *   @param friction    The friction of this physical body setting.
    *   @param restitution The restitution of this physical body setting.
    *   @param weight      The weight of this physical body in kilograms.
    *******************************************************************************************************************/
    private constructor
    (
        state       :bz.PhysicState,
        density     :number,
        friction    :bz.PhysicFriction,
        restitution :bz.PhysicRestitution,
        weight      :number
    )
    {
        this.state       = state;
        this.density     = density;
        this.friction    = friction;
        this.restitution = restitution;
        this.weight      = weight;
    }

    /** ****************************************************************************************************************
    *   Applies the specified physical behaviour to the given mesh.
    *
    *   @param scene        The babylon.JS scene that manages this impostor.
    *   @param mesh         The native babylon.JS mesh to set the physical behaviour for.
    *   @param volume       The calculated volume of the mesh.
    *   @param impostorType The type of physics impostor to set.
    *******************************************************************************************************************/
    public applyPhysicToMesh
    (
        scene        :BABYLON.Scene,
        mesh         :BABYLON.AbstractMesh,
        volume       :number,
        impostorType :number
    )
    : void
    {
        switch ( this.state )
        {
            case bz.PhysicState.STATIC:
            case bz.PhysicState.MOVABLE:
            {
                const impostorParams:BABYLON.PhysicsImpostorParameters = this.createImpostorParams( volume );
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
    *   @param volume The volume of the mesh to create the impostor parameters for.
    *
    *   @return The impostor parameters for these physical settings.
    *******************************************************************************************************************/
    public createPhysicImpostorParams( volume:number ) : bz.PhysicImpostorParams
    {
        let newMass :number = ( volume * this.density );

        if (this.weight !== -1)
        {
            newMass = this.weight;
        }
        else
        {
            console.log( '>> B >> volume * density: ' + (newMass) );
        }

        return bz.PhysicImpostorParams.fromParams
        (
            BABYLON.PhysicsImpostor.BoxImpostor,
            newMass,
            this.friction,
            this.restitution
        );
    }

    /** ****************************************************************************************************************
    *   Creates the physical impostor parameters for these physic set.
    *
    *   @param volume The volume of the mesh to create the impostor parameters for.
    *                 TODO remove with weight.
    *
    *   @return The impostor parameters for these physical settings.
    *******************************************************************************************************************/
    private createImpostorParams( volume:number ) : BABYLON.PhysicsImpostorParameters
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
                mass = ( volume * this.density );

                if (this.weight !== -1)
                {
                    mass = this.weight;
                }
                else {
                    console.log( '>> B >> volume * density: ' + (mass) );
                }

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

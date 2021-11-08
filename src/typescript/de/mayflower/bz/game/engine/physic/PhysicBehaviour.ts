import * as bz from '../../..';

/** ********************************************************************************************************************
*   Specifies the physical behaviour of a body.
*
*   TODO Simplify 'density': just using mass everywhere - seems much simpler!
*   TODO outsource constant data (from constructor) to PhysicsSet etc ?
***********************************************************************************************************************/
export class PhysicBehaviour
{
    /** A non-collidable and non-gravitational affected physical state. */
    public  static  readonly        NONE                :PhysicBehaviour             = new PhysicBehaviour
    (
        bz.PhysicState.NONE,
        null,
        bz.PhysicFriction.NONE,
        bz.PhysicRestitution.NONE
    );

    /** The player has very special physical attributes with the primal goal to keep the user entertained. */
    public  static  readonly        PLAYER_HUMAN        :PhysicBehaviour             = new PhysicBehaviour
    (
        bz.PhysicState.MOVABLE,
        bz.SettingPlayer.MASS,
        bz.PhysicFriction.NONE,
        bz.PhysicRestitution.NONE
    );

    /** Props for light wood. */
    public  static  readonly        LIGHT_WOOD      :PhysicBehaviour                 = new PhysicBehaviour
    (
        bz.PhysicState.MOVABLE,
        bz.PhysicDensity.LIGHT_WOOD,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE
    );

    /** Props for solid wood. */
    public  static  readonly        SOLID_WOOD      :PhysicBehaviour                 = new PhysicBehaviour
    (
        bz.PhysicState.MOVABLE,
        bz.PhysicDensity.SOLID_WOOD,
        bz.PhysicFriction.MEDIUM,
        bz.PhysicRestitution.MEDIUM
    );

    /** Props for concrete. */
    public  static  readonly        CONCRETE        :PhysicBehaviour                 = new PhysicBehaviour
    (
        bz.PhysicState.MOVABLE,
        bz.PhysicDensity.CONCRETE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE
    );

    /** Props for solid concrete. */
    public  static  readonly        SOLID_CONCRETE  :PhysicBehaviour                 = new PhysicBehaviour
    (
        bz.PhysicState.MOVABLE,
        bz.PhysicDensity.SOLID_CONCRETE,
        bz.PhysicFriction.HIGH,
        bz.PhysicRestitution.NONE
    );

    /** Props for a physical compound object. */
    public  static  readonly        COMPOUND        :PhysicBehaviour                 = new PhysicBehaviour
    (
        bz.PhysicState.MOVABLE,
        bz.PhysicDensity.DEFAULT,
        bz.PhysicFriction.MEDIUM,
        bz.PhysicRestitution.MEDIUM
    );

    /** Physical properties for a non-moving and collidable body. */
    public  static  readonly        STATIC          :PhysicBehaviour                 = new PhysicBehaviour
    (
        bz.PhysicState.STATIC,
        bz.PhysicDensity.STATIC,
        bz.PhysicFriction.MEDIUM,
        bz.PhysicRestitution.MEDIUM
    );

    /** The general physic state of this physics setting. */
    private         readonly        state           :bz.PhysicState         = null;
    /** The density of this physics setting. */
    private         readonly        density         :bz.PhysicDensity       = null;
    /** The friction of this physics setting */
    private         readonly        friction        :bz.PhysicFriction      = null;
    /** The density of this physics setting */
    private         readonly        restitution     :bz.PhysicRestitution   = null;

    /** ****************************************************************************************************************
    *   Creates a new set of physical properties.
    *
    *   @param state       The general physical state for this setting.
    *   @param density     The density of this physical body setting.
    *   @param friction    The friction of this physical body setting.
    *   @param restitution The restitution of this physical body setting.
    *******************************************************************************************************************/
    private constructor
    (
        state       :bz.PhysicState,
        density     :bz.PhysicDensity,
        friction    :bz.PhysicFriction,
        restitution :bz.PhysicRestitution
    )
    {
        this.state       = state;
        this.density     = density;
        this.friction    = friction;
        this.restitution = restitution;
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
        return bz.PhysicImpostorParams.fromParams
        (
            BABYLON.PhysicsImpostor.BoxImpostor,
            ( volume * this.density ),
            this.friction,
            this.restitution
        );
    }

    /** ****************************************************************************************************************
    *   Creates the physical impostor parameters for these physic set.
    *
    *   @param volume The volume of the mesh to create the impostor parameters for.
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
                break;
            }

// TODO never passed if Player is an imported model !! .. enable explicit physics setting!?
/*
            case bz.PhysicState.PLAYER:
            {
                return {
                    mass:                               bz.SettingPlayer.MASS,
                    friction:                           0.0,
                    restitution:                        0.0,
                    disableBidirectionalTransformation: false,
                };
            }
*/
            case bz.PhysicState.NONE:
            {
                break;
            }
        }

        return {
            mass:                               mass,
            friction:                           this.friction,
            restitution:                        this.restitution,
            disableBidirectionalTransformation: false,
        };
    }
}

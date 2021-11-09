/* eslint-disable max-len */

import * as bz from '../../..';

/** ********************************************************************************************************************
*   Specifies the physical behaviour of a body.
***********************************************************************************************************************/
export class PhysicBody
{
    /** A non-collidable and non-gravitational affected physical state. */
    public  static  readonly        NONE                :PhysicBody                 = new PhysicBody( bz.PhysicObject.NONE );

    /** Physical properties for a non-moving and collidable body. */
    public  static  readonly        STATIC              :PhysicBody                 = new PhysicBody( bz.PhysicObject.STATIC );

    /** The player has very special physical attributes with the primal goal to keep the user entertained. */
    public  static  readonly        PLAYER_HUMAN        :PhysicBody                 = new PhysicBody( bz.PhysicObject.PLAYER_HUMAN );

    /** A wooden crate. */
    public  static  readonly        CRATE_WOOD          :PhysicBody                 = new PhysicBody( bz.PhysicObject.CRATE_WOOD );

    /** A steel crate. */
    public  static  readonly        CRATE_STEEL         :PhysicBody                 = new PhysicBody( bz.PhysicObject.CRATE_STEEL );

    /** Synthetic impostor for scattered meshes. */
    public  static  readonly        SYNTHETIC_IMPOSTOR  :PhysicBody                 = new PhysicBody( bz.PhysicObject.SYNTHETIC_IMPOSTOR );

    /** Props for solid concrete. */
    public  static  readonly        OFFICE_CHAIR        :PhysicBody                 = new PhysicBody( bz.PhysicObject.OFFICE_CHAIR );

    /** Props for white test sphere wood. */
    public  static  readonly        WHITE_TEST_SPHERE   :PhysicBody                 = new PhysicBody( bz.PhysicObject.WHITE_TEST_SPHERE );

    /** The physical object behaviour of this physics body. */
    private         readonly        obj                 :bz.PhysicObject            = null;

    /** ****************************************************************************************************************
    *   Creates a new physical body.
    *
    *   @param obj The physical object behaviour of this physics body.
    *******************************************************************************************************************/
    private constructor( obj:bz.PhysicObject )
    {
        this.obj = obj;
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
        switch ( this.obj.behaviour )
        {
            case bz.PhysicBehaviour.STATIC:
            case bz.PhysicBehaviour.MOVABLE:
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

            case bz.PhysicBehaviour.NONE:
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
    public createPhysicImpostorBoxParams() : bz.PhysicImpostorParams
    {
        const mass :number = this.obj.weight;

        return bz.PhysicImpostorParams.fromParams
        (
            BABYLON.PhysicsImpostor.BoxImpostor,
            mass,
            this.obj.friction,
            this.obj.restitution
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

        switch ( this.obj.behaviour )
        {
            case bz.PhysicBehaviour.STATIC:
            {
                mass = 0.0;
                break;
            }

            case bz.PhysicBehaviour.MOVABLE:
            {
                mass = this.obj.weight;
                break;
            }

            case bz.PhysicBehaviour.NONE:
            {
                break;
            }
        }

        return {
            mass:        mass,
            friction:    this.obj.friction,
            restitution: this.obj.restitution,

            disableBidirectionalTransformation: false,
        };
    }
}

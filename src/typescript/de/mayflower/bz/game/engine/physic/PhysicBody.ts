/* eslint-disable max-len */

import * as bz from '../../..';

/** ********************************************************************************************************************
*   Specifies the physical behaviour of a body.
***********************************************************************************************************************/
export class PhysicBody
{
    /** The physical object behaviour of this physics body. */
    private readonly set :bz.PhysicSet            = null;

    /** ****************************************************************************************************************
    *   Creates a new physical body.
    *
    *   @param set The physical object behaviour of this physics body.
    *******************************************************************************************************************/
    public constructor( set:bz.PhysicSet )
    {
        this.set = set;
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
        switch ( this.set.behaviour )
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
        const mass :number = this.getMass();

        return bz.PhysicImpostorParams.fromParams
        (
            BABYLON.PhysicsImpostor.BoxImpostor,
            mass,
            this.set.friction,
            this.set.restitution
        );
    }

    /** ****************************************************************************************************************
    *   Creates the physical impostor parameters for these physic set.
    *
    *   @return The impostor parameters for these physical settings.
    *******************************************************************************************************************/
    private createImpostorParams() : BABYLON.PhysicsImpostorParameters
    {
        const mass:number = this.getMass();

        return {
            mass:        mass,
            friction:    this.set.friction,
            restitution: this.set.restitution,

            disableBidirectionalTransformation: false,
        };
    }

    private getMass() : number
    {
        switch ( this.set.behaviour )
        {
            case bz.PhysicBehaviour.STATIC:
            {
                return 0.0;
            }

            case bz.PhysicBehaviour.MOVABLE:
            {
                return this.set.weight;
            }

            case bz.PhysicBehaviour.NONE:
            default:
            {
                return 0.0;
            }
        }
    }
}

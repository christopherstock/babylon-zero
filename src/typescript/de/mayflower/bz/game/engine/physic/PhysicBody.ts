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
    *   @param obj The physical object behaviour of this physics body.
    *******************************************************************************************************************/
    public constructor( obj:bz.PhysicSet )
    {
        this.set = obj;
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
        const mass :number = this.set.weight;

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
        let mass:number = 0.0;

        switch ( this.set.behaviour )
        {
            case bz.PhysicBehaviour.STATIC:
            {
                mass = 0.0;
                break;
            }

            case bz.PhysicBehaviour.MOVABLE:
            {
                mass = this.set.weight;
                break;
            }

            case bz.PhysicBehaviour.NONE:
            {
                break;
            }
        }

        return {
            mass:        mass,
            friction:    this.set.friction,
            restitution: this.set.restitution,

            disableBidirectionalTransformation: false,
        };
    }
}

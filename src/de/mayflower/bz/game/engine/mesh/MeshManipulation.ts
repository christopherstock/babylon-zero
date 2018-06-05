
    import * as BABYLON from 'babylonjs';
    import * as bz      from '../../..';

    /** ****************************************************************************************************************
    *   Offers static functionality for manipulating meshes.
    *******************************************************************************************************************/
    export abstract class MeshManipulation
    {
        /** ************************************************************************************************************
        *   Specifies the absolute rotation of the specified mesh for all axis.
        *
        *   @param mesh The mesh to set the rotation for.
        *   @param rotX The x axis rotation (pitch)
        *   @param rotY The y axis rotation (yaw).
        *   @param rotZ The z axis rotation (roll).
        ***************************************************************************************************************/
        public static setAbsoluteRotationXYZ( mesh:BABYLON.AbstractMesh, rotX:number, rotY:number, rotZ:number ) : void
        {
            mesh.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll
            (
                bz.MathUtil.degreesToRad( rotY ),
                bz.MathUtil.degreesToRad( rotX ),
                bz.MathUtil.degreesToRad( rotZ )
            );
        }

        /** ************************************************************************************************************
        *   Sets the position and pivot to the specified mesh.
        *
        *   @param mesh     The mesh to apply position and pivot to.
        *   @param position Where to place this mesh.
        ***************************************************************************************************************/
        public static translatePosition
        (
            mesh     :BABYLON.Mesh,
            position :BABYLON.Vector3
        )
        : void
        {
            mesh.position.x += position.x;
            mesh.position.y += position.y;
            mesh.position.z += position.z;
        }
    }

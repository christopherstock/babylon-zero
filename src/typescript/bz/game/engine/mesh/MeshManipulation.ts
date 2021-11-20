import * as bz from '../../..';

/** ********************************************************************************************************************
*   Offers static functionality for manipulating meshes.
***********************************************************************************************************************/
export abstract class MeshManipulation
{
    /** ****************************************************************************************************************
    *   Specifies the absolute rotation of the specified mesh for all axis.
    *
    *   @param mesh The mesh to set the rotation for.
    *   @param rotX The x axis rotation (pitch)
    *   @param rotY The y axis rotation (yaw).
    *   @param rotZ The z axis rotation (roll).
    *******************************************************************************************************************/
    public static setAbsoluteRotationXYZ( mesh:BABYLON.AbstractMesh, rotX:number, rotY:number, rotZ:number ) : void
    {
        mesh.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll
        (
            bz.MathUtil.degreesToRad( rotY ),
            bz.MathUtil.degreesToRad( rotX ),
            bz.MathUtil.degreesToRad( rotZ )
        );
    }

    /** ****************************************************************************************************************
    *   Rotates the given mesh around the specified X axis.
    *
    *   @param mesh The mesh to rotate around axis X.
    *   @param y    Pivot point Y.
    *   @param z    Pivot point Z.
    *   @param rotX Rotation on axis X to apply, in degrees.
    *******************************************************************************************************************/
    public static rotateAroundAxisX( mesh:BABYLON.AbstractMesh, y:number, z:number, rotX:number ) : void
    {
        mesh.rotateAround(
            new BABYLON.Vector3( 0.0, y, z ),
            new BABYLON.Vector3( 1.0, 0.0, 0.0 ),
            bz.MathUtil.degreesToRad( rotX )
        );
    }

    /** ****************************************************************************************************************
    *   Rotates the given mesh around the specified Y axis.
    *
    *   @param mesh The mesh to rotate around axis Y.
    *   @param x    Pivot point X.
    *   @param z    Pivot point Z.
    *   @param rotY Rotation on axis Y to apply, in degrees.
    *******************************************************************************************************************/
    public static rotateAroundAxisY( mesh:BABYLON.AbstractMesh, x:number, z:number, rotY:number ) : void
    {
        mesh.rotateAround(
            new BABYLON.Vector3( x, 0.0, z ),
            new BABYLON.Vector3( 0.0, 1.0, 0.0 ),
            bz.MathUtil.degreesToRad( rotY )
        );
    }

    /** ****************************************************************************************************************
    *   Rotates the given mesh around the specified Z axis.
    *
    *   @param mesh The mesh to rotate around axis Z.
    *   @param x    Pivot point X.
    *   @param y    Pivot point Y.
    *   @param rotZ Rotation on axis Z to apply, in degrees.
    *******************************************************************************************************************/
    public static rotateAroundAxisZ( mesh:BABYLON.AbstractMesh, x:number, y:number, rotZ:number ) : void
    {
        mesh.rotateAround(
            new BABYLON.Vector3( x, y, 0.0 ),
            new BABYLON.Vector3( 0.0, 0.0, 1.0 ),
            bz.MathUtil.degreesToRad( rotZ )
        );
    }

    /** ****************************************************************************************************************
    *   Sets the position and pivot to the specified mesh.
    *
    *   @param mesh     The mesh to apply position and pivot to.
    *   @param position Where to place this mesh.
    *******************************************************************************************************************/
    public static translatePosition
    (
        mesh     :BABYLON.AbstractMesh,
        position :BABYLON.Vector3
    )
    : void
    {
        mesh.position.x += position.x;
        mesh.position.y += position.y;
        mesh.position.z += position.z;
    }

    /** ****************************************************************************************************************
    *   Scales the size of the given mesh.
    *
    *   @param mesh  The mesh to scale size for.
    *   @param ratio The scale ratio to apply to all three axis.
    *******************************************************************************************************************/
    public static scaleSize
    (
        mesh  :BABYLON.AbstractMesh,
        ratio :BABYLON.Vector3
    )
    : void
    {
        mesh.scaling = ratio;
    }

    /** ****************************************************************************************************************
    *   Sets the position to the specified mesh.
    *
    *   @param mesh     The mesh to apply position and pivot to.
    *   @param position Where to place this mesh.
    *   @param anchor   The desired pivot anchor kind to set for this mesh.
    *   @param width    The dimension x of this mesh.
    *   @param height   The dimension y of this mesh.
    *   @param depth    The dimension z of this mesh.
    *******************************************************************************************************************/
    public static setPositionByAnchor
    (
        mesh     :BABYLON.AbstractMesh,
        position :BABYLON.Vector3,
        anchor   :bz.MeshAnchor,

        width       :number,
        height      :number,
        depth       :number
    )
    : void
    {
        switch ( anchor )
        {
            case bz.MeshAnchor.LOWEST_XYZ:
            {
                mesh.position = new BABYLON.Vector3(
                    position.x + ( width  / 2 ),
                    position.y + ( height / 2 ),
                    position.z + ( depth  / 2 )
                );
                break;
            }

            case bz.MeshAnchor.CENTER_XZ_LOWEST_Y:
            {
                mesh.position = new BABYLON.Vector3(
                    position.x,
                    position.y + ( height / 2 ),
                    position.z
                );
                break;
            }

            case bz.MeshAnchor.CENTER_XYZ:
            default:
            {
                // apply no translation (center XYZ)
                mesh.position = position;
                break;
            }
        }
    }

    // noinspection JSUnusedGlobalSymbols

    /** ****************************************************************************************************************
    *   Starts a stored animation for the given mesh in the specified frame range.
    *
    *   @param scene      The scene to perform the animation in.
    *   @param mesh       The mesh to perform a predefined animation.
    *   @param startFrame The number of the frame to start the animation.
    *   @param endFrame   The number of the frame to end the animation.
    *   @param loop       Specifies if the animation shall be looped.
    *   @param onFinish   The method to perform when the amimation has completed.
    *                     Will never be invoked if the animation is looped.
    *******************************************************************************************************************/
    public static performAnimation
    (
        scene       :BABYLON.Scene,
        mesh        :BABYLON.AbstractMesh,
        startFrame  :number,
        endFrame    :number,
        loop        :boolean,
        onFinish    :() => void
    )
    : void
    {
        const SPEED_RATIO:number = 1.0;

        scene.beginAnimation
        (
            mesh,
            startFrame,
            endFrame,
            loop,
            SPEED_RATIO,
            onFinish
        );
    }
}
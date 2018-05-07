
    import * as BABYLON from 'babylonjs';
    import * as bz from "../index";

    /*******************************************************************************************************************
    *   Represents a mesh and wraps a babylon.JS mesh.
    *******************************************************************************************************************/
    export class Mesh
    {
        /** The babylon.JS mesh. */
        public                              mesh                    :BABYLON.Mesh                       = null;

        public constructor( mesh:BABYLON.Mesh )
        {
            this.mesh = mesh;
        }

        public setVisible( visible:boolean )
        {
            if ( visible )
            {
                this.mesh.material.alpha = 1.0;
                this.mesh.isPickable = true;
            }
            else
            {
                this.mesh.material.alpha = 0.0;
                this.mesh.isPickable = false;
            }
        }

        public setAbsoluteRotationXYZ( rotX:number, rotY:number, rotZ:number )
        {
            this.mesh.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll
            (
                bz.MathUtil.degreesToRad( rotY ),
                bz.MathUtil.degreesToRad( rotX ),
                bz.MathUtil.degreesToRad( rotZ )
            );
        }
    }

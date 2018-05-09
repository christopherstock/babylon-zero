
    import * as BABYLON from 'babylonjs';
    import * as bz from "../index";

    /*******************************************************************************************************************
    *   Represents a mesh and wraps a babylon.JS mesh.
    *******************************************************************************************************************/
    export class Mesh
    {
        /** The babylon.JS mesh. */
        private         readonly                mesh                    :BABYLON.Mesh                       = null;

        /** The initial alpha value. */
        private                                 alpha                   :number                             = 0.0;

        public constructor( mesh:BABYLON.Mesh, alpha:number )
        {
            this.mesh  = mesh;
            this.alpha = alpha;
        }

        public setVisible( visible:boolean )
        {
            if ( visible )
            {
                this.mesh.material.alpha = this.alpha;
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
            bz.MeshFactory.setAbsoluteRotationXYZ( this.mesh, rotX, rotY, rotZ );
        }

        public moveWithCollisions( deltaX:number, deltaY:number, deltaZ:number )
        {
            this.mesh.moveWithCollisions( new BABYLON.Vector3( deltaX, 0.0, deltaZ ) );

            // this.mesh.physicsImpostor.applyForce( new BABYLON.Vector3( 5000 * deltaX, 0.0, 5000 * deltaZ ), this.mesh.position );
            // this.mesh.applyImpulse( new BABYLON.Vector3( 5000 * deltaX, 0.0, 5000 * deltaZ ), this.mesh.position );
        }

        public getMesh() : BABYLON.Mesh
        {
            return this.mesh;
        }
    }

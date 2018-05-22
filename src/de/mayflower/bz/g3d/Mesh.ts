
    import * as BABYLON from 'babylonjs';
    import * as bz from '../index';

    /** ****************************************************************************************************************
    *   Represents a mesh and wraps a babylon.JS mesh.
    *******************************************************************************************************************/
    export class Mesh
    {
        /** The babylon.JS mesh. */
        private         readonly                mesh                    :BABYLON.Mesh                       = null;

        /** The initial alpha value. */
        private         readonly                alpha                   :number                             = 0.0;

        /** ************************************************************************************************************
        *   Creates a new mesh.
        *
        *   @param mesh  The native babylon.JS mesh.
        *   @param alpha The alpha value for the mesh to apply.
        ***************************************************************************************************************/
        public constructor( mesh:BABYLON.Mesh, alpha:number )
        {
            this.mesh  = mesh;
            this.alpha = alpha;
        }

        /** ************************************************************************************************************
        *   Sets the visibility of this mesh.
        *
        *   @param visible The visibility to set.
        ***************************************************************************************************************/
        public setVisible( visible:boolean ) : void
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

        /** ************************************************************************************************************
        *   Specifies the absolute rotation of this mesh for all axis.
        *
        *   @param rotX The x axis rotation (pitch)
        *   @param rotY The y axis rotation (yaw).
        *   @param rotZ The z axis rotation (roll).
        ***************************************************************************************************************/
        public setAbsoluteRotationXYZ( rotX:number, rotY:number, rotZ:number ) : void
        {
            bz.Mesh.setAbsoluteRotationXYZ( this.mesh, rotX, rotY, rotZ );
        }

        /** ************************************************************************************************************
        *   Translates the mesh by the specified delta while collisions are handled by the physics engine.
        *
        *   @param deltaX The x axis delta to move.
        *   @param deltaY The y axis delta to move.
        *   @param deltaZ The z axis delta to move.
        ***************************************************************************************************************/
        public moveWithCollisions( deltaX:number, deltaY:number, deltaZ:number ) : void
        {
            this.mesh.moveWithCollisions( new BABYLON.Vector3( deltaX, deltaY, deltaZ ) );

            // tslint:disable:max-line-length
            // this.mesh.physicsImpostor.registerOnPhysicsCollide(bz.Main.game.engine.level.test.physicsImpostor, (collider, collided) => { console.log("test 2"); } );
            // bz.Main.game.engine.scene.getScene().collisionCoordinator.getNewPosition
            // this.mesh.physicsImpostor.applyForce( new BABYLON.Vector3( deltaX, 0.0, deltaZ ), this.mesh.position );
            // this.mesh.applyImpulse( new BABYLON.Vector3( 50 * deltaX, 0.0, 50 * deltaZ ), this.mesh.position );
        }

        /** ************************************************************************************************************
        *   Returns the native babylon.JS mesh.
        *
        *   @return The babylon.JS mesh.
        ***************************************************************************************************************/
        public getMesh() : BABYLON.Mesh
        {
            return this.mesh;
        }

        /** ************************************************************************************************************
        *   Specifies the absolute rotation of the specified mesh for all axis.
        *
        *   @param mesh The mesh to set the rotation for.
        *   @param rotX The x axis rotation (pitch)
        *   @param rotY The y axis rotation (yaw).
        *   @param rotZ The z axis rotation (roll).
        ***************************************************************************************************************/
        public static setAbsoluteRotationXYZ( mesh:BABYLON.Mesh, rotX:number, rotY:number, rotZ:number ) : void
        {
            mesh.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll
            (
                bz.MathUtil.degreesToRad( rotY ),
                bz.MathUtil.degreesToRad( rotX ),
                bz.MathUtil.degreesToRad( rotZ )
            );
        }
    }

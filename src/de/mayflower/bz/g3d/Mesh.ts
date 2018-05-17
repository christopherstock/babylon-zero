
    import * as BABYLON from 'babylonjs';
    import * as bz from '../index';

    /*******************************************************************************************************************
    *   Represents a mesh and wraps a babylon.JS mesh.
    *******************************************************************************************************************/
    export class Mesh
    {
        /** The babylon.JS mesh. */
        private         readonly                mesh                    :BABYLON.Mesh                       = null;

        /** The initial alpha value. */
        private         readonly                alpha                   :number                             = 0.0;

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
            bz.Mesh.setAbsoluteRotationXYZ( this.mesh, rotX, rotY, rotZ );
        }

        public moveWithCollisions( deltaX:number, deltaY:number, deltaZ:number )
        {
            this.mesh.moveWithCollisions( new BABYLON.Vector3( deltaX, 0.0, deltaZ ) );

            // tslint:disable:max-line-length
            // this.mesh.physicsImpostor.registerOnPhysicsCollide(bz.Main.game.engine.level.test.physicsImpostor, (collider, collided) => { console.log("test 2"); } );
            // bz.Main.game.engine.scene.getScene().collisionCoordinator.getNewPosition
            // this.mesh.physicsImpostor.applyForce( new BABYLON.Vector3( deltaX, 0.0, deltaZ ), this.mesh.position );
            // this.mesh.applyImpulse( new BABYLON.Vector3( 50 * deltaX, 0.0, 50 * deltaZ ), this.mesh.position );
        }

        public getMesh() : BABYLON.Mesh
        {
            return this.mesh;
        }

        public static setAbsoluteRotationXYZ( mesh:BABYLON.Mesh, rotX:number, rotY:number, rotZ:number )
        {
            mesh.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll
            (
                bz.MathUtil.degreesToRad( rotY ),
                bz.MathUtil.degreesToRad( rotX ),
                bz.MathUtil.degreesToRad( rotZ )
            );
        }

        public static setPhysic( mesh:BABYLON.Mesh, physic:bz.Physic, impostor:number, scene:BABYLON.Scene )
        {
            switch ( physic.state )
            {
                case bz.PhysicState.STATIC:
                {
                    mesh.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;

                    mesh.physicsImpostor = new BABYLON.PhysicsImpostor
                    (
                        mesh,
                        impostor,
                        bz.PhysicProps.STATIC,
                        scene
                    );

                    mesh.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;

                    break;
                }

                case bz.PhysicState.MOVABLE:
                {
                    mesh.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;

                    mesh.physicsImpostor = new BABYLON.PhysicsImpostor
                    (
                        mesh,
                        impostor,
                        physic.params,
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
    }

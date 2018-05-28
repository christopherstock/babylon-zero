
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents the character being controlled by the user.
    *******************************************************************************************************************/
    export class Player extends bz.GameObject
    {
        /** The id of the player's head mesh in the mesh array. */
        private     static      readonly    PLAYER_HEAD_ID          :number                             = 0;
        /** The id of the player's body mesh in the mesh array. */
        private     static      readonly    PLAYER_BODY_ID          :number                             = 1;

        /** The player's current rotation on axis Y. */
        protected                           rotY                    :number                             = 270.0;
        /** The player's current rotation on axis Z. */
        protected                           rotZ                    :number                             = 0.0;

        /** Current move delta X. */
        protected                           moveDeltaX              :number                             = 0.0;
        /** Current move delta Z. */
        protected                           moveDeltaZ              :number                             = 0.0;
        /** Current rotation delta Y. */
        protected                           rotationDeltaY          :number                             = 0.0;
        /** Current rotation delta Z. */
        protected                           rotationDeltaZ          :number                             = 0.0;

        /** Flags if rotZ view centering should occur this tick. */
        private                             centerRotZ              :boolean                            = false;

        /** ************************************************************************************************************
        *   Creates a new player instance.
        *
        *   @param rotY          Initial rotation Y.
        *   @param emissiveColor The emissive color of all mesh faces.
        ***************************************************************************************************************/
        public constructor( rotY:number, emissiveColor:BABYLON.Color3 )
        {
            super
            (
                [
                    // Player.PLAYER_HEAD_ID
                    bz.MeshFactory.createSphere
                    (
                        new BABYLON.Vector3
                        (
                            0.0,
                            ( ( bz.SettingGame.PLAYER_HEIGHT_Y / 2 ) - bz.SettingGame.PLAYER_HEAD_RADIUS ),
                            0.0
                        ),
                        bz.PivotAnchor.CENTER_XYZ,
                        ( 2 * bz.SettingGame.PLAYER_HEAD_RADIUS ),
                        new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                        bz.Texture.GRASS,
                        null,
                        bz.Main.game.engine.scene.getScene(),
                        bz.Physic.NONE,
                        1.0,
                        emissiveColor
                    ),

                    // Player.PLAYER_BODY_ID
                    bz.MeshFactory.createCylinder
                    (
                        new BABYLON.Vector3( 15.0, 0.0, 15.0  ),
                        bz.PivotAnchor.CENTER_XZ_LOWEST_Y,
                        ( 2 * bz.SettingGame.PLAYER_RADIUS_XZ ),
                        bz.SettingGame.PLAYER_HEIGHT_Y,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                        bz.Texture.GLASS,
                        null,
                        bz.Main.game.engine.scene.getScene(),
                        bz.Physic.PLAYER,
                        0.25,
                        emissiveColor
                    ),
                ]
            );

            this.rotY = rotY;

            // stick head to body
            this.meshes[ Player.PLAYER_HEAD_ID ].parent = this.meshes[ Player.PLAYER_BODY_ID ];
/*
            // create physical link
            this.meshes[ Player.PLAYER_BODY_ID ].getMesh().setPhysicsLinkWith
            (
                this.meshes[ Player.PLAYER_HEAD_ID ].getMesh(),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                new BABYLON.Vector3( 0.0, 1.5, 0.0 ),
            );
*/
        }

        /** ************************************************************************************************************
        *   Handles all keys for the player.
        ***************************************************************************************************************/
        public handlePlayerKeys() : void
        {
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_W ) )
            {
                this.moveDeltaX +=  bz.SettingGame.PLAYER_SPEED_MOVE * bz.MathUtil.sinDegrees( this.rotY );
                this.moveDeltaZ +=  bz.SettingGame.PLAYER_SPEED_MOVE * bz.MathUtil.cosDegrees( this.rotY );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_S ) )
            {
                this.moveDeltaX -= bz.SettingGame.PLAYER_SPEED_MOVE * bz.MathUtil.sinDegrees( this.rotY );
                this.moveDeltaZ -= bz.SettingGame.PLAYER_SPEED_MOVE * bz.MathUtil.cosDegrees( this.rotY );
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_A ) )
            {
                this.moveDeltaX -= bz.SettingGame.PLAYER_SPEED_STRAVE * bz.MathUtil.cosDegrees( this.rotY );
                this.moveDeltaZ += bz.SettingGame.PLAYER_SPEED_STRAVE * bz.MathUtil.sinDegrees( this.rotY );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_D ) )
            {
                this.moveDeltaX += bz.SettingGame.PLAYER_SPEED_STRAVE * bz.MathUtil.cosDegrees( this.rotY );
                this.moveDeltaZ -= bz.SettingGame.PLAYER_SPEED_STRAVE * bz.MathUtil.sinDegrees( this.rotY );
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_Q ) )
            {
                this.rotationDeltaY = -bz.SettingGame.PLAYER_SPEED_TURN;
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_E ) )
            {
                this.rotationDeltaY = bz.SettingGame.PLAYER_SPEED_TURN;
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_R ) )
            {
                this.rotationDeltaZ = -bz.SettingGame.PLAYER_SPEED_LOOK_UP_DOWN;
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_F ) )
            {
                this.rotationDeltaZ = bz.SettingGame.PLAYER_SPEED_LOOK_UP_DOWN;
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_1 ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_1 );
                bz.Main.game.level.cameraSystem.setActiveSceneCamera
                (
                    bz.Main.game.engine.scene.getScene(),
                    bz.CameraType.FREE_DEBUG
                );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_2 ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_2 );
                bz.Main.game.level.cameraSystem.setActiveSceneCamera
                (
                    bz.Main.game.engine.scene.getScene(),
                    bz.CameraType.STATIONARY
                );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_3 ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_3 );
                bz.Main.game.level.cameraSystem.setActiveSceneCamera
                (
                    bz.Main.game.engine.scene.getScene(),
                    bz.CameraType.FOLLOW
                );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_4 ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_4 );
                bz.Main.game.level.cameraSystem.setActiveSceneCamera
                (
                    bz.Main.game.engine.scene.getScene(),
                    bz.CameraType.FIRST_PERSON
                );
            }
        }

        /** ************************************************************************************************************
        *   Renders the player for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            this.movePlayer();
            this.rotatePlayerXYZ();
            this.checkCenteringRotZ();

            this.manipulateVelocities();
        }

        /** ************************************************************************************************************
        *   Returns the player's target mesh for the first person camera.
        *
        *   @return The player's head mesh.
        *           This is the right mesh to set the first person camera into.
        ***************************************************************************************************************/
        public getFirstPersonCameraTargetMesh() : BABYLON.AbstractMesh
        {
            return this.meshes[ Player.PLAYER_HEAD_ID ];
        }

        /** ************************************************************************************************************
        *   Returns the player's target mesh for the third person camera.
        *
        *   @return The player's body mesh.
        *           This is the right mesh to set as a target for the third person camera.
        ***************************************************************************************************************/
        public getThirdPersonCameraTargetMesh() : BABYLON.AbstractMesh
        {
            return this.meshes[ Player.PLAYER_BODY_ID ];
        }

        /** ************************************************************************************************************
        *   Sets visibility for all meshes the player consists of.
        *
        *   @param visible The new visibility for the player.
        ***************************************************************************************************************/
        public setVisible( visible:boolean ) : void
        {
            if ( visible )
            {
                this.meshes[ Player.PLAYER_HEAD_ID ].material.alpha = 1.0;
                this.meshes[ Player.PLAYER_HEAD_ID ].isPickable     = true;

                this.meshes[ Player.PLAYER_BODY_ID ].material.alpha = 0.25;
                this.meshes[ Player.PLAYER_BODY_ID ].isPickable     = true;
            }
            else
            {
                this.meshes[ Player.PLAYER_HEAD_ID ].material.alpha = 0.0;
                this.meshes[ Player.PLAYER_HEAD_ID ].isPickable     = false;

                this.meshes[ Player.PLAYER_BODY_ID ].material.alpha = 0.0;
                this.meshes[ Player.PLAYER_BODY_ID ].isPickable     = false;
            }
        }

        /** ************************************************************************************************************
        *   Moves all player's meshes by the current move deltas.
        ***************************************************************************************************************/
        private movePlayer() : void
        {
            if ( this.moveDeltaX !== 0.0 || this.moveDeltaZ !== 0.0 )
            {
                // apply move delta
                this.meshes[ Player.PLAYER_BODY_ID ].moveWithCollisions
                (
                    new BABYLON.Vector3( this.moveDeltaX, 0.0, this.moveDeltaZ )
                );

                // tslint:disable-next-line:max-line-length
                // this.mesh.physicsImpostor.registerOnPhysicsCollide(bz.Main.game.engine.level.test.physicsImpostor, (collider, collided) => { console.log("test 2"); } );
                // bz.Main.game.engine.scene.getScene().collisionCoordinator.getNewPosition
                // tslint:disable-next-line:max-line-length
                // this.mesh.physicsImpostor.applyForce( new BABYLON.Vector3( deltaX, 0.0, deltaZ ), this.mesh.position );
                // this.mesh.applyImpulse( new BABYLON.Vector3( 50 * deltaX, 0.0, 50 * deltaZ ), this.mesh.position );

                // reset move deltas
                this.moveDeltaX = 0.0;
                this.moveDeltaZ = 0.0;

                // force rotZ centering
                this.centerRotZ = true;
            }
            else
            {
                this.centerRotZ = false;
            }
        }

        /** ************************************************************************************************************
        *   Applies the current rotations for all axis to the according player body parts.
        ***************************************************************************************************************/
        private rotatePlayerXYZ() : void
        {
            if ( this.rotationDeltaY !== 0.0 )
            {
                this.rotY = bz.MathUtil.normalizeAngle( this.rotY + this.rotationDeltaY );
                this.rotationDeltaY = 0.0;
            }

            if ( this.rotationDeltaZ !== 0.0 )
            {
                this.rotZ += this.rotationDeltaZ;

                if ( this.rotZ > bz.SettingGame.PLAYER_MAX_LOOK_UP_DOWN )
                {
                    this.rotZ = bz.SettingGame.PLAYER_MAX_LOOK_UP_DOWN;
                }
                else if ( this.rotZ < -bz.SettingGame.PLAYER_MAX_LOOK_UP_DOWN )
                {
                    this.rotZ = -bz.SettingGame.PLAYER_MAX_LOOK_UP_DOWN;
                }

                this.rotationDeltaZ = 0.0;
            }

            // rotate all meshes
            bz.MeshFactory.setAbsoluteRotationXYZ( this.meshes[ Player.PLAYER_BODY_ID ], 0.0,       this.rotY, 0.0 );
            bz.MeshFactory.setAbsoluteRotationXYZ( this.meshes[ Player.PLAYER_HEAD_ID ], this.rotZ, 0.0,       0.0 );
        }

        /** ************************************************************************************************************
        *   Checks if the player's rotation on the Z axis should be centered to zero.
        ***************************************************************************************************************/
        private checkCenteringRotZ() : void
        {
            if ( this.centerRotZ )
            {
                if ( this.rotZ > 0.0 )
                {
                    this.rotZ -= bz.SettingGame.PLAYER_SPEED_CENTER_LOOK_UP_DOWN;

                    if ( this.rotZ <= 0.0 )
                    {
                        this.rotZ = 0.0;
                    }
                }
                else if ( this.rotZ < 0.0 )
                {
                    this.rotZ += bz.SettingGame.PLAYER_SPEED_CENTER_LOOK_UP_DOWN;

                    if ( this.rotZ >= 0.0 )
                    {
                        this.rotZ = 0.0;
                    }
                }
            }
        }

        /** ************************************************************************************************************
        *   Overrides the player's linear and angular velocities for improved player controls and user experience.
        ***************************************************************************************************************/
        private manipulateVelocities() : void
        {
            // filter linear velocity Y
            const velocity:BABYLON.Vector3 = this.meshes[ Player.PLAYER_BODY_ID ].physicsImpostor.getLinearVelocity();
            this.meshes[ Player.PLAYER_BODY_ID ].physicsImpostor.setLinearVelocity
            (
                new BABYLON.Vector3
                (
                    0.0,

                    // allow falling but not jumping ..?
                    ( velocity.y < 0.0 ? velocity.y * 0.95 : 0.0 ),

                    0.0,
                )
            );

            // suppress angular velocity
            this.meshes[ Player.PLAYER_BODY_ID ].physicsImpostor.setAngularVelocity( BABYLON.Vector3.Zero() );
        }
    }

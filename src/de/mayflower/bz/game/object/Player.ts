
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents the character being controlled by the user.
    *******************************************************************************************************************/
    export class Player extends bz.GameObject
    {
        /** The id of the player's body mesh in the mesh array. */
        private     static  readonly    PLAYER_BODY_ID              :number                             = 0;
        /** The id of the player's head mesh in the mesh array. */
        private     static  readonly    PLAYER_HEAD_ID              :number                             = 1;
        /** The id of the player's left hand mesh in the mesh array. */
        private     static  readonly    PLAYER_LEFT_HAND_ID         :number                             = 2;
        /** The id of the player's left hand mesh in the mesh array. */
        private     static  readonly    PLAYER_RIGHT_HAND_ID        :number                             = 3;

        /** The player's current rotation on axis Y. */
        protected                       rotY                        :number                             = 270.0;
        /** The player's current rotation on axis Z. */
        protected                       rotZ                        :number                             = 0.0;

        /** Current move delta X. */
        protected                       moveDeltaX                  :number                             = 0.0;
        /** Current move delta Z. */
        protected                       moveDeltaZ                  :number                             = 0.0;
        /** Current rotation delta Y. */
        protected                       rotationDeltaY              :number                             = 0.0;
        /** Current rotation delta Z. */
        protected                       rotationDeltaZ              :number                             = 0.0;

        /** Flags if rotZ view centering should occur this tick. */
        private                         centerRotZ                  :boolean                            = false;
        /** Flags if fire should be performed this tick. */
        private                         fire                        :boolean                            = false;

        /** The referenced body mesh of the player. */
        private             readonly    body                        :BABYLON.AbstractMesh               = null;
        /** The referenced head mesh of the player. */
        private             readonly    head                        :BABYLON.AbstractMesh               = null;
        /** The referenced left hand mesh of the player. */
        private             readonly    leftHand                    :BABYLON.AbstractMesh               = null;
        /** The referenced right hand mesh of the player. */
        private             readonly    rightHand                   :BABYLON.AbstractMesh               = null;

        /** ************************************************************************************************************
        *   Creates a new player instance.
        *
        *   @param position      The startup position for the player.
        *   @param rotY          Initial rotation Y.
        *   @param emissiveColor The emissive color of all mesh faces.
        ***************************************************************************************************************/
        public constructor
        (
            position      :BABYLON.Vector3,
            rotY          :number,
            emissiveColor :BABYLON.Color3
        )
        {
            super
            (
                new bz.Model
                (
                    [
                        // Player.PLAYER_BODY_ID
                        bz.MeshFactory.createCylinder
                        (
                            position,
                            bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y,
                            ( 2 * bz.SettingGame.PLAYER_RADIUS_BODY_XZ ),
                            bz.SettingGame.PLAYER_HEIGHT_Y,
                            new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                            bz.Texture.GLASS,
                            null,
                            bz.Main.game.engine.scene.getScene(),
                            bz.Physic.PLAYER,
                            0.25,
                            emissiveColor
                        ),

                        // Player.PLAYER_HEAD_ID
                        bz.MeshFactory.createSphere
                        (
                            new BABYLON.Vector3
                            (
                                0.0,
                                ( ( bz.SettingGame.PLAYER_HEIGHT_Y / 2 ) - bz.SettingGame.PLAYER_RADIUS_HEAD ),
                                0.0
                            ),
                            bz.MeshPivotAnchor.CENTER_XYZ,
                            ( 2 * bz.SettingGame.PLAYER_RADIUS_HEAD ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                            bz.Texture.SKIN_ROSE,
                            null,
                            bz.Main.game.engine.scene.getScene(),
                            bz.Physic.NONE,
                            1.0,
                            emissiveColor
                        ),

                        // Player.PLAYER_LEFT_HAND_ID
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3
                            (
                                -1.0,
                                ( ( -bz.SettingGame.PLAYER_HEIGHT_Y / 2 ) + bz.SettingGame.PLAYER_HAND_HEIGHT ),
                                0.0
                            ),
                            bz.MeshPivotAnchor.CENTER_XYZ,
                            new BABYLON.Vector3( 0.25, 0.25, 0.25 ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                            bz.Texture.SKIN_ROSE,
                            null,
                            bz.Main.game.engine.scene.getScene(),
                            bz.Physic.NONE,
                            1.0,
                            emissiveColor
                        ),

                        // Player.PLAYER_RIGHT_HAND_ID
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3
                            (
                                1.0,
                                ( ( -bz.SettingGame.PLAYER_HEIGHT_Y / 2 ) + bz.SettingGame.PLAYER_HAND_HEIGHT ),
                                0.0
                            ),
                            bz.MeshPivotAnchor.CENTER_XYZ,
                            new BABYLON.Vector3( 0.25, 0.25, 0.25 ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                            bz.Texture.SKIN_ROSE,
                            null,
                            bz.Main.game.engine.scene.getScene(),
                            bz.Physic.NONE,
                            1.0,
                            emissiveColor
                        ),
                    ]
                )
            );

            // assign initial rotation Y
            this.rotY = rotY;

            // reference all limbs
            this.body      = this.model.getMeshes()[ Player.PLAYER_BODY_ID       ];
            this.head      = this.model.getMeshes()[ Player.PLAYER_HEAD_ID       ];
            this.leftHand  = this.model.getMeshes()[ Player.PLAYER_LEFT_HAND_ID  ];
            this.rightHand = this.model.getMeshes()[ Player.PLAYER_RIGHT_HAND_ID ];

            // stick limbs to body
            this.head.parent      = this.body;
            this.leftHand.parent  = this.body;
            this.rightHand.parent = this.body;
        }

        /** ************************************************************************************************************
        *   Handles all keys for the player.
        ***************************************************************************************************************/
        public handlePlayerKeys() : void
        {
            // move forewards and backwards
            if
            (
                   bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_W  )
                // || bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_UP )
            )
            {
                this.moveDeltaX +=  bz.SettingGame.PLAYER_SPEED_MOVE * bz.MathUtil.sinDegrees( this.rotY );
                this.moveDeltaZ +=  bz.SettingGame.PLAYER_SPEED_MOVE * bz.MathUtil.cosDegrees( this.rotY );
            }
            if
            (
                    bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_S )
                // ||  bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_DOWN )
            )
            {
                this.moveDeltaX -= bz.SettingGame.PLAYER_SPEED_MOVE * bz.MathUtil.sinDegrees( this.rotY );
                this.moveDeltaZ -= bz.SettingGame.PLAYER_SPEED_MOVE * bz.MathUtil.cosDegrees( this.rotY );
            }

            // strave
            if
            (
                   bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_A    )
                // || bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_LEFT )
            )
            {
                this.moveDeltaX -= bz.SettingGame.PLAYER_SPEED_STRAVE * bz.MathUtil.cosDegrees( this.rotY );
                this.moveDeltaZ += bz.SettingGame.PLAYER_SPEED_STRAVE * bz.MathUtil.sinDegrees( this.rotY );
            }
            if
            (
                   bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_D     )
                // || bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_RIGHT )
            )
            {
                this.moveDeltaX += bz.SettingGame.PLAYER_SPEED_STRAVE * bz.MathUtil.cosDegrees( this.rotY );
                this.moveDeltaZ -= bz.SettingGame.PLAYER_SPEED_STRAVE * bz.MathUtil.sinDegrees( this.rotY );
            }

            // turn Y
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_Q ) )
            {
                this.rotationDeltaY = -bz.SettingGame.PLAYER_SPEED_TURN;
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_E ) )
            {
                this.rotationDeltaY = bz.SettingGame.PLAYER_SPEED_TURN;
            }

            // look up / down
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_R ) )
            {
                this.rotationDeltaZ = -bz.SettingGame.PLAYER_SPEED_LOOK_UP_DOWN;
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_F ) )
            {
                this.rotationDeltaZ = bz.SettingGame.PLAYER_SPEED_LOOK_UP_DOWN;
            }

            // fire
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_CTRL_LEFT ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_CTRL_LEFT );

                this.fire = true;
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
            this.checkFire();

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
            return this.head;
        }

        /** ************************************************************************************************************
        *   Returns the player's target mesh for the third person camera.
        *
        *   @return The player's body mesh.
        *           This is the right mesh to set as a target for the third person camera.
        ***************************************************************************************************************/
        public getThirdPersonCameraTargetMesh() : BABYLON.AbstractMesh
        {
            return this.body;
        }

        /** ************************************************************************************************************
        *   Moves all player's meshes by the current move deltas.
        ***************************************************************************************************************/
        private movePlayer() : void
        {
            if ( this.moveDeltaX !== 0.0 || this.moveDeltaZ !== 0.0 )
            {
                // apply move delta
                this.body.moveWithCollisions
                (
                    new BABYLON.Vector3( this.moveDeltaX, 0.0, this.moveDeltaZ )
                );

                // tslint:disable-next-line:max-line-length
                // this.mesh.physicsImpostor.applyForce( new BABYLON.Vector3( deltaX, 0.0, deltaZ ), this.mesh.position );
                // bz.Main.game.engine.scene.getScene().collisionCoordinator.getNewPosition
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

            // rotate body
            bz.MeshManipulation.setAbsoluteRotationXYZ
            (
                this.body,
                0.0,
                this.rotY,
                0.0
            );

            // rotate head
            bz.MeshManipulation.setAbsoluteRotationXYZ
            (
                this.head,
                this.rotZ,
                0.0,
                0.0
            );
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
        *   Checks if the player is firing.
        ***************************************************************************************************************/
        private checkFire() : void
        {
            if ( this.fire )
            {
                bz.Debug.fire.log( 'Player is firing' );

                // handle fire as processed
                this.fire = false;

                // calculate shot destination
                const source      :BABYLON.Vector3 = this.rightHand.absolutePosition;
                const rotation    :BABYLON.Vector3 = new BABYLON.Vector3( this.rotZ, this.rotY, 0.0 );
                const range       :number          = 10.0;
                const destination :BABYLON.Vector3 = bz.MathUtil.rotateVector
                (
                    source,
                    rotation,
                    range
                );
/*
                bz.Debug.fire.log( ' Player position:  ' + source      );
                bz.Debug.fire.log( ' Player rotation:  ' + rotation    );
                bz.Debug.fire.log( ' Shot range:       ' + range       );
                bz.Debug.fire.log( ' Shot destination: ' + destination );
*/
                // check affected game objects
                bz.Main.game.stage.applyShot
                (
                    source,
                    destination
                );
            }
        }

        /** ************************************************************************************************************
        *   Overrides the player's linear and angular velocities for improved player controls and user experience.
        ***************************************************************************************************************/
        private manipulateVelocities() : void
        {
            // filter linear velocity Y
            const velocity:BABYLON.Vector3 = this.body.physicsImpostor.getLinearVelocity();
            this.body.physicsImpostor.setLinearVelocity
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
            this.body.physicsImpostor.setAngularVelocity
            (
                BABYLON.Vector3.Zero()
            );
        }
    }

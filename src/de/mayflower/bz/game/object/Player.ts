
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
        private                         rotationY                   :number                             = 270.0;
        /** The player's current rotation on axis Z. */
        private                         rotationZ                   :number                             = 0.0;

        /** Current rotation delta Y. */
        private                         rotationDeltaY              :number                             = 0.0;
        /** Current rotation delta Z. */
        private                         rotationDeltaZ              :number                             = 0.0;

        /** Current move delta X. */
        private                         moveDeltaX                  :number                             = 0.0;
        /** Current move delta Z. */
        private                         moveDeltaZ                  :number                             = 0.0;

        /** Flags if rotZ view centering should occur this tick. */
        private                         centerRotZ                  :boolean                            = false;
        /** Flags if fire should be performed this tick. */
        private                         fire                        :boolean                            = false;
        /** Flags if the player currently wants to duck. */
        private                         duck                        :boolean                            = false;
        /** The current height of the player. Changes on ducking. */
        // private                         playerHeight                :number                             = 0.0;

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
                            position.clone(),
                            bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y,
                            bz.SettingPlayer.PLAYER_DIAMETER_BODY_XZ,
                            bz.SettingPlayer.PLAYER_HEIGHT_Y,
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.Texture.WALL_GLASS,
                            null,
                            bz.Main.game.engine.scene.getScene(),
                            bz.Physic.PLAYER,
                            0.25,
                            emissiveColor
                        ),

                        // Player.PLAYER_HEAD_ID
                        bz.MeshFactory.createSphere
                        (
                            BABYLON.Vector3.Zero(),
                            bz.MeshPivotAnchor.CENTER_XYZ,
                            bz.SettingPlayer.PLAYER_DIAMETER_HEAD,
                            new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                            bz.Texture.WALL_SKIN_ROSE,
                            null,
                            bz.Main.game.engine.scene.getScene(),
                            bz.Physic.NONE,
                            1.0,
                            emissiveColor
                        ),

                        // Player.PLAYER_LEFT_HAND_ID
                        bz.MeshFactory.createBox
                        (
                            BABYLON.Vector3.Zero(),
                            bz.MeshPivotAnchor.CENTER_XYZ,
                            new BABYLON.Vector3( 0.25, 0.25, 0.25 ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                            bz.Texture.WALL_SKIN_ROSE,
                            null,
                            bz.Main.game.engine.scene.getScene(),
                            bz.Physic.NONE,
                            1.0,
                            emissiveColor
                        ),

                        // Player.PLAYER_RIGHT_HAND_ID
                        bz.MeshFactory.createBox
                        (
                            BABYLON.Vector3.Zero(),
                            bz.MeshPivotAnchor.CENTER_XYZ,
                            new BABYLON.Vector3( 0.25, 0.25, 0.25 ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                            bz.Texture.WALL_SKIN_ROSE,
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
            this.rotationY = rotY;

            // reference all limbs
            this.body      = this.model.getMeshes()[ Player.PLAYER_BODY_ID       ];
            this.head      = this.model.getMeshes()[ Player.PLAYER_HEAD_ID       ];
            this.leftHand  = this.model.getMeshes()[ Player.PLAYER_LEFT_HAND_ID  ];
            this.rightHand = this.model.getMeshes()[ Player.PLAYER_RIGHT_HAND_ID ];

            // stick limbs to body
            this.head.setParent(      this.body );
            this.leftHand.setParent(  this.body );
            this.rightHand.setParent( this.body );

            // set initial scale and position for limbs
            this.positionPlayerLimbs();
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
                this.moveDeltaX +=  bz.SettingPlayer.PLAYER_SPEED_MOVE * bz.MathUtil.sinDegrees( this.rotationY );
                this.moveDeltaZ +=  bz.SettingPlayer.PLAYER_SPEED_MOVE * bz.MathUtil.cosDegrees( this.rotationY );
            }
            if
            (
                    bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_S )
                // ||  bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_DOWN )
            )
            {
                this.moveDeltaX -= bz.SettingPlayer.PLAYER_SPEED_MOVE * bz.MathUtil.sinDegrees( this.rotationY );
                this.moveDeltaZ -= bz.SettingPlayer.PLAYER_SPEED_MOVE * bz.MathUtil.cosDegrees( this.rotationY );
            }

            // strave
            if
            (
                   bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_A    )
                // || bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_LEFT )
            )
            {
                this.moveDeltaX -= bz.SettingPlayer.PLAYER_SPEED_STRAVE * bz.MathUtil.cosDegrees( this.rotationY );
                this.moveDeltaZ += bz.SettingPlayer.PLAYER_SPEED_STRAVE * bz.MathUtil.sinDegrees( this.rotationY );
            }
            if
            (
                   bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_D     )
                // || bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_RIGHT )
            )
            {
                this.moveDeltaX += bz.SettingPlayer.PLAYER_SPEED_STRAVE * bz.MathUtil.cosDegrees( this.rotationY );
                this.moveDeltaZ -= bz.SettingPlayer.PLAYER_SPEED_STRAVE * bz.MathUtil.sinDegrees( this.rotationY );
            }

            // turn Y
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_Q ) )
            {
                this.rotationDeltaY = -bz.SettingPlayer.PLAYER_SPEED_TURN;
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_E ) )
            {
                this.rotationDeltaY = bz.SettingPlayer.PLAYER_SPEED_TURN;
            }

            // look up / down
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_R ) )
            {
                this.rotationDeltaZ = -bz.SettingPlayer.PLAYER_SPEED_LOOK_UP_DOWN;
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_F ) )
            {
                this.rotationDeltaZ = bz.SettingPlayer.PLAYER_SPEED_LOOK_UP_DOWN;
            }

            // fire
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_CTRL_LEFT ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_CTRL_LEFT );

                this.fire = true;
            }

            // duck
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_Y ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_Y );

                this.toggleDuck();
            }
        }

        /** ************************************************************************************************************
        *   Renders the player for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // move and rotate
            this.movePlayer();
            this.rotatePlayerXYZ();
            this.checkCenteringRotZ();
            this.manipulateVelocities();

            // interact
            this.checkFire();
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
        *   Toggles player ducking.
        ***************************************************************************************************************/
        private toggleDuck() : void
        {
            this.duck = !this.duck;

            if ( this.duck )
            {
                bz.Debug.player.log( 'Player is ducking' );

                this.scaleHeight( 0.5 );
            }
            else
            {
                bz.Debug.player.log( 'Player returns from ducking' );

                this.scaleHeight( 1.0 );
            }

            this.positionPlayerLimbs();
        }

        /** ************************************************************************************************************
        *   Applies the current rotations for all axis to the according player body parts.
        ***************************************************************************************************************/
        private rotatePlayerXYZ() : void
        {
            if ( this.rotationDeltaY !== 0.0 )
            {
                this.rotationY = bz.MathUtil.normalizeAngle( this.rotationY + this.rotationDeltaY );
                this.rotationDeltaY = 0.0;
            }

            if ( this.rotationDeltaZ !== 0.0 )
            {
                this.rotationZ += this.rotationDeltaZ;

                if ( this.rotationZ > bz.SettingPlayer.PLAYER_MAX_LOOK_UP_DOWN )
                {
                    this.rotationZ = bz.SettingPlayer.PLAYER_MAX_LOOK_UP_DOWN;
                }
                else if ( this.rotationZ < -bz.SettingPlayer.PLAYER_MAX_LOOK_UP_DOWN )
                {
                    this.rotationZ = -bz.SettingPlayer.PLAYER_MAX_LOOK_UP_DOWN;
                }

                this.rotationDeltaZ = 0.0;
            }

            // rotate body
            bz.MeshManipulation.setAbsoluteRotationXYZ
            (
                this.body,
                0.0,
                this.rotationY,
                0.0
            );

            // rotate head
            bz.MeshManipulation.setAbsoluteRotationXYZ
            (
                this.head,
                this.rotationZ,
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
                if ( this.rotationZ > 0.0 )
                {
                    this.rotationZ -= bz.SettingPlayer.PLAYER_SPEED_CENTER_LOOK_UP_DOWN;

                    if ( this.rotationZ <= 0.0 )
                    {
                        this.rotationZ = 0.0;
                    }
                }
                else if ( this.rotationZ < 0.0 )
                {
                    this.rotationZ += bz.SettingPlayer.PLAYER_SPEED_CENTER_LOOK_UP_DOWN;

                    if ( this.rotationZ >= 0.0 )
                    {
                        this.rotationZ = 0.0;
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
                bz.Debug.fire.log();
                bz.Debug.fire.log( 'Player is firing' );

                // handle fire as processed
                this.fire = false;

                // create shot
                const shot:bz.Shot = this.createShot();

                // check affected game objects
                bz.Main.game.stage.applyShot( shot );
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

        /** ************************************************************************************************************
        *   Creates a shot that contains all according fire information.
        ***************************************************************************************************************/
        private createShot() : bz.Shot
        {
            const divergenceY :number = 0.05 * ( bz.MathUtil.getRandomInt( -20, 20 ) );
            const divergenceZ :number = 0.05 * ( bz.MathUtil.getRandomInt( -20, 20 ) );

            const source      :BABYLON.Vector3 = this.head.absolutePosition;
            const rotation    :BABYLON.Vector3 = new BABYLON.Vector3
            (
                this.rotationZ + divergenceZ,
                this.rotationY + divergenceY,
                0.0
            );
            const range :number = 50.0;

            return new bz.Shot
            (
                source,
                rotation,
                range
            );
        }

        /** ************************************************************************************************************
        *   Scales the height of the body and all limbs according to the specified scale factor.
        *
        *   @param scaleFactor The factor to scale the height.
        ***************************************************************************************************************/
        private scaleHeight( scaleFactor:number ) : void
        {
            // scale body
            this.body.scaling      = new BABYLON.Vector3( 1.0, scaleFactor, 1.0 );

            // all limbs are scaled inverse to the body scale factor!
            this.head.scaling      = new BABYLON.Vector3( 1.0, ( 1.0 / scaleFactor ), 1.0 );
            this.leftHand.scaling  = new BABYLON.Vector3( 1.0, ( 1.0 / scaleFactor ), 1.0 );
            this.rightHand.scaling = new BABYLON.Vector3( 1.0, ( 1.0 / scaleFactor ), 1.0 );
        }

        /** ************************************************************************************************************
        *   Sets scaling and position for all player limbs.
        ***************************************************************************************************************/
        private positionPlayerLimbs() : void
        {
            if ( this.duck )
            {
                const halfPlayerHeight:number = ( bz.SettingPlayer.PLAYER_HEIGHT_Y / 2 );

                this.head.position = new BABYLON.Vector3
                (
                    0.0,
                    ( halfPlayerHeight - ( bz.SettingPlayer.PLAYER_DIAMETER_HEAD ) ),
                    0.0
                );
                this.leftHand.position = new BABYLON.Vector3
                (
                    -1.0,
                    ( -halfPlayerHeight + bz.SettingPlayer.PLAYER_HAND_HEIGHT ),
                    0.0
                );
                this.rightHand.position = new BABYLON.Vector3
                (
                    1.0,
                    ( -halfPlayerHeight + bz.SettingPlayer.PLAYER_HAND_HEIGHT ),
                    0.0
                );
            }
            else
            {
                const halfPlayerHeight:number = ( bz.SettingPlayer.PLAYER_HEIGHT_Y / 2 );

                // position limbs relative to parent body
                this.head.position = new BABYLON.Vector3
                (
                    0.0,
                    ( halfPlayerHeight - ( bz.SettingPlayer.PLAYER_DIAMETER_HEAD / 2 ) ),
                    0.0
                );
                this.leftHand.position = new BABYLON.Vector3
                (
                    -1.0,
                    ( -halfPlayerHeight + bz.SettingPlayer.PLAYER_HAND_HEIGHT ),
                    0.0
                );
                this.rightHand.position = new BABYLON.Vector3
                (
                    1.0,
                    ( -halfPlayerHeight + bz.SettingPlayer.PLAYER_HAND_HEIGHT ),
                    0.0
                );
            }
        }
    }

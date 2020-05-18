
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Represents a spaceship being controlled by the user.
    *******************************************************************************************************************/
    export class PlayerSpaceship extends bz.Player
    {
        /** The id of the player's body mesh in the mesh array. */
        private     static  readonly    PLAYER_BODY_ID              :number                             = 0;

        /** The id of the player's head mesh in the mesh array. */
        // private     static  readonly    PLAYER_HEAD_ID              :number                             = 1;
        /** The id of the player's left hand mesh in the mesh array. */
        // private     static  readonly    PLAYER_LEFT_HAND_ID         :number                             = 2;
        /** The id of the player's left hand mesh in the mesh array. */
        // private     static  readonly    PLAYER_RIGHT_HAND_ID        :number                             = 3;

        /** The current height of the player. Changes on ducking. */
        private             readonly    heightY                     :number                             = 0.0;
        /** Flags if rotZ view centering should occur this tick. */
        private             readonly    centerRotZ                  :boolean                            = false;

        /** Flags if fire should be performed this tick. */
        private                         fire                        :boolean                            = false;
        /** Flags if the player currently wants to duck. */
        private                         duck                        :boolean                            = false;

        /** Flags if the player currently wants to zoom. */
        private                         zoom                        :boolean                            = false;
        /** The current field of view of the player. Changes on zooming. */
        private                         fieldOfView                 :number                             = 0.0;

        /** Current rotation. */
        private                         rotation                    :BABYLON.Vector3                    = null;
        /** Current rotation delta. */
        private                         rotationDelta               :BABYLON.Vector3                    = null;
        /** Current move delta. */
        private                         moveDelta                   :BABYLON.Vector3                    = null;

        /** The referenced body mesh. */
        private             readonly    body                        :BABYLON.AbstractMesh               = null;
        /** The referenced head mesh. */
        // private             readonly    head                        :BABYLON.AbstractMesh               = null;
        /** The referenced left hand mesh. */
        // private             readonly    leftHand                    :BABYLON.AbstractMesh               = null;
        /** The referenced right hand mesh. */
        // private             readonly    rightHand                   :BABYLON.AbstractMesh               = null;

        /** ************************************************************************************************************
        *   Creates a new player instance.
        *
        *   @param stage         The stage this player belongs to.
        *   @param scene         The scene reference.
        *   @param position      The initial position.
        *   @param rotY          The initial rotation Y.
        *   @param emissiveColor The emissive color of all mesh faces.
        ***************************************************************************************************************/
        public constructor
        (
            stage         :bz.Stage,
            scene         :bz.Scene,
            position      :BABYLON.Vector3,
            rotY          :number,
            emissiveColor :BABYLON.Color3
        )
        {
            super
            (
                stage,
                new bz.Model
                (
                    [
                        // Player.PLAYER_BODY_ID
                        bz.MeshFactory.createImportedModel
                        (
                            scene,
                            bz.ModelFile.CRATE,
                            position.clone(),
                            bz.Physic.PLAYER_SPACESHIP,
                            bz.ModelCompoundType.NONE
                        ).getMesh( 0 ),
                    ]
                ),
                bz.GameObject.UNBREAKABLE
            );

            // assign initial rotation, rotation delta and move delta
            this.rotation      = new BABYLON.Vector3( 0.0, rotY, 0.0 );
            this.rotationDelta = BABYLON.Vector3.Zero();
            this.moveDelta     = BABYLON.Vector3.Zero();

            // reference the body and all limbs
            this.body      = this.model.getMesh( PlayerSpaceship.PLAYER_BODY_ID       );
/*
            this.head      = this.model.getMesh( PlayerSpaceship.PLAYER_HEAD_ID       );
            this.leftHand  = this.model.getMesh( PlayerSpaceship.PLAYER_LEFT_HAND_ID  );
            this.rightHand = this.model.getMesh( PlayerSpaceship.PLAYER_RIGHT_HAND_ID );
*/
            // stick all limbs to body
/*
            this.head.setParent(      this.body );
            this.leftHand.setParent(  this.body );
            this.rightHand.setParent( this.body );
*/
            // set alpha
            this.body.material.alpha = 0.5;

            // set initial height
            this.heightY     = bz.SettingPlayerHuman.HEIGHT_Y_STANDING;
            this.fieldOfView = bz.SettingEngine.DEFAULT_FIELD_OF_VIEW;

            // apply initial rotation
            this.rotatePlayerXYZ();
/*
            // set a collision event handler for the body
            if ( false )
            {
                this.body.physicsImpostor.onCollideEvent = (
                    collider     :BABYLON.PhysicsImpostor,
                    collidedWith :BABYLON.PhysicsImpostor
                ) : void => {
                    console.log( ' Colliding!' );
                };
            }
*/
        }

        /** ************************************************************************************************************
        *   Renders one tick of the player's game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // handle keys
            this.handleKeys();

            // alter position
            this.movePlayer();
            this.manipulateVelocities();

            // alter view
            this.rotatePlayerXYZ();
            this.checkCenteringRotZ();
            this.checkFieldOfViewChange();

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
            return this.body;
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
        *   Handles all keys for the player.
        ***************************************************************************************************************/
        private handleKeys() : void
        {
            const keySystem:bz.KeySystem = this.stage.getKeySystem();

            // move forewards and backwards
            if
            (
                   keySystem.isPressed( bz.KeyCodes.KEY_W  )
                // || keySystem.isPressed( bz.KeyCodes.KEY_UP )
            )
            {

/*
                let speedForward:number = 0;

                // probably run
                if ( keySystem.isPressed( bz.KeyCodes.KEY_SHIFT_LEFT  ) )
                {
                    speedForward = bz.SettingPlayerHuman.RUN_IMPULSE;
                }
                else
                {
                    speedForward = bz.SettingPlayerHuman.MOVE_IMPULSE;
                }
*/
                this.moveDelta.y = bz.SettingPlayerSpaceship.SPEED_RAISE;
/*
                this.moveDelta.z += speedForward * bz.MathUtil.cosDegrees( this.rotation.y );

                // shake head if enabled
                if ( bz.SettingPlayerHuman.HEAD_SHAKING_ENABLED )
                {
                    this.alterHeadShakeAngle( speedForward );
                }
*/
            }
            if
            (
                    keySystem.isPressed( bz.KeyCodes.KEY_S )
                // ||  keySystem.isPressed( bz.KeyCodes.KEY_DOWN )
            )
            {
                this.moveDelta.y = -bz.SettingPlayerSpaceship.SPEED_RAISE;
/*
                this.moveDelta.x -= bz.SettingPlayerHuman.MOVE_IMPULSE * bz.MathUtil.sinDegrees( this.rotation.y );
                this.moveDelta.z -= bz.SettingPlayerHuman.MOVE_IMPULSE * bz.MathUtil.cosDegrees( this.rotation.y );

                // shake head if enabled
                if ( bz.SettingPlayerHuman.HEAD_SHAKING_ENABLED )
                {
                    this.alterHeadShakeAngle( -bz.SettingPlayerHuman.MOVE_IMPULSE );
                }
*/
            }

            // strave
            if
            (
                   keySystem.isPressed( bz.KeyCodes.KEY_A    )
                // || keySystem.isPressed( bz.KeyCodes.KEY_LEFT )
            )
            {
                // this.moveDelta.x -= bz.SettingPlayerSpaceship.SPEED_STRAVE;
                this.moveDelta.z += bz.SettingPlayerSpaceship.SPEED_STRAVE;
            }
            if
            (
                   keySystem.isPressed( bz.KeyCodes.KEY_D     )
                // || keySystem.isPressed( bz.KeyCodes.KEY_RIGHT )
            )
            {
                // this.moveDelta.x += bz.SettingPlayerSpaceship.SPEED_STRAVE;
                this.moveDelta.z -= bz.SettingPlayerSpaceship.SPEED_STRAVE;
            }

            // turn Y
/*
            if ( keySystem.isPressed( bz.KeyCodes.KEY_Q ) )
            {
                this.rotationDelta.y = -bz.SettingPlayerHuman.SPEED_TURN;
            }
            if ( keySystem.isPressed( bz.KeyCodes.KEY_E ) )
            {
                this.rotationDelta.y = bz.SettingPlayerHuman.SPEED_TURN;
            }
*/
/*
            // look up / down
            if ( keySystem.isPressed( bz.KeyCodes.KEY_R ) )
            {
                this.rotationDelta.z = -bz.SettingPlayerHuman.SPEED_LOOK_UP_DOWN;
            }
            if ( keySystem.isPressed( bz.KeyCodes.KEY_F ) )
            {
                this.rotationDelta.z = bz.SettingPlayerHuman.SPEED_LOOK_UP_DOWN;
            }
*/
            // fire
            if ( keySystem.isPressed( bz.KeyCodes.KEY_CTRL_LEFT ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_CTRL_LEFT );

                this.fire = true;
            }
/*
            // duck
            if ( keySystem.isPressed( bz.KeyCodes.KEY_Y ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_Y );

                this.toggleDuck();
            }

            // jump
            if ( keySystem.isPressed( bz.KeyCodes.KEY_SPACE ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_SPACE );

                this.assignJump();
            }
*/
            // zoom
            this.zoom = keySystem.isPressed( bz.KeyCodes.KEY_X );
        }

        /** ************************************************************************************************************
        *   Moves all player's meshes by the current move deltas.
        ***************************************************************************************************************/
        private movePlayer() : void
        {
            this.body.position.x += bz.SettingPlayerSpaceship.SPEED_DEFAULT;

            // console.log( "> y: " + this.body.position.y );

            // check if moving occurred
            if
            (
                this.moveDelta.x !== 0.0
                || this.moveDelta.y !== 0.0
                || this.moveDelta.z !== 0.0
            )
            {
                let newPositionY :number = ( this.body.position.y + this.moveDelta.y );
                if ( newPositionY < 1.0  )
                {
                    newPositionY = 1.0;
                }
                if ( newPositionY > 25.0 )
                {
                    newPositionY = 25.0;
                }
                this.body.position.y = newPositionY;

                let newPositionZ :number = ( this.body.position.z + this.moveDelta.z );
                if ( newPositionZ < 1.0  )
                {
                    newPositionZ = 1.0;
                }
                if ( newPositionZ > 50.0 )
                {
                    newPositionZ = 50.0;
                }
                this.body.position.z = newPositionZ;

                // reset move deltas
                this.moveDelta = BABYLON.Vector3.Zero();
            }
        }

        /** ************************************************************************************************************
        *   Overrides the player's linear and angular velocities for improved player controls and user experience.
        ***************************************************************************************************************/
        private manipulateVelocities() : void
        {
            if ( this.body.physicsImpostor !== undefined )
            {
                // suppress linear velocities except Y
                // const velocity:BABYLON.Vector3 = this.body.physicsImpostor.getLinearVelocity();
                this.body.physicsImpostor.setLinearVelocity
                (
                    new BABYLON.Vector3
                    (
                        0.0,
                        0.0,
                        0.0
                    )
                );

                // completely suppress angular velocities
                this.body.physicsImpostor.setAngularVelocity
                (
                    BABYLON.Vector3.Zero()
                );
            }
        }

        /** ************************************************************************************************************
        *   Applies the current rotations for all axis to the according player body parts.
        ***************************************************************************************************************/
        private rotatePlayerXYZ() : void
        {
            if ( this.rotationDelta.y !== 0.0 )
            {
                this.rotation.y = bz.MathUtil.normalizeAngleDegrees( this.rotation.y + this.rotationDelta.y );
                this.rotationDelta.y = 0.0;
            }

            if ( this.rotationDelta.z !== 0.0 )
            {
                this.rotation.z += this.rotationDelta.z;

                if ( this.rotation.z > bz.SettingPlayerHuman.MAX_LOOK_UP_DOWN )
                {
                    this.rotation.z = bz.SettingPlayerHuman.MAX_LOOK_UP_DOWN;
                }
                else if ( this.rotation.z < -bz.SettingPlayerHuman.MAX_LOOK_UP_DOWN )
                {
                    this.rotation.z = -bz.SettingPlayerHuman.MAX_LOOK_UP_DOWN;
                }

                this.rotationDelta.z = 0.0;
            }

            // rotate body
            bz.MeshManipulation.setAbsoluteRotationXYZ
            (
                this.body,
                this.rotation.z,
                this.rotation.y,
                0.0
            );
/*
            // rotate head
            bz.MeshManipulation.setAbsoluteRotationXYZ
            (
                this.head,
                this.rotation.z,
                0.0,
                0.0
            );
*/
        }

        /** ************************************************************************************************************
        *   Toggles player ducking.
        ***************************************************************************************************************/
        private toggleDuck() : void
        {
            this.duck = !this.duck;

            bz.Debug.player.log( 'Player ducking: [' + String( this.duck ) + ']' );
        }

        /** ************************************************************************************************************
        *   Checks if the player's field of view changes.
        ***************************************************************************************************************/
        private checkFieldOfViewChange() : void
        {
            const CURRENT_WEARPON_MAX_ZOOM   :number = 0.5;
            const CURRENT_WEARPON_ZOOM_SPEED :number = 0.05;

            const cameraSystem:bz.CameraSystem = this.stage.getCameraSystem();

            if ( this.zoom )
            {
                if ( this.fieldOfView > CURRENT_WEARPON_MAX_ZOOM )
                {
                    this.fieldOfView -= CURRENT_WEARPON_ZOOM_SPEED;

                    if ( this.fieldOfView < CURRENT_WEARPON_MAX_ZOOM )
                    {
                        this.fieldOfView = CURRENT_WEARPON_MAX_ZOOM;
                    }

                    cameraSystem.setFirstPersonCameraFieldOfView( this.fieldOfView );
                }
            }
            else
            {
                if ( this.fieldOfView < bz.SettingEngine.DEFAULT_FIELD_OF_VIEW )
                {
                    this.fieldOfView += CURRENT_WEARPON_ZOOM_SPEED;

                    if ( this.fieldOfView > bz.SettingEngine.DEFAULT_FIELD_OF_VIEW )
                    {
                        this.fieldOfView = bz.SettingEngine.DEFAULT_FIELD_OF_VIEW;
                    }

                    cameraSystem.setFirstPersonCameraFieldOfView( this.fieldOfView );
                }
            }
        }

        /** ************************************************************************************************************
        *   Checks if the player's rotation on the Z axis should be centered to zero.
        ***************************************************************************************************************/
        private checkCenteringRotZ() : void
        {
            if ( this.centerRotZ )
            {
                if ( this.rotation.z > 0.0 )
                {
                    this.rotation.z -= bz.SettingPlayerHuman.SPEED_CENTER_LOOK_UP_DOWN;

                    if ( this.rotation.z <= 0.0 )
                    {
                        this.rotation.z = 0.0;
                    }
                }
                else if ( this.rotation.z < 0.0 )
                {
                    this.rotation.z += bz.SettingPlayerHuman.SPEED_CENTER_LOOK_UP_DOWN;

                    if ( this.rotation.z >= 0.0 )
                    {
                        this.rotation.z = 0.0;
                    }
                }
            }
        }

        /** ************************************************************************************************************
        *   Checks if the player is firing.
        ***************************************************************************************************************/
        private checkFire() : void
        {
            // check if firing is requested
            if ( this.fire )
            {
                bz.Debug.fire.log();
                bz.Debug.fire.log( 'Player is firing' );

                // mark fire request as processed
                this.fire = false;

                // create shot and apply it onto the stage
                const shot:bz.Shot = this.createShot();
                this.stage.applyShot( shot );
            }
        }

        /** ************************************************************************************************************
        *   Creates a shot that contains all information about this shot.
        *
        *   @return The shot that is currently fired from the player.
        ***************************************************************************************************************/
        private createShot() : bz.Shot
        {
            const divergenceY :number = 0.05 * ( bz.MathUtil.getRandomInt( -20, 20 ) );
            const divergenceZ :number = 0.05 * ( bz.MathUtil.getRandomInt( -20, 20 ) );

            const source      :BABYLON.Vector3 = this.body.absolutePosition;
            const rotation    :BABYLON.Vector3 = new BABYLON.Vector3
            (
                this.rotation.z + divergenceZ,
                this.rotation.y + divergenceY,
                0.0
            );
            const range :number = 50.0;

            return new bz.Shot
            (
                source,
                rotation,
                range,
                false,
                1
            );
        }
    }

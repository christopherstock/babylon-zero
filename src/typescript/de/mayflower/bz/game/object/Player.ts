
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a human player being controlled by the user.
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

        /** The current height of the player. Changes on ducking. */
        private                         heightY                     :number                             = 0.0;
        /** Flags if rotZ view centering should occur this tick. */
        private                         centerRotZ                  :boolean                            = false;
        /** The current angle for the sinus calculation of the head shaking. */
        private                         headShakingAngle            :number                             = 0.0;

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
        private             readonly    head                        :BABYLON.AbstractMesh               = null;
        /** The referenced left hand mesh. */
        private             readonly    leftHand                    :BABYLON.AbstractMesh               = null;
        /** The referenced right hand mesh. */
        private             readonly    rightHand                   :BABYLON.AbstractMesh               = null;

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
                        new bz.MeshFactory( scene ).createCylinder
                        (
                            position.clone().addInPlace(
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                            ),
                            bz.MeshAnchor.CENTER_XYZ,
                            bz.SettingPlayer.DIAMETER_BODY_XZ,
                            bz.SettingPlayer.HEIGHT_Y_STANDING,
                            BABYLON.Vector3.Zero(),
                            bz.Texture.WALL_GLASS,
                            null,
                            bz.PhysicBehaviour.PLAYER_HUMAN,
                            0.5,
                            emissiveColor
                        ),
/*
                        // Player.PLAYER_BODY_ID
                        bz.MeshFactory.createImportedModel
                        (
                            scene,
                            bz.ModelFile.CRATE,
                            position.clone(),
                            bz.Physic.PLAYER_HUMAN,
                            bz.ModelCompoundType.NONE
                        ).getMesh( 0 ),
*/
                        // Player.PLAYER_HEAD_ID
                        new bz.MeshFactory( scene ).createSphere
                        (
                            position.clone().addInPlace(
                                new BABYLON.Vector3(
                                    0.0,
                                    (
                                        ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 )
                                        - ( bz.SettingPlayer.DIAMETER_HEAD / 2 )
                                    ),
                                    0.0
                                )
                            ),
                            bz.MeshAnchor.CENTER_XYZ,
                            bz.SettingPlayer.DIAMETER_HEAD,
                            BABYLON.Vector3.Zero(),
                            bz.Texture.WALL_SKIN_ROSE,
                            null,
                            bz.PhysicBehaviour.NONE,
                            1.0,
                            emissiveColor
                        ),

                        // Player.PLAYER_LEFT_HAND_ID
                        new bz.MeshFactory( scene ).createBox
                        (
                            emissiveColor,
                            position.clone().addInPlace( new BABYLON.Vector3( -1.25, 1.25, 0.0 ) ),
                            bz.Texture.WALL_SKIN_ROSE,
                            new BABYLON.Vector3( 0.25, 0.25, 0.25 )
                        ),

                        // Player.PLAYER_RIGHT_HAND_ID
                        new bz.MeshFactory( scene ).createBox
                        (
                            emissiveColor,
                            position.clone().addInPlace( new BABYLON.Vector3( 1.25, 1.25, 0.0 ) ),
                            bz.Texture.WALL_SKIN_ROSE,
                            new BABYLON.Vector3( 0.25, 0.25, 0.25 )
                        ),
                    ]
                ),

/*
                        // Player.PLAYER_HEAD_ID
                        bz.MeshFactory.createSphere
                        (
                            scene,
                            BABYLON.Vector3.Zero(),
                            bz.MeshPivotAnchor.CENTER_XYZ,
                            bz.SettingPlayer.DIAMETER_HEAD,
                            BABYLON.Vector3.Zero(),
                            bz.Texture.WALL_SKIN_ROSE,
                            null,
                            bz.Physic.NONE,
                            1.0,
                            emissiveColor
                        ),
 */
                bz.GameObject.UNBREAKABLE
            );

            // assign initial rotation, rotation delta and move delta
            this.rotation      = new BABYLON.Vector3( 0.0, rotY, 0.0 );
            this.rotationDelta = BABYLON.Vector3.Zero();
            this.moveDelta     = BABYLON.Vector3.Zero();

            // reference the body and all limbs
            this.body      = this.model.getMesh( Player.PLAYER_BODY_ID       );
            this.head      = this.model.getMesh( Player.PLAYER_HEAD_ID       );
            this.leftHand  = this.model.getMesh( Player.PLAYER_LEFT_HAND_ID  );
            this.rightHand = this.model.getMesh( Player.PLAYER_RIGHT_HAND_ID );

            // stick all limbs to body
            this.head.setParent(      this.body );
            this.leftHand.setParent(  this.body );
            this.rightHand.setParent( this.body );

            // set initial height
            this.heightY     = bz.SettingPlayer.HEIGHT_Y_STANDING;
            this.fieldOfView = bz.SettingEngine.DEFAULT_FIELD_OF_VIEW;

            // apply initial rotation
            this.rotatePlayerXYZ();

            // apply positions for all limbs
            this.positionPlayerLimbs();
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
            // check user input
            this.handleUserInput();

            // alter position
            this.movePlayer();
            this.manipulateVelocities();

            // alter view
            this.rotatePlayerXYZ();
            this.checkCenteringRotZ();
            this.checkFieldOfViewChange();

            // alter height
            this.checkHeightChange();

            // interact with level
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
        *   Handles all keys for the player.
        ***************************************************************************************************************/
        private handleUserInput() : void
        {
            const keySystem:bz.KeySystem = this.stage.getGame().getKeySystem();
            const mouseSystem:bz.MouseSystem = this.stage.getGame().getMouseSystem();

            // move forewards and backwards
            if
            (
                   keySystem.isPressed( bz.KeyCodes.KEY_W  )
                // || keySystem.isPressed( bz.KeyCodes.KEY_UP )
            )
            {
                let speedForward:number;

                // probably run
                if ( keySystem.isPressed( bz.KeyCodes.KEY_SHIFT_LEFT  ) )
                {
                    speedForward = bz.SettingPlayer.RUN_IMPULSE;
                }
                else
                {
                    speedForward = bz.SettingPlayer.MOVE_IMPULSE;
                }

                this.moveDelta.x += speedForward * bz.MathUtil.sinDegrees( this.rotation.y );
                this.moveDelta.z += speedForward * bz.MathUtil.cosDegrees( this.rotation.y );

                // shake head if enabled
                if ( bz.SettingPlayer.HEAD_SHAKING_ENABLED )
                {
                    this.alterHeadShakeAngle( speedForward );
                }
            }
            if
            (
                    keySystem.isPressed( bz.KeyCodes.KEY_S )
                // ||  keySystem.isPressed( bz.KeyCodes.KEY_DOWN )
            )
            {
                this.moveDelta.x -= bz.SettingPlayer.MOVE_IMPULSE * bz.MathUtil.sinDegrees( this.rotation.y );
                this.moveDelta.z -= bz.SettingPlayer.MOVE_IMPULSE * bz.MathUtil.cosDegrees( this.rotation.y );

                // shake head if enabled
                if ( bz.SettingPlayer.HEAD_SHAKING_ENABLED )
                {
                    this.alterHeadShakeAngle( -bz.SettingPlayer.MOVE_IMPULSE );
                }
            }

            // strave
            if
            (
                   keySystem.isPressed( bz.KeyCodes.KEY_A    )
                // || keySystem.isPressed( bz.KeyCodes.KEY_LEFT )
            )
            {
                this.moveDelta.x -= bz.SettingPlayer.SPEED_STRAVE * bz.MathUtil.cosDegrees( this.rotation.y );
                this.moveDelta.z += bz.SettingPlayer.SPEED_STRAVE * bz.MathUtil.sinDegrees( this.rotation.y );
            }
            if
            (
                   keySystem.isPressed( bz.KeyCodes.KEY_D     )
                // || keySystem.isPressed( bz.KeyCodes.KEY_RIGHT )
            )
            {
                this.moveDelta.x += bz.SettingPlayer.SPEED_STRAVE * bz.MathUtil.cosDegrees( this.rotation.y );
                this.moveDelta.z -= bz.SettingPlayer.SPEED_STRAVE * bz.MathUtil.sinDegrees( this.rotation.y );
            }

            // turn Y
            if ( keySystem.isPressed( bz.KeyCodes.KEY_Q ) )
            {
                this.rotationDelta.y = -bz.SettingPlayer.SPEED_TURN;
            }
            if ( keySystem.isPressed( bz.KeyCodes.KEY_E ) )
            {
                this.rotationDelta.y = bz.SettingPlayer.SPEED_TURN;
            }
            const lastPointerMovementX :number = mouseSystem.getAndResetLastMouseMovementX();
            if ( lastPointerMovementX !== 0 )
            {
                // noinspection JSSuspiciousNameCombination
                this.rotationDelta.y += ( lastPointerMovementX * bz.SettingPlayer.POINTER_MOVEMENT_MULTIPLIER );
            }

            // look up / down
            if ( keySystem.isPressed( bz.KeyCodes.KEY_R ) )
            {
                this.rotationDelta.z = -bz.SettingPlayer.SPEED_LOOK_UP_DOWN;
            }
            if ( keySystem.isPressed( bz.KeyCodes.KEY_F ) )
            {
                this.rotationDelta.z = bz.SettingPlayer.SPEED_LOOK_UP_DOWN;
            }
            const lastPointerMovementY :number = mouseSystem.getAndResetLastMouseMovementY();
            if ( lastPointerMovementY !== 0 )
            {
                // noinspection JSSuspiciousNameCombination
                this.rotationDelta.z += ( lastPointerMovementY * bz.SettingPlayer.POINTER_MOVEMENT_MULTIPLIER );
            }

            // fire
            if ( keySystem.isPressed( bz.KeyCodes.KEY_CTRL_LEFT ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_CTRL_LEFT );
                this.fire = true;
            }
            if ( mouseSystem.consumeMouseButtonDown( bz.MouseCodes.MOUSE_BUTTON_LEFT ) )
            {
                // mouseSystem.setButtonNeedsRelease( bz.MouseSystem.MOUSE_BUTTON_LEFT );
                this.fire = true;
            }

            // duck
            if ( keySystem.isPressed( bz.KeyCodes.KEY_Y ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_Y );

                this.toggleDuck();
            }

            // jump
            if ( bz.SettingPlayer.JUMP_ENABLED )
            {
                if ( keySystem.isPressed( bz.KeyCodes.KEY_SPACE ) )
                {
                    keySystem.setNeedsRelease( bz.KeyCodes.KEY_SPACE );

                    this.assignJump();
                }
            }

            // zoom
            this.zoom = (
                keySystem.isPressed( bz.KeyCodes.KEY_X )
                || mouseSystem.isMouseButtonDown( bz.MouseCodes.MOUSE_BUTTON_RIGHT )
            );
        }

        /** ************************************************************************************************************
        *   Moves all player's meshes by the current move deltas.
        ***************************************************************************************************************/
        private movePlayer() : void
        {
            // check if moving occurred
            if
            (
                this.moveDelta.x !== 0.0
                || this.moveDelta.y !== 0.0
                || this.moveDelta.z !== 0.0
            )
            {
                // direct movement is completely inoperative! :(
                const DIRECT_MOVEMENT :boolean = false;

                if ( DIRECT_MOVEMENT )
                {
                    // apply direct move delta
                    this.body.moveWithCollisions
                    (
                        new BABYLON.Vector3
                        (
                            this.moveDelta.x,
                            this.moveDelta.y,
                            this.moveDelta.z
                        )
                    );
                }
                else
                {
                    // apply physical impulse
                    if ( this.body.physicsImpostor !== undefined )
                    {
                        // this.body.physicsImpostor.setDeltaPosition ??

                        this.body.physicsImpostor.applyImpulse
                        (
                            new BABYLON.Vector3
                            (
                                this.moveDelta.x,
                                this.moveDelta.y,
                                this.moveDelta.z
                            ),
                            this.body.position
                        );
                    }
                }

                // force rotZ centering on horizontal movements if enabled
                if ( bz.SettingPlayer.ENABLE_CENTERING_ROT_Y_ON_WALKING )
                {
                    if ( this.moveDelta.x !== 0.0 || this.moveDelta.z !== 0.0 )
                    {
                        this.centerRotZ = true;
                    }
                }

                // reset move deltas
                this.moveDelta = BABYLON.Vector3.Zero();
            }
            else
            {
                this.centerRotZ = false;
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
                const velocity:BABYLON.Vector3 = this.body.physicsImpostor.getLinearVelocity();
                this.body.physicsImpostor.setLinearVelocity
                (
                    new BABYLON.Vector3
                    (
                        ( velocity.x * bz.SettingPlayer.MOVE_VELOCITY_MULTIPLIER ),

                        // check player falling
                        (
                            this.isFalling()

                            // scale up falling velocity
                            ? ( velocity.y * bz.SettingPlayer.FALLING_VELOCITY_MULTIPLIER )

                            // keep velocity
                            : velocity.y
                        ),

                        ( velocity.z * bz.SettingPlayer.MOVE_VELOCITY_MULTIPLIER )
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

                if ( this.rotation.z > bz.SettingPlayer.MAX_LOOK_UP_DOWN )
                {
                    this.rotation.z = bz.SettingPlayer.MAX_LOOK_UP_DOWN;
                }
                else if ( this.rotation.z < -bz.SettingPlayer.MAX_LOOK_UP_DOWN )
                {
                    this.rotation.z = -bz.SettingPlayer.MAX_LOOK_UP_DOWN;
                }

                this.rotationDelta.z = 0.0;
            }

            // rotate body
            bz.MeshManipulation.setAbsoluteRotationXYZ
            (
                this.body,
                0.0, // this.rotation.z,
                this.rotation.y,
                0.0
            );

            // rotate head
            bz.MeshManipulation.setAbsoluteRotationXYZ
            (
                this.head,
                this.rotation.z,
                0.0,
                0.0
            );
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
        *   Assigns player jumping.
        ***************************************************************************************************************/
        private assignJump() : void
        {
/*
            if ( this.jumpTicks > 0 )
            {
                bz.Debug.player.log( 'Player jumping denied cause already jumping' );
                return;
            }
*/
            // deny jumping if currently falling
            if ( this.isFalling() )
            {
                bz.Debug.player.log( 'Player jumping denied caused by falling' );
                return;
            }

            bz.Debug.player.log( 'Player jumps' );
            this.moveDelta.y = bz.SettingPlayer.JUMP_ASCEND_IMPULSE_Y;
        }

        /** ************************************************************************************************************
        *   Checks if a height change is required and possibly changes it.
        ***************************************************************************************************************/
        private checkHeightChange() : void
        {
            if ( this.duck )
            {
                if ( this.heightY > bz.SettingPlayer.HEIGHT_Y_DUCKED )
                {
                    this.heightY -= bz.SettingPlayer.SPEED_DUCKING;

                    if ( this.heightY < bz.SettingPlayer.HEIGHT_Y_DUCKED )
                    {
                        this.heightY = bz.SettingPlayer.HEIGHT_Y_DUCKED;
                    }

                    this.positionPlayerLimbs();
                }
            }
            else
            {
                if ( this.heightY < bz.SettingPlayer.HEIGHT_Y_STANDING )
                {
                    this.heightY += bz.SettingPlayer.SPEED_STANDING_UP;

                    if ( this.heightY > bz.SettingPlayer.HEIGHT_Y_STANDING )
                    {
                        this.heightY = bz.SettingPlayer.HEIGHT_Y_STANDING;
                    }

                    this.positionPlayerLimbs();
                }
            }
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
                    this.rotation.z -= bz.SettingPlayer.SPEED_CENTER_LOOK_UP_DOWN;

                    if ( this.rotation.z <= 0.0 )
                    {
                        this.rotation.z = 0.0;
                    }
                }
                else if ( this.rotation.z < 0.0 )
                {
                    this.rotation.z += bz.SettingPlayer.SPEED_CENTER_LOOK_UP_DOWN;

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
                // mark fire request as processed
                this.fire = false;

                bz.Debug.fire.log();
                bz.Debug.fire.log( 'Player is firing' );

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

            const source      :BABYLON.Vector3 = this.head.absolutePosition;
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

        /** ************************************************************************************************************
        *   Positions all player limbs according to the current player height.
        ***************************************************************************************************************/
        private positionPlayerLimbs() : void
        {
            // get half player height
            const halfPlayerHeight:number = ( this.heightY / 2 );

            // get current modifier Y
            const headShakingModifierY:number =
            (
                bz.MathUtil.sinDegrees( this.headShakingAngle )
                * bz.SettingPlayer.HEAD_SHAKING_RANGE_Y
            );

            // bz.Debug.player.log( ' Head Shaking modifierY is [' + headShakingModifierY + ']' );
/*
            this.head.position = new BABYLON.Vector3
            (
                0.0,
                ( halfPlayerHeight - ( bz.SettingPlayer.DIAMETER_HEAD / 2 ) ) - headShakingModifierY,
                0.0
            );

            this.leftHand.position = new BABYLON.Vector3
            (
                -1.0,
                halfPlayerHeight - ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ),
                0.0
            );
            this.rightHand.position = new BABYLON.Vector3
            (
                1.0,
                halfPlayerHeight - ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ),
                0.0
            );
 */
        }

        /** ************************************************************************************************************
        *   Alters the angle that simulates the head shaking on walking forwards and backwards.
        *
        *   @param delta The moving delta to apply on head shaking.
        ***************************************************************************************************************/
        private alterHeadShakeAngle( delta:number ) : void
        {
            // apply delta and normalize angle
            this.headShakingAngle += ( delta * bz.SettingPlayer.HEAD_SHAKING_VELOCITY_MULTIPLIER );
            this.headShakingAngle = bz.MathUtil.normalizeAngleDegrees( this.headShakingAngle );

            // bz.Debug.player.log( 'Head shake angle delta [' + delta + '] total [' + this.headShakingAngle + ']' );

            // update player limbs positions
            this.positionPlayerLimbs();
        }

        /** ************************************************************************************************************
        *   Determines if the player is currently falling.
        *
        *   @return <code>true</code> if the player is currently falling.
        ***************************************************************************************************************/
        private isFalling() : boolean
        {
            return (
                    this.body.physicsImpostor !== undefined
                &&  this.body.physicsImpostor.getLinearVelocity().y < bz.SettingPlayer.FALLING_VELOCITY_Y
            );
        }
    }

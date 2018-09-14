
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

        /** Flags if rotZ view centering should occur this tick. */
        private                         centerRotZ                  :boolean                            = false;
        /** Flags if fire should be performed this tick. */
        private                         fire                        :boolean                            = false;
        /** Flags if the player currently wants to duck. */
        private                         duck                        :boolean                            = false;

        /** The current height of the player. Changes on ducking. */
        private                         heightY                     :number                             = 0.0;

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
        *   @param position      The initial position.
        *   @param rotY          The initial rotation Y.
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
                            bz.SettingPlayer.PLAYER_HEIGHT_Y_STANDING,
                            BABYLON.Vector3.Zero(),
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
                            BABYLON.Vector3.Zero(),
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
                            BABYLON.Vector3.Zero(),
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
                            BABYLON.Vector3.Zero(),
                            bz.Texture.WALL_SKIN_ROSE,
                            null,
                            bz.Main.game.engine.scene.getScene(),
                            bz.Physic.NONE,
                            1.0,
                            emissiveColor
                        ),
                    ]
                ),
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
            this.heightY     = bz.SettingPlayer.PLAYER_HEIGHT_Y_STANDING;
            this.fieldOfView = bz.SettingPlayer.PLAYER_DEFAULT_FIELD_OF_VIEW;

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
                let speedForward:number = 0;

                // probably run
                if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_SHIFT_LEFT  ) )
                {
                    speedForward = bz.SettingPlayer.PLAYER_SPEED_RUN;
                }
                else
                {
                    speedForward = bz.SettingPlayer.PLAYER_SPEED_MOVE;
                }

                this.moveDelta.x += speedForward * bz.MathUtil.sinDegrees( this.rotation.y );
                this.moveDelta.z += speedForward * bz.MathUtil.cosDegrees( this.rotation.y );
            }
            if
            (
                    bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_S )
                // ||  bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_DOWN )
            )
            {
                this.moveDelta.x -= bz.SettingPlayer.PLAYER_SPEED_MOVE * bz.MathUtil.sinDegrees( this.rotation.y );
                this.moveDelta.z -= bz.SettingPlayer.PLAYER_SPEED_MOVE * bz.MathUtil.cosDegrees( this.rotation.y );
            }

            // strave
            if
            (
                   bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_A    )
                // || bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_LEFT )
            )
            {
                this.moveDelta.x -= bz.SettingPlayer.PLAYER_SPEED_STRAVE * bz.MathUtil.cosDegrees( this.rotation.y );
                this.moveDelta.z += bz.SettingPlayer.PLAYER_SPEED_STRAVE * bz.MathUtil.sinDegrees( this.rotation.y );
            }
            if
            (
                   bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_D     )
                // || bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_RIGHT )
            )
            {
                this.moveDelta.x += bz.SettingPlayer.PLAYER_SPEED_STRAVE * bz.MathUtil.cosDegrees( this.rotation.y );
                this.moveDelta.z -= bz.SettingPlayer.PLAYER_SPEED_STRAVE * bz.MathUtil.sinDegrees( this.rotation.y );
            }

            // turn Y
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_Q ) )
            {
                this.rotationDelta.y = -bz.SettingPlayer.PLAYER_SPEED_TURN;
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_E ) )
            {
                this.rotationDelta.y = bz.SettingPlayer.PLAYER_SPEED_TURN;
            }

            // look up / down
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_R ) )
            {
                this.rotationDelta.z = -bz.SettingPlayer.PLAYER_SPEED_LOOK_UP_DOWN;
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_F ) )
            {
                this.rotationDelta.z = bz.SettingPlayer.PLAYER_SPEED_LOOK_UP_DOWN;
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

            // zoom
            this.zoom = bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_X );
        }

        /** ************************************************************************************************************
        *   Renders one tick of the player's game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // move
            this.movePlayer();
            this.manipulateVelocities();

            // view
            this.rotatePlayerXYZ();
            this.checkCenteringRotZ();
            this.checkFieldOfViewChange();

            // morph
            this.checkHeightChange();

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
            if ( this.moveDelta.x !== 0.0 || this.moveDelta.z !== 0.0 )
            {
                // apply move delta
                this.body.moveWithCollisions
                (
                    new BABYLON.Vector3( this.moveDelta.x, 0.0, this.moveDelta.z )
                );

                // tslint:disable-next-line:max-line-length
                // this.mesh.physicsImpostor.applyForce( new BABYLON.Vector3( deltaX, 0.0, deltaZ ), this.mesh.position );
                // bz.Main.game.engine.scene.getScene().collisionCoordinator.getNewPosition
                // this.mesh.applyImpulse( new BABYLON.Vector3( 50 * deltaX, 0.0, 50 * deltaZ ), this.mesh.position );
                // ( this.body as BABYLON.Mesh ) .updatePhysicsBodyPosition();

                // reset move deltas
                this.moveDelta.x = 0.0;
                this.moveDelta.z = 0.0;

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
            if ( this.rotationDelta.y !== 0.0 )
            {
                this.rotation.y = bz.MathUtil.normalizeAngleDegrees( this.rotation.y + this.rotationDelta.y );
                this.rotationDelta.y = 0.0;
            }

            if ( this.rotationDelta.z !== 0.0 )
            {
                this.rotation.z += this.rotationDelta.z;

                if ( this.rotation.z > bz.SettingPlayer.PLAYER_MAX_LOOK_UP_DOWN )
                {
                    this.rotation.z = bz.SettingPlayer.PLAYER_MAX_LOOK_UP_DOWN;
                }
                else if ( this.rotation.z < -bz.SettingPlayer.PLAYER_MAX_LOOK_UP_DOWN )
                {
                    this.rotation.z = -bz.SettingPlayer.PLAYER_MAX_LOOK_UP_DOWN;
                }

                this.rotationDelta.z = 0.0;
            }

            // rotate body
            bz.MeshManipulation.setAbsoluteRotationXYZ
            (
                this.body,
                0.0,
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

            bz.Debug.player.log( 'Player ducking: [' + this.duck + ']' );
        }

        /** ************************************************************************************************************
        *   Checks if a height change is required and possibly changes it.
        ***************************************************************************************************************/
        private checkHeightChange() : void
        {
            if ( this.duck )
            {
                if ( this.heightY > bz.SettingPlayer.PLAYER_HEIGHT_Y_DUCKED )
                {
                    this.heightY -= bz.SettingPlayer.PLAYER_SPEED_DUCKING;

                    if ( this.heightY < bz.SettingPlayer.PLAYER_HEIGHT_Y_DUCKED )
                    {
                        this.heightY = bz.SettingPlayer.PLAYER_HEIGHT_Y_DUCKED;
                    }

                    this.positionPlayerLimbs();
                }
            }
            else
            {
                if ( this.heightY < bz.SettingPlayer.PLAYER_HEIGHT_Y_STANDING )
                {
                    this.heightY += bz.SettingPlayer.PLAYER_SPEED_STANDING_UP;

                    if ( this.heightY > bz.SettingPlayer.PLAYER_HEIGHT_Y_STANDING )
                    {
                        this.heightY = bz.SettingPlayer.PLAYER_HEIGHT_Y_STANDING;
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

            if ( this.zoom )
            {
                if ( this.fieldOfView > CURRENT_WEARPON_MAX_ZOOM )
                {
                    this.fieldOfView -= CURRENT_WEARPON_ZOOM_SPEED;

                    if ( this.fieldOfView < CURRENT_WEARPON_MAX_ZOOM )
                    {
                        this.fieldOfView = CURRENT_WEARPON_MAX_ZOOM;
                    }

                    bz.Main.game.stage.getCameraSystem().setFirstPersonCameraFieldOfView( this.fieldOfView );
                }
            }
            else
            {
                if ( this.fieldOfView < bz.SettingPlayer.PLAYER_DEFAULT_FIELD_OF_VIEW )
                {
                    this.fieldOfView += CURRENT_WEARPON_ZOOM_SPEED;

                    if ( this.fieldOfView > bz.SettingPlayer.PLAYER_DEFAULT_FIELD_OF_VIEW )
                    {
                        this.fieldOfView = bz.SettingPlayer.PLAYER_DEFAULT_FIELD_OF_VIEW;
                    }

                    bz.Main.game.stage.getCameraSystem().setFirstPersonCameraFieldOfView( this.fieldOfView );
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
                    this.rotation.z -= bz.SettingPlayer.PLAYER_SPEED_CENTER_LOOK_UP_DOWN;

                    if ( this.rotation.z <= 0.0 )
                    {
                        this.rotation.z = 0.0;
                    }
                }
                else if ( this.rotation.z < 0.0 )
                {
                    this.rotation.z += bz.SettingPlayer.PLAYER_SPEED_CENTER_LOOK_UP_DOWN;

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

            this.head.position = new BABYLON.Vector3
            (
                0.0,
                ( halfPlayerHeight - ( bz.SettingPlayer.PLAYER_DIAMETER_HEAD / 2 ) ),
                0.0
            );

            this.leftHand.position = new BABYLON.Vector3
            (
                -1.0,
                halfPlayerHeight - ( bz.SettingPlayer.PLAYER_HEIGHT_Y_STANDING / 2 ),
                0.0
            );
            this.rightHand.position = new BABYLON.Vector3
            (
                1.0,
                halfPlayerHeight - ( bz.SettingPlayer.PLAYER_HEIGHT_Y_STANDING / 2 ),
                0.0
            );
        }
    }

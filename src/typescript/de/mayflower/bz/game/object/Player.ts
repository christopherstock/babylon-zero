import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a human player being controlled by the user.
***********************************************************************************************************************/
export class Player extends bz.GameObject
{
    /** The current height of the player. Changes on ducking. */
    private          heightY            :number             = 0.0;
    /** Flags if rotZ view centering should occur this tick. */
    private          centerRotZ         :boolean            = false;
    /** The current angle for the sinus calculation of the head shaking. */
    private          headShakingAngle   :number             = 0.0;

    /** Flags if fire should be performed this tick. */
    private          fire               :boolean            = false;
    /** Flags if the player currently wants to duck. */
    private          duck               :boolean            = false;
    /** Flags if the player currently wants to interact. */
    private          interact           :boolean            = false;

    /** Flags if the player currently wants to zoom. */
    private          zoom               :boolean            = false;
    /** The current field of view of the player. Changes on zooming. */
    private          fieldOfView        :number             = 0.0;

    private          turnAroundTicks    :number             = 0;

    /** Current rotation. */
    private readonly rotation           :BABYLON.Vector3    = null;
    /** Current rotation delta. */
    private readonly rotationDelta      :BABYLON.Vector3    = null;
    /** Current move delta. */
    private readonly moveDelta          :BABYLON.Vector3    = null;

    /** All player physic settings. */
    private readonly playerPhysics      :bz.PlayerPhysic    = null;

    /** The inventory this player is carrying. */
    private readonly inventory          :bz.Inventory       = null;

    /** ****************************************************************************************************************
    *   Creates a new player instance.
    *
    *   @param stage         The stage this player belongs to.
    *   @param scene         The scene reference.
    *   @param position      The initial position.
    *   @param rotation      The initial rotation.
    *   @param emissiveColor The emissive color of all mesh faces.
    *******************************************************************************************************************/
    public constructor
    (
        stage         :bz.Stage,
        scene         :bz.Scene        = stage.getScene(),
        position      :BABYLON.Vector3 = stage.getConfig().startupPosition,
        rotation      :BABYLON.Vector3 = stage.getConfig().startupRotation,
        emissiveColor :BABYLON.Color3  = stage.getConfig().ambientColor
    )
    {
        super
        (
            stage,

            new bz.Model
            (
                [

                    // Player.PLAYER_BODY_ID
                    new bz.MeshFactory( scene, emissiveColor ).createCylinder
                    (
                        position.clone().addInPlace(
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                        ),
                        bz.MeshAnchor.CENTER_XYZ,
                        bz.SettingPlayer.DIAMETER_BODY,
                        bz.SettingPlayer.HEIGHT_Y_STANDING,
                        BABYLON.Vector3.Zero(),
                        bz.TextureFile.WALL_GLASS,
                        null,
                        bz.PhysicSet.PLAYER_HUMAN,
                        0.5
                    ),

                    // Player.PLAYER_HEAD_ID
                    new bz.MeshFactory( scene, emissiveColor ).createSphere
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
                        bz.TextureFile.WALL_SKIN_ROSE,
                        null,
                        bz.PhysicSet.NONE
                    ),

                    // Player.PLAYER_LEFT_HAND_ID
                    new bz.MeshFactory( scene, emissiveColor ).createBox
                    (
                        position.clone().addInPlace( new BABYLON.Vector3( -1.25, 1.25, 0.0 ) ),
                        bz.TextureFile.WALL_SKIN_ROSE,
                        new BABYLON.Vector3( 0.25, 0.25, 0.25 )
                    ),

                    // Player.PLAYER_RIGHT_HAND_ID
                    new bz.MeshFactory( scene, emissiveColor ).createBox
                    (
                        position.clone().addInPlace( new BABYLON.Vector3( 1.25, 1.25, 0.0 ) ),
                        bz.TextureFile.WALL_SKIN_ROSE,
                        new BABYLON.Vector3( 0.25, 0.25, 0.25 )
                    ),
                ]
            )
        );

        // new player physics instance
        this.playerPhysics = new bz.PlayerPhysic( this.model );

        // new player inventory
        this.inventory = new bz.Inventory();

        // assign initial rotation, rotation delta and move delta
        this.rotation      = rotation;
        this.rotationDelta = BABYLON.Vector3.Zero();
        this.moveDelta     = BABYLON.Vector3.Zero();

        // set initial height
        this.heightY     = bz.SettingPlayer.HEIGHT_Y_STANDING;
        this.fieldOfView = bz.SettingEngine.DEFAULT_FIELD_OF_VIEW;

        // apply initial rotation
        this.rotatePlayerXYZ();

        // apply positions for all limbs
        this.positionPlayerLimbs();
    }

    /** ****************************************************************************************************************
    *   Renders one tick of the player's game loop.
    *******************************************************************************************************************/
    public render() : void
    {
        // check user input
        this.handleUserInput();

        // alter position
        this.movePlayer();
        this.manipulateVelocities();

        // alter view
        this.checkTurnAround();
        this.rotatePlayerXYZ();
        this.checkCenteringRotZ();
        this.checkFieldOfViewChange();

        // alter height
        this.checkHeightChange();

        // check fire action
        this.checkFire();

        // check stage interaction
        this.checkInteraction();
    }

    /** ****************************************************************************************************************
    *   Returns the player's target mesh for the first person camera.
    *
    *   @return The player's head mesh.
    *           This is the right mesh to set the first person camera into.
    *******************************************************************************************************************/
    public getFirstPersonCameraTargetMesh() : BABYLON.AbstractMesh
    {
        return this.playerPhysics.head;
    }

    /** ****************************************************************************************************************
    *   Returns the player's target mesh for the third person camera.
    *
    *   @return The player's body mesh.
    *           This is the right mesh to set as a target for the third person camera.
    *******************************************************************************************************************/
    public getThirdPersonCameraTargetMesh() : BABYLON.AbstractMesh
    {
        return this.playerPhysics.body;
    }

    /** ****************************************************************************************************************
    *   Teleport the player to the target position.
    *
    *   @param position The position to teleport the player to.
    *******************************************************************************************************************/
    public setPosition( position:BABYLON.Vector3 ) : void
    {
        this.playerPhysics.body.position = position;
    }

    /** ****************************************************************************************************************
    *   Set the specified rotation to the player.
    *
    *   @param rotation The rotation to apply to the player.
    *******************************************************************************************************************/
    public setRotation( rotation:BABYLON.Vector3 ) : void
    {
        this.rotation.set( rotation.x, rotation.y, rotation.z );
    }

    /** ****************************************************************************************************************
    *   Delivers the current position of the player body.
    *
    *   @return Current player body position.
    *******************************************************************************************************************/
    public getPosition() : BABYLON.Vector3
    {
        return this.playerPhysics.body.position;
    }

    /** ****************************************************************************************************************
    *   Delivers the current inventory of the player.
    *
    *   @return The player's current holded inventory.
    *******************************************************************************************************************/
    public getInventory() : bz.Inventory
    {
        return this.inventory;
    }

    /** ****************************************************************************************************************
    *   Handles all keys for the player.
    *******************************************************************************************************************/
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
                speedForward = bz.SettingPlayer.IMPULSE_RUN;
            }
            else
            {
                speedForward = bz.SettingPlayer.IMPULSE_MOVE;
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
            this.moveDelta.x -= bz.SettingPlayer.IMPULSE_MOVE * bz.MathUtil.sinDegrees( this.rotation.y );
            this.moveDelta.z -= bz.SettingPlayer.IMPULSE_MOVE * bz.MathUtil.cosDegrees( this.rotation.y );

            // shake head if enabled
            if ( bz.SettingPlayer.HEAD_SHAKING_ENABLED )
            {
                this.alterHeadShakeAngle( -bz.SettingPlayer.IMPULSE_MOVE );
            }
        }

        // strave
        if
        (
            keySystem.isPressed( bz.KeyCodes.KEY_A    )
            // || keySystem.isPressed( bz.KeyCodes.KEY_LEFT )
        )
        {
            this.moveDelta.x -= bz.SettingPlayer.IMPULSE_STRAVE * bz.MathUtil.cosDegrees( this.rotation.y );
            this.moveDelta.z += bz.SettingPlayer.IMPULSE_STRAVE * bz.MathUtil.sinDegrees( this.rotation.y );
        }
        if
        (
            keySystem.isPressed( bz.KeyCodes.KEY_D     )
            // || keySystem.isPressed( bz.KeyCodes.KEY_RIGHT )
        )
        {
            this.moveDelta.x += bz.SettingPlayer.IMPULSE_STRAVE * bz.MathUtil.cosDegrees( this.rotation.y );
            this.moveDelta.z -= bz.SettingPlayer.IMPULSE_STRAVE * bz.MathUtil.sinDegrees( this.rotation.y );
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
        if ( keySystem.isPressed( bz.KeyCodes.KEY_T ) )
        {
            this.rotationDelta.z = -bz.SettingPlayer.SPEED_LOOK_UP_DOWN;
        }
        if ( keySystem.isPressed( bz.KeyCodes.KEY_G ) )
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
        if ( keySystem.isPressed( bz.KeyCodes.KEY_C ) )
        {
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_C );

            this.toggleDuck();
        }

        // jump
        if ( bz.SettingPlayer.JUMP_ENABLED )
        {
            if ( keySystem.isPressed( bz.KeyCodes.KEY_C ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_C );

                this.assignJump();
            }
        }

        // interact
        if ( keySystem.isPressed( bz.KeyCodes.KEY_SPACE ) )
        {
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_SPACE );

            this.interact = true;
        }

        // zoom
        this.zoom = (
            keySystem.isPressed( bz.KeyCodes.KEY_Y )
            || mouseSystem.isMouseButtonDown( bz.MouseCodes.MOUSE_BUTTON_RIGHT )
        );

        // turn around
        if ( keySystem.isPressed( bz.KeyCodes.KEY_X ) )
        {
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_X );
            this.turnAroundTicks = bz.SettingPlayer.TICKS_TURN_AROUND;
        }

        // consume painkiller
        if ( keySystem.isPressed( bz.KeyCodes.KEY_BACKSPACE ) )
        {
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_BACKSPACE );

            this.consumePainkiller();
        }
    }

    /** ****************************************************************************************************************
    *   Moves all player's meshes by the current move deltas.
    *******************************************************************************************************************/
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
                this.playerPhysics.body.moveWithCollisions
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
                if ( this.playerPhysics.body.physicsImpostor !== undefined )
                {
                    // this.body.physicsImpostor.setDeltaPosition ??

                    this.playerPhysics.body.physicsImpostor.applyImpulse
                    (
                        new BABYLON.Vector3
                        (
                            this.moveDelta.x,
                            this.moveDelta.y,
                            this.moveDelta.z
                        ),
                        this.playerPhysics.body.position
                    );
                }
            }

            // force rotZ centering on horizontal movements if enabled
            if ( bz.SettingPlayer.ENABLE_CENTERING_ROT_Z_ON_WALKING )
            {
                if ( this.moveDelta.x !== 0.0 || this.moveDelta.z !== 0.0 )
                {
                    this.centerRotZ = true;
                }
            }

            // reset move deltas
            this.moveDelta.x = 0.0;
            this.moveDelta.y = 0.0;
            this.moveDelta.z = 0.0;
        }
        else
        {
            this.centerRotZ = false;
        }
    }

    /** ****************************************************************************************************************
    *   Overrides the player's linear and angular velocities for improved player controls and user experience.
    *******************************************************************************************************************/
    private manipulateVelocities() : void
    {
        if ( this.playerPhysics.body.physicsImpostor !== undefined )
        {
            // suppress linear velocities for X and Z axis
            const velocity:BABYLON.Vector3 = this.playerPhysics.body.physicsImpostor.getLinearVelocity();

            this.playerPhysics.body.physicsImpostor.setLinearVelocity
            (
                new BABYLON.Vector3
                (
                    ( velocity.x * bz.SettingPlayer.MOVE_VELOCITY_MITIGATION ),

                    // check player ascending
                    (
                        velocity.y >= 1.0
                            ? velocity.y * bz.SettingPlayer.FALL_VELOCITY_MITIGATION
                            : velocity.y <= -1.0
                                ? velocity.y * bz.SettingPlayer.FALL_VELOCITY_MITIGATION
                                : velocity.y
                    ),

                    ( velocity.z * bz.SettingPlayer.MOVE_VELOCITY_MITIGATION )
                )
            );

            // completely suppress angular velocities
            this.playerPhysics.body.physicsImpostor.setAngularVelocity
            (
                BABYLON.Vector3.Zero()
            );
        }
    }

    /** ****************************************************************************************************************
    *   Applies the current rotations for all axis to the according player body parts.
    *******************************************************************************************************************/
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

            if ( this.rotation.z > bz.SettingPlayer.MAX_ROT_Z )
            {
                this.rotation.z = bz.SettingPlayer.MAX_ROT_Z;
            }
            else if ( this.rotation.z < -bz.SettingPlayer.MAX_ROT_Z )
            {
                this.rotation.z = -bz.SettingPlayer.MAX_ROT_Z;
            }

            this.rotationDelta.z = 0.0;
        }

        // rotate body
        bz.MeshManipulation.setAbsoluteRotationXYZ
        (
            this.playerPhysics.body,
            0.0, // this.rotation.z,
            this.rotation.y,
            0.0
        );

        // rotate head
        bz.MeshManipulation.setAbsoluteRotationXYZ
        (
            this.playerPhysics.head,
            this.rotation.z,
            0.0,
            0.0
        );
    }

    /** ****************************************************************************************************************
    *   Toggles player ducking.
    *******************************************************************************************************************/
    private toggleDuck() : void
    {
        this.duck = !this.duck;

        bz.Debug.player.log( 'Player toggle duck to: [' + String( this.duck ) + ']' );
    }

    /** ****************************************************************************************************************
    *   Assigns player jumping.
    *******************************************************************************************************************/
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
        if ( this.playerPhysics.isFalling() )
        {
            bz.Debug.player.log( 'Player jump denied caused by falling' );
            return;
        }

        bz.Debug.player.log( 'Player jumps' );
        this.moveDelta.y = bz.SettingPlayer.JUMP_ASCEND_IMPULSE_Y;
    }

    /** ****************************************************************************************************************
    *   Checks if a height change is required and possibly changes it.
    *******************************************************************************************************************/
    private checkHeightChange() : void
    {
        if ( this.duck )
        {
            if ( this.heightY > bz.SettingPlayer.HEIGHT_Y_DUCKING )
            {
                this.heightY -= bz.SettingPlayer.SPEED_DUCK_DOWN;

                if ( this.heightY < bz.SettingPlayer.HEIGHT_Y_DUCKING )
                {
                    this.heightY = bz.SettingPlayer.HEIGHT_Y_DUCKING;
                }

                this.positionPlayerLimbs();
            }
        }
        else
        {
            if ( this.heightY < bz.SettingPlayer.HEIGHT_Y_STANDING )
            {
                this.heightY += bz.SettingPlayer.SPEED_STAND_UP;

                if ( this.heightY > bz.SettingPlayer.HEIGHT_Y_STANDING )
                {
                    this.heightY = bz.SettingPlayer.HEIGHT_Y_STANDING;
                }

                this.positionPlayerLimbs();
            }
        }
    }

    /** ****************************************************************************************************************
    *   Checks if the player's field of view changes.
    *******************************************************************************************************************/
    private checkFieldOfViewChange() : void
    {
        const cameraSystem :bz.CameraSystem = this.stage.getCameraSystem();
        let   fovChanged   :boolean         = false;

        if ( this.zoom )
        {
            if ( this.fieldOfView > bz.SettingEngine.CURRENT_WEARPON_MAX_ZOOM )
            {
                this.fieldOfView -= bz.SettingEngine.CURRENT_WEARPON_ZOOM_SPEED;

                if ( this.fieldOfView < bz.SettingEngine.CURRENT_WEARPON_MAX_ZOOM )
                {
                    this.fieldOfView = bz.SettingEngine.CURRENT_WEARPON_MAX_ZOOM;
                }

                fovChanged = true;
            }
        }
        else
        {
            if ( this.fieldOfView < bz.SettingEngine.DEFAULT_FIELD_OF_VIEW )
            {
                this.fieldOfView += bz.SettingEngine.CURRENT_WEARPON_ZOOM_SPEED;

                if ( this.fieldOfView > bz.SettingEngine.DEFAULT_FIELD_OF_VIEW )
                {
                    this.fieldOfView = bz.SettingEngine.DEFAULT_FIELD_OF_VIEW;
                }

                fovChanged = true;
            }
        }

        if ( fovChanged )
        {
            cameraSystem.setFirstPersonCameraFieldOfView( this.fieldOfView );
            this.stage.getGame().getGUI().zoomWearponImage(
                1.0 - (
                    ( this.fieldOfView / bz.SettingEngine.CURRENT_WEARPON_MAX_ZOOM )
                    - bz.SettingEngine.DEFAULT_FIELD_OF_VIEW
                )
            );
        }
    }

    /** ****************************************************************************************************************
    *   Checks if the player's rotation on the Z axis should be centered to zero.
    *******************************************************************************************************************/
    private checkTurnAround() : void
    {
        if ( this.turnAroundTicks > 0 )
        {
            --this.turnAroundTicks;

            this.rotationDelta.y = bz.MathUtil.normalizeAngleDegrees(
                ( this.rotationDelta.y + ( 180.0 / bz.SettingPlayer.TICKS_TURN_AROUND ) )
            );
        }
    }

    /** ****************************************************************************************************************
    *   Checks if the player's rotation on the Z axis should be centered to zero.
    *******************************************************************************************************************/
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

    /** ****************************************************************************************************************
    *   Checks if the player is firing.
    *******************************************************************************************************************/
    private checkFire() : void
    {
        // check if firing is requested
        if ( this.fire )
        {
            // mark fire request as processed
            this.fire = false;

            bz.Debug.fire.log();
            bz.Debug.fire.log( 'Player fires' );

            // create shot and apply it onto the stage
            const shot:bz.Shot = this.createShot();
            this.stage.applyShot( shot );
        }
    }

    /** ****************************************************************************************************************
    *   Checks if the player is interacting with the scene.
    *******************************************************************************************************************/
    private checkInteraction() : void
    {
        // check if interact is requested
        if ( this.interact )
        {
            // mark interact request as processed
            this.interact = false;

            bz.Debug.player.log();
            bz.Debug.player.log( 'Player interacts with the scene' );

            // apply interaction to the stage
            const interaction:bz.Shot = this.createInteraction();
            bz.Debug.player.log( 'apply interaction to stage' );
            this.stage.applyInteraction( interaction );
        }
    }

    /** ****************************************************************************************************************
    *   Creates a shot that contains all information about this shot.
    *
    *   @return The shot that is currently fired from the player.
    *******************************************************************************************************************/
    private createShot() : bz.Shot
    {
        const divergenceY :number = 0.05 * ( bz.MathUtil.getRandomInt( -20, 20 ) );
        const divergenceZ :number = 0.05 * ( bz.MathUtil.getRandomInt( -20, 20 ) );

        const source      :BABYLON.Vector3 = this.playerPhysics.head.absolutePosition;
        const rotation    :BABYLON.Vector3 = new BABYLON.Vector3
        (
            this.rotation.z + divergenceZ,
            this.rotation.y + divergenceY,
            0.0
        );
        const range :number = 50.0;

        const DAMAGE :number = 1.0;

        return new bz.Shot
        (
            source,
            rotation,
            range,
            false,
            DAMAGE
        );
    }

    /** ****************************************************************************************************************
    *   Creates an interaction that contains all information about a player action.
    *
    *   @return The interaction that is currently caused by the player.
    *******************************************************************************************************************/
    private createInteraction() : bz.Shot
    {
        const source      :BABYLON.Vector3 = this.playerPhysics.head.absolutePosition;
        const rotation    :BABYLON.Vector3 = new BABYLON.Vector3
        (
            this.rotation.z,
            this.rotation.y,
            0.0
        );

        return new bz.Interaction
        (
            source,
            rotation,
            bz.SettingPlayer.RANGE_INTERACTION
        );
    }

    /** ****************************************************************************************************************
    *   Positions all player limbs according to the current player height.
    *******************************************************************************************************************/
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
        this.playerPhysics.head.position = new BABYLON.Vector3
        (
            0.0,
            ( halfPlayerHeight - ( bz.SettingPlayer.DIAMETER_HEAD / 2 ) ) - headShakingModifierY,
            0.0
        );

        this.playerPhysics.leftHand.position = new BABYLON.Vector3
        (
            -1.0,
            halfPlayerHeight - ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ),
            0.0
        );
        this.playerPhysics.rightHand.position = new BABYLON.Vector3
        (
            1.0,
            halfPlayerHeight - ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ),
            0.0
        );
    }

    /** ****************************************************************************************************************
    *   Alters the angle that simulates the head shaking on walking forwards and backwards.
    *
    *   @param delta The moving delta to apply on head shaking.
    *******************************************************************************************************************/
    private alterHeadShakeAngle( delta:number ) : void
    {
        // apply delta and normalize angle
        this.headShakingAngle += ( delta * bz.SettingPlayer.HEAD_SHAKING_VELOCITY_MULTIPLIER );
        this.headShakingAngle = bz.MathUtil.normalizeAngleDegrees( this.headShakingAngle );

        // bz.Debug.player.log( 'Head shake angle delta [' + delta + '] total [' + this.headShakingAngle + ']' );

        // update player limbs positions
        this.positionPlayerLimbs();
    }

    private consumePainkiller() : void
    {
        // check if painkillers are available
        if ( this.inventory.numberOfPainkillers <= 0 )
        {
            this.stage.addEventsToPipeline(
                [
                    new bz.Event(
                        bz.EventType.SHOW_GUI_MESSAGE,
                        new bz.EventDataShowGuiMessage( 'No pain killers available!' )
                    ),
                ]
            );

            return;
        }

        // lower number of painkillers
        --this.inventory.numberOfPainkillers;

        // trigger stage events
        this.stage.addEventsToPipeline(
            [
                new bz.Event(
                    bz.EventType.SHOW_GUI_EFFECT,
                    new bz.EventDataShowGuiEffect( bz.GUIFxType.GAIN_ENERGY )
                ),
                new bz.Event(
                    bz.EventType.SHOW_GUI_MESSAGE,
                    new bz.EventDataShowGuiMessage( 'Consumed one Painkiller' )
                ),
            ]
        );
    }
}

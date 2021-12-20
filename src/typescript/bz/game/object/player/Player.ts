import * as bz from '../../..';

/** ********************************************************************************************************************
*   Represents a human player being controlled by the user.
***********************************************************************************************************************/
export class Player extends bz.GameObject
{
    /** Flags if the player wants to center rotZ. */
    public          centerRotZ         :boolean            = false;
    /** Flags if the player wants to fire. */
    private          fire               :boolean            = false;
    /** Flags if the player wants to duck. */
    private          duck               :boolean            = false;
    /** Flags if the player wants to interact. */
    private          interact           :boolean            = false;
    /** Flags if the player wants to zoom. */
    private          zoom               :boolean            = false;

    /** The current angle for the sinus calculation of the head shaking. */
    private          headShakingAngle   :number             = 0.0;
    /** The current field of view of the player. Changes on zooming. */
    private          fieldOfView        :number             = 0.0;
    /** Tick counter for turn around animation. */
    private          turnAroundTicks    :number             = 0;

    /** The inventory this player is carrying. */
    private readonly inventory          :bz.Inventory       = null;

    /** All handling for the player physic. */
    private readonly playerPhysic       :bz.PlayerPhysic    = null;
    /** All handling for the player wearpon. */
    private readonly playerWearpon      :bz.PlayerWearpon   = null;

    /** ****************************************************************************************************************
    *   Creates a new player instance.
    *
    *   @param stage The stage this player belongs to.
    *******************************************************************************************************************/
    public constructor( stage:bz.Stage )
    {
        super
        (
            stage,
            Player.createPlayerModel( stage )
        );

        // new player physics and wearpons instance
        this.playerPhysic  = new bz.PlayerPhysic( this.model, stage.getConfig().startupRotation );
        this.playerWearpon = new bz.PlayerWearpon( stage, this.playerPhysic.head );

        // new player inventory
        this.inventory = stage.getConfig().startupInventory;

        this.fieldOfView = bz.SettingEngine.DEFAULT_FIELD_OF_VIEW;

        // apply initial rotation
        this.rotatePlayerXYZ();

        // apply positions for all limbs
        this.positionPlayerLimbs();
    }

    /** ****************************************************************************************************************
    *   Disposes all meshes of the player.
    *******************************************************************************************************************/
    public dispose() : void
    {
        super.dispose();

        this.playerWearpon.dispose();
    }

    /** ****************************************************************************************************************
    *   Renders one tick of the player's game loop.
    *******************************************************************************************************************/
    public render() : void
    {
        this.handleUserInput();

        this.playerPhysic.movePlayer( this );
        this.playerPhysic.manipulateVelocities();

        this.checkTurnAround();
        this.rotatePlayerXYZ();
        this.checkCenteringRotZ();
        this.checkFieldOfViewChange();
        this.checkHeightChange();
        this.checkFireAction();
        this.checkStageInteraction();

        this.playerWearpon.updatePositionAndRotation();
    }

    /** ****************************************************************************************************************
    *   Returns the player's target mesh for the first person camera.
    *
    *   @return The player's head mesh.
    *           This is the right mesh to set the first person camera into.
    *******************************************************************************************************************/
    public getFirstPersonCameraTargetMesh() : BABYLON.AbstractMesh
    {
        return this.playerPhysic.head;
    }

    /** ****************************************************************************************************************
    *   Returns the player's target mesh for the third person camera.
    *
    *   @return The player's body mesh.
    *           This is the right mesh to set as a target for the third person camera.
    *******************************************************************************************************************/
    public getThirdPersonCameraTargetMesh() : BABYLON.AbstractMesh
    {
        return this.playerPhysic.body;
    }

    /** ****************************************************************************************************************
    *   Delivers the current position of the player body.
    *
    *   @return Current player body position.
    *******************************************************************************************************************/
    public getPosition() : BABYLON.Vector3
    {
        return this.playerPhysic.body.position;
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

            this.playerPhysic.moveDelta.x += speedForward * bz.MathUtil.sinDegrees( this.playerPhysic.rotation.y );
            this.playerPhysic.moveDelta.z += speedForward * bz.MathUtil.cosDegrees( this.playerPhysic.rotation.y );

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
            this.playerPhysic.moveDelta.x -= (
                bz.SettingPlayer.IMPULSE_MOVE * bz.MathUtil.sinDegrees( this.playerPhysic.rotation.y )
            );
            this.playerPhysic.moveDelta.z -= (
                bz.SettingPlayer.IMPULSE_MOVE * bz.MathUtil.cosDegrees( this.playerPhysic.rotation.y )
            );

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
            this.playerPhysic.moveDelta.x -= (
                bz.SettingPlayer.IMPULSE_STRAVE * bz.MathUtil.cosDegrees( this.playerPhysic.rotation.y )
            );
            this.playerPhysic.moveDelta.z += (
                bz.SettingPlayer.IMPULSE_STRAVE * bz.MathUtil.sinDegrees( this.playerPhysic.rotation.y )
            );
        }
        if
        (
            keySystem.isPressed( bz.KeyCodes.KEY_D     )
            // || keySystem.isPressed( bz.KeyCodes.KEY_RIGHT )
        )
        {
            this.playerPhysic.moveDelta.x += (
                bz.SettingPlayer.IMPULSE_STRAVE * bz.MathUtil.cosDegrees( this.playerPhysic.rotation.y )
            );
            this.playerPhysic.moveDelta.z -= (
                bz.SettingPlayer.IMPULSE_STRAVE * bz.MathUtil.sinDegrees( this.playerPhysic.rotation.y )
            );
        }

        // turn Y
        if ( keySystem.isPressed( bz.KeyCodes.KEY_Q ) )
        {
            this.playerPhysic.rotationDelta.y = -bz.SettingPlayer.SPEED_TURN;
        }
        if ( keySystem.isPressed( bz.KeyCodes.KEY_E ) )
        {
            this.playerPhysic.rotationDelta.y = bz.SettingPlayer.SPEED_TURN;
        }
        const lastPointerMovementX :number = mouseSystem.getAndResetLastMouseMovementX();
        if ( lastPointerMovementX !== 0 )
        {
            // noinspection JSSuspiciousNameCombination
            this.playerPhysic.rotationDelta.y += (
                lastPointerMovementX * bz.SettingPlayer.POINTER_MOVEMENT_MULTIPLIER
            );
        }

        // look up / down
        if ( keySystem.isPressed( bz.KeyCodes.KEY_T ) )
        {
            this.playerPhysic.rotationDelta.z = -bz.SettingPlayer.SPEED_LOOK_UP_DOWN;
        }
        if ( keySystem.isPressed( bz.KeyCodes.KEY_G ) )
        {
            this.playerPhysic.rotationDelta.z = bz.SettingPlayer.SPEED_LOOK_UP_DOWN;
        }
        const lastPointerMovementY :number = mouseSystem.getAndResetLastMouseMovementY();
        if ( lastPointerMovementY !== 0 )
        {
            // noinspection JSSuspiciousNameCombination
            this.playerPhysic.rotationDelta.z += (
                lastPointerMovementY * bz.SettingPlayer.POINTER_MOVEMENT_MULTIPLIER
            );
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

        // consume painkiller
        if ( keySystem.isPressed( bz.KeyCodes.KEY_L ) )
        {
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_L );

            this.playerWearpon.toggleWearponRaise();
        }
    }

    /** ****************************************************************************************************************
    *   Applies the current rotations for all axis to the according player body parts.
    *******************************************************************************************************************/
    private rotatePlayerXYZ() : void
    {
        if ( this.playerPhysic.rotationDelta.y !== 0.0 )
        {
            if ( this.zoom )
            {
                this.playerWearpon.targetShotgunRotation.y = 0;
            }
            else
            {
                if ( this.playerPhysic.rotationDelta.y < 0.0 )
                {
                    this.playerWearpon.targetShotgunRotation.y += (
                        bz.PlayerWearpon.SHOTGUN_NOISE_Y * -this.playerPhysic.rotationDelta.y
                    );
                    if ( this.playerWearpon.targetShotgunRotation.y > bz.PlayerWearpon.SHOTGUN_MAX_ROT_Y )
                    {
                        this.playerWearpon.targetShotgunRotation.y = bz.PlayerWearpon.SHOTGUN_MAX_ROT_Y;
                    }
                }
                else
                {
                    this.playerWearpon.targetShotgunRotation.y -= (
                        bz.PlayerWearpon.SHOTGUN_NOISE_Y * this.playerPhysic.rotationDelta.y
                    );
                    if ( this.playerWearpon.targetShotgunRotation.y < -bz.PlayerWearpon.SHOTGUN_MAX_ROT_Y )
                    {
                        this.playerWearpon.targetShotgunRotation.y = -bz.PlayerWearpon.SHOTGUN_MAX_ROT_Y;
                    }
                }
            }

            this.playerPhysic.rotation.y = (
                bz.MathUtil.normalizeAngleDegrees( this.playerPhysic.rotation.y + this.playerPhysic.rotationDelta.y )
            );
            this.playerPhysic.rotationDelta.y = 0.0;
        }
        else
        {
            this.playerWearpon.targetShotgunRotation.y = 0.0;
        }

        if ( this.playerPhysic.rotationDelta.z !== 0.0 )
        {
            if ( this.playerPhysic.rotationDelta.z < 0.0 )
            {
                if ( this.playerPhysic.rotation.z === -bz.SettingPlayer.MAX_ROT_Z )
                {
                    this.playerWearpon.targetShotgunRotation.x = 0;
                }
                else
                {
                    this.playerPhysic.rotation.z += this.playerPhysic.rotationDelta.z;

                    if ( this.zoom )
                    {
                        this.playerWearpon.targetShotgunRotation.x = 0.0;
                    }
                    else
                    {
                        this.playerWearpon.targetShotgunRotation.x -= (
                            bz.PlayerWearpon.SHOTGUN_NOISE_X * this.playerPhysic.rotationDelta.z
                        );
                        if ( this.playerWearpon.targetShotgunRotation.x < -bz.PlayerWearpon.SHOTGUN_MAX_ROT_X )
                        {
                            this.playerWearpon.targetShotgunRotation.x = -bz.PlayerWearpon.SHOTGUN_MAX_ROT_X;
                        }
                    }

                    if ( this.playerPhysic.rotation.z < -bz.SettingPlayer.MAX_ROT_Z )
                    {
                        this.playerPhysic.rotation.z = -bz.SettingPlayer.MAX_ROT_Z;
                    }
                }
            }
            else if ( this.playerPhysic.rotationDelta.z > 0.0 )
            {
                if ( this.playerPhysic.rotation.z === bz.SettingPlayer.MAX_ROT_Z )
                {
                    this.playerWearpon.targetShotgunRotation.x = 0;
                }
                else
                {
                    this.playerPhysic.rotation.z += this.playerPhysic.rotationDelta.z;

                    if ( this.zoom )
                    {
                        this.playerWearpon.targetShotgunRotation.x = 0;
                    }
                    else
                    {
                        this.playerWearpon.targetShotgunRotation.x += (
                            bz.PlayerWearpon.SHOTGUN_NOISE_X * -this.playerPhysic.rotationDelta.z
                        );
                        if ( this.playerWearpon.targetShotgunRotation.x > bz.PlayerWearpon.SHOTGUN_MAX_ROT_X )
                        {
                            this.playerWearpon.targetShotgunRotation.x = bz.PlayerWearpon.SHOTGUN_MAX_ROT_X;
                        }
                    }

                    if ( this.playerPhysic.rotation.z > bz.SettingPlayer.MAX_ROT_Z )
                    {
                        this.playerPhysic.rotation.z = bz.SettingPlayer.MAX_ROT_Z;
                    }
                }
            }

            this.playerPhysic.rotationDelta.z = 0.0;
        }
        else
        {
            this.playerWearpon.targetShotgunRotation.x = 0.0;
        }

        // rotate body
        bz.MeshManipulation.setAbsoluteRotationXYZ
        (
            this.playerPhysic.body,
            0.0, // this.rotation.z,
            this.playerPhysic.rotation.y,
            0.0
        );

        // rotate head
        bz.MeshManipulation.setAbsoluteRotationXYZ
        (
            this.playerPhysic.head,
            this.playerPhysic.rotation.z,
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
        if ( this.playerPhysic.isFalling() )
        {
            bz.Debug.player.log( 'Player jump denied caused by falling' );
            return;
        }

        bz.Debug.player.log( 'Player jumps' );
        this.playerPhysic.moveDelta.y = bz.SettingPlayer.IMPULSE_JUMP;
    }

    /** ****************************************************************************************************************
    *   Checks if a height change is required and possibly changes it.
    *******************************************************************************************************************/
    private checkHeightChange() : void
    {
        if ( this.duck )
        {
            if ( this.playerPhysic.heightY > bz.SettingPlayer.HEIGHT_Y_DUCKING )
            {
                this.playerPhysic.heightY -= bz.SettingPlayer.SPEED_DUCK_DOWN;

                if ( this.playerPhysic.heightY < bz.SettingPlayer.HEIGHT_Y_DUCKING )
                {
                    this.playerPhysic.heightY = bz.SettingPlayer.HEIGHT_Y_DUCKING;
                }

                this.positionPlayerLimbs();
            }
        }
        else
        {
            if ( this.playerPhysic.heightY < bz.SettingPlayer.HEIGHT_Y_STANDING )
            {
                this.playerPhysic.heightY += bz.SettingPlayer.SPEED_STAND_UP;

                if ( this.playerPhysic.heightY > bz.SettingPlayer.HEIGHT_Y_STANDING )
                {
                    this.playerPhysic.heightY = bz.SettingPlayer.HEIGHT_Y_STANDING;
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

            this.playerPhysic.rotationDelta.y = bz.MathUtil.normalizeAngleDegrees(
                ( this.playerPhysic.rotationDelta.y + ( 180.0 / bz.SettingPlayer.TICKS_TURN_AROUND ) )
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
            this.playerPhysic.centerRotZ();
        }
    }

    /** ****************************************************************************************************************
    *   Checks if the player is firing.
    *******************************************************************************************************************/
    private checkFireAction() : void
    {
        // check if firing is requested
        if ( this.fire )
        {
            // mark fire request as processed
            this.fire = false;

            bz.Debug.fire.log();
            bz.Debug.fire.log( 'Player fires' );

            // add muzzle flash to the wearpon
            bz.FXFactory.addMuzzleFlash(
                this.stage,
                this.playerPhysic.head.getAbsolutePivotPoint(),
                // this.playerWearpon.shotgun.getModel().getMesh( 0 ).getAbsolutePivotPoint(),
                this.playerPhysic.rotation
            );

            // create shot and apply it onto the stage
            const shot:bz.Shot = this.createShot();
            this.stage.applyShot( shot );
        }
    }

    /** ****************************************************************************************************************
    *   Checks if the player is interacting with the scene.
    *******************************************************************************************************************/
    private checkStageInteraction() : void
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

        const source      :BABYLON.Vector3 = this.playerPhysic.head.absolutePosition;
        const rotation    :BABYLON.Vector3 = new BABYLON.Vector3
        (
            this.playerPhysic.rotation.z + divergenceZ,
            this.playerPhysic.rotation.y + divergenceY,
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
        const source      :BABYLON.Vector3 = this.playerPhysic.head.absolutePosition;
        const rotation    :BABYLON.Vector3 = new BABYLON.Vector3
        (
            this.playerPhysic.rotation.z,
            this.playerPhysic.rotation.y,
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
        const halfPlayerHeight:number = ( this.playerPhysic.heightY / 2 );

        // get current modifier Y
        const headShakingModifierY:number =
        (
            bz.MathUtil.sinDegrees( this.headShakingAngle )
            * bz.SettingPlayer.HEAD_SHAKING_RANGE_Y
        );

        // bz.Debug.player.log( ' Head Shaking modifierY is [' + headShakingModifierY + ']' );
        this.playerPhysic.head.position = new BABYLON.Vector3
        (
            0.0,
            ( halfPlayerHeight - ( bz.SettingPlayer.DIAMETER_HEAD / 2 ) ) - headShakingModifierY,
            0.0
        );

        this.playerPhysic.leftHand.position = new BABYLON.Vector3
        (
            -1.0,
            halfPlayerHeight - ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ),
            0.0
        );
        this.playerPhysic.rightHand.position = new BABYLON.Vector3
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

    /** ****************************************************************************************************************
    *   Lets the Player consume one pain killer.
    *******************************************************************************************************************/
    private consumePainkiller() : void
    {
        // check if painkillers are available
        if ( this.inventory.numberOfPainkillers <= 0 )
        {
            this.stage.addEventsToPipeline(
                [
                    new bz.Event(
                        bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                        new bz.EventDataShowGuiTextMessage( 'No painkillers available!', true )
                    ),
                ]
            );

            return;
        }

        // lower number of painkillers
        --this.inventory.numberOfPainkillers;

        let message :string = 'Consumed one Painkiller.';

        if ( this.inventory.numberOfPainkillers > 1 )
        {
            message += ' ' + String( this.inventory.numberOfPainkillers ) + ' remaining.';
        }
        else if ( this.inventory.numberOfPainkillers === 1 )
        {
            message += ' One remaining.';
        }
        else
        {
            message += ' No more left.';
        }

        // trigger stage events
        this.stage.addEventsToPipeline(
            [
                new bz.Event(
                    bz.EventType.SHOW_GUI_EFFECT,
                    new bz.EventDataShowGuiEffect( bz.GUIFxType.GAIN_ENERGY )
                ),
                new bz.Event(
                    bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                    new bz.EventDataShowGuiTextMessage( message )
                ),
            ]
        );
    }

    /** ****************************************************************************************************************
    *   Creates the player model that consists of 4 meshes.
    *
    *   @param stage The stage to add the player model in.
    *
    *   @return The player model.
    *******************************************************************************************************************/
    private static createPlayerModel( stage:bz.Stage ) : bz.Model
    {
        return new bz.Model
        (
            [

                // Player.PLAYER_BODY_ID
                stage.getMeshFactory().createCylinder
                (
                    stage.getConfig().startupPosition.clone().addInPlace(
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                    ),
                    bz.MeshAnchor.CENTER_XYZ,
                    bz.SettingPlayer.DIAMETER_BODY,
                    bz.SettingPlayer.HEIGHT_Y_STANDING,
                    BABYLON.Vector3.Zero(),
                    bz.TextureFile.WALL_GLASS_1,
                    null,
                    bz.PhysicSet.PLAYER_HUMAN,
                    0.5
                ),

                // Player.PLAYER_HEAD_ID
                stage.getMeshFactory().createSphere
                (
                    stage.getConfig().startupPosition.clone().addInPlace(
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
                    bz.TextureFile.WALL_SKIN_1,
                    null,
                    bz.PhysicSet.NONE
                ),

                // Player.PLAYER_LEFT_HAND_ID
                stage.getMeshFactory().createBox
                (
                    stage.getConfig().startupPosition.clone().addInPlace( new BABYLON.Vector3( -1.25, 1.25, 0.0 ) ),
                    bz.TextureFile.WALL_SKIN_1,
                    new BABYLON.Vector3( 0.25, 0.25, 0.25 )
                ),

                // Player.PLAYER_RIGHT_HAND_ID
                stage.getMeshFactory().createBox
                (
                    stage.getConfig().startupPosition.clone().addInPlace( new BABYLON.Vector3( 1.25, 1.25, 0.0 ) ),
                    bz.TextureFile.WALL_SKIN_1,
                    new BABYLON.Vector3( 0.25, 0.25, 0.25 )
                ),
            ]
        );
    }
}

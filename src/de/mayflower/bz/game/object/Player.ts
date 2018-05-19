
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents the character being controlled by the user.
    *******************************************************************************************************************/
    export class Player extends bz.GameObject
    {
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

        /** The head mesh. */
        private                             head                    :bz.Mesh                            = null;
        /** The body mesh. */
        private                             body                    :bz.Mesh                            = null;

        /** Flags if rotZ view centering should occur this tick. */
        private                             centerRotZ              :boolean                            = false;

        /** ************************************************************************************************************
        *   Creates a new player instance.
        *
        *   @param rotY Initial rotation Y.
        ***************************************************************************************************************/
        public constructor( rotY:number )
        {
            super();

            this.rotY = rotY;

            this.body = new bz.Mesh
            (
                bz.MeshFactory.createCylinder
                (
                    new BABYLON.Vector3( 15.0, 0.0, 15.0  ),
                    bz.PivotAnchor.CENTER_XZ_LOWEST_Y,
                    ( 2 * bz.SettingGame.PLAYER_RADIUS_XZ ),
                    bz.SettingGame.PLAYER_HEIGHT_Y,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                    bz.Texture.GLASS,
                    bz.TextureHasAlpha.NO,
                    bz.TextureUV.TILED_BY_SIZE,
                    null,
                    bz.Main.game.engine.scene.getScene(),
                    bz.Physic.PLAYER,
                    0.25, // is ignored! use lower value!
                    bz.SettingGame.LEVEL_EMISSIVE_COLOR
                ),
                0.25
            );

            this.head = new bz.Mesh
            (
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
                    bz.TextureHasAlpha.NO,
                    bz.TextureUV.TILED_BY_SIZE,
                    null,
                    bz.Main.game.engine.scene.getScene(),
                    bz.Physic.NONE,
                    1.0,
                    bz.SettingGame.LEVEL_EMISSIVE_COLOR
                ),
                1.0
            );

            // stick head to body
            this.head.getMesh().parent = this.body.getMesh();
/*
            // physical link
            this.body.getMesh().setPhysicsLinkWith
            (
                this.head.getMesh(),
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
        public getFirstPersonCameraTargetMesh() : BABYLON.Mesh
        {
            return this.head.getMesh();
        }

        /** ************************************************************************************************************
        *   Returns the player's target mesh for the third person camera.
        *
        *   @return The player's body mesh.
        *           This is the right mesh to set as a target for the third person camera.
        ***************************************************************************************************************/
        public getThirdPersonCameraTargetMesh() : BABYLON.Mesh
        {
            return this.body.getMesh();
        }

        /** ************************************************************************************************************
        *   Sets visibility for all meshes the player consists of.
        *
        *   @param visible The new visibility for the player.
        ***************************************************************************************************************/
        public setVisible( visible:boolean ) : void
        {
            this.head.setVisible( visible );
            this.body.setVisible( visible );
        }

        /** ************************************************************************************************************
        *   Moves all player's meshes by the current move deltas.
        ***************************************************************************************************************/
        private movePlayer() : void
        {
            if ( this.moveDeltaX !== 0.0 || this.moveDeltaZ !== 0.0 )
            {
                this.body.moveWithCollisions( this.moveDeltaX, 0.0, this.moveDeltaZ );

                this.moveDeltaX = 0.0;
                this.moveDeltaZ = 0.0;

                // demand rotZ centering
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
            this.body.setAbsoluteRotationXYZ( 0.0, this.rotY, 0.0 );
            this.head.setAbsoluteRotationXYZ( this.rotZ, 0.0, 0.0 );
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
            const playerVelocity:BABYLON.Vector3 = this.body.getMesh().physicsImpostor.getLinearVelocity();
            this.body.getMesh().physicsImpostor.setLinearVelocity
            (
                new BABYLON.Vector3
                (
                    0.0,

                    // allow falling but not jumping ..?
                    ( playerVelocity.y < 0.0 ? playerVelocity.y * 0.95 : 0.0 ),

                    0.0,
                )
            );

            // suppress angular velocity
            this.body.getMesh().physicsImpostor.setAngularVelocity( BABYLON.Vector3.Zero() );
        }
    }

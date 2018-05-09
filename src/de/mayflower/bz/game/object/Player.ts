
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Represents a custom level set.
    *******************************************************************************************************************/
    export class Player
    {
        /** The player's current rotation on axis Y. */
        protected                           rotY                    :number                             = 270.0;
        /** The player's current rotation on axis Z. */
        protected                           rotZ                    :number                             = 0.0;

        /** The head mesh. */
        private                             head                    :bz.Mesh                            = null;
        /** The body mesh. */
        private                             body                    :bz.Mesh                            = null;

        /** Current move delta X. */
        protected                           moveDeltaX              :number                             = 0.0;
        /** Current move delta Z. */
        protected                           moveDeltaZ              :number                             = 0.0;
        /** Current rotation delta Y. */
        protected                           rotationDeltaY          :number                             = 0.0;
        /** Current rotation delta Z. */
        protected                           rotationDeltaZ          :number                             = 0.0;

        /** Flags if rotZ view centering should occur. */
        private                             centerRotZ              :boolean                            = false;

        /***************************************************************************************************************
        *   Creates a new player instance.
        *
        *   @param rotY Initial rotation Y.
        ***************************************************************************************************************/
        public constructor( rotY:number )
        {
            this.rotY = rotY;

            this.body = new bz.Mesh
            (
                bz.MeshFactory.createCylinder
                (
                    "playerBody",
                    new BABYLON.Vector3( 15.0, 0.0, 15.0  ),
                    bz.PivotAnchor.CENTER_XZ_LOWEST_Y,
                    4.0,
                    4.0,
                    bz.MeshFactory.ROTATION_AXIS_Y,
                    0.0,
                    bz.Texture.GLASS,
                    bz.TextureHasAlpha.NO,
                    bz.TextureUV.ACCORDING_TO_SIZE,
                    null,
                    bz.Main.game.engine.scene.getScene(),
                    bz.Physics.MOVABLE,
                    bz.Physicals.PLAYER,
                    0.25
                ),
                0.25
            );

            this.head = new bz.Mesh
            (
                bz.MeshFactory.createSphere
                (
                    "playerHead",
                    new BABYLON.Vector3( 0.0, 1.5, 0.0  ),
                    bz.PivotAnchor.CENTER_XYZ,
                    1.0,
                    bz.MeshFactory.ROTATION_AXIS_Y,
                    0.0,
                    bz.Texture.GRASS,
                    bz.TextureHasAlpha.NO,
                    bz.TextureUV.ACCORDING_TO_SIZE,
                    null,
                    bz.Main.game.engine.scene.getScene(),
                    bz.Physics.SENSOR,
                    bz.Physicals.PLAYER,
                    1.0
                ),
                1.0
            );

            // stick head to body
            this.head.getMesh().parent = this.body.getMesh();


            // this.head.getMesh().parent = this.body.getMesh();

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

        /***************************************************************************************************************
        *   Handles all keys for the player.
        ***************************************************************************************************************/
        public handlePlayerKeys()
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
                bz.Main.game.engine.level.cameraSystem.setActiveSceneCamera
                (
                    bz.Main.game.engine.scene.getScene(),
                    bz.CameraType.FREE_DEBUG
                );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_2 ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_2 );
                bz.Main.game.engine.level.cameraSystem.setActiveSceneCamera
                (
                    bz.Main.game.engine.scene.getScene(),
                    bz.CameraType.STATIONARY
                );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_3 ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_3 );
                bz.Main.game.engine.level.cameraSystem.setActiveSceneCamera
                (
                    bz.Main.game.engine.scene.getScene(),
                    bz.CameraType.FOLLOW
                );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_4 ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_4 );
                bz.Main.game.engine.level.cameraSystem.setActiveSceneCamera
                (
                    bz.Main.game.engine.scene.getScene(),
                    bz.CameraType.FIRST_PERSON
                );
            }
        }

        /***************************************************************************************************************
        *   Renders the player for one tick of the game loop.
        ***************************************************************************************************************/
        public render()
        {
            this.movePlayer();
            this.rotatePlayerXYZ();
            this.checkCenteringRotZ();
/*
            // suppress linear velocity
            this.head.mesh.physicsImpostor.setLinearVelocity(  BABYLON.Vector3.Zero() );
            // suppress angular velocity
            this.head.mesh.physicsImpostor.setAngularVelocity( BABYLON.Vector3.Zero() );
*/
            // make body stiff .. ?


            // this.body.getMesh().physicsImpostor.physicsBody.sink = 0.0;


/*
            this.head.getMesh().physicsImpostor.setLinearVelocity(  BABYLON.Vector3.Zero() );
            this.head.getMesh().physicsImpostor.setAngularVelocity( BABYLON.Vector3.Zero() );
*/
/*
            this.body.getMesh().physicsImpostor.setLinearVelocity(  BABYLON.Vector3.Zero() );
            this.body.getMesh().physicsImpostor.setAngularVelocity( BABYLON.Vector3.Zero() );
*/
        }

        public getFirstPersonCameraTargetMesh() : BABYLON.Mesh
        {
            return this.head.getMesh();
        }

        public getThirdPersonCameraTargetMesh() : BABYLON.Mesh
        {
            return this.body.getMesh();
        }

        public setVisible( visible:boolean )
        {
            this.head.setVisible( visible );
            this.body.setVisible( visible );
        }

        private movePlayer()
        {
            if ( this.moveDeltaX != 0.0 || this.moveDeltaZ != 0.0 )
            {
                // assign movement to body
                this.body.moveWithCollisions( this.moveDeltaX, 0.0, this.moveDeltaZ );

                this.moveDeltaX = 0.0;
                this.moveDeltaZ = 0.0;

                // demand rotZ centering
                this.centerRotZ = true;
            }
        }

        private rotatePlayerXYZ()
        {
            if ( this.rotationDeltaY != 0.0 )
            {
                this.rotY = bz.MathUtil.normalizeAngle( this.rotY + this.rotationDeltaY );
                this.rotationDeltaY = 0.0;
            }

            if ( this.rotationDeltaZ != 0.0 )
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

                this.centerRotZ = false;
            }

            // rotate all meshes
            this.body.setAbsoluteRotationXYZ( 0.0, this.rotY, 0.0 );
            this.head.setAbsoluteRotationXYZ( this.rotZ, 0.0, 0.0 );
        }

        private checkCenteringRotZ()
        {
            if ( this.centerRotZ )
            {
                if ( this.rotZ > 0.0 )
                {
                    this.rotZ -= bz.SettingGame.PLAYER_SPEED_CENTER_LOOK_UP_DOWN;

                    if ( this.rotZ < 0.0 ) this.rotZ = 0.0;
                }
                else if ( this.rotZ < 0.0 )
                {
                    this.rotZ += bz.SettingGame.PLAYER_SPEED_CENTER_LOOK_UP_DOWN;

                    if ( this.rotZ > 0.0 ) this.rotZ = 0.0;
                }
            }
        }
    }

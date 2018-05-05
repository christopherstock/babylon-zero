
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Represents a custom level set.
    *******************************************************************************************************************/
    export class Player
    {
        /** The player's current rotation on axis Y. */
        protected                           rotY                    :number                             = 270.0;

        /** The player mesh. */
        public                              mesh                    :BABYLON.Mesh                       = null;

        /** Current move delta X. */
        protected                           moveDeltaX              :number                             = 0.0;
        /** Current move delta Z. */
        protected                           moveDeltaZ              :number                             = 0.0;
        /** Current rotation delta Y. */
        protected                           rotationDeltaY          :number                             = 0.0;

        /*******************************************************************************************************************
        *   Creates a new player instance.
        *
        *   @param rotY Initial rotation Y.
        *******************************************************************************************************************/
        public constructor( rotY:number )
        {
            this.rotY = rotY;

            this.mesh = bz.MeshFactory.createBox
            (
                "Grass",
                new BABYLON.Vector3( 15.0, 0.0, 15.0  ),
                bz.PivotAnchor.CENTER_XZ_LOWEST_Y,
                new BABYLON.Vector3( 2.0, 2.0, 2.0 ),
                bz.MeshFactory.ROTATION_AXIS_Y,
                0.0,
                bz.Texture.GRASS,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                null,
                bz.Main.game.engine.scene.getScene(),
                bz.Physics.MOVABLE,
                bz.Physicals.PLAYER
            );
        }

        /*******************************************************************************************************************
        *   Handles all keys for the player.
        *******************************************************************************************************************/
        public handlePlayerKeys()
        {
            let SPEED_MOVING:number  = 0.5;
            let SPEED_TURNING:number = 2.5;

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_W ) )
            {
                this.moveDeltaX +=  SPEED_MOVING * bz.MathUtil.sinDegrees( this.rotY );
                this.moveDeltaZ +=  SPEED_MOVING * bz.MathUtil.cosDegrees( this.rotY );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_S ) )
            {
                this.moveDeltaX -= SPEED_MOVING * bz.MathUtil.sinDegrees( this.rotY );
                this.moveDeltaZ -= SPEED_MOVING * bz.MathUtil.cosDegrees( this.rotY );
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_A ) )
            {
                this.moveDeltaX -= SPEED_MOVING * bz.MathUtil.cosDegrees( this.rotY );
                this.moveDeltaZ += SPEED_MOVING * bz.MathUtil.sinDegrees( this.rotY );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_D ) )
            {
                this.moveDeltaX += SPEED_MOVING * bz.MathUtil.cosDegrees( this.rotY );
                this.moveDeltaZ -= SPEED_MOVING * bz.MathUtil.sinDegrees( this.rotY );
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_Q ) )
            {
                this.rotationDeltaY = -SPEED_TURNING;
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_E ) )
            {
                this.rotationDeltaY = SPEED_TURNING;
            }

        }

        /*******************************************************************************************************************
        *   Renders the player for one tick of the game loop.
        *******************************************************************************************************************/
        public render()
        {
            this.movePlayer();
            this.rotatePlayer();

            // suppress linear velocity
            // this.mesh.physicsImpostor.setLinearVelocity(  BABYLON.Vector3.Zero() );

            // suppress angular velocity
            // this.mesh.physicsImpostor.setAngularVelocity( BABYLON.Vector3.Zero() );
        }

        private movePlayer()
        {
            if ( this.moveDeltaX != 0.0 || this.moveDeltaZ != 0.0 )
            {
                this.mesh.moveWithCollisions( new BABYLON.Vector3( this.moveDeltaX, 0.0, this.moveDeltaZ ) );

                this.moveDeltaX = 0.0;
                this.moveDeltaZ = 0.0;
            }
        }

        private rotatePlayer()
        {
            if ( this.rotationDeltaY != 0.0 )
            {
                // assign new rotation Y
                this.rotY = bz.MathUtil.normalizeAngle( this.rotY + this.rotationDeltaY );

                this.rotationDeltaY = 0.0;
            }

            // assign all rotations to player mesh
            bz.MeshFactory.setAbsoluteRotationXYZ( this.mesh, 0.0, this.rotY, 0.0 );
        }
    }

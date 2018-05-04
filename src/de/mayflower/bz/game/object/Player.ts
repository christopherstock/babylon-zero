
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Represents a custom level set.
    *******************************************************************************************************************/
    export class Player
    {
        /** The player mesh. */
        protected                           mesh                    :BABYLON.Mesh                       = null;

        /** The player rotation in Y axis. TODO move initial value to constructor. */
        protected                           rotY                    :number                             = 270.0;

        /*******************************************************************************************************************
        *   Creates a new player instance.
        *******************************************************************************************************************/
        public constructor()
        {
            this.mesh = bz.MeshFactory.createBox
            (
                "Grass",
                new BABYLON.Vector3( 15.0, 0.0, 15.0  ),
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

            let deltaX:number        = 0.0;
            let deltaZ:number        = 0.0;

            // TODO Move via sin/cos calculations

            // TODO refactor to methods movePlayer and rotatePlayer

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_W ) )
            {
                // TODO refactor: extract moveWithCollisions to separate method and invoke directly!
                deltaX =  SPEED_MOVING * bz.MathUtil.sinDegrees( this.rotY );
                deltaZ =  SPEED_MOVING * bz.MathUtil.cosDegrees( this.rotY );

                this.mesh.moveWithCollisions( new BABYLON.Vector3( deltaX, 0.0, deltaZ ) );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_S ) )
            {
                deltaX = -SPEED_MOVING * bz.MathUtil.sinDegrees( this.rotY );
                deltaZ = -SPEED_MOVING * bz.MathUtil.cosDegrees( this.rotY );

                this.mesh.moveWithCollisions( new BABYLON.Vector3( deltaX, 0.0, deltaZ ) );
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_A ) )
            {
                deltaX = SPEED_MOVING * bz.MathUtil.cosDegrees( this.rotY );
                deltaZ = SPEED_MOVING * bz.MathUtil.sinDegrees( this.rotY );

                this.mesh.moveWithCollisions( new BABYLON.Vector3( deltaX, 0.0, deltaZ ) );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_D ) )
            {
                deltaX = -SPEED_MOVING * bz.MathUtil.cosDegrees( this.rotY );
                deltaZ = -SPEED_MOVING * bz.MathUtil.sinDegrees( this.rotY );

                this.mesh.moveWithCollisions( new BABYLON.Vector3( deltaX, 0.0, deltaZ ) );
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_Q ) )
            {
                this.rotY = bz.MathUtil.normalizeAngle( this.rotY - SPEED_TURNING );
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_E ) )
            {
                this.rotY = bz.MathUtil.normalizeAngle( this.rotY + SPEED_TURNING );
            }
        }

        /*******************************************************************************************************************
        *   Renders the player for one tick of the game loop.
        *******************************************************************************************************************/
        public render()
        {
            // explicitly set Y rotation
            bz.MeshFactory.setRotation( this.mesh, bz.MeshFactory.ROTATION_AXIS_Y, this.rotY );
/*
            // suppress linear velocity
            this.mesh.physicsImpostor.setLinearVelocity(  BABYLON.Vector3.Zero() );
*/
/*
            // suppress angular velocity
            this.mesh.physicsImpostor.setAngularVelocity( BABYLON.Vector3.Zero() );
*/
        }
    }

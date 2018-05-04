
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Represents a custom level set.
    *******************************************************************************************************************/
    export class Player
    {
        /** The player mesh. */
        protected                           mesh                    :BABYLON.Mesh                       = null;

        /** The player rotation in Y axis. */
        protected                           rotY                    :number                             = 0.0;

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
            let SPEED_MOVING:number            = 0.5;
            let SPEED_TURNING:number           = 2.5;

            // TODO Move via sin/cos calculations

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_W ) )
            {
/*
                this.mesh.moveWithCollisions( new BABYLON.Vector3( -SPEED_MOVING, 0.0, 0.0 ) );
*/
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_S ) )
            {
/*
                this.mesh.moveWithCollisions( new BABYLON.Vector3( SPEED_MOVING, 0.0, 0.0 ) );
*/
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_A ) )
            {
/*
                this.mesh.moveWithCollisions( new BABYLON.Vector3( 0.0, 0.0, -SPEED_MOVING ) );
*/
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_D ) )
            {
/*
                this.mesh.moveWithCollisions( new BABYLON.Vector3( 0.0, 0.0, SPEED_MOVING ) );
*/
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


    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Represents a custom level set.
    *******************************************************************************************************************/
    export class Player
    {
        /** The player mesh. */
        protected                           mesh                    :BABYLON.Mesh                       = null;

        /*******************************************************************************************************************
        *   Creates a new player instance.
        *******************************************************************************************************************/
        public constructor()
        {
            this.mesh = bz.MeshFactory.createBox
            (
                "Grass",
                new BABYLON.Vector3( 15.0, 0.0, 15.0  ),
                new BABYLON.Vector3( 1.0, 1.0, 1.0 ),
                bz.MeshFactory.ROTATION_AXIS_Y,
                0.0,
                bz.Texture.GRASS,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                null,
                bz.Main.game.engine.scene.getScene(),
                bz.Physics.MOVABLE
            );
        }

        /*******************************************************************************************************************
        *   Handles all keys for the player.
        *******************************************************************************************************************/
        public handlePlayerKeys()
        {
            let SPEED:number                   = 0.5;
            let IMPULSE_BASED_MOVEMENT:boolean = false;

            // TODO Move via sin/cos calculations

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_W ) )
            {
                if ( IMPULSE_BASED_MOVEMENT )
                {
                    this.mesh.applyImpulse( new BABYLON.Vector3( -SPEED, 0.0, 0.0 ), this.mesh.position );
                }
                else
                {
                    this.mesh.moveWithCollisions( new BABYLON.Vector3( -SPEED, 0.0, 0.0 ) );
                }
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_S ) )
            {
                if ( IMPULSE_BASED_MOVEMENT )
                {
                    this.mesh.applyImpulse( new BABYLON.Vector3( SPEED, 0.0, 0.0 ), this.mesh.position );
                }
                else
                {
                    this.mesh.moveWithCollisions( new BABYLON.Vector3( SPEED, 0.0, 0.0 ) );
                }
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_A ) )
            {
                if ( IMPULSE_BASED_MOVEMENT )
                {
                    this.mesh.applyImpulse( new BABYLON.Vector3( 0.0, 0.0, -SPEED ), this.mesh.position );
                }
                else
                {
                    this.mesh.moveWithCollisions( new BABYLON.Vector3( 0.0, 0.0, -SPEED ) );
                }
            }
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_D ) )
            {
                if ( IMPULSE_BASED_MOVEMENT )
                {
                    this.mesh.applyImpulse( new BABYLON.Vector3( 0.0, 0.0, SPEED ), this.mesh.position );
                }
                else
                {
                    this.mesh.moveWithCollisions( new BABYLON.Vector3( 0.0, 0.0, SPEED ) );
                }
            }
        }

        /*******************************************************************************************************************
        *   Renders the player for one tick of the game loop.
        *******************************************************************************************************************/
        public render()
        {
            // suppress linear and angular velocity?
/*
            this.mesh.physicsImpostor.setLinearVelocity(  BABYLON.Vector3.Zero() );
            this.mesh.physicsImpostor.setAngularVelocity( BABYLON.Vector3.Zero() );
*/

            // explicitly set Y rotation
            let angle = bz.MathUtil.degreesToRad( 0.0 );
            let quaternion = BABYLON.Quaternion.RotationAxis( bz.MeshFactory.ROTATION_AXIS_Y, angle );
            this.mesh.rotationQuaternion = quaternion;



        }
    }

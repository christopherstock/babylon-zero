import * as bz from '../../..';

/** ********************************************************************************************************************
*   Handles all physical aspects of the player.
***********************************************************************************************************************/
export class PlayerPhysic
{
    /** The id of the player's body mesh inside the mesh array. */
    private static readonly PLAYER_BODY_ID               :number                             = 0;
    /** The id of the player's head mesh inside the mesh array. */
    private static readonly PLAYER_HEAD_ID               :number                             = 1;
    /** The id of the player's left hand mesh inside the mesh array. */
    private static readonly PLAYER_LEFT_HAND_ID          :number                             = 2;
    /** The id of the player's left hand mesh inside the mesh array. */
    private static readonly PLAYER_RIGHT_HAND_ID         :number                             = 3;

    /** The referenced body mesh. */
    public        readonly body                         :BABYLON.AbstractMesh               = null;
    /** The referenced head mesh. */
    public        readonly head                         :BABYLON.AbstractMesh               = null;
    /** The referenced left hand mesh. */
    public        readonly leftHand                     :BABYLON.AbstractMesh               = null;
    /** The referenced right hand mesh. */
    public        readonly rightHand                    :BABYLON.AbstractMesh               = null;
    /** The referenced 3D wearpon mesh. */
    public        readonly shotgun                      :BABYLON.AbstractMesh               = null;

    /** The current height of the player. Changes on ducking. */
    public                 heightY                      :number                             = 0.0;

    /** Current rotation. */
    public                 rotation                     :BABYLON.Vector3                    = null;
    /** Current rotation delta. */
    public                 rotationDelta                :BABYLON.Vector3                    = null;
    /** Current move delta. */
    public                 moveDelta                    :BABYLON.Vector3                    = null;

    /** ****************************************************************************************************************
    *   Create a new physical body handling for the player.
    *
    *   @param model The player model.
    *******************************************************************************************************************/
    public constructor( model:bz.Model )
    {
        // reference the body and all limbs
        this.body      = model.getMesh( PlayerPhysic.PLAYER_BODY_ID       );
        this.head      = model.getMesh( PlayerPhysic.PLAYER_HEAD_ID       );
        this.leftHand  = model.getMesh( PlayerPhysic.PLAYER_LEFT_HAND_ID  );
        this.rightHand = model.getMesh( PlayerPhysic.PLAYER_RIGHT_HAND_ID );

        // stick all limbs to body
        this.head.setParent(      this.body );
        this.leftHand.setParent(  this.body );
        this.rightHand.setParent( this.body );

        // set initial height
        this.heightY     = bz.SettingPlayer.HEIGHT_Y_STANDING;
    }

    /** ****************************************************************************************************************
    *   Determines if the player is currently falling.
    *
    *   @return <code>true</code> if the player is currently falling.
    *******************************************************************************************************************/
    public isFalling() : boolean
    {
        return (
            this.body.physicsImpostor !== undefined
            &&  this.body.physicsImpostor.getLinearVelocity().y <= bz.SettingPlayer.FALLING_VELOCITY_Y
        );
    }

    /** ****************************************************************************************************************
    *   Moves all player's meshes by the current move deltas.
    *******************************************************************************************************************/
    public movePlayer( player:bz.Player ) : void
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
            if ( bz.SettingPlayer.CENTER_ROT_Z_ON_WALKING )
            {
                if ( this.moveDelta.x !== 0.0 || this.moveDelta.z !== 0.0 )
                {
                    player.centerRotZ = true;
                }
            }

            // reset move deltas
            this.moveDelta = new BABYLON.Vector3( 0.0, 0.0, 0.0 );
        }
        else
        {
            player.centerRotZ = false;
        }
    }

    /** ****************************************************************************************************************
    *   Overrides the player's linear and angular velocities for improved player controls and user experience.
    *******************************************************************************************************************/
    public manipulateVelocities() : void
    {
        if ( this.body.physicsImpostor !== undefined )
        {
            // suppress linear velocities for X and Z axis
            const velocity:BABYLON.Vector3 = this.body.physicsImpostor.getLinearVelocity();

            // check ascending/descending
            if ( velocity.y >= 1.0 )
            {
                // player is ascending - mitigate ascending velocity!
                velocity.y = velocity.y * bz.SettingPlayer.CLIMP_VELOCITY_MITIGATION;
            }
            else if ( velocity.y <= -1.0 )
            {
                // player is falling - increase falling velocity!
                velocity.y = velocity.y * bz.SettingPlayer.FALL_VELOCITY_MITIGATION;

                // clamp falling velocity
                if ( velocity.y < bz.SettingPlayer.MAX_FALLING_VELOCITY )
                {
                    velocity.y = bz.SettingPlayer.MAX_FALLING_VELOCITY;
                }
            }

            this.body.physicsImpostor.setLinearVelocity
            (
                new BABYLON.Vector3
                (
                    // mitigate axis X movements
                    ( velocity.x * bz.SettingPlayer.MOVE_VELOCITY_MITIGATION ),

                    // check player ascending/descending
                    velocity.y,

                    // mitigate axis Z movements
                    ( velocity.z * bz.SettingPlayer.MOVE_VELOCITY_MITIGATION )
                )
            );

            // completely suppress angular velocities
            this.body.physicsImpostor.setAngularVelocity
            (
                BABYLON.Vector3.Zero()
            );
        }
    }
}

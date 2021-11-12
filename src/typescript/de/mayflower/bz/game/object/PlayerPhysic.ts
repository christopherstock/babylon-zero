import * as bz from '../..';

/** ********************************************************************************************************************
*   Handles all physical aspects of the player.
***********************************************************************************************************************/
export class PlayerPhysic
{
    /** The id of the player's body mesh in the mesh array. */
    public static readonly PLAYER_BODY_ID               :number                             = 0;
    /** The id of the player's head mesh in the mesh array. */
    public static readonly PLAYER_HEAD_ID               :number                             = 1;
    /** The id of the player's left hand mesh in the mesh array. */
    public static readonly PLAYER_LEFT_HAND_ID          :number                             = 2;
    /** The id of the player's left hand mesh in the mesh array. */
    public static readonly PLAYER_RIGHT_HAND_ID         :number                             = 3;

    /** The referenced body mesh. */
    public        readonly body                         :BABYLON.AbstractMesh               = null;
    /** The referenced head mesh. */
    public        readonly head                         :BABYLON.AbstractMesh               = null;
    /** The referenced left hand mesh. */
    public        readonly leftHand                     :BABYLON.AbstractMesh               = null;
    /** The referenced right hand mesh. */
    public        readonly rightHand                    :BABYLON.AbstractMesh               = null;

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
}

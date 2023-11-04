import * as bz from '../../..';

/** ********************************************************************************************************************
*   Handles the 3D wearpon for the player.
***********************************************************************************************************************/
export class PlayerWearpon
{
    /** Shotgun wearpon rotation destination to reach. */
    public targetShotgunRotation :BABYLON.Vector3 = null;
    /** Current Shotgun wearpon rotation. */
    public shotgunRotation       :BABYLON.Vector3 = null;

    /** If the wearpon shall currently be lowered. */
    private lowerWearpon     :boolean = false;
    /** Current animation tick for wearpon lowering/raising animation. */
    private lowerWearponAnim :number  = 0;

    /** The 3D model of the shotgun. */
    private readonly shotgun :bz.Wall = null;

    /** ****************************************************************************************************************
    *   Create a new PlayerWearpon instance for 3D wearpon handling.
    *
    *   @param stage      The stage to create the 3D wearpon into.
    *   @param playerHead The mesh of the player's head where the 3D wearpon will be attached to.
    *******************************************************************************************************************/
    public constructor( stage:bz.Stage, playerHead:BABYLON.AbstractMesh )
    {
        this.lowerWearpon = bz.SettingPlayer.START_WITH_LOWERED_WEARPON;

        this.targetShotgunRotation = new BABYLON.Vector3( 0.0, 0.0, 0.0 );
        this.shotgunRotation       = new BABYLON.Vector3( 0.0, 0.0, 0.0 );

        // add a shotgun to the right player hand
        this.shotgun = (
            new bz.Wall
            (
                stage,
                stage.getMeshFactory().createImportedModel
                (
                    bz.ModelFile.SHOTGUN_M1014,
                    new BABYLON.Vector3(
                        bz.SettingWearpon.SHOTGUN_MESH_STARTUP_POSITION.x,
                        bz.SettingWearpon.SHOTGUN_MESH_STARTUP_POSITION.y - (
                            this.lowerWearpon
                                ? bz.SettingPlayer.TICKS_LOWER_RAISE_WEARPON * bz.SettingWearpon.SHOTGUN_LOWER_SIZE_Y
                                : 0.0
                        ),
                        bz.SettingWearpon.SHOTGUN_MESH_STARTUP_POSITION.z
                    ),
                    bz.PhysicSet.NONE,
                    null
                )
            )
        );
        for ( let i:number = 0; i < this.shotgun.getModel().getMeshCount(); ++i )
        {
            const mesh :BABYLON.AbstractMesh = this.shotgun.getModel().getMesh( i );

            mesh.parent = playerHead;
        }

        // raise the wearpon if initially lowered
        if ( this.lowerWearpon )
        {
            this.toggleWearponRaise();
        }
    }

    /** ****************************************************************************************************************
    *   Disposes all meshes of the player wearpon.
    *******************************************************************************************************************/
    public dispose() : void
    {
        if ( this.shotgun !== null )
        {
            this.shotgun.dispose();
        }
    }

    /** ****************************************************************************************************************
    *   Renders one tick of the player's displayed wearpon.
    *******************************************************************************************************************/
    public updatePositionAndRotation() : void
    {
        this.updateLowerRaiseAnimation();
        this.updateShotgunRotation();
    }

    /** ****************************************************************************************************************
    *   Toggles the wearpon.
    *******************************************************************************************************************/
    public toggleWearponRaise() : void
    {
        if ( this.lowerWearponAnim === 0 )
        {
            this.lowerWearpon     = !this.lowerWearpon;
            this.lowerWearponAnim = bz.SettingPlayer.TICKS_LOWER_RAISE_WEARPON;
        }
    }

    /** ****************************************************************************************************************
    *   Rotates the wearpon according to the current wearpon target rotation.
    *******************************************************************************************************************/
    private updateShotgunRotation() : void
    {
        if ( this.targetShotgunRotation.x > this.shotgunRotation.x )
        {
            this.shotgunRotation.x += (
                this.lowerWearponAnim > 0
                    ? bz.SettingWearpon.SHOTGUN_LOWER_ROT_SPEED_X
                    : (
                        this.targetShotgunRotation.x === 0
                            ? bz.SettingWearpon.SHOTGUN_CENTER_SPEED
                            : bz.SettingWearpon.SHOTGUN_ROT_SPEED_X
                    )
            );
            if ( this.shotgunRotation.x > this.targetShotgunRotation.x )
            {
                this.shotgunRotation.x = this.targetShotgunRotation.x;
            }
        }
        else if ( this.targetShotgunRotation.x < this.shotgunRotation.x )
        {
            this.shotgunRotation.x -= (
                this.lowerWearponAnim > 0
                    ? bz.SettingWearpon.SHOTGUN_RAISE_ROT_SPEED_X
                    : (
                        this.targetShotgunRotation.x === 0
                            ? bz.SettingWearpon.SHOTGUN_CENTER_SPEED
                            : bz.SettingWearpon.SHOTGUN_ROT_SPEED_X
                    )
            );
            if ( this.shotgunRotation.x < this.targetShotgunRotation.x )
            {
                this.shotgunRotation.x = this.targetShotgunRotation.x;
            }
        }
        if ( this.targetShotgunRotation.y > this.shotgunRotation.y )
        {
            this.shotgunRotation.y += (
                this.targetShotgunRotation.y === 0 ?
                    bz.SettingWearpon.SHOTGUN_CENTER_SPEED
                    : bz.SettingWearpon.SHOTGUN_ROT_SPEED_Y
            );
            if ( this.shotgunRotation.y > this.targetShotgunRotation.y )
            {
                this.shotgunRotation.y = this.targetShotgunRotation.y;
            }
        }
        else if ( this.targetShotgunRotation.y < this.shotgunRotation.y )
        {
            this.shotgunRotation.y -= (
                this.targetShotgunRotation.y === 0 ?
                    bz.SettingWearpon.SHOTGUN_CENTER_SPEED
                    : bz.SettingWearpon.SHOTGUN_ROT_SPEED_Y
            );
            if ( this.shotgunRotation.y < this.targetShotgunRotation.y )
            {
                this.shotgunRotation.y = this.targetShotgunRotation.y;
            }
        }

        this.shotgun.getModel().setAbsoluteRotationXYZ(
            Math.fround( this.shotgunRotation.x ),
            Math.fround( this.shotgunRotation.y ),
            0.0
        );
    }

    /** ****************************************************************************************************************
    *   Renders one tick for the 'lower' and 'raise' animation of the player wearpon.
    *******************************************************************************************************************/
    private updateLowerRaiseAnimation() : void
    {
        if ( this.lowerWearponAnim > 0 )
        {
            this.shotgun.getModel().translatePosition(
                new BABYLON.Vector3(
                    0.0,
                    (
                        this.lowerWearpon
                        ? -bz.SettingWearpon.SHOTGUN_LOWER_SIZE_Y
                        : bz.SettingWearpon.SHOTGUN_LOWER_SIZE_Y
                    ),
                    0.0
                )
            );

            this.targetShotgunRotation.x = bz.SettingWearpon.SHOTGUN_TARGET_ROT_X_ON_LOWERING;

            // upright from this magic tick on ..
            if ( !this.lowerWearpon && this.lowerWearponAnim < bz.SettingWearpon.SHOTGUN_MAGIC_RAISING_UPRIGHT_TICK )
            {
                this.targetShotgunRotation.x = 0.0;
            }

            --this.lowerWearponAnim;

            if ( this.lowerWearponAnim === 0 )
            {
                this.shotgunRotation.x = 0.0;
                this.targetShotgunRotation.x = 0.0;
            }
        }
    }
}

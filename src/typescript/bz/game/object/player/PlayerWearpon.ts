import * as bz from '../../..';

/** ********************************************************************************************************************
*   Handles the 3D wearpon for the player.
***********************************************************************************************************************/
export class PlayerWearpon
{
    public static readonly SHOTGUN_NOISE_X           :number = 0.05;
    public static readonly SHOTGUN_NOISE_Y           :number = 0.05;
    public static readonly SHOTGUN_MAX_ROT_X         :number = 12.5;
    public static readonly SHOTGUN_MAX_ROT_Y         :number = 10.0;
    public static readonly SHOTGUN_ROT_SPEED_X       :number = 0.20;
    public static readonly SHOTGUN_ROT_SPEED_Y       :number = 0.20;
    public static readonly SHOTGUN_CENTER_SPEED      :number = 1.00;
    public static readonly SHOTGUN_LOWER_SIZE_Y      :number = 0.07;
    public static readonly SHOTGUN_LOWER_ROT_SPEED_X :number = 3.0;
    public static readonly SHOTGUN_RAISE_ROT_SPEED_X :number = 1.5;

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
                        1.2,
                        -0.75 - (
                            this.lowerWearpon
                                ? bz.SettingPlayer.TICKS_LOWER_RAISE_WEARPON * PlayerWearpon.SHOTGUN_LOWER_SIZE_Y
                                : 0.0
                        ),
                        1.5
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

            // mesh.showBoundingBox = true;
            // mesh.getBoundingInfo().boundingBox.scale( 10.0 );
            // mesh.getBoundingInfo().boundingBox.scale( 10.0 );
            // mesh.getBoundingInfo().boundingSphere.scale( 10.0 );
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
                    ? PlayerWearpon.SHOTGUN_LOWER_ROT_SPEED_X
                    : (
                        this.targetShotgunRotation.x === 0
                            ? PlayerWearpon.SHOTGUN_CENTER_SPEED
                            : PlayerWearpon.SHOTGUN_ROT_SPEED_X
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
                    ? PlayerWearpon.SHOTGUN_RAISE_ROT_SPEED_X
                    : (
                        this.targetShotgunRotation.x === 0
                            ? PlayerWearpon.SHOTGUN_CENTER_SPEED
                            : PlayerWearpon.SHOTGUN_ROT_SPEED_X
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
                    PlayerWearpon.SHOTGUN_CENTER_SPEED
                    : PlayerWearpon.SHOTGUN_ROT_SPEED_Y
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
                    PlayerWearpon.SHOTGUN_CENTER_SPEED
                    : PlayerWearpon.SHOTGUN_ROT_SPEED_Y
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
                    ( this.lowerWearpon ? -PlayerWearpon.SHOTGUN_LOWER_SIZE_Y : PlayerWearpon.SHOTGUN_LOWER_SIZE_Y ),
                    0.0
                )
            );

            this.targetShotgunRotation.x = ( this.lowerWearpon ? 45.0 : 45.0 );

            // upright from this magic tick on ..
            if ( !this.lowerWearpon && this.lowerWearponAnim < 17 )
            {
                this.targetShotgunRotation.x = 0;
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

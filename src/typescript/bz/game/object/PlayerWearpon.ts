import * as bz from '../..';

/** ********************************************************************************************************************
*   Handles the 3D wearpon for the player.
***********************************************************************************************************************/
export class PlayerWearpon
{
    public static readonly SHOTGUN_NOISE_X      :number  = 0.05;
    public static readonly SHOTGUN_NOISE_Y      :number  = 0.05;
    public static readonly MAX_SHOTGUN_ROT_X    :number  = 12.5;
    public static readonly MAX_SHOTGUN_ROT_Y    :number  = 10.0;
    public static readonly SHOTGUN_ROT_SPEED_X  :number  = 0.20;
    public static readonly SHOTGUN_ROT_SPEED_Y  :number  = 0.20;
    public static readonly SHOTGUN_CENTER_SPEED :number  = 1.00;

    public                 targetShotgunRotX    :number  = 0;
    public                 targetShotgunRotY    :number  = 0;

    private       readonly shotgun              :bz.Wall = null;
    private                shotgunRotX          :number  = 0;
    private                shotgunRotY          :number  = 0;

    /** ****************************************************************************************************************
    *   Create a new PlayerWearpon instance for 3D wearpon handling.
    *
    *   @param stage      The stage to create the 3D wearpon into.
    *   @param playerHead The mesh of the player's head where the 3D wearpon will be attached to.
    *******************************************************************************************************************/
    public constructor( stage:bz.Stage, playerHead:BABYLON.AbstractMesh )
    {
        // add a shotgun to the right player hand
        this.shotgun = (
            new bz.Wall
            (
                stage,
                new bz.MeshFactory(
                    stage.getScene(),
                    stage.getConfig().ambientColor ).createImportedModel
                (
                    bz.ModelFile.SHOTGUN_M1014,
                    new BABYLON.Vector3( 1.2, -0.75, 1.5 ),
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
    *   Rotates the wearpon according to the current wearpon target rotation.
    *******************************************************************************************************************/
    public updateShotgunRotation() : void
    {
        if ( this.targetShotgunRotX > this.shotgunRotX )
        {
            this.shotgunRotX += (
                this.targetShotgunRotX === 0 ? PlayerWearpon.SHOTGUN_CENTER_SPEED : PlayerWearpon.SHOTGUN_ROT_SPEED_X
            );
            if ( this.shotgunRotX > this.targetShotgunRotX )
            {
                this.shotgunRotX = this.targetShotgunRotX;
            }
        }
        else if ( this.targetShotgunRotX < this.shotgunRotX )
        {
            this.shotgunRotX -= (
                this.targetShotgunRotX === 0 ? PlayerWearpon.SHOTGUN_CENTER_SPEED : PlayerWearpon.SHOTGUN_ROT_SPEED_X
            );
            if ( this.shotgunRotX < this.targetShotgunRotX )
            {
                this.shotgunRotX = this.targetShotgunRotX;
            }
        }
        if ( this.targetShotgunRotY > this.shotgunRotY )
        {
            this.shotgunRotY += (
                this.targetShotgunRotY === 0 ? PlayerWearpon.SHOTGUN_CENTER_SPEED : PlayerWearpon.SHOTGUN_ROT_SPEED_Y
            );
            if ( this.shotgunRotY > this.targetShotgunRotY )
            {
                this.shotgunRotY = this.targetShotgunRotY;
            }
        }
        else if ( this.targetShotgunRotY < this.shotgunRotY )
        {
            this.shotgunRotY -= (
                this.targetShotgunRotY === 0 ? PlayerWearpon.SHOTGUN_CENTER_SPEED : PlayerWearpon.SHOTGUN_ROT_SPEED_Y
            );
            if ( this.shotgunRotY < this.targetShotgunRotY )
            {
                this.shotgunRotY = this.targetShotgunRotY;
            }
        }

        this.shotgun.getModel().setAbsoluteRotationXYZ(
            Math.fround( this.shotgunRotX ),
            Math.fround( this.shotgunRotY ),
            0.0
        );
    }
}
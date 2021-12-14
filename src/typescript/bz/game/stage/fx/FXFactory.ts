import * as bz from '../../..';

/** ********************************************************************************************************************
*   Offers unified FX creations.
***********************************************************************************************************************/
export class FXFactory
{
    public static addMuzzleFlash(
        playerPosition,
        playerRotation,
        stage
    )
    : void
    {
        // let flashPosition :BABYLON.Vector3 = this.playerWearpon.shotgun.getModel().getMesh( 0 ).absolutePosition;

        // distance 5.0 on X and Z axis
        let flashOffset :BABYLON.Vector3 = new BABYLON.Vector3(
            0.0,
            2.5,
            3.5
        );

        // rotate point around axis X TODO to lib method (bz.MathUtil) OR to method 'rotate around player ?'
        const rotationMatrix :BABYLON.Matrix  = BABYLON.Matrix.RotationYawPitchRoll
        (
            bz.MathUtil.degreesToRad( playerRotation.y ),
            bz.MathUtil.degreesToRad( playerRotation.z ),
            bz.MathUtil.degreesToRad( 0.0 )
        );

        const rotatedDistantVector:BABYLON.Vector3 = BABYLON.Vector3.TransformCoordinates
        (
            flashOffset,
            rotationMatrix
        );
        const muzzlePosition :BABYLON.Vector3 = playerPosition.add( rotatedDistantVector );
/*
        const rotatedPosition :BABYLON.Vector3 = bz.MathUtil.rotateVector3(
            flashPosition,
            this.playerPhysic.rotation,
            5.0
        );
        // const flashPosition :BABYLON.Vector3 = rotatedOffset.add( this.getPosition() );
*/
        const muzzleFlash:bz.Sprite = new bz.Sprite
        (
            stage.getScene(),
            bz.SpriteFile.MUZZLE_FLASH_1,
            muzzlePosition,
            2.5,
            2.5,
            bz.SpriteCollidable.NO
        );
        muzzleFlash.animate( 0, 0, false, true );
        stage.addSprite( muzzleFlash );
    }
}

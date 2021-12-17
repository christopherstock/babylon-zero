import * as bz from '../../..';

/** ********************************************************************************************************************
*   Offers unified FX creations.
***********************************************************************************************************************/
export class FXFactory
{
    /** ****************************************************************************************************************
    *   Adds an one-time 'explosion' sprite to the stage.
    *
    *   @param stage         The stage to add the sprite to.
    *   @param position      Where the explosion animation shall take place.
    *   @param size          Size of the explosion sprite.
    *   @param delayModifier Modifier to add/sibstract from default animation delay value.
    *******************************************************************************************************************/
    public static addExplosion(
        stage         :bz.Stage,
        position      :BABYLON.Vector3,
        size          :number,
        delayModifier :number = 0
    )
    : void
    {
        const animatedExplosionSprite:bz.Sprite = new bz.Sprite
        (
            stage.getScene(),
            bz.SpriteFile.EXPLOSION,
            position,
            size,
            size,
            bz.SpriteCollidable.NO
        );
        animatedExplosionSprite.animate(
            bz.SpriteFile.EXPLOSION.animFrameFirst,
            bz.SpriteFile.EXPLOSION.animFrameLast,
            false,
            true,
            delayModifier
        );
        stage.addSprite( animatedExplosionSprite );
    }

    /** ****************************************************************************************************************
    *   Adds an one-time 'muzzle flash' sprite to the stage.
    *
    *   @param playerPosition The current position of the player.
    *   @param playerRotation The current rotation of the player.
    *   @param stage          The stage to add the muzzle flash to.
    *******************************************************************************************************************/
    public static addMuzzleFlash(
        playerPosition :BABYLON.Vector3,
        playerRotation :BABYLON.Vector3,
        stage          :bz.Stage
    )
    : void
    {
        // let flashPosition :BABYLON.Vector3 = this.playerWearpon.shotgun.getModel().getMesh( 0 ).absolutePosition;

        // distance 5.0 on X and Z axis
        const flashOffset :BABYLON.Vector3 = new BABYLON.Vector3(
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
        const rotatedDistantVector:BABYLON.Vector3 = BABYLON.Vector3.TransformCoordinates(
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
        muzzleFlash.animate(
            bz.SpriteFile.MUZZLE_FLASH_1.animFrameFirst,
            bz.SpriteFile.MUZZLE_FLASH_1.animFrameLast,
            false,
            true
        );
        stage.addSprite( muzzleFlash );
    }
}

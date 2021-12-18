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
        animatedExplosionSprite.animate( delayModifier );

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
        const muzzleFlashRotation :number = 60.0;
        const muzzleFlashWidth    :number = 1.75;
        const muzzleFlashHeight   :number = 1.75;
        // distance from player position to muzzle flash
        const muzzleFlashOffset   :BABYLON.Vector3 = new BABYLON.Vector3(
            0.2, // 0.65,
            0.2, // 1.25,
            0.2 // 3.35
        );

        const muzzlePosition :BABYLON.Vector3 = bz.MathUtil.rotateVector3(
            playerPosition,
            muzzleFlashOffset,
            new BABYLON.Vector3( playerRotation.z, playerRotation.y, 0.0 )
        );

        const muzzleFlash:bz.Sprite = new bz.Sprite
        (
            stage.getScene(),
            bz.SpriteFile.MUZZLE_FLASH_1,
            muzzlePosition,
            muzzleFlashWidth,
            muzzleFlashHeight,
            bz.SpriteCollidable.NO,
            1.0,
            bz.MeshAnchor.CENTER_XZ_LOWEST_Y,
            muzzleFlashRotation
        );
        muzzleFlash.animate();
        stage.addSprite( muzzleFlash );
    }
}

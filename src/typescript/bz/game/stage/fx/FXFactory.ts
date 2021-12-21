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
    *   @param stage    The stage to add the muzzle flash to.
    *   @param pivot    The absolute pivot point of the player head - acts as pivot.
    *   @param rotation The current rotation of the player.
    *******************************************************************************************************************/
    public static addMuzzleFlash(
        stage    :bz.Stage,
        pivot    :BABYLON.Vector3,
        rotation :BABYLON.Vector3
    )
    : void
    {
        const muzzleFlashRotation :number          = bz.SettingWearpon.SHOTGUN_MUZZLE_FLASH_ROTATION;
        const muzzleFlashWidth    :number          = bz.SettingWearpon.SHOTGUN_MUZZLE_FLASH_WIDTH;
        const muzzleFlashHeight   :number          = bz.SettingWearpon.SHOTGUN_MUZZLE_FLASH_HEIGHT;
        const muzzleFlashOffset   :BABYLON.Vector3 = bz.SettingWearpon.SHOTGUN_MUZZLE_FLASH_OFFSET;

        const muzzlePosition      :BABYLON.Vector3 = bz.MathUtil.rotateVector3(
            pivot,
            muzzleFlashOffset,
            new BABYLON.Vector3( rotation.z, rotation.y, 0.0 )
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
            bz.MeshAnchor.CENTER_XYZ,
            muzzleFlashRotation
        );
        muzzleFlash.animate();
        stage.addSprite( muzzleFlash );
    }

    /** ****************************************************************************************************************
    *   Adds an one-time 'wall rubble' particle effect to the stage.
    *
    *   @param stage     The stage to add the wall rubble to.
    *   @param point     The source point of the wall rubble animation to occur.
    *   @param direction The direction of the wall rubble to emmit.
    *   @param tex       The texture to use for one wall rubble particle.
    *******************************************************************************************************************/
    public static addWallRubble(
        stage     :bz.Stage,
        point     :BABYLON.Vector3,
        direction :BABYLON.Vector3,
        tex       :bz.TextureFile
    )
    : void
    {
        // see https://doc.babylonjs.com/divingDeeper/particles/particle_system/tuning_gradients
        const RUBBLE_COUNT:number = bz.MathUtil.getRandomInt( 3, 6 );

        const particleSystem :BABYLON.ParticleSystem = new BABYLON.ParticleSystem(
            'wall_rubble',
            100,
            stage.getScene().getNativeSceneBG()
        );

        particleSystem.particleTexture = tex.createNewTextureInstance( 10.0, 10.0 );

//        particleSystem.particleTexture.hasAlpha = true;
/*
        particleSystem.particleTexture.wrapU  = BABYLON.Texture.WRAP_ADDRESSMODE;
        particleSystem.particleTexture.wrapV  = BABYLON.Texture.WRAP_ADDRESSMODE;
        particleSystem.particleTexture.uScale = 0.01;
        particleSystem.particleTexture.vScale = 0.01;
*/
        // 0.01 * bz.MathUtil.getRandomInt( 1, 5 )

        // particleSystem.color1 = new BABYLON.Color4( 1.0, 1.0, 1.0, 1.0 );
        // particleSystem.color2 = new BABYLON.Color4( 1.0, 1.0, 1.0, 1.0 );
        // particleSystem.colorDead = new BABYLON.Color4( 0.0, 0.0, 0.0, 1.0 );

        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

        particleSystem.emitter = point;


        particleSystem.emitRate = RUBBLE_COUNT;
        particleSystem.updateSpeed = bz.SettingEngine.WALL_RUBBLE_UPDATE_SPEED;
        particleSystem.targetStopDuration = 1.0;

        particleSystem.minEmitPower = 0.25;
        particleSystem.maxEmitPower = 2.25;

        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = bz.MathUtil.degreesToRad( 360.0 );

        particleSystem.minLifeTime = 5.0;
        particleSystem.maxLifeTime = 12.5;

        particleSystem.minInitialRotation = 0;
        particleSystem.maxInitialRotation = bz.MathUtil.degreesToRad( 360.0 );

        // particleSystem.addVelocityGradient( 0.25, 0.1 ); // quarter

        // particleSystem.addVelocityGradient(0, 10.0);
        // particleSystem.addVelocityGradient(0.25, 0.01);
        // particleSystem.addVelocityGradient(1.0, 0.01);

        particleSystem.addAngularSpeedGradient( 0, 0.1 * bz.MathUtil.getRandomInt( -50, 50 ) );

        particleSystem.addColorGradient( 0.0, new BABYLON.Color4( 1.0, 1.0, 1.0, 1.0 ) );
        particleSystem.addColorGradient( 0.75, new BABYLON.Color4( 0.0, 0.0, 0.0, 1.0 ) );

        // particleSystem.addDragGradient( 0, 0.1 );
        // particleSystem.addAlphaRemapGradient(1.0, 0.5, 1.0);

        particleSystem.startDelay    = 0.0;
        particleSystem.disposeOnStop = true;

        particleSystem.minSize = 0.05;
        particleSystem.maxSize = 0.25;

        // direction
        particleSystem.gravity = stage.getScene().getNativeSceneBG().gravity.clone().scale( 0.30 );

        // scale possible direction range from 0.1 to 1.0
        particleSystem.direction1 = direction.clone().scale( 0.1 );
        particleSystem.direction2 = direction.clone().scale( 1.0 );

        // emit box size
        // particleSystem.minEmitBox = new BABYLON.Vector3( -0.1, -0.1, -0.1 ); // Bottom Left Front
        // particleSystem.maxEmitBox = new BABYLON.Vector3( 0.1, 0.1, 0.1 ); // Top Right Back
        particleSystem.minEmitBox = BABYLON.Vector3.Zero();
        particleSystem.maxEmitBox = BABYLON.Vector3.Zero();

        particleSystem.start();

        stage.addParticleEffect( particleSystem );
    }

    /** ****************************************************************************************************************
    *   Adds a rain effect to the stage.
    *
    *   @param stage    Stage to add the rain effect to.
    *   @param size     Size of the rain particles.
    *   @param quantity Number of raindrops to generate.
    *   @param gravity  Gravity for the raindrops to apply.
    *******************************************************************************************************************/
    public static addRainEffect(
        stage    :bz.Stage,
        size     :number = 0.3,
        quantity :number = 600,
        gravity  :BABYLON.Vector3 = new BABYLON.Vector3( 0.0, 0.0, 0.0 )
    )
    : void
    {
        BABYLON.ParticleHelper.CreateAsync(
            'rain',
            stage.getScene().getNativeSceneBG(),
            false
        ).then(
            ( particleSystem:BABYLON.ParticleSystemSet ) =>
            {
                for ( const system of particleSystem.systems )
                {
                    system.name = 'rain_effect';

                    system.maxScaleX = size;
                    system.maxScaleY = size;
                    system.emitRate  = quantity;
                    system.gravity   = gravity;
                }
                particleSystem.start();

                stage.addParticleEffect( particleSystem );
            }
        ).catch(
            () =>
            {
                // no need to handle this error
            }
        )
    }

    /** ****************************************************************************************************************
    *   Adds a permanent fire effect to the stage.
    *
    *   @param stage Stage to add the fire effect to.
    *******************************************************************************************************************/
    public static addFirePermanent( stage :bz.Stage ) : void
    {
        // create and animate a sprite
        const animatedFireSprite:bz.Sprite = new bz.Sprite
        (
            stage.getScene(),
            bz.SpriteFile.FIRE,
            new BABYLON.Vector3( 20.0, 0.0, 20.0 ),
            10.0,
            20.0,
            bz.SpriteCollidable.NO
        );
        animatedFireSprite.animate( 0, true, false );

        stage.addSprite( animatedFireSprite );
    }
}

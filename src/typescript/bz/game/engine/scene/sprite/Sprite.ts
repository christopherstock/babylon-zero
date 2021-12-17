import * as bz from '../../../..';

/** ********************************************************************************************************************
*   A wrapper class for babylon.JSs Sprite that offers additional functionality.
***********************************************************************************************************************/
export class Sprite
{
    /** The wrapped native babylon.JS sprite instance. */
    public readonly  sprite                         :BABYLON.Sprite         = null;
    /** The possible collider - A cylinder body for this sprite. */
    private readonly collider                       :BABYLON.AbstractMesh   = null;

    /** Saves if this sprite is animated. */
    private          isAnimated                     :boolean                = false;
    /** Saves current animation's start frame. */
    private          animationFrameFrom             :number                 = 0;
    /** Saves current animation's end frame. */
    private          animationFrameTo               :number                 = 0;
    /** Saves current animation's looping property. */
    private          animationFrameLooped           :boolean                = false;
    private          animationDisposeOnAnimationEnd :boolean                = false;
    private readonly animationDelay                 :number                 = 0;

    /** Saves the last visible sprite animation frame index. */
    private          lastSpriteAnimationIndex       :number                 = -1;

    /** Saves if this sprite is disposed. */
    private          isDisposed                     :boolean                = false;

    /** ****************************************************************************************************************
    *   Creates a new wrapped sprite object from the specified sprite file.
    *
    *   @param scene               The scene to create this sprite.
    *   @param spriteFile          The sprite file to create an instance from.
    *   @param position            The vector to place the sprite.
    *   @param width               The width of the sprite.
    *   @param height              The height of the sprite.
    *   @param collidable          Specifies if this sprite should be collidable for other game objects.
    *   @param collisionWidthRatio Ratio for collision cylinder width if collidable.
    *   @param anchor              The anchor for displaying this sprite.
    *   @param rotationDegree      The front face rotation of the sprite in degrees.
    *
    *   @return The created sprite instance.
    *******************************************************************************************************************/
    public constructor
    (
        scene               :bz.Scene,
        spriteFile          :bz.SpriteFile,
        position            :BABYLON.Vector3,
        width               :number,
        height              :number,
        collidable          :bz.SpriteCollidable = bz.SpriteCollidable.NO,
        collisionWidthRatio :number              = 1.0,
        anchor              :bz.MeshAnchor       = bz.MeshAnchor.CENTER_XZ_LOWEST_Y,
        rotationDegree      :number              = 0.0
    )
    {
        // create native sprite
        this.sprite = new BABYLON.Sprite
        (
            scene.getSpriteSystem().createNextSpriteId(),
            scene.getSpriteSystem().getSpriteManager( spriteFile.fileName )
        );
        this.sprite.position = position.clone();
        this.sprite.width    = width;
        this.sprite.height   = height;

        this.animationDelay  = spriteFile.animationDelay;

        this.sprite.angle    = bz.MathUtil.degreesToRad( rotationDegree );

        // create collider if desired
        if ( collidable === bz.SpriteCollidable.YES )
        {
            const collisionWidth:number = ( width * collisionWidthRatio );
            // const colliderPos :BABYLON.Vector3 = position.clone();
            // colliderPos.y += ( height / 2 )
            this.collider = new bz.MeshFactory( scene, bz.SettingColor.COLOR_RGB_WHITE ).createCylinder
            (
                position,
                anchor,
                collisionWidth,
                height,
                BABYLON.Vector3.Zero(),
                bz.TextureFile.WALL_GLASS_1,
                null,
                bz.PhysicSet.STATIC,
                ( !bz.SettingDebug.SHOW_SPRITE_COLLISION_CYLINDER ? 0.0 : 0.25 )
            );
        }

        this.translateByAnchor( anchor );
    }

    /** ****************************************************************************************************************
    *   Animates the frames in the wrapped sprite.
    *
    *   TODO rempove params! handle values internal! refactor STARTING and resuming of animations!
    *
    *   @param from                  Start frame id.
    *   @param to                    End frame id.
    *   @param loop                  If the animation shall be looped.
    *   @param disposeOnAnimationEnd If the native sprite shall be disposed then the animation ends.
    *   @param delayModifier         Modifier to add/sibstract from default animation delay value.
    *******************************************************************************************************************/
    public animate(
        from                  :number,
        to                    :number,
        loop                  :boolean,
        disposeOnAnimationEnd :boolean = false,
        delayModifier         :number  = 0
    )
    : void
    {
        this.isAnimated                     = true;

        this.animationFrameFrom             = from;
        this.animationFrameTo               = to;
        this.animationFrameLooped           = loop;
        this.animationDisposeOnAnimationEnd = disposeOnAnimationEnd;

        this.sprite.playAnimation
        (
            from,
            to,
            loop,
            this.animationDelay + delayModifier,
            () =>
            {
                this.isAnimated = false;

                if ( disposeOnAnimationEnd )
                {
                    this.isDisposed = true;

                    this.sprite.dispose();
                }
            }
        )
    }

    /** ****************************************************************************************************************
    *   Alters the pause state for this sprite.
    *
    *   @param pause The pause state to set for this sprite.
    *******************************************************************************************************************/
    public setPause( pause:boolean ) : void
    {
        // only if this sprite is animated
        if ( this.isAnimated )
        {
            if ( pause )
            {
                // save last animation index
                this.lastSpriteAnimationIndex = this.sprite.cellIndex;

                // stop animating
                this.sprite.stopAnimation();
            }
            else
            {
                // resume animation
                this.animate
                (
                    this.animationFrameFrom,
                    this.animationFrameTo,
                    this.animationFrameLooped,
                    this.animationDisposeOnAnimationEnd
                );

                // assign last sprite animation index
                this.sprite.cellIndex = this.lastSpriteAnimationIndex;
            }
        }
    }

    /** ****************************************************************************************************************
    *   Disposes the wrapped babylon.JS sprite object.
    *******************************************************************************************************************/
    public dispose() : void
    {
        this.sprite.dispose();

        if ( this.collider !== null )
        {
            this.collider.dispose();
        }
    }

    /** ****************************************************************************************************************
    *   Translates a sprite according to the specified anchor.
    *
    *   @param anchor The anchor that specifies the translation.
    *******************************************************************************************************************/
    private translateByAnchor( anchor:bz.MeshAnchor ) : void
    {
        switch ( anchor )
        {
            case bz.MeshAnchor.CENTER_XYZ:
            {
                // this is the default bahaviour
                break;
            }

            case bz.MeshAnchor.CENTER_XZ_LOWEST_Y:
            {
                this.sprite.position.y += ( this.sprite.height / 2 );
                break;
            }

            case bz.MeshAnchor.LOWEST_XYZ:
            {
                this.sprite.position.x += ( this.sprite.width  / 2 );
                this.sprite.position.z += ( this.sprite.width  / 2 );
                this.sprite.position.y += ( this.sprite.height / 2 );
                break;
            }
        }
    }

    /** ****************************************************************************************************************
    *   Prunes all disposed sprites from the specified array of sprites.
    *
    *   @param sprites The array to prune disposed sprite elements from.
    *******************************************************************************************************************/
    public static pruneDisposedSprites( sprites:bz.Sprite[] ) : void
    {
        for ( let i:number = ( sprites.length - 1 ); i >= 0; --i )
        {
            if ( sprites[ i ].isDisposed )
            {
                sprites.splice( i, 1 );
            }
        }
    }
}


    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   A wrapper class for babylon.JSs Sprite that offers additional functionality.
    *******************************************************************************************************************/
    export class Sprite
    {
        /** The wrapped native babylon.JS sprite instance. */
        private             readonly            sprite                          :BABYLON.Sprite             = null;

        /** The possible collider - A cylinder body for this sprite. */
        private             readonly            collider                        :BABYLON.AbstractMesh       = null;

        /** Saves if this sprite is animated. */
        private                                 isAnimated                      :boolean                    = false;
        /** Saves current animation's start frame. */
        private                                 animationFrameFrom              :number                     = 0;
        /** Saves current animation's end frame. */
        private                                 animationFrameTo                :number                     = 0;
        /** Saves current animation's looping property. */
        private                                 animationFrameLooped            :boolean                    = false;

        /** Saves the last visible sprite animation frame index. */
        private                                 lastSpriteAnimationIndex        :number                     = -1;

        /** ************************************************************************************************************
        *   Creates a new wrapped sprite object from the specified sprite file.
        *
        *   @param spriteFile The sprite file to create an instance from.
        *   @param position   The vector to place the sprite.
        *   @param width      The width of the sprite.
        *   @param height     The height of the sprite.
        *   @param anchor     The anchor for displaying this sprite.
        *   @param collidable Specifies if this sprite should be collidable for the player and other game objects.
        *
        *   @return The created sprite instance.
        ***************************************************************************************************************/
        public constructor
        (
            spriteFile :bz.SpriteFile,
            position   :BABYLON.Vector3,
            width      :number,
            height     :number,
            anchor     :bz.MeshPivotAnchor,
            collidable :bz.SpriteCollidable
        )
        {
            // create native sprite
            this.sprite = new BABYLON.Sprite
            (
                bz.Main.game.engine.spriteSystem.createNextSpriteId(),
                bz.Main.game.engine.spriteSystem.getSpriteManager( spriteFile.fileName )
            );
            this.sprite.position = position.clone();
            this.sprite.width    = width;
            this.sprite.height   = height;

            // create collider if desired
            if ( collidable === bz.SpriteCollidable.YES )
            {
                const collisionWidth:number = ( width / 2 );
                this.collider = bz.MeshFactory.createCylinder
                (
                    bz.Main.game.engine.scene.getScene(),
                    position.clone(),
                    anchor,
                    collisionWidth,
                    height,
                    BABYLON.Vector3.Zero(),
                    bz.Texture.WALL_GLASS,
                    null,
                    bz.Physic.STATIC,
                    0.25,
                    bz.SettingColor.COLOR_RGB_WHITE
                );
            }

            this.translateByAnchor( anchor );
        }

        /** ************************************************************************************************************
        *   Animates the frames in the wrapped sprite.
        *
        *   @param from Start frame id.
        *   @param to   End frame id.
        *   @param loop If the animation shall be looped
        ***************************************************************************************************************/
        public animate( from:number, to:number, loop:boolean ) : void
        {
            this.isAnimated           = true;

            this.animationFrameFrom   = from;
            this.animationFrameTo     = to;
            this.animationFrameLooped = loop;

            this.sprite.playAnimation
            (
                from,
                to,
                loop,
                bz.SettingEngine.SPRITE_FRAME_DELAY,
                () => {
                    this.isAnimated = false;
                }
            )
        }

        /** ************************************************************************************************************
        *   Alters the pause state for this sprite.
        *
        *   @param pause The pause state to set for this sprite.
        ***************************************************************************************************************/
        public setPause( pause:boolean ) : void
        {
            // only affects if animated
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
                        this.animationFrameLooped
                    );

                    // assign last sprite animation index
                    this.sprite.cellIndex = this.lastSpriteAnimationIndex;
                }
            }
        }

        /** ************************************************************************************************************
        *   Disposes the wrapped babylon.JS sprite object.
        ***************************************************************************************************************/
        public dispose() : void
        {
            this.sprite.dispose();

            if ( this.collider != null )
            {
                this.collider.dispose();
            }
        }

        /** ************************************************************************************************************
        *   Translates a sprite according to the specified anchor.
        *
        *   @param anchor The anchor that specifies the translation.
        ***************************************************************************************************************/
        private translateByAnchor( anchor:bz.MeshPivotAnchor ) : void
        {
            switch ( anchor )
            {
                case bz.MeshPivotAnchor.NONE:
                case bz.MeshPivotAnchor.CENTER_XYZ:
                {
                    // this is the default bahaviour
                    break;
                }

                case bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y:
                {
                    this.sprite.position.y += ( this.sprite.height / 2 );
                    break;
                }

                case bz.MeshPivotAnchor.LOWEST_XYZ:
                {
                    this.sprite.position.x += ( this.sprite.width  / 2 );
                    this.sprite.position.z += ( this.sprite.width  / 2 );
                    this.sprite.position.y += ( this.sprite.height / 2 );
                    break;
                }
            }
        }
    }

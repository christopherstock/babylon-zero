
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Specifies the sprite system.
    *******************************************************************************************************************/
    export class SpriteSystem
    {
        /** Next ID to assign for sprite creation. */
        private         static          nextSpriteId                    :number                     = 0;

        /** Holds all sprite managers - one for each sprite file. */
        private                         spriteManagers                  :BABYLON.SpriteManager[]    = [];

        /** ************************************************************************************************************
        *   Creates a sprite manager for each sprite file.
        ***************************************************************************************************************/
        public init() : void
        {
            for ( let i:number = 0; i < bz.SpriteFile.ALL_FILES.length; ++i )
            {
                const spriteFile:bz.SpriteFile = bz.SpriteFile.ALL_FILES[ i ];

                this.spriteManagers[ spriteFile.fileName ] = new BABYLON.SpriteManager
                (
                    'spriteManager' + i,
                    bz.SettingEngine.PATH_IMAGE_SPRITE + spriteFile.fileName,
                    bz.SettingEngine.MAX_SPRITE_INSTANCES,
                    spriteFile.frameSize,
                    bz.Main.game.engine.scene.getScene()
                );
            }
        }

        /** ************************************************************************************************************
        *   Creates an assembled sprite instance from the given sprite file.
        *
        *   @param spriteFile The sprite file to create an instance from.
        *   @param position   The vector to place the sprite.
        *   @param width      The width of the sprite.
        *   @param height     The height of the sprite.
        *
        *   @return The created sprite instance.
        ***************************************************************************************************************/
        public createSprite
        (
            spriteFile :bz.SpriteFile,
            position   :BABYLON.Vector3,
            width      :number,
            height     :number
        )
        : BABYLON.Sprite
        {
            const sprite:BABYLON.Sprite = new BABYLON.Sprite
            (
                SpriteSystem.createNextSpriteId(),
                this.spriteManagers[ spriteFile.fileName ]
            );

            sprite.position = position;
            sprite.width    = width;
            sprite.height   = height;

            return sprite;
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new sprite to create.
        *
        *   @return The next free unique id for a new sprite to create.
        ***************************************************************************************************************/
        private static createNextSpriteId() : string
        {
            return 'sprite' + SpriteSystem.nextSpriteId++;
        }
    }

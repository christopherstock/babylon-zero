
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Specifies the sprite system.
    *******************************************************************************************************************/
    export class SpriteSystem
    {
        // TODO create array of Sprite-Managers

        /** Next ID to assign for sprite creation. */
        private         static          nextSpriteId                    :number                     = 0;

        /** The sprite manager for trees ... will be refactored soon! */
        public                          managerTreeSprite               :BABYLON.SpriteManager      = null;

        /** ************************************************************************************************************
        *   Initializes all sprite systems.
        ***************************************************************************************************************/
        public init() : void
        {
            this.managerTreeSprite = new BABYLON.SpriteManager
            (
                'treesManager',
                bz.SettingEngine.PATH_IMAGE_SPRITE + 'tree.png',
                bz.SettingEngine.MAX_SPRITE_INSTANCES,
                357,
                bz.Main.game.engine.scene.getScene()
            );
        }

        /** ************************************************************************************************************
        *   Creates an assembled sprite instance from the given sprite manager.
        *
        *   TODO Add anchor ..
        *
        *   @param spriteManager The sprite manager to create an instance from.
        *   @param position      The vector to place the sprite.
        *   @param width         The width of the sprite.
        *   @param height        The height of the sprite.
        *
        *   @return The created sprite instance.
        ***************************************************************************************************************/
        public createSprite
        (
            spriteManager :BABYLON.SpriteManager,
            position      :BABYLON.Vector3,
            width         :number,
            height        :number
        )
        : BABYLON.Sprite
        {
            const sprite:BABYLON.Sprite = new BABYLON.Sprite
            (
                SpriteSystem.createNextSpriteId(),
                spriteManager
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

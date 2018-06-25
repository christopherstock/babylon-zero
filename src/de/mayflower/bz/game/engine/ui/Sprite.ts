
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Specifies the sprite system.
    *******************************************************************************************************************/
    export class Sprite
    {
        /** The sprite manager for trees ... will be refactored soon! */
        private                     managerTreeSprite               :BABYLON.SpriteManager      = null;

        /** ************************************************************************************************************
        *   Initializes all sprite systems.
        ***************************************************************************************************************/
        public init() : void
        {
            this.managerTreeSprite = new BABYLON.SpriteManager
            (
                'treesManager',
                bz.SettingEngine.PATH_IMAGE_SPRITE + 'tree.png',
                357,
                357,
                bz.Main.game.engine.scene.getScene()
            );
        }

        /** ************************************************************************************************************
        *   Creates a new 'tree' sprite.
        *
        *   @param position The vector to place the sprite.
        *   @param size     The size of the sprite.
        *
        *   @return A created 'tree' sprite.
        ***************************************************************************************************************/
        public createTreeSprite( position:BABYLON.Vector3, size:number ) : BABYLON.Sprite
        {
            const ret:BABYLON.Sprite = new BABYLON.Sprite( 'tree1', bz.Main.game.engine.sprite.managerTreeSprite );

            ret.position = position;
            ret.size     = size;

            return ret;
        }
    }

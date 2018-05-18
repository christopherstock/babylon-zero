
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Specifies the sprite system.
    *******************************************************************************************************************/
    export class Sprite
    {
        /** The sprite manager for trees ... will be refactored soon! */
        private                     factoryTreeSprite               :BABYLON.SpriteManager      = null;

        /** ************************************************************************************************************
        *   Initializes all sprite systems.
        ***************************************************************************************************************/
        public init() : void
        {
            this.factoryTreeSprite = new BABYLON.SpriteManager
            (
                'treesManager',
                bz.SettingEngine.PATH_IMAGE_TEXTURE + 'tree.png',
                100,
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
            const ret:BABYLON.Sprite = new BABYLON.Sprite( 'tree1', bz.Main.game.engine.sprite.factoryTreeSprite );

            ret.position = position;
            ret.size     = size;

            return ret;
        }
    }

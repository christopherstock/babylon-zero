
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Specifies the sprite system.
    *******************************************************************************************************************/
    export class Sprite
    {
        /** The sprite manager for trees ... */
        private                     factoryTreeSprite               :BABYLON.SpriteManager      = null;

        /***************************************************************************************************************
        *   Initializes all sprite systems.
        ***************************************************************************************************************/
        public init() : void
        {
            this.factoryTreeSprite = new BABYLON.SpriteManager
            (
                "treesManager",
                bz.SettingEngine.PATH_IMAGE_TEXTURE + "tree.png",
                100,
                357,
                bz.Main.game.engine.scene.getScene()
            );
        }

        public createTreeSprite( position:BABYLON.Vector3, size:number ) : BABYLON.Sprite
        {
            let ret = new BABYLON.Sprite( "tree1", bz.Main.game.engine.sprite.factoryTreeSprite );

            ret.position = position;
            ret.size     = size;

            return ret;
        }
    }


    import * as bz from '..';

    /*******************************************************************************************************************
    *   Specifies the sprite system.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Sprite
    {
        /** The sprite manager. TODO private! */
        public                      spriteManager               :BABYLON.SpriteManager      = null;

        public init() : void
        {
            this.spriteManager = new BABYLON.SpriteManager( "treesManager", bz.SettingEngine.PATH_IMAGE_TEXTURE + "tree.png", 100, 357, bz.Main.game.engine.scene.babylonScene );
        }
    }

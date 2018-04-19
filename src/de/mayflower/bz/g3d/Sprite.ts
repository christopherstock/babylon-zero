
    import * as bz from '..';

    /*****************************************************************************
    *   Specifies the sprite system.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class Sprite
    {
        public          static                  spriteManager           :BABYLON.SpriteManager      = null;

        /*****************************************************************************
        *   Initializes the sprite manager.
        *****************************************************************************/
        public static init()
        {
            Sprite.spriteManager = new BABYLON.SpriteManager( "treesManager", bz.SettingEngine.PATH_IMAGE_TEXTURE + "tree.png", 100, 357, bz.Scene.scene );
        }
    }

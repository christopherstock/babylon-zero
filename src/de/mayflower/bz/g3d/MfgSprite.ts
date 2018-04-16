
    import * as bz from '..';

    /*****************************************************************************
    *   Specifies the sprite system.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class MfgSprite
    {
        public          static                  spriteManager           :BABYLON.SpriteManager      = null;

        /*****************************************************************************
        *   Initializes the sprite manager.
        *****************************************************************************/
        public static init()
        {
            MfgSprite.spriteManager = new BABYLON.SpriteManager( "treesManager", bz.MfgSettings.PATH_IMAGE_TEXTURE + "tree.png", 100, 357, bz.MfgScene.scene );
        }
    }


    import * as bz from '..';

    /*****************************************************************************
    *   Specifies the paramount part of the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class MfgGame
    {
        public          static          currentLevel            :bz.MfgLevel                = null;

        /*****************************************************************************
        *   The render loop. This method is being invoked each tick.
        *****************************************************************************/
        public static render()
        {
            //render the scene if existent
            if ( bz.MfgScene.scene )
            {
                //render the scene
                bz.MfgScene.scene.render();

                //handle streams
                if ( bz.MfgScene.scene.useDelayedTextureLoading )
                {
                    var waiting = bz.MfgScene.scene.getWaitingItemsCount();
                    if ( waiting > 0 )
                    {
                        console.log( "Streaming items... " + waiting + " remaining");
                    }
                }
            }
        }
    }

require( '../css/global.less' );

import * as bz from '..';

/** ****************************************************************************************************************
*   The main class containins the point of entry.
*******************************************************************************************************************/
export class WebApp
{
    /** ************************************************************************************************************
    *   This method is invoked when the application starts.
    ***************************************************************************************************************/
    public start() : void
    {
        // HTML document title and favicon
        bz.DOMUtil.setTitle(   bz.SettingBranding.TITLE   );
        bz.DOMUtil.setFavicon( bz.SettingResource.PATH_IMAGE_FAVICON + bz.SettingBranding.FAVICON );

        // log some output
        bz.Debug.acclaim.log( bz.SettingBranding.TITLE );
        bz.Debug.acclaim.log( bz.Version.getCurrent()  );
        bz.Debug.acclaim.log();

        // create and init game
        const game :bz.Game = new bz.Game();
        game.init();
    }
}

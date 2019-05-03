
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   The branding class for 'Mayflower' branding.
    *******************************************************************************************************************/
    export class BrandingMayflower extends bz.Branding
    {
        /** ************************************************************************************************************
        *   Returns the HTML page title.
        *
        *   @return The HTML page title.
        ***************************************************************************************************************/
        public getTitle() : string
        {
            return 'babylon-zero, (c) 2018 Mayflower GmbH';
        }

        /** ************************************************************************************************************
        *   Returns the loading screen logo.
        *
        *   @return The logo for the loading screen.
        ***************************************************************************************************************/
        public getLoadingLogo() : string
        {
            return 'loadingMf.png';
        }

        /** ************************************************************************************************************
        *   Returns the favicon.
        *
        *   @return The path to the favicon.
        ***************************************************************************************************************/
        public getFavicon() : string
        {
            return bz.SettingResource.PATH_IMAGE_FAVICON + 'mayflower.ico';
        }

        /** ************************************************************************************************************
        *   Returns the primal css color value.
        *
        *   @return The primal css color value.
        ***************************************************************************************************************/
        public getPrimalColor() : string
        {
            return bz.SettingColor.COLOR_CSS_MAYFLOWER_ORANGE_OPAQUE;
        }
    }

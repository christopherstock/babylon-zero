
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   The branding class for 'Computy' branding.
    *******************************************************************************************************************/
    export class BrandingComputy extends bz.Branding
    {
        /** ************************************************************************************************************
        *   Returns the HTML page title.
        *
        *   @return The HTML page title.
        ***************************************************************************************************************/
        public getTitle() : string
        {
            return 'Human Body Partitions, (c) 2018 Computy GmbH';
        }

        /** ************************************************************************************************************
        *   Returns the loading screen logo.
        *
        *   @return The logo for the loading screen.
        ***************************************************************************************************************/
        public getLoadingLogo() : string
        {
            return 'loadingComp.png';
        }

        /** ************************************************************************************************************
        *   Returns the favicon.
        *
        *   @return The path to the favicon.
        ***************************************************************************************************************/
        public getFavicon() : string
        {
            return bz.SettingResource.PATH_IMAGE_FAVICON + 'computy.ico';
        }

        /** ************************************************************************************************************
        *   Returns the primal css color value.
        *
        *   @return The primal css color value.
        ***************************************************************************************************************/
        public getPrimalColor() : string
        {
            return bz.SettingColor.COLOR_CSS_COMPUTY_GREEN_OPAQUE;
        }
    }

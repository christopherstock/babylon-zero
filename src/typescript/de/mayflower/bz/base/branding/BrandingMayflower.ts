
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
            return 'babylon-zero, (c) 2021 Mayflower GmbH';
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
        public getPrimalColorCss() : string
        {
            return bz.SettingColor.COLOR_CSS_MAYFLOWER_ORANGE_OPAQUE;
        }

        /** ************************************************************************************************************
        *   Returns the primal RGB color value.
        *
        *   @return The primal RGB color value.
        ***************************************************************************************************************/
        public getPrimalColorRgb() : BABYLON.Color3
        {
            return bz.SettingColor.COLOR_RGB_MAYFLOWER_ORANGE;
        }

        /** ************************************************************************************************************
        *   Returns the path to the HBP GUI logo.
        *
        *   @return The relative path to the HBP GUI logo.
        ***************************************************************************************************************/
        public getHbpGuiLogo() : string
        {
            return 'hbp/mfLogo.png';
        }

        /** ************************************************************************************************************
        *   Returns the path to the PC GUI logo.
        *
        *   @return The relative path to the PC GUI logo.
        ***************************************************************************************************************/
        public getPcGuiLogo() : string
        {
            return 'pc3d/mfLogo.png';
        }
    }

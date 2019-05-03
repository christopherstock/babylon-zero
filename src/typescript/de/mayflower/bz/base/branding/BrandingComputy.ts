
    import * as bz      from '../..';
    import * as BABYLON from 'babylonjs';

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
        public getPrimalColorCss() : string
        {
            return bz.SettingColor.COLOR_CSS_COMPUTY_GREEN_OPAQUE;
        }

        /** ************************************************************************************************************
        *   Returns the primal RGB color value.
        *
        *   @return The primal RGB color value.
        ***************************************************************************************************************/
        public getPrimalColorRgb() : BABYLON.Color3
        {
            return bz.SettingColor.COLOR_RGB_COMPUTY_GREEN;
        }

        /** ************************************************************************************************************
        *   Returns the path to the HBP GUI logo.
        *
        *   @return The relative path to the HBP GUI logo.
        ***************************************************************************************************************/
        public getHbpGuiLogo() : string
        {
            return 'hbp/compLogo.png';
        }

        /** ************************************************************************************************************
        *   Returns the path to the PC GUI logo.
        *
        *   @return The relative path to the PC GUI logo.
        ***************************************************************************************************************/
        public getPcGuiLogo() : string
        {
            return 'pc3d/compLogo.png';
        }
    }


    /** ****************************************************************************************************************
    *   The abstract superclass for all branding confgurations.
    *******************************************************************************************************************/
    export abstract class Branding
    {
        /** ************************************************************************************************************
        *   Returns the HTML page title.
        *
        *   @return The HTML page title.
        ***************************************************************************************************************/
        public abstract getTitle() : string;

        /** ************************************************************************************************************
        *   Returns the loading screen logo.
        *
        *   @return The logo for the loading screen.
        ***************************************************************************************************************/
        public abstract getLoadingLogo() : string;

        /** ************************************************************************************************************
        *   Returns the favicon.
        *
        *   @return The path to the favicon.
        ***************************************************************************************************************/
        public abstract getFavicon() : string;

        /** ************************************************************************************************************
        *   Returns the primal css color value.
        *
        *   @return The primal css color value.
        ***************************************************************************************************************/
        public abstract getPrimalColorCss() : string;

        /** ************************************************************************************************************
        *   Returns the primal RGB color value.
        *
        *   @return The primal RGB color value.
        ***************************************************************************************************************/
        public abstract getPrimalColorRgb() : BABYLON.Color3;

        /** ************************************************************************************************************
        *   Returns the path to the HBP GUI logo.
        *
        *   @return The relative path to the HBP GUI logo.
        ***************************************************************************************************************/
        public abstract getHbpGuiLogo() : string;

        /** ************************************************************************************************************
        *   Returns the path to the PC GUI logo.
        *
        *   @return The relative path to the PC GUI logo.
        ***************************************************************************************************************/
        public abstract getPcGuiLogo() : string;
    }

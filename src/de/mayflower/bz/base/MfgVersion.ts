
    import * as bz from '..';

    /**************************************************************************************
    *   Contains the project history with all current and completed version information.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    **************************************************************************************/
    export class MfgVersion
    {
        /** The project's version v.0.0.1. */
        private     static      V_0_0_1                 :bz.LibVersion          = new bz.LibVersion( "0.0.1", "BASE",  "12.02.2016 00:07:34",      "" );

        /** The project's current version. */
        public      static      CURRENT_VERSION         :bz.LibVersion          = bz.MfgVersion.V_0_0_1;
    }

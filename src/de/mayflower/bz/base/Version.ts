
    /*******************************************************************************************************************
    *   Contains the project history with all current and completed version information.
    *******************************************************************************************************************/
    export class Version
    {
        /** The project's version v.0.0.1. */
        private     static  readonly    V_0_0_1                 :Version            = new Version( "0.0.1", "BABYLON ZERO",        "17.04.2018, 09:42:16 GMT+1" );
        /** The project's version v.0.0.2. */
        private     static  readonly    V_0_0_2                 :Version            = new Version( "0.0.1", "BABYLON.JS TAKE OFF", "18.05.2018, 07:10:41 GMT+1" );

        /** The project's current version. */
        public      static  readonly    CURRENT_VERSION         :Version            = Version.V_0_0_1;

        /** This version's specifier. */
        private             readonly    version                 :string             = null;
        /** This version's internal codename. */
        private             readonly    codename                :string             = null;
        /** This version's completion date. */
        private             readonly    date                    :string             = null;

        /***************************************************************************************************************
        *   Creates a project version.
        *
        *   @param version      The version specifier.
        *   @param codename     The internal codename.
        *   @param date         The completion date.
        ***************************************************************************************************************/
        constructor( version:string, codename:string, date:string )
        {
            this.version  = version;
            this.codename = codename;
            this.date     = date;
        }

        /***************************************************************************************************************
        *   Returns a representation of the current project version and it's date.
        *
        *   @return A representation of the current project's version with it's timestamp.
        ***************************************************************************************************************/
        public getVersionDescriptor():string
        {
            return ( "v. " + this.version + " [" + this.codename + "]" );
        }
    }

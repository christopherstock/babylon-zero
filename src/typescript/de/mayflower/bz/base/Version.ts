/* eslint-disable max-len */

/** ********************************************************************************************************************
*   Contains the project history with all current and completed version information.
***********************************************************************************************************************/
export class Version
{
    /** The project's version v.0.0.1. */
    private static readonly V_0_0_1             :Version            = new Version( '0.0.1',  'BABYLON ZERO',             '17.04.2018, 09:42:16 GMT+1' );
    /** The project's version v.0.0.2. */
    private static readonly V_0_0_2             :Version            = new Version( '0.0.2',  'BABYLON.JS TAKE OFF',      '18.05.2018, 07:10:41 GMT+1' );
    /** The project's version v.0.0.3. */
    private static readonly V_0_0_3             :Version            = new Version( '0.0.3',  'BABYLON.JS DEEP DIVE',     '10.06.2018, 00:42:10 GMT+1' );
    /** The project's version v.0.0.4. */
    private static readonly V_0_0_4             :Version            = new Version( '0.0.4',  '3D PRODUCT CONFIGURATOR',  '15.06.2018, 10:55:12 GMT+1' );
    /** The project's version v.0.0.5. */
    private static readonly V_0_0_5             :Version            = new Version( '0.0.5',  'CREATIVITY UNLEASHED',     '29.06.2018, 09:37:52 GMT+1' );
    /** The project's version v.0.0.6. */
    private static readonly V_0_0_6             :Version            = new Version( '0.0.6',  'TWISTED DREAMS',           '04.07.2018, 07:10:11 GMT+1' );
    /** The project's version v.0.0.7. */
    private static readonly V_0_0_7             :Version            = new Version( '0.0.7',  'ROCK AND ROLL',            '25.07.2018, 06:39:41 GMT+1' );
    /** The project's version v.0.0.8. */
    private static readonly V_0_0_8             :Version            = new Version( '0.0.8',  'HUMAN BODY PARTITIONS',    '24.11.2018, 14:15:12 GMT+1' );
    /** The project's version v.0.0.9. */
    private static readonly V_0_0_9             :Version            = new Version( '0.0.9',  'BABYLON.JS 4.0',           '25.05.2019, 18:22:41 GMT+1' );
    /** The project's version v.0.0.10. */
    private static readonly V_0_0_10            :Version            = new Version( '0.0.10', 'NEXT STAGE',               '17.05.2020, 12:05:12 GMT+1' );
    /** The project's version v.0.0.11. */
    private static readonly V_0_0_11            :Version            = new Version( '0.0.11', 'PRETTIFY',                 '28.10.2021, 23:28:33 GMT+1' );
    /** The project's version v.0.1.0. */
    private static readonly V_0_1_0             :Version            = new Version( '0.1.0',  'BLOATWARE',                '29.10.2021, 08:36:12 GMT+1' );
    /** The project's version v.0.2.0. */
    private static readonly V_0_2_0             :Version            = new Version( '0.2.0',  'SLIM',                     '29.10.2021, 08:52:53 GMT+1' );
    /** The project's version v.0.3.0. */
    private static readonly V_0_3_0             :Version            = new Version( '0.3.0',  'NEIß',                     '09.11.2021, 11:32:21 GMT+1' );
    /** The project's version v.0.4.0. */
    private static readonly V_0_4_0             :Version            = new Version( '0.4.0',  'CLEAN STAGE',              '10.11.2021, 15:57:54 GMT+1' );

    /** The project's current version. */
    private static readonly CURRENT_VERSION     :Version            = Version.V_0_4_0;

    /** This version's specifier. */
    private        readonly version             :string             = null;
    /** This version's internal codename. */
    private        readonly codename            :string             = null;
    /** This version's completion date. */
    private        readonly date                :string             = null;

    /** ****************************************************************************************************************
    *   Creates a project version.
    *
    *   @param version      The version specifier.
    *   @param codename     The internal codename.
    *   @param date         The completion date.
    *******************************************************************************************************************/
    private constructor( version:string, codename:string, date:string )
    {
        this.version  = version;
        this.codename = codename;
        this.date     = date;
    }

    /** ****************************************************************************************************************
    *   Returns a representation of the current project version and it's date.
    *
    *   @return A representation of the current project's version with it's timestamp.
    *******************************************************************************************************************/
    public static getCurrent() : string
    {
        return ( 'v. ' + Version.CURRENT_VERSION.version + ' ' + Version.CURRENT_VERSION.codename );
    }
}

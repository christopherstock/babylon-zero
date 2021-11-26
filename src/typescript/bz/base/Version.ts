/* eslint-disable max-len */
// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

/** ********************************************************************************************************************
*   Contains the project history with all current and completed version information.
***********************************************************************************************************************/
export class Version
{
    private static readonly V_0_0_1             :Version            = new Version( '0.0.1',  'BABYLON ZERO',                 '17.04.2018, 09:42:16 GMT+1' );
    private static readonly V_0_0_2             :Version            = new Version( '0.0.2',  'BABYLON.JS TAKE OFF',          '18.05.2018, 07:10:41 GMT+1' );
    private static readonly V_0_0_3             :Version            = new Version( '0.0.3',  'BABYLON.JS DEEP DIVE',         '10.06.2018, 00:42:10 GMT+1' );
    private static readonly V_0_0_4             :Version            = new Version( '0.0.4',  '3D PRODUCT CONFIGURATOR',      '15.06.2018, 10:55:12 GMT+1' );
    private static readonly V_0_0_5             :Version            = new Version( '0.0.5',  'CREATIVITY UNLEASHED',         '29.06.2018, 09:37:52 GMT+1' );
    private static readonly V_0_0_6             :Version            = new Version( '0.0.6',  'TWISTED DREAMS',               '04.07.2018, 07:10:11 GMT+1' );
    private static readonly V_0_0_7             :Version            = new Version( '0.0.7',  'ROCK AND ROLL',                '25.07.2018, 06:39:41 GMT+1' );
    private static readonly V_0_0_8             :Version            = new Version( '0.0.8',  'HUMAN BODY PARTITIONS',        '24.11.2018, 14:15:12 GMT+1' );
    private static readonly V_0_0_9             :Version            = new Version( '0.0.9',  'BABYLON.JS 4.0',               '25.05.2019, 18:22:41 GMT+1' );
    private static readonly V_0_0_10            :Version            = new Version( '0.0.10', 'NEXT STAGE',                   '17.05.2020, 12:05:12 GMT+1' );
    private static readonly V_0_0_11            :Version            = new Version( '0.0.11', 'PRETTIFY',                     '28.10.2021, 23:28:33 GMT+1' );
    private static readonly V_0_1_0             :Version            = new Version( '0.1.0',  'BLOATWARE',                    '29.10.2021, 08:36:12 GMT+1' );
    private static readonly V_0_1_1             :Version            = new Version( '0.1.1',  'SLIM',                         '29.10.2021, 08:52:53 GMT+1' );
    private static readonly V_0_1_2             :Version            = new Version( '0.1.2',  'NEIß',                         '09.11.2021, 11:32:21 GMT+1' );
    private static readonly V_0_1_3             :Version            = new Version( '0.1.3',  'CLEAN STAGE',                  '10.11.2021, 15:57:54 GMT+1' );
    private static readonly V_0_1_4             :Version            = new Version( '0.1.4',  'ROOMS',                        '12.11.2021, 17:12:02 GMT+1' );
    private static readonly V_0_1_5             :Version            = new Version( '0.1.5',  '3DSMAX',                       '16.11.2021, 10:18:42 GMT+1' );
    private static readonly V_0_1_6             :Version            = new Version( '0.1.6',  'EVENTS',                       '16.11.2021, 14:51:00 GMT+1' );
    private static readonly V_0_1_7             :Version            = new Version( '0.1.7',  'IMPACT',                       '17.11.2021, 10:47:34 GMT+1' );
    private static readonly V_0_1_8             :Version            = new Version( '0.1.8',  'ITEMS & TEXTURES',             '18.11.2021, 13:36:21 GMT+1' );
    private static readonly V_0_1_9             :Version            = new Version( '0.1.9',  'GUI MESSAGES & UI-EVENTS',     '19.11.2021, 15:40:01 GMT+1' );
    private static readonly V_0_1_10            :Version            = new Version( '0.1.10', 'NEW TEXTURES',                 '20.11.2021, 15:05:43 GMT+1' );
    private static readonly V_0_1_11            :Version            = new Version( '0.1.11', 'DIAMOND ROOMS & SPLIT MESHES', '21.11.2021, 15:42:10 GMT+1' );
    private static readonly V_0_1_12            :Version            = new Version( '0.1.12', 'DOORS 360',                    '22.11.2021, 16:16:02 GMT+1' );
    private static readonly V_0_1_13            :Version            = new Version( '0.1.13', 'GENERATED TREES',              '23.11.2021, 12:04:17 GMT+1' );
    private static readonly V_0_1_14            :Version            = new Version( '0.1.14', '3D GUN',                       '24.11.2021, 10:14:03 GMT+1' );
    private static readonly V_0_1_15            :Version            = new Version( '0.1.15', 'NEW MODELS',                   '26.11.2021, 09:41:01 GMT+1' );

    /** The project's current version. */
    private static readonly CURRENT_VERSION     :Version            = Version.V_0_1_15;

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
        return ( 'v. ' + Version.CURRENT_VERSION.version );
    }
}

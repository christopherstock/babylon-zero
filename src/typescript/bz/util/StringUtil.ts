/** The Moment.js library import. */
const moment:any = require( 'moment' );

/** ********************************************************************************************************************
*   Offers extended string functionality.
***********************************************************************************************************************/
export abstract class StringUtil
{
    /** ****************************************************************************************************************
    *   Returns a formatted timestamp of the current system date and time.
    *
    *   @return string A formatted timestamp of the current system date and time.
    *******************************************************************************************************************/
    public static getDateTimeString():string
    {
        return new moment().format( 'DD.MM.YYYY HH:mm:ss' );
    }
}

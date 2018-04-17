
    import * as bz from '..';

    /*****************************************************************************
    *   Offers static string functionality.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class MfgString
    {
        /*****************************************************************************
        *   Returns an array of all found regular expression matches.
        *
        *   @param  subject The target string to apply the regular expression search on.
        *   @param  regEx   The regular expression.
        *                   This string MUST NOT be enclosed in string quotes!
        *   @return         An array containing all matched results.
        *****************************************************************************/
        public static searchRegEx( subject:string, regEx:RegExp ):Array<string>
        {
            var results:RegExpMatchArray  = subject.match( regEx );
            var ret:Array<string>         = [];

            if ( results != null )
            {
                for ( var i:number = 0; i < results.length; ++i )
                {
                    ret[ i ] = results[ i ];
                }
            }

            return ret;
        }

        /*****************************************************************************
        *   Returns a formatted timestamp of the current system date and time.
        *
        *   @return A formatted timestamp of the current system date and time.
        *****************************************************************************/
        public static getDateTimeString():string
        {
            var now:Date        = new Date();

            var year:string     = ( now.getFullYear()  ).toString();
            var month:string    = ( now.getMonth() + 1 ).toString();
            var day:string      = ( now.getDate()      ).toString();
            var hour:string     = ( now.getHours()     ).toString();
            var minute:string   = ( now.getMinutes()   ).toString();
            var second:string   = ( now.getSeconds()   ).toString();

            if ( month.toString().length  == 1 ) month  = '0' + month;
            if ( day.toString().length    == 1 ) day    = '0' + day;
            if ( hour.toString().length   == 1 ) hour   = '0' + hour;
            if ( minute.toString().length == 1 ) minute = '0' + minute;
            if ( second.toString().length == 1 ) second = '0' + second;

            return ( day + '.' + month + '.' + year + ' ' + hour + ':' + minute + ':' + second );
        }
    }

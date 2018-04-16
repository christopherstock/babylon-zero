
    /*****************************************************************************
    *   Offers general arithmetic functionality.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class MfgMath
    {
        /*****************************************************************************
        *   Returns an integer number of the specified range.
        *
        *   @param  from    Start of the range.
        *   @param  to      End of the range.
        *   @return         An integer number in between the specified range.
        *****************************************************************************/
        public static getRandomInt( from:number, to:number ):number
        {
            return Math.floor( ( Math.random() * ( to - from ) ) + from );
        }
    }

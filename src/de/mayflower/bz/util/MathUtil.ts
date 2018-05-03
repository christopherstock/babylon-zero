
    /*******************************************************************************************************************
    *   Offers additional mathematical functionality.
    *******************************************************************************************************************/
    export class MathUtil
    {
        /***************************************************************************************************************
        *   Converts an angle from degrees to radians.
        *
        *   @param  angle The angle in degrees.
        *   @return       The angle in radians.
        ***************************************************************************************************************/
        public static degreesToRad(angle:number ):number
        {
            return ( angle * Math.PI / 180.0 );
        }

        /***************************************************************************************************************
        *   Returns a random integer between given mininum and maximum.
        *
        *   @param min
        *   @param max
        *   @return {number}
        ***************************************************************************************************************/
        public static getRandomInt( min:number, max:number )
        {
            return Math.floor( ( Math.random() * ( max + 1 - min ) ) + min );
        }
    }

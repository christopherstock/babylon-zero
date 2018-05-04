
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

        /***************************************************************************************************************
        *   Normalizes any angle to => 0.0 and < 360.0 degrees.
        *
        *   @param angleDegrees The angle to normalize.
        *
        *   @return The normalized angle.
        ***************************************************************************************************************/
        public static normalizeAngle( angleDegrees:number )
        {
            while ( angleDegrees > 360.0 ) angleDegrees -= 360.0;
            while ( angleDegrees < 0.0   ) angleDegrees += 360.0;

            return angleDegrees;
        }
    }

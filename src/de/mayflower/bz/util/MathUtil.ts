
    /*******************************************************************************************************************
    *   Offers additional mathematical functionality.
    *******************************************************************************************************************/
    export class MathUtil
    {
        /***************************************************************************************************************
        *   Converts an angle from degrees to radians.
        *
        *   @param angleDegrees The angle in degrees.
        *
        *   @return The angle in radians.
        ***************************************************************************************************************/
        public static degreesToRad( angleDegrees:number ):number
        {
            return ( angleDegrees * Math.PI / 180.0 );
        }

        /***************************************************************************************************************
        *   Returns a random integer between given mininum and maximum.
        *
        *   @param min
        *   @param max
        *
        *   @return A random integer.
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

        /*****************************************************************************
        *   Delivers the sine value of the given angle in degrees.
        *
        *   @param angleDegrees An angle in degrees to get the sine for.
        *
        *   @return The sine value for the specified angle.
        *****************************************************************************/
        public static sinDegrees( angleDegrees:number ):number
        {
            return Math.sin( MathUtil.degreesToRad( angleDegrees ) );
        }

        /*****************************************************************************
        *   Delivers the cosine value of the given angle in degrees.
        *
        *   @param angleDegrees An angle to get the cosine for.
        *
        *   @return The cosine value for the specified angle.
        *****************************************************************************/
        public static cosDegrees( angleDegrees:number ):number
        {
            return Math.cos( MathUtil.degreesToRad( angleDegrees ) );
        }
    }

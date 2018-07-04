
    import * as bz from '../index';

    /** ****************************************************************************************************************
    *   Offers additional mathematical functionality.
    *******************************************************************************************************************/
    export class MathUtil
    {
        /** ************************************************************************************************************
        *   Converts an angle from degrees to radians.
        *
        *   @param angleDegrees The angle in degrees.
        *
        *   @return The angle in radians.
        ***************************************************************************************************************/
        public static degreesToRad( angleDegrees:number ) : number
        {
            return ( angleDegrees * Math.PI / 180.0 );
        }

        /** ************************************************************************************************************
        *   Returns a random integer between the given mininum and maximum.
        *
        *   @param min The minimum value to return by random.
        *   @param max The maximum value to return by random.
        *
        *   @return A random integer in the specified tange.
        ***************************************************************************************************************/
        public static getRandomInt( min:number, max:number ) : number
        {
            return Math.floor( ( Math.random() * ( max + 1 - min ) ) + min );
        }

        /** ************************************************************************************************************
        *   Normalizes any angle to => 0.0 and < 360.0 degrees.
        *
        *   @param angleDegrees The angle to normalize.
        *
        *   @return The normalized angle.
        ***************************************************************************************************************/
        public static normalizeAngle( angleDegrees:number ) : number
        {
            while ( angleDegrees > 360.0 ) angleDegrees -= 360.0;
            while ( angleDegrees < 0.0   ) angleDegrees += 360.0;

            return angleDegrees;
        }

        /** ************************************************************************************************************
        *   Delivers the sine value of the given angle in degrees.
        *
        *   @param angleDegrees An angle in degrees to get the sine for.
        *
        *   @return The sine value for the specified angle.
        ***************************************************************************************************************/
        public static sinDegrees( angleDegrees:number ) : number
        {
            return Math.sin( MathUtil.degreesToRad( angleDegrees ) );
        }

        /** ************************************************************************************************************
        *   Delivers the cosine value of the given angle in degrees.
        *
        *   @param angleDegrees An angle to get the cosine for.
        *
        *   @return The cosine value for the specified angle.
        ***************************************************************************************************************/
        public static cosDegrees( angleDegrees:number ) : number
        {
            return Math.cos( MathUtil.degreesToRad( angleDegrees ) );
        }

        /** ************************************************************************************************************
        *   Gets the distant point from the given source vector, rotated by the specified rotation.
        *
        *   @param source   The source vector.
        *   @param rotation The desired rotation of the distant point.
        *   @param distance The distance from the source point.
        *
        *   @return The rotated distant point.
        ***************************************************************************************************************/
        public static rotateVector
        (
            source   :BABYLON.Vector3,
            rotation :BABYLON.Vector3,
            distance :number
        )
        : BABYLON.Vector3
        {
            const distantVector  :BABYLON.Vector3 = new BABYLON.Vector3( 0.0, 0.0, distance );
            const rotationMatrix :BABYLON.Matrix  = BABYLON.Matrix.RotationYawPitchRoll
            (
                bz.MathUtil.degreesToRad( rotation.y ),
                bz.MathUtil.degreesToRad( rotation.x ),
                bz.MathUtil.degreesToRad( rotation.z )
            );

            const rotatedDistantVector:BABYLON.Vector3 = BABYLON.Vector3.TransformCoordinates
            (
                distantVector,
                rotationMatrix
            );

            return source.add( rotatedDistantVector );
        }
    }

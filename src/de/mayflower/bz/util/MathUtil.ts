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
        *   Returns a random integer between given mininum and maximum.
        *
        *   @param min
        *   @param max
        *
        *   @return A random integer.
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

        /** **************************************************************************
        *   Delivers the sine value of the given angle in degrees.
        *
        *   @param angleDegrees An angle in degrees to get the sine for.
        *
        *   @return The sine value for the specified angle.
        *****************************************************************************/
        public static sinDegrees( angleDegrees:number ) : number
        {
            return Math.sin( MathUtil.degreesToRad( angleDegrees ) );
        }

        /** **************************************************************************
        *   Delivers the cosine value of the given angle in degrees.
        *
        *   @param angleDegrees An angle to get the cosine for.
        *
        *   @return The cosine value for the specified angle.
        *****************************************************************************/
        public static cosDegrees( angleDegrees:number ) : number
        {
            return Math.cos( MathUtil.degreesToRad( angleDegrees ) );
        }

        /** **************************************************************************
        *   Rotate the given vector around .. ?.
        *
        *   @param
        *
        *   @return
        *****************************************************************************/
        public static rotateVector
        (
            vector   :BABYLON.Vector3,
            rotation :BABYLON.Vector3,
            distance :number
        )
        : BABYLON.Vector3
        {
/*
            const rotationQuaternion:BABYLON.Quaternion = BABYLON.Quaternion.RotationYawPitchRoll
            (
                bz.MathUtil.degreesToRad( rotation.y ),
                bz.MathUtil.degreesToRad( rotation.x ),
                bz.MathUtil.degreesToRad( rotation.z )
            );
*/
/*
            const matrix:BABYLON.Matrix = new BABYLON.Matrix();
            //rotationQuaternion.toRotationMatrix( matrix );
            matrix.setTranslation( new BABYLON.Vector3( 10.0, 0.0, 0.0 ) );
*/
/*


            const test:BABYLON.Matrix = BABYLON.Matrix.Translation( 0.0, 3.0, 0.0 );


*/
            const matrixTranslate :BABYLON.Matrix = BABYLON.Matrix.Translation
            (
                distance,
                0.0,
                0.0
            );
            const matrixRotate    :BABYLON.Matrix = BABYLON.Matrix.RotationYawPitchRoll
            (
                bz.MathUtil.degreesToRad( rotation.y ),
                bz.MathUtil.degreesToRad( rotation.x ),
                bz.MathUtil.degreesToRad( rotation.z )
            );


            const finalMatrix:BABYLON.Matrix = matrixTranslate.multiply( matrixRotate );


            // matrixRotate.setTranslation( new BABYLON.Vector3( distance, 0.0, 0.0 ) );




            const rotatedVector:BABYLON.Vector3 = BABYLON.Vector3.TransformCoordinates
            (
                vector,
finalMatrix
            );

            return rotatedVector;
        }
    }

/** ********************************************************************************************************************
*   Offers additional mathematical functionality.
***********************************************************************************************************************/
export abstract class MathUtil
{
    /** ****************************************************************************************************************
    *   Converts an angle from degrees to radians.
    *   The formula is: ( angleInDegrees * Math.PI / 180.0 )
    *
    *   @param angleInDegrees The angle in degrees.
    *
    *   @return The angle in radians.
    *******************************************************************************************************************/
    public static degreesToRad( angleInDegrees:number ) : number
    {
        return BABYLON.Angle.FromDegrees( angleInDegrees ).radians();
    }

    /** ****************************************************************************************************************
    *   Converts an angle from radians to degrees.
    *   The formula is: ( angleInRad * 180.0 / Math.PI )
    *
    *   @param angleInRad The angle in radians.
    *
    *   @return The angle in degrees.
    *******************************************************************************************************************/
    public static radToDegrees( angleInRad:number ) : number
    {
        return BABYLON.Angle.FromRadians( angleInRad ).degrees();
    }

    /** ****************************************************************************************************************
    *   Returns a random integer between the given mininum and maximum.
    *
    *   @param min The minimum value to return by random.
    *   @param max The maximum value to return by random.
    *
    *   @return A random integer in the specified tange.
    *******************************************************************************************************************/
    public static getRandomInt( min:number, max:number ) : number
    {
        return Math.floor( ( Math.random() * ( max + 1 - min ) ) + min );
    }

    /** ****************************************************************************************************************
    *   Normalizes any angle to => 0.0 and < 360.0 degrees.
    *
    *   @param angleDegrees The angle to normalize.
    *
    *   @return The normalized angle.
    *******************************************************************************************************************/
    public static normalizeAngleDegrees( angleDegrees:number ) : number
    {
        while ( angleDegrees > 360.0 )
        {
            angleDegrees -= 360.0;
        }
        while ( angleDegrees < 0.0   )
        {
            angleDegrees += 360.0;
        }

        return angleDegrees;
    }

    /** ****************************************************************************************************************
    *   Delivers the sine value of the given angle in degrees.
    *
    *   @param angleInDegrees An angle in degrees to get the sine for.
    *
    *   @return The sine value for the specified angle.
    *******************************************************************************************************************/
    public static sinDegrees( angleInDegrees:number ) : number
    {
        return Math.sin( MathUtil.degreesToRad( angleInDegrees ) );
    }

    /** ****************************************************************************************************************
    *   Delivers the cosine value of the given angle in degrees.
    *
    *   @param angleInDegrees An angle to get the cosine for.
    *
    *   @return The cosine value for the specified angle.
    *******************************************************************************************************************/
    public static cosDegrees( angleInDegrees:number ) : number
    {
        return Math.cos( MathUtil.degreesToRad( angleInDegrees ) );
    }

    /** ****************************************************************************************************************
    *   Gets the distant point from the given source vector, rotated by the specified rotation.
    *
    *   @param source   The source vector.
    *   @param rotation The desired rotation of the distant point.
    *   @param distance The distance from the source point.
    *
    *   @return The rotated distant point.
    *
    *   TODO only suitable for distant point Z! Adjust naming!
    *******************************************************************************************************************/
    public static rotateVector3
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
            MathUtil.degreesToRad( rotation.y ),
            MathUtil.degreesToRad( rotation.x ),
            MathUtil.degreesToRad( rotation.z )
        );

        const rotatedDistantVector:BABYLON.Vector3 = BABYLON.Vector3.TransformCoordinates
        (
            distantVector,
            rotationMatrix
        );

        return source.add( rotatedDistantVector );
    }

    /** ****************************************************************************************************************
    *   Rotates a 2D point around a different 2D point by the specified angle.
    *
    *   @param pivot       The pivot of the rotation
    *   @param angleDegree Angle to rotate by, in degrees.
    *   @param point       The point to rotate.
    *
    *   @return The rotated 2D point.
    *******************************************************************************************************************/
    public static rotateVector2( pivot:BABYLON.Vector2, angleDegree:number, point:BABYLON.Vector2 ) : BABYLON.Vector2
    {
        const sin:number = MathUtil.sinDegrees( angleDegree );
        const cos:number = MathUtil.cosDegrees( angleDegree );

        // translate point back to origin:
        point.x -= pivot.x;
        point.y -= pivot.y;

        // rotate point
        const xnew:number = point.x * cos - point.y * sin;
        const ynew:number = point.x * sin + point.y * cos;

        // translate point back
        return new BABYLON.Vector2(
            xnew + pivot.x,
            ynew + pivot.y
        );
    }

    /** ****************************************************************************************************************
    *   Delivers the angle between 0 and 360 degrees between the two specified points in 2D space.
    *   The axis X and Z are used for the 2D points. Axis Y is ignored.
    *
    *   @param from Source point.
    *   @param to   Destination point.
    *
    *   @return The angle between the source and destination point. From 0 to 360.
    *
    *   TODO refactor! extract main method x1,y1,x2,y2
    *******************************************************************************************************************/
    public static angleBetweenPointsXZ( from:BABYLON.Vector3, to:BABYLON.Vector3 ) : number
    {
        const distX :number = to.x - from.x;
        const distY :number = to.z - from.z;
        let   angle :number;

        if ( distX === 0.0 )
        {
            if ( distY === 0.0 )
            {
                angle = 0.0;
            }
            else if ( distY > 0.0 )
            {
                angle = Math.PI / 2.0;
            }
            else
            {
                angle = ( Math.PI * 3.0 ) / 2.0;
            }
        }
        else if ( distY === 0.0 )
        {
            if ( distX > 0.0 )
            {
                angle = 0.0;
            }
            else
            {
                angle = Math.PI;
            }
        }
        else
        {
            if ( distX < 0.0 )
            {
                angle = Math.atan( distY / distX ) + Math.PI;
            }
            else if ( distY < 0.0 )
            {
                angle = Math.atan( distY / distX ) + ( 2 * Math.PI );
            }
            else
            {
                angle = Math.atan( distY / distX );
            }
        }

        return MathUtil.radToDegrees( angle );
    }
}

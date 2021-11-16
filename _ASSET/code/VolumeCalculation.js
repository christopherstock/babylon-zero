
    /** ****************************************************************************************************************
    *   Calculates the volume of a cube.
    *
    *   @param width  Width  of the cube.
    *   @param height Height of the cube.
    *   @param depth  Depth  of the cube.
    *
    *   @return The volume of the cube.
    *******************************************************************************************************************/
    public static getCubeVolume( width:number, height:number, depth:number ) : number
    {
        return ( width * height * depth );
    }

    /** ****************************************************************************************************************
    *   Calculates the volume of a cylinder.
    *
    *   @param diameter Diameter of the cylinder.
    *   @param height   The height of the cylinder.
    *
    *   @return The volume of the cylinder.
    *******************************************************************************************************************/
    public static getCylinderVolume( diameter:number, height:number ) : number
    {
        return ( ( Math.pow( ( diameter / 2 ), 2 ) * Math.PI ) * height );
    }

    /** ****************************************************************************************************************
    *   Calculates the volume of a sphere.
    *
    *   @param diameter Diameter of the sphere.
    *
    *   @return The volume of the sphere.
    *******************************************************************************************************************/
    public static getSphereVolume( diameter:number ) : number
    {
        return ( ( Math.pow( ( diameter / 2 ), 3 ) * Math.PI ) * 4 / 3 );
    }

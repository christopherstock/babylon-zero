
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   Specifies possible physical attributes for meshes.
    *******************************************************************************************************************/
    export class PhysicProps
    {
        /** The player has very special physical attributes with the primal goal to keep the user entertained. */
        public      static  readonly        PLAYER                  :BABYLON.PhysicsImpostorParameters  =
        {
            mass:        2.5,
            friction:    0.0,
            restitution: 0.0,
        };

        public      static  readonly        LIGHT_WOOD              :BABYLON.PhysicsImpostorParameters  =
        {
            mass:        0.5,
            friction:    1.0,
            restitution: 0.0
        };

        public      static  readonly        STATIC                  :BABYLON.PhysicsImpostorParameters  =
        {
            mass:        0.0,
            friction:    1.0,
            restitution: 0.0
        };

        public static createFromDensity
        (
            density     :number,
            friction    :number,
            restitution :number
        )
        : BABYLON.PhysicsImpostorParameters
        {
            // ..

            return null;
        }
    }

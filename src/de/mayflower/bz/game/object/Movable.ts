
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a movable object.
    *******************************************************************************************************************/
    export class Movable extends bz.GameObject
    {
        /** The movable mesh. */
        private                             mesh                    :BABYLON.Mesh                           = null;

        /** ************************************************************************************************************
        *   Creates a new movable instance.
        *
        *   @param mesh The mesh for this movable.
        ***************************************************************************************************************/
        public constructor( mesh:BABYLON.Mesh )
        {
            super();

            this.mesh = mesh;
        }

    }

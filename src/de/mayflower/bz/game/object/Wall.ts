
    import * as bz from '../..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Represents a static wall.
    *******************************************************************************************************************/
    export class Wall extends bz.GameObject
    {
        /** The wall mesh. */
        private                             mesh                    :BABYLON.Mesh                           = null;

        /** ************************************************************************************************************
        *   Creates a new wall instance.
        *
        *   @param mesh The mesh for this wall.
        ***************************************************************************************************************/
        public constructor( mesh:BABYLON.Mesh )
        {
            super();

            this.mesh = mesh;
        }
    }

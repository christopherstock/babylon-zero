
    import * as BABYLON from 'babylonjs';
    import * as bz      from '../..';

    /** ****************************************************************************************************************
    *   Represents a movable object.
    *******************************************************************************************************************/
    export class Movable extends bz.GameObject
    {
        /** ************************************************************************************************************
        *   Creates a new movable instance.
        *
        *   @param meshes All meshes for this movable.
        ***************************************************************************************************************/
        public constructor( meshes:BABYLON.AbstractMesh[] )
        {
            super( meshes );
        }
    }

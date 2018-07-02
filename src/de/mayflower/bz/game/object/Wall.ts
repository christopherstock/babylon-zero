
    import * as BABYLON from 'babylonjs';
    import * as bz      from '../..';

    /** ****************************************************************************************************************
    *   Represents a static wall.
    *******************************************************************************************************************/
    export class Wall extends bz.GameObject
    {
        /** ************************************************************************************************************
        *   Creates a new wall instance.
        *
        *   @param model The model that represents this wall.
        ***************************************************************************************************************/
        public constructor( model:bz.Model )
        {
            super( model );
        }
    }

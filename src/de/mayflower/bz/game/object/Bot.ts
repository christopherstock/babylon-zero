
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a character being controlled by the cpu.
    *******************************************************************************************************************/
    export class Bot extends bz.GameObject
    {
        /** ************************************************************************************************************
        *   Creates a new bot instance.
        *
        *   @param meshes All meshes this bot consists of.
        ***************************************************************************************************************/
        public constructor( meshes:BABYLON.AbstractMesh[] )
        {
            super( meshes );
        }
    }

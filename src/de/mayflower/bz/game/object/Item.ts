
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a pickable item.
    *******************************************************************************************************************/
    export class Item extends bz.GameObject
    {
        /** ************************************************************************************************************
        *   Creates a new item.
        *
        *   @param meshes The mesh for this item.
        ***************************************************************************************************************/
        public constructor( meshes:BABYLON.AbstractMesh[] )
        {
            super( meshes );
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
/*
        public render() : void
        {
            // invoke parent method
            super.render();

            // rotate test chair
            for ( const mesh of this.chair )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ
                (
                    mesh,
                    this.chairRotX,
                    0.0,
                    0.0
                );
            }

            this.chairRotX += 0.5;
        }
*/
    }

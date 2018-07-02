
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a pickable item.
    *******************************************************************************************************************/
    export class Item extends bz.GameObject
    {
        /** Flags that this item has been picked. */
        private                 picked              :boolean                        = false;

        /** Current rotation Y for this item. */
        private                 rotY                :number                         = 0.0;

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
        public render() : void
        {
            // invoke parent method
            super.render();

            // testwise rotate this item
            for ( const mesh of this.meshes )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ
                (
                    mesh,
                    0.0,
                    this.rotY,
                    0.0
                );
            }

            this.rotY += 0.5;
        }
    }

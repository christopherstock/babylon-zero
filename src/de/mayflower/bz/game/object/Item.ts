
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

        /** ************************************************************************************************************
        *   Checks if this item is picked by colliding with one of the specified meshes.
        ***************************************************************************************************************/
        public checkPick( meshesToCheck:BABYLON.AbstractMesh[] ) : void
        {
            if ( !this.picked )
            {
                out:
                for ( const meshToCheck of meshesToCheck )
                {
                    for ( const mesh of this.meshes )
                    {
                        if ( mesh.intersectsMesh( meshToCheck ) )
                        {
                            this.pick();
                            break out;
                        }
                    }
                }
            }
        }

        /** ************************************************************************************************************
        *   Flags this item picked and makes it invisible.
        ***************************************************************************************************************/
        private pick() : void
        {
            bz.Debug.item.log( 'Item picked' );

            this.picked = true;

            for ( const mesh of this.meshes )
            {
                mesh.isVisible = false;
            }
        }
    }


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
        *   @param model The model that represents this item.
        ***************************************************************************************************************/
        public constructor( model:bz.Model )
        {
            super( model );
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // invoke parent method
            super.render();

            // testwise rotate this item
            for ( const mesh of this.model.getMeshes() )
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
        *   Checks if this item is picked by colliding with the specified model.
        *
        *   @param modelToCheck The model to check for collision with this item.
        ***************************************************************************************************************/
        public checkPick( modelToCheck:bz.Model ) : void
        {
            if ( !this.picked )
            {
                out:
                for ( const meshToCheck of modelToCheck.getMeshes() )
                {
                    for ( const mesh of this.model.getMeshes() )
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

            for ( const mesh of this.model.getMeshes() )
            {
                mesh.isVisible = false;
            }
        }
    }

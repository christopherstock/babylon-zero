
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
            this.model.setAbsoluteRotationXYZ
            (
                0.0,
                this.rotY,
                0.0
            );

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
                if ( this.model.intersects( modelToCheck ) )
                {
                    this.pick();
                }
            }
        }

        /** ************************************************************************************************************
        *   Being invoked when this game object is hurt by a shot or any other impact source.
        ***************************************************************************************************************/
        public hurt() : void
        {
        }

        /** ************************************************************************************************************
        *   Flags this item picked and makes it invisible.
        ***************************************************************************************************************/
        private pick() : void
        {
            bz.Debug.item.log( 'Item picked' );

            this.picked = true;

            this.model.setVisible( false );
        }
    }


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
        *   @param stage The stage this item belongs to.
        *   @param model The model that represents this item.
        ***************************************************************************************************************/
        public constructor( stage:bz.Stage, model:bz.Model )
        {
            super( stage, model, bz.GameObject.UNBREAKABLE );
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // invoke parent method
            super.render();

            // check if picked by player
            if ( this.checkPick( this.stage.getPlayer().getModel() ) )
            {
                this.stage.game.getGUI().addGuiFx( bz.GUIFxType.GAIN_ENERGY );
            }

            // testwise rotate this item
            if ( !this.picked )
            {
                this.model.setAbsoluteRotationXYZ
                (
                    0.0,
                    this.rotY,
                    0.0
                );
                this.rotY += 0.5;
            }
        }

        /** ************************************************************************************************************
        *   Checks if this item is picked by colliding with the specified model.
        *
        *   @param modelToCheck The model to check for collision with this item.
        *
        *   @return <code>true</code> if this item was picked.
        ***************************************************************************************************************/
        private checkPick( modelToCheck:bz.Model ) : boolean
        {
            if ( !this.picked )
            {
                if ( this.model.intersects( modelToCheck ) )
                {
                    this.pick();

                    return true;
                }
            }

            return false;
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

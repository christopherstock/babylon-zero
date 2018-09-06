
    import * as bz      from '../..';

    /** ****************************************************************************************************************
    *   Represents a static OR movable wall object.
    *******************************************************************************************************************/
    export class Wall extends bz.GameObject
    {
        /** An energy amount that represents that this will is unbreakable. */
        public      static  readonly        UNBREAKABLE             :number                             = -1;

        /** The current energy of this wall. */
        private                             energy                  :number                             = 0;
        /** Flags if this wall is broken. */
        private                             destroyed               :boolean                            = false;

        /** ************************************************************************************************************
        *   Creates a new wall instance.
        *
        *   @param model  The model that represents this wall.
        *   @param energy The initial energy of this wall.
        ***************************************************************************************************************/
        public constructor( model:bz.Model, energy:number = Wall.UNBREAKABLE )
        {
            super( model );

            this.energy = energy;
        }

        /** ************************************************************************************************************
        *   Being invoked when this game object is hurt by a shot or any other impact source.
        ***************************************************************************************************************/
        public hurt() : void
        {
            // exit if unbreakable
            if ( this.energy === Wall.UNBREAKABLE )
            {
                bz.Debug.fire.log( 'Wall is unbreakable.' );
                return;
            }

            // exit if already destroyed
            if ( this.destroyed )
            {
                bz.Debug.fire.log( 'Wall is already destroyed.' );
                return;
            }

            // lower energy
            this.energy -= 1;
            bz.Debug.fire.log( 'Wall got hurt - new energy is [' + this.energy + ']' );

            // check if the wall is destoyed now
            if ( this.energy <= 0 )
            {
                // flag as destroyed
                this.destroyed = true;
                bz.Debug.fire.log( 'Wall is destroyed.' );

                // scatter the model
                this.model.removeCompoundParent( bz.Main.game.engine.scene.getScene() );
            }
        }
    }

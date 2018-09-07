
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a character being controlled by the cpu.
    *******************************************************************************************************************/
    export class Bot extends bz.GameObject
    {
        /** ************************************************************************************************************
        *   Creates a new bot instance.
        *
        *   @param model The model that represents this bot.
        ***************************************************************************************************************/
        public constructor( model:bz.Model )
        {
            super( model, bz.GameObject.UNBREAKABLE );
        }
    }


    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a character being controlled by the cpu.
    *******************************************************************************************************************/
    export class Bot extends bz.GameObject
    {
        /** ************************************************************************************************************
        *   Creates a new bot instance.
        *
        *   @param stage The stage this bot belongs to.
        *   @param model The model that represents this bot.
        ***************************************************************************************************************/
        public constructor( stage:bz.Stage, model:bz.Model )
        {
            super( stage, model, bz.GameObject.UNBREAKABLE );
        }
    }

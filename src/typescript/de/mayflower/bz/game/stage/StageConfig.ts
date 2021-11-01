
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a stage config that helps to centralize some config values.
    *******************************************************************************************************************/
    export class StageConfig
    {
        protected           readonly        playerStartPoint                    :BABYLON.Vector3                = null;

        /** ************************************************************************************************************
        *   Creates a new stage config.
        *
        *   @param playerStartPoint The starting point for the player.
        ***************************************************************************************************************/
        protected constructor
        (
            playerStartPoint :BABYLON.Vector3
        )
        {
            this.playerStartPoint = playerStartPoint;
        }
    }

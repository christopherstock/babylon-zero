
    import * as bz from '../../../index';

    /** ****************************************************************************************************************
    *   Represents the game entity being controlled by the user.
    *******************************************************************************************************************/
    export abstract class Player extends bz.GameObject
    {
        /** ************************************************************************************************************
        *   Returns the player's target mesh for the first person camera.
        *
        *   @return The player's mesh to set the first person camera into.
        ***************************************************************************************************************/
        public abstract getFirstPersonCameraTargetMesh() : BABYLON.AbstractMesh;

        /** ************************************************************************************************************
        *   Returns the player's target mesh for the third person camera.
        *
        *   @return The player's mesh to set as a target for the third person camera.
        ***************************************************************************************************************/
        public abstract getThirdPersonCameraTargetMesh() : BABYLON.AbstractMesh;
    }

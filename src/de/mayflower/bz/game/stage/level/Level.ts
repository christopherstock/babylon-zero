
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Specifies a level of the game that contains a controllable player and all typical game objects.
    *******************************************************************************************************************/
    export abstract class Level extends bz.Stage
    {
        /** ************************************************************************************************************
        *   Creates a new level.
        *
        *   @param scene        The babylon.JS scene reference.
        *   @param ambientColor The ambient color of the level is the emissive color for all faces.
        *   @param clearColor   The clear color of the level is the background color of the scene.
        ***************************************************************************************************************/
        protected constructor
        (
            scene        :BABYLON.Scene,
            ambientColor :BABYLON.Color3,
            clearColor   :BABYLON.Color4
        )
        {
            super
            (
                scene,
                ambientColor,
                clearColor
            );
        }
    }

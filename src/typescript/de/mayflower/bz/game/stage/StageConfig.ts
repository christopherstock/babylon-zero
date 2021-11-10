import * as bz from '../..';

/** ********************************************************************************************************************
*   One stage config.
***********************************************************************************************************************/
export abstract class StageConfig
{
    /** Specifies the ambient color of the babylon.JS scene and is set as the emissive color of all faces. */
    protected           readonly        ambientColor            :BABYLON.Color3                         = null;
    /** The scene background color is the clear color for the scene. */
    protected           readonly        sceneBgColor            :BABYLON.Color4                         = null;
    /** The initial camera to set for this stage. */
    protected           readonly        initialCamera           :bz.CameraType                          = null;

    /** ****************************************************************************************************************
    *   Creates a stage config.
    *
    *   @param ambientColor  The ambient color of the babylon.JS scene that is set as EMISSIVE color for all faces.
    *   @param sceneBgColor  The background color of the babylon.JS scene.
    *   @param initialCamera The initial camera for this stage.
    *******************************************************************************************************************/
    protected constructor
    (
        ambientColor  :BABYLON.Color3,
        sceneBgColor  :BABYLON.Color4,
        initialCamera :bz.CameraType
    )
    {
        this.ambientColor  = ambientColor;
        this.sceneBgColor  = sceneBgColor;
        this.initialCamera = initialCamera;
    }
}

import * as bz from '../..';

/** ********************************************************************************************************************
*   One stage config.
***********************************************************************************************************************/
export class StageConfig
{
    /** Specifies the ambient color of the babylon.JS scene and is set as the emissive color of all faces. */
    public readonly ambientColor     :BABYLON.Color3    = null;
    /** The scene background color is the clear color for the scene. */
    public readonly sceneBgColor     :BABYLON.Color4    = null;
    /** The initial camera to set for this stage. */
    public readonly initialCamera    :bz.CameraType     = null;
    /** The player startup position. */
    public          startupPosition  :BABYLON.Vector3   = null;
    /** The player startup rotation. */
    public          startupRotation  :BABYLON.Vector3   = null;
    public          startupInventory :bz.Inventory      = null;

    /** ****************************************************************************************************************
    *   Creates a stage config.
    *
    *   @param ambientColor     The ambient color of the babylon.JS scene that is set as EMISSIVE color for all faces.
    *   @param sceneBgColor     The background color of the babylon.JS scene.
    *   @param initialCamera    The initial camera for this stage.
    *   @param startupPosition  The player startup position.
    *   @param startupRotation  The player startup rotation.
    *   @param startupInventory The player startup inventory.
    *******************************************************************************************************************/
    public constructor
    (
        ambientColor     :BABYLON.Color3,
        sceneBgColor     :BABYLON.Color4,
        initialCamera    :bz.CameraType,
        startupPosition  :BABYLON.Vector3 = new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
        startupRotation  :BABYLON.Vector3 = new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
        startupInventory :bz.Inventory    = new bz.Inventory()
    )
    {
        this.ambientColor     = ambientColor;
        this.sceneBgColor     = sceneBgColor;
        this.initialCamera    = initialCamera;
        this.startupPosition  = startupPosition;
        this.startupRotation  = startupRotation;
        this.startupInventory = startupInventory;
    }
}
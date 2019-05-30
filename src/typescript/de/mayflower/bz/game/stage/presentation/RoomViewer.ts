
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   The 'room viewer' stage offers an 3D view in an virtual room being textured by a spherical texture.
    *******************************************************************************************************************/
    export class RoomViewer extends bz.Stage
    {
        /** ************************************************************************************************************
        *   Creates a new room viewer stage.
        *
        *   @param scene  The scene reference.
        *   @param canvas The canvas this stage is displayed on.
        ***************************************************************************************************************/
        public constructor( scene:bz.Scene, canvas:bz.CanvasSystem )
        {
            super
            (
                scene,
                canvas,

                bz.SettingColor.COLOR_RGB_BLACK,
                bz.SettingColor.COLOR_RGBA_BLACK_OPAQUE,
                bz.CameraType.FREE_DEBUG
            );
        }

        /** ************************************************************************************************************
        *   Sets up the player for this stage.
        *
        *   @return The player instance for this stage.
        ***************************************************************************************************************/
        protected createPlayer() : bz.Player
        {
            return null;
        }

        /** ************************************************************************************************************
        *   Creates the camera system that manages all cameras that appear in this level.
        *
        *   @return The camera system for this stage.
        ***************************************************************************************************************/
        protected createCameraSystem() : bz.CameraSystem
        {
            return new bz.CameraSystem
            (
                this.scene.getNativeScene(),
                this.canvas.getNativeCanvas(),

                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                new BABYLON.Vector3( 1.0, 0.0, 0.0 ),

                new BABYLON.Vector3( 1.0, 0.0, 0.0 ),
                null,
                null,
                null
            );
        }

        /** ************************************************************************************************************
        *   Creates and returns all walls this stage consists of.
        *
        *   @return All walls of this stage.
        ***************************************************************************************************************/
        protected createWalls() : bz.Wall[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates and returns all items this stage consists of.
        *
        *   @return All items of this stage.
        ***************************************************************************************************************/
        protected createItems() : bz.Item[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates and returns all bots this stage consists of.
        *
        *   @return All bots of this stage.
        ***************************************************************************************************************/
        protected createBots() : bz.Bot[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        *
        *   @param keySystem The key system to use for key determination.
        ***************************************************************************************************************/
        protected handleLevelKeys( keySystem:bz.KeySystem ) : void
        {
        }

        /** ************************************************************************************************************
        *   Sets up the skybox.
        *
        *   @return The created skybox for this stage.
        ***************************************************************************************************************/
        protected createSkybox() : BABYLON.Mesh
        {
            return bz.MeshFactory.createSkyBoxSphere( this.scene.getNativeScene(), bz.SkyBoxFile.DINING_ROOM, 1.0 );
        }

        /** ************************************************************************************************************
        *   Creates all sprites that appear in the stage.
        *
        *   @return All sprites that appear in this stage.
        ***************************************************************************************************************/
        protected createSprites() : bz.Sprite[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates all lights that appear in this level.
        *
        *   @return All lights that appear in this stage.
        ***************************************************************************************************************/
        protected createLights() : BABYLON.Light[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates all shadow generators that appear in this level.
        *
        *   @return All shadow generators that appear in this stage.
        ***************************************************************************************************************/
        protected createShadowGenerators() : BABYLON.ShadowGenerator[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected setupShadows() : void
        {
        }

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected setupFog() : void
        {
            this.scene.enableFog( null, 0.0 );
        }

        /** ************************************************************************************************************
        *   Sets up the pointer callback.
        ***************************************************************************************************************/
        protected createPointerCallback() : ( evt:PointerEvent, pickResult:BABYLON.PickingInfo ) => void
        {
            return null;
        }

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected onInitComplete() : void
        {
        }

        /** ************************************************************************************************************
        *   Creates the GUI for this stage.
        *
        *   @return The created GUI.
        ***************************************************************************************************************/
        protected createGUI() : bz.GUI
        {
            const gui:bz.GUIGame = new bz.GUIGame( this.scene.getNativeScene() );
            gui.init();

            return gui;
        }
    }

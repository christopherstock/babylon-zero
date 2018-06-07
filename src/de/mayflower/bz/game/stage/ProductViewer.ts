
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   The 'product viewer' stage offers an exploration of a 3D model that can be viewed from all angles.
    *******************************************************************************************************************/
    export class ProductViewer extends bz.Stage
    {
        /** ************************************************************************************************************
        *   Creates a new product viewer stage.
        *
        *   @param scene The babylon.JS scene reference.
        ***************************************************************************************************************/
        public constructor( scene:BABYLON.Scene )
        {
            super
            (
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                scene
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
        *   Creates and returns all walls this stage consists of.
        *
        *   @return All walls of this stage.
        ***************************************************************************************************************/
        protected createWalls() : bz.Wall[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates and returns all movables this stage consists of.
        *
        *   @return All movables of this stage.
        ***************************************************************************************************************/
        protected createMovables() : bz.Movable[]
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
        *   Creates and returns all imported meshes this stage consists of.
        *
        *   @return All imported meshes of this stage.
        ***************************************************************************************************************/
        protected createImportedMeshes() : BABYLON.Mesh[][]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Sets up the skybox.
        *
        *   @return The created skybox for this stage.
        ***************************************************************************************************************/
        protected createSkybox() : BABYLON.Mesh
        {
            return null;
        }

        /** ************************************************************************************************************
        *   Creates all sprites that appear in the stage.
        *
        *   @return All sprites that appear in this stage.
        ***************************************************************************************************************/
        protected createSprites() : BABYLON.Sprite[]
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
        *   Creates the camera system that manages all cameras that appear in this level.
        *
        *   @return The camera system for this stage.
        ***************************************************************************************************************/
        protected createCameraSystem() : bz.CameraSystem
        {
            return new bz.CameraSystem
            (
                this.scene,
                this.player,
                bz.Main.game.engine.canvas.getCanvas(),
                new BABYLON.Vector3( 20.0, 5.0, 20.0 ),
                new BABYLON.Vector3( 20.0, 5.0, 20.0 ),
                new BABYLON.Vector3( 0.0,  0.0, 0.0  ),
                null,
                null,
                null,
                bz.CameraType.FREE_DEBUG
            );
        }
    }

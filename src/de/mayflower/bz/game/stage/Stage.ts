
    import * as bz          from '../..';
    import * as BABYLON     from 'babylonjs';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   Represents a custom stage set.
    *******************************************************************************************************************/
    export abstract class Stage
    {
        /** The fullscreen gui in foreground. */
        public                              guiFg                   :BABYLON_GUI.AdvancedDynamicTexture     = null;
        /** The fullscreen gui in background. */
        protected                           guiBg                   :BABYLON_GUI.AdvancedDynamicTexture     = null;

        /** The reference to the babylon.JS Scene. */
        protected           readonly        scene                   :BABYLON.Scene                          = null;

        /** The ambient color of this stage is the emissive color of all mesh materials. */
        protected           readonly        ambientColor            :BABYLON.Color3                         = null;

        /** The clear color of this stage is the background color of all mesh materials. */
        protected           readonly        clearColor              :BABYLON.Color4                         = null;

        /** A collection of the coordinate axis in this stage. */
        protected                           coordinateAxis          :BABYLON.Mesh[]                         = [];
        /** The skybox that surrounds the whole stage. */
        protected                           skybox                  :BABYLON.Mesh                           = null;

        /** The player instance. */
        protected                           player                  :bz.Player                              = null;
        /** A collection of all walls in this stage. */
        protected                           walls                   :bz.Wall[]                              = [];
        /** A collection of all items in this stage. */
        protected                           items                   :bz.Item[]                              = [];
        /** A collection of all movables in this stage. */
        protected                           movables                :bz.Movable[]                           = [];
        /** A collection of all bots in this stage. */
        protected                           bots                    :bz.Bot[]                               = [];

        /** A collection of all sprites that appear in this stage. */
        protected                           sprites                 :BABYLON.Sprite[]                       = [];
        /** A collection of all lights that appear in this stage. */
        protected                           lights                  :BABYLON.Light[]                        = [];
        /** A collection of all shadowGenerators that appear in this stage. */
        protected                           shadowGenerators        :BABYLON.ShadowGenerator[]              = [];
        /** The camera system that manages all scene cameras. */
        protected                           cameraSystem            :bz.CameraSystem                        = null;
        /** A collection of all imported meshes in this stage. */
        protected                           importedModels          :bz.Model[]                             = [];

        /** ************************************************************************************************************
        *   Creates a new custom stage.
        *
        *   @param scene        The babylon.JS scene reference.
        *   @param ambientColor The ambient color of the stage is the emissive color for all faces.
        *   @param clearColor   The clear color of the stage is the background color of the scene.
        ***************************************************************************************************************/
        protected constructor
        (
            scene        :BABYLON.Scene,
            ambientColor :BABYLON.Color3,
            clearColor   :BABYLON.Color4
        )
        {
            this.scene        = scene;
            this.ambientColor = ambientColor;
            this.clearColor   = clearColor;
        }

        /** ************************************************************************************************************
        *   Inits the stage.
        ***************************************************************************************************************/
        public init() : void
        {
            this.scene.ambientColor = this.ambientColor;
            this.scene.clearColor   = this.clearColor;
            this.player             = this.createPlayer();

            if ( bz.SettingDebug.SHOW_COORDINATE_AXIS )
            {
                this.coordinateAxis = this.createCoordinalAxis();
            }

            this.walls          = this.createWalls();
            this.movables       = this.createMovables();
            this.items          = this.createItems();
            this.bots           = this.createBots();
            this.importedModels = this.createImportedMeshes();
            this.skybox         = this.createSkybox();
            this.sprites        = this.createSprites();

            this.cameraSystem   = this.createCameraSystem();

            this.lights         = this.createLights();

            if ( bz.SettingEngine.ENABLE_SHADOWS )
            {
                this.shadowGenerators = this.createShadowGenerators();
                this.setupShadows();
            }

            this.createGuis();
            this.adjustGuiSizeToCanvasSize();

            this.onInitComplete();
        }

        /** ************************************************************************************************************
        *   Returns the player instance.
        *
        *   @return The player instance.
        ***************************************************************************************************************/
        public getPlayer() : bz.Player
        {
            return this.player;
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // render player if existent
            if ( this.player != null )
            {
                this.player.handlePlayerKeys();
                this.player.render();
            }

            // render all items
            for ( const item of this.items )
            {
                item.render();

                // check item pick by player
                item.checkPick( this.player.getModel() );
            }
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        ***************************************************************************************************************/
        public abstract handleLevelKeys() : void;

        /** ************************************************************************************************************
        *   Removes all meshes of this level.
        ***************************************************************************************************************/
        public unload() : void
        {
            // dispose player
            if ( this.player != null )
            {
                this.player.dispose();
            }

            // dispose coordinate axis
            for ( const mesh of this.coordinateAxis )
            {
                mesh.dispose();
            }

            // dispose all walls
            for ( const wall of this.walls )
            {
                wall.dispose();
            }

            // dispose all movables
            for ( const movable of this.movables )
            {
                movable.dispose();
            }

            // dispose all items
            for ( const item of this.items )
            {
                item.dispose();
            }

            // dispose all bots
            for ( const bot of this.bots )
            {
                bot.dispose();
            }

            // dispose all imported meshes
            for ( const model of this.importedModels )
            {
                model.dispose();
            }

            // dispose skybox
            if ( this.skybox != null )
            {
                this.skybox.dispose();
            }

            // dispose sprites
            for ( const sprite of this.sprites )
            {
                sprite.dispose();
            }

            // dispose lights
            for ( const light of this.lights )
            {
                light.dispose();
            }

            // dispose shadow generators
            for ( const shadowGenerator of this.shadowGenerators )
            {
                shadowGenerator.dispose();
            }

            // dispose camera system
            this.cameraSystem.dispose();

            // dispose GUIs
            if ( this.guiFg != null )
            {
                this.guiFg.dispose();
            }
            if ( this.guiBg != null )
            {
                this.guiBg.dispose();
            }
        }

        /** ************************************************************************************************************
        *   Returns this stage's camera system.
        *
        *   @return The camera system of this stage.
        ***************************************************************************************************************/
        public getCameraSystem() : bz.CameraSystem
        {
            return this.cameraSystem;
        }

        /** ************************************************************************************************************
        *   Sets the active camera for this stage.
        ***************************************************************************************************************/
        public setActiveCamera( cameraId:bz.CameraType ) : void
        {
            this.cameraSystem.setActiveCamera
            (
                bz.Main.game.engine.scene.getScene(),
                cameraId,
                this.player
            );
        }

        /** ************************************************************************************************************
        *   Resizes fg and bg GUIs so they fit the current canvas size.
        ***************************************************************************************************************/
        public adjustGuiSizeToCanvasSize() : void
        {
            // assign canvas dimensions
            const canvasWidth  :number = bz.Main.game.engine.canvas.getWidth();
            const canvasHeight :number = bz.Main.game.engine.canvas.getHeight();

            if ( this.guiFg != null )
            {
                this.guiFg.idealWidth  = canvasWidth;
                this.guiFg.idealHeight = canvasHeight;
                this.guiFg.scaleTo( canvasWidth, canvasHeight );
            }
            if ( this.guiBg != null )
            {
                this.guiBg.idealWidth  = canvasWidth;
                this.guiBg.idealHeight = canvasHeight;
                this.guiBg.scaleTo( canvasWidth, canvasHeight );
            }
        }

        /** ************************************************************************************************************
        *   Sets up the player for this stage.
        *
        *   @return The player instance for this stage.
        ***************************************************************************************************************/
        protected abstract createPlayer() : bz.Player;

        /** ************************************************************************************************************
        *   Creates and returns all walls this stage consists of.
        *
        *   @return All walls of this stage.
        ***************************************************************************************************************/
        protected abstract createWalls() : bz.Wall[];

        /** ************************************************************************************************************
        *   Creates and returns all movables this stage consists of.
        *
        *   @return All movables of this stage.
        ***************************************************************************************************************/
        protected abstract createMovables() : bz.Movable[];

        /** ************************************************************************************************************
        *   Creates and returns all items this stage consists of.
        *
        *   @return All items of this stage.
        ***************************************************************************************************************/
        protected abstract createItems() : bz.Item[];

        /** ************************************************************************************************************
        *   Creates and returns all bots this stage consists of.
        *
        *   @return All bots of this stage.
        ***************************************************************************************************************/
        protected abstract createBots() : bz.Bot[];

        /** ************************************************************************************************************
        *   Creates and returns all imported models this stage consists of.
        *
        *   @return All imported models of this stage.
        ***************************************************************************************************************/
        protected abstract createImportedMeshes() : bz.Model[];

        /** ************************************************************************************************************
        *   Sets up the skybox.
        *
        *   @return The created skybox for this stage.
        ***************************************************************************************************************/
        protected abstract createSkybox() : BABYLON.Mesh;

        /** ************************************************************************************************************
        *   Creates all sprites that appear in the stage.
        *
        *   @return All sprites that appear in this stage.
        ***************************************************************************************************************/
        protected abstract createSprites() : BABYLON.Sprite[];

        /** ************************************************************************************************************
        *   Creates all lights that appear in this level.
        *
        *   @return All lights that appear in this stage.
        ***************************************************************************************************************/
        protected abstract createLights() : BABYLON.Light[];

        /** ************************************************************************************************************
        *   Creates all shadow generators that appear in this level.
        *
        *   @return All shadow generators that appear in this stage.
        ***************************************************************************************************************/
        protected abstract createShadowGenerators() : BABYLON.ShadowGenerator[];

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected abstract setupShadows() : void

        /** ************************************************************************************************************
        *   Creates the camera system that manages all cameras that appear in this level.
        *
        *   @return The camera system for this stage.
        ***************************************************************************************************************/
        protected abstract createCameraSystem() : bz.CameraSystem;

        /** ************************************************************************************************************
        *   Creates the GUIs for this stage.
        ***************************************************************************************************************/
        protected abstract createGuis() : void;

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected abstract onInitComplete() : void;

        /** ************************************************************************************************************
        *   Sets up the coordinal axis lines. X Y and Z axes are aligned by the LEFT HAND RULE.
        *
        *   @return A collection of all meshes that build the coordinal axis lines.
        ***************************************************************************************************************/
        private createCoordinalAxis() : BABYLON.Mesh[]
        {
            return [

                // axis x
                bz.MeshFactory.createLine
                (
                    new BABYLON.Vector3( 0.0,  0.0, 0.0 ),
                    new BABYLON.Vector3( bz.SettingDebug.DEBUG_AXIS_LENGTH, 0.0, 0.0 ),
                    bz.MeshPivotAnchor.LOWEST_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingColor.COLOR_RGBA_RED_OPAQUE,
                    this.scene
                ),

                // axis y
                bz.MeshFactory.createLine
                (
                    new BABYLON.Vector3( 0.0, 0.0,  0.0 ),
                    new BABYLON.Vector3( 0.0, bz.SettingDebug.DEBUG_AXIS_LENGTH, 0.0 ),
                    bz.MeshPivotAnchor.LOWEST_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingColor.COLOR_RGBA_GREEN_OPAQUE,
                    this.scene
                ),

                // axis z
                bz.MeshFactory.createLine
                (
                    new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                    new BABYLON.Vector3( 0.0, 0.0, bz.SettingDebug.DEBUG_AXIS_LENGTH ),
                    bz.MeshPivotAnchor.LOWEST_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingColor.COLOR_RGBA_BLUE_OPAQUE,
                    this.scene
                ),
            ];
        }
    }

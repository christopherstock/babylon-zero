
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Manages all game engine components.
    *******************************************************************************************************************/
    export class Engine
    {
        /** The canvas system. */
        public                      canvas                      :bz.CanvasSystem                    = null;
        /** The singleton scene. */
        public                      scene                       :bz.Scene                           = null;

        /** The material system. */
        public                      materialSystem              :bz.MaterialSystem                  = null;
        /** The sprite system. */
        public                      spriteSystem                :bz.SpriteSystem                    = null;
        /** The mesh import system. */
        public                      modelImportSystem           :bz.ModelImportSystem               = null;
        /** The key system. */
        public                      keySystem                   :bz.KeySystem                       = null;
        /** The pointer system. */
        public                      pointerSystem               :bz.PointerSystem                   = null;
        /** The sound system. */
        public                      soundSystem                 :bz.SoundSystem                     = null;

        /** The babylon.JS engine. */
        private                     babylonEngine               :BABYLON.Engine                     = null;
        /** The custom loading screen. */
        private                     loadingScreen               :bz.LoadingScreen                   = null;

        /** ************************************************************************************************************
        *   Inits all components of the game engine.
        ***************************************************************************************************************/
        public init() : void
        {
            bz.Debug.init.log( 'Init canvas' );
            this.canvas = new bz.CanvasSystem();
            this.canvas.updateDimensions();

            // create custom loading screen
            this.loadingScreen = new bz.LoadingScreen( this.canvas.getCanvas() );

            // init babylon.JS engine, set and show custom loading screen
            bz.Debug.init.log( 'Init babylon.JS engine' );
            this.babylonEngine = new BABYLON.Engine( this.canvas.getCanvas(), true );
            if ( bz.SettingEngine.CUSTOM_LOADING_SCREEN )
            {
                this.babylonEngine.loadingScreen = this.loadingScreen;
            }
            this.babylonEngine.displayLoadingUI();

            // set collision epsilon
            BABYLON.Engine.CollisionsEpsilon = bz.SettingEngine.COLLISION_EPSILON_SIZE;

            // add resize event listener
            bz.Debug.init.log( 'Init window resize handler' );
            window.addEventListener( 'resize', this.onWindowResize );

            // create key and pointer system
            this.keySystem     = new bz.KeySystem();
            this.pointerSystem = new bz.PointerSystem();

            // set the window blur handler
            bz.Debug.init.log( 'Initing window blur handler' );
            window.addEventListener( 'blur', this.onWindowBlur );

            // create the scene singleton
            bz.Debug.init.log( 'Init scene' );
            this.scene = new bz.Scene();
            this.scene.init( this.babylonEngine );

            // assign pointer debug controls to scene
            bz.Debug.init.log( 'Assign controls to camera' );
            this.scene.assignControls();

            // init materials
            bz.Debug.init.log( 'Init materials' );
            this.materialSystem = new bz.MaterialSystem();
            this.materialSystem.init( this.scene.getScene() );

            // init sprites
            bz.Debug.init.log( 'Init sprites' );
            this.spriteSystem = new bz.SpriteSystem();
            this.spriteSystem.init();

            // init sounds
            bz.Debug.init.log( 'Init sounds' );
            this.soundSystem = new bz.SoundSystem( bz.SoundFile.ALL_SOUND_FILES, this.onSoundsLoaded );
            this.soundSystem.loadSounds();
        }

        /** ************************************************************************************************************
        *   Returns the current FPS of the babylon.JS engine.
        *
        *   @return The current Frames Per Second as a floating number.
        ***************************************************************************************************************/
        public getFps() : number
        {
            return this.babylonEngine.getFps();
        }

        /** ************************************************************************************************************
        *   Sets the visibility for the babylon.JS engine's loading UI.
        *
        *   @param visible Whether to show or to hide the loading UI.
        ***************************************************************************************************************/
        public setLoadingUiVisibility( visible:boolean ) : void
        {
            if ( visible )
            {
                bz.Debug.stage.log( 'Showing loading UI' );

                this.babylonEngine.displayLoadingUI();
            }
            else
            {
                bz.Debug.init.log( 'Hiding loading UI' );

                this.babylonEngine.hideLoadingUI();
            }
        }

        /** ************************************************************************************************************
        *   Sets the execution for the babylon.JS engine's render loop.
        *
        *   @param active     Whether to start or to stop the render loop.
        *   @param renderLoop The method to execute as the render loop.
        ***************************************************************************************************************/
        public setRenderLoopExecution( active:boolean, renderLoop:() => void ) : void
        {
            if ( active )
            {
                bz.Debug.init.log( 'Starting render loop' );

                this.babylonEngine.runRenderLoop( renderLoop );
            }
            else
            {
                bz.Debug.stage.log( 'Stopping render loop' );

                this.babylonEngine.stopRenderLoop( renderLoop );
            }
        }

        /** ************************************************************************************************************
        *   Being invoked when all sounds are loaded completely.
        ***************************************************************************************************************/
        private onSoundsLoaded=() : void =>
        {
            // init model importer
            bz.Debug.init.log( 'Init model importer' );
            this.modelImportSystem = new bz.ModelImportSystem
            (
                bz.ModelFile.ALL_MESH_FILES,
                bz.Main.game.onInitGameEngineCompleted
            );
            this.modelImportSystem.loadModels( this.scene.getScene() );
        };

        /** ************************************************************************************************************
        *   Being invoked when the size of the browser window is changed.
        ***************************************************************************************************************/
        private onWindowResize=() : void =>
        {
            // resize loading screen
            this.loadingScreen.resizeLoadingDivToCanvasDimensions();

            // update canvas dimensions and check if they actually changed
            const dimensionsChanged:boolean = this.canvas.updateDimensions();

            if ( dimensionsChanged )
            {
                // resize GUIs
                if ( bz.Main.game.stage != null )
                {
                    bz.Main.game.stage.adjustGuiSizeToCanvasSize();
                }

                // resize babylon.JS
                this.babylonEngine.resize();
            }
        };

        /** ************************************************************************************************************
        *   Being invoked when the browser window loses the application focue.
        ***************************************************************************************************************/
        private onWindowBlur=() : void =>
        {
            bz.Debug.canvas.log( 'Detected window focus lost - Releasing all keys' );
            this.keySystem.releaseAllKeys();
        }
    }


    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Manages all game engine components.
    *******************************************************************************************************************/
    export class Engine
    {
        /** The canvas system. */
        public                      canvas                      :bz.CanvasSystem                    = null;
        /** The material system. */
        public                      material                    :bz.MaterialSystem                  = null;
        /** The singleton scene. */
        public                      scene                       :bz.Scene                           = null;
        /** The sprite system. */
        public                      sprite                      :bz.Sprite                          = null;
        /** The mesh import system. */
        public                      meshImporter                :bz.ModelImportSystem               = null;
        /** The key system. */
        public                      keySystem                   :bz.KeySystem                       = null;
        /** The pointer system. */
        public                      pointerSystem               :bz.PointerSystem                   = null;
        /** The custom loading screen. */
        public                      loadingScreen               :bz.LoadingScreen                   = null;

        /** The babylon.JS engine. */
        public                      babylonEngine               :BABYLON.Engine                     = null;

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
            bz.Debug.init.log( 'Init babylon.JS engine.' );
            this.babylonEngine = new BABYLON.Engine( this.canvas.getCanvas(), true );
            if ( bz.SettingEngine.CUSTOM_LOADING_SCREEN )
            {
                this.babylonEngine.loadingScreen = this.loadingScreen;
            }
            this.babylonEngine.displayLoadingUI();

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
            this.scene.init();

            // assign pointer debug controls to scene
            bz.Debug.init.log( 'Assign controls to camera' );
            this.scene.assignControls();

            // init materials
            bz.Debug.init.log( 'Init materials' );
            this.material = new bz.MaterialSystem();
            this.material.init();

            // init sprites
            bz.Debug.init.log( 'Init sprites' );
            this.sprite = new bz.Sprite();
            this.sprite.init();

            // init mesh importer
            bz.Debug.init.log( 'Init mesh importer' );
            this.meshImporter = new bz.ModelImportSystem
            (
                bz.MeshImport.ALL_MESH_FILES,
                bz.Main.game.onInitGameEngineCompleted
            );
            this.meshImporter.loadModels( this.scene.getScene() );
        }

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
            bz.Debug.canvas.log( 'Detected window focus lost. Releasing all keys.' );
            this.keySystem.releaseAllKeys();
        }
    }

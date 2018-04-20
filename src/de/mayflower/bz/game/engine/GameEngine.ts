
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Manages all game engine components.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class GameEngine
    {
        /** The WebGL canvas context. */
        public                      canvas                      :bz.CanvasSystem            = null;
        /** The babylon.JS engine. */
        public                      babylonEngine               :BABYLON.Engine             = null;

        /** The current babylon.JS scene. */
        public                      scene                       :BABYLON.Scene              = null;
        /** The material system. */
        public                      material                    :bz.Material                = null;
        /** The sprite manager. */
        public                      spriteManager               :BABYLON.SpriteManager      = null;
        /** The camera manager. */
        public                      camera                      :bz.Camera                  = null;
        /** The pointer system. */
        public                      pointer                     :bz.Pointer                 = null;

        /***************************************************************************************************************
        *   Inits all components for the game engine.
        ***************************************************************************************************************/
        public init()
        {
            bz.Debug.init.log( "Initializing canvas" );
            this.canvas = new bz.CanvasSystem();
            this.canvas.updateDimensions();

            bz.Debug.init.log( "Initializing babylon.JS engine." );
            this.babylonEngine = new BABYLON.Engine( this.canvas.getCanvas(), true );
            this.babylonEngine.displayLoadingUI();

            //add resize event listener
            window.addEventListener(
                "resize",
                function () {
                    bz.Main.game.engine.canvas.updateDimensions();
                    bz.Main.game.engine.babylonEngine.resize();
                }
            );


            // create pointer system
            this.pointer = new bz.Pointer();

            // create camera system
           this.camera = new bz.Camera();

            //create the scene
            bz.Debug.init.log( "Creating the Scene" );
            this.scene = new BABYLON.Scene( this.babylonEngine );

            //init materials
            bz.Debug.init.log( "Init all materials" );
            this.material = new bz.Material();
            this.material.initMaterials( this.scene );

            //init sprite manager
            bz.Debug.init.log( "Init the sprite manager" );
            this.spriteManager = new BABYLON.SpriteManager( "treesManager", bz.SettingEngine.PATH_IMAGE_TEXTURE + "tree.png", 100, 357, bz.Main.game.engine.scene );

            //setup physics
            bz.Debug.init.log( "Setup all physics" );
            this.scene.enablePhysics( null, new BABYLON.OimoJSPlugin() );
        }
    }

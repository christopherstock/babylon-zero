
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Manages all game engine components.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class GameEngine
    {
        /** The canvas system. */
        public                      canvas                      :bz.CanvasSystem            = null;
        /** The material system. */
        public                      material                    :bz.Material                = null;
        /** The camera system. */
        public                      camera                      :bz.Camera                  = null;
        /** The pointer system. */
        public                      pointer                     :bz.Pointer                 = null;
        /** The scene system. */
        public                      scene                       :bz.Scene                   = null;
        /** The sprite system. */
        public                      sprite                      :bz.Sprite                  = null;

        /** The babylon.JS engine. */
        public                      babylonEngine               :BABYLON.Engine             = null;

        /***************************************************************************************************************
        *   Inits all components for the game engine.
        ***************************************************************************************************************/
        public init()
        {
            bz.Debug.init.log( "Init canvas" );
            this.canvas = new bz.CanvasSystem();
            this.canvas.updateDimensions();

            bz.Debug.init.log( "Init babylon.JS engine." );
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
            bz.Debug.init.log( "Init scene" );
            this.scene = new bz.Scene();
            this.scene.init();

            //init materials
            bz.Debug.init.log( "Init materials" );
            this.material = new bz.Material();
            this.material.initMaterials( this.scene.babylonScene );

            //init sprites
            bz.Debug.init.log( "Init sprites" );
            this.sprite = new bz.Sprite();
            this.sprite.init();
        }
    }

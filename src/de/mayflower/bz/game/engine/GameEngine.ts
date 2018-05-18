
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Manages all game engine components.
    *******************************************************************************************************************/
    export class GameEngine
    {
        /** The canvas system. */
        public                      canvas                      :bz.CanvasSystem            = null;
        /** The material system. */
        public                      material                    :bz.MaterialSystem          = null;
        /** The scene system. */
        public                      scene                       :bz.Scene                   = null;
        /** The sprite system. */
        public                      sprite                      :bz.Sprite                  = null;
        /** The key system. */
        public                      keySystem                   :bz.KeySystem               = null;
        /** The pointer system. */
        public                      pointerSystem               :bz.PointerSystem           = null;

        /** The babylon.JS engine. */
        public                      babylonEngine               :BABYLON.Engine             = null;

        /** ************************************************************************************************************
        *   Inits all components of the game engine.
        ***************************************************************************************************************/
        public init() : void
        {
            bz.Debug.init.log( 'Init canvas' );
            this.canvas = new bz.CanvasSystem();
            this.canvas.updateDimensions();

            // init babylon.JS engine
            bz.Debug.init.log( 'Init babylon.JS engine.' );
            this.babylonEngine = new BABYLON.Engine( this.canvas.getCanvas(), true );
            this.babylonEngine.displayLoadingUI();

            // add resize event listener
            window.addEventListener(
                'resize',
                () : void => {
                    bz.Main.game.engine.canvas.updateDimensions();
                    bz.Main.game.engine.babylonEngine.resize();
                }
            );

            // create key and pointer system
            this.keySystem     = new bz.KeySystem();
            this.pointerSystem = new bz.PointerSystem();

            // create the scene
            bz.Debug.init.log( 'Init scene' );
            this.scene = new bz.Scene();
            this.scene.init();

            // init materials
            bz.Debug.init.log( 'Init materials' );
            this.material = new bz.MaterialSystem();
            this.material.init();

            // init sprites
            bz.Debug.init.log( 'Init sprites' );
            this.sprite = new bz.Sprite();
            this.sprite.init();
        }

        /***************************************************************************************************************
        *   Inits the window blur handler.
        ***************************************************************************************************************/
        public initWindowBlurHandler() : void
        {
            bz.Debug.init.log( 'Initing window blur handler' );

            window.onblur = ( event:Event ) : void =>
            {
                bz.Debug.canvas.log( 'Detected window focus lost. Releasing all keys.' );

                this.keySystem.releaseAllKeys();
            };
        }
    }

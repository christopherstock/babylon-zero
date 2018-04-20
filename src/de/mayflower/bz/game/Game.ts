
    import * as BABYLON from 'babylonjs';
    import * as bz      from '..';

    /*******************************************************************************************************************
    *   Specifies the initialization part of the game logic.
    *
    *   TODO group to engine instance
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Game
    {
        /** The WebGL canvas context. */
        public                      canvas                      :bz.CanvasSystem            = null;
        /** The current level instance. */
        public                      currentLevel                :bz.Level                   = null;
        /** The current babylon.JS scene. */
        public                      scene                       :BABYLON.Scene              = null;
        /** The WebGL canvas context. */
        public                      engine                      :BABYLON.Engine             = null;
        /** The material system. */
        public                      material                    :bz.Material                = null;
        /** The sprite manager. */
        public                      spriteManager               :BABYLON.SpriteManager      = null;
        /** The camera manager. */
        public                      camera                      :bz.Camera                  = null;
        /** The pointer system. */
        public                      pointer                     :bz.Pointer                 = null;

        /***************************************************************************************************************
        *   Inits this app from scratch.
        ***************************************************************************************************************/
        public init()
        {
            bz.Debug.init.log( "Creating game canvas" );
            this.canvas = new bz.CanvasSystem();
            this.canvas.updateDimensions();



            bz.Debug.init.log( "Initializing the babylon.JS engine." );
            this.engine = new BABYLON.Engine( this.canvas.getCanvas(), true );



            //add resize event listener
            window.addEventListener(
                "resize",
                function () {
                    bz.Main.game.canvas.updateDimensions();
                    bz.Main.game.engine.resize();
                }
            );


            bz.Debug.init.log( "Displaying the loading UI" );
            this.engine.displayLoadingUI();

            // create pointer system
            this.pointer = new bz.Pointer();

            // create camera system
           this.camera = new bz.Camera();

            //create the scene
            bz.Debug.init.log( "Creating the Scene" );
            this.scene = new BABYLON.Scene( this.engine );

            //init materials
            bz.Debug.init.log( "Init all materials" );
            this.material = new bz.Material();
            this.material.initMaterials( this.scene );

            //init sprite manager
            bz.Debug.init.log( "Init the sprite manager" );
            this.spriteManager = new BABYLON.SpriteManager( "treesManager", bz.SettingEngine.PATH_IMAGE_TEXTURE + "tree.png", 100, 357, bz.Main.game.scene );

            //setup physics
            bz.Debug.init.log( "Setup all physics" );
            this.scene.enablePhysics( null, new BABYLON.OimoJSPlugin() );

            //setup the level
            bz.Debug.init.log( "Setup the level" );
            this.currentLevel = new bz.LevelBunny();
        }

        /***************************************************************************************************************
        *   Being invoked when all items are initialized and loaded.
        ***************************************************************************************************************/
        public onInitCompleted=()=>
        {
            bz.Debug.init.log( "> onInitCompleted" );

            this.scene.executeWhenReady
            (
                this.initSceneCompleted
            );
        };

        /***************************************************************************************************************
        *   The render loop. This method is being invoked each tick.
        ***************************************************************************************************************/
        public render=()=>
        {
            //render the scene if existent
            if ( this.scene )
            {
                //render the scene
                this.scene.render();

                //handle streams
                if ( this.scene.useDelayedTextureLoading )
                {
                    let waiting = this.scene.getWaitingItemsCount();
                    if ( waiting > 0 )
                    {
                        console.log( "Streaming items... " + waiting + " remaining");
                    }
                }
            }
        }

        /***************************************************************************************************************
        *   Being invoked when the scene is set up.
        *
        *   TODO outsource!
        ***************************************************************************************************************/
        public initSceneCompleted=()=>
        {
            bz.Debug.init.log( "> Init scene completed" );




            // bz.Main.game.canvas.getCanvas().style.opacity = "1";



            //NOW hide the loading UI!
            bz.Main.game.engine.hideLoadingUI();

            //assign controls
            bz.Main.game.scene.activeCamera.attachControl( bz.Main.game.canvas.getCanvas() );
            bz.Main.game.scene.onPointerDown = bz.Main.game.pointer.assignPointerDown;

            //launch render loop ?? required ??
            bz.Debug.init.log( "Starting the render loop." );
            bz.Main.game.engine.runRenderLoop( bz.Main.game.render );
        }
    }

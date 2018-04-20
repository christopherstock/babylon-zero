
    import * as bz from '..';

    /*******************************************************************************************************************
    *   Manages the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Game
    {
        /** The game engine. */
        public                      engine                      :bz.GameEngine              = null;

        /** The current level instance. */
        public                      level                       :bz.Level                   = null;

        /***************************************************************************************************************
        *   Inits the game from scratch.
        ***************************************************************************************************************/
        public init()
        {
            bz.Debug.init.log( "Init game engine" );
            this.engine = new bz.GameEngine();
            this.engine.init();

            //setup the level
            bz.Debug.init.log( "Init custom level" );
            this.level = new bz.LevelBunny();
        }

        /***************************************************************************************************************
        *   Being invoked when the level is completely initialized.
        ***************************************************************************************************************/
        public onInitLevelCompleted=()=>
        {
            bz.Debug.init.log( "> onInitCompleted" );

            this.engine.scene.babylonScene.executeWhenReady
            (
                this.initSceneCompleted
            );
        };

        /***************************************************************************************************************
        *   Being invoked when the scene is set up.
        ***************************************************************************************************************/
        public initSceneCompleted=()=>
        {
            bz.Debug.init.log( "System callback: Scene initialization completed" );

            // hide the loading UI
            bz.Debug.init.log( "Hide loading UI" );
            this.engine.babylonEngine.hideLoadingUI();

            // assign controls to camera
            bz.Debug.init.log( "Assign controls to camera" );
            this.engine.scene.babylonScene.activeCamera.attachControl( this.engine.canvas.getCanvas() );
            this.engine.scene.babylonScene.onPointerDown = this.engine.pointer.assignPointerDown;

            //launch render loop ?? required ??
            bz.Debug.init.log( "Starting the render loop." );
            this.engine.babylonEngine.runRenderLoop( bz.Main.game.render );
        };

        /***************************************************************************************************************
        *   The render loop being invoked each game tick.
        ***************************************************************************************************************/
        public render=()=>
        {
            //render scene
            this.engine.scene.babylonScene.render();
/*
            //handle streams
            if ( this.engine.scene.useDelayedTextureLoading )
            {
                let waiting = this.engine.scene.getWaitingItemsCount();
                if ( waiting > 0 )
                {
                    console.log( "Streaming items... " + waiting + " remaining");
                }
            }
*/
        }
    }

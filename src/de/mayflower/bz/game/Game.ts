
    import * as bz from '..';

    /*******************************************************************************************************************
    *   Manages the game logic.
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

            bz.Debug.init.log( "Init custom level" );
            this.level = new bz.LevelTest( this.engine.scene.getScene() );
            this.level.reset();
        }

        /***************************************************************************************************************
        *   Being invoked when the level is completely initialized.
        ***************************************************************************************************************/
        public onInitLevelCompleted=()=>
        {
            bz.Debug.init.log( "onInitLevelCompleted being invoked" );

            this.engine.scene.getScene().executeWhenReady
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
            this.engine.scene.assignControls();

            //launch render loop ?? required ??
            bz.Debug.init.log( "Starting the render loop." );
            this.engine.babylonEngine.runRenderLoop( bz.Main.game.render );
        };

        /***************************************************************************************************************
        *   The render loop being invoked each game tick.
        ***************************************************************************************************************/
        public render=()=>
        {
            // render level
            this.level.render();

            // render babylon.JS scene
            this.engine.scene.renderScene();
        }
    }

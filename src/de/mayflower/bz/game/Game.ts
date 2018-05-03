
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

        /***************************************************************************************************************
        *   Inits the game from scratch.
        ***************************************************************************************************************/
        public init()
        {
            bz.Debug.init.log( "Init game engine" );
            this.engine = new bz.GameEngine();
            this.engine.init();
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
            this.engine.level.render();

            // render babylon.JS scene
            this.engine.scene.renderScene();
        }
    }

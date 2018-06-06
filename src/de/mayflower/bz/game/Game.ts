
    import * as bz from '..';

    /** ****************************************************************************************************************
    *   Manages the game logic.
    *******************************************************************************************************************/
    export class Game
    {
        /** The game engine. */
        public                      engine                      :bz.GameEngine              = null;

        /** The current stage instance. */
        public                      stage                       :bz.Stage                   = null;

        /** ************************************************************************************************************
        *   Inits the game from scratch.
        ***************************************************************************************************************/
        public init() : void
        {
            bz.Debug.init.log( 'Init game engine' );
            this.engine = new bz.GameEngine();
            this.engine.init();
        }

        /** ************************************************************************************************************
        *   Being invoked when the game engine is completely initialized.
        ***************************************************************************************************************/
        public onInitGameEngineCompleted=() : void =>
        {
            bz.Debug.init.log( 'onInitGameEngineCompleted being invoked' );

            bz.Debug.init.log( 'Init custom stage' );
            this.stage = new bz.TestOffice( this.engine.scene.getScene() );

            bz.Debug.init.log( 'Init camera system' );
            this.engine.initCameraSystem();

            // invoke stage loaded complete callback
            bz.Main.game.onInitStageCompleted();
        };

        /** ************************************************************************************************************
        *   Being invoked when the stage is completely initialized.
        ***************************************************************************************************************/
        public onInitStageCompleted=() : void =>
        {
            bz.Debug.init.log( 'onInitStageCompleted being invoked' );

            this.engine.scene.getScene().executeWhenReady
            (
                this.initSceneCompleted
            );
        };

        /** ************************************************************************************************************
        *   Being invoked when the scene is set up.
        ***************************************************************************************************************/
        public initSceneCompleted=() : void =>
        {
            bz.Debug.init.log( 'System callback: Scene initialization completed' );

            // hide the loading UI
            bz.Debug.init.log( 'Hide loading UI' );
            this.engine.babylonEngine.hideLoadingUI();

            // assign controls to camera
            bz.Debug.init.log( 'Assign controls to camera' );
            this.engine.scene.assignControls();

            // set the window blur handler
            this.engine.initWindowBlurHandler();

            // launch render
            bz.Debug.init.log( 'Starting the render loop.' );
            this.engine.babylonEngine.runRenderLoop( this.render );
        };

        /** ************************************************************************************************************
        *   The render loop being invoked each game tick.
        ***************************************************************************************************************/
        public render=() : void =>
        {
            // handle global keys
            this.handleMenuKeys();

            // render stage if currently present
            if ( this.stage != null )
            {
                this.stage.render();
            }

            // render babylon.JS scene
            this.engine.scene.renderScene();
        };

        /** ************************************************************************************************************
        *   Handles all keys for the menu.
        ***************************************************************************************************************/
        public handleMenuKeys() : void
        {
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_F2 ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_F2 );

                // clear stage if existent
                if ( this.stage != null )
                {
                    this.stage.unload();
                    this.stage = null;



                }



            }
        }
    }

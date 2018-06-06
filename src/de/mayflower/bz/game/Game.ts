
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

            // render stage
            this.stage.render();

            // render babylon.JS scene
            this.engine.scene.renderScene();
        };

        /** ************************************************************************************************************
        *   Handles all keys for the menu.
        ***************************************************************************************************************/
        public handleMenuKeys() : void
        {
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_F1 ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_F1 );

                this.switchStage( bz.StageId.STAGE_TEST_OFFICE );
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_F2 ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_F2 );

                this.switchStage( bz.StageId.STAGE_TEST_LEVEL );
            }
        }

        /** ************************************************************************************************************
        *   Switches the current stage to the specified target stage.
        *
        *   @param targetStage The target stage to switch to.
        ***************************************************************************************************************/
        private switchStage( targetStage:bz.StageId ) : void
        {
            // show loading UI
            this.engine.babylonEngine.displayLoadingUI();

            bz.Debug.init.log( 'Stopping the render loop.' );
            this.engine.babylonEngine.stopRenderLoop( this.render );

            // dispose existent stage
            this.stage.unload();

            bz.Debug.init.log( 'Switch to target level [' + targetStage + ']' );

            switch ( targetStage )
            {
                case bz.StageId.STAGE_TEST_OFFICE:
                {
                    this.stage = new bz.TestOffice( this.engine.scene.getScene() );
                    break;
                }

                case bz.StageId.STAGE_TEST_LEVEL:
                {
                    this.stage = new bz.TestLevel( this.engine.scene.getScene() );
                    break;
                }
            }

            this.engine.scene.getScene().executeWhenReady
            (
                () => {

                    // TODO reuse initSceneCompleted

                    // hide loading UI
                    this.engine.babylonEngine.hideLoadingUI();

                    bz.Debug.init.log( 'Starting the render loop.' );
                    this.engine.babylonEngine.runRenderLoop( this.render );
                }
            );
        }
    }

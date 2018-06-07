
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

            bz.Debug.init.log( 'Launch startup stage' );
            this.switchStage( bz.SettingGame.STARTUP_STAGE, this.engine.scene.getScene() );
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

            // launch render loop
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

                this.switchStage( bz.StageId.STAGE_TEST_OFFICE, this.engine.scene.getScene() );
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_F2 ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_F2 );

                this.switchStage( bz.StageId.STAGE_TEST_LEVEL, this.engine.scene.getScene() );
            }

            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_F3 ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_F3 );

                this.switchStage( bz.StageId.STAGE_ROOM_VIEWER, this.engine.scene.getScene() );
            }
        }

        /** ************************************************************************************************************
        *   Switches the current stage to the specified target stage.
        *
        *   @param targetStage The target stage to switch to.
        *   @param scene       The babylon.JS scene context.
        ***************************************************************************************************************/
        private switchStage( targetStage:bz.StageId, scene:BABYLON.Scene ) : void
        {
            bz.Debug.stage.log( 'Switch to target stage [' + targetStage + ']' );

            // check existent stage unload
            if ( this.stage != null )
            {
                // show loading UI
                bz.Debug.stage.log( 'Showing loading UI.' );
                this.engine.babylonEngine.displayLoadingUI();

                bz.Debug.stage.log( 'Stopping the render loop.' );
                this.engine.babylonEngine.stopRenderLoop( this.render );

                // dispose existent stage
                bz.Debug.stage.log( 'Dispose current stage.' );
                this.stage.unload();
            }

            switch ( targetStage )
            {
                case bz.StageId.STAGE_TEST_OFFICE:
                {
                    this.stage = new bz.TestOffice( scene );
                    break;
                }

                case bz.StageId.STAGE_TEST_LEVEL:
                {
                    this.stage = new bz.TestLevel( scene );
                    break;
                }

                case bz.StageId.STAGE_ROOM_VIEWER:
                {
                    this.stage = new bz.RoomViewer( scene );
                    break;
                }
            }

            scene.executeWhenReady( this.initSceneCompleted );
        }
    }

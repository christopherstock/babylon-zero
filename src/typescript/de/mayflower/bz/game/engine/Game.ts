
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Manages the game logic.
    *******************************************************************************************************************/
    export class Game
    {
        /** The game engine. */
        private                     engine                      :bz.Engine                  = null;
        /** The current stage. */
        private                     stage                       :bz.Stage                   = null;
        /** The current game scene. */
        private                     scene                       :bz.Scene                   = null;

        /** ************************************************************************************************************
        *   Inits the game from scratch.
        ***************************************************************************************************************/
        public init() : void
        {
            bz.Debug.init.log( 'Init game engine' );

            // init the engine
            this.engine = new bz.Engine();
            this.engine.init();

            // init the scene
            bz.Debug.init.log( 'Init scene' );
            this.scene = new bz.Scene();
            this.scene.init( this.engine.createNewScene(), this.onInitGameEngineCompleted );
        }

        /** ************************************************************************************************************
        *   Switches the current stage to the specified target stage.
        *
        *   @param targetStage The target stage to switch to.
        ***************************************************************************************************************/
        public switchStage( targetStage:bz.StageId ) : void
        {
            bz.Debug.stage.log( '' );
            bz.Debug.stage.log( 'Switching to target stage [' + targetStage + ']' );

            let lastPauseMenuItem:number = 0;

            // check existent stage unload
            if ( this.stage != null )
            {
                this.engine.setLoadingUiVisibility( true );
                this.engine.setRenderLoopExecution( false, this.render );

                // remember last pause menu index
                lastPauseMenuItem = this.stage.getPauseMenuIndex();

                // dispose existent stage
                bz.Debug.stage.log( 'Disposing the current stage' );
                this.stage.dispose();
            }

            bz.Debug.stage.log( ' Initializing target stage [' + targetStage + ']' );

            switch ( targetStage )
            {
                case bz.StageId.STAGE_TEST_OFFICE:
                {
                    this.stage = new bz.Office( this.scene );
                    this.stage.init();
                    break;
                }

                case bz.StageId.STAGE_TEST_LEVEL:
                {
                    this.stage = new bz.TestLevel( this.scene );
                    this.stage.init();
                    break;
                }

                case bz.StageId.STAGE_ROOM_VIEWER:
                {
                    this.stage = new bz.RoomViewer( this.scene );
                    this.stage.init();
                    break;
                }

                case bz.StageId.STAGE_PRODUCT_CONFIGURATOR:
                {
                    this.stage = new bz.ProductConfigurator( this.scene );
                    this.stage.init();
                    break;
                }

                case bz.StageId.STAGE_INTRO_LOGO:
                {
                    this.stage = new bz.IntroLogo( this.scene );
                    this.stage.init();
                    break;
                }

                case bz.StageId.STAGE_HUMAN_BODY_PARTITIONS:
                {
                    this.stage = new bz.HumanBodyPartitions( this.scene );
                    this.stage.init();
                    break;
                }
            }

            // assign remembered pause menu index
            this.stage.setPauseMenuIndex( lastPauseMenuItem );

            // specify callback to invoke when the scene is fully loaded
            this.scene.getNativeScene().executeWhenReady( this.initSceneCompleted );
        }

        /** ************************************************************************************************************
        *   Delivers the current game stage.
        *
        *   @return The current game stage.
        ***************************************************************************************************************/
        public getStage() : bz.Stage
        {
            return this.stage;
        }

        /** ************************************************************************************************************
        *   Delivers the game engine.
        *
        *   @return The current game stage.
        ***************************************************************************************************************/
        public getEngine() : bz.Engine
        {
            return this.engine;
        }

        /** ************************************************************************************************************
        *   Being invoked when the game engine is completely initialized.
        ***************************************************************************************************************/
        private onInitGameEngineCompleted=() : void =>
        {
            bz.Debug.init.log( 'onInitGameEngineCompleted being invoked' );

            this.switchStage( bz.SettingStage.STAGE_STARTUP );
        };

        /** ************************************************************************************************************
        *   Being invoked when the scene is set up.
        ***************************************************************************************************************/
        private initSceneCompleted=() : void =>
        {
            bz.Debug.init.log( 'System callback: Scene initialization completed' );

            this.engine.setLoadingUiVisibility( false );
            this.engine.setRenderLoopExecution( true, this.render );
        };

        /** ************************************************************************************************************
        *   The render loop being invoked each game tick.
        ***************************************************************************************************************/
        private render=() : void =>
        {
            // render stage
            this.stage.render();

            // render scene
            this.scene.render();

            // handle global keys ( pause, camera changes, level switches etc. )
            this.handleGlobalKeys( this.engine.getKeySystem() );
        };

        /** ************************************************************************************************************
        *   Handles all keys for the menu.
        *
        *   @param keySystem The key system to use for key determination.
        ***************************************************************************************************************/
        private handleGlobalKeys( keySystem:bz.KeySystem ) : void
        {
            if ( bz.SettingDebug.ENABLE_DEBUG_KEYS )
            {
                this.handleDebugKeys( keySystem );
            }
        }

        /** ************************************************************************************************************
        *   Handles all debug keys in the menu state.
        *
        *   @param keySystem The key system to use for key determination.
        ***************************************************************************************************************/
        private handleDebugKeys( keySystem:bz.KeySystem ) : void
        {
            // camera switches

            if ( keySystem.isPressed( bz.KeyCodes.KEY_1 ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_1 );
                this.stage.setActiveCamera( bz.CameraType.FREE_DEBUG );
            }
            if ( keySystem.isPressed( bz.KeyCodes.KEY_2 ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_2 );
                this.stage.setActiveCamera( bz.CameraType.STATIONARY );
            }
            if ( keySystem.isPressed( bz.KeyCodes.KEY_3 ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_3 );
                this.stage.setActiveCamera( bz.CameraType.FOLLOW );
            }
            if ( keySystem.isPressed( bz.KeyCodes.KEY_4 ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_4 );
                this.stage.setActiveCamera( bz.CameraType.FIRST_PERSON );
            }
            if ( keySystem.isPressed( bz.KeyCodes.KEY_5 ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_5 );
                this.stage.setActiveCamera( bz.CameraType.ARC_ROTATE );
            }

            // toggle pause menu
            if ( keySystem.isPressed( bz.KeyCodes.KEY_ESCAPE ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_ESCAPE );
                this.stage.togglePause();
            }

            // toggle physics
            if ( keySystem.isPressed( bz.KeyCodes.KEY_P ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_P );
                this.scene.togglePhysics();
            }
        }
    }

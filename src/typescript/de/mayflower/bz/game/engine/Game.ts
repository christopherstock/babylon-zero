
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Manages the game logic.
    *******************************************************************************************************************/
    export class Game
    {
        /** The game engine. */
        public                      engine                      :bz.Engine                  = null;
        /** The current stage. */
        public                      stage                       :bz.Stage                   = null;

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
            this.scene.init( this.engine.babylonEngine, this.onInitGameEngineCompleted );
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

            // check existent stage unload
            if ( this.stage != null )
            {
                this.engine.setLoadingUiVisibility( true );
                this.engine.setRenderLoopExecution( false, this.render );

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

            // specify callback to invoke when the scene is fully loaded
            this.scene.getNativeScene().executeWhenReady( this.initSceneCompleted );
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

            // render babylon.JS scene
            this.scene.render();

            // handle global keys ( pause, camera changes, level switches etc. )
            this.handleGlobalKeys();
        };

        /** ************************************************************************************************************
        *   Handles all keys for the menu.
        ***************************************************************************************************************/
        private handleGlobalKeys() : void
        {
            if ( bz.SettingDebug.ENABLE_MENU_DEBUG_KEYS )
            {
                this.handleDebugMenuKeys()
            }
        }

        /** ************************************************************************************************************
        *   Handles all debug keys in the menu state.
        ***************************************************************************************************************/
        private handleDebugMenuKeys() : void
        {
            if ( this.engine.keySystem.isPressed( bz.KeyCodes.KEY_1 ) )
            {
                this.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_1 );
                this.stage.setActiveCamera
                (
                    bz.CameraType.FREE_DEBUG
                );
            }
            if ( this.engine.keySystem.isPressed( bz.KeyCodes.KEY_2 ) )
            {
                this.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_2 );
                this.stage.setActiveCamera
                (
                    bz.CameraType.STATIONARY
                );
            }
            if ( this.engine.keySystem.isPressed( bz.KeyCodes.KEY_3 ) )
            {
                this.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_3 );
                this.stage.setActiveCamera
                (
                    bz.CameraType.FOLLOW
                );
            }
            if ( this.engine.keySystem.isPressed( bz.KeyCodes.KEY_4 ) )
            {
                this.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_4 );
                this.stage.setActiveCamera
                (
                    bz.CameraType.FIRST_PERSON
                );
            }
            if ( this.engine.keySystem.isPressed( bz.KeyCodes.KEY_5 ) )
            {
                this.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_5 );
                this.stage.setActiveCamera
                (
                    bz.CameraType.ARC_ROTATE
                );
            }

            if ( this.engine.keySystem.isPressed( bz.KeyCodes.KEY_ESCAPE ) )
            {
                this.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_ESCAPE );

                this.stage.togglePause();
            }
        }
    }

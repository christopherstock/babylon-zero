
    import * as bz from '..';

    /** ****************************************************************************************************************
    *   Manages the game logic.
    *******************************************************************************************************************/
    export class Game
    {
        /** The game engine. */
        private                     engine                      :bz.Engine                  = null;
        /** The current game scene. */
        private                     scene                       :bz.Scene                   = null;
        /** The current stage. */
        private                     stage                       :bz.Stage                   = null;
        /** The game GUI. */
        private                     gui                         :bz.GUI                     = null;
        /** Indicates pause state. */
        private                     pause                       :boolean                    = false;
        /** The key system to use in this stage. */
        private                     keySystem                   :bz.KeySystem               = null;
        /** The mouse system to use in this stage. */
        private                     mouseSystem                 :bz.MouseSystem             = null;

        /** ************************************************************************************************************
        *   Inits the game from scratch.
        ***************************************************************************************************************/
        public init() : void
        {
            bz.Debug.init.log( 'Init game engine' );

            // init the engine
            this.engine = new bz.Engine();
            this.engine.init( this );

            // init the scene
            bz.Debug.init.log( 'Init scene' );
            this.scene = new bz.Scene();
            this.scene.init( this.engine, () => { this.onInitGameEngineCompleted(); } );

            // init the key and mouse system
            this.keySystem   = new bz.KeySystem();
            this.mouseSystem = new bz.MouseSystem(
                this,
                bz.SettingDebug.DEBUG_ENABLE_POINTER_DOWN_IMPULSE,
                false
            )
        }

        /** ************************************************************************************************************
        *   Switches the current stage to the specified target stage.
        *
        *   @param targetStage The target stage to switch to.
        ***************************************************************************************************************/
        public switchStage( targetStage:bz.StageId ) : void
        {
            bz.Debug.stage.log( '' );
            bz.Debug.stage.log( 'Switching to target stage [' + String( targetStage ) + ']' );

            // stop physics engine immediately
            this.scene.enablePhysics( false );

            // remember last pause menu item
            let lastPauseMenuItem:number = 0;

            // check existent stage unload
            if ( this.stage !== null )
            {
                this.engine.setLoadingUiVisibility( true );
                this.engine.setRenderLoopExecution( false, () => { this.render(); } );

                // remember last pause menu index
                lastPauseMenuItem = this.stage.getPauseMenuIndex();

                // dispose existent stage
                bz.Debug.stage.log( 'Disposing the current stage' );
                this.stage.dispose();
                this.gui.dispose();
            }

            // assign the new stage
            switch ( targetStage )
            {
                case bz.StageId.OFFICE:
                {
                    this.stage = new bz.StageOffice( this );
                    break;
                }

                case bz.StageId.INTRO_LOGO:
                {
                    this.stage = new bz.StageIntroLogo( this );
                    break;
                }
            }

            // init the GUI
            this.gui = new bz.GUI( this.scene.getNativeScene() );
            this.gui.init();

            // init the new stage
            bz.Debug.stage.log( ' Initializing target stage [' + String( targetStage ) + ']' );
            this.stage.init();

            // release keys and pointer lock
            this.keySystem.releaseAllKeys();
            this.mouseSystem.releasePointerLock();

            // disable pause flag
            this.pause = false;

            // assign remembered pause menu index
            this.stage.setPauseMenuIndex( lastPauseMenuItem );

            // specify callback to invoke when the scene is fully loaded
            this.scene.getNativeScene().executeWhenReady( () => { this.initSceneCompleted(); } );
        }

        /** ************************************************************************************************************
        *   Toggles the game pause state.
        ***************************************************************************************************************/
        public togglePause() : void
        {
            // toggle pause
            this.pause = !this.pause;

            bz.Debug.game.log( 'Toggle pause to [' + String( this.pause ) + ']');

            // stop or resume physics engine
            this.scene.enablePhysics( !this.pause );

            // propagate pause state to gui
            this.gui.setPauseGuiVisibility( this.pause );

            // propagate pause state to all stage sprites
            this.stage.setSpritePause( this.pause );
        }

        /** ************************************************************************************************************
        *   Returns the current FPS of the babylon.JS engine.
        *
        *   @return The current Frames Per Second as a floating number.
        ***************************************************************************************************************/
        public getFps() : number
        {
            return this.engine.getFps();
        }

        /** ************************************************************************************************************
        *   Returns the current active stage.
        *
        *   @return The current active stage.
        ***************************************************************************************************************/
        public getStage() : bz.Stage
        {
            return this.stage;
        }

        /** ************************************************************************************************************
        *   Being invoked when the game engine is completely initialized.
        ***************************************************************************************************************/
        private onInitGameEngineCompleted() : void
        {
            bz.Debug.init.log( 'onInitGameEngineCompleted being invoked' );

            this.switchStage( bz.SettingStage.STAGE_STARTUP );
        }

        /** ************************************************************************************************************
        *   Being invoked when the scene is set up.
        ***************************************************************************************************************/
        private initSceneCompleted() : void
        {
            bz.Debug.init.log( 'System callback: Scene initialization completed' );

            this.engine.setLoadingUiVisibility( false );
            this.engine.setRenderLoopExecution( true, () => { this.render(); } );

            // start physics engine not before now in order to prevent unwanted physical startup impulses! :)
            this.scene.enablePhysics( true );
        };

        /** ************************************************************************************************************
        *   The render loop being invoked each game tick.
        ***************************************************************************************************************/
        private render() : void
        {
            // render stage if not paused
            if ( !this.pause )
            {
                this.stage.render();
            }

            // render GUI
            this.gui.render( this, this.pause, this.keySystem );

            // render scene
            this.scene.render();

            // handle global keys ( pause, camera changes, level switches etc. )
            this.handleGlobalKeys();
        };

        /** ************************************************************************************************************
        *   Handles all keys for the menu.
        ***************************************************************************************************************/
        private handleGlobalKeys() : void
        {
            if ( bz.SettingDebug.ENABLE_DEBUG_KEYS )
            {
                this.handleDebugKeys();
            }
        }

        /** ************************************************************************************************************
        *   Handles all debug keys in the menu state.
        ***************************************************************************************************************/
        private handleDebugKeys() : void
        {
            const keySystem :bz.KeySystem = this.keySystem;

            // camera switches

            if ( keySystem.isPressed( bz.KeyCodes.KEY_1 ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_1 );
                this.stage.setActiveCamera( bz.CameraType.FREE_CAMERA );
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
                this.togglePause();
            }

            // toggle physics
            if ( keySystem.isPressed( bz.KeyCodes.KEY_P ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_P );
                this.scene.togglePhysics();
            }
        }

        public getScene() : bz.Scene
        {
            return this.scene;
        }

        public getEngine() : bz.Engine
        {
            return this.engine;
        }

        /** ************************************************************************************************************
        *   Returns the GUI instance.
        *
        *   @return The GUI instance.
        ***************************************************************************************************************/
        public getGUI() : bz.GUI
        {
            return this.gui;
        }

        public getKeySystem() : bz.KeySystem
        {
            return this.keySystem;
        }

        public getMouseSystem() : bz.MouseSystem
        {
            return this.mouseSystem;
        }
    }

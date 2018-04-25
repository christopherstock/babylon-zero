
    require( '../css/global.less' );

    import * as bz from '..';

    /*******************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Fix texture UV
    *   TODO Fix player/camrera controls (turn, duck)
    *   TODO Solve move with collisions ..
    *
    *   TODO Solve ortho drawing!
    *   TODO Improve performance in chrome? Try webGL 1.0??
    *   TODO Show FPS output as Ortho drawing: bz.MfgInit.engine.getFps().toFixed() + " fps"
    *   TODO Increase performance in chrome?
    *   TODO Remove createBoxDeprecated and fix LevelBunny!
    *   TODO Create material system with unified parameters!
    *   TODO Enable controls for specific object, not for camera!
    *   TODO Improve Sprite System handling.
    *   TODO move onInitLevelCompleted to class Level and also scene to class level!
    *   TODO specify explicit gravity?
    *   TODO Enable jumping.
    *   TODO Fix skybox and link to camera!
    *   TODO Solve shadows?
    *   TODO Create simple test level with increased performance!
    *   TODO Improve abstract level system and make it more generic.
    *   TODO Create main menu where player can reset camera etc.
    *   TODO Solve 3dsmax OBJ file importer? ( with different OBJ file? )
    *   TODO try this.camera.lockedTarget.
    *
    *   TODO Review babylon.JS tutorials, features and playground.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Main
    {
        /** The singleton instance of the game. */
        public      static          game                    :bz.Game                    = null;

        /***************************************************************************************************************
        *   This method is invoked when the application starts.
        ***************************************************************************************************************/
        public static main() : void
        {
            // set webpage title
            document.title = bz.SettingEngine.TITLE;

            // acclaim debug console
            bz.Debug.major.log( bz.SettingEngine.TITLE );
            bz.Debug.major.log();

            // init game
            Main.game = new bz.Game();
            Main.game.init();
        }
    }

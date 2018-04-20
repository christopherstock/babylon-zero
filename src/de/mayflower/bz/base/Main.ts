
    require( '../css/global.less' );

    import * as bz from '..';

    /*******************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Fix object importer in LevelBunny!
    *   TODO Wrap babylon.JS instances to engine component classes!
    *   TODO Create main menu where player can reset camera etc.
    *   TODO fix bunny importer!
    *   TODO Solve ortho drawing!
    *   TODO Fix skybox and link to camera!
    *   TODO Solve shadows.
    *   TODO Show FPS output as Ortho drawing: bz.MfgInit.engine.getFps().toFixed() + " fps"
    *   TODO Create simple test level.
    *   TODO Create abstract level system.
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
        public static main():void
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

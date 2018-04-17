
    require( '../css/global.less' );

    import * as bz from '..';

    /*******************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Fix physics!
    *   TODO Move primal ninja classes!
    *   TODO Copy structure from ninjas project.
    *   TODO Enable fullscreen.
    *   TODO Create single game instance and engine class/instance.
    *   TODO Unify docblocks!
    *   TODO Add resize handler for canvas resizing!
    *   TODO Solve ortho drawing!
    *   TODO Prune MfgString.getDateTimeString !
    *   TODO Replace var keyword everywhere!
    *   TODO Pick primal utility classes from coding ninjas!
    *   TODO Create simple test level.
    *   TODO Install babylon.JS extensions (see webpack output).
    *   TODO Show FPS output as Ortho drawing: bz.MfgInit.engine.getFps().toFixed() + " fps"
    *   TODO Create abstract level system.
    *   TODO Remove all legacy Mfg classes!
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Main
    {
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

            // TODO non-static
            bz.Game.init();
        }
    }

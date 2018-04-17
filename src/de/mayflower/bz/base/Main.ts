
    import * as bz from '..';

    /*******************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO ASAP   Move primal ninja classes!
    *   TODO ASAP   Create single game instance and engine class/instance.
    *   TODO ASAP   Unify docblocks!
    *   TODO ASAP   Replace var keyword everywhere!
    *   TODO ASAP   Pick primal utility classes from coding ninjas!
    *   TODO ASAP   Create simple test level.
    *   TODO ASAP   Remove webpack 4 deprecation warning.
    *   TODO ASAP   Install babylon.JS extensions (see webpack output).
    *   TODO ASAP   Create abstract level system.
    *   TODO ASAP   Fix webpack errors 'TypeError: Cannot read property '_tsInstances' in 'awesome-typescript-loader'.
    *   TODO ASAP   Remove all legacy Mfg classes!
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

            // TODO non-static!
            bz.Game.init();
        }
    }


    import * as bz from '..';

    /*******************************************************************************************************************
    *   Represents a debug group whose logging can be enabled or disabled.
    *
    *   @author     Christopher Stock
    *   @version    1.0.0
    *******************************************************************************************************************/
    export class Debug
    {
        /** Major debug messages. */
        public      static      readonly    major               :Debug              = new Debug( true  );

        /** Debugs initialization process. */
        public      static      readonly    init                :Debug              = new Debug( true  );
        /** Debugs setup and changes of the canvas size. */
        public      static      readonly    canvas              :Debug              = new Debug( true  );
        /** Debugs sound system. */
        public      static      readonly    sound               :Debug              = new Debug( true  );

        /** The flag that enables or disables logging for this debug group. */
        private                 readonly    debugEnabled        :boolean            = false;

        /***************************************************************************************************************
        *   Constructs a new debug group.
        *
        *   @param debugEnabled Flags if this debug group should log messages.
        ***************************************************************************************************************/
        public constructor( debugEnabled:boolean )
        {
            this.debugEnabled = debugEnabled;
        }

        /***************************************************************************************************************
        *   Logs a line of output to the default console. Will only generate output
        *   if the debug for this debug group is enabled.
        *
        *   @param msg The message to log to the default console.
        ***************************************************************************************************************/
        public log( msg:string = "" ):void
        {
            if ( bz.SettingDebug.DEBUG_MODE && this.debugEnabled )
            {
                console.log( '[' + bz.String.getDateTimeString() + '] ' + msg );
            }
        }
    }

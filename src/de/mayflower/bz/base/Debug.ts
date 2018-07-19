
    import * as bz from '..';

    /** ****************************************************************************************************************
    *   Represents a debug group whose logging can be enabled or disabled.
    *******************************************************************************************************************/
    export class Debug
    {
        /** Debugs startup process. */
        public      static      readonly    acclaim             :Debug              = new Debug( true  );
        /** Debugs initialization process. */
        public      static      readonly    init                :Debug              = new Debug( true  );
        /** Debugs canvas setup and resizing. */
        public      static      readonly    canvas              :Debug              = new Debug( true  );
        /** Debugs sound system. */
        public      static      readonly    sound               :Debug              = new Debug( true  );
        /** Debugs stage system. */
        public      static      readonly    stage               :Debug              = new Debug( true  );
        /** Debugs concernings for the 3D product configurator. */
        public      static      readonly    pc3d                :Debug              = new Debug( true  );
        /** Debugs key system. */
        public      static      readonly    key                 :Debug              = new Debug( false );
        /** Debugs the game items. */
        public      static      readonly    item                :Debug              = new Debug( true  );
        /** Debugs player fire. */
        public      static      readonly    fire                :Debug              = new Debug( true  );
        /** Debugs player move, rotate, ducking. */
        public      static      readonly    player              :Debug              = new Debug( true  );

        /** Flags if logging for this debug group is enabled. */
        private                 readonly    debugEnabled        :boolean            = false;

        /** ************************************************************************************************************
        *   Constructs a new debug group.
        *
        *   @param debugEnabled Flags if this debug group should log messages.
        ***************************************************************************************************************/
        public constructor( debugEnabled:boolean )
        {
            this.debugEnabled = debugEnabled;
        }

        /** ************************************************************************************************************
        *   Logs a line of output to the default console. Will only generate output
        *   if the debug for this debug group is enabled.
        *
        ***************************************************************************************************************/
        public log( msg:string = '' ) : void
        {
            if ( bz.SettingDebug.DEBUG_MODE && this.debugEnabled )
            {
                // tslint:disable-next-line:no-console
                console.log( '[' + bz.String.getDateTimeString() + '] ' + msg );
            }
        }
    }

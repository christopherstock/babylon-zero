
    import * as bz from '..';
    import {MfgDebugSettings} from "..";

    /*****************************************************************************
    *   Represents a debug group whose logging can be enabled or disabled.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class LibDebug
    {
        /** The flag that enables or disables logging for this debug group. */
        private             debugEnabled            :boolean                    = false;

        /*****************************************************************************
        *   Constructs a new debug group.
        *
        *   @param  debugEnabled    Flags if this debug group should log messages.
        *****************************************************************************/
        public constructor( debugEnabled:boolean )
        {
            this.debugEnabled = debugEnabled;
        }

        /*****************************************************************************
        *   Logs a line of output to the default console. Will only generate output
        *   if the debug for this debug group is enabled.
        *
        *   @param msg The message to log to the default console.
        *****************************************************************************/
        public log( msg:string ):void
        {
            if ( MfgDebugSettings.DEBUG_MODE && this.debugEnabled )
            {
                console.log( '[' + bz.MfgStringFormat.getDateTimeString() + '] ' + msg );
            }
        }
    }

import * as bz from '..';

/** ********************************************************************************************************************
*   Represents a debug group whose logging can be enabled or disabled.
***********************************************************************************************************************/
export class Debug
{
    /** Debugs startup process. */
    public  static readonly acclaim         :Debug              = new Debug( true  );
    /** Debugs initialization process. */
    public  static readonly init            :Debug              = new Debug( true  );
    /** Debugs game states. */
    public  static readonly game            :Debug              = new Debug( false );
    /** Debugs engine handling and events. */
    public  static readonly engine          :Debug              = new Debug( false );
    /** Debugs sound system. */
    public  static readonly sound           :Debug              = new Debug( false );
    /** Debugs stage system. */
    public  static readonly stage           :Debug              = new Debug( false );
    /** Debugs key system. */
    public  static readonly key             :Debug              = new Debug( false );
    /** Debugs pointer system. */
    public  static readonly pointer         :Debug              = new Debug( false );
    /** Debugs the game items. */
    public  static readonly item            :Debug              = new Debug( false );
    /** Debugs player move, rotate, ducking, interaction. */
    public  static readonly player          :Debug              = new Debug( false );
    /** Debugs player fire. */
    public  static readonly fire            :Debug              = new Debug( false );
    /** Debugs physic calculations. */
    public  static readonly physic          :Debug              = new Debug( false );
    /** Debugs camera behaviours and journeys. */
    public  static readonly camera          :Debug              = new Debug( false );
    /** Debugs events pipeline. */
    public  static readonly events          :Debug              = new Debug( false );

    /** Flags if logging for this debug group is enabled. */
    private        readonly debugEnabled    :boolean            = false;

    /** ****************************************************************************************************************
    *   Constructs a new debug group.
    *
    *   @param debugEnabled Flags if this debug group should log messages.
    *******************************************************************************************************************/
    public constructor( debugEnabled:boolean )
    {
        this.debugEnabled = debugEnabled;
    }

    /** ****************************************************************************************************************
    *   Logs a line of output to the default console. Will only generate output
    *   if the debug for this debug group is enabled.
    *
    *   @param msg The message to log to the output console. Defaults to an empty string.
    *******************************************************************************************************************/
    public log( msg:string = '' ) : void
    {
        if ( bz.SettingDebug.DEBUG_MODE && this.debugEnabled )
        {
            /* eslint-disable no-console */
            console.log( '[' + bz.StringUtil.getDateTimeString() + '] ' + msg );
        }
    }

    /** ****************************************************************************************************************
    *   Logs a line of output to the error console. Will only generate output
    *   if the debug for this debug group is enabled.
    *
    *   @param msg The message to log to the error console. Defaults to an empty string.
    *******************************************************************************************************************/
    public err( msg:string = '' ) : void
    {
        if ( bz.SettingDebug.DEBUG_MODE && this.debugEnabled )
        {
            /* eslint-disable no-console */
            console.error( '[' + bz.StringUtil.getDateTimeString() + '] ' + msg );
        }
    }
}

/** ********************************************************************************************************************
*   Specifies all settings for Architecture Engineering & Construction.
***********************************************************************************************************************/
export abstract class SettingAEC
{
    /** Unified wall depth for building constructions. */
    public static readonly WALL_DEPTH                               :number             = 0.2;
    /** Unified wall height (y) for building constructions. */
    public static readonly WALL_HEIGHT                              :number             = 10.0;

    /** Unified door width for building constructions. */
    public static readonly DOOR_WIDTH                               :number             = 5.0;
    /** Unified door height for building constructions. */
    public static readonly DOOR_HEIGHT                              :number             = 8.5;
    /** Unified door depth for building constructions. */
    public static readonly DOOR_DEPTH                               :number             = 0.195;
    /** Unified door frame height for building constructions. */
    public static readonly DOOR_FRAME_HEIGHT                        :number             = ( SettingAEC.WALL_HEIGHT - SettingAEC.DOOR_HEIGHT );
    /** Unified ceiling height. This height will never be calculated into height calculations! */
    public static readonly CEILING_HEIGHT                           :number             = 0.1;
    /** The default offset Y for room ceilings in order to keep distance to vertical wall endings. */
    public static readonly CEILING_OFFSET_Y                         :number             = 0.01;
    /** The default offset Y for room floors in order to keep distance to vertical wall endings. */
    public static readonly FLOOR_OFFSET_Y                           :number             = 0.01;

    /** Unified default window width for building constructions. */
    public static readonly WINDOW_WIDTH_DEFAULT                     :number             = 4.5;
    /** Unified wide window width for building constructions. */
    public static readonly WINDOW_WIDTH_WIDE                        :number             = 12.0;
    /** Unified window height for building constructions. */
    public static readonly WINDOW_HEIGHT                            :number             = 4.5;
    /** Unified door frame height for building constructions. */
    public static readonly WINDOW_TOP_FRAME_HEIGHT                  :number             = 1.5;
    /** Unified window bottom frame height for building constructions. */
    public static readonly WINDOW_BOTTOM_FRAME_HEIGHT               :number             = ( SettingAEC.WALL_HEIGHT - SettingAEC.WINDOW_HEIGHT - SettingAEC.WINDOW_TOP_FRAME_HEIGHT );

    /** Unified width for a hallway in building constructions. */
    public static readonly HALLWAY_WIDTH                            :number             = 10.0;
    /** Unified pillar width for building constructions. */
    public static readonly PILLAR_WIDTH                             :number             = 2.0;
}

/* eslint-disable max-len */

import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies all settings for the game.
***********************************************************************************************************************/
export class SettingGame
{
    /** The stage the application starts up with. */
    public static readonly STAGE_STARTUP                            :bz.StageId         = bz.StageId.OFFICE;

    /** Unified wall depth for building constructions. */
    public static readonly WALL_DEPTH                               :number             = 0.2;
    /** Unified wall height (y) for building constructions. */
    public static readonly WALL_HEIGHT                              :number             = 10.0;
    /** Unified door width for building constructions. */
    public static readonly DOOR_WIDTH                               :number             = 5.0;
    /** Unified door height for building constructions. */
    public static readonly DOOR_HEIGHT                              :number             = 8.5;
    /** Unified door frame height for building constructions. */
    public static readonly DOOR_FRAME_HEIGHT                        :number             = ( SettingGame.WALL_HEIGHT - SettingGame.DOOR_HEIGHT );
    /** Unified width for a hallway in building constructions. */
    public static readonly HALLWAY_WIDTH                            :number             = 10.0;
    /** Unified floor and ceiling depth for building constructions. */
    public static readonly DEPTH_FLOOR_CEILING                      :number             = 0.1;

    /** Unified window width for building constructions. */
    public static readonly WINDOW_WIDTH                             :number             = 4.5;
    /** Unified window height for building constructions. */
    public static readonly WINDOW_HEIGHT                            :number             = 4.5;
    /** Unified door frame height for building constructions. */
    public static readonly WINDOW_TOP_FRAME_HEIGHT                  :number             = 1.5;
    /** Unified window bottom frame height for building constructions. */
    public static readonly WINDOW_BOTTOM_FRAME_HEIGHT               :number             = ( SettingGame.WALL_HEIGHT - SettingGame.WINDOW_HEIGHT - SettingGame.WINDOW_TOP_FRAME_HEIGHT );

    /** The default offset Y for room floors (in order to prevent flickering with the underlying Y layer. */
    public static readonly FLOOR_OFFSET_Y                           :number             = 0.001;

    public static readonly CRATE_MIN_ENERGY                         :number             = 3.0;
    public static readonly CRATE_MAX_ENERGY                         :number             = 6.0;
}

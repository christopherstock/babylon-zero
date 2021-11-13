/* eslint-disable max-len */
// noinspection JSUnusedGlobalSymbols

import * as bjs from 'babylonjs'

/** ********************************************************************************************************************
*   Specifies all colors the application makes use of.
***********************************************************************************************************************/
export class SettingColor
{
    /** The CSS color 'transparent'. */
    public static readonly COLOR_CSS_TRANSPARENT                       :string             = 'rgba( 0,   0,   0,   0.0 )';
    /** The CSS color 'white' with full opacity. */
    public static readonly COLOR_CSS_WHITE_OPAQUE                      :string             = 'rgba( 255, 255, 255, 1.0 )';
    /** The CSS color 'gray' with full opacity. */
    public static readonly COLOR_CSS_GRAY_OPAQUE                       :string             = 'rgba( 121, 121, 121, 1.0 )';
    /** The CSS color 'red' with full opacity. */
    public static readonly COLOR_CSS_RED_OPAQUE                        :string             = 'rgba( 255, 0,   0,   1.0 )';
    /** The CSS color 'black' with full opacity. */
    public static readonly COLOR_CSS_BLACK_OPAQUE                      :string             = 'rgba( 0,   0,   0,   1.0 )';
    /** The CSS color 'mayflower orange' with full opacity. */
    public static readonly COLOR_CSS_MAYFLOWER_ORANGE_OPAQUE           :string             = 'rgba( 237, 115, 4,   1.0 )';

    /** The RGB color 'white' without alpha information. */
    public static readonly COLOR_RGB_WHITE                             :BABYLON.Color3     = new bjs.Color3( 1.0, 1.0, 1.0 );
    /** The RGB color 'grey 0.75' without alpha information. */
    public static readonly COLOR_RGB_GREY_THREE_QUARTERS               :BABYLON.Color3     = new BABYLON.Color3( 0.75, 0.75, 0.75 );
    /** The RGB color 'grey 0.5' without alpha information. */
    public static readonly COLOR_RGB_GREY_HALF                         :BABYLON.Color3     = new BABYLON.Color3( 0.5, 0.5, 0.5 );
    /** The RGB color 'grey 0.25' without alpha information. */
    public static readonly COLOR_RGB_GREY_QUARTER                      :BABYLON.Color3     = new BABYLON.Color3( 0.25, 0.25, 0.25 );
    /** The RGB color 'red' without alpha information. */
    public static readonly COLOR_RGB_RED                               :BABYLON.Color3     = new BABYLON.Color3( 1.0, 0.0, 0.0 );
    /** The RGB color 'green' without alpha information. */
    public static readonly COLOR_RGB_GREEN                             :BABYLON.Color3     = new BABYLON.Color3( 0.0, 1.0, 0.0 );
    /** The RGB color 'blue' without alpha information. */
    public static readonly COLOR_RGB_BLUE                              :BABYLON.Color3     = new BABYLON.Color3( 0.0, 0.0, 1.0 );
    /** The RGB color 'yellow' without alpha information. */
    public static readonly COLOR_RGB_YELLOW                            :BABYLON.Color3     = new BABYLON.Color3( 1.0, 1.0, 0.0 );
    /** The RGB color 'orange' without alpha information. */
    public static readonly COLOR_RGB_ORANGE                            :BABYLON.Color3     = new BABYLON.Color3( 1.0, 0.5, 0.0 );
    /** The RGB color 'black' without alpha information. */
    public static readonly COLOR_RGB_BLACK                             :BABYLON.Color3     = new BABYLON.Color3( 0.0, 0.0, 0.0 );
    /** The RGB color 'mayflower orange' without alpha information. */
    public static readonly COLOR_RGB_MAYFLOWER_ORANGE                  :BABYLON.Color3     = new BABYLON.Color3( 0.92, 0.45, 0.01 );

    /** The RGBA color 'transparent'. */
    public static readonly COLOR_RGBA_TRANSPARENT                      :BABYLON.Color4     = new BABYLON.Color4( 0.0, 0.0, 0.0, 0.0 );
    /** The RGBA color 'dark grey' with full opacity. */
    public static readonly COLOR_RGBA_DARK_GREY_OPAQUE                 :BABYLON.Color4     = new BABYLON.Color4( 0.33, 0.33, 0.33, 1.0 );
    /** The RGBA color 'mayflower orange' with full opacity. */
    public static readonly COLOR_RGBA_ORANGE_MAYFLOWER_OPAQUE          :BABYLON.Color4     = new BABYLON.Color4( 0.92, 0.45, 0.01, 1.0 );
    /** The RGBA color 'black' with full opacity. */
    public static readonly COLOR_RGBA_BLACK_OPAQUE                     :BABYLON.Color4     = new BABYLON.Color4( 0.0, 0.0, 0.0, 1.0 );
    /** The RGBA color 'red' with full opacity. */
    public static readonly COLOR_RGBA_RED_OPAQUE                       :BABYLON.Color4     = new BABYLON.Color4( 1.0, 0.0, 0.0, 1.0 );
    /** The RGBA color 'green' with full opacity. */
    public static readonly COLOR_RGBA_GREEN_OPAQUE                     :BABYLON.Color4     = new BABYLON.Color4( 0.0, 1.0, 0.0, 1.0 );
    /** The RGBA color 'blue' with full opacity. */
    public static readonly COLOR_RGBA_BLUE_OPAQUE                      :BABYLON.Color4     = new BABYLON.Color4( 0.0, 0.0, 1.0, 1.0 );
    /** The RGBA color 'yellow' with full opacity. */
    public static readonly COLOR_RGBA_YELLOW_OPAQUE                    :BABYLON.Color4     = new BABYLON.Color4( 1.0, 1.0, 0.0, 1.0 );
    /** The RGBA color 'white' with full opacity. */
    public static readonly COLOR_RGBA_WHITE_OPAQUE                     :BABYLON.Color4     = new BABYLON.Color4( 1.0, 1.0, 1.0, 1.0 );
}

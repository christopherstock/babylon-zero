
import * as BABYLON from 'babylonjs'

/** ********************************************************************************************************************
*   Specifies all colors the application makes use of.
***********************************************************************************************************************/
export abstract class SettingColor
{
    public static readonly COLOR_CSS_TRANSPARENT                        :string             = 'rgba( 0,   0,   0,   0.0 )';
    public static readonly COLOR_CSS_WHITE_OPAQUE                       :string             = 'rgba( 255, 255, 255, 1.0 )';
    public static readonly COLOR_CSS_GRAY_OPAQUE                        :string             = 'rgba( 121, 121, 121, 1.0 )';
    public static readonly COLOR_CSS_RED_OPAQUE                         :string             = 'rgba( 255, 0,   0,   1.0 )';
    public static readonly COLOR_CSS_MAYFLOWER_ORANGE_OPAQUE            :string             = 'rgba( 237, 115, 4,   1.0 )';
    public static readonly COLOR_CSS_GREEN_OPAQUE                       :string             = 'rgba( 0,   255, 0,   1.0 )';
    public static readonly COLOR_CSS_BLUE_OPAQUE                        :string             = 'rgba( 0,   0,   255, 1.0 )';
    public static readonly COLOR_CSS_BLACK_OPAQUE                       :string             = 'rgba( 0,   0,   0,   1.0 )';
    public static readonly COLOR_CSS_GUI_MSG_GRAY_HALF_ALPHA            :string             = 'rgba( 25,  25,  25,  0.7 )';

    public static readonly COLOR_RGB_WHITE                              :BABYLON.Color3     = new BABYLON.Color3( 1.0,  1.0,  1.0  );
    public static readonly COLOR_RGB_GREY_THREE_QUARTERS                :BABYLON.Color3     = new BABYLON.Color3( 0.75, 0.75, 0.75 );
    public static readonly COLOR_RGB_GREY_HALF                          :BABYLON.Color3     = new BABYLON.Color3( 0.5,  0.5,  0.5  );
    public static readonly COLOR_RGB_GREY_QUARTER                       :BABYLON.Color3     = new BABYLON.Color3( 0.25, 0.25, 0.25 );
    public static readonly COLOR_RGB_RED                                :BABYLON.Color3     = new BABYLON.Color3( 1.0,  0.0,  0.0  );
    public static readonly COLOR_RGB_GREEN                              :BABYLON.Color3     = new BABYLON.Color3( 0.0,  1.0,  0.0  );
    public static readonly COLOR_RGB_BLUE                               :BABYLON.Color3     = new BABYLON.Color3( 0.0,  0.0,  1.0  );
    public static readonly COLOR_RGB_YELLOW                             :BABYLON.Color3     = new BABYLON.Color3( 1.0,  1.0,  0.0  );
    public static readonly COLOR_RGB_ORANGE                             :BABYLON.Color3     = new BABYLON.Color3( 1.0,  0.5,  0.0  );
    public static readonly COLOR_RGB_BLACK                              :BABYLON.Color3     = new BABYLON.Color3( 0.0,  0.0,  0.0  );
    public static readonly COLOR_RGB_MAYFLOWER_ORANGE                   :BABYLON.Color3     = new BABYLON.Color3( 0.92, 0.45, 0.01 );

    public static readonly COLOR_RGBA_TRANSPARENT                       :BABYLON.Color4     = new BABYLON.Color4( 0.0,  0.0,  0.0,  0.0 );
    public static readonly COLOR_RGBA_DARK_GREY_OPAQUE                  :BABYLON.Color4     = new BABYLON.Color4( 0.33, 0.33, 0.33, 1.0 );
    public static readonly COLOR_RGBA_MAYFLOWER_ORANGE_OPAQUE           :BABYLON.Color4     = new BABYLON.Color4( 0.92, 0.45, 0.01, 1.0 );
    public static readonly COLOR_RGBA_BLACK_OPAQUE                      :BABYLON.Color4     = new BABYLON.Color4( 0.0,  0.0,  0.0,  1.0 );
    public static readonly COLOR_RGBA_RED_OPAQUE                        :BABYLON.Color4     = new BABYLON.Color4( 1.0,  0.0,  0.0,  1.0 );
    public static readonly COLOR_RGBA_GREEN_OPAQUE                      :BABYLON.Color4     = new BABYLON.Color4( 0.0,  1.0,  0.0,  1.0 );
    public static readonly COLOR_RGBA_BLUE_OPAQUE                       :BABYLON.Color4     = new BABYLON.Color4( 0.0,  0.0,  1.0,  1.0 );
    public static readonly COLOR_RGBA_YELLOW_OPAQUE                     :BABYLON.Color4     = new BABYLON.Color4( 1.0,  1.0,  0.0,  1.0 );
    public static readonly COLOR_RGBA_WHITE_OPAQUE                      :BABYLON.Color4     = new BABYLON.Color4( 1.0,  1.0,  1.0,  1.0 );
}

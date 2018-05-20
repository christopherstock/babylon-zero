
    import * as bz from '../..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Specifies all adjustments and balancings for the game.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SettingGame
    {
        /** The scene's gravity. */
        public  static  readonly    GRAVITY                                     :number             = -10.0;

        /** The startup camera type. */
        public  static  readonly    DEFAULT_CAMERA                              :bz.CameraType      = bz.CameraType.FREE_DEBUG;

        /** The player's radius on the XoZ axis. */
        public  static  readonly    PLAYER_RADIUS_XZ                            :number             = 2.0;
        /** The player's height on the Y axis. */
        public  static  readonly    PLAYER_HEIGHT_Y                             :number             = 4.0;
        /** The player's head radius on all axis. */
        public  static  readonly    PLAYER_HEAD_RADIUS                          :number             = 0.5;

        /** The player's moving speed in world coordinate per tick. */
        public  static  readonly    PLAYER_SPEED_MOVE                           :number             = 0.25;
        /** The player's straving speed in world coordinate per tick. */
        public  static  readonly    PLAYER_SPEED_STRAVE                         :number             = 0.35;
        /** The player's turning speed in degrees per tick. */
        public  static  readonly    PLAYER_SPEED_TURN                           :number             = 2.5;
        /** The player's looking up/down speed in degrees per tick. */
        public  static  readonly    PLAYER_SPEED_LOOK_UP_DOWN                   :number             = 2.0;
        /** The player's speed for rapidly centering the up/down view aim in degrees per tick. */
        public  static  readonly    PLAYER_SPEED_CENTER_LOOK_UP_DOWN            :number             = 1.0;

        /** The player's maximum looking up/down in degrees. */
        public  static  readonly    PLAYER_MAX_LOOK_UP_DOWN                     :number             = 60.0;

        /** The RGB color 'white' with full opacity. */
        public  static  readonly    COLOR_WHITE                                 :BABYLON.Color3     = new BABYLON.Color3( 1.0, 1.0, 1.0 );
        /** The RGB color 'black' with full opacity. */
        public  static  readonly    COLOR_BLACK                                 :BABYLON.Color3     = new BABYLON.Color3( 0.0, 0.0, 0.0 );

        /** The RGBA color 'transparent'. */
        public  static  readonly    COLOR_TRANSPARENT_RGBA                      :BABYLON.Color4     = new BABYLON.Color4( 0.0, 0.0, 0.0, 0.0 );
        /** The RGBA color 'dark grey' with full opacity. */
        public  static  readonly    COLOR_DARK_GREY_OPAQUE_RGBA                 :BABYLON.Color4     = new BABYLON.Color4( 0.33, 0.33, 0.33, 1.0 );
        /** The RGBA color 'mayflower orange' with full opacity. */
        public  static  readonly    COLOR_ORANGE_MAYFLOWER_OPAQUE_RGBA          :BABYLON.Color4     = new BABYLON.Color4( 0.92, 0.45, 0.01, 1.0 );
        /** The RGBA color 'red' with full opacity. */
        public  static  readonly    COLOR_RED_OPAQUE_RGBA                       :BABYLON.Color4     = new BABYLON.Color4( 1.0, 0.0, 0.0, 1.0 );
        /** The RGBA color 'green' with full opacity. */
        public  static  readonly    COLOR_GREEN_OPAQUE_RGBA                     :BABYLON.Color4     = new BABYLON.Color4( 0.0, 1.0, 0.0, 1.0 );
        /** The RGBA color 'blue' with full opacity. */
        public  static  readonly    COLOR_BLUE_OPAQUE_RGBA                      :BABYLON.Color4     = new BABYLON.Color4( 0.0, 0.0, 1.0, 1.0 );
        /** The RGBA color 'black' with full opacity. */
        public  static  readonly    COLOR_BLACK_OPAQUE_RGBA                     :BABYLON.Color4     = new BABYLON.Color4( 0.0, 0.0, 0.0, 1.0 );
    }

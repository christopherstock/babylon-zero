
    import * as bz from '../..';
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   Specifies all adjustments and balancings for the game.
    *******************************************************************************************************************/
    export class SettingGame
    {
        /** The scene's gravity. */
        public  static  readonly    GRAVITY                                     :number             = -0.1;

        /** The startup camera type. */
        public  static  readonly    DEFAULT_CAMERA                              :bz.CameraType      = bz.CameraType.FREE_DEBUG;

        /** The player's x and z dimension (radius). */
        public  static  readonly    PLAYER_SIZE_XZ                              :number             = 2.0;
        /** The player's y dimension (height). */
        public  static  readonly    PLAYER_SIZE_Y                               :number             = 2.0;

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

        /** The RGB color 'white'. */
        public  static  readonly    COLOR_WHITE                                 :BABYLON.Color3     = new BABYLON.Color3( 1.0, 1.0, 1.0 );
        /** The RGBA color 'transparent'. */
        public  static  readonly    COLOR_TRANSPARENT                           :BABYLON.Color4     = new BABYLON.Color4( 0.0, 0.0, 0.0, 0.0 );
        /** The RGBA color 'dark grey'. */
        public  static  readonly    COLOR_DARK_GREY                             :BABYLON.Color4     = new BABYLON.Color4( 0.33, 0.33, 0.33, 1.0 );
        /** The RGBA color 'mayflower orange'. */
        public  static  readonly    COLOR_ORANGE_MAYFLOWER                      :BABYLON.Color4     = new BABYLON.Color4( 0.92, 0.45, 0.01, 1.0 );
    }

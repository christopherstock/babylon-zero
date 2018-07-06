
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Specifies all adjustments and balancings for the game.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SettingGame
    {
        /** The global scene gravity. */
        public  static  readonly    STAGE_GRAVITY_GLOBAL                        :BABYLON.Vector3    = new BABYLON.Vector3( 0, -10.0, 0 );

        /** The player's radius on the XoZ axis. */
        public  static  readonly    PLAYER_RADIUS_BODY_XZ                       :number             = 1.175;
        /** The player's height on the Y axis. */
        public  static  readonly    PLAYER_HEIGHT_Y                             :number             = 4.0;
        /** The player's position Y of the hands. */
        public  static  readonly    PLAYER_HAND_HEIGHT                          :number             = 2.5;
        /** The player's head radius on all axis. */
        public  static  readonly    PLAYER_RADIUS_HEAD                          :number             = 0.5;

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
    }


    import * as bz from '../..';

    /*****************************************************************************
    *   Specifies all adjustments and balancings for the game.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class SettingGame
    {
        /** The player's speed in world coordinate per tick. */
        public      static      PLAYER_SPEED_MOVE                           :number             = 10;
        /** The player's turning speed in degrees per tick. */
        public      static      PLAYER_SPEED_TURN                           :number             = 5.0;
        /** The player's looking up/down speed in degrees per tick. */
        public      static      PLAYER_SPEED_LOOK_UP_DOWN                   :number             = 2.5;
        /** The player's maximum looking up/down in degrees. */
        public      static      PLAYER_MAX_LOOK_UP_DOWN                     :number             = 60.0;
        /** The player's speed for centering the up/down view aim in degrees per tick. */
        public      static      PLAYER_SPEED_CENTER_VIEW_AIM                :number             = 5.0;
    }

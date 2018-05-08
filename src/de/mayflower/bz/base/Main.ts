
    require( '../css/global.less' );

    import * as bz from '..';

    /*******************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Specify, how deep the player rect may sink into colliding objects. (0 would be perfect!)
    *   TODO Supply rotations for all axis in mesh creators via Quaternons?
    *   TODO Enable player look rotZ bouncing back to 0.
    *   TODO Try impulse based movement once again for the player?
    *   TODO Create (invisible) cylinder bounding box for player?
    *   TODO Smooth camera animation on active camera change?
    *   TODO Add camera constants to settings.
    *   TODO make param for mesh's physics attributes (increase player mass!)!
    *   TODO Remove all ids for meshes, textures and materials? Use Auto-Counters?
    *   TODO MeshFactory enums to separate file MeshProps.
    *   TODO Auto-Calc mass according to mesh volume: Calculate mass for boxes according to their density. Create density value!
    *   TODO make game objects (static wall, non-static movable, player etc.)
    *   TODO Create 3d gun as 2nd scene in front?
    *   TODO Check Perfect Dark and Goldeneye sound board.
    *   TODO Solve correct tiling for boxes (faceUVs, backUVs).
    *   TODO Try fog or smoke?
    *   TODO Assign player size from settings constants.
    *   TODO Try to solve player smooth sliding on any walls!
    *   TODO Enable jumping!
    *   TODO Delete LevelBunny. Move all functonality to LevelTest.
    *   TODO Add player/camrera controls (turn, duck)
    *   TODO Solve player falling into infinity (camera stops at .. ?)
    *   TODO Enrich and correct all documentation.
    *   TODO Solve free rotations physics for camera object (on rotated planes or boxes?)
    *   TODO Catch mouse in window in browser?? https://www.html5rocks.com/en/tutorials/pointerlock/intro/
    *   TODO Solve ortho drawing!
    *   TOOD Try GUI via babylon-gui.
    *   TODO Create debug console on-screen.
    *   TODO Try fur.
    *   TODO Improve performance in chrome? Try webGL 1.0??
    *   TODO Show FPS output as Ortho drawing: bz.MfgInit.engine.getFps().toFixed() + " fps"
    *   TODO Increase performance in chrome?
    *   TODO Create material system with unified parameters!
    *   TODO Solve lights. Create lights system.
    *   TODO Improve Sprite System handling.
    *   TODO move onInitLevelCompleted to class Level and also scene to class level?
    *   TODO specify explicit gravity for physics engine and scene?
    *   TODO Add creators for more mesh primitives!
    *   TODO Improve mesh system.
    *   TODO Fix skybox and link to camera!
    *   TODO Enable wearpon zoom. (view angle / camera solution?)
    *   TODO Collisions via shooting..
    *   TODO Bullet holes.
    *   TODO Solve shadows?
    *   TODO Create simple test level with increased performance!
    *   TODO Improve abstract level system and make it more generic.
    *   TODO Try PostProcess (camera.setPostProcess ?)
    *   TODO Create main menu where player can reset level etc.
    *   TODO Solve 3dsmax OBJ file importer? ( with different OBJ file? )
    *   TODO try dynamic textures ( video in texture in front of screen .. )
    *   TODO Review babylon.JS tutorials, features and playground.
    *******************************************************************************************************************/
    export class Main
    {
        /** The singleton instance of the game. */
        public      static          game                    :bz.Game                    = null;

        /***************************************************************************************************************
        *   This method is invoked when the application starts.
        ***************************************************************************************************************/
        public static main() : void
        {
            bz.HTML.setTitle( bz.SettingEngine.TITLE );

            Main.acclaim();

            Main.game = new bz.Game();
            Main.game.init();
        }

        /***************************************************************************************************************
        *   Acclaims the debug console.
        ***************************************************************************************************************/
        private static acclaim() : void
        {
            bz.Debug.acclaim.log( bz.SettingEngine.TITLE );
            bz.Debug.acclaim.log();
        }
    }

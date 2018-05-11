
    require( '../css/global.less' );

    import * as bz from '..';

    /*******************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Assign player size from settings constants.
    *   TODO Assign player head and body size from settings constants.
    *
    *   TODO make game objects (static wall, non-static movable, player etc.)
    *   TODO Create (different?) characters from primitives or mesh objects?
    *
    *   TODO Check cannonJs examples ? (human.js .. bones etc.)
    *   TODO Find a way to control sink amount for colliding meshes in Cannon.js?
    *
    *   TODO Remove all ids for meshes, textures and materials? Use Auto-Counters?
    *   TODO Collisions via shooting.
    *   TODO Bullet holes.
    *
    *   TODO Create 3d gun as 2nd scene in front?
    *   TODO Add creators for more mesh primitives! (triangles?)
    *   TODO Draw line primitives?
    *
    *   TODO Solve correct tiling for boxes (faceUVs, backUVs).
    *   TODO Create debug console on-screen.
    *   TODO Solve shadows?
    *   TOOD Try GUI via babylon-gui.
    *   TODO Try fog or smoke?
    *   TODO Try to create a realistic scene.
    *
    *   TODO Solve shaking on colliding and walking against walls!
    *   TODO Try to solve player smooth sliding on any walls!
    *
    *   TODO Create skybox and link to player! (skybox.infiniteDistance = true;)
    *   TODO Smooth camera animation on active camera change?
    *   TODO Auto-Calc mass according to mesh volume: Calculate mass for boxes according to their density. Create density value!
    *
    *   TODO Solve player falling into infinity (camera stops at .. ?)
    *   TODO Enrich and correct all documentation.
    *
    *   TODO Check Perfect Dark and Goldeneye sound board.
    *   TODO Enable jumping!
    *   TODO Specify, how deep the player rect may sink into colliding objects. (0 would be perfect!) ?
    *   TODO Delete LevelBunny. Move all functonality to LevelTest.
    *   TODO Improve performance in chrome? Try explicitly setting 'webGL 1.0'??
    *   TODO Add player/camrera controls (turn, duck)
    *   TODO Solve free rotations physics for camera object (on rotated planes or boxes?)
    *   TODO Catch mouse in window in browser?? https://www.html5rocks.com/en/tutorials/pointerlock/intro/
    *   TODO Improve mesh system.
    *   TODO Solve ortho drawing!
    *   TODO Show FPS output as Ortho drawing: bz.MfgInit.engine.getFps().toFixed() + " fps"
    *   TODO Increase performance in chrome?
    *   TODO Create material system with unified parameters!
    *   TODO Solve lights. Create lights system.
    *   TODO Improve Sprite System handling.
    *   TODO move onInitLevelCompleted to class Level and also scene to class level?
    *   TODO Try fur.
    *   TODO Enable wearpon zoom. (view angle / camera solution?)
    *   TODO Improve abstract level system and make it more generic.
    *   TODO Try PostProcess (camera.setPostProcess ?)
    *   TODO Create main menu where player can reset level etc.
    *   TODO Solve 3dsmax OBJ file importer? ( with different OBJ file? )
    *   TODO Try 3dsmax 2018/2019 with babylon plugin?
    *   TODO try dynamic textures ( video in texture in front of screen for company presentation site .. )
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

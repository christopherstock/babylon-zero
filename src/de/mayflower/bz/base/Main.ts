
    require( '../css/global.less' );

    import * as bz from '..';

    /** ****************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Auto-Calc mass according to density and volume: Create density value!
    *
    *   TODO Create collections for all meshes in Level.
    *
    *   TODO make game objects (static wall, non-static movable, player etc.)
    *   TODO Create (different?) characters from primitives or mesh objects?
    *   TODO Create class for compound object creation ("createTree").
    *
    *   TODO Check collisions via shooting.
    *   TODO Create shooting.
    *   TODO Create Bullet holes.
    *
    *   TODO Create 3d gun as 2nd scene in front?
    *
    *   TOOD Try GUI via babylon-gui.
    *   TODO Solve ortho drawing!
    *   TODO Create debug console on-screen.
    *   TODO Improved triangle / polygon drawing by xyz vertices?
    *   TODO Show FPS output as Ortho drawing: bz.MfgInit.engine.getFps().toFixed() + " fps"
    *   TODO Minor jitter bug improvements on colliding walls?
    *
    *   TODO Try to create a realistic scene.
    *   TODO Solve lights. Create lights system.
    *   TODO Solve shadows?
    *   TODO Try fog or smoke?
    *
    *   TODO Solve free rotations physics for camera object (on rotated planes or boxes?)
    *   TODO Rotating texture UVs for certain box sides?
    *
    *   TODO Delete LevelBunny. Move all functonality to LevelTest.
    *
    *   TODO Smooth camera transfers / animation on changine active camera?
    *
    *   TODO Try 3dsmax 2018/2019 with babylon plugin?
    *   TODO Solve 3dsmax OBJ file importer? ( with different OBJ file? )
    *
    *   TODO Improve mesh system.
    *
    *   TODO Enable jumping?
    *   TODO Find a way to control sink amount for colliding meshes in Cannon.js?
    *   TODO Improve performance in chrome? Try explicitly setting 'webGL 1.0'??
    *   TODO Check cannonJs examples ? (human.js .. bones etc.)
    *   TODO Add player/camrera controls (turn, duck)
    *   TODO Check Perfect Dark and Goldeneye sound board.
    *
    *   TODO Improve Sprite System handling (asset loading etc.).
    *
    *   TODO Try PostProcess (camera.setPostProcess ?)
    *   TODO try dynamic textures ( video in texture in front of screen for company presentation site .. )
    *
    *   TODO Enable wearpon zoom. (view angle / camera solution?)
    *   TODO Catch mouse in window in browser?? https://www.html5rocks.com/en/tutorials/pointerlock/intro/
    *   TODO Specify, how deep the player rect may sink into colliding objects. (0 would be perfect!) ?
    *   TODO Increase performance in chrome?
    *   TODO Create material system with unified parameters!
    *   TODO move onInitLevelCompleted to class Level and also scene to class level?
    *   TODO Try fur.
    *   TODO Improve abstract level system and make it more generic.
    *   TODO Create main menu where player can reset level etc.
    *   TODO Review babylon.JS tutorials, features and playground.
    *******************************************************************************************************************/
    export class Main
    {
        /** The singleton instance of the game. */
        public      static          game                    :bz.Game                    = null;

        /** ************************************************************************************************************
        *   This method is invoked when the application starts.
        ***************************************************************************************************************/
        public static main() : void
        {
            bz.HTML.setTitle( bz.SettingEngine.TITLE );

            Main.acclaim();

            Main.game = new bz.Game();
            Main.game.init();
        }

        /** ************************************************************************************************************
        *   Acclaims the debug console.
        ***************************************************************************************************************/
        private static acclaim() : void
        {
            bz.Debug.acclaim.log( bz.SettingEngine.TITLE );
            bz.Debug.acclaim.log();
        }
    }

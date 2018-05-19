
    require( '../css/global.less' );

    import * as bz from '..';

    /** ****************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Try fog or smoke?
    *   TODO Delete LevelBunny. Move all functonality to LevelTest.
    *   TODO Introduce class 'MeshCollection'.
    *
    *   TOOD Try GUI via babylon-gui.
    *   TODO Solve ortho drawing!
    *   TODO Create level param for default material emission.
    *   TODO Create debug console on-screen.
    *   TODO Improved triangle / polygon drawing by xyz vertices?
    *   TODO Flag createPlane deprecated and replace with createBox in order to support lights.
    *   TODO Show FPS output as Ortho drawing: bz.MfgInit.engine.getFps().toFixed() + " fps"
    *   TODO Minor jitter bug improvements on colliding walls?
    *
    *   TODO Enable rotation meshes (walls, items) etc.!
    *   TODO Create class for multi-meshed object creation ("createTree": create wall?).
    *   TODO All volume calculations to MathUtil functions.
    *   TODO Create (different?) characters from primitives or mesh objects?
    *   TODO Create a football.
    *
    *   TODO Check collisions via shooting.
    *   TODO Create shooting.
    *   TODO Create Bullet holes.
    *
    *   TODO Create 3d gun as 2nd scene in front?
    *
    *   TODO Solve pickable items.
    *
    *   TODO Solve free rotations physics for camera object (on rotated planes or boxes?)
    *   TODO Rotating texture UVs for certain box sides?
    *
    *   TODO Smooth camera transfers / animation on changine active camera?
    *
    *   TODO Try 3dsmax 2018/2019 with babylon plugin?
    *   TODO Solve 3dsmax OBJ file importer? ( with different OBJ file? )
    *
    *   TODO Improve abstract level system and make it more generic.
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
    *   TODO move onInitLevelCompleted to class Level and also scene to class level?
    *   TODO Create material system with unified parameters!
    *   TODO try dynamic textures ( video in texture in front of screen for company presentation site .. )
    *   TODO Increase performance in chrome?
    *
    *   TODO Try fur.
    *   TODO Create main menu where player can reset level etc.
    *   TODO Enable wearpon zoom. (view angle / camera solution?)
    *   TODO Catch mouse in window in browser?? https://www.html5rocks.com/en/tutorials/pointerlock/intro/
    *   TODO Specify how deep the player rect may sink into colliding objects. (0 would solve!) Try impulse again?
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

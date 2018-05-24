
    require( '../css/global.less' );

    import * as bz from '..';

    /** ****************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO bundle all texture parameters in MaterialFactory to separate class TextureInfo etc.?
    *   TODO Bundle material being propagated to all MeshFactory functions..?
    *   TODO Enable physics and collisions for imported meshes.
    *
    *   TODO add enums for physic friction and restitution.
    *
    *   TODO Level.setupLights to class lightSystem and class LightFactory with dynamic LightId.
    *
    *   TODO Introduce class 'MeshCollection'.
    *   TODO Remove all planes from the level!
    *
    *   TODO Separate lib classes for reusability (All classes that implement BABYLON)??
    *   TODO Implement lib classes via git external?
    *
    *   TOOD Try GUI via babylon-gui.
    *   TODO Solve ortho drawing!
    *   TODO Show FPS output as Ortho drawing: bz.MfgInit.engine.getFps().toFixed() + " fps"
    *   TODO Create debug console on-screen.
    *
    *   TODO Precreate all textures?
    *   TODO Solve pickable items.
    *
    *   TODO Created improved triangle / polygon drawing by xyz vertices?
    *   TODO Try fog or smoke?
    *   TODO Minor jitter bug improvements on colliding walls?
    *   TODO Enable rotation for all meshes (walls, items) etc.!
    *   TODO Create class for multi-meshed object creation ("createTree": create wall?).
    *
    *   TODO All body volume calculations to MathUtil functions.
    *   TODO Create (different?) characters from primitives or mesh objects?
    *
    *   TODO Check collisions via shooting.
    *   TODO Create shooting.
    *   TODO Create Bullet holes.
    *   TODO Create 3d gun as 2nd scene in front?
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

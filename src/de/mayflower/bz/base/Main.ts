
    require( '../css/global.less' );

    import * as bz from '..';

    /** ****************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Project: Helmet Product Configurator
    *   =========================================
    *   TODO Alter helmet visir material on button press.
    *   TODO Try reflections and glossy fx for textures.
    *   TODO Parameterize for arc rotation camera.
    *   TODO Create superclass for all non-level-stages! (or superclass for all actual level stages!)
    *   TODO Move 'beginAnimation' for Helmet animation to MeshFactory etc.
    *   TODO Add param 'enabled' as constructor params for all lights.
    *   TODO Create custom preloader (company logo etc.).
    *
    *   TOOD Try GUI via babylon-gui.
    *   TODO Solve ortho drawing!
    *   TODO Show FPS output as Ortho drawing: bz.MfgInit.engine.getFps().toFixed() + " fps"
    *   TODO Create debug console on-screen?
    *   =========================================
    *
    *   TODO Check requirement of emissiveColor in materials (TestLevel)! maybe ambient scene color is sufficient?
    *   TODO Move TS and JS classes etc. to babylon-zero-lib.
    *   TODO invoke setPositionAndPivot for imported meshes: replace with bounding box info??
    *   TODO Check for babylon.JS lib update!
    *   TODO Check control delay gap in firefox. (edge, chrome?) check KeySystem! (babylon-engine is running smoothly!)
    *   TODO Improve Sprite System handling and make it dynamic! (asset loading etc.).
    *   TODO Minor jitter bug improvements on colliding walls?
    *   TODO Enable rotation for all meshes (walls, items) etc.!
    *   TODO Precreate all textures?
    *   TODO Create class for multi-meshed object creation ("createTree": create wall?).
    *   TODO All body volume calculations to MathUtil functions.
    *   TODO Separate lib classes for reusability (All classes that implement BABYLON) as separate npm package!
    *   TODO Create (different?) characters from primitives or mesh objects?
    *   TODO Solve pickable game items.
    *   TODO Add physical compound (link?) for imported mesh collections.
    *   TODO Load all 3d objects into a tmp scene and copy to separate staged scene?
    *   TODO Improve camera system for actual usage. ( remove non-required cameras? )
    *   TODO Improve camera startup positions and enable used cameras only.
    *   TODO Check collisions via shooting.
    *   TODO Create shooting.
    *   TODO Create Bullet holes.
    *   TODO Create 3d gun as 2nd scene in front?
    *   TODO Smooth camera transfers / animation on changine active camera?
    *   TODO Improve abstract stage system and make it more generic.
    *   TODO Improve mesh system.
    *   TODO Enable jumping?
    *   TODO Find a way to control sink amount for colliding meshes in Cannon.js?
    *   TODO Improve performance in chrome? Try explicitly setting 'webGL 1.0'??
    *   TODO Check cannonJs examples ? (human.js .. bones etc.)
    *   TODO Add player/camrera controls (turn, duck)
    *   TODO Check Perfect Dark and Goldeneye sound board.
    *   TODO Try PostProcess (camera.setPostProcess ?)
    *   TODO move onInitLevelCompleted to class Level and also scene to class stage?
    *   TODO Create material system with unified parameters!
    *   TODO try dynamic textures ( video in texture in front of screen for company presentation site .. )
    *   TODO Increase performance in chrome?
    *   TODO Rotating texture UVs for certain box sides? (may be obsolete though importing meshes!)
    *   TODO Try fog or smoke?
    *   TODO Created improved triangle / polygon drawing by xyz vertices?
    *   TODO Try fur.
    *   TODO Create MVP-Techn-Demo with rotating logo intro etc.
    *   TODO Try video textures!
    *   TODO Create main menu where player can reset stage etc.
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

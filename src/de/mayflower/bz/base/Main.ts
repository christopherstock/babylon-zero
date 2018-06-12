
    require( '../css/global.less' );

    import * as bz from '..';

    /** ****************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Solve constant GUI dimensions on resizing screen!
    *
    *   TODO Project: Helmet Product Configurator
    *   =========================================
    *   TODO Check 3D model creation from photos?
    *   TODO GUI for switching color/material of visir / helmet.
    *   TODO Alter helmet visir color / material on button press.
    *   TODO Try reflections and glossy fx for textures.
    *   TODO Parameterize constructor of arc rotation camera.
    *   TODO Create superclass for all non-level-stages! (or superclass for all actual level stages!)
    *   TODO Move 'beginAnimation' for Helmet animation to MeshFactory etc.
    *   TODO Outsource resize handler and blur handler code to separate methods.
    *   TODO Add param 'enabled' as constructor params for all lights.
    *   TODO Move level stages and presentation stages to separate subpackages.
    *   TODO Show FPS output as Ortho drawing: bz.MfgInit.engine.getFps().toFixed() + " fps"
    *   TODO Create custom preloader (company logo, app title, loading bar etc.).
    *   TODO Improve Scene selection and cam selection (F1-F5, 1-5) and disable in LIVE mode.
    *   TODO Check for babylon.JS lib update!
    *   TODO Improve light (point) for 3d product configurator.
    *   TODO Test all features and performance in all browsers.
    *   TODO Create GUI Factory for babylon.GUI component creation.
    *   TODO Remove and replace by GUI Factory.
    *   =========================================
    *
    *   TODO Improve Sprite System handling and make it dynamic! (asset loading etc.).
    *   TODO invoke setPositionAndPivot for imported meshes: replace with bounding box info??
    *   TODO Improve camera startup positions for all cameras and enable used cameras only.
    *   TODO Check control delay gap in firefox. (edge, chrome?) check KeySystem! (babylon-engine is running smoothly!)
    *
    *   TODO Minor jitter bug improvements on colliding walls?
    *   TODO Enable rotation for all meshes (walls, items) etc.!
    *   TODO Precreate all textures?
    *
    *   TODO Create class for multi-meshed object creation ("createTree": create wall?).
    *   TODO Move all body volume calculations to MathUtil functions.
    *   TODO Create (different?) characters from primitives or mesh objects?
    *   TODO move onInitLevelCompleted to class Level and also scene to class stage?
    *   TODO Multiple player objects: car, etc?
    *
    *   TODO Solve pickable game items.
    *   TODO Add physical compound (link?) for imported mesh collections.
    *   TODO Load all 3d objects into a tmp scene and copy to separate staged scene?
    *   TODO Improve camera system for actual usage. ( remove non-required cameras? )
    *
    *   TODO Check collisions via shooting.
    *   TODO Create shooting.
    *   TODO Create Bullet holes.
    *   TODO Create 3d gun as 2nd scene in front?
    *   TODO Smooth camera transfers / animation on changine active camera?
    *   TODO Improve abstract stage system and make it more generic.
    *   TODO Improve mesh system.
    *   TODO Enable jumping?
    *   TODO Reduce static accesses to Main.game.
    *   TODO Create SettingPlayer, SettingColor and SettingStage.
    *   TODO Find a way to control sink amount for colliding meshes in Cannon.js?
    *   TODO Improve performance in chrome? Try explicitly setting 'webGL 1.0'??
    *   TODO Check cannonJs examples ? (human.js .. bones etc.)
    *   TODO Add player/camrera controls (turn, duck)
    *   TODO Check Perfect Dark and Goldeneye sound board.
    *   TODO Try PostProcess (camera.setPostProcess ?)
    *   TODO Create material system with unified parameters!
    *   TODO try dynamic textures ( video in texture in front of screen for company presentation site .. )
    *   TODO Increase performance in chrome?
    *   TODO Rotating texture UVs for certain box sides? (may be obsolete though importing meshes!)
    *   TODO Try fog or smoke?
    *   TODO Created improved triangle / polygon drawing by xyz vertices?
    *   TODO Try fur.
    *   TODO Create MVP-Techn-Demo with rotating logo intro etc.
    *   TODO Create debug console on-screen?
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

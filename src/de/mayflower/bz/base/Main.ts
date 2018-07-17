
    require( '../css/global.less' );

    import * as bz from '..';

    /** ****************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Fix rotation assignment for bullet holes (on chair etc.). https://stackoverflow.com/questions/26907686/babylon-js-place-a-plane-normal-to-the-clicked-surface
    *
    *   TODO Clip bullet hole to wall ( avoid bullet holes on edges ) https://github.com/CraigFeldspar/BabylonCSG
    *
    *   TODO Quick fire animation in bullet hole (for certain materials..)?
    *   TODO Create and test spatial sound (bullet hit). https://doc.babylonjs.com/how_to/playing_sounds_and_music
    *   TODO Enable fully ready 3d models with texture, materials, physics impostors and physics values.
    *
    *   TODO Introduce physics attribute param to createImportedModel().
    *
    *   TODO Create enum for possible skyboxes!
    *   TODO Enable player ducking!
    *
    *   TODO Limit number of bullet holes to 256 etc. (check performance on 1000 etc.) ?
    *   TODO Create 3d gun as 2nd scene in front?
    *   TODO Create air friction for ALL movables in render() of scene!
    *   TODO Add particle system (fx) for bullet holes' wall rubble.
    *   TODO Use BABYLON.Angle instead of own implementation?
    *   TODO Add physical compound (link?) for imported mesh collections.
    *   TODO Minor jitter bug improvements on colliding walls?
    *   TODO Check 'gamelets' in the babylon.JS docs.
    *   TODO Create HUD message queue.
    *   TODO Remove importedModels from Stage and replace with game objects.
    *   TODO Complete MVP Tech-Demo 'The Office'.
    *
    *   TODO Create (different?) characters from primitives or mesh objects??
    *   TODO Create SettingPlayer with all player settings.
    *   TODO Smooth camera transfers / animation on changine active camera?
    *   TODO Move all body volume calculations to MathUtil functions.
    *   TODO Load all 3d objects into a tmp scene and copy to separate staged scene?
    *   TODO Improve camera system for actual usage. ( remove non-required cameras? )
    *   TODO Enable jumping?
    *   TODO decouple player and visibility change method from CameraSystem?
    *   TODO Replace Model.getMeshes() with specific methods.
    *   TODO Check control delay gap in firefox. (edge, chrome?) check KeySystem! (babylon-engine is running smoothly!)
    *   TODO Solve different GUI text sizes that keep their constant size on canvas resize?
    *   TODO Reduce static accesses to Main.game.
    *   TODO Improve Scene selection and cam selection (replace F1-F5, 1-5) with dropdowns etc.
    *   TODO Alter the pivot for imported models?
    *   TODO Create SettingPlayer, SettingColor and SettingStage.
    *   TODO Enable wearpon that can fire through walls (magnum etc).
    *   TODO Add wearpon zoom.
    *   TODO Find a way to control sink amount for colliding meshes in Cannon.js?
    *   TODO Different player objects: physics for car, etc?
    *   TODO Improve performance in chrome? Try explicitly setting 'webGL 1.0'??
    *   TODO Check cannonJs examples ? (human.js .. bones etc.)
    *   TODO Add player/camrera controls (turn, duck)
    *   TODO Check Perfect Dark and Goldeneye sound board.
    *   TODO Try PostProcess (camera.setPostProcess ?)
    *   TODO Create material system with unified parameters!
    *   TODO Create superclass for presentation stages?
    *   TODO try dynamic textures ( video in texture in front of screen for company presentation site .. )
    *
    *   TODO Check 3D model creation from photos ( for 3D product configurator )?
    *   TODO Increase performance in chrome?
    *   TODO Rotating texture UVs for certain box sides? (may be obsolete though importing meshes!)
    *   TODO Try fog or smoke?
    *   TODO Created improved triangle / polygon drawing by xyz vertices?
    *   TODO Try fur.
    *   TODO View 360 Photodome http://doc.babylonjs.com/how_to/360photodome
    *   TODO Check method for disposing all scene members (scene.dispose()) again ?
    *   TODO Create debug console on-screen?
    *   TODO Try video textures!
    *   TODO Make sprites collidable?
    *   TODO Try 3D GUI again ( requires babylon.JS 3.3 ).
    *   TODO Create main menu where player can reset stage etc.
    *   TODO Enable !wearpon zoom. (view angle / camera solution?)
    *   TODO Catch mouse in window in browser?? https://www.html5rocks.com/en/tutorials/pointerlock/intro/
    *   TODO Specify how deep the player rect may sink into colliding objects. (0 would solve!) Try impulse again?
    *   TODO Review babylon.JS tutorials, features and playground for gathering new features.
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
            bz.HTML.setTitle( bz.SettingEngine.TITLE + ', ' + bz.Version.getCurrent() );
            Main.acclaim();

            Main.game = new bz.Game();
            Main.game.init();
        }

        /** ************************************************************************************************************
        *   Acclaims the debug console.
        ***************************************************************************************************************/
        private static acclaim() : void
        {
            bz.Debug.acclaim.log( bz.SettingEngine.TITLE  );
            bz.Debug.acclaim.log( bz.Version.getCurrent() );
            bz.Debug.acclaim.log();
        }
    }


    require( '../css/global.less' );

    import * as bz from '..';

    /** ****************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Remove getMeshes() from Model and replace with discreet functions.
    *   TODO Stick meshes of an imported model together without stiffness so they act as one unit.
    *   TODO Let models crash into their separate elements/meshes on being destroyed?
    *   TODO Darken faces / submeshes if being shot and damaged?
    *
    *   TODO Catch mouse in window in browser?? https://www.html5rocks.com/en/tutorials/pointerlock/intro/
    *   TODO Add particle system (fx) for bullet holes' wall rubble.
    *   TODO Checkout babylon.JS bones and skeletons?
    *
    *   TODO Enable fully ready 3d models with texture, materials, physics impostors and physics values?
    *   TODO Create wearpons with projectiles.
    *
    *   TODO Create and test spatial sounds (bullet hit). https://doc.babylonjs.com/how_to/playing_sounds_and_music
    *   TODO Sounds for shot, bullet hit and bullet drop.
    *
    *   TODO Enable wearpon system with different wearpons: magazine size, shoot angles, range, zoom ..
    *
    *   TODO Remove bullet hole flickering for the 1st shot and initial camera position???
    *   TODO Enable jumping? Determine player floor collision ...
    *   TODO Find a way to control sink amount for colliding meshes in Cannon.js?
    *   TODO Check cannonJs examples ? (human.js .. bones etc.)
    *
    *   TODO Create air friction for ALL movables in render() of scene!
    *   TODO Improve Scene selection and cam selection (replace F1-F5, 1-5) with dropdowns etc.
    *   TODO Merge all game objects to one array in Stage?
    *
    *   TODO Minor jitter bug improvements on colliding walls?
    *   TODO Specify how deep the player rect may sink into colliding objects. (0 would solve!) Try impulse again?
    *
    *   TODO Advanced topics:
    *   =====================
    *   TODO Add physically correct bullet drop out after fire.
    *   TODO Fix view angle if ducking (revise scaling ..).
    *   TODO Quick fire animation in bullet hole (for certain materials..)?
    *   TODO Improve performance in chrome? Try explicitly setting 'webGL 1.0'??
    *   TODO Add wearpon panning (pan view/angle on moving crosshair to the screen border)?
    *   TODO Smooth edges for bullet holes? Certain bullet hole shapes look white?
    *   TODO Zoom HUD wearpon on zooming?
    *   TODO Create 3d gun as 2nd scene in front?
    *   TODO Check 'gamelets' in the babylon.JS docs.
    *   TODO Reduce static accesses to Main.game?
    *   TODO Fix decals flickering in certain view angles ?
    *   TODO Add muzzle flash to gun on firing.
    *   TODO Complete MVP Tech-Demo 'The Office', 1st minor, still life etc.
    *
    *   TODO Create (different?) characters from primitives or mesh objects??
    *   TODO Create class Bot that represents an enemy with one field for attitude.
    *   TODO Different player objects: physics for car, etc?
    *   TODO Create class Character, the abstract class of Player and Bot.
    *   TODO Load all 3d objects into a separate scene and copy to separate staged scene?
    *   TODO Smooth camera transfers / animation on changine active camera?
    *   TODO Make sprites collidable?
    *   TODO Check control delay gap in firefox. (edge, chrome?) check KeySystem! (babylon-engine is running smoothly!)
    *   TODO Solve different GUI text sizes that keep their constant size on canvas resize?
    *   TODO Check method for disposing all scene members (scene.dispose()) again ?
    *   TODO Create main menu where player can reset stage etc.
    *   TODO Alter the pivot for imported models?
    *   TODO Check Perfect Dark and Goldeneye sound board.
    *   TODO Try PostProcessing (camera.setPostProcess ?)
    *   TODO try dynamic textures: ( video in texture in front of screen for company presentation site .. )
    *   TODO Try 3D GUI again ( requires babylon.JS 3.3 ).
    *   TODO Try fog or smoke?
    *   TODO Try fur.
    *   TODO Try video textures!
    *   TODO Try 360 Photodome? http://doc.babylonjs.com/how_to/360photodome
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

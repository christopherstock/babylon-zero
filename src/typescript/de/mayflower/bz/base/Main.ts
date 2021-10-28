
    require( '../css/global.less' );

    import * as bz from '..';

    /** ****************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Reduce Complexity!
    *
    *   =====================
    *   Primal
    *   =====================
    *   TODO Flashlite on player - depending on wearpon.
    *   TODO Enable fullscreen toggle via main menu ..? FullScreenChangeListener and ESC reassignment ..
    *   TODO Add slower panning on aiming/zooming with wearpon.
    *   TODO Fix setting a different pivot for meshes and objects AGAIN?
    *   TODO Also zoom the wearpon in the GUI on zooming with the wearpon. ( anchor 2d img left top )
    *   TODO Try morphing one mesh/model into another (crate to broken crate / chair to broken chair).
    *   TODO Try to keep ORIGINAL physic imposter parameters AFTER the compound has been set?!
    *   TODO Solution to fix/remove screen shaking on collisions.
    *   TODO Create alternate lower cylinder for player that toggles on ducking?
    *   TODO Set emissive color for all imported models/materials explicitly? Try model in TestLevel!
    *   TODO Reset Git Repository?
    *   TODO Prune some unused test levels?
    *   TODO Show wearpon's ammo in magazine and total.
    *   TODO Enable wearpon magazine and reloading!
    *   TODO Enable loading of only required resources for the current scene?
    *   TODO Enable wearpon items (wearpons and ammo) to be picked up - Create wearpon collection system.
    *   TODO Create and test spatial sounds [radio etc.] (shot, bullet hit).
    *        https://doc.babylonjs.com/how_to/playing_sounds_and_music
    *   TODO Sounds for shot, bullet hit and bullet drop.
    *   TODO Create 3d gun as 2nd scene in front?
    *   TODO Try exploding models via particle system? (demo)
    *        https://www.babylonjs-playground.com/#ML2LR9#0
    *
    *   =====================
    *   Fx
    *   =====================
    *   TODO Add physically correct bullet drop (+sound) out after fire.
    *   TODO Try particle system (fx, non-physical) for bullet holes' wall rubble etc.
    *   TODO Particle FX (physical) for wall rubble!
    *   TODO Quick fire animation in bullet hole (for certain materials..)?
    *   TODO Add explosion effects for sprites.
    *   TODO Add muzzle flash to gun on firing.
    *
    *   =====================
    *   Complete MVP Tech-Demo 'Office '92', 1st minor, still life etc.
    *   =====================
    *   TODO Create realistic models, lights and spacial sounds.
    *
    *   =====================
    *   Player
    *   =====================
    *   TODO Player may not jump in air - deny jumping if player has no contact to the ground!
    *
    *   =====================
    *   Wearpons
    *   =====================
    *   TODO Enable wearpon system with different wearpons and attributes: magazine size, shoot angles, range, zoom ..
    *
    *   =====================
    *   Characters
    *   =====================
    *   TODO Create (different?) characters from primitives or mesh objects??
    *   TODO Create class Character, the abstract class of Player and Bot.
    *   TODO Checkout babylon.JS bones and skeletons?
    *   TODO Check cannonJs examples ? (human.js .. bones etc.)
    *   TODO Create class Bot that represents an enemy with one field for attitude.
    *
    *   =====================
    *   New features
    *   =====================
    *   TODO Create wearpons with projectiles (exploding or non-exploding)..
    *   TODO Create explosive wearpons etc.
    *
    *   =====================
    *   The Lab
    *   =====================
    *   TODO Try soft bodies.
    *   TODO Try babylon 101 scenes.
    *   TODO Try height maps ('mountain grounds')
    *   TODO Try 'worker thread collisions'? seems obsolete.
    *   TODO Try reflecting mirrored textures! https://babylonjsguide.github.io/advanced/Reflect
    *   TODO Try Videos ("Intro Logo") with exploding(paused physics and camera movements/animations?
    *   TODO Try fur.
    *   TODO Try Impossible?: Show a video texture in the GUI.
    *   TODO Try 3D GUI again? ( requires babylon.JS 3.3 )?
    *   TODO Try water effects?
    *   TODO Try different player objects: physics for car!
    *   TODO Try 'gamelets' in the babylon.JS docs.
    *   TODO Try 360 Photodome? http://doc.babylonjs.com/how_to/360photodome
    *   TODO Try more babylon.JS tutorials and gamelets, features and playgrounds for gathering new features.
    *******************************************************************************************************************/
    export class Main
    {
        /** The singleton instance of the game. */
        public      static          game                    :bz.Game                    = null;

        /** ************************************************************************************************************
        *   This method is invoked when the application starts.
        *
        *   TODO to non static!
        ***************************************************************************************************************/
        public static main() : void
        {
            bz.DOMUtil.setTitle(   bz.SettingEngine.BRANDING.getTitle()   );
            bz.DOMUtil.setFavicon( bz.SettingEngine.BRANDING.getFavicon() );

            Main.acclaim();

            Main.game = new bz.Game();
            Main.game.init();
        }

        /** ************************************************************************************************************
        *   Acclaims the debug console.
        ***************************************************************************************************************/
        private static acclaim() : void
        {
            bz.Debug.acclaim.log( bz.SettingEngine.BRANDING.getTitle()  );
            bz.Debug.acclaim.log( bz.Version.getCurrent() );
            bz.Debug.acclaim.log();
        }
    }

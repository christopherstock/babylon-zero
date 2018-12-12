
    require( '../css/global.less' );

    import * as bz from '..';

    /** ****************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   =====================
    *   TODO New Stuff
    *   =====================
    *   TODO Remove ALL references to bz.Scene and BABYLON.Scene.
    *   TODO Hold 'Scene' in stage and remove global reference?
    *   TODO Remove 'ALL' global references to Main.game ??
    *   TODO Enable loading only required resources for the current scene??
    *   TODO Create alternate lower cylinder for player that toggles on ducking?
    *   TODO Videos ("Intro Logo") with exploding(paused physics and camera movements/animations?
    *   TODO Redesign Texture and create TextureSystem? Check ModelSystem again?
    *   TODO Enable pointer lock in non-fullscreen (window) mode?
    *   TODO Show a video texture in the GUI?
    *   TODO Try fog or smoke?
    *   TODO Try different player objects: physics for car, etc
    *   TODO Try fur.
    *   TODO HID: Add wearpon slower panning on aiming/zooming.
    *   TODO Also zoom the wearpon in the GUI on zooming with the wearpon.
    *   TODO Enable fullscreen toggle via main menu ..? FullScreenChangeListener and ESC reassignment ..
    *
    *   =====================
    *   TODO Issues
    *   =====================
    *   TODO Try to improve collision handling for the player.
    *   TODO Try to keep ORIGINAL physic imposter parameters AFTER the compound has been set?!
    *
    *   =====================
    *   TODO Sounds
    *   =====================
    *   TODO Create and test spatial sounds (bullet hit). https://doc.babylonjs.com/how_to/playing_sounds_and_music
    *   TODO Sounds for shot, bullet hit and bullet drop.
    *
    *   =====================
    *   TODO Wearpons
    *   =====================
    *   TODO Enable wearpon system with different wearpons and attributes: magazine size, shoot angles, range, zoom ..
    *   TODO Enable wearpon items (wearpons and ammo) to be picked up - Create wearpon collection system.
    *   TODO Create wearpons with projectiles (exploding or non-exploding)..
    *   TODO Create explosive wearpons etc.
    *
    *   =====================
    *   TODO FX
    *   =====================
    *   TODO Add physically correct bullet drop out after fire.
    *   TODO Try particle system (fx, non-physicsl) for bullet holes' wall rubble.
    *   TODO Particle FX (physical) for wall rubble!
    *   TODO Quick fire animation in bullet hole (for certain materials..)?
    *   TODO Add explosion sprites.
    *   TODO Create 3d gun as 2nd scene in front?
    *   TODO Add muzzle flash to gun on firing.
    *
    *   =====================
    *   TODO Human Body Partitions
    *   =====================
    *   TODO Control for camera rotation?
    *   TODO Limit camera (y axis) (alpha).
    *   TODO Fade Body Part Description in and out.
    *   TODO Improve color effect.
    *   TODO Change model.
    *
    *   =====================
    *   TODO Complete MVP Tech-Demo 'Office '92', 1st minor, still life etc.
    *   =====================
    *   TODO Create realistic models, lights and spacial sounds.
    *   TODO Update babylon.js and all other npm packages.
    *
    *   =====================
    *   TODO Characters
    *   =====================
    *   TODO Create (different?) characters from primitives or mesh objects??
    *   TODO Create class Character, the abstract class of Player and Bot.
    *   TODO Checkout babylon.JS bones and skeletons?
    *   TODO Check cannonJs examples ? (human.js .. bones etc.)
    *   TODO Create class Bot that represents an enemy with one field for attitude.
    *
    *   =====================
    *   TODO The Lab
    *   =====================
    *   TODO Try 'worker thread collisions'?
    *   TODO Try 3D GUI again ( requires babylon.JS 3.3 ).
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
        ***************************************************************************************************************/
        public static main() : void
        {
            bz.HTML.setTitle(   bz.SettingEngine.BRANDING.getTitle()   );
            bz.HTML.setFavicon( bz.SettingEngine.BRANDING.getFavicon() );

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

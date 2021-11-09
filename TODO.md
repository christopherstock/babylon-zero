![babylon-zero](https://github.com/christopherstock/babylon-zero/raw/master/_ASSET/promo/promoBadge8_960x512.gif)
# TODO List

```
=====================
MVP 1.0.0 - Tech-Demo
=====================
TODO Add fire sprite
TODO Add suitable textures!
TODO Stop player from jumping around when falling etc?
TODO Add boxes with different texture and weight! (steel crate etc) - fix all bullet holes!
TODO Scale up/down all chairs and some models?
TODO Add shelves.
TODO ggf, key-explanation in pause menu? and 'story intro phrase'?
TODO Find and prune classes with mixed static & non-static content
TODO debug and improve init process?
TODO Set emissive color for all imported models/materials explicitly? Try model in TestLevel!
TODO Create realistic models, lights and spacial sounds.
TODO Enable fullscreen toggle on pointerlock gain? or via main menu ..? FullScreenChangeListener and ESC reassignment ..
TODO Models (item shell boxes) with different Textures?
TODO Reset Git Repository?

=====================
Player
=====================
TODO Fix ducking
TODO Create alternate lower cylinder for player that toggles on ducking?
TODO Fix jumping
TODO Deny jumping if player has no contact to the ground!

=====================
Fx
=====================
TODO add light to physics object + shot on it physics?
TODO Try morphing one mesh/model into another (crate to broken crate / chair to broken chair).
TODO add rotating MF Logo sprite?
TODO Debug low performance on multiple shots?
TODO Enable loading of only required resources for the current scene?
TODO Flashlite on player - depending on wearpon.
TODO Try to keep ORIGINAL physic imposter parameters AFTER the compound has been set?!
TODO static glass windows that shatter on shot
TODO Add physically correct bullet drop (+sound) out after fire.
TODO Try particle system (fx, non-physical) for bullet holes' wall rubble etc.
TODO Particle FX (physical) for wall rubble!
TODO Add explosion effects for sprites.
TODO Add muzzle flash to gun on firing.
TODO Quick fire animation in bullet hole (for certain materials..)?
TODO Solution to fix/remove screen flickering/shaking on collisions.

=====================
Sounds
=====================
TODO Create and test spatial sounds [radio etc.] (shot, bullet hit).
     https://doc.babylonjs.com/how_to/playing_sounds_and_music
TODO Sounds for shot, bullet hit and bullet drop.

=====================
Wearpons
=====================
TODO Enable wearpon items (wearpons and ammo) to be picked up - Create wearpon collection system.
TODO Also zoom the wearpon in the GUI on zooming with the wearpon. ( anchor 2d img left top )
TODO Add slower panning on aiming/zooming with wearpon.
TODO Enable wearpon system with different wearpons and attributes: magazine size, shoot angles, range, zoom, muzzle-flash ..
TODO Show wearpon's ammo in magazine and total.
TODO Enable wearpon magazine and reloading!
TODO Create 3d gun as 2nd scene in front?

=====================
Characters
=====================
TODO Create (different?) characters from primitives or mesh objects??
TODO Create class Character, the abstract class of Player and Bot.
TODO Checkout babylon.JS bones and skeletons?
TODO Check cannonJs examples ? (human.js .. bones etc.)
TODO Create class Bot that represents an enemy with one field for attitude.

=====================
New features
=====================
TODO introduce Stage Animation system? as Animations (camera) do not stop on pausing the game.
TODO Create wearpons with projectiles (exploding or non-exploding)..
TODO Create explosive wearpons etc.
TODO Try soft bodies.
TODO Try babylon 101 scenes.
TODO Try 'worker thread collisions'? seems obsolete.
TODO Try reflecting mirrored textures! https://babylonjsguide.github.io/advanced/Reflect
TODO Try Videos ("Intro Logo") with exploding(paused physics and camera movements/animations?
TODO Try fur.
TODO Try Impossible?: Show a video texture in the GUI.
TODO Try 3D GUI again? ( requires babylon.JS 3.3 )?
TODO Try water effects?
TODO See 'gamelets' in the babylon.JS docs.
```

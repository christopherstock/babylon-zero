![babylon-zero](https://github.com/christopherstock/babylon-zero/raw/master/_ASSET/promo/promoBadge8_960x512.gif)
# TODO List

```
===============
MVP - Game Demo
===============
TODO darken model textured faces on being shot! (0-100% over model texture)
TODO Enable model switch from static to compound (collapsing)?
     or just change from mass 0.0 to mass 16.0 etc?
TODO Add event 'level explosion' under car.
TODO Create time delay feature. (EVENT delay pipeline)
TODO Create 2nd empty stage and move things from 1st to 2nd.
TODO Create Different, parallel event pipelines.
TODO Add door to room creation method.
TODO Create event type 'ingame message' with pic and message.
TODO Switch stage on door interaction!
TODO hand over Inventory between Stages
TODO Try stored 3dsmax model animations.
TODO prune all default values (= null) and add linter rule?
TODO Scale up/down all chairs and some models?
TODO Enable changeable textures for imported models
TODO Add shelves and some more (better) 3dsmax models?
TODO Office with lamp than can be turned on or off. => event pipeline etc. => trigger fields / walls?
TODO Add nice textures
TODO Create realistic models and lights.
TODO Models (item shell boxes) with changine/different Textures?
TODO Reset Git Repository?
TODO Set emissive color for all imported models/materials explicitly? Try model in TestLevel!
TODO Try cool physics pause (scene cam) feature.

======
Player
======
TODO Introuce Inventory System
TODO Fix ducking? => concerning heightY and shot height ?
TODO Fix jumping!
TODO Create alternate lower cylinder for player that toggles on ducking?
TODO Deny jumping if player has no contact to the ground!
TODO Fix head shaking.
TODO debug and improve init process?
TODO Find and reduce classes with mixed static & non-static content
TODO create player die effect (tilt cylinder and head etc.)

==
UX
==
TODO Enable fullscreen toggle on pointerlock gain? or via main menu ..? FullScreenChangeListener and ESC reassignment ..

=====
Stage
=====
TODO Create Event Pipeline for altering stage contents + activation triggers!
TODO Add 'view blocker' (H-Block) with dynamic stage switch?
TODO Enable dynamic stage/contents switch with player staying on same position ??

==
Fx
==
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

======
Sounds
======
TODO Create and test spatial sounds [radio etc.] (shot, bullet hit).
     https://doc.babylonjs.com/how_to/playing_sounds_and_music
TODO Sounds for shot, bullet hit and bullet drop.

========
Wearpons
========
TODO Enable wearpon system with different wearpons and attributes: magazine size, shoot angles, range, bullet-hole-size, zoom, muzzle-flash ..
TODO Add slower panning on aiming/zooming with wearpon.
TODO Enable wearpon items (wearpons and ammo) to be picked up - Create wearpon collection system.
TODO Show wearpon's ammo in magazine and total.
TODO Enable wearpon magazine and reloading!
TODO Create 3d gun as 2nd scene in front?
TODO Create wearpons with projectiles (exploding or non-exploding)..
TODO Create explosive wearpons etc.

==========
Characters
==========
TODO Add bots as sprites in 1st instance
TODO Create (different?) characters from primitives or mesh objects??
TODO Create class Character, the abstract class of Player and Bot.
TODO Checkout babylon.JS bones and skeletons?
TODO Check cannonJs examples ? (human.js .. bones etc.)
TODO Create class Bot that represents an enemy with one field for attitude.

============
New features
============
TODO introduce Stage Animation system? as Animations (camera) do not stop on pausing the game.
TODO Try soft bodies.
TODO Try babylon 101 scenes.
TODO Try 'worker thread collisions'? seems obsolete.
TODO Try reflecting mirrored textures! https://babylonjsguide.github.io/advanced/Reflect
TODO Try Videos ("Intro Logo") with exploding(paused physics and camera movements/animations?
TODO Try fur (babylon-material extension).
TODO Try water material/effects?
TODO Try Impossible?: Show a video texture in the GUI.
TODO Try 3D GUI again? ( requires babylon.JS 3.3 )?
TODO See 'gamelets' in the babylon.JS docs.
```

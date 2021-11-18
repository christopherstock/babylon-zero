![babylon-zero](https://github.com/christopherstock/babylon-zero/raw/master/_ASSET/promo/promoBadge8_960x512.gif)
# TODO List

```
===============
MVP - Game Demo
===============
TODO create player inventory (painkillers :) and let him add items and keep items between Stages
TODO Separate classes Trigger and Item ? (new abstract superclass for both!) Collectable
TODO Create event type 'ingame message' with pic and message.
TODO Try ingame 3D wearpon model
TODO Find and reduce classes with mixed static & non-static content
TODO Create lamp switch on/off effect to EventType. ( + switch inside level )
TODO dark bullet holes?
TODO Add door creation to room creation method.
TODO Create 2nd empty stage and move things from 1st to 2nd.
TODO Enable switchable Player carried light/lamp.
TODO Improve models (shelves = 12 sub-objects) and add some more (better) 3dsmax models?
TODO Try cool physics pause (scene cam) feature.
TODO Try stored 3dsmax model animations.
TODO Create realistic models and lights.
TODO Add nicer textures
TODO Reset Git Repository?

======
Player
======
TODO Introuce Inventory System
TODO Fix ducking? => concerning heightY and shot height ?
TODO Create alternate lower cylinder for player that toggles on ducking?
TODO Deny jumping if player has no contact to the ground!
TODO debug and improve init process?
TODO create player die effect (tilt cylinder and head etc.)

==
UX
==
TODO Try Videos ("Intro Logo") with exploding item flying into camera & paused physics and camera movements/animations
TODO Enable fullscreen toggle on pointerlock gain? or via main menu ..? FullScreenChangeListener and ESC reassignment ..

==
Fx
==
TODO Explosion effect when objects break: fire sprites and global explosion?
TODO Try morphing one mesh/model into another (crate to broken crate / chair to broken chair).
TODO add rotating MF Logo sprite?
TODO Debug low performance on multiple shots?
TODO Enable loading of only required resources for the current scene?
TODO Flashlite on player - depending on wearpon.
TODO Check out particle helpers https://doc.babylonjs.com/divingDeeper/particles/particle_system/particleHelper
TODO Try to keep ORIGINAL physic imposter parameters AFTER the compound has been set?!
TODO static glass windows that shatter on shot
TODO Add physically correct bullet drop (+sound) out after fire.
TODO Try particle system (fx, non-physical) for bullet holes' wall rubble etc.
TODO Add explosion effects via sprites.
TODO Particle FX (physical) for wall rubble!
TODO Add muzzle flash to gun on firing.
TODO Quick fire animation in bullet hole (for certain materials..)?

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

====
Bots
====
TODO Add bots as sprites in 1st instance
TODO Create (different?) characters from primitives or mesh objects??
TODO Create class Character, the abstract class of Player and Bot.
TODO Checkout babylon.JS bones and skeletons?
TODO Check cannonJs examples ? (human.js .. bones etc.)
TODO Create class Bot that represents an enemy with one field for attitude.

=========
Secondary
=========
TODO Fix head shaking?
TODO Fix jumping?
TODO try class SubMeshes?
TODO clear error message 'the user has exited the lock before ..'?

============
New features
============
TODO introduce Stage Animation system? as Animations (camera) do not stop on pausing the game.
TODO Try soft bodies.
TODO Try particle systems (smoke, fire, helper etc)
TODO Try babylon 101 scenes.
TODO Try 'worker thread collisions'? seems obsolete.
TODO Try reflecting mirrored textures! https://babylonjsguide.github.io/advanced/Reflect
TODO Try fur (babylon-material extension).
TODO Try water material/effects?
TODO See 'gamelets' in the babylon.JS docs.
```

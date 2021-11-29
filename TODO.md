![babylon-zero](https://github.com/christopherstock/babylon-zero/raw/master/_ASSET/promo/promoBadge8_960x512.gif)
# TODO List

```
===
MVP
===
TODO try cloning via scene importer? instead of method cloneModel() !? try async/await
TODO Physical Bodies for Players?
TODO 3D gun disappears in walls
TODO skeleton cloning: https://doc.babylonjs.com/divingDeeper/mesh/bonesSkeletons#cloning-bones
TODO Add linked doors (wing doors)
TODO smaller Doors
TODO Door interaction on imported officeDesk3
TODO Add Player energy and GUI energy (and GUI painkillers display??) (variable display with queue top left)
TODO Reset Git Repository?
TODO Clean up StageOffice contents
TODO Create realistic models and lights.
TODO Create Locations: Park, parking site / house, garage, backyard, waste ground, backstreet, shop site, town site, mart, housing area, offices..
TODO Performance: Try hi-res textures? 512 or 1024 ?

==
Fx
==
TODO Improve IntroVideo ("Intro Logo") with exploding item flying into camera & paused physics and camera movements/animations
TODO try exploding mayflower logo (from 3dsmax promo?)
TODO try gold metal effect etc for IntroVideo logo
TODO keep pointer lock between stage switches? (gets lost atm)
TODO Enable switchable Player carried light/lamp. (KEY_F to toggle flashlight)
TODO create player die effect (tilt cylinder and head etc.)
TODO Try particle system (fx, non-physical) for bullet holes' wall rubble etc.
TODO Add explosion effects via sprites.
TODO Particle FX (physical) for wall rubble!
TODO Draw outline for pickable items? HightlightLayer playground: https://doc.babylonjs.com/divingDeeper/mesh/highlightLayer
TODO Explosion effect when objects break: fire sprites and global explosion?
TODO Constraint system for events (keycard holded)!?
TODO add rotating MF Logo sprite?
TODO Add glossiness to floors (marbel in light etc)
TODO Add muzzle flash to gun on firing. (via sprite!)
TODO Quick fire animation in bullet hole (for certain materials..)?
TODO Enable loading of only required resources for the current scene?
TODO Check out particle helpers https://doc.babylonjs.com/divingDeeper/particles/particle_system/particleHelper
TODO Add physically correct bullet drop (+sound) out after fire.
TODO Create staircase.

========
Wearpons
========
TODO Create 3d gun as 2nd scene in front?
TODO different bullets, different wearpons, different gadgets to inventories
TODO Enable wearpon system with different wearpons and attributes: magazine size, shoot angles, range, bullet-hole-size, zoom, muzzle-flash ..
TODO Add slower panning on aiming/zooming with wearpon. (sniper rifle etc.)
TODO Enable wearpon items (wearpons and ammo) to be picked up - Create wearpon collection system.
TODO Show wearpon's ammo in magazine and total (in GUI).
TODO Enable wearpon magazines and reloading!
TODO Flashlite on player - depending on wearpon.
TODO Create explosive wearpons etc.
TODO Create wearpons with projectiles (exploding or non-exploding)..

======
Sounds
======
TODO Create and test spatial sounds [radio etc.] (shot, bullet hit).
     https://doc.babylonjs.com/how_to/playing_sounds_and_music
TODO Sounds for shot, bullet hit and bullet drop.

====
Bots
====
TODO Add bots as sprites in 1st instance
TODO Checkout babylon.JS bones and skeletons!
TODO Check cannonJs examples ? (human.js .. bones etc.)
TODO Create class Character, the abstract class of Player and Bot??

=========
Secondary
=========
TODO Try stored 3dsmax model animations.
TODO Fix head shaking?
TODO Fix jumping?
TODO try class SubMeshes?
TODO dark bullet holes?
TODO Try morphing one mesh/model into another (crate to broken crate / chair to broken chair).
TODO clear error message 'the user has exited the lock before ..'?
TODO Fix crouching/ducking? => concerning heightY and shot height ?
TODO Create alternate lower cylinder for player that toggles on ducking?
TODO Deny jumping if player has no contact to the ground!
TODO Implement cool physics pause (scene cam / adrenaline?) feature.
TODO Enable fullscreen toggle on pointerlock gain? or via main menu ..? FullScreenChangeListener and ESC reassignment ..
TODO debug and improve init process?
TODO Debug low performance on multiple shots?
TODO Try to keep ORIGINAL physic imposter parameters (from 3dsmax?) AFTER the compound has been set?!

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

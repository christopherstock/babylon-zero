![babylon-zero](https://github.com/christopherstock/babylon-zero/raw/master/_ASSET/promo/promoBadge8_960x512.gif)
# TODO List

```
===
MVP
===
TODO Improve stairs texture
TODO Increase glass bullet hole.
TODO Solve stairs all custom sizes!

TODO Enhance multi level staircases.

TODO smaller Doors? Adjust room sizes once more!
TODO Create discreet Material System (for glossiness, emissive by light etc. - bundle TextureFiles + Materials!) Enable switchable glossiness to floors (marbel in light etc)

TODO Create Locations: Park, parking site / house, garage, backyard, waste ground, backstreet, shop site, town site, mart, housing area, offices..
TODO Clean up StageOffice contents
TODO Remove all ESLint-Disablers?

TODO Add muzzle flash to gun on firing. (via sprite!)
TODO Add explosion effects via sprites.
TODO Pause particles when game is paused
TODO Add Player energy and GUI energy (and GUI painkillers display??) (variable display with queue top left)
TODO Improve ModelSystem.load: introduce ModelType or enable class instances of ModelFile? (=> remove indexOf'wearpon/')
TODO Door animation interaction on imported officeDesk3?
TODO create player die effect (tilt cylinder and head etc.)
TODO Constraint system for events (keycard holded)!?
TODO Reset Git Repository?

======
3dsmax
======
TODO Create one realistic model with all (3 or 4) different textures?
TODO Create realistic models and lights.
TODO Fix fence

==
Fx
==
TODO Quick fire animation in bullet hole (for certain materials..)?
TODO Spawn painkiller model when a painkiller has been used.
TODO Pause playing video texture when game is paused.
TODO Add Explosion effect when objects break: fire sprites and global explosion?
TODO Physical Bodies for Bots?
TODO Improve IntroVideo ("Intro Logo") with exploding item flying into camera & paused physics and camera movements/animations
TODO try exploding mayflower logo (from 3dsmax promo?)
TODO Enable switchable Player carried light/lamp. (KEY_F to toggle flashlight)
TODO try gold metal effect etc for IntroVideo logo
TODO try cloning via scene importer? instead of method cloneModel() !? try async/await
TODO Load multiple 'dancing girls'?
TODO add rotating MF Logo sprite?
TODO Enable loading of only required resources for the current scene?
TODO Add physically correct bullet drop (+sound) out after fire.
TODO Performance: Try all hi-res textures? 512 or 1024 or 2048 ? ?

========
Wearpons
========
TODO different bullets, different wearpons, different gadgets to inventories
TODO Enable wearpon system with different wearpons and attributes: magazine size, shoot angles, range, bullet-hole-size, zoom, muzzle-flash ..
TODO Add slower panning on aiming/zooming with wearpon. (sniper rifle etc.)
TODO Enable wearpon items (wearpons and ammo) to be picked up - Create wearpon collection system.
TODO Show wearpon's ammo in magazine and total (in GUI).
TODO Enable wearpon magazines and reloading!
TODO Flashlite on player - depending on wearpon.
TODO Create explosive wearpons etc.
TODO Create wearpons with projectiles (exploding or non-exploding)..

====
Bots
====
TODO Bots attack player and cast a shoot onto the level.

======
Sounds
======
TODO Create and test spatial sounds [radio etc.] (shot, bullet hit).
     https://doc.babylonjs.com/how_to/playing_sounds_and_music
TODO Sounds for shot, bullet hit and bullet drop.

=========
Secondary
=========
TODO Refactor: PlayerPhysic and PlayerWearpon all private.
TODO Draw outline for pickable items? HightlightLayer playground: https://doc.babylonjs.com/divingDeeper/mesh/highlightLayer
TODO Try stored 3dsmax model animations.
TODO Fix/add head shaking?
TODO Fix/add jumping?
TODO try class SubMeshes? (filled automatically from 3dsmax)
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

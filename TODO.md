![babylon-zero](https://github.com/christopherstock/babylon-zero/raw/master/_ASSET/promo/promoBadge8_960x512.gif)
# TODO List

```
===
MVP
===
TODO Shotgun: Multiple bullets per shot!

TODO Fix transparent window walls through opaque walls?
TODO wall rubble fx: immediate appearance
TODO color wall rubble according to color from pickingInfo.getTextureCoordinates() ??
TODO animation fade in fade out for FIRE one time animation

TODO Add Player energy and GUI energy (and GUI painkillers display??) (variable display with queue top left)
TODO Add rotated versions of all level locations
TODO Detect/Improve performance loss on firing (ommit physical impulses for static meshes?) 
TODO add rotations for all rooms/objects :p new Wall().getModel().rotateAroundAxisY ?
TODO Add 'shotgun' collectable/item. (2nd wearpon model in fg?)

TODO Add Explosion effect when objects break - explosion for certain objects?: fire sprites and global explosion?
TODO explosion rubble fx

TODO dark/correctly lighted bullet holes? let bullet holes clone (emissive) mesh material?
TODO create player die effect (tilt cylinder and head etc.)

TODO Add/KEEP muzzle flash to GUN on firing.
TODO Stick muzzle flashes to wearpon (when moving). Keep mesh as reference muzzle flash point in wearpon!

TODO Fix the mistery of moving static walls? ('diamond walls')
TODO try outline for items again? // bench1.getModel().addOutline( this.getScene() );, 'glow fx' GlowLayer?
TODO make class Event abstract and add subclasses (EventData/EventType?)
TODO Improve stairs texture / or improve stair creation to meshed stair steps?
TODO Draw outline for pickable items? HightlightLayer playground: https://doc.babylonjs.com/divingDeeper/mesh/highlightLayer
TODO Reset Git Repository?

=================
Code Improvements
=================
TODO Improve ModelSystem.load: introduce ModelType or enable class instances of ModelFile? (=> remove indexOf'wearpon/')
TODO Flag for muzzleFlash sprites to load in FG scene!

==
Fx
==
TODO Quick fire animation in bullet hole (for certain materials..)?
TODO Add elevator
TODO Try ragdolls http://www.visualiser.fr/rag/default.htm
     https://www.babylonjs-playground.com/#VADCKV#6
     https://www.babylonjs-playground.com/#VADCKV#12
     https://github.com/matthewharwood/babylonJS-examples/blob/master/bower_components/cannon.js/demos/ragdoll.html
TODO Try glow effect? https://playground.babylonjs.com/#7QCYPB
TODO Physical Bodies for Bots?
TODO Improve IntroVideo ("Intro Logo") with exploding item flying into camera & paused physics and camera movements/animations
TODO try exploding mayflower logo (from 3dsmax promo?)
TODO Try particle systems 'smoke' and 'fire'?
TODO Enable switchable Player carried light/lamp. (KEY_F to toggle flashlight)
TODO Add camera intro running into player head.
TODO try gold metal effect etc for IntroVideo logo
TODO try cloning via scene importer? instead of method cloneModel() !? try async/await
TODO Load multiple 'dancing girls'?
TODO add rotating MF Logo sprite?
TODO Enable loading of only required resources for the current scene?
TODO Add physically correct bullet drop (+sound) out after fire.
TODO Performance: Try all hi-res textures? 512 or 1024 or 2048 ? ?

===============
Material System
===============
TODO Create discreet Material System (for glossiness, emissive by light etc. - bundle TextureFiles + Materials!) Enable switchable glossiness to floors (marbel in light etc)
TODO Add 'grid material' to material system? https://doc.babylonjs.com/toolsAndResources/assetLibraries/materialsLibrary/gridMat
TODO Textures: Ambient, Bump, Specular ! supply these three in 1st instance (nativeTexture => diffuseTexture)
TODO create more textures! (bz.Texture.nativeTexture => ambientTexture, diffuse, ambient, bump, dispersion etc.)
TODO try to automatically load the bump etc. spec files if present!
TODO add material flags in bz.MaterialSystem.createMaterial. (dispersion?, bump?, emissive etc.)

======
3dsmax
======
TODO Fix shotgun model! (all to one mesh!, scale/reset!)
TODO Shelves: Fix bounding box?
TODO Try stored 3dsmax model animations. (open door in desk?)
TODO Change to cylindric physical impostor for model 'SEWERAGE_PUMPING'?
TODO remove offset in transpallet (rotY chaos)
TODO Spawn painkiller (empty can) model when a painkiller has been used.
TODO Add stele/poster object for posters/signs.
TODO Create one realistic model with all (3 or 4) different textures?
TODO Create realistic models and lights.
TODO Fix fence
TODO Door animation interaction on imported officeDesk3?

========
Wearpons
========
TODO Refactor: PlayerPhysic and PlayerWearpon all private.
TODO different bullets, different wearpons, different gadgets to inventories
TODO Enable wearpon system with different wearpons and attributes: magazine size, shoot angles, range, bullet-hole-size, zoom, muzzle-flash ..
TODO Add slower panning on aiming/zooming with wearpon. (sniper rifle etc.)
TODO Enable wearpon items (wearpons and ammo) to be picked up - Create wearpon collection system.
TODO Show wearpon's ammo in magazine and total (in GUI).
TODO Enable wearpon magazines and reloading!
TODO Flashlite on player - depending on wearpon.
TODO Create grenades
TODO Create explosive wearpons etc.
TODO Create wearpons with projectiles (exploding or non-exploding)..

====
Bots
====
TODO Bots attack player and cast a shoot onto the level. (minimal gameplay)

======
Sounds
======
TODO Create and test spatial sounds [radio etc.] (shot, bullet hit).
     https://doc.babylonjs.com/how_to/playing_sounds_and_music
TODO Sounds for shot, bullet hit and bullet drop.

=========
Secondary
=========
TODO Fix/add head shaking?
TODO 1:n connection for type+data? in class 'Event'? ( X Events for 1 constraint?)
TODO Fix/add jumping?
TODO Enhance multi level staircases.
TODO try class SubMeshes? (filled automatically from 3dsmax)
TODO Try morphing one mesh/model into another (crate to broken crate / chair to broken chair).
TODO Create new Locations: garage, wasteground, backstreet, shop site, town site, mart/mall, housing area
TODO clear error message 'the user has exited the lock before ..'?
TODO Fix crouching/ducking? => concerning heightY and shot height ?
TODO create enum for rot ? LEFT wall = -90.0 etc ?
TODO suppress STRG+W! (Win10)
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
TODO introduce Stage Animation system? Fix pause for native game (e.g. camera) Animations?
TODO Try soft bodies.
TODO Try babylon 101 scenes.
TODO Try 'worker thread collisions'? seems obsolete.
TODO Try reflecting mirrored textures! https://babylonjsguide.github.io/advanced/Reflect
TODO Try fur (babylon-material extension).
TODO Try water material/effects?
TODO See 'gamelets' in the babylon.JS docs.
```

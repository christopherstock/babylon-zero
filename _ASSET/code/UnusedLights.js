// hemispheric light
import * as bz from "../../src/typescript/de/mayflower/bz/base/Debug";

bz.LightFactory.createHemispheric
(
    this.scene.getNativeScene(),
    new BABYLON.Vector3( 0.0, 1.0, 0.0 ),
    new BABYLON.Color3( 1.0, 1.0, 1.0 ),
    new BABYLON.Color3( 0.1, 0.1, 0.1 ),
    new BABYLON.Color3( 0.0, 0.0, 0.0 ),
    0.1,
    false
),

// directional light ?
bz.LightFactory.createDirectional
(
    this.scene.getNativeScene(),
    new BABYLON.Vector3( 0.5, -1.0, 0.0 ),
    new BABYLON.Vector3( 20.0, 20.0, 20.0 ),
    1.0,
    new BABYLON.Color3( 0.5, 0.5, 0.5 ),
    new BABYLON.Color3( 1.0, 0.5, 0.0 ),
    false
),

// spot light ?
bz.LightFactory.createSpot
(
    this.scene.getNativeScene(),
    new BABYLON.Vector3( 15.0, 20.0, 15.0 ),
    new BABYLON.Vector3( 0.0, -1.0, 0.0 ),
    30.0,
    2,
    new BABYLON.Color3( 0.5, 0.5, 0.5 ),
    new BABYLON.Color3( 1.0, 1.0, 1.0 ),
    50.0,
    false
),

// point light
bz.LightFactory.createPoint
(
    this.scene.getNativeScene(),
    new BABYLON.Vector3( 15.0, 3.0, 16.0 ),
    new BABYLON.Color3( 1.0, 1.0, 1.0 ),
    new BABYLON.Color3( 0.0, 0.0, 0.0 ),
    50.0,
    1.0,
    true
),

// point light
bz.LightFactory.createPoint
(
    this.scene.getNativeScene(),
    new BABYLON.Vector3( this.OFFSET_X + 15.0, 3.0, this.OFFSET_Z - 16.0 ),
    new BABYLON.Color3( 1.0, 1.0, 1.0 ),
    new BABYLON.Color3( 0.0, 0.0, 0.0 ),
    50.0,
    1.0,
    true
),

// Create the "God Rays" effect (volumetric light scattering) - godreys need to be disposed!
const godrays :BABYLON.VolumetricLightScatteringPostProcess = (
    bz.LightFactory.createVolumetricLightScatteringPostProcess(
        this.scene.getNativeScene(),
        new BABYLON.Vector3(-150, 150, 150),
        new BABYLON.Vector3(100, 100, 100),
        this.cameraSystem.firstPersonCamera,
        this.engine
    )
);
pointLight.position = godrays.mesh.position;

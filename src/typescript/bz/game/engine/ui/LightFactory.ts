// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import * as bz      from '../../..';

/** ********************************************************************************************************************
*   Creates all types of lights.
***********************************************************************************************************************/
export abstract class LightFactory
{
    /** Next ID to assign for light creation. */
    private static nextLightId :number = 0;

    /** ****************************************************************************************************************
    *   Creates a hemispheric light.
    *
    *   @param scenes        The scenes that contain this light.
    *   @param direction     The direction for this light.
    *   @param diffuseColor  The color this light spreads to all surfaces.
    *   @param specularColor The shining spot color this light spreads to faces.
    *   @param groundColor   The color for the ground to apply.
    *   @param intensity     Hemispheric light intensity.
    *******************************************************************************************************************/
    public static createHemispheric
    (
        scenes        :BABYLON.Scene[],
        direction     :BABYLON.Vector3,
        diffuseColor  :BABYLON.Color3,
        specularColor :BABYLON.Color3,
        groundColor   :BABYLON.Color3,
        intensity     :number
    )
    : BABYLON.HemisphericLight[]
    {
        const lights:BABYLON.HemisphericLight[] = [];

        for ( const scene of scenes )
        {
            const light:BABYLON.HemisphericLight = new BABYLON.HemisphericLight
            (
                LightFactory.createNextLightId(),
                direction,
                scene
            );

            light.diffuse     = diffuseColor ;
            light.specular    = specularColor;
            light.groundColor = groundColor  ;
            light.intensity   = intensity;

            lights.push( light );
        }

        return lights;
    }

    /** ****************************************************************************************************************
    *   Creates a directional light.
    *
    *   @param scene         The scene that contains this light.
    *   @param direction     The direction for this light.
    *   @param position      Where this light is located.
    *   @param intensity     The intensity of this light.
    *   @param diffuseColor  The color this light spreads to all surfaces.
    *   @param specularColor The shining spot color this light spreads to faces.
    *
    *   @deprecated Needs to be extended for multiple scenes.
    *******************************************************************************************************************/
    public static createDirectional
    (
        scene         :BABYLON.Scene,
        direction     :BABYLON.Vector3,
        position      :BABYLON.Vector3,
        intensity     :number,
        diffuseColor  :BABYLON.Color3,
        specularColor :BABYLON.Color3
    )
    : BABYLON.DirectionalLight
    {
        const light:BABYLON.DirectionalLight = new BABYLON.DirectionalLight
        (
            LightFactory.createNextLightId(),
            direction,
            scene
        );

        light.position  = position;
        light.intensity = 1.0;
        light.diffuse   = diffuseColor;
        light.specular  = specularColor;

        return light;
    }

    /** ****************************************************************************************************************
    *   Creates a spot light.
    *
    *   @param scene         The scene that contains this light.
    *   @param position      Where this light is located.
    *   @param direction     The direction for this light.
    *   @param angleDegrees  The angle of this spot light's cone.
    *   @param exponent      The light decay speed with the distance from the emission spot.
    *   @param diffuseColor  The color this light spreads to all surfaces.
    *   @param specularColor The shining spot color this light spreads to faces.
    *   @param range         How far the spot light shall reach.
    *
    *   @deprecated Needs to be extended for multiple scenes.
    *******************************************************************************************************************/
    public static createSpot
    (
        scene         :BABYLON.Scene,
        position      :BABYLON.Vector3,
        direction     :BABYLON.Vector3,
        angleDegrees  :number,
        exponent      :number,
        diffuseColor  :BABYLON.Color3,
        specularColor :BABYLON.Color3,
        range         :number
    )
    : BABYLON.SpotLight
    {
        const light:BABYLON.SpotLight = new BABYLON.SpotLight
        (
            LightFactory.createNextLightId(),
            position,
            direction,
            bz.MathUtil.degreesToRad( angleDegrees ),
            exponent,
            scene
        );

        light.diffuse  = diffuseColor ;
        light.specular = specularColor;
        light.range    = range;

        return light;
    }

    /** ****************************************************************************************************************
    *   Creates a point light.
    *
    *   @param scenes        The scenes that contain this light.
    *   @param position      Where this light is located.
    *   @param diffuseColor  The color this light spreads to all surfaces.
    *   @param specularColor The shining spot color this light spreads to faces.
    *   @param range         How far the point light shall reach.
    *   @param intensity     The intensity of this light.
    *******************************************************************************************************************/
    public static createPoint
    (
        scenes        :BABYLON.Scene[],
        position      :BABYLON.Vector3,
        diffuseColor  :BABYLON.Color3,
        specularColor :BABYLON.Color3,
        range         :number = 100.0,
        intensity     :number = 2.0
    )
    : BABYLON.PointLight[]
    {
        const lights:BABYLON.PointLight[] = [];

        for ( const scene of scenes )
        {
            const light:BABYLON.PointLight = new BABYLON.PointLight
            (
                LightFactory.createNextLightId(),
                position,
                scene
            );

            light.intensity = intensity;
            light.diffuse   = diffuseColor;
            light.specular  = specularColor;
            light.range     = range;

            lights.push( light );
        }

        return lights;
    }

    /** ****************************************************************************************************************
    *   Creates a 'volumic scattered light' post processing effect onto the specified light.
    *
    *   @param scene         The scene that contains this light.
    *   @param position      Where this light is located.
    *   @param scaling       Scale to apply to the light mesh.
    *   @param boundCamera   The camera to apply this post processing effect to.
    *   @param engine        The parent engine reference.
    *
    *   @deprecated Needs to be extended for multiple scenes.
    *******************************************************************************************************************/
    public static createVolumetricLightScatteringPostProcess
    (
        scene       :BABYLON.Scene,
        position    :BABYLON.Vector3,
        scaling     :BABYLON.Vector3,
        boundCamera :BABYLON.Camera,
        engine      :BABYLON.Engine
    )
    : BABYLON.VolumetricLightScatteringPostProcess
    {
        const godrays:BABYLON.VolumetricLightScatteringPostProcess = new BABYLON.VolumetricLightScatteringPostProcess(
            'godrays',
            2.0,
            boundCamera,
            null,
            100,
            BABYLON.Texture.BILINEAR_SAMPLINGMODE,
            engine,
            false
        );

        // By default it uses a billboard to render the sun, just apply the desired texture
        // position and scale
        (godrays.mesh.material as BABYLON.StandardMaterial).diffuseTexture = new BABYLON.Texture(
            bz.SettingResource.PATH_IMAGE_TEXTURE + 'postProcess/sun.png',
            scene,
            true,
            false,
            BABYLON.Texture.BILINEAR_SAMPLINGMODE
        );
        (godrays.mesh.material as BABYLON.StandardMaterial).diffuseTexture.hasAlpha = true;
        godrays.mesh.position = position;
        godrays.mesh.scaling  = scaling;

        return godrays;
    }

    /** ****************************************************************************************************************
    *   Returns the next id for a new light to create.
    *
    *   @return The next free unique id for a new light to create.
    *******************************************************************************************************************/
    private static createNextLightId() : string
    {
        return 'light' + String( LightFactory.nextLightId++ );
    }
}


    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Creates all types of lights.
    *******************************************************************************************************************/
    export class LightFactory
    {
        /** Next ID to assign for light creation. */
        private         static          currentLightId          :number                 = 0;

        /** ************************************************************************************************************
        *   Creates a hemispheric light.
        *
        *   @param scene         The scene that contains this light.
        *   @param direction     The direction for this light.
        *   @param diffuseColor  The color this light spreads to all surfaces.
        *   @param specularColor The shining spot color this light spreads to faces.
        *   @param groundColor   The color for the ground to apply.
        ***************************************************************************************************************/
        public static createHemispheric
        (
            scene         :BABYLON.Scene,
            direction     :BABYLON.Vector3,
            diffuseColor  :BABYLON.Color3,
            specularColor :BABYLON.Color3,
            groundColor   :BABYLON.Color3
        )
        : BABYLON.HemisphericLight
        {
            const light:BABYLON.HemisphericLight = new BABYLON.HemisphericLight
            (
                'light' + LightFactory.currentLightId++,
                direction,
                scene
            );

            light.diffuse     = diffuseColor ;
            light.specular    = specularColor;
            light.groundColor = groundColor  ;

            return light;
        }

        /** ************************************************************************************************************
        *   Creates a directional light.
        *
        *   @param scene         The scene that contains this light.
        *   @param direction     The direction for this light.
        *   @param position      Where this light is located.
        *   @param intensity     The intensity of this light.
        *   @param diffuseColor  The color this light spreads to all surfaces.
        *   @param specularColor The shining spot color this light spreads to faces.
        ***************************************************************************************************************/
        public static createDirectional
        (
            scene         :BABYLON.Scene,
            direction     :BABYLON.Vector3,
            position      :BABYLON.Vector3,
            intensity     :number,
            diffuseColor  :BABYLON.Color3,
            specularColor :BABYLON.Color3,
        )
        : BABYLON.DirectionalLight
        {
            const light:BABYLON.DirectionalLight = new BABYLON.DirectionalLight
            (
                'light' + LightFactory.currentLightId++,
                direction,
                scene
            );

            light.position  = position;
            light.intensity = 1.0;
            light.diffuse   = diffuseColor;
            light.specular  = specularColor;

            return light;
        }

        /** ************************************************************************************************************
        *   Creates a spot light.
        *
        *   @param scene         The scene that contains this light.
        *   @param position      Where this light is located.
        *   @param direction     The direction for this light.
        *   @param angle         The angle of this spot light's cone.
        *   @param exponent      The light decay speed with the distance from the emission spot.
        *   @param diffuseColor  The color this light spreads to all surfaces.
        *   @param specularColor The shining spot color this light spreads to faces.
        ***************************************************************************************************************/
        public static createSpot
        (
            scene         :BABYLON.Scene,
            position      :BABYLON.Vector3,
            direction     :BABYLON.Vector3,
            angle         :number,
            exponent      :number,
            diffuseColor  :BABYLON.Color3,
            specularColor :BABYLON.Color3,
        )
        : BABYLON.SpotLight
        {
            const light:BABYLON.SpotLight = new BABYLON.SpotLight
            (
                'light' + LightFactory.currentLightId++,
                position,
                direction,
                angle,
                exponent,
                scene
            );

            light.diffuse  = diffuseColor ;
            light.specular = specularColor;

            return light;
        }

        /** ************************************************************************************************************
        *   Creates a point light.
        *
        *   @param scene         The scene that contains this light.
        *   @param position      Where this light is located.
        *   @param intensity     The intensity of this light.
        *   @param diffuseColor  The color this light spreads to all surfaces.
        *   @param specularColor The shining spot color this light spreads to faces.
        ***************************************************************************************************************/
        public static createPoint
        (
            scene         :BABYLON.Scene,
            position      :BABYLON.Vector3,
            intensity     :number,
            diffuseColor  :BABYLON.Color3,
            specularColor :BABYLON.Color3,
        )
        : BABYLON.PointLight
        {
            const light:BABYLON.PointLight = new BABYLON.PointLight
            (
                'light' + LightFactory.currentLightId++,
                position,
                scene
            );

            light.intensity = 1.0;
            light.diffuse   = diffuseColor;
            light.specular  = specularColor;

            return light;
        }
    }

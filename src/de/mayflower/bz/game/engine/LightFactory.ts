
    import * as BABYLON from 'babylonjs';
    import * as bz      from '../../index';

    /** ****************************************************************************************************************
    *   Creates all types of lights.
    *******************************************************************************************************************/
    export abstract class LightFactory
    {
        /** Next ID to assign for light creation. */
        private         static          nextLightId          :number                 = 0;

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
                LightFactory.createNextLightId(),
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

        /** ************************************************************************************************************
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
        ***************************************************************************************************************/
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

        /** ************************************************************************************************************
        *   Creates a point light.
        *
        *   @param scene         The scene that contains this light.
        *   @param position      Where this light is located.
        *   @param diffuseColor  The color this light spreads to all surfaces.
        *   @param specularColor The shining spot color this light spreads to faces.
        *   @param range         How far the point light shall reach.
        *   @param intensity     The intensity of this light.
        ***************************************************************************************************************/
        public static createPoint
        (
            scene         :BABYLON.Scene,
            position      :BABYLON.Vector3,
            diffuseColor  :BABYLON.Color3,
            specularColor :BABYLON.Color3,
            range         :number,
            intensity     :number
        )
        : BABYLON.PointLight
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

            return light;
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new light to create.
        *
        *   @return The next free unique id for a new light to create.
        ***************************************************************************************************************/
        private static createNextLightId() : string
        {
            return 'light' + LightFactory.nextLightId++;
        }
    }


    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Creates all types of lights.
    *******************************************************************************************************************/
    export class LightFactory
    {
        private         static          currentLightId          :number                 = 0;

        /** ************************************************************************************************************
        *   Creates a hemispheric light.
        *
        *   @param direction     The direction for this light.
        *   @param scene         The scene that contains this light.
        *   @param diffuseColor  The color this light spreads to all surfaces.
        *   @param specularColor The shining spot color this light spreads to faces.
        *   @param groundColor   The color for the ground to apply.
        ***************************************************************************************************************/
        public static createHemispheric
        (
            direction     :BABYLON.Vector3,
            scene         :BABYLON.Scene,
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





    }

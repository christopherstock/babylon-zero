        import * as bz from "../../src/typescript/de/mayflower/bz/base/Debug";

        const pointLight :BABYLON.PointLight = bz.LightFactory.createPoint
        (
            this.getScene().getNativeScene(),
            new BABYLON.Vector3( this.OFFSET_X + 20.0, 7.5, this.OFFSET_Z + 20.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 ),
            25.0,
            1.0,
            true
        );
        this.addLight( pointLight );

        // hemispheric light
        const hemisphericLights :BABYLON.HemisphericLight[] = bz.LightFactory.createHemispheric
        (
            [ this.getScene().getNativeSceneBG(), this.getScene().getNativeSceneFG() ],
            new BABYLON.Vector3( 0.0, 1.0, 0.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.1, 0.1, 0.1 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 ),
            1.5
        );
        this.addLight( hemisphericLights );

        // directional light
        const directionalLight:BABYLON.DirectionalLight = bz.LightFactory.createDirectional
        (
            this.getScene().getNativeScene(),
            new BABYLON.Vector3( 0.0, -1.0, 0.0 ),
            new BABYLON.Vector3( 20.0, 20.0, 20.0 ),
            1.0,
            new BABYLON.Color3( 0.5, 0.5, 0.5 ),
            new BABYLON.Color3( 1.0, 0.5, 0.0 )
        );
        this.addLight( directionalLight );

        // spot light
        const spotLight:BABYLON.SpotLight = bz.LightFactory.createSpot
        (
            this.getScene().getNativeScene(),
            new BABYLON.Vector3( 15.0, 8.0, 15.0 ),
            new BABYLON.Vector3( 0.0, -1.0, 0.0 ),
            30.0,
            2,
            new BABYLON.Color3( 0.5, 0.5, 0.5 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            100.0
        );
        this.addLight( spotLight );

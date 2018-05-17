
    import * as BABYLON from 'babylonjs';
    import * as bz from '..';

    /*******************************************************************************************************************
    *   Specifies all valid anchors for a mesh.
    *******************************************************************************************************************/
    export enum PivotAnchor
    {
        DEBUG_NONE,
        LOWEST_XYZ,
        CENTER_XYZ,
        CENTER_XZ_LOWEST_Y,
    }

    /*******************************************************************************************************************
    *   Constructs meshes.
    *******************************************************************************************************************/
    export class MeshFactory
    {
        /***************************************************************************************************************
        *   Creates a box.
        ***************************************************************************************************************/
        public static createBox
        (
            id              :string,
            position        :BABYLON.Vector3,
            pivotAnchor     :bz.PivotAnchor,
            size            :BABYLON.Vector3,
            rotation        :BABYLON.Vector3,
            texture         :bz.Texture,
            textureHasAlpha :bz.TextureHasAlpha,
            textureUV       :bz.TextureUV,
            color           :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,
            physic          :bz.Physic,
            materialAlpha   :number
        )
        : BABYLON.Mesh
        {
            let faceUV:BABYLON.Vector4[] = [];

            switch ( textureUV )
            {
                case bz.TextureUV.ALL_TO_ONE:
                {
                    faceUV =
                    [
                        new BABYLON.Vector4( 0.0, 0.0, -1.0, -1.0 ),
                        new BABYLON.Vector4( 0.0, 0.0, 1.0,  1.0  ),

                        new BABYLON.Vector4( 0.0, 0.0, -1.0, -1.0 ),
                        new BABYLON.Vector4( 0.0, 0.0, 1.0,  1.0  ),

                        new BABYLON.Vector4( 0.0, 0.0, -1.0, -1.0 ),
                        new BABYLON.Vector4( 0.0, 0.0, 1.0,  1.0  ),
                    ];
                    break;
                }

                case bz.TextureUV.TILED_BY_SIZE:
                {
                    faceUV =
                    [
                        new BABYLON.Vector4( 0.0, 0.0, -size.x, -size.y ),
                        new BABYLON.Vector4( 0.0, 0.0, size.x,  size.y  ),

                        new BABYLON.Vector4( 0.0, 0.0, -size.y, -size.z ),
                        new BABYLON.Vector4( 0.0, 0.0, size.y,  size.z  ),

                        new BABYLON.Vector4( 0.0, 0.0, -size.z, -size.x ),
                        new BABYLON.Vector4( 0.0, 0.0, size.z,  size.x  ),
                    ];
                    break;
                }
            }

            const box:BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox
            (
                id,
                {
                    width:  size.x,
                    height: size.y,
                    depth:  size.z,

                    faceUV: faceUV,
                },
                scene
            );

            MeshFactory.setPositionAndPivot( box, position, pivotAnchor, size.x, size.y, size.z );
            const material:BABYLON.StandardMaterial = bz.MaterialSystem.createMaterial
            (
                texture,
                textureHasAlpha,
                null,
                size.x,
                size.z,
                color,
                materialAlpha
            );

            return MeshFactory.decorateMesh
            (
                box,
                rotation,
                material,
                scene,
                physic,
                BABYLON.PhysicsImpostor.BoxImpostor
            );
        }

        /***************************************************************************************************************
        *   Creates a cylinder.
        ***************************************************************************************************************/
        public static createCylinder
        (
            id              :string,
            position        :BABYLON.Vector3,
            pivotAnchor     :bz.PivotAnchor,
            diameter        :number,
            height          :number,
            rotation        :BABYLON.Vector3,
            texture         :bz.Texture,
            textureHasAlpha :bz.TextureHasAlpha,
            textureUV       :bz.TextureUV,
            color           :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,
            physic          :bz.Physic,
            materialAlpha   :number
        )
        : BABYLON.Mesh
        {
            let faceUV:BABYLON.Vector4[] = [];

            switch ( textureUV )
            {
                case bz.TextureUV.ALL_TO_ONE:
                {
                    faceUV =
                    [
                        new BABYLON.Vector4( 0.0, 0.0, 1.0, 1.0 ),
                        new BABYLON.Vector4( 0.0, 0.0, 1.0, 1.0  ),
                        new BABYLON.Vector4( 0.0, 0.0, 1.0, 1.0 ),
                    ];
                    break;
                }

                case bz.TextureUV.TILED_BY_SIZE:
                {
                    faceUV =
                    [
                        new BABYLON.Vector4( 0.0, 0.0, -diameter,               diameter ),
                        new BABYLON.Vector4( 0.0, 0.0, -( diameter * Math.PI ), height   ),
                        new BABYLON.Vector4( 0.0, 0.0, diameter,                diameter ),
                    ];
                    break;
                }
            }

            const cylinder:BABYLON.Mesh = BABYLON.MeshBuilder.CreateCylinder
            (
                id,
                {
                    diameter: diameter,
                    height:   height,

                    faceUV:   faceUV,
                },
                scene
            );

            MeshFactory.setPositionAndPivot( cylinder, position, pivotAnchor, diameter, height, diameter );
            const material:BABYLON.StandardMaterial = bz.MaterialSystem.createMaterial
            (
                texture,
                textureHasAlpha,
                null,
                diameter,
                height,
                color,
                materialAlpha
            );

            return MeshFactory.decorateMesh
            (
                cylinder,
                rotation,
                material,
                scene,
                physic,
                BABYLON.PhysicsImpostor.CylinderImpostor
            );
        }

        /***************************************************************************************************************
        *   Creates a sphere.
        ***************************************************************************************************************/
        public static createSphere
        (
            id              :string,
            position        :BABYLON.Vector3,
            pivotAnchor     :bz.PivotAnchor,
            diameter        :number,
            rotation        :BABYLON.Vector3,
            texture         :bz.Texture,
            textureHasAlpha :bz.TextureHasAlpha,
            textureUV       :bz.TextureUV,
            color           :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,
            physic          :bz.Physic,
            materialAlpha   :number
        )
        : BABYLON.Mesh
        {
            const sphere:BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere
            (
                id,
                {
                    diameter: diameter,
                },
                scene
            );

            MeshFactory.setPositionAndPivot( sphere, position, pivotAnchor, diameter, diameter, diameter );
            const material:BABYLON.StandardMaterial = bz.MaterialSystem.createMaterial
            (
                texture,
                textureHasAlpha,
                textureUV,
                diameter,
                diameter,
                color,
                materialAlpha
            );

            return MeshFactory.decorateMesh
            (
                sphere,
                rotation,
                material,
                scene,
                physic,
                BABYLON.PhysicsImpostor.SphereImpostor
            );
        }

        /***************************************************************************************************************
        *   Creates a plane.
        ***************************************************************************************************************/
        public static createPlane
        (
            id              :string,
            position        :BABYLON.Vector3,
            pivotAnchor     :bz.PivotAnchor,
            width           :number,
            height          :number,
            rotation        :BABYLON.Vector3,

            // bundle texture props
            texture         :bz.Texture,
            textureHasAlpha :bz.TextureHasAlpha,
            textureUV       :bz.TextureUV,
            color           :BABYLON.StandardMaterial,

            scene           :BABYLON.Scene,
            physic          :bz.Physic,
            materialAlpha   :number
        )
        : BABYLON.Mesh
        {
            const plane:BABYLON.Mesh = BABYLON.MeshBuilder.CreatePlane
            (
                id,
                {
                    width:  width,
                    height: height,
                },
                scene
            );

            MeshFactory.setPositionAndPivot( plane, position, pivotAnchor, width, height, 0.0 );
            const material:BABYLON.StandardMaterial = bz.MaterialSystem.createMaterial
            (
                texture,
                textureHasAlpha,
                textureUV,
                width,
                height,
                color,
                materialAlpha
            );

            return MeshFactory.decorateMesh
            (
                plane,
                rotation,
                material,
                scene,
                physic,
                BABYLON.PhysicsImpostor.BoxImpostor
            );
        }

        /***************************************************************************************************************
        *   Creates a line.
        ***************************************************************************************************************/
        public static createLine
        (
            id              :string,
            start           :BABYLON.Vector3,
            end             :BABYLON.Vector3,
            pivotAnchor     :bz.PivotAnchor,
            rotation        :BABYLON.Vector3,

            color           :BABYLON.Color4,
            scene           :BABYLON.Scene,

            physic          :bz.Physic,
        )
        : BABYLON.Mesh
        {
            const line:BABYLON.Mesh = BABYLON.MeshBuilder.CreateLines
            (
                id,
                {
                    points:
                    [
                        start,
                        end,
                    ],
                    colors:
                    [
                        color,
                        color,
                    ],
                    useVertexAlpha: true
                },
                scene
            );

            MeshFactory.setPositionAndPivot( line, BABYLON.Vector3.Zero(), pivotAnchor, 0.0, 0.0, 0.0 );

            return MeshFactory.decorateMesh
            (
                line,
                rotation,
                null,
                scene,
                physic,
                BABYLON.PhysicsImpostor.BoxImpostor
            );
        }

        /***************************************************************************************************************
        *   Creates a polygon.
        ***************************************************************************************************************/
        public static createPolygon
        (
            id              :string,

            points          :BABYLON.Vector3[],

            pivotAnchor     :bz.PivotAnchor,
            rotation        :BABYLON.Vector3,

            color           :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,

            physic          :bz.Physic,
        )
        : BABYLON.Mesh
        {
            const triangle:BABYLON.Mesh = BABYLON.MeshBuilder.CreatePolygon
            (
                id,
                {
                    shape: points,
/*
                    faceColors:
                    [
                        color,
                        color,
                        color,
                    ],
*/
                    depth: 0.001,
                },
                scene
            );

            MeshFactory.setPositionAndPivot
            (
                triangle,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                pivotAnchor,
                0.0,
                0.0,
                0.0
            );
            const material:BABYLON.StandardMaterial = bz.MaterialSystem.createMaterial
            (
                null,
                null,
                null,
                0.0,
                0.0,
                color,
                1.0
            );

            return MeshFactory.decorateMesh
            (
                triangle,
                rotation,
                material,
                scene,
                physic,
                BABYLON.PhysicsImpostor.BoxImpostor
            );
        }

        public static createSkyBox( cubeTextureName:string, scene:BABYLON.Scene ) : BABYLON.Mesh
        {
            const skyboxMaterial = new BABYLON.StandardMaterial( 'skyBox', scene );

            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture
            (
                bz.SettingEngine.PATH_IMAGE_SKYBOX + cubeTextureName,
                scene
            );
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.diffuseColor  = new BABYLON.Color3( 0.0, 0.0, 0.0 );
            skyboxMaterial.specularColor = new BABYLON.Color3( 0.0, 0.0, 0.0 );
            skyboxMaterial.alpha = 1.0;
            // skyboxMaterial.disableLighting = true;

            const skybox:BABYLON.Mesh = BABYLON.Mesh.CreateBox( 'skyBox', 1000.0, scene );
            skybox.infiniteDistance = true;
            skybox.material         = skyboxMaterial;

            return skybox;
        }

        /***************************************************************************************************************
        *   Adds general mesh properties.
        ***************************************************************************************************************/
        private static decorateMesh
        (
            mesh            :BABYLON.Mesh,
            rotation        :BABYLON.Vector3,
            material        :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,
            physic          :bz.Physic,
            physicsImpostor :number
        )
        : BABYLON.Mesh
        {
            mesh.material       = material;
            mesh.receiveShadows = false;

            bz.Mesh.setPhysic( mesh, physic, physicsImpostor, scene );

            if ( rotation != null )
            {
                bz.Mesh.setAbsoluteRotationXYZ( mesh, rotation.x, rotation.y, rotation.z );
            }

            return mesh;
        }

        private static setPositionAndPivot
        (
            mesh            :BABYLON.Mesh,
            position        :BABYLON.Vector3,
            pivotAnchor     :bz.PivotAnchor,
            width           :number,
            height          :number,
            depth           :number,
        )
        {
            switch ( pivotAnchor )
            {
                case bz.PivotAnchor.LOWEST_XYZ:
                {
                    mesh.position = position;
                    mesh.setPivotMatrix
                    (
                        BABYLON.Matrix.Translation
                        (
                            ( width  / 2 ),
                            ( height / 2 ),
                            ( depth  / 2 )
                        ),
                        false
                    );
                    break;
                }

                case bz.PivotAnchor.CENTER_XYZ:
                {
                    mesh.position = position;
                    mesh.setPivotMatrix
                    (
                        BABYLON.Matrix.Translation
                        (
                            0.0,
                            0.0,
                            0.0
                        ),
                        false
                    );
                    break;
                }

                case bz.PivotAnchor.CENTER_XZ_LOWEST_Y:
                {
                    mesh.position = position;
                    mesh.setPivotMatrix
                    (
                        BABYLON.Matrix.Translation
                        (
                            0.0,
                            ( height / 2 ),
                            0.0
                        ),
                        false
                    );
                    break;
                }

                case bz.PivotAnchor.DEBUG_NONE:
                {
                    mesh.position = new BABYLON.Vector3(
                        position.x + ( width  / 2 ),
                        position.y + ( height / 2 ),
                        position.z + ( depth  / 2 )
                    );
                    break;
                }
            }
        }
    }

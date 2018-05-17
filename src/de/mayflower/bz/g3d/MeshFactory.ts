
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
        *   Creates a box mesh.
        *
        *   @param id              The internal babylon.JS mesh identifier.
        *   @param position        Where to place this mesh.
        *   @param pivotAnchor     The anchor point of this mesh.
        *   @param size            The dimensions of this mesh for all axis.
        *   @param rotation        The initial rotation for all axis.
        *   @param texture         The texture to apply.
        *   @param textureHasAlpha Specifies if the texture has alpha information.
        *   @param textureUV       The UV strategy for the given texture.
        *   @param color           The solid color to apply.
        *   @param scene           The scene where this mesh will be applied.
        *   @param physic          The physical attributes to apply for this mesh.
        *   @param materialAlpha   The opacity for this mesh.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createBox
        (
            id              :string,
            position        :BABYLON.Vector3,
            pivotAnchor     :bz.PivotAnchor,
            size            :BABYLON.Vector3,
            rotation        :BABYLON.Vector3,

            // TODO bundle!
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
        *   Creates a cylinder mesh.
        *
        *   @param id              The internal babylon.JS mesh identifier.
        *   @param position        Where to place this mesh.
        *   @param pivotAnchor     The anchor point of this mesh.
        *   @param diameter        The diameter of the cylinder.
        *   @param height          The height of the cylinder.
        *   @param rotation        The initial rotation for all axis.
        *   @param texture         The texture to apply.
        *   @param textureHasAlpha Specifies if the texture has alpha information.
        *   @param textureUV       The UV strategy for the given texture.
        *   @param color           The solid color to apply.
        *   @param scene           The scene where this mesh will be applied.
        *   @param physic          The physical attributes to apply for this mesh.
        *   @param materialAlpha   The opacity for this mesh.
        *
        *   @return The created mesh.
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
        *
        *   @param id              The internal babylon.JS mesh identifier.
        *   @param position        Where to place this mesh.
        *   @param pivotAnchor     The anchor point of this mesh.
        *   @param diameter        The diameter of the sphere.
        *   @param rotation        The initial rotation for all axis.
        *   @param texture         The texture to apply.
        *   @param textureHasAlpha Specifies if the texture has alpha information.
        *   @param textureUV       The UV strategy for the given texture.
        *   @param color           The solid color to apply.
        *   @param scene           The scene where this mesh will be applied.
        *   @param physic          The physical attributes to apply for this mesh.
        *   @param materialAlpha   The opacity for this mesh.
        *
        *   @return The created mesh.
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
        *   Creates a plane mesh.
        *
        *   @param id              The internal babylon.JS mesh identifier.
        *   @param position        Where to place this mesh.
        *   @param pivotAnchor     The anchor point of this mesh.
        *   @param width           Width  of the plane.
        *   @param height          Height of the plane.
        *   @param rotation        The initial rotation for all axis.
        *   @param texture         The texture to apply.
        *   @param textureHasAlpha Specifies if the texture has alpha information.
        *   @param textureUV       The UV strategy for the given texture.
        *   @param color           The solid color to apply.
        *   @param scene           The scene where this mesh will be applied.
        *   @param physic          The physical attributes to apply for this mesh.
        *   @param materialAlpha   The opacity for this mesh.
        *
        *   @return The created mesh.
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
        *   Creates a line mesh.
        *
        *   @param id              The internal babylon.JS mesh identifier.
        *   @param start           Start point of the line mesh.
        *   @param end             End point of the line mesh.
        *   @param pivotAnchor     The anchor point of this mesh.
        *   @param rotation        The initial rotation for all axis.
        *   @param color           The solid color to apply.
        *   @param scene           The scene where this mesh will be applied.
        *   @param physic          The physical attributes to apply for this mesh.
        *
        *   @return The created mesh.
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
        *   Creates a polygon mesh.
        *
        *   @param id              The internal babylon.JS mesh identifier.
        *   @param points          All corner points for this polygon to create.
        *   @param pivotAnchor     The anchor point of this mesh.
        *   @param rotation        The initial rotation for all axis.
        *   @param color           The solid color to apply.
        *   @param scene           The scene where this mesh will be applied.
        *   @param physic          The physical attributes to apply for this mesh.
        *
        *   @return The created mesh.
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

        /***************************************************************************************************************
        *   Creates a skybox mesh.
        *
        *   @param cubeTextureName The name of the folder that contains the skybox.
        *   @param scene           The scene where this mesh will be applied.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createSkyBox( cubeTextureName:string, scene:BABYLON.Scene ) : BABYLON.Mesh
        {
            const skyboxMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( 'skyBox', scene );

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
        *
        *   @param mesh            The mesh to decorate.
        *   @param rotation        The initial rotation for all axis.
        *   @param material        The material to apply on this mesh.
        *   @param scene           The scene where this mesh will be applied.
        *   @param physic          The physical attributes to apply for this mesh.
        *   @param physicsImpostor The kind of physic impostor to apply to this mesh.
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

        /***************************************************************************************************************
        *   Sets the position and pivot to the specified mesh.
        *
        *   @param mesh        The mesh to apply position and pivot to.
        *   @param position    Where to place this mesh.
        *   @param pivotAnchor The anchor point of this mesh.
        *   @param width       The dimension x of this mesh.
        *   @param height      The dimension y of this mesh.
        *   @param depth       The dimension z of this mesh.
        ***************************************************************************************************************/
        private static setPositionAndPivot
        (
            mesh        :BABYLON.Mesh,
            position    :BABYLON.Vector3,
            pivotAnchor :bz.PivotAnchor,
            width       :number,
            height      :number,
            depth       :number,
        )
        : void
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

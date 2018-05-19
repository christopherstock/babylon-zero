
    import * as BABYLON from 'babylonjs';
    import * as bz from '..';

    /** ****************************************************************************************************************
    *   Specifies all valid anchors for a mesh.
    *******************************************************************************************************************/
    export enum PivotAnchor
    {
        DEBUG_NONE,
        LOWEST_XYZ,
        CENTER_XYZ,
        CENTER_XZ_LOWEST_Y,
    }

    /** ****************************************************************************************************************
    *   Constructs meshes.
    *******************************************************************************************************************/
    export class MeshFactory
    {
        /** Next ID to assign for box creation. */
        public              static              nextBoxId               :number                     = 0;
        /** Next ID to assign for cylinder creation. */
        private             static              nextCylinderId          :number                     = 0;
        /** Next ID to assign for sphere creation. */
        private             static              nextSphereId            :number                     = 0;
        /** Next ID to assign for plane creation. */
        private             static              nextPlaneId             :number                     = 0;
        /** Next ID to assign for line creation. */
        private             static              nextLineId              :number                     = 0;
        /** Next ID to assign for polygon creation. */
        private             static              nextPolygonId           :number                     = 0;

        /** ************************************************************************************************************
        *   Creates a box mesh.
        *
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
        *   @param emissiveColor   The emissive color for this material.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createBox
        (
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
            materialAlpha   :number,
            emissiveColor   :BABYLON.Color3
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
                'box' + MeshFactory.nextBoxId++,
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
                materialAlpha,
                emissiveColor
            );

            const volume:number = ( size.x * size.y * size.z );

            return MeshFactory.decorateMesh
            (
                box,
                rotation,
                material,
                scene,
                physic,
                BABYLON.PhysicsImpostor.BoxImpostor,
                volume
            );
        }

        /** ************************************************************************************************************
        *   Creates a cylinder mesh.
        *
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
        *   @param emissiveColor   The emissive color for this material.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createCylinder
        (
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
            materialAlpha   :number,
            emissiveColor   :BABYLON.Color3
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
                'cylinder' + MeshFactory.nextCylinderId++,
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
                materialAlpha,
                emissiveColor
            );

            const volume:number = ( Math.pow( ( diameter / 2 ), 2 ) * Math.PI * height );

            return MeshFactory.decorateMesh
            (
                cylinder,
                rotation,
                material,
                scene,
                physic,
                BABYLON.PhysicsImpostor.CylinderImpostor,
                volume
            );
        }

        /** ************************************************************************************************************
        *   Creates a sphere.
        *
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
        *   @param emissiveColor   The emissive color for this material.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createSphere
        (
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
            materialAlpha   :number,
            emissiveColor   :BABYLON.Color3
        )
        : BABYLON.Mesh
        {
            const sphere:BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere
            (
                'sphere' + MeshFactory.nextSphereId++,
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
                materialAlpha,
                emissiveColor
            );

            const volume:number = ( Math.pow( ( diameter / 2 ), 3 ) * Math.PI * 4 / 3 );

            return MeshFactory.decorateMesh
            (
                sphere,
                rotation,
                material,
                scene,
                physic,
                BABYLON.PhysicsImpostor.SphereImpostor,
                volume
            );
        }

        /** ************************************************************************************************************
        *   Creates a plane mesh.
        *
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
        *   @param emissiveColor   The emissive color for this material.
        *   @param sideOrientation The orientation sattribute is required for correct light effects.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createPlane
        (
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
            materialAlpha   :number,
            emissiveColor   :BABYLON.Color3,
            sideOrientation :number
        )
        : BABYLON.Mesh
        {
            const plane:BABYLON.Mesh = BABYLON.MeshBuilder.CreatePlane
            (
                'plane' + MeshFactory.nextPlaneId++,
                {
                    width:           width,
                    height:          height,
                    sideOrientation: sideOrientation,
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
                materialAlpha,
                emissiveColor
            );

            const volume:number = ( width * height * 0.001 );

            return MeshFactory.decorateMesh
            (
                plane,
                rotation,
                material,
                scene,
                physic,
                BABYLON.PhysicsImpostor.BoxImpostor,
                volume
            );
        }

        /** ************************************************************************************************************
        *   Creates a line mesh.
        *
        *   @param start           Start point of the line mesh.
        *   @param end             End point of the line mesh.
        *   @param pivotAnchor     The anchor point of this mesh.
        *   @param rotation        The initial rotation for all axis.
        *   @param color           The solid color to apply.
        *   @param scene           The scene where this mesh will be applied.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createLine
        (
            start           :BABYLON.Vector3,
            end             :BABYLON.Vector3,
            pivotAnchor     :bz.PivotAnchor,
            rotation        :BABYLON.Vector3,

            color           :BABYLON.Color4,
            scene           :BABYLON.Scene
        )
        : BABYLON.Mesh
        {
            const line:BABYLON.Mesh = BABYLON.MeshBuilder.CreateLines
            (
                'line' + MeshFactory.nextLineId++,
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
                bz.Physic.NONE,
                BABYLON.PhysicsImpostor.BoxImpostor,
                0.0
            );
        }

        /** ************************************************************************************************************
        *   Creates a polygon mesh.
        *
        *   @param points          All corner points for this polygon to create.
        *   @param pivotAnchor     The anchor point of this mesh.
        *   @param rotation        The initial rotation for all axis.
        *   @param color           The solid color to apply.
        *   @param scene           The scene where this mesh will be applied.
        *   @param physic          The physical attributes to apply for this mesh.
        *   @param emissiveColor   The emissive color for this material.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createPolygon
        (
            points          :BABYLON.Vector3[],

            pivotAnchor     :bz.PivotAnchor,
            rotation        :BABYLON.Vector3,

            color           :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,

            physic          :bz.Physic,
            emissiveColor   :BABYLON.Color3
        )
        : BABYLON.Mesh
        {
            const polygon:BABYLON.Mesh = BABYLON.MeshBuilder.CreatePolygon
            (
                'polygon' + MeshFactory.nextPolygonId++,
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
                    // TODO to constant!
                    depth: 0.001,
                },
                scene
            );

            MeshFactory.setPositionAndPivot
            (
                polygon,
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
                1.0,
                emissiveColor
            );

            return MeshFactory.decorateMesh
            (
                polygon,
                rotation,
                material,
                scene,
                physic,
                BABYLON.PhysicsImpostor.BoxImpostor,
                1.0
            );
        }

        /** ************************************************************************************************************
        *   Creates a skybox mesh.
        *
        *   @param opacity         The alpha value for the skybox texture.
        *   @param cubeTextureName The name of the folder that contains the skybox.
        *   @param scene           The scene where this mesh will be applied.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createSkyBox( opacity:number, cubeTextureName:string, scene:BABYLON.Scene ) : BABYLON.Mesh
        {
            const skyboxMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( 'skyBox', scene );

            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture
            (
                bz.SettingEngine.PATH_IMAGE_SKYBOX + cubeTextureName,
                scene
            );
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

            skyboxMaterial.diffuseColor  = bz.SettingGame.COLOR_BLACK;
            skyboxMaterial.specularColor = bz.SettingGame.COLOR_BLACK;
            skyboxMaterial.emissiveColor = bz.SettingGame.COLOR_BLACK;

            skyboxMaterial.alpha = opacity;
            skyboxMaterial.disableLighting = true;

            const skybox:BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox(
                'box' + MeshFactory.nextBoxId++,
                { size: 1000.0 },
                scene
            );
            skybox.infiniteDistance = true;
            skybox.material         = skyboxMaterial;

            return skybox;
        }

        /** ************************************************************************************************************
        *   Adds general mesh properties.
        *
        *   @param mesh            The mesh to decorate.
        *   @param rotation        The initial rotation for all axis.
        *   @param material        The material to apply on this mesh.
        *   @param scene           The scene where this mesh will be applied.
        *   @param physic          The physical attributes to apply for this mesh.
        *   @param physicsImpostor The kind of physic impostor to apply to this mesh.
        *   @param volume          The calculated volume of the mesh.
        ***************************************************************************************************************/
        private static decorateMesh
        (
            mesh            :BABYLON.Mesh,
            rotation        :BABYLON.Vector3,
            material        :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,
            physic          :bz.Physic,
            physicsImpostor :number,
            volume          :number
        )
        : BABYLON.Mesh
        {
            mesh.material       = material;
            mesh.receiveShadows = bz.SettingEngine.ENABLE_SHADOWS;

            bz.Mesh.setPhysic( mesh, volume, physic, physicsImpostor, scene );

            if ( rotation != null )
            {
                bz.Mesh.setAbsoluteRotationXYZ( mesh, rotation.x, rotation.y, rotation.z );
            }

            return mesh;
        }

        /** ************************************************************************************************************
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

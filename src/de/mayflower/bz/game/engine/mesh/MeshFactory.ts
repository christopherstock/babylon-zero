
    import * as BABYLON from 'babylonjs';
    import * as bz      from '../../..';

    /** ****************************************************************************************************************
    *   Constructs meshes.
    *******************************************************************************************************************/
    export class MeshFactory
    {
        /** Implicit depth for 2D faces ( e.g. planes or polygons ). */
        public              static  readonly    FACE_DEPTH              :number                     = 0.001;

        /** Next ID to assign for mesh creation. */
        private             static              nextMeshId              :number                     = 0;

        /** ************************************************************************************************************
        *   Returns the next id for a new mesh to create.
        *
        *   @return The next free unique id for a new mesh to create.
        ***************************************************************************************************************/
        public static createNextMeshId() : string
        {
            return 'mesh' + MeshFactory.nextMeshId++;
        }

        /** ************************************************************************************************************
        *   Creates a box mesh.
        *
        *   @param position        Where to place this mesh.
        *   @param pivotAnchor     The anchor point of this mesh.
        *   @param size            The dimensions of this mesh for all axis.
        *   @param rotation        The initial rotation for all axis.
        *   @param texture         The texture to apply.
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
            pivotAnchor     :bz.MeshPivotAnchor,
            size            :BABYLON.Vector3,
            rotation        :BABYLON.Vector3,
            texture         :bz.Texture,
            color           :BABYLON.Color3,
            scene           :BABYLON.Scene,
            physic          :bz.Physic,
            materialAlpha   :number,
            emissiveColor   :BABYLON.Color3
        )
        : BABYLON.Mesh
        {
            let faceUV:BABYLON.Vector4[] = [];

            if ( texture != null )
            {
                switch ( texture.textureUV )
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
            }

            const box:BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox
            (
                MeshFactory.createNextMeshId(),
                {
                    width:  size.x,
                    height: size.y,
                    depth:  size.z,

                    faceUV: faceUV,
                },
                scene
            );

            MeshFactory.setPositionAndPivot( box, position, pivotAnchor, size.x, size.y, size.z );
            const material:BABYLON.StandardMaterial = bz.Main.game.engine.material.createMaterial
            (
                texture,
                true,
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
            pivotAnchor     :bz.MeshPivotAnchor,
            diameter        :number,
            height          :number,
            rotation        :BABYLON.Vector3,
            texture         :bz.Texture,
            color           :BABYLON.Color3,
            scene           :BABYLON.Scene,
            physic          :bz.Physic,
            materialAlpha   :number,
            emissiveColor   :BABYLON.Color3
        )
        : BABYLON.Mesh
        {
            let faceUV:BABYLON.Vector4[] = [];

            if ( texture != null )
            {
                switch ( texture.textureUV )
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
            }

            const cylinder:BABYLON.Mesh = BABYLON.MeshBuilder.CreateCylinder
            (
                MeshFactory.createNextMeshId(),
                {
                    diameter: diameter,
                    height:   height,

                    faceUV:   faceUV,
                },
                scene
            );

            MeshFactory.setPositionAndPivot( cylinder, position, pivotAnchor, diameter, height, diameter );
            const material:BABYLON.StandardMaterial = bz.Main.game.engine.material.createMaterial
            (
                texture,
                true,
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
            pivotAnchor     :bz.MeshPivotAnchor,
            diameter        :number,
            rotation        :BABYLON.Vector3,
            texture         :bz.Texture,
            color           :BABYLON.Color3,
            scene           :BABYLON.Scene,
            physic          :bz.Physic,
            materialAlpha   :number,
            emissiveColor   :BABYLON.Color3
        )
        : BABYLON.Mesh
        {
            const sphere:BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere
            (
                MeshFactory.createNextMeshId(),
                {
                    diameter: diameter,
                },
                scene
            );

            MeshFactory.setPositionAndPivot( sphere, position, pivotAnchor, diameter, diameter, diameter );
            const material:BABYLON.StandardMaterial = bz.Main.game.engine.material.createMaterial
            (
                texture,
                false,
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
        *   Creates a plane mesh. Shouldn't be used in a free 3d space because the side orientation is explicitly
        *   required in order to calculate light effects correctly.
        *
        *   @param position        Where to place this mesh.
        *   @param pivotAnchor     The anchor point of this mesh.
        *   @param width           Width  of the plane.
        *   @param height          Height of the plane.
        *   @param rotation        The initial rotation for all axis.
        *   @param texture         The texture to apply.
        *   @param color           The solid color to apply.
        *   @param scene           The scene where this mesh will be applied.
        *   @param physic          The physical attributes to apply for this mesh.
        *   @param materialAlpha   The opacity for this mesh.
        *   @param emissiveColor   The emissive color for this material.
        *   @param sideOrientation The orientation sattribute is required for correct light effects.
        *
        *   @return The created mesh.
        *
        *   @deprecated Lights will not automatically be calculated correctly by the babylon.JS engine!
        ***************************************************************************************************************/
        public static createPlane
        (
            position        :BABYLON.Vector3,
            pivotAnchor     :bz.MeshPivotAnchor,
            width           :number,
            height          :number,
            rotation        :BABYLON.Vector3,

            texture         :bz.Texture,

            color           :BABYLON.Color3,

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
                MeshFactory.createNextMeshId(),
                {
                    width:           width,
                    height:          height,
                    sideOrientation: sideOrientation,
                },
                scene
            );

            MeshFactory.setPositionAndPivot( plane, position, pivotAnchor, width, height, 0.0 );
            const material:BABYLON.StandardMaterial = bz.Main.game.engine.material.createMaterial
            (
                texture,
                false,
                width,
                height,
                color,
                materialAlpha,
                emissiveColor
            );

            const volume:number = ( width * height * MeshFactory.FACE_DEPTH );

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
            pivotAnchor     :bz.MeshPivotAnchor,
            rotation        :BABYLON.Vector3,

            color           :BABYLON.Color4,
            scene           :BABYLON.Scene
        )
        : BABYLON.Mesh
        {
            const line:BABYLON.Mesh = BABYLON.MeshBuilder.CreateLines
            (
                MeshFactory.createNextMeshId(),
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
        *   @param points        All corner points for this polygon to create.
        *   @param pivotAnchor   The anchor point of this mesh.
        *   @param rotation      The initial rotation for all axis.
        *   @param color         The solid color to apply.
        *   @param scene         The scene where this mesh will be applied.
        *   @param physic        The physical attributes to apply for this mesh.
        *   @param emissiveColor The emissive color for this material.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createPolygon
        (
            points          :BABYLON.Vector3[],

            pivotAnchor     :bz.MeshPivotAnchor,
            rotation        :BABYLON.Vector3,

            color           :BABYLON.Color3,
            scene           :BABYLON.Scene,

            physic          :bz.Physic,
            emissiveColor   :BABYLON.Color3
        )
        : BABYLON.Mesh
        {
            const polygon:BABYLON.Mesh = BABYLON.MeshBuilder.CreatePolygon
            (
                MeshFactory.createNextMeshId(),
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
                    depth: MeshFactory.FACE_DEPTH,
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
            const material:BABYLON.StandardMaterial = bz.Main.game.engine.material.createMaterial
            (
                null,
                false,
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
        *   @param textureFileName The name of the file the contains the skybox texture.
        *   @param scene           The scene where this mesh will be applied.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createSkyBox( opacity:number, textureFileName:string, scene:BABYLON.Scene ) : BABYLON.Mesh
        {
            const skyboxMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial
            (
                bz.MaterialSystem.createNextMaterialId(),
                scene
            );

            skyboxMaterial.backFaceCulling   = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture
            (
                // bz.SettingEngine.PATH_IMAGE_SKYBOX + cubeTextureName + '/' + cubeTextureName,
                bz.SettingEngine.PATH_IMAGE_SKYBOX + textureFileName,
                scene
            );
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

            skyboxMaterial.diffuseColor  = bz.SettingGame.COLOR_BLACK;
            skyboxMaterial.specularColor = bz.SettingGame.COLOR_BLACK;
            skyboxMaterial.emissiveColor = bz.SettingGame.COLOR_BLACK;

            skyboxMaterial.alpha = opacity;
            skyboxMaterial.disableLighting = true;

            const skybox:BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox
            (
                MeshFactory.createNextMeshId(),
                { size: 1000.0 },
                scene
            );
            skybox.infiniteDistance = true;
            skybox.material         = skyboxMaterial;

            return skybox;
        }

        /** ************************************************************************************************************
        *   Returns a clone of the imported mesh with the specified filename.
        *
        *   @param fileName The filename of the imported mesh to return a clone for.
        *   @param position The position for this mesh to show up.
        *   @param scene    The scene where this imported mesh is cloned into.
        ***************************************************************************************************************/
        public static createImportedMesh
        (
            fileName :string,
            position :BABYLON.Vector3,
            scene    :BABYLON.Scene
        )
        : BABYLON.Mesh[]
        {
            const originalMeshes :BABYLON.Mesh[] = bz.Main.game.engine.meshImporter.getOriginalMesh( fileName );
            const clonedMeshes   :BABYLON.Mesh[] = [];

            for ( const originalMesh of originalMeshes )
            {
                const clonedMesh:BABYLON.Mesh = originalMesh.clone
                (
                    bz.MeshFactory.createNextMeshId()
                );

                // show this mesh
                clonedMesh.visibility = 1.0;

                // transform this mesh
                bz.MeshManipulation.translatePosition( clonedMesh, position );

                // specify physics for the cloned mesh
                const enablePhysics:boolean = false;
                if ( enablePhysics )
                {
                    clonedMesh.physicsImpostor = new BABYLON.PhysicsImpostor
                    (
                        clonedMesh,
                        BABYLON.PhysicsImpostor.BoxImpostor,
                        {
                            mass: 1.0,
                            friction: 1.0,
                            restitution: 1.0,
                        },
                        scene
                    );

                    // mesh.setPhysicsLinkWith(centerMesh,BABYLON.Vector3.Zero(),BABYLON.Vector3.Zero());
                }

                // specify debug settings for the cloned mesh
                clonedMesh.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;
                clonedMesh.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;
                clonedMesh.isPickable = true;

                // append to array of cloned meshes
                clonedMeshes.push( clonedMesh );
            }

            return clonedMeshes;
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

            physic.applyPhysicToMesh( mesh, volume, physicsImpostor, scene );

            if ( rotation != null )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ( mesh, rotation.x, rotation.y, rotation.z );
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
            pivotAnchor :bz.MeshPivotAnchor,

            width       :number,
            height      :number,
            depth       :number,
        )
        : void
        {
            switch ( pivotAnchor )
            {
                case bz.MeshPivotAnchor.LOWEST_XYZ:
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

                case bz.MeshPivotAnchor.CENTER_XYZ:
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

                case bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y:
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

                case bz.MeshPivotAnchor.NONE:
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

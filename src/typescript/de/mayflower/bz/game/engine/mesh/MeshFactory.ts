
    import * as bz      from '../../..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Constructs meshes.
    *******************************************************************************************************************/
    export class MeshFactory
    {
        /** Implicit depth for 2D faces ( e.g. planes or polygons ). */
        public              static  readonly    FACE_DEPTH              :number                     = 0.0001;

        /** Next ID to assign for mesh creation. */
        private             static              nextMeshId              :number                     = 0;

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

            bz.MeshManipulation.setPositionAndPivot( box, position, pivotAnchor, size.x, size.y, size.z );
            const material:BABYLON.StandardMaterial = bz.Main.game.engine.materialSystem.createMaterial
            (
                texture,
                true,
                size.x,
                size.z,
                color,
                materialAlpha,
                emissiveColor
            );

            const volume:number = bz.MathUtil.getCubeVolume( size.x, size.y, size.z );

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

            bz.MeshManipulation.setPositionAndPivot( cylinder, position, pivotAnchor, diameter, height, diameter );
            const material:BABYLON.StandardMaterial = bz.Main.game.engine.materialSystem.createMaterial
            (
                texture,
                true,
                diameter,
                height,
                color,
                materialAlpha,
                emissiveColor
            );

            const volume:number = bz.MathUtil.getCylinderVolume( diameter, height );

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
        *   @param position      Where to place this mesh.
        *   @param pivotAnchor   The anchor point of this mesh.
        *   @param diameter      The diameter of the sphere.
        *   @param rotation      The initial rotation for all axis.
        *   @param texture       The texture to apply.
        *   @param color         The solid color to apply.
        *   @param scene         The scene where this mesh will be applied.
        *   @param physic        The physical attributes to apply for this mesh.
        *   @param materialAlpha The opacity for this mesh.
        *   @param emissiveColor The emissive color for this material.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createSphere
        (
            position      :BABYLON.Vector3,
            pivotAnchor   :bz.MeshPivotAnchor,
            diameter      :number,
            rotation      :BABYLON.Vector3,
            texture       :bz.Texture,
            color         :BABYLON.Color3,
            scene         :BABYLON.Scene,
            physic        :bz.Physic,
            materialAlpha :number,
            emissiveColor :BABYLON.Color3
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

            bz.MeshManipulation.setPositionAndPivot( sphere, position, pivotAnchor, diameter, diameter, diameter );
            const material:BABYLON.StandardMaterial = bz.Main.game.engine.materialSystem.createMaterial
            (
                texture,
                false,
                diameter,
                diameter,
                color,
                materialAlpha,
                emissiveColor
            );

            const volume:number = bz.MathUtil.getSphereVolume( diameter );

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

            bz.MeshManipulation.setPositionAndPivot( plane, position, pivotAnchor, width, height, 0.0 );
            const material:BABYLON.StandardMaterial = bz.Main.game.engine.materialSystem.createMaterial
            (
                texture,
                false,
                width,
                height,
                color,
                materialAlpha,
                emissiveColor
            );

            const volume:number = bz.MathUtil.getCubeVolume( width, height, MeshFactory.FACE_DEPTH );

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

            bz.MeshManipulation.setPositionAndPivot( line, BABYLON.Vector3.Zero(), pivotAnchor, 0.0, 0.0, 0.0 );

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

            bz.MeshManipulation.setPositionAndPivot
            (
                polygon,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                pivotAnchor,
                0.0,
                0.0,
                0.0
            );
            const material:BABYLON.StandardMaterial = bz.Main.game.engine.materialSystem.createMaterial
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
        *   Creates a decal.
        *
        *   @param position      Where to place this mesh.
        *   @param parentMesh    The mesh to apply this decal to.
        *   @param normal        The normal of the mesh to apply the decal to.
        *   @param size          The dimensions of this mesh for all axis.
        *   @param rotation      The initial rotation for all axis.
        *   @param indexZ        The z index for this material that prevents overlapping materials.
        *   @param texture       The texture to apply.
        *   @param color         The solid color to apply.
        *   @param scene         The scene where this mesh will be applied.
        *   @param materialAlpha The opacity for this mesh.
        *   @param emissiveColor The emissive color for this material.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createDecal
        (
            position        :BABYLON.Vector3,
            parentMesh      :BABYLON.AbstractMesh,
            normal          :BABYLON.Vector3,
            size            :BABYLON.Vector3,
            rotation        :number,
            indexZ          :number,
            texture         :bz.Texture,
            color           :BABYLON.Color3,
            scene           :BABYLON.Scene,
            materialAlpha   :number,
            emissiveColor   :BABYLON.Color3
        )
        : BABYLON.Mesh
        {
            const decal:BABYLON.Mesh = BABYLON.MeshBuilder.CreateDecal
            (
                MeshFactory.createNextMeshId(),
                parentMesh,
                {
                    position: position,
                    normal:   normal,
                    size:     size,
                    angle:    rotation,
                }
            );

            const material:BABYLON.StandardMaterial = bz.Main.game.engine.materialSystem.createMaterial
            (
                texture,
                true,
                size.x,
                size.y,
                color,
                materialAlpha,
                emissiveColor
            );
            material.zOffset = ( -1 - indexZ );
/*
            // why is the 1st bullet hole always flickering?
            console.log( '>> parentMesh material z: ' + parentMesh.material.zOffset );
            console.log( '>>>>>> bullet hole z: '     + material.zOffset );
*/
            return MeshFactory.decorateMesh
            (
                decal,
                null,
                material,
                scene,
                bz.Physic.NONE,
                BABYLON.PhysicsImpostor.BoxImpostor,
                0.0
            );
        }

        /** ************************************************************************************************************
        *   Creates a skybox mesh from a cube texture ( six images ).
        *
        *   @param skyBox  The skybox to create.
        *   @param opacity The alpha value for the skybox texture.
        *   @param scene   The scene to apply this mesh to.
        *
        *   @return The created skybox mesh.
        ***************************************************************************************************************/
        public static createSkyBoxCube( skyBox:bz.SkyBox, opacity:number, scene:BABYLON.Scene ) : BABYLON.Mesh
        {
            const skyboxMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial
            (
                bz.MaterialSystem.createNextMaterialId(),
                scene
            );
            const skyBoxName:string = skyBox.toString();

            skyboxMaterial.backFaceCulling   = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture
            (
                bz.SettingEngine.PATH_IMAGE_SKYBOX + skyBoxName + '/' + skyBoxName,
                scene
            );
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

            skyboxMaterial.diffuseColor  = bz.SettingColor.COLOR_RGB_BLACK;
            skyboxMaterial.specularColor = bz.SettingColor.COLOR_RGB_BLACK;
/*
            skyboxMaterial.emissiveColor = bz.SettingGame.COLOR_BLACK;
*/
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
        *   Creates a skybox mesh from a sphere texture ( single spherical image ).
        *
        *   @param skyBox  The skybox to use.
        *   @param opacity The alpha value for the skybox texture.
        *   @param scene   The scene where this mesh will be applied.
        *
        *   @return The created mesh.
        ***************************************************************************************************************/
        public static createSkyBoxSphere( skyBox:bz.SkyBox, opacity:number, scene:BABYLON.Scene ) : BABYLON.Mesh
        {
            if ( document.getElementById( 'vertexShaderCode' ) === null )
            {
                const vertexShaderCodeScript:HTMLScriptElement = document.createElement( 'script' );
                vertexShaderCodeScript.type = 'application/vertexShader';
                vertexShaderCodeScript.id   = 'vertexShaderCode';
                vertexShaderCodeScript.innerHTML = '                                    ' +
                '   precision highp float;                                              ' +
                '   attribute vec3 position;                                            ' +
                '   uniform mat4 world;                                                 ' +
                '   uniform mat4 viewProjection;                                        ' +
                '   varying vec3 vDirectionW;                                           ' +
                '   void main(void) {                                                   ' +
                '           gl_Position =  viewProjection * world * vec4(position, 1.0);' +
                '           vDirectionW = normalize(vec3(world * vec4(position, 0.0))); ' +
                '   }';
                document.head.appendChild( vertexShaderCodeScript );
            }

            if ( document.getElementById( 'fragmentShaderCode' ) === null )
            {
                const fragmentShaderCodeScript:HTMLScriptElement = document.createElement( 'script' );
                fragmentShaderCodeScript.type = 'application/fragmentShader';
                fragmentShaderCodeScript.id   = 'fragmentShaderCode';
                fragmentShaderCodeScript.innerHTML = '                                ' +
                '    precision highp float;                                           ' +
                '    uniform sampler2D textureSampler;                                ' +
                '    varying vec3 vDirectionW;                                        ' +
                '    void main(void) {                                                ' +
                '        vec3 direction = normalize(vDirectionW);                     ' +
                '        float t = clamp(direction.y * -0.5 + 0.5, 0.0, 1.0);         ' +
                '        float s = atan(direction.z, direction.x) * 0.15915494 + 0.5; ' +
                '        vec3 vReflectionUVW = vec3(s, t, 0);                         ' +
                '        vec2 coords = vReflectionUVW.xy;                             ' +
                '        coords.x = 1.0 - coords.x;                                   ' +
                '        coords.y = 1.0 - coords.y;                                   ' +
                '        gl_FragColor = texture2D(textureSampler, coords);            ' +
                '    }';
                document.head.appendChild( fragmentShaderCodeScript );
            }

            const skyBoxName:string = skyBox.toString();

            const texture:BABYLON.Texture = new BABYLON.Texture
            (
                bz.SettingEngine.PATH_IMAGE_SKYBOX + skyBoxName + '/' + skyBoxName + '.jpg',
                scene
            );

            const skyboxMaterial:BABYLON.ShaderMaterial = new BABYLON.ShaderMaterial(
                bz.MaterialSystem.createNextMaterialId(),
                scene,
                {
                    vertexElement: 'vertexShaderCode',
                    fragmentElement: 'fragmentShaderCode'
                },
                {
                    needAlphaBlending: true,
                    attributes: ['position'],
                    uniforms:   ['world', 'viewProjection'],
                    samplers:   ['textureSampler']
                }
            );
            skyboxMaterial.setTexture( 'textureSampler', texture );
            skyboxMaterial.backFaceCulling = false;

            const skybox:BABYLON.Mesh = BABYLON.Mesh.CreateBox
            (
                MeshFactory.createNextMeshId(),
                100.0,
                scene
            );
            skybox.material         = skyboxMaterial;
            skybox.scaling          = new BABYLON.Vector3(-1, -1, -1);
            skybox.infiniteDistance = true;

            return skybox;
        }

        /** ************************************************************************************************************
        *   Returns a clone of the imported model with the specified filename.
        *
        *   @param fileName    The filename of the imported mesh to return a clone for.
        *   @param position    The position for this mesh to show up.
        *   @param pivotAnchor The pivot anchor specification for the imported model.
        *   @param scene       The scene where this imported mesh is cloned into.
        *   @param physic      Specifies the physicsl behaviour of this imported model.
        *
        *   @return A clone of the model with the specified filename.
        ***************************************************************************************************************/
        public static createImportedModel
        (
            fileName    :string,
            position    :BABYLON.Vector3,
            pivotAnchor :bz.MeshPivotAnchor,
            scene       :BABYLON.Scene,
            physic      :bz.Physic
        )
        : bz.Model
        {
            const originalModel :bz.Model = bz.Main.game.engine.modelImportSystem.getOriginalModel( fileName );
            const clonedMeshes  :BABYLON.AbstractMesh[] = originalModel.cloneMeshes();

            // clone all meshes
            for ( const clonedMesh of clonedMeshes )
            {
                clonedMesh.id = bz.MeshFactory.createNextMeshId();
/*
                // get bounding info
                const boundingInfo :BABYLON.BoundingInfo = clonedMesh.getBoundingInfo();
                const minimum      :BABYLON.Vector3      = boundingInfo.minimum;
                const maximum      :BABYLON.Vector3      = boundingInfo.maximum;
*/
                // show this mesh
                clonedMesh.visibility = 1.0;

                // transform this mesh
                bz.MeshManipulation.translatePosition( clonedMesh, position );

                // specify physics for the cloned mesh
                physic.applyPhysicToMesh
                (
                    clonedMesh,
                    1.0,
                    BABYLON.PhysicsImpostor.BoxImpostor,
                    scene
                );

                // mesh.setPhysicsLinkWith(centerMesh,BABYLON.Vector3.Zero(),BABYLON.Vector3.Zero());

                // specify debug settings for the cloned mesh
                clonedMesh.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;
                clonedMesh.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;
                clonedMesh.isPickable = true;
            }

            return new bz.Model( clonedMeshes );
        }

        /** ************************************************************************************************************
        *   Adds general mesh properties.
        *
        *   @param mesh                The mesh to decorate.
        *   @param rotation            The initial rotation for all axis.
        *   @param material            The material to apply on this mesh.
        *   @param scene               The scene where this mesh will be applied.
        *   @param physic              The physical attributes to apply for this mesh.
        *   @param physicsImpostorType The kind of physic impostor to apply to this mesh.
        *   @param volume              The calculated volume of the mesh.
        ***************************************************************************************************************/
        private static decorateMesh
        (
            mesh                :BABYLON.Mesh,
            rotation            :BABYLON.Vector3,
            material            :BABYLON.StandardMaterial,
            scene               :BABYLON.Scene,
            physic              :bz.Physic,
            physicsImpostorType :number,
            volume              :number
        )
        : BABYLON.Mesh
        {
            mesh.material       = material;
            mesh.receiveShadows = bz.SettingEngine.ENABLE_SHADOWS;

            physic.applyPhysicToMesh
            (
                mesh,
                volume,
                physicsImpostorType,
                scene
            );

            if ( rotation != null )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ( mesh, rotation.x, rotation.y, rotation.z );
            }

            return mesh;
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new mesh to create.
        *
        *   @return The next free unique id for a new mesh to create.
        ***************************************************************************************************************/
        private static createNextMeshId() : string
        {
            return 'mesh' + MeshFactory.nextMeshId++;
        }
    }

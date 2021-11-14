import * as bz from '../../..';

/** ********************************************************************************************************************
*   Constructs meshes.
***********************************************************************************************************************/
export class MeshFactory
{
    /** Next ID to assign for mesh creation. */
    private static          nextMeshId      :number                     = 0;
    /** The scene where this mesh will be applied. */
    private        readonly scene           :bz.Scene                   = null;
    /** The emissive color to set for all created meshes. */
    private        readonly emissiveColor   :BABYLON.Color3             = null;

    /** ****************************************************************************************************************
    *   Creates a mesh factory.
    *
    *   @param scene         The scene where this mesh will be applied.
    *   @param emissiveColor The emissive color to set for all created meshes.
    *******************************************************************************************************************/
    public constructor( scene:bz.Scene, emissiveColor:BABYLON.Color3 )
    {
        this.scene         = scene;
        this.emissiveColor = emissiveColor;
    }

    /** ****************************************************************************************************************
    *   Creates a box mesh.
    *
    *   @param position      Where to place this mesh.
    *   @param anchor        The anchor point of this mesh.
    *   @param size          The dimensions of this mesh for all axis.
    *   @param rotation      The initial rotation for all axis.
    *   @param texture       The texture to apply.
    *   @param color         The solid color to apply.
    *   @param physic        The physical attributes to apply for this mesh.
    *   @param materialAlpha The opacity for this mesh.
    *
    *   @return The created mesh.
    *******************************************************************************************************************/
    public createBox
    (
        position      :BABYLON.Vector3,
        texture       :bz.Texture,
        size          :BABYLON.Vector3,
        physic        :bz.PhysicSet       = bz.PhysicSet.NONE,
        materialAlpha :number             = 1.0,
        anchor        :bz.MeshAnchor      = bz.MeshAnchor.CENTER_XYZ,
        rotation      :BABYLON.Vector3    = new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
        color         :BABYLON.Color3     = null
    )
    : BABYLON.Mesh
    {
        let faceUV:BABYLON.Vector4[] = [];

        if ( texture !== null )
        {
            switch ( texture.getStrategyUV() )
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
                        new BABYLON.Vector4(
                            0.0,
                            0.0,
                            -size.x * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV,
                            -size.y * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV ),
                        new BABYLON.Vector4(
                            0.0,
                            0.0,
                            size.x  * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV,
                            size.y * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV ),

                        new BABYLON.Vector4(
                            0.0,
                            0.0,
                            -size.y * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV,
                            -size.z * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV
                        ),
                        new BABYLON.Vector4(
                            0.0,
                            0.0,
                            size.y  * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV,
                            size.z * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV
                        ),
                        new BABYLON.Vector4(
                            0.0,
                            0.0,
                            -size.z * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV,
                            -size.x * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV
                        ),
                        new BABYLON.Vector4(
                            0.0,
                            0.0,
                            size.z  * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV,
                            size.x * bz.SettingEngine.TEXTURE_DEFAULT_MAPPING_UV
                        ),
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
            this.scene.getNativeScene()
        );

        bz.MeshManipulation.setPositionByAnchor
        (
            box,
            position,
            anchor,
            size.x,
            size.y,
            size.z
        );

        const material:BABYLON.StandardMaterial = this.scene.getMaterialSystem().createMaterial
        (
            this.scene.getNativeScene(),
            texture,
            true,
            size.x,
            size.z,
            color,
            materialAlpha,
            this.emissiveColor
        );

        return this.decorateMesh
        (
            box,
            rotation,
            material,
            physic,
            BABYLON.PhysicsImpostor.BoxImpostor
        );
    }

    /** ****************************************************************************************************************
    *   Creates a heightmap mesh.
    *
    *   @param position      Where to place this mesh.
    *   @param anchor        The anchor point of this mesh.
    *   @param sideSize      The dimension of one side (XZ) of the heightmap.
    *   @param height        The ground height for the heightmap.
    *   @param textureFile   The texture file to use for this heightmap.
    *   @param rotation      The initial rotation for all axis.
    *   @param physic        The physical attributes to apply for this mesh.
    *
    *   @return The created mesh.
    *******************************************************************************************************************/
    public createHeightMapGround
    (
        position      :BABYLON.Vector3,
        anchor        :bz.MeshAnchor,
        sideSize      :number,
        height        :number,
        textureFile   :bz.TextureFile,
        rotation      :BABYLON.Vector3,
        physic        :bz.PhysicSet
    )
    : BABYLON.Mesh
    {
        const options :any = {
            width: sideSize,
            height: sideSize,
            depth: height,
            subdivisions: sideSize,
            minHeight: 0.0,
            maxHeight: height,
            onReady: () :void => {

                const material:BABYLON.StandardMaterial = this.scene.getMaterialSystem().createMaterial
                (
                    this.scene.getNativeScene(),
                    bz.Texture.WALL_GRASS,
                    false,
                    sideSize,
                    sideSize,
                    null,
                    1.0,
                    this.emissiveColor
                );
                ground = this.decorateMesh
                (
                    ground,
                    rotation,
                    material,
                    physic,
                    BABYLON.PhysicsImpostor.HeightmapImpostor
                );

                // set position after applying physics in order to prevent startup dodges etc.
                bz.MeshManipulation.setPositionByAnchor
                (
                    ground,
                    position,
                    anchor,
                    sideSize,
                    height,
                    sideSize
                );
            },
        };
        let ground :BABYLON.Mesh = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
            MeshFactory.createNextMeshId(),
            textureFile.fileName,
            options,
            this.scene.getNativeScene()
        );

        return ground;
    }

    /** ****************************************************************************************************************
    *   Creates a cylinder mesh.
    *
    *   @param position        Where to place this mesh.
    *   @param anchor     The anchor point of this mesh.
    *   @param diameter        The diameter of the cylinder.
    *   @param height          The height of the cylinder.
    *   @param rotation        The initial rotation for all axis.
    *   @param texture         The texture to apply.
    *   @param color           The solid color to apply.
    *   @param physic          The physical attributes to apply for this mesh.
    *   @param materialAlpha   The opacity for this mesh.
    *
    *   @return The created mesh.
    *******************************************************************************************************************/
    public createCylinder
    (
        position      :BABYLON.Vector3,
        anchor        :bz.MeshAnchor,
        diameter      :number,
        height        :number,
        rotation      :BABYLON.Vector3,
        texture       :bz.Texture,
        color         :BABYLON.Color3,
        physic        :bz.PhysicSet,
        materialAlpha :number
    )
    : BABYLON.Mesh
    {
        let faceUV:BABYLON.Vector4[] = [];

        if ( texture !== null )
        {
            switch ( texture.getStrategyUV() )
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
            this.scene.getNativeScene()
        );

        bz.MeshManipulation.setPositionByAnchor
        (
            cylinder,
            position,
            anchor,
            diameter,
            height,
            diameter
        );

        const material:BABYLON.StandardMaterial = this.scene.getMaterialSystem().createMaterial
        (
            this.scene.getNativeScene(),
            texture,
            true,
            diameter,
            height,
            color,
            materialAlpha,
            this.emissiveColor
        );

        return this.decorateMesh
        (
            cylinder,
            rotation,
            material,
            physic,
            BABYLON.PhysicsImpostor.CylinderImpostor
        );
    }

    /** ****************************************************************************************************************
    *   Creates a sphere.
    *
    *   @param position      Where to place this mesh.
    *   @param anchor   The anchor point of this mesh.
    *   @param diameter      The diameter of the sphere.
    *   @param rotation      The initial rotation for all axis.
    *   @param texture       The texture to apply.
    *   @param color         The solid color to apply.
    *   @param physic        The physical attributes to apply for this mesh.
    *   @param materialAlpha The opacity for this mesh.
    *
    *   @return The created mesh.
    *******************************************************************************************************************/
    public createSphere
    (
        position      :BABYLON.Vector3,
        anchor   :bz.MeshAnchor,
        diameter      :number,
        rotation      :BABYLON.Vector3,
        texture       :bz.Texture,
        color         :BABYLON.Color3,
        physic        :bz.PhysicSet,
        materialAlpha :number          = 1.0
    )
    : BABYLON.Mesh
    {
        const sphere:BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere
        (
            MeshFactory.createNextMeshId(),
            {
                diameter: diameter,
            },
            this.scene.getNativeScene()
        );

        bz.MeshManipulation.setPositionByAnchor
        (
            sphere,
            position,
            anchor,
            diameter,
            diameter,
            diameter
        );

        const material:BABYLON.StandardMaterial = this.scene.getMaterialSystem().createMaterial
        (
            this.scene.getNativeScene(),
            texture,
            false,
            diameter,
            diameter,
            color,
            materialAlpha,
            this.emissiveColor
        );

        return this.decorateMesh
        (
            sphere,
            rotation,
            material,
            physic,
            BABYLON.PhysicsImpostor.SphereImpostor
        );
    }

    /** ****************************************************************************************************************
    *   Creates a plane mesh. Shouldn't be used in a free 3d space because the side orientation is explicitly
    *   required in order to calculate light effects correctly.
    *
    *   @param position        Where to place this mesh.
    *   @param anchor          The anchor point of this mesh.
    *   @param width           Width  of the plane.
    *   @param height          Height of the plane.
    *   @param rotation        The initial rotation for all axis.
    *   @param texture         The texture to apply.
    *   @param color           The solid color to apply.
    *   @param physic          The physical attributes to apply for this mesh.
    *   @param materialAlpha   The opacity for this mesh.
    *   @param sideOrientation The orientation sattribute is required for correct light effects.
    *
    *   @return The created mesh.
    *******************************************************************************************************************/
    public createPlane
    (
        position        :BABYLON.Vector3,
        anchor          :bz.MeshAnchor,
        width           :number,
        height          :number,
        rotation        :BABYLON.Vector3,

        texture         :bz.Texture,

        color           :BABYLON.Color3,

        physic          :bz.PhysicSet,
        materialAlpha   :number,
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
            this.scene.getNativeScene()
        );

        bz.MeshManipulation.setPositionByAnchor
        (
            plane,
            position,
            anchor,
            width,
            height,
            0.0
        );

        const material:BABYLON.StandardMaterial = this.scene.getMaterialSystem().createMaterial
        (
            this.scene.getNativeScene(),
            texture,
            false,
            width,
            height,
            color,
            materialAlpha,
            this.emissiveColor
        );

        return this.decorateMesh
        (
            plane,
            rotation,
            material,
            physic,
            BABYLON.PhysicsImpostor.BoxImpostor
        );
    }

    /** ****************************************************************************************************************
    *   Creates a line mesh.
    *
    *   @param start       Start point of the line mesh.
    *   @param end         End point of the line mesh.
    *   @param anchor The anchor point of this mesh.
    *   @param rotation    The initial rotation for all axis.
    *   @param color       The solid color to apply.
    *
    *   @return The created mesh.
    *******************************************************************************************************************/
    public createLine
    (
        start       :BABYLON.Vector3,
        end         :BABYLON.Vector3,
        color       :BABYLON.Color4,

        anchor      :bz.MeshAnchor = bz.MeshAnchor.CENTER_XYZ,
        rotation    :BABYLON.Vector3       = new BABYLON.Vector3( 0.0, 0.0, 0.0 )
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
                useVertexAlpha: true,
            },
            this.scene.getNativeScene()
        );

        bz.MeshManipulation.setPositionByAnchor
        (
            line,
            BABYLON.Vector3.Zero(),
            anchor,
            0.0,
            0.0,
            0.0
        );

        return this.decorateMesh
        (
            line,
            rotation,
            null,
            bz.PhysicSet.NONE,
            BABYLON.PhysicsImpostor.BoxImpostor
        );
    }

    /** ****************************************************************************************************************
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
    *   @param materialAlpha The opacity for this mesh.
    *
    *   @return The created mesh.
    *******************************************************************************************************************/
    public createDecal
    (
        position      :BABYLON.Vector3,
        parentMesh    :BABYLON.AbstractMesh,
        normal        :BABYLON.Vector3,
        size          :BABYLON.Vector3,
        rotation      :number,
        indexZ        :number,
        texture       :bz.Texture,
        color         :BABYLON.Color3,
        materialAlpha :number
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

        const material:BABYLON.StandardMaterial = this.scene.getMaterialSystem().createMaterial
        (
            this.scene.getNativeScene(),
            texture,
            true,
            size.x,
            size.y,
            color,
            materialAlpha,
            this.emissiveColor
        );
        material.zOffset = ( -1 - indexZ );
/*
        // why is the 1st bullet hole always flickering?
        console.log( '>> parentMesh material z: ' + parentMesh.material.zOffset );
        console.log( '>>>>>> bullet hole z: '     + material.zOffset );
*/
        return this.decorateMesh
        (
            decal,
            null,
            material,
            bz.PhysicSet.NONE,
            BABYLON.PhysicsImpostor.BoxImpostor
        );
    }

    /** ****************************************************************************************************************
    *   Creates a skybox mesh from a cube texture ( six images ).
    *
    *   @param skyBox  The skybox to create.
    *   @param opacity The alpha value for the skybox texture.
    *
    *   @return The created skybox mesh.
    *******************************************************************************************************************/
    public createSkyBoxCube( skyBox:bz.SkyBoxFile, opacity:number = 1.0 ) : BABYLON.Mesh
    {
        const skyboxMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial
        (
            bz.MaterialSystem.createNextMaterialId(),
            this.scene.getNativeScene()
        );
        const skyBoxName:string = skyBox.toString();

        skyboxMaterial.backFaceCulling   = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture
        (
            bz.SettingResource.PATH_IMAGE_SKYBOX + skyBoxName + '/' + skyBoxName,
            this.scene.getNativeScene()
        );
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

        skyboxMaterial.diffuseColor  = bz.SettingColor.COLOR_RGB_BLACK;
        skyboxMaterial.specularColor = bz.SettingColor.COLOR_RGB_BLACK;

        // skyboxMaterial.emissiveColor = bz.SettingGame.COLOR_BLACK;

        skyboxMaterial.alpha = opacity;
        skyboxMaterial.disableLighting = true;

        const skybox:BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox
        (
            MeshFactory.createNextMeshId(),
            { size: 1000.0 },
            this.scene.getNativeScene()
        );
        skybox.infiniteDistance = true;
        skybox.material         = skyboxMaterial;

        return skybox;
    }

    /** ****************************************************************************************************************
    *   Returns a clone of the imported model with the specified filename.
    *
    *   @param fileName     The filename of the imported mesh to return a clone for.
    *   @param position     The position for this mesh to show up.
    *   @param physic       Specifies the physicsl behaviour of this imported model.
    *                       <code>null</code> to use the native physical attributes from the imported model.
    *   @param compoundType Specifies the mesh compound type for this imported model.
    *
    *   @return A clone of the model with the specified filename.
    *******************************************************************************************************************/
    public createImportedModel
    (
        fileName     :string,
        position     :BABYLON.Vector3,
        physic       :bz.PhysicSet,
        compoundType :bz.ModelCompoundType,
        rotY         :number = 0.0
    )
    : bz.Model
    {
        const originalModel :bz.Model = this.scene.getModelSystem().getOriginalModel( fileName );
        const clonedModel   :bz.Model = originalModel.clone();

        // translate cloned model by position
        clonedModel.translatePosition( position );

        // extract or create physics impostors and assign them to the cloned model
        let impostors :bz.PhysicImpostorParams[] = [];
        if ( physic === null )
        {
            impostors = originalModel.getImpostors()
        }
        else
        {
            const physicBody :bz.PhysicBody = new bz.PhysicBody( physic );

            for ( let i:number = 0; i < originalModel.getMeshCount(); ++i )
            {
                impostors.push( physicBody.createPhysicImpostorBoxParams() );
            }
        }
        clonedModel.assignImpostors( this.scene.getNativeScene(), impostors );

        // create compound parent if requested
        switch ( compoundType )
        {
            case bz.ModelCompoundType.NONE:
            {
                break;
            }

            case bz.ModelCompoundType.COMPOUND:
            {
                clonedModel.addCompoundMesh( this.scene, position, false );
                break;
            }

            case bz.ModelCompoundType.COMPOUND_SHOT_OFF_ENABLED:
            {
                clonedModel.addCompoundMesh( this.scene, position, true );
                break;
            }
        }

        // scale cloned model
        // clonedModel.scaleSize( new BABYLON.Vector3( 1.0, 1.0, 1.0 ) );

        // reset stored quaternion rotation from 3dsmax file
        clonedModel.setAbsoluteRotationXYZ( 0.0, 0.0, 0.0 );

        // initially rotate around axis Y (convert from right handed to left handed coordinate system)
        clonedModel.rotateAroundAxisY( 0, 0, rotY )

        return clonedModel;
    }

    /** ****************************************************************************************************************
    *   Adds general mesh properties.
    *
    *   @param mesh                The mesh to decorate.
    *   @param rotation            The initial rotation for all axis.
    *   @param material            The material to apply on this mesh.
    *   @param physic              The physical attributes to apply for this mesh.
    *   @param physicsImpostorType The kind of physic impostor to apply to this mesh.
    *******************************************************************************************************************/
    private decorateMesh
    (
        mesh                :BABYLON.Mesh,
        rotation            :BABYLON.Vector3,
        material            :BABYLON.StandardMaterial,
        physic              :bz.PhysicSet,
        physicsImpostorType :number
    )
    : BABYLON.Mesh
    {
        mesh.material       = material;
        mesh.receiveShadows = bz.SettingEngine.ENABLE_SHADOWS;

        if ( rotation !== null )
        {
            bz.MeshManipulation.setAbsoluteRotationXYZ( mesh, rotation.x, rotation.y, rotation.z );
        }

        // buggy physics for primitives since babylon.JS 4.0.
        new bz.PhysicBody( physic ).applyPhysicToMesh
        (
            this.scene.getNativeScene(),
            mesh,
            physicsImpostorType
        );

        return mesh;
    }

    /** ****************************************************************************************************************
    *   Returns the next id for a new mesh to create.
    *
    *   @return The next free unique id for a new mesh to create.
    *******************************************************************************************************************/
    public static createNextMeshId() : string
    {
        return 'mesh' + String( MeshFactory.nextMeshId++ );
    }
}

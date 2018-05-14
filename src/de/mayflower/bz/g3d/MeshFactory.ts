
    import * as BABYLON from 'babylonjs';
    import * as bz from "..";

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
            isStatic        :bz.Physics,
            physicals       :BABYLON.PhysicsImpostorParameters,
            materialAlpha   :number
        )
        : BABYLON.Mesh
        {
            let box:BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox
            (
                id,
                {
                    width:  size.x,
                    height: size.y,
                    depth:  size.z,

                    // faceUVs, backUVs .. ?
                },
                scene
            );

            MeshFactory.setPositionAndPivot( box, position, pivotAnchor, size.x, size.y, size.z );
            let material:BABYLON.StandardMaterial = bz.MaterialSystem.createMaterial( texture, textureHasAlpha, textureUV, size.x, size.z, color, materialAlpha );

            return MeshFactory.decorateMesh
            (
                box,
                rotation,
                material,
                scene,
                isStatic,
                physicals,
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
            isStatic        :bz.Physics,
            physicals       :BABYLON.PhysicsImpostorParameters,
            materialAlpha   :number
        )
        : BABYLON.Mesh
        {
            let cylinder:BABYLON.Mesh = BABYLON.MeshBuilder.CreateCylinder
            (
                id,
                {
                    diameter: diameter,
                    height:   height,

                    // faceUVs, backUVs .. ?
                },
                scene
            );

            MeshFactory.setPositionAndPivot( cylinder, position, pivotAnchor, diameter, height, diameter );
            let material:BABYLON.StandardMaterial = bz.MaterialSystem.createMaterial( texture, textureHasAlpha, textureUV, diameter, height, color, materialAlpha );

            return MeshFactory.decorateMesh
            (
                cylinder,
                rotation,
                material,
                scene,
                isStatic,
                physicals,
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
            isStatic        :bz.Physics,
            physicals       :BABYLON.PhysicsImpostorParameters,
            materialAlpha   :number
        )
        : BABYLON.Mesh
        {
            let sphere:BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere
            (
                id,
                {
                    diameter: diameter,
                },
                scene
            );

            MeshFactory.setPositionAndPivot( sphere, position, pivotAnchor, diameter, diameter, diameter );
            let material:BABYLON.StandardMaterial = bz.MaterialSystem.createMaterial( texture, textureHasAlpha, textureUV, diameter, diameter, color, materialAlpha );

            return MeshFactory.decorateMesh
            (
                sphere,
                rotation,
                material,
                scene,
                isStatic,
                physicals,
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
            isStatic        :bz.Physics,
            physicals       :BABYLON.PhysicsImpostorParameters,
            materialAlpha   :number
        )
        : BABYLON.Mesh
        {
            let plane:BABYLON.Mesh = BABYLON.MeshBuilder.CreatePlane
            (
                id,
                {
                    width:  width,
                    height: height,
                },
                scene
            );

            MeshFactory.setPositionAndPivot( plane, position, pivotAnchor, width, height, 0.0 );
            let material:BABYLON.StandardMaterial = bz.MaterialSystem.createMaterial( texture, textureHasAlpha, textureUV, width, height, color, materialAlpha );

            return MeshFactory.decorateMesh
            (
                plane,
                rotation,
                material,
                scene,
                isStatic,
                physicals,
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

            // TODO bundle?
            isStatic        :bz.Physics,
            physicals       :BABYLON.PhysicsImpostorParameters
        )
        : BABYLON.Mesh
        {
            let line:BABYLON.Mesh = BABYLON.MeshBuilder.CreateLines
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
                isStatic,
                physicals,
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

            // TODO bundle?
            isStatic        :bz.Physics,
            physicals       :BABYLON.PhysicsImpostorParameters
        )
        : BABYLON.Mesh
        {
            let triangle:BABYLON.Mesh = BABYLON.MeshBuilder.CreatePolygon
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

            MeshFactory.setPositionAndPivot( triangle, new BABYLON.Vector3( 0.0, 0.0, 0.0 ), pivotAnchor, 0.0, 0.0, 0.0 );
            let material:BABYLON.StandardMaterial = bz.MaterialSystem.createMaterial( null, null, null, 0.0, 0.0, color, 1.0 );

            return MeshFactory.decorateMesh
            (
                triangle,
                rotation,
                material,
                scene,
                isStatic,
                physicals,
                BABYLON.PhysicsImpostor.BoxImpostor
            );
        }

        /***************************************************************************************************************
        *   Adds general mesh properties.
        *
        *   TODO To decorator class Mesh!
        ***************************************************************************************************************/
        private static decorateMesh
        (
            mesh            :BABYLON.Mesh,
            rotation        :BABYLON.Vector3,
            material        :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,
            isStatic        :bz.Physics,
            physicals       :BABYLON.PhysicsImpostorParameters,
            physicsImpostor :number
        )
        {
            mesh.material       = material;
            mesh.receiveShadows = false;

            switch ( isStatic )
            {
                case bz.Physics.STATIC:
                {
                    mesh.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;

                    mesh.physicsImpostor = new BABYLON.PhysicsImpostor
                    (
                        mesh,
                        physicsImpostor,
                        bz.PhysicProps.STATIC,
                        scene
                    );

                    mesh.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;

                    break;
                }

                case bz.Physics.MOVABLE:
                {
                    mesh.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;

                    mesh.physicsImpostor = new BABYLON.PhysicsImpostor
                    (
                        mesh,
                        physicsImpostor,
                        physicals,
                        scene
                    );

                    mesh.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;

                    break;
                }

                case bz.Physics.NONE:
                {
                    // do not set a physics impostor
                    break;
                }
            }

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

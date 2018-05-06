
    import * as BABYLON from 'babylonjs';
    import * as bz from "..";

    /*******************************************************************************************************************
    *   Specifies if a mesh is static so it will never move.
    *******************************************************************************************************************/
    export enum Physics
    {
        STATIC,
        MOVABLE,
        SENSOR,
    }

    /*******************************************************************************************************************
    *   Specifies if a texture has an alpha value.
    *******************************************************************************************************************/
    export enum TextureHasAlpha
    {
        YES,
        NO,
    }

    /*******************************************************************************************************************
    *   Specifies the UV handling of the applied texture.
    *******************************************************************************************************************/
    export enum TextureUV
    {
        ACCORDING_TO_SIZE,
        ALL_TO_ONE,
    }

    /*******************************************************************************************************************
    *   Specifies all valid anchors for a mesh.
    *******************************************************************************************************************/
    export enum PivotAnchor
    {
        LOWEST_XYZ,
        CENTER_XYZ,
        CENTER_XZ_LOWEST_Y,
    }

    /*******************************************************************************************************************
    *   Specifies possible physical attributes for meshes.
    *******************************************************************************************************************/
    export class Physicals
    {
        public      static  readonly        PLAYER                  :BABYLON.PhysicsImpostorParameters  =
        {
            mass:        2.0,
            friction:    5.0,
            restitution: 5.0
        };

        public      static  readonly        MOVABLE                 :BABYLON.PhysicsImpostorParameters  =
        {
            mass:        1.0,
            friction:    0.75,
            restitution: 0.0
        };

        public      static  readonly        STATIC                  :BABYLON.PhysicsImpostorParameters  =
        {
            mass:        0.0,
            friction:    0.75,          // 0.0 = ice, 1.0 = concrete
            restitution: 0.0
        };
    }

    /*******************************************************************************************************************
    *   Constructs 3D meshes.
    *******************************************************************************************************************/
    export class MeshFactory
    {
        public      static  readonly    ROTATION_AXIS_X                 :BABYLON.Vector3        = new BABYLON.Vector3( 1.0, 0.0, 0.0 );
        public      static  readonly    ROTATION_AXIS_Y                 :BABYLON.Vector3        = new BABYLON.Vector3( 0.0, 1.0, 0.0 );
        public      static  readonly    ROTATION_AXIS_Z                 :BABYLON.Vector3        = new BABYLON.Vector3( 0.0, 0.0, 1.0 );

        /***************************************************************************************************************
        *   Creates a box.
        ***************************************************************************************************************/
        public static createBox
        (
            id              :string,
            position        :BABYLON.Vector3,
            pivotAnchor     :bz.PivotAnchor,
            size            :BABYLON.Vector3,
            rotationAxis    :BABYLON.Vector3,
            rotationDegrees :number,
            texture         :bz.Texture,
            textureHasAlpha :bz.TextureHasAlpha,
            textureUV       :bz.TextureUV,
            color           :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,
            isStatic        :Physics,
            physicals       :BABYLON.PhysicsImpostorParameters
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

            MeshFactory.setPositionAndPivot( box, position, pivotAnchor, rotationDegrees, size.x, size.y, size.z );
            let material:BABYLON.StandardMaterial = bz.MaterialSystem.createMaterial( texture, textureHasAlpha, textureUV, size.x, size.z, color );

            return MeshFactory.decorateMesh
            (
                box,
                rotationDegrees,
                rotationAxis,
                material,
                scene,
                isStatic,
                physicals
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
            rotationAxis    :BABYLON.Vector3,
            rotationDegrees :number,
            texture         :bz.Texture,
            textureHasAlpha :bz.TextureHasAlpha,
            textureUV       :bz.TextureUV,
            color           :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,
            isStatic        :Physics,
            physicals       :BABYLON.PhysicsImpostorParameters
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

            MeshFactory.setPositionAndPivot( plane, position, pivotAnchor, rotationDegrees, width, height, 0.0 );
            let material:BABYLON.StandardMaterial = bz.MaterialSystem.createMaterial( texture, textureHasAlpha, textureUV, width, height, color );

            return MeshFactory.decorateMesh
            (
                plane,
                rotationDegrees,
                rotationAxis,
                material,
                scene,
                isStatic,
                physicals
            );
        }

        /***************************************************************************************************************
        *   Adds general mesh properties.
        ***************************************************************************************************************/
        private static decorateMesh
        (
            mesh            :BABYLON.Mesh,
            rotationDegrees :number,
            rotationAxis    :BABYLON.Vector3,
            material        :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,
            isStatic        :Physics,
            physicals       :BABYLON.PhysicsImpostorParameters
        )
        {
            mesh.material       = material;
            mesh.receiveShadows = false;

            switch ( isStatic )
            {
                case Physics.STATIC:
                {
                    mesh.checkCollisions = true;

                    mesh.physicsImpostor = new BABYLON.PhysicsImpostor
                    (
                        mesh,
                        BABYLON.PhysicsImpostor.BoxImpostor,
                        Physicals.STATIC,
                        scene
                    );
                    break;
                }

                case Physics.MOVABLE:
                {
                    mesh.checkCollisions = true;

                    mesh.physicsImpostor = new BABYLON.PhysicsImpostor
                    (
                        mesh,
                        BABYLON.PhysicsImpostor.BoxImpostor,
                        physicals,
                        scene
                    );
                    break;
                }

                case Physics.SENSOR:
                {
                    mesh.checkCollisions = false;

                    break;
                }
            }

            MeshFactory.rotateMesh( mesh, rotationAxis, rotationDegrees );

            return mesh;
        }

        public static rotateMesh( mesh:BABYLON.Mesh, rotationAxis:BABYLON.Vector3, rotationDegrees:number )
        {
            let rotationRadians:number = bz.MathUtil.degreesToRad( rotationDegrees );
            mesh.rotate( rotationAxis, rotationRadians, BABYLON.Space.LOCAL );
        }

        public static setAbsoluteRotation( mesh:BABYLON.Mesh, rotationAxis:BABYLON.Vector3, rotationDegrees:number )
        {
            mesh.rotationQuaternion = BABYLON.Quaternion.RotationAxis
            (
                rotationAxis,
                bz.MathUtil.degreesToRad( rotationDegrees )
            );
        }

        public static setAbsoluteRotationXYZ( mesh:BABYLON.Mesh, rotX:number, rotY:number, rotZ:number )
        {
            mesh.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll
            (
                bz.MathUtil.degreesToRad( rotY ),
                bz.MathUtil.degreesToRad( rotX ),
                bz.MathUtil.degreesToRad( rotZ )
            );
        }

        public static setPositionAndPivot
        (
            mesh            :BABYLON.Mesh,
            position        :BABYLON.Vector3,
            pivotAnchor     :bz.PivotAnchor,
            rotationDegrees :number,
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
 /*
                    // equals
                    mesh.position = new BABYLON.Vector3(
                        position.x + ( width  / 2 ),
                        position.y + ( height / 2 ),
                        position.z + ( depth  / 2 )
                    );
*/
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
            }
        }
    }

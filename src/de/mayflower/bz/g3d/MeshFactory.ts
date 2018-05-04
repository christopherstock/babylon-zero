
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
        private     static  readonly    USE_ROTATION_PIVOT_MATRIX_BOX   :boolean                = true;
        private     static  readonly    USE_ROTATION_PIVOT_MATRIX_PLANE :boolean                = true;

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

            if ( MeshFactory.USE_ROTATION_PIVOT_MATRIX_BOX && rotationDegrees != 0.0 )
            {
                box.position = position;
                box.setPivotMatrix( BABYLON.Matrix.Translation( ( size.x / 2 ), ( size.y / 2 ), ( size.z / 2 ) ), false );
            }
            else
            {
                box.position = new BABYLON.Vector3(
                    position.x + ( size.x / 2 ),
                    position.y + ( size.y / 2 ),
                    position.z + ( size.z / 2 ),
                );
            }

            let material:BABYLON.StandardMaterial = null;

            if ( texture != null )
            {
                let textureU:number = ( textureUV == bz.TextureUV.ACCORDING_TO_SIZE ? size.x : 1.0 );
                let textureV:number = ( textureUV == bz.TextureUV.ACCORDING_TO_SIZE ? size.z : 1.0 );

                let backfaceCulling:boolean = ( textureHasAlpha == bz.TextureHasAlpha.YES );

                material = bz.MaterialSystem.createTexture
                (
                    texture.toString(),
                    textureU,
                    textureV,
                    1.0,
                    backfaceCulling,
                    bz.SettingGame.COLOR_WHITE,
                    textureHasAlpha
                );
            }
            else if ( color != null )
            {
                material = color;
            }

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

            if ( MeshFactory.USE_ROTATION_PIVOT_MATRIX_PLANE && rotationDegrees != 0.0 )
            {
                plane.position = position;
                plane.setPivotMatrix( BABYLON.Matrix.Translation( ( width / 2 ), ( height / 2 ), 0.0 ), false );
            }
            else
            {
                plane.position = new BABYLON.Vector3(
                    position.x + ( width  / 2 ),
                    position.y + ( height / 2 ),
                    position.z
                );
            }

            let material:BABYLON.StandardMaterial = null;

            if ( texture != null )
            {
                let textureU:number = ( textureUV == bz.TextureUV.ACCORDING_TO_SIZE ? width  : 1.0 );
                let textureV:number = ( textureUV == bz.TextureUV.ACCORDING_TO_SIZE ? height : 1.0 );

                // let backfaceCulling:boolean = ( textureHasAlpha == bz.TextureHasAlpha.YES );
                let backfaceCulling:boolean = false;

                material = bz.MaterialSystem.createTexture
                (
                    texture.toString(),
                    textureU,
                    textureV,
                    1.0,
                    backfaceCulling,
                    bz.SettingGame.COLOR_WHITE,
                    textureHasAlpha
                );
/*
                this.textureTest   = MaterialSystem.createTexture( "test.jpg",   1.0, 1.0, 1.0, false, bz.SettingGame.COLOR_WHITE );
                this.textureGlass  = MaterialSystem.createTexture( "glass.jpg",  1.0, 1.0, 0.5, true,  null                       );
*/
            }
            else if ( color != null )
            {
                material = color;
            }

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

        public static setRotation( mesh:BABYLON.Mesh, rotationAxis:BABYLON.Vector3, rotationDegrees:number )
        {
            mesh.rotationQuaternion = BABYLON.Quaternion.RotationAxis
            (
                rotationAxis,
                bz.MathUtil.degreesToRad( rotationDegrees )
            );
        }
    }

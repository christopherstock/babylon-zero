
    import * as BABYLON from 'babylonjs';
    import * as bz from "..";

    /*******************************************************************************************************************
    *   Specifies if a mesh is static so it will never move.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export enum Physics
    {
        STATIC,
        MOVABLE,
        SENSOR,
    }

    /*******************************************************************************************************************
    *   Specifies if a texture has an alpha value.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export enum TextureHasAlpha
    {
        YES,
        NO,
    }

    /*******************************************************************************************************************
    *   Specifies the UV handling of the applied texture.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export enum TextureUV
    {
        ACCORDING_TO_SIZE,
        ALL_TO_ONE,
    }

    /*******************************************************************************************************************
    *   Constructs 3D meshes.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class MeshFactory
    {
        public      static  readonly    ROTATION_AXIS_X         :BABYLON.Vector3        = new BABYLON.Vector3( 1.0, 0.0, 0.0 );
        public      static  readonly    ROTATION_AXIS_Y         :BABYLON.Vector3        = new BABYLON.Vector3( 0.0, 1.0, 0.0 );
        public      static  readonly    ROTATION_AXIS_Z         :BABYLON.Vector3        = new BABYLON.Vector3( 0.0, 0.0, 1.0 );

        /***************************************************************************************************************
        *   Creates a box.
        ***************************************************************************************************************/
        public static createBox
        (
            id              :string,
            position        :BABYLON.Vector3,
            size            :BABYLON.Vector3,
            rotationRad     :number,
            rotationAxis    :BABYLON.Vector3,
            texture         :bz.Texture,
            textureHasAlpha :bz.TextureHasAlpha,
            textureUV       :bz.TextureUV,
            color           :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,
            isStatic        :Physics
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

            box.position = new BABYLON.Vector3(
                position.x + ( size.x / 2 ),
                position.y + ( size.y / 2 ),
                position.z + ( size.z / 2 ),
            );

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
                box,
                rotationRad,
                rotationAxis,
                material,
                scene,
                isStatic
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
            rotationRad     :number,
            rotationAxis    :BABYLON.Vector3,
            texture         :bz.Texture,
            textureHasAlpha :bz.TextureHasAlpha,
            textureUV       :bz.TextureUV,
            color           :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,
            isStatic        :Physics
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

            plane.position = new BABYLON.Vector3(
                position.x + ( width  / 2 ),
                position.y + ( height / 2 ),
                position.z,
            );

            let material:BABYLON.StandardMaterial = null;

            if ( texture != null )
            {
                let textureU:number = ( textureUV == bz.TextureUV.ACCORDING_TO_SIZE ? width  : 1.0 );
                let textureV:number = ( textureUV == bz.TextureUV.ACCORDING_TO_SIZE ? height : 1.0 );

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
                rotationRad,
                rotationAxis,
                material,
                scene,
                isStatic
            );
        }

        /***************************************************************************************************************
        *   Adds general mesh properties.
        ***************************************************************************************************************/
        private static decorateMesh
        (
            mesh         :BABYLON.Mesh,
            rotationRad  :number,
            rotationAxis :BABYLON.Vector3,
            material     :BABYLON.StandardMaterial,
            scene        :BABYLON.Scene,
            isStatic     :Physics
        )
        {
            // TODO outsource rotation to separate method! Create constants for rotationAxis!
            mesh.rotate( rotationAxis, rotationRad, BABYLON.Space.WORLD );

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
                        {
                            mass:        0.0,
                            friction:    0.75,          // 0.0 = ice, 1.0 = concrete
                            restitution: 0.0
                        },
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
                        {
                            mass:        1.0,
                            friction:    0.75,
                            restitution: 0.0
                        },
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

            return mesh;
        }
    }

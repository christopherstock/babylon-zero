
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   Specifies if a mesh is static so it will never move.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export enum Static
    {
        YES,
        NO,
        NO_IMPOSTOR,
    }

    /*******************************************************************************************************************
    *   Constructs 3D meshes.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class FactoryMesh
    {
        /***************************************************************************************************************
        *   Creates a box.
        ***************************************************************************************************************/
        public static createBox
        (
            id           :string,
            position     :BABYLON.Vector3,
            size         :BABYLON.Vector3,
            rotationRad  :number,
            rotationAxis :BABYLON.Vector3,
            material     :BABYLON.StandardMaterial,
            scene        :BABYLON.Scene,
            isStatic     :Static
        )
        : BABYLON.Mesh
        {
            let box:BABYLON.Mesh = BABYLON.Mesh.CreateBox( id, 1.0, scene );

            box.position = position;
            box.position.x += size.x / 2;
            box.position.y += size.y / 2;
            box.position.z += size.z / 2;

            box.scaling  = size;

            return FactoryMesh.decorate
            (
                box,
                size,
                rotationRad,
                rotationAxis,
                material,
                scene,
                isStatic
            );
        }

        /***************************************************************************************************************
        *   Creates a plane.
        *
        *   @deprecated inoperative positioning and size setting!
        ***************************************************************************************************************/
        public static createPlane
        (
            id           :string,
            position     :BABYLON.Vector3,
            size         :BABYLON.Vector3,
            rotationRad  :number,
            rotationAxis :BABYLON.Vector3,
            material     :BABYLON.StandardMaterial,
            scene        :BABYLON.Scene,
            isStatic     :Static
        )
        : BABYLON.Mesh
        {
            let plane:BABYLON.Mesh = BABYLON.MeshBuilder.CreatePlane
            (
                id,
                {
                    width:           size.x,
                    height:          size.z,
                    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                },
                scene
            );

            plane.position = position;
/*
            plane.position.x += 1000.0;
            plane.position.y += size.y / 2;
            plane.position.z += size.z / 2;
*/

            plane.scaling = size;

            return FactoryMesh.decorate
            (
                plane,
                size,
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
        private static decorate
        (
            mesh         :BABYLON.Mesh,
            size         :BABYLON.Vector3,
            rotationRad  :number,
            rotationAxis :BABYLON.Vector3,
            material     :BABYLON.StandardMaterial,
            scene        :BABYLON.Scene,
            isStatic     :Static
        )
        {
            mesh.rotate( rotationAxis, rotationRad, BABYLON.Space.WORLD );

            // specify material
            if ( material.diffuseTexture != null )
            {
                ( material.diffuseTexture as any ).uScale = size.z;
                ( material.diffuseTexture as any ).vScale = size.x;
            }
            mesh.material        = material;

            mesh.receiveShadows  = false;
            mesh.checkCollisions = true;

            switch ( isStatic )
            {
                case Static.YES:
                {
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

                case Static.NO:
                {
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

                case Static.NO_IMPOSTOR:
                {
                    break;
                }
            }

            return mesh;
        }
    }

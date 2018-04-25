
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
            id              :string,
            position        :BABYLON.Vector3,
            size            :BABYLON.Vector3,
            rotationAmount  :number,
            rotationAxis    :BABYLON.Vector3,
            material        :BABYLON.StandardMaterial,
            scene           :BABYLON.Scene,
            isStatic        :Static
        )
        :BABYLON.Mesh
        {
            let box:BABYLON.Mesh = BABYLON.Mesh.CreateBox
            (
                id,
                1.0,
                scene
            );
            box.position = position;
            box.scaling  = size;

            box.position.x += size.x / 2;
            box.position.y += size.y / 2;
            box.position.z += size.z / 2;

            box.rotate( rotationAxis, rotationAmount, BABYLON.Space.WORLD );

            if ( material.diffuseTexture != null )
            {
                ( material.diffuseTexture as any ).uScale = size.z;
                ( material.diffuseTexture as any ).vScale = size.x;
            }

            box.material        = material;
            box.receiveShadows  = false;

            box.checkCollisions = true;

            switch ( isStatic )
            {
                case Static.YES:
                {
                    box.physicsImpostor = new BABYLON.PhysicsImpostor
                    (
                        box,
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
                    box.physicsImpostor = new BABYLON.PhysicsImpostor
                    (
                        box,
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
            }

            return box;
        }
    }

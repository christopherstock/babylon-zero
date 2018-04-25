
    import * as BABYLON from 'babylonjs';

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
            scene           :BABYLON.Scene
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

            if ( material.diffuseTexture != null )
            {
                ( material.diffuseTexture as any ).uScale = size.z;
                ( material.diffuseTexture as any ).vScale = size.x;
            }

            box.checkCollisions = true;
            box.material        = material;
            box.receiveShadows  = false;

            box.physicsImpostor = new BABYLON.PhysicsImpostor
            (
                box,
                BABYLON.PhysicsImpostor.BoxImpostor,
                {
                    mass:        0,
                    friction:    0.5,
                    restitution: 0.7
                },
                scene
            );

            box.rotate( rotationAxis, rotationAmount, BABYLON.Space.WORLD );

            return box;
        }
    }

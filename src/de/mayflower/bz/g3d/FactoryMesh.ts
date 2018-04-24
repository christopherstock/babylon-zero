
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
            material        :BABYLON.Material,
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
            box.position.z += size.z  / 2;

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

        /***************************************************************************************************************
        *   Creates a box the OLD style.
        *
        *   @deprecated Use createBox instead!
        ***************************************************************************************************************/
        public static createBoxDeprecated
        (
            id             :string,
            position       :BABYLON.Vector3,
            scaling        :BABYLON.Vector3,
            rotationAxis   :BABYLON.Vector3,
            rotationAmount :number,
            material       :BABYLON.Material,
            scene          :BABYLON.Scene
        )
        :BABYLON.Mesh
        {
            let ground:BABYLON.Mesh = BABYLON.Mesh.CreateBox( id, 1, scene );

            ground.position         = position;
            ground.scaling          = scaling;
            ground.checkCollisions  = true;
            ground.material         = material;
            ground.receiveShadows   = true;

            ground.rotate( rotationAxis, rotationAmount, BABYLON.Space.WORLD );

            ground.physicsImpostor = new BABYLON.PhysicsImpostor(
                ground,
                BABYLON.PhysicsImpostor.BoxImpostor,
                {
                    mass:        0,
                    friction:    0.5,
                    restitution: 0.7
                },
                scene
            );

            return ground;
        }
    }
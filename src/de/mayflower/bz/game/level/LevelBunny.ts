
    import * as bz from '../..';
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   Specifies the 'bunny' level.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class LevelBunny extends bz.Level
    {
        private         static                  SPHERES_TO_SPAWN        :number                     = 250;

        private                                 light1                  :BABYLON.DirectionalLight   = null;
        private                                 light2                  :BABYLON.PointLight         = null;
        private                                 light3                  :BABYLON.PointLight         = null;

        private                                 shadowGenerator1        :BABYLON.ShadowGenerator    = null;

        /***************************************************************************************************************
        *   Sets up the 'bunny' level.
        ***************************************************************************************************************/
        constructor()
        {
            super
            (
                new BABYLON.Vector3( -80.0, 40.0, -80.0 ),
                new BABYLON.Vector3( 0,     0,    0     ),
                bz.UI.COLOR_ORANGE_MAYFLOWER
            );

            this.setupLights();
            this.setupShadows();
            this.setupGround();
            this.setupCollidableBox();
            this.setupSpheres();
            this.setupBox0();
            // this.setupCompound();
            this.setupGlassPanes();
            this.setupSkybox();
            this.setupSprites();
            this.importMesh();
        }

        /***************************************************************************************************************
        *   Sets up all lights.
        ***************************************************************************************************************/
        private setupLights()
        {
            //setup lights
            this.light1           = new BABYLON.DirectionalLight( "dir01", new BABYLON.Vector3( 0.2, -1, 0 ), bz.Main.game.engine.scene.babylonScene );
            this.light1.intensity = 1.0;
            this.light1.position  = new BABYLON.Vector3( 0, 80, 0 );

            this.light2           = new BABYLON.PointLight( "omni01", new BABYLON.Vector3( -10.0, 0.0, -10.0 ), bz.Main.game.engine.scene.babylonScene );
            this.light2.intensity = 1.0;
            this.light2.diffuse   = new BABYLON.Color3( 1.0, 0.0, 0.0 );
            this.light2.specular  = new BABYLON.Color3( 1.0, 0.0, 0.0 );

            this.light3           = new BABYLON.PointLight( "spot01", new BABYLON.Vector3( 10.0,  0.0, 10.0  ), bz.Main.game.engine.scene.babylonScene );
            this.light3.intensity = 1.0;
            this.light3.diffuse   = new BABYLON.Color3( 0.0, 0.0, 1.0 );
            this.light3.specular  = new BABYLON.Color3( 0.0, 0.0, 1.0 );
        }

        /***************************************************************************************************************
        *   Sets up all shadows.
        ***************************************************************************************************************/
        private setupShadows()
        {
            //setup shadows
            this.shadowGenerator1                      = new BABYLON.ShadowGenerator( 2048, this.light1 );
            this.shadowGenerator1.useVarianceShadowMap = true;
            this.shadowGenerator1.usePoissonSampling   = true;
        }

        /***************************************************************************************************************
        *   Sets up the ground for the scene.
        ***************************************************************************************************************/
        private setupGround():void
        {
            bz.MeshFactory.createOldBox(
                "Ground1",
                new BABYLON.Vector3( 0.0,   -4.4, 1.0   ),
                new BABYLON.Vector3( 100.0, 1.0,  100.0 ),
                new BABYLON.Vector3( 0.0,   0.0,  0.0   ),
                0.0,
                bz.Main.game.engine.material.materialGrass,
                bz.Main.game.engine.scene.babylonScene
            );

            bz.MeshFactory.createOldBox(
                "Ground2",
                new BABYLON.Vector3( 0.0,   -26.0, -93.5 ),
                new BABYLON.Vector3( 100.0, 1.0,   100.0  ),
                new BABYLON.Vector3( 1.0,   0.0, 0.0 ),
                -0.45,
                bz.Main.game.engine.material.materialGrass,
                bz.Main.game.engine.scene.babylonScene
            );

            bz.MeshFactory.createOldBox(
                "Ground3",
                new BABYLON.Vector3( 0.0,   -48.0, -185.0 ),
                new BABYLON.Vector3( 100.0, 1.0,   100.0  ),
                new BABYLON.Vector3( 0.0,   0.0,   0.0    ),
                0.0,
                bz.Main.game.engine.material.materialGrass,
                bz.Main.game.engine.scene.babylonScene
            );
        }

        /***************************************************************************************************************
        *   Sets up the spheres for the scene.
        ***************************************************************************************************************/
        private setupSpheres():void
        {
            let y = 0;
            for ( let index = 0; index < LevelBunny.SPHERES_TO_SPAWN; index++ )
            {
                let sphere = BABYLON.Mesh.CreateSphere( "Sphere0", 16, 3, bz.Main.game.engine.scene.babylonScene );
                sphere.material = bz.Main.game.engine.material.materialMFLogo;
                sphere.position = new BABYLON.Vector3( Math.random() * 20 - 10, y, Math.random() * 10 - 5 );

                this.shadowGenerator1.getShadowMap().renderList.push( sphere );

                sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
                    sphere,
                    BABYLON.PhysicsImpostor.SphereImpostor,
                    {
                        mass:        1.0,
                        friction:    0.0,
                        restitution: 0.0
                    },
                    bz.Main.game.engine.scene.babylonScene
                );

                y += 4;
            }

            // Add 10 linked spheres
            let spheres = [];
            for ( let index = 0; index < 10; index++ )
            {
                let sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 1, bz.Main.game.engine.scene.babylonScene);
                spheres.push(sphere);
                sphere.material = bz.Main.game.engine.material.materialAmiga;
                sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);

                this.shadowGenerator1.getShadowMap().renderList.push( sphere );

                sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
                    sphere,
                    BABYLON.PhysicsImpostor.SphereImpostor,
                    {
                        mass:        1.0,
                        friction:    0.0,
                        restitution: 0.0
                    },
                    bz.Main.game.engine.scene.babylonScene
                );
            }
/*
            for (index = 0; index < 10; index++)
            {
                spheres[index].setPhysicsLinkWith(spheres[index + 1], new BABYLON.Vector3(0, 0.5, 0), new BABYLON.Vector3(0, -0.5, 0));
            }
*/
        }

        /***************************************************************************************************************
        *   Sets up the box0 for the scene.
        ***************************************************************************************************************/
        private setupBox0()
        {
            // Box
            let box0             = BABYLON.Mesh.CreateBox( "Box0", 3, bz.Main.game.engine.scene.babylonScene );
            box0.position        = new BABYLON.Vector3(3, 30, 0);
            box0.material        = bz.Main.game.engine.material.materialWood;

            this.shadowGenerator1.getShadowMap().renderList.push( box0 );

            box0.physicsImpostor = new BABYLON.PhysicsImpostor(
                box0,
                BABYLON.PhysicsImpostor.BoxImpostor,
                {
                    mass:        2.0,
                    friction:    0.4,
                    restitution: 0.3
                },
                bz.Main.game.engine.scene.babylonScene
            );
/*
            box0.setPhysicsState(   BABYLON.PhysicsEngine.BoxImpostor, { mass: 2, friction: 0.4, restitution: 0.3 } );
*/
        }

        /***************************************************************************************************************
        *   Sets up the compound for the scene.
        *
        *   @deprecated Unused and not ready.
        ***************************************************************************************************************/
        private setupCompound()
        {
            // Compound
            let part0 = BABYLON.Mesh.CreateBox( "part0", 3, bz.Main.game.engine.scene.babylonScene );
            part0.position = new BABYLON.Vector3(3, 30, 0);
            part0.material = bz.Main.game.engine.material.materialWood;

            let part1 = BABYLON.Mesh.CreateBox( "part1", 3, bz.Main.game.engine.scene.babylonScene );
            part1.parent = part0; // We need a hierarchy for compound objects
            part1.position = new BABYLON.Vector3(0, 3, 0);
            part1.material = bz.Main.game.engine.material.materialWood;

            this.shadowGenerator1.getShadowMap().renderList.push( part0 );
            this.shadowGenerator1.getShadowMap().renderList.push( part1 );
/*
            bz.Main.game.scene.createCompoundImpostor(
                [
                    { mesh: part0, impostor: BABYLON.PhysicsEngine.BoxImpostor },
                    { mesh: part1, impostor: BABYLON.PhysicsEngine.BoxImpostor },
                ],
                {
                    mass: 2, friction: 0.4, restitution: 0.3
                }
            );
*/
        }

        /***************************************************************************************************************
        *   Sets up the borders for the scene.
        ***************************************************************************************************************/
        private setupGlassPanes()
        {
            let glassPane1              = BABYLON.Mesh.CreateBox( "border0", 1.0, bz.Main.game.engine.scene.babylonScene );
            glassPane1.position         = new BABYLON.Vector3( 0.0,   5.0,  0.0  );
            glassPane1.scaling          = new BABYLON.Vector3( 1.0,   20.0, 50.0 );
            glassPane1.checkCollisions  = true;

            let glassPane2              = BABYLON.Mesh.CreateBox( "border2", 1.0, bz.Main.game.engine.scene.babylonScene );
            glassPane2.position         = new BABYLON.Vector3( 0.0,   5.0,  0.0 );
            glassPane2.scaling          = new BABYLON.Vector3( 50.0,  20.0, 1.0 );
            glassPane2.checkCollisions  = true;


            glassPane1.physicsImpostor = new BABYLON.PhysicsImpostor(
                glassPane1,
                BABYLON.PhysicsImpostor.BoxImpostor,
                {
                    mass:        0.0,
                    friction:    0.0,
                    restitution: 0.0
                },
                bz.Main.game.engine.scene.babylonScene
            );

            glassPane2.physicsImpostor = new BABYLON.PhysicsImpostor(
                glassPane2,
                BABYLON.PhysicsImpostor.BoxImpostor,
                {
                    mass:        0.0,
                    friction:    0.0,
                    restitution: 0.0
                },
                bz.Main.game.engine.scene.babylonScene
            );

            glassPane1.material = bz.Main.game.engine.material.materialGlass;
            glassPane2.material = bz.Main.game.engine.material.materialGlass;

            //Scene.shadowGenerator.getShadowMap().renderList.push( glassPane1 );
            //Scene.shadowGenerator.getShadowMap().renderList.push( glassPane2 );
        }

        /***************************************************************************************************************
        *   Sets up a collidable box.
        ***************************************************************************************************************/
        private setupCollidableBox()
        {
            let solidBox = BABYLON.Mesh.CreateBox( "box1", 1.0, bz.Main.game.engine.scene.babylonScene );
            solidBox.scaling         = new BABYLON.Vector3( 3.0,  3.0,  3.0   );
            solidBox.position        = new BABYLON.Vector3( 45.0, -2.0, -45.0 );
            solidBox.checkCollisions = true;

            solidBox.material = bz.Main.game.engine.material.materialAmiga;
        }

        /***************************************************************************************************************
        *   Sets up the skybox.
        ***************************************************************************************************************/
        private setupSkybox()
        {
            // Skybox
            let skybox = BABYLON.Mesh.CreateBox("skyBox", 500.0, bz.Main.game.engine.scene.babylonScene);
            let skyboxMaterial = new BABYLON.StandardMaterial( "skyBox", bz.Main.game.engine.scene.babylonScene );
            //skybox.position.z -= 200.0;
            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture( bz.SettingEngine.PATH_IMAGE_TEXTURE + "skybox", bz.Main.game.engine.scene.babylonScene );
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            //skyboxMaterial.disableLighting = true;
            skybox.material = skyboxMaterial;
        }

        /***************************************************************************************************************
        *   Sets up all sprites.
        ***************************************************************************************************************/
        private setupSprites()
        {
            // TODO improve weak design

            let tree1        = new BABYLON.Sprite( "tree1", bz.Main.game.engine.sprite.spriteManager );
            tree1.position   = new BABYLON.Vector3( 45.0, 5.0, -35.0 );
            tree1.size       = 20.0;

            let tree2        = new BABYLON.Sprite( "tree1", bz.Main.game.engine.sprite.spriteManager );
            tree2.position   = new BABYLON.Vector3( 45.0, 5.0, -20.0 );
            tree2.size       = 20.0;

            let tree3        = new BABYLON.Sprite( "tree1", bz.Main.game.engine.sprite.spriteManager );
            tree3.position   = new BABYLON.Vector3( 45.0, 5.0, -5.0 );
            tree3.size       = 20.0;

            let tree4        = new BABYLON.Sprite( "tree1", bz.Main.game.engine.sprite.spriteManager );
            tree4.position   = new BABYLON.Vector3( 45.0, 5.0, 10.0 );
            tree4.size       = 20.0;

            let tree5        = new BABYLON.Sprite( "tree1", bz.Main.game.engine.sprite.spriteManager );
            tree5.position   = new BABYLON.Vector3( 45.0, 5.0, 25.0 );
            tree5.size       = 20.0;

            let tree6        = new BABYLON.Sprite( "tree1", bz.Main.game.engine.sprite.spriteManager );
            tree6.position   = new BABYLON.Vector3( 45.0, 5.0, 40.0 );
            tree6.size       = 20.0;
        }

        /***************************************************************************************************************
        *   Imports a mesh in the .babylon format.
        ***************************************************************************************************************/
        private importMesh()
        {
            if ( true )
            {
                bz.Main.game.onInitLevelCompleted();
                return;
            }

/*
            // The first parameter can be used to specify which mesh to import. Here we import all meshes
            BABYLON.SceneLoader.ImportMesh
            (
                "",
                bz.Settings.PATH_3DS,
                "rabbit.babylon",
                bz.Main.game.scene,
                function( newMeshes:Array<BABYLON.Mesh> )
                {
                    let rabbit:BABYLON.Mesh = newMeshes[ 0 ];

                    //transform the rabbit
                    rabbit.position.y -= 4.0;
                    rabbit.position.z += 60.0;
                    rabbit.rotate( new BABYLON.Vector3( 0.0, 1.0, 0.0 ), 135.0, BABYLON.Space.LOCAL );

                    //rabbit.checkCollisions = true;

                    bz.Init.onInitCompleted();
                }
            );
*/
        }
    }


    import * as bz from '../..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Specifies the 'bunny' level.
    *******************************************************************************************************************/
    export class LevelBunny extends bz.Level
    {
        /** Number of spheres to spawn into this test level. */
        private     static              SPHERES_TO_SPAWN            :number                         = 15; // 250

        /** Test light 1. */
        private                         light1                      :BABYLON.DirectionalLight       = null;
        /** Test light 2. */
        private                         light2                      :BABYLON.PointLight             = null;
        /** Test light 3. */
        private                         light3                      :BABYLON.PointLight             = null;

        /** The testwise shadow generator. */
        private                         shadowGenerator1            :BABYLON.ShadowGenerator        = null;

        /** ************************************************************************************************************
        *   Sets up the 'bunny' level.
        *
        *   @param scene The babylon.JS scene reference.
        ***************************************************************************************************************/
        constructor( scene:BABYLON.Scene )
        {
            super( scene );

            this.createPlayer();

            this.setupLights();
            this.setupShadows();
            this.setupGround();
            this.setupCollidableBox();
            this.setupSpheres();
            this.setupBox0();
            // this.setupCompound();
            this.setupGlassPanes();
            this.setupSprites();
            this.importMesh();
        }

        /** ************************************************************************************************************
        *   Sets up all lights.
        ***************************************************************************************************************/
        private setupLights() : void
        {
            // setup lights
            this.light1 = new BABYLON.DirectionalLight( 'dir01', new BABYLON.Vector3( 0.2, -1, 0 ), this.scene );
            this.light1.intensity = 1.0;
            this.light1.position  = new BABYLON.Vector3( 0, 80, 0 );

            this.light2 = new BABYLON.PointLight( 'omni01', new BABYLON.Vector3( -10.0, 0.0, -10.0 ), this.scene );
            this.light2.intensity = 1.0;
            this.light2.diffuse   = new BABYLON.Color3( 1.0, 0.0, 0.0 );
            this.light2.specular  = new BABYLON.Color3( 1.0, 0.0, 0.0 );

            this.light3 = new BABYLON.PointLight( 'spot01', new BABYLON.Vector3( 10.0,  0.0, 10.0  ), this.scene );
            this.light3.intensity = 1.0;
            this.light3.diffuse   = new BABYLON.Color3( 0.0, 0.0, 1.0 );
            this.light3.specular  = new BABYLON.Color3( 0.0, 0.0, 1.0 );
        }

        /** ************************************************************************************************************
        *   Sets up all shadows.
        ***************************************************************************************************************/
        private setupShadows() : void
        {
            // setup shadows
            this.shadowGenerator1                         = new BABYLON.ShadowGenerator( 2048, this.light1 );
            // this.shadowGenerator1.useVarianceShadowMap    = true; // deprecated!
            this.shadowGenerator1.useExponentialShadowMap = true;
            this.shadowGenerator1.usePoissonSampling      = true;
        }

        /** ************************************************************************************************************
        *   Sets up the ground for the scene.
        ***************************************************************************************************************/
        private setupGround() : void
        {
            bz.MeshFactory.createBox(
                new BABYLON.Vector3( -50.0,   -4.4, -49.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 100.0, 1.0,  100.0 ),
                new BABYLON.Vector3( 0.0,   0.0,  0.0   ),
                bz.Texture.GRASS,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.STATIC, null ),
                1.0
            );

            bz.MeshFactory.createBox(
                new BABYLON.Vector3( -50.0,   -26.0, -143.5 ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 100.0, 1.0,   100.0  ),
                new BABYLON.Vector3( -45.0,   0.0, 0.0 ),
                bz.Texture.GRASS,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.STATIC, null ),
                1.0
            );

            bz.MeshFactory.createBox(
                new BABYLON.Vector3( -50.0,   -48.0, -235.0 ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 100.0, 1.0,   100.0  ),
                new BABYLON.Vector3( 0.0,   0.0,   0.0    ),
                bz.Texture.GRASS,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.STATIC, null ),
                1.0
            );
        }

        /** ************************************************************************************************************
        *   Sets up the spheres for the scene.
        ***************************************************************************************************************/
        private setupSpheres() : void
        {
            let y:number = 0;
            for ( let index:number = 0; index < LevelBunny.SPHERES_TO_SPAWN; index++ )
            {
                const sphere:BABYLON.Mesh = BABYLON.Mesh.CreateSphere( 'Sphere0', 16, 3, this.scene );
                sphere.material = bz.TextureSystem.createTexture
                (
                    'mfLogo.jpg',
                    1.0,
                    1.0,
                    1.0,
                    false,
                    bz.SettingGame.COLOR_WHITE,
                    bz.TextureHasAlpha.NO
                );
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
                    this.scene
                );

                y += 4;
            }

            // Add 10 linked spheres
            // const spheres:BABYLON.Mesh[] = [];
            for ( let index:number = 0; index < 10; index++ )
            {
                const sphere:BABYLON.Mesh = BABYLON.Mesh.CreateSphere( 'Sphere0', 16, 1, this.scene );
                // spheres.push( sphere );
                sphere.material = bz.TextureSystem.createTexture
                (
                    'amiga.jpg',
                    1.0,
                    1.0,
                    1.0,
                    false,
                    bz.SettingGame.COLOR_WHITE,
                    bz.TextureHasAlpha.NO
                );
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
                    this.scene
                );
            }
/*
            for (index = 0; index < 10; index++)
            {
                spheres[index].setPhysicsLinkWith
                (
                    spheres[index + 1],
                    new BABYLON.Vector3( 0, 0.5, 0 ),
                    new BABYLON.Vector3( 0, -0.5, 0 )
                );
            }
*/
        }

        /** ************************************************************************************************************
        *   Sets up the box0 for the scene.
        ***************************************************************************************************************/
        private setupBox0() : void
        {
            // Box
            const box0:BABYLON.Mesh = BABYLON.Mesh.CreateBox( 'Box0', 3, this.scene );
            box0.position           = new BABYLON.Vector3(3, 30, 0);
            box0.material           = bz.TextureSystem.createTexture
            (
                'wood.jpg',
                1.0,
                1.0,
                1.0,
                false,
                bz.SettingGame.COLOR_WHITE,
                bz.TextureHasAlpha.NO
            );

            this.shadowGenerator1.getShadowMap().renderList.push( box0 );

            box0.physicsImpostor = new BABYLON.PhysicsImpostor(
                box0,
                BABYLON.PhysicsImpostor.BoxImpostor,
                {
                    mass:        2.0,
                    friction:    0.4,
                    restitution: 0.3
                },
                this.scene
            );
/*
            box0.setPhysicsState(   BABYLON.PhysicsEngine.BoxImpostor, { mass: 2, friction: 0.4, restitution: 0.3 } );
*/
        }

        /** ************************************************************************************************************
        *   Sets up the compound for the scene.
        *
        *   @deprecated Unused and not ready.
        ***************************************************************************************************************/
        private setupCompound() : void
        {
            // Compound
            const part0:BABYLON.Mesh = BABYLON.Mesh.CreateBox( 'part0', 3, this.scene );
            part0.position = new BABYLON.Vector3(3, 30, 0);
            part0.material = bz.TextureSystem.createTexture
            (
                'wood.jpg',
                1.0,
                1.0,
                1.0,
                false,
                bz.SettingGame.COLOR_WHITE,
                bz.TextureHasAlpha.NO
            );

            const part1:BABYLON.Mesh = BABYLON.Mesh.CreateBox( 'part1', 3, this.scene );
            part1.parent = part0; // We need a hierarchy for compound objects
            part1.position = new BABYLON.Vector3(0, 3, 0);
            part1.material = bz.TextureSystem.createTexture
            (
                'wood.jpg',
                1.0,
                1.0,
                1.0,
                false,
                bz.SettingGame.COLOR_WHITE,
                bz.TextureHasAlpha.NO
            );

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

        /** ************************************************************************************************************
        *   Sets up the borders for the scene.
        ***************************************************************************************************************/
        private setupGlassPanes() : void
        {
            const glassPane1:BABYLON.Mesh = BABYLON.Mesh.CreateBox( 'border0', 1.0, this.scene );
            glassPane1.position           = new BABYLON.Vector3( 0.0,   5.0,  0.0  );
            glassPane1.scaling            = new BABYLON.Vector3( 1.0,   20.0, 50.0 );
            glassPane1.checkCollisions    = true;

            const glassPane2:BABYLON.Mesh = BABYLON.Mesh.CreateBox( 'border2', 1.0, this.scene );
            glassPane2.position           = new BABYLON.Vector3( 0.0,   5.0,  0.0 );
            glassPane2.scaling            = new BABYLON.Vector3( 50.0,  20.0, 1.0 );
            glassPane2.checkCollisions    = true;

            glassPane1.physicsImpostor = new BABYLON.PhysicsImpostor(
                glassPane1,
                BABYLON.PhysicsImpostor.BoxImpostor,
                {
                    mass:        0.0,
                    friction:    0.0,
                    restitution: 0.0
                },
                this.scene
            );

            glassPane2.physicsImpostor = new BABYLON.PhysicsImpostor(
                glassPane2,
                BABYLON.PhysicsImpostor.BoxImpostor,
                {
                    mass:        0.0,
                    friction:    0.0,
                    restitution: 0.0
                },
                this.scene
            );

            glassPane1.material = bz.TextureSystem.createTexture
            (
                'glass.jpg',
                1.0,
                1.0,
                0.5,
                true,
                null,
                bz.TextureHasAlpha.NO
            );
            glassPane2.material = bz.TextureSystem.createTexture
            (
                'glass.jpg',
                1.0,
                1.0,
                0.5,
                true,
                null,
                bz.TextureHasAlpha.NO
            );

            // Scene.shadowGenerator.getShadowMap().renderList.push( glassPane1 );
            // Scene.shadowGenerator.getShadowMap().renderList.push( glassPane2 );
        }

        /** ************************************************************************************************************
        *   Sets up a collidable box.
        ***************************************************************************************************************/
        private setupCollidableBox() : void
        {
            const solidBox:BABYLON.Mesh = BABYLON.Mesh.CreateBox( 'box1', 1.0, this.scene );

            solidBox.scaling         = new BABYLON.Vector3( 3.0,  3.0,  3.0   );
            solidBox.position        = new BABYLON.Vector3( 45.0, -2.0, -45.0 );
            solidBox.checkCollisions = true;

            solidBox.material = bz.TextureSystem.createTexture
            (
                'amiga.jpg',
                1.0,
                1.0,
                1.0,
                false,
                bz.SettingGame.COLOR_WHITE,
                bz.TextureHasAlpha.NO
            );
        }

        /** ************************************************************************************************************
        *   Sets up all sprites.
        ***************************************************************************************************************/
        private setupSprites() : void
        {
            bz.Main.game.engine.sprite.createTreeSprite( new BABYLON.Vector3( 45.0, 5.0, -35.0 ), 20.0 );
            bz.Main.game.engine.sprite.createTreeSprite( new BABYLON.Vector3( 45.0, 5.0, -20.0 ), 20.0 );
            bz.Main.game.engine.sprite.createTreeSprite( new BABYLON.Vector3( 45.0, 5.0, -5.0  ), 20.0 );
            bz.Main.game.engine.sprite.createTreeSprite( new BABYLON.Vector3( 45.0, 5.0, 10.0  ), 20.0 );
            bz.Main.game.engine.sprite.createTreeSprite( new BABYLON.Vector3( 45.0, 5.0, 25.0  ), 20.0 );
            bz.Main.game.engine.sprite.createTreeSprite( new BABYLON.Vector3( 45.0, 5.0, 40.0  ), 20.0 );
        }

        /** ************************************************************************************************************
        *   Imports a mesh in the .babylon format.
        ***************************************************************************************************************/
        private importMesh() : void
        {
            const skipMeshImport:boolean = true;

            if ( skipMeshImport )
            {
                bz.Main.game.onInitLevelCompleted();
            }
            else
            {
                // The first parameter can be used to specify which mesh to import. Here we import all meshes
                BABYLON.SceneLoader.ImportMesh
                (
                    '',
                    bz.SettingEngine.PATH_MESH,

                    'rabbit.babylon',
                    // 'test.obj',

                    this.scene,
                    ( newMeshes:BABYLON.AbstractMesh[] ) =>
                    {
                        const rabbit:BABYLON.AbstractMesh = newMeshes[ 0 ];

                        // transform the rabbit
                        rabbit.position.y -= 4.0;
                        rabbit.position.z += 60.0;
                        rabbit.rotate( new BABYLON.Vector3( 0.0, 1.0, 0.0 ), 135.0, BABYLON.Space.LOCAL );

                        // rabbit.checkCollisions = true;

                        bz.Main.game.onInitLevelCompleted();
                    }
                );
            }
        }
    }

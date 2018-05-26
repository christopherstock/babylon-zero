
    import * as BABYLON from 'babylonjs';
    import * as bz      from '../..';

    /** ****************************************************************************************************************
    *   Represents a custom level set.
    *******************************************************************************************************************/
    export abstract class Level
    {
        /** The camera system. */
        public                              cameraSystem            :bz.CameraSystem                    = null;
        /** The player instance. */
        public                              player                  :bz.Player                          = null;
        /** The reference to the babylon.JS Scene. */
        protected       readonly            scene                   :BABYLON.Scene                      = null;
        /** The skybox that surrounds the whole level. */
        protected                           skybox                  :BABYLON.Mesh                       = null;
        /** The ambient color of this level is the emissive color of all mesh materials. */
        protected       readonly            ambientColor            :BABYLON.Color3                     = null;

        /** A collection of all walls in this level. */
        protected       readonly            walls                   :bz.Wall[]                          = null;
        /** A collection of all movables in this level. */
        protected       readonly            movables                :bz.Movable[]                       = null;
        /** A collection of all items in this level. */
        protected       readonly            items                   :bz.Item[]                          = null;
        /** A collection of all bots in this level. */
        protected       readonly            bots                    :bz.Bot[]                           = null;

        /** A shadow generator for one specific light. */
        protected                           shadowGenerator1        :BABYLON.ShadowGenerator            = null;

        /** A hemispheric light. */
        private                             lightHemispheric        :BABYLON.HemisphericLight           = null;
        /** A directional light. */
        private                             lightDirectional        :BABYLON.DirectionalLight           = null;
        /** A spot light. */
        private                             lightSpot               :BABYLON.SpotLight                  = null;
        /** A point light. */
        private                             lightPoint              :BABYLON.PointLight                 = null;

        /** ************************************************************************************************************
        *   Creates a new custom level.
        *
        *   @param ambientColor The ambient color of the level is the emissive color for all faces.
        *   @param scene        The babylon.JS scene reference.
        ***************************************************************************************************************/
        protected constructor
        (
            ambientColor :BABYLON.Color3,
            scene        :BABYLON.Scene
        )
        {
            this.ambientColor = ambientColor;
            this.scene        = scene;

            if ( bz.SettingDebug.SHOW_COORDINATE_AXIS )
            {
                this.createTestAxis();
            }

            this.walls    = this.createWalls();
            this.movables = this.createMovables();
            this.items    = this.createItems();
            this.bots     = this.createBots();

            this.setupSprites();

            this.setupPlayer();
            this.setupSkybox();

            this.setupLights();

            if ( bz.SettingEngine.ENABLE_SHADOWS )
            {
                this.setupShadowGenerator();
                this.setupShadows();
            }

            this.importMesh();
        }

        /** ************************************************************************************************************
        *   Resets this level.
        ***************************************************************************************************************/
        public reset() : void
        {
            this.resetCameraSystem();
        }

        /** ************************************************************************************************************
        *   Renders all level concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            this.player.handlePlayerKeys();

            this.player.render();
        }

        /** ************************************************************************************************************
        *   Creates and returns all walls this level consists of.
        *
        *   @return All walls of this level.
        ***************************************************************************************************************/
        protected abstract createWalls() : bz.Wall[];

        /** ************************************************************************************************************
        *   Creates and returns all movables this level consists of.
        *
        *   @return All movables of this level.
        ***************************************************************************************************************/
        protected abstract createMovables() : bz.Movable[];

        /** ************************************************************************************************************
        *   Creates and returns all items this level consists of.
        *
        *   @return All items of this level.
        ***************************************************************************************************************/
        protected abstract createItems() : bz.Item[];

        /** ************************************************************************************************************
        *   Creates and returns all bots this level consists of.
        *
        *   @return All bots of this level.
        ***************************************************************************************************************/
        protected abstract createBots() : bz.Bot[];

        /** ************************************************************************************************************
        *   Sets up the axis orientation test points.
        *
        *   X Y and Z axes are aligned by the LEFT HAND RULE.
        ***************************************************************************************************************/
        protected createTestAxisPoints() : void
        {
            // origin
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 0.0, 0.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.SettingGame.COLOR_BLACK,
                this.scene,
                bz.Physic.NONE,
                1.0,
                this.ambientColor
            );

            // x test
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 5.0, 0.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.SettingGame.COLOR_RED,
                this.scene,
                bz.Physic.NONE,
                1.0,
                this.ambientColor
            );
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 10.0, 0.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 2.5,  0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.SettingGame.COLOR_RED,
                this.scene,
                bz.Physic.NONE,
                1.0,
                this.ambientColor
            );

            // y test
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 0.0, 5.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.SettingGame.COLOR_GREEN,
                this.scene,
                bz.Physic.NONE,
                1.0,
                this.ambientColor
            );
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 0.0, 10.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 2.5, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.SettingGame.COLOR_GREEN,
                this.scene,
                bz.Physic.NONE,
                1.0,
                this.ambientColor
            );

            // z test
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 0.0, 0.0, 5.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.SettingGame.COLOR_BLUE,
                this.scene,
                bz.Physic.NONE,
                1.0,
                this.ambientColor
            );
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 0.0, 0.0, 10.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 2.5   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.SettingGame.COLOR_BLUE,
                this.scene,
                bz.Physic.NONE,
                1.0,
                this.ambientColor
            );
        }

        /** ************************************************************************************************************
        *   Sets up the coordinate axis lines.
        *
        *   X Y and Z axes are aligned by the LEFT HAND RULE.
        ***************************************************************************************************************/
        protected createTestAxis() : void
        {
            // axis x
            bz.MeshFactory.createLine
            (
                new BABYLON.Vector3( 0.0,  0.0, 0.0 ),
                new BABYLON.Vector3( bz.SettingDebug.DEBUG_AXIS_LENGTH, 0.0, 0.0 ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.SettingGame.COLOR_RED_OPAQUE_RGBA,
                this.scene
            );
            // axis y
            bz.MeshFactory.createLine
            (
                new BABYLON.Vector3( 0.0, 0.0,  0.0 ),
                new BABYLON.Vector3( 0.0, bz.SettingDebug.DEBUG_AXIS_LENGTH, 0.0 ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.SettingGame.COLOR_GREEN_OPAQUE_RGBA,
                this.scene
            );
            // axis z
            bz.MeshFactory.createLine
            (
                new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                new BABYLON.Vector3( 0.0, 0.0, bz.SettingDebug.DEBUG_AXIS_LENGTH ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.SettingGame.COLOR_BLUE_OPAQUE_RGBA,
                this.scene
            );
        }

        /** ************************************************************************************************************
        *   Sets up the player for the scene.
        ***************************************************************************************************************/
        private setupPlayer() : void
        {
            this.player = new bz.Player( 225.0, this.ambientColor );
        }

        /** ************************************************************************************************************
        *   Sets up the skybox.
        ***************************************************************************************************************/
        private setupSkybox() : void
        {
            this.skybox = bz.MeshFactory.createSkyBox( 0.5, 'bluesky', this.scene );
        }

        /** ************************************************************************************************************
        *   Resets the camera system and all cameras to their initial positions.
        ***************************************************************************************************************/
        private resetCameraSystem() : void
        {
            this.cameraSystem = new bz.CameraSystem
            (
                this.scene,
                new BABYLON.Vector3( 20.0, 5.0, 20.0 ),
                new BABYLON.Vector3( 20.0, 5.0, 20.0 ),
                new BABYLON.Vector3( 0.0,  0.0, 25.0  )
            );

            // lock statinary target camera to player
            this.cameraSystem.lockStationaryTargetCameraTo( this.player.getThirdPersonCameraTargetMesh() );
            // lock follow camera to player
            this.cameraSystem.lockFollowCameraTo(           this.player.getThirdPersonCameraTargetMesh() );
            // lock first person camera to player
            this.cameraSystem.setFirstPersonCameraInside(   this.player.getFirstPersonCameraTargetMesh() );

            // set active scene camera
            this.cameraSystem.setActiveSceneCamera( this.scene, bz.SettingGame.DEFAULT_CAMERA );
        }

        /** ************************************************************************************************************
        *   Sets up all lights.
        ***************************************************************************************************************/
        private setupLights() : void
        {
            // hemispheric light
            this.lightHemispheric = bz.LightFactory.createHemispheric
            (
                this.scene,
                new BABYLON.Vector3( 0.0, 1.0, 0.0 ),
                new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                new BABYLON.Color3( 0.1, 0.1, 0.1 ),
                new BABYLON.Color3( 0.0, 0.0, 0.0 )
            );
            this.lightHemispheric.setEnabled( false );

            // directional light
            this.lightDirectional = bz.LightFactory.createDirectional
            (
                this.scene,
                new BABYLON.Vector3( 0.5, -1.0, 0.0 ),
                new BABYLON.Vector3( 20.0, 20.0, 20.0 ),
                1.0,
                new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                new BABYLON.Color3( 1.0, 0.5, 0.0 ),
            );
            this.lightDirectional.setEnabled( false );

            // spot light
            this.lightSpot = bz.LightFactory.createSpot
            (
                this.scene,
                new BABYLON.Vector3( 15.0, 20.0, 15.0 ),
                new BABYLON.Vector3( 0.0, -1.0, 0.0 ),
                bz.MathUtil.degreesToRad( 30.0 ),
                2,
                new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 )
            );
            this.lightSpot.setEnabled( false );

            // point light
            this.lightPoint = bz.LightFactory.createPoint
            (
                this.scene,
                new BABYLON.Vector3( 15.0, 3.0, 16.0 ),
                1.0,
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                new BABYLON.Color3( 0.0, 0.0, 0.0 )
            );
            this.lightPoint.setEnabled( true );
        }

        /** ************************************************************************************************************
        *   Sets up all shadow generators.
        ***************************************************************************************************************/
        private setupShadowGenerator() : void
        {
            this.shadowGenerator1 = new BABYLON.ShadowGenerator( 2048, this.lightSpot );
            this.shadowGenerator1.useExponentialShadowMap = true;
            this.shadowGenerator1.usePoissonSampling      = true;
        }

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        private setupShadows() : void
        {
            // set shadows for all movables
            for ( const movable of this.movables )
            {
                this.shadowGenerator1.getShadowMap().renderList.push( movable.mesh );
            }

            // set shadows for all walls
            for ( const wall of this.walls )
            {
                this.shadowGenerator1.getShadowMap().renderList.push( wall.mesh );
            }
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
            const skipMeshImport:boolean = false;

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

                    // 'skull.babylon',
                    'test.babylon',
                    // 'rabbit.babylon',
                    // 'test.obj',

                    this.scene,
                    ( importedMeshes:BABYLON.AbstractMesh[] ) =>
                    {
                        for ( const importedMesh of importedMeshes )
                        {
                            const rabbit:BABYLON.AbstractMesh = importedMesh;

                            // transform the rabbit
                            rabbit.position.x += -25.0;
                            rabbit.position.y += 75.0;
                            rabbit.position.z += 25.0;

                            rabbit.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;
                            rabbit.scaling         = new BABYLON.Vector3( 0.2, 0.2, 0.2 );
                            rabbit.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;
                            rabbit.physicsImpostor = new BABYLON.PhysicsImpostor
                            (
                                rabbit,
                                BABYLON.PhysicsImpostor.BoxImpostor,
                                {
                                    mass: 1.0,
                                    friction: 1.0,
                                    restitution: 1.0,
                                },
                                this.scene
                            );

                            rabbit.isPickable = true;
                        }

                        bz.Main.game.onInitLevelCompleted();
                    }
                );
            }
        }
    }

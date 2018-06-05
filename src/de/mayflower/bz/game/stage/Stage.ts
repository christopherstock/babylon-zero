
    import * as BABYLON from 'babylonjs';
    import * as bz      from '../..';

    /** ****************************************************************************************************************
    *   Represents a custom stage set.
    *******************************************************************************************************************/
    export abstract class Stage
    {
        /** The camera system. TODO to engine..? */
        public                              cameraSystem            :bz.CameraSystem                    = null;

        /** The player instance. */
        public                              player                  :bz.Player                          = null;
        /** The reference to the babylon.JS Scene. */
        protected       readonly            scene                   :BABYLON.Scene                      = null;
        /** The ambient color of this stage is the emissive color of all mesh materials. */
        protected       readonly            ambientColor            :BABYLON.Color3                     = null;

        /** A collection of the coordinate axis in this stage. */
        protected                           coordinateAxis          :BABYLON.Mesh[]                     = [];
        /** The skybox that surrounds the whole stage. */
        protected                           skybox                  :BABYLON.Mesh                       = null;
        /** A collection of all walls in this stage. */
        protected                           walls                   :bz.Wall[]                          = [];
        /** A collection of all movables in this stage. */
        protected                           movables                :bz.Movable[]                       = [];
        /** A collection of all items in this stage. */
        protected                           items                   :bz.Item[]                          = [];
        /** A collection of all bots in this stage. */
        protected                           bots                    :bz.Bot[]                           = [];
        /** A collection of all imported meshes in this stage. TODO remove and merge to game objects! */
        protected                           importedMeshes          :BABYLON.Mesh[][]                   = [];
        /** A collection of all sprites that appear in this stage. */
        protected                           sprites                 :BABYLON.Sprite[]                   = [];

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
        *   Creates a new custom stage.
        *
        *   @param ambientColor The ambient color of the stage is the emissive color for all faces.
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
                this.coordinateAxis = this.createCoordinalAxis();
            }

            this.walls          = this.createWalls();
            this.movables       = this.createMovables();
            this.items          = this.createItems();
            this.bots           = this.createBots();
            this.importedMeshes = this.createImportedMeshes();
            this.skybox         = this.createSkybox();
            this.sprites        = this.createSprites();





            this.setupPlayer();
            this.setupLights();

            if ( bz.SettingEngine.ENABLE_SHADOWS )
            {
                this.setupShadowGenerator();
                this.setupShadows();
            }

            bz.Main.game.onInitStageCompleted();
        }

        /** ************************************************************************************************************
        *   Resets this stage.
        ***************************************************************************************************************/
        public reset() : void
        {
            this.resetCameraSystem();
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            this.player.handlePlayerKeys();

            this.player.render();
        }

        /** ************************************************************************************************************
        *   Removes all meshes of this level.
        ***************************************************************************************************************/
        public unload() : void
        {
            // dispose all walls
            for ( const wall of this.walls )
            {
                wall.dispose();
            }

            // dispose all movables
            for ( const movable of this.movables )
            {
                movable.dispose();
            }

            // dispose all items
            for ( const item of this.items )
            {
                item.dispose();
            }

            // dispose all bots
            for ( const bot of this.bots )
            {
                bot.dispose();
            }

            // dispose all imported meshes
            for ( const importedMesh of this.importedMeshes )
            {
                for ( const mesh of importedMesh )
                {
                    mesh.dispose();
                }
            }

            // dispose coordinate axis
            for ( const mesh of this.coordinateAxis )
            {
                mesh.dispose();
            }

            // dispose skybox
            this.skybox.dispose();

            // dispose player
            this.player.dispose();

            // dispose sprites
            for ( const sprite of this.sprites )
            {
                sprite.dispose();
            }




        }

        /** ************************************************************************************************************
        *   Creates and returns all walls this stage consists of.
        *
        *   @return All walls of this stage.
        ***************************************************************************************************************/
        protected abstract createWalls() : bz.Wall[];

        /** ************************************************************************************************************
        *   Creates and returns all movables this stage consists of.
        *
        *   @return All movables of this stage.
        ***************************************************************************************************************/
        protected abstract createMovables() : bz.Movable[];

        /** ************************************************************************************************************
        *   Creates and returns all items this stage consists of.
        *
        *   @return All items of this stage.
        ***************************************************************************************************************/
        protected abstract createItems() : bz.Item[];

        /** ************************************************************************************************************
        *   Creates and returns all bots this stage consists of.
        *
        *   @return All bots of this stage.
        ***************************************************************************************************************/
        protected abstract createBots() : bz.Bot[];

        /** ************************************************************************************************************
        *   Creates and returns all imported meshes this stage consists of.
        *
        *   @return All imported meshes of this stage.
        ***************************************************************************************************************/
        protected abstract createImportedMeshes() : BABYLON.Mesh[][];

        /** ************************************************************************************************************
        *   Sets up the skybox.
        *
        *   @return The created skybox for this stage.
        ***************************************************************************************************************/
        protected abstract createSkybox() : BABYLON.Mesh;

        /** ************************************************************************************************************
        *   Creates all sprites that appear in the stage.
        *
        *   @return All sprites that appear in this stage.
        ***************************************************************************************************************/
        protected abstract createSprites() : BABYLON.Sprite[];

        /** ************************************************************************************************************
        *   Sets up the coordinate axis lines. X Y and Z axes are aligned by the LEFT HAND RULE.
        *
        *   @return A collection of all meshes that build the coordinate axis lines.
        ***************************************************************************************************************/
        private createCoordinalAxis() : BABYLON.Mesh[]
        {
            return [

                // axis x
                bz.MeshFactory.createLine
                (
                    new BABYLON.Vector3( 0.0,  0.0, 0.0 ),
                    new BABYLON.Vector3( bz.SettingDebug.DEBUG_AXIS_LENGTH, 0.0, 0.0 ),
                    bz.MeshPivotAnchor.LOWEST_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingGame.COLOR_RED_OPAQUE_RGBA,
                    this.scene
                ),

                // axis y
                bz.MeshFactory.createLine
                (
                    new BABYLON.Vector3( 0.0, 0.0,  0.0 ),
                    new BABYLON.Vector3( 0.0, bz.SettingDebug.DEBUG_AXIS_LENGTH, 0.0 ),
                    bz.MeshPivotAnchor.LOWEST_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingGame.COLOR_GREEN_OPAQUE_RGBA,
                    this.scene
                ),

                // axis z
                bz.MeshFactory.createLine
                (
                    new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                    new BABYLON.Vector3( 0.0, 0.0, bz.SettingDebug.DEBUG_AXIS_LENGTH ),
                    bz.MeshPivotAnchor.LOWEST_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingGame.COLOR_BLUE_OPAQUE_RGBA,
                    this.scene
                ),
            ];
        }

        /** ************************************************************************************************************
        *   Sets up the player for the scene.
        ***************************************************************************************************************/
        private setupPlayer() : void
        {
            this.player = new bz.Player( 225.0, this.ambientColor );
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
                // set shadows for all meshes
                for ( const mesh of movable.getMeshes() )
                {
                    this.shadowGenerator1.getShadowMap().renderList.push( mesh );
                }
            }

            // set shadows for all walls
            for ( const wall of this.walls )
            {
                // set shadows for all meshes
                for ( const mesh of wall.getMeshes() )
                {
                    this.shadowGenerator1.getShadowMap().renderList.push( mesh );
                }
            }
        }
    }


    import * as bz from '../..';

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
        *   @param scene The babylon.JS scene reference.
        ***************************************************************************************************************/
        protected constructor( scene:BABYLON.Scene )
        {
            this.scene = scene;

            if ( bz.SettingDebug.SHOW_COORDINATE_AXIS )
            {
                this.createTestAxis();
            }

            this.walls    = this.createWalls();
            this.movables = this.createMovables();
            this.items    = this.createItems();
            this.bots     = this.createBots();

            this.setupPlayer();
            this.setupSkybox();

            this.setupLights();

            if ( bz.SettingEngine.ENABLE_SHADOWS )
            {
                this.setupShadowGenerator();
                this.setupShadows();
            }
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
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                bz.Main.game.engine.material.solidBlack,
                this.scene,
                bz.Physic.NONE,
                1.0
            );

            // x test
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 5.0, 0.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                bz.Main.game.engine.material.solidRed,
                this.scene,
                bz.Physic.NONE,
                1.0
            );
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 10.0, 0.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 2.5,  0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                bz.Main.game.engine.material.solidRed,
                this.scene,
                bz.Physic.NONE,
                1.0
            );

            // y test
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 0.0, 5.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                bz.Main.game.engine.material.solidGreen,
                this.scene,
                bz.Physic.NONE,
                1.0
            );
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 0.0, 10.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 2.5, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                bz.Main.game.engine.material.solidGreen,
                this.scene,
                bz.Physic.NONE,
                1.0
            );

            // z test
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 0.0, 0.0, 5.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                bz.Main.game.engine.material.solidBlue,
                this.scene,
                bz.Physic.NONE,
                1.0
            );
            bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 0.0, 0.0, 10.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 2.5   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                bz.Main.game.engine.material.solidBlue,
                this.scene,
                bz.Physic.NONE,
                1.0
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
            this.player = new bz.Player( 225.0 );
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
        *
        *   TODO to LightFactory - create dynamic LightId
        ***************************************************************************************************************/
        private setupLights() : void
        {
            // hemispheric light
            this.lightHemispheric  = new BABYLON.HemisphericLight
            (
                'light0',
                new BABYLON.Vector3( 0.0, 1.0, 0.0 ),
                this.scene
            );
            this.lightHemispheric.diffuse     = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            this.lightHemispheric.specular    = new BABYLON.Color3( 0.1, 0.1, 0.1 );
            this.lightHemispheric.groundColor = new BABYLON.Color3( 0.0, 0.0, 0.0 );
            this.lightHemispheric.setEnabled( false );

            // directional light
            this.lightDirectional= new BABYLON.DirectionalLight
            (
                'light1',
                new BABYLON.Vector3( 0.5, -1.0, 0.0 ),
                this.scene
            );
            this.lightDirectional.intensity = 1.0;
            this.lightDirectional.position  = new BABYLON.Vector3( 20.0, 20.0, 20.0 );
            this.lightDirectional.diffuse   = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            this.lightDirectional.specular  = new BABYLON.Color3( 1.0, 0.5, 0.0 );
            this.lightDirectional.setEnabled( false );

            // spot light
            this.lightSpot = new BABYLON.SpotLight
            (
                'light2',
                new BABYLON.Vector3( 15.0, 20.0, 15.0 ),
                new BABYLON.Vector3( 0.0, -1.0, 0.0 ),
                bz.MathUtil.degreesToRad( 30.0 ),
                2,
                this.scene
            );
            this.lightSpot.diffuse  = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            this.lightSpot.specular = new BABYLON.Color3( 1.0, 1.0, 1.0 );
            this.lightSpot.setEnabled( false );






/*
            this.light2 = new BABYLON.PointLight( 'omni01', new BABYLON.Vector3( -10.0, 0.0, -10.0 ), this.scene );
            this.light2.intensity = 1.0;
            this.light2.diffuse   = new BABYLON.Color3( 1.0, 0.0, 0.0 );
            this.light2.specular  = new BABYLON.Color3( 1.0, 0.0, 0.0 );

            this.light3 = new BABYLON.PointLight( 'spot01', new BABYLON.Vector3( 10.0,  0.0, 10.0  ), this.scene );
            this.light3.intensity = 1.0;
            this.light3.diffuse   = new BABYLON.Color3( 0.0, 0.0, 1.0 );
            this.light3.specular  = new BABYLON.Color3( 0.0, 0.0, 1.0 );
*/
        }

        /** ************************************************************************************************************
        *   Sets up all shadow generators.
        ***************************************************************************************************************/
        private setupShadowGenerator() : void
        {
/*
            this.shadowGenerator1 = new BABYLON.ShadowGenerator( 2048, this.light2 );
            this.shadowGenerator1.useExponentialShadowMap = true;
            this.shadowGenerator1.usePoissonSampling      = true;
*/
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
    }

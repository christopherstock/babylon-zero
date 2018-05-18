
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
        protected       readonly            walls                   :BABYLON.Mesh[]                     = null;
        /** A collection of all movables in this level. */
        protected       readonly            movables                :BABYLON.Mesh[]                     = null;
        /** A collection of all items in this level. */
        protected       readonly            items                   :any[]                              = null;
        /** A collection of all bots in this level. */
        protected       readonly            bots                    :any[]                              = null;

        /** ************************************************************************************************************
        *   Creates a new custom level.
        *
        *   @param scene The babylon.JS scene reference.
        ***************************************************************************************************************/
        constructor( scene:BABYLON.Scene )
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
        protected abstract createWalls() : BABYLON.Mesh[];

        /** ************************************************************************************************************
        *   Creates and returns all movables this level consists of.
        *
        *   @return All movables of this level.
        ***************************************************************************************************************/
        protected abstract createMovables() : BABYLON.Mesh[];

        /** ************************************************************************************************************
        *   Creates and returns all items this level consists of.
        *
        *   @return All items of this level.
        ***************************************************************************************************************/
        protected abstract createItems() : BABYLON.Mesh[];

        /** ************************************************************************************************************
        *   Creates and returns all bots this level consists of.
        *
        *   @return All bots of this level.
        ***************************************************************************************************************/
        protected abstract createBots() : BABYLON.Mesh[];

        /** ************************************************************************************************************
        *   Sets up the player for the scene.
        ***************************************************************************************************************/
        protected createPlayer() : void
        {
            this.player = new bz.Player( 225.0 );
        }

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
                bz.SettingGame.COLOR_RED_OPAQUE,
                this.scene
            );
            // axis y
            bz.MeshFactory.createLine
            (
                new BABYLON.Vector3( 0.0, 0.0,  0.0 ),
                new BABYLON.Vector3( 0.0, bz.SettingDebug.DEBUG_AXIS_LENGTH, 0.0 ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.SettingGame.COLOR_GREEN_OPAQUE,
                this.scene
            );
            // axis z
            bz.MeshFactory.createLine
            (
                new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                new BABYLON.Vector3( 0.0, 0.0, bz.SettingDebug.DEBUG_AXIS_LENGTH ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.SettingGame.COLOR_BLUE_OPAQUE,
                this.scene
            );
        }

        /** ************************************************************************************************************
        *   Sets up the skybox.
        ***************************************************************************************************************/
        protected setupSkybox() : void
        {
            this.skybox = bz.MeshFactory.createSkyBox( 'bluesky', this.scene );
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
    }

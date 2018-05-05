
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Represents a custom level set.
    *******************************************************************************************************************/
    export class Level
    {
        /** The reference to the babylon.JS Scene. */
        protected       readonly            scene                   :BABYLON.Scene                      = null;
        /** The player instance. */
        protected                           player                  :bz.Player                          = null;

        /** Camera position on level reset. */
        private         readonly            cameraStartupPosition   :BABYLON.Vector3                    = null;
        /** Camera target on level reset. */
        private         readonly            cameraStartupTarget     :BABYLON.Vector3                    = null;
        /** The camera system. */
        public                              cameraSystem            :bz.CameraSystem                    = null;

        /*******************************************************************************************************************
        *   Creates a new custom level.
        *
        *   @param scene                 The babylon.JS scene reference.
        *   @param cameraStartupPosition Initial camera position.
        *   @param cameraStartupTarget   Initial camera target.
        *******************************************************************************************************************/
        constructor( scene:BABYLON.Scene, cameraStartupPosition:BABYLON.Vector3, cameraStartupTarget:BABYLON.Vector3 )
        {
            this.scene                 = scene;
            this.cameraStartupPosition = cameraStartupPosition;
            this.cameraStartupTarget   = cameraStartupTarget;
        }

        /*******************************************************************************************************************
        *   Resets this level.
        *******************************************************************************************************************/
        public reset() : void
        {
            // all about the camera system .. TODO refactor to resetCamera()!

            this.cameraSystem = new bz.CameraSystem
            (
                this.scene,
                this.cameraStartupPosition,
                new BABYLON.Vector3( 20.0, 2 * bz.SettingGame.PLAYER_SIZE_Y, 20.0 ),
                this.cameraStartupTarget
            );

            // lock statinary target camera to player
            this.cameraSystem.lockStationaryTargetCameraTo( this.player.mesh );

            // lock follow camera to player
            this.cameraSystem.lockFollowCameraTo( this.player.mesh );

            // set active scene camera
            this.cameraSystem.setActiveSceneCamera( this.scene, bz.SettingGame.DEFAULT_CAMERA );


        }

        /*******************************************************************************************************************
        *   Renders all level concernings for one tick of the game loop.
        *******************************************************************************************************************/
        public render()
        {
            this.player.handlePlayerKeys();

            this.player.render();
        }

        /***************************************************************************************************************
        *   Sets up the axis orientation test points.
        *
        *   X Y and Z axes are aligned by LEFT HAND RULE.
        ***************************************************************************************************************/
        protected createTestAxisPoints() : void
        {
            // origin

            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 0.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                0.0,
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidBlack,
                this.scene,
                bz.Physics.SENSOR,
                bz.Physicals.MOVABLE
            );

            // x test

            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 5.0, 0.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                0.0,
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidRed,
                this.scene,
                bz.Physics.SENSOR,
                bz.Physicals.MOVABLE
            );
            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 10.0, 0.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 2.5,  0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                0.0,
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidRed,
                this.scene,
                bz.Physics.SENSOR,
                bz.Physicals.MOVABLE
            );

            // y test

            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 5.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                0.0,
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidGreen,
                this.scene,
                bz.Physics.SENSOR,
                bz.Physicals.MOVABLE
            );
            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 10.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 2.5, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                0.0,
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidGreen,
                this.scene,
                bz.Physics.SENSOR,
                bz.Physicals.MOVABLE
            );

            // z test

            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 0.0, 5.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                0.0,
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidBlue,
                this.scene,
                bz.Physics.SENSOR,
                bz.Physicals.MOVABLE
            );
            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 0.0, 10.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 2.5   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                0.0,
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidBlue,
                this.scene,
                bz.Physics.SENSOR,
                bz.Physicals.MOVABLE
            );
        }
    }

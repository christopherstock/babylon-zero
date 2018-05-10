
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Represents a custom level set.
    *******************************************************************************************************************/
    export class Level
    {
        /** The camera system. */
        public                              cameraSystem            :bz.CameraSystem                    = null;
        /** The player instance. */
        public                              player                  :bz.Player                          = null;
        /** The reference to the babylon.JS Scene. */
        protected       readonly            scene                   :BABYLON.Scene                      = null;

        /*******************************************************************************************************************
        *   Creates a new custom level.
        *
        *   @param scene The babylon.JS scene reference.
        *******************************************************************************************************************/
        constructor( scene:BABYLON.Scene )
        {
            this.scene = scene;
        }

        /*******************************************************************************************************************
        *   Resets this level.
        *******************************************************************************************************************/
        public reset() : void
        {
            this.resetCameraSystem();
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
        *   Sets up the player for the scene.
        ***************************************************************************************************************/
        protected createPlayer() : void
        {
            this.player = new bz.Player( 135.0 );
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
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidBlack,
                this.scene,
                bz.Physics.SENSOR,
                bz.PhysicProps.LIGHT_WOOD,
                1.0
            );

            // x test

            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 5.0, 0.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidRed,
                this.scene,
                bz.Physics.SENSOR,
                bz.PhysicProps.LIGHT_WOOD,
                1.0
            );
            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 10.0, 0.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 2.5,  0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidRed,
                this.scene,
                bz.Physics.SENSOR,
                bz.PhysicProps.LIGHT_WOOD,
                1.0
            );

            // y test

            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 5.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidGreen,
                this.scene,
                bz.Physics.SENSOR,
                bz.PhysicProps.LIGHT_WOOD,
                1.0
            );
            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 10.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 2.5, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidGreen,
                this.scene,
                bz.Physics.SENSOR,
                bz.PhysicProps.LIGHT_WOOD,
                1.0
            );

            // z test

            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 0.0, 5.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 0.25   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidBlue,
                this.scene,
                bz.Physics.SENSOR,
                bz.PhysicProps.LIGHT_WOOD,
                1.0
            );
            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 0.0, 10.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 0.25, 0.25, 2.5   ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                bz.Main.game.engine.material.solidBlue,
                this.scene,
                bz.Physics.SENSOR,
                bz.PhysicProps.LIGHT_WOOD,
                1.0
            );
        }

        private resetCameraSystem()
        {
            this.cameraSystem = new bz.CameraSystem
            (
                this.scene,
                new BABYLON.Vector3( 20.0, 5.0, 20.0 ),
                new BABYLON.Vector3( 20.0, 5.0, 20.0 ),
                new BABYLON.Vector3( 0.0,  0.0, 0.0  )
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

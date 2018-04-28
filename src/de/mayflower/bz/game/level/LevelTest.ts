
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Specifies the 'first person' level.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class LevelTest extends bz.Level
    {
        private                                 light1                  :BABYLON.DirectionalLight   = null;

        /***************************************************************************************************************
        *   Sets up the 'bunny' level.
        *
        *   @param scene The babylon.JS scene reference.
        ***************************************************************************************************************/
        constructor( scene:BABYLON.Scene )
        {
            super
            (
                scene,
                new BABYLON.Vector3( 20.0, 2 * bz.SettingGame.PLAYER_SIZE_Y, 20.0 ),
                new BABYLON.Vector3( 0.0,  0.0,   0.0  )
            );

            // this.setupLights();
            this.setupBoxes();
            this.createTestAxisPoints();

            bz.Main.game.onInitLevelCompleted();
        }

        /***************************************************************************************************************
        *   Sets up all lights.
        ***************************************************************************************************************/
        private setupLights()
        {
            //setup lights
            this.light1           = new BABYLON.DirectionalLight( "dir01", new BABYLON.Vector3( 0.0, -1.0, 0.0 ), this.scene );
            this.light1.intensity = 1.0;
            this.light1.position  = new BABYLON.Vector3( 0.0, 0.0, 0.0 );
        }

        /***************************************************************************************************************
        *   Sets up the ground for the scene.
        ***************************************************************************************************************/
        private setupBoxes() : void
        {
            // static ground
            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, -0.001, 0.0  ),
                new BABYLON.Vector3( 40.0, 0.001,  40.0 ),
                0.0,
                new BABYLON.Vector3( 0.0,   0.0,  0.0   ),
                bz.Texture.TEST,
                false,
                null,
                this.scene,
                bz.Physics.STATIC
            );

            // movable crate - small
            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 10.0,  0.0, 10.0   ),
                new BABYLON.Vector3( 1.0, 1.0, 1.0 ),
                0.0,
                new BABYLON.Vector3( 0.0,   0.0,  0.0   ),
                bz.Texture.WOOD,
                false,
                null,
                this.scene,
                bz.Physics.MOVABLE
            );

            // movable crate - big
            bz.MeshFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 10.0,  0.0, 7.0   ),
                new BABYLON.Vector3( 2.0, 2.0, 2.0 ),
                0.0,
                new BABYLON.Vector3( 0.0,   0.0,  0.0   ),
                bz.Texture.WOOD,
                false,
                null,
                this.scene,
                bz.Physics.MOVABLE
            );

            // tree - face 1
            bz.MeshFactory.createBox
            (
                "Tree1",
                new BABYLON.Vector3( 15.0,  0.0, 10.0   ),
                new BABYLON.Vector3( 2.0, 2.0, 0.001 ),
                0.0,
                new BABYLON.Vector3( 0.0,   0.0,  0.0   ),
                bz.Texture.TREE,
                true,
                null,
                this.scene,
                bz.Physics.STATIC
            );

            // tree - face 1
            bz.MeshFactory.createBox
            (
                "Tree1",
                new BABYLON.Vector3( 10.0,  0.0001, 15.0   ),
                new BABYLON.Vector3( 2.0, 0.001, 2.0 ),
                0.0,
                new BABYLON.Vector3( 0.0,   0.0,  0.0   ),
                bz.Texture.TREE,
                true,
                null,
                this.scene,
                bz.Physics.STATIC
            );




        }
    }

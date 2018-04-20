
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Specifies the 'first person' level.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class LevelFirstPerson extends bz.Level
    {
        private                                 light1                  :BABYLON.DirectionalLight   = null;

        /***************************************************************************************************************
        *   Sets up the 'bunny' level.
        ***************************************************************************************************************/
        constructor()
        {
            super
            (
                new BABYLON.Vector3( -10.0, 10.0, -10.0 ),
                new BABYLON.Vector3( 0,     0,    0     ),
                bz.UI.COLOR_DARK_GREY
            );

            this.setupLights();
            this.setupGround();

            bz.Main.game.onInitCompleted();
        }

        /***************************************************************************************************************
        *   Sets up all lights.
        ***************************************************************************************************************/
        private setupLights()
        {
            //setup lights
            this.light1           = new BABYLON.DirectionalLight( "dir01", new BABYLON.Vector3( 0.0, -1.0, 0.0 ), bz.Main.game.scene );
            this.light1.intensity = 1.0;
            this.light1.position  = new BABYLON.Vector3( 0.0, 0.0, 0.0 );
        }

        /***************************************************************************************************************
        *   Sets up the ground for the scene.
        ***************************************************************************************************************/
        private setupGround():void
        {
            bz.SceneFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0,   0.0,  0.0   ),
                10.0,
                0.5,
                10.0,
                new BABYLON.Vector3( 0.0,   0.0,  0.0   ),
                0.0,
                bz.Main.game.material.materialTest1,
                bz.Main.game.scene
            );
        }
    }

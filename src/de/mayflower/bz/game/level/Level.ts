
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Represents a custom level set.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Level
    {
        /** The reference to the babylon.JS Scene. */
        protected       readonly            scene                   :BABYLON.Scene                      = null;

        /** Camera position on level reset. */
        private         readonly            cameraStartupPosition   :BABYLON.Vector3                    = null;
        /** Camera target on level reset. */
        private         readonly            cameraStartupTarget     :BABYLON.Vector3                    = null;

        /** The camera system. */
        private                             camera                  :bz.Camera                          = null;

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
            // recreate camera system
            this.camera = new bz.Camera
            (
                this.scene,
                this.cameraStartupPosition,
                this.cameraStartupTarget
            );



        }

        /***************************************************************************************************************
        *   Sets up the axis orientation test points.
        *
        *   X Y and Z axes are aligned by LEFT HAND RULE.
        ***************************************************************************************************************/
        protected createTestAxisPoints() : void
        {
            // origin

            bz.FactoryMesh.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 0.0, 0.0   ),
                new BABYLON.Vector3( 0.5, 0.5, 0.5   ),
                0.0,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Main.game.engine.material.solidBlack,
                this.scene,
                bz.Static.YES
            );

            // x test

            bz.FactoryMesh.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 5.0, 0.0, 0.0   ),
                new BABYLON.Vector3( 0.5, 0.5, 0.5   ),
                0.0,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Main.game.engine.material.solidRed,
                this.scene,
                bz.Static.YES
            );
            bz.FactoryMesh.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 10.0, 0.0, 0.0   ),
                new BABYLON.Vector3( 2.5,  0.5, 0.5   ),
                0.0,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Main.game.engine.material.solidRed,
                this.scene,
                bz.Static.YES
            );

            // y test

            bz.FactoryMesh.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 5.0, 0.0   ),
                new BABYLON.Vector3( 0.5, 0.5, 0.5   ),
                0.0,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Main.game.engine.material.solidGreen,
                this.scene,
                bz.Static.YES
            );
            bz.FactoryMesh.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 10.0, 0.0   ),
                new BABYLON.Vector3( 0.5, 2.5, 0.5   ),
                0.0,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Main.game.engine.material.solidGreen,
                this.scene,
                bz.Static.YES
            );

            // z test

            bz.FactoryMesh.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 0.0, 5.0   ),
                new BABYLON.Vector3( 0.5, 0.5, 0.5   ),
                0.0,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Main.game.engine.material.solidBlue,
                this.scene,
                bz.Static.YES
            );
            bz.FactoryMesh.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0, 0.0, 10.0   ),
                new BABYLON.Vector3( 0.5, 0.5, 2.5   ),
                0.0,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Main.game.engine.material.solidBlue,
                this.scene,
                bz.Static.YES
            );
        }
    }

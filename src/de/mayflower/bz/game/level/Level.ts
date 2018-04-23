
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
    }

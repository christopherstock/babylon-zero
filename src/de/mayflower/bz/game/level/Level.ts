
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Represents a custom level set.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Level
    {
        /** Camera position on level reset. */
        private         readonly            cameraStartupPosition   :BABYLON.Vector3                    = null;

        /** Camera target on level reset. */
        private         readonly            cameraStartupTarget     :BABYLON.Vector3                    = null;

        /** The camera system. */
        private                             camera                  :bz.Camera                          = null;

        /*******************************************************************************************************************
        *   Creates a new custom level.
        *******************************************************************************************************************/
        constructor( cameraStartupPosition:BABYLON.Vector3, cameraStartupTarget:BABYLON.Vector3 )
        {
            this.cameraStartupPosition = cameraStartupPosition;
            this.cameraStartupTarget   = cameraStartupTarget;
        }

        /*******************************************************************************************************************
        *   Resets this level.
        *******************************************************************************************************************/
        public reset() : void
        {
            // create camera system
            this.camera = new bz.Camera
            (
                this.cameraStartupPosition,
                this.cameraStartupTarget
            );







        }
    }

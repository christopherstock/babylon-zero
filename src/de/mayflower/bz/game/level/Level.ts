
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
            // reset camera to startup position
            bz.Main.game.engine.camera.init( this.cameraStartupPosition, this.cameraStartupTarget );


        }
    }

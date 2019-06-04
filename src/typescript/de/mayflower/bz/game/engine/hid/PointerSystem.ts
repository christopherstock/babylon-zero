
    import * as bz      from '../../..';

    /** ****************************************************************************************************************
    *   Offers default pointer handling for one specific stage.
    *   This is currently just an implementation for physical debug purposes!
    *******************************************************************************************************************/
    export class PointerSystem
    {
        /** The canvas this pointer system operates on. */
        private             readonly            canvas              :bz.CanvasSystem                    = null;

        /** The stage this pointer system operates on. */
        private             readonly            stage               :bz.Stage                           = null;

        /** ************************************************************************************************************
        *   Creates a new Pointer System.
        *
        *   @param stage             The stage  this pointer system operates on.
        *   @param canvas            The canvas this pointer system operates on.
        *   @param assignPointerDown Specifies if a pointerDown event shall be assigned to the babylon.JS scene.
        ***************************************************************************************************************/
        public constructor
        (
            stage             :bz.Stage,
            canvas            :bz.CanvasSystem,
            assignPointerDown :boolean
        )
        {
            this.stage  = stage;
            this.canvas = canvas;

            // assign or remove pointer callback
            this.stage.getScene().onPointerDown = ( assignPointerDown ? this.onPointerDown : null );
        }

        /** ************************************************************************************************************
        *   Sets up and defines the pointer callback.
        *
        *   @param evt        The pointer event being propagated by the system.
        *   @param pickResult More information about the location of the 3D space where the pointer is down.
        ***************************************************************************************************************/
        public onPointerDown = ( evt:PointerEvent, pickResult:BABYLON.PickingInfo ) : void =>
        {
            // check if a result is picked and if the stage is present
            if ( pickResult.hit && this.stage != null )
            {
                let src :BABYLON.Vector3 = null;

                // horrible debug implementation
                if
                (
                        this.stage.getCameraSystem().isFirstPersonCameraActive()
                    &&  this.stage.getPlayer() != null
                )
                {
                    src = this.stage.getPlayer().getThirdPersonCameraTargetMesh().position;
                }
                else
                {
                    src = this.stage.getCameraSystem().getActiveCamera().position;
                }

                const dir:BABYLON.Vector3 = pickResult.pickedPoint.subtract( src );
                dir.normalize();

                // horrible debug implementation
                if
                (
                        pickResult.pickedMesh                             != null
                    &&  pickResult.pickedMesh.physicsImpostor             != null
                    &&  pickResult.pickedMesh.physicsImpostor.physicsBody != null
                )
                {
                    pickResult.pickedMesh.applyImpulse( dir.scale( 10 ), pickResult.pickedPoint );
                }
            }
        };
    }

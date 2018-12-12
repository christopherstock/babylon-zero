
    import * as BABYLON from 'babylonjs';
    import * as bz      from '../../..';

    /** ****************************************************************************************************************
    *   Offers default pointer handling for one specific stage.
    *   This is currently just an implementation for physical debug purposes!
    *******************************************************************************************************************/
    export class PointerSystem
    {
        /** The stage this pointer system operates on. */
        private             readonly            stage               :bz.Stage                           = null;

        /** ************************************************************************************************************
        *   Creates a new Pointer System.
        *
        *   @param stage The stage this pointer system operates on.
        ***************************************************************************************************************/
        public constructor( stage:bz.Stage )
        {
            this.stage = stage;
        }

        /** ************************************************************************************************************
        *   Being invoked when the pointer is down on this stage.
        *
        *   @param evt        The pointer event being propagated by the system.
        *   @param pickResult More information about the location of the 3D space where the pointer is down.
        ***************************************************************************************************************/
        public defaultPointerDown( evt:PointerEvent, pickResult:BABYLON.PickingInfo ) : void
        {
            if ( pickResult.hit )
            {
                let src :BABYLON.Vector3 = null;

                // horrible debug implementation
                if
                (
                        this.stage != null
                    &&  this.stage.getCameraSystem().isFirstPersonCameraActive()
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
        }
    }

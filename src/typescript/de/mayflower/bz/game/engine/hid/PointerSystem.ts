
    import * as BABYLON from 'babylonjs';
    import * as bz      from '../../..';

    /** ****************************************************************************************************************
    *   Offers default pointer handling methods.
    *
    *   This is currently just an implementation for physical debug purposes!
    *******************************************************************************************************************/
    export class PointerSystem
    {
        /** The native babylon.JS scene. */
        private                 scene           :BABYLON.Scene                      = null;

        /** ************************************************************************************************************
        *   Creates a new Pointer System.
        *
        *   @param scene The native babylon.JS scene to create this pointer system for.
        ***************************************************************************************************************/
        public constructor( scene:BABYLON.Scene )
        {
            this.scene = scene;
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
                let stage :bz.Stage        = bz.Main.game.getStage();
                let src   :BABYLON.Vector3 = null;

                // horrible debug implementation
                if
                (
                        stage != null
                    &&  stage.getCameraSystem().isFirstPersonCameraActive()
                    &&  stage.getPlayer() != null
                )
                {
                    src = stage.getPlayer().getThirdPersonCameraTargetMesh().position;
                }
                else
                {
                    src = this.scene.activeCamera.position;
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

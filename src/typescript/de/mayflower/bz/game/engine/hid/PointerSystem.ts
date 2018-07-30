
    import * as BABYLON from 'babylonjs';
    import * as bz      from '../../..';

    /** ****************************************************************************************************************
    *   The pointer system that manages all pointer operations.
    *
    *   This is currently just an implementation for physical debug purposes!
    *******************************************************************************************************************/
    export class PointerSystem
    {
        /** ************************************************************************************************************
        *   Being invoked when the pointer is down.
        *
        *   @param evt        The pointer event being propagated by the system.
        *   @param pickResult More information about the location of the 3D space where the pointer is down.
        ***************************************************************************************************************/
        public assignPointerDown( evt:PointerEvent, pickResult:BABYLON.PickingInfo ) : void
        {
            if ( pickResult.hit )
            {
                let src:BABYLON.Vector3 = null;

                // horrible debug implementation
                if
                (
                        bz.Main.game.stage != null
                    &&  bz.Main.game.stage.getCameraSystem().isFirstPersonCameraActive()
                    &&  bz.Main.game.stage.getPlayer() != null
                )
                {
                    src = bz.Main.game.stage.getPlayer().getThirdPersonCameraTargetMesh().position;
                }
                else
                {
                    src = bz.Main.game.engine.scene.getScene().activeCamera.position;
                }

                const dir:BABYLON.Vector3 = pickResult.pickedPoint.subtract( src );
                dir.normalize();
                pickResult.pickedMesh.applyImpulse( dir.scale( 10 ), pickResult.pickedPoint );
            }
        }
    }
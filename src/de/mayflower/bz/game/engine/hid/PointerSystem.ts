
    import * as bz from '../../..';
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   Pointer controls.
    *******************************************************************************************************************/
    export class PointerSystem
    {
        public assignPointerDown( evt, pickResult:BABYLON.PickingInfo )
        {
            if ( pickResult.hit )
            {
                let src:BABYLON.Vector3 = null;

                if ( bz.Main.game.level.cameraSystem.isFirstPersonCameraActive() )
                {
                    src = bz.Main.game.level.player.getThirdPersonCameraTargetMesh().position;
                }
                else
                {
                    src = bz.Main.game.engine.scene.getScene().activeCamera.position;
                }

                let dir = pickResult.pickedPoint.subtract( src );
                dir.normalize();
                pickResult.pickedMesh.applyImpulse( dir.scale( 10 ), pickResult.pickedPoint );


                // this.mesh.applyImpulse( new BABYLON.Vector3( -SPEED_MOVING, 0.0, 0.0 ), this.mesh.position );
            }
        }
    }

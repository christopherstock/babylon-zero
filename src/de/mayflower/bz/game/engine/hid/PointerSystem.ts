
    import * as bz from '../../..';

    /*******************************************************************************************************************
    *   Pointer controls.
    *******************************************************************************************************************/
    export class PointerSystem
    {
        public assignPointerDown( evt, pickResult )
        {
            if ( pickResult.hit )
            {
                let dir = pickResult.pickedPoint.subtract
                (
                    bz.Main.game.engine.scene.getScene().activeCamera.position
                );
                dir.normalize();
                pickResult.pickedMesh.applyImpulse( dir.scale( 10 ), pickResult.pickedPoint );


                // this.mesh.applyImpulse( new BABYLON.Vector3( -SPEED_MOVING, 0.0, 0.0 ), this.mesh.position );
            }
        }
    }

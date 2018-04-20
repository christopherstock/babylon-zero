
    import * as bz from '../../..';

    /*******************************************************************************************************************
    *   Pointer controls.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Pointer
    {
        public assignPointerDown( evt, pickResult )
        {
            if ( pickResult.hit )
            {
                let dir = pickResult.pickedPoint.subtract( bz.Main.game.engine.scene.babylonScene.activeCamera.position );
                dir.normalize();
                pickResult.pickedMesh.applyImpulse(dir.scale(10), pickResult.pickedPoint);
            }
        }
    }

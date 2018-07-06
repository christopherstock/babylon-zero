
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   The parent class of all game objects.
    *******************************************************************************************************************/
    export abstract class GameObject
    {
        /** All meshes this game object consists of. */
        protected           readonly        model                  :bz.Model                    = null;

        /** ************************************************************************************************************
        *   Creates a new game object.
        *
        *   @param model The model for this game object.
        ***************************************************************************************************************/
        protected constructor( model:bz.Model )
        {
            this.model = model;
        }

        /** ************************************************************************************************************
        *   Returns the model of this game object.
        *
        *   @return model The physical representation of this game object.
        ***************************************************************************************************************/
        public getModel() : bz.Model
        {
            return this.model;
        }

        /** ************************************************************************************************************
        *   Renders one tick of the game loop for this game object.
        ***************************************************************************************************************/
        public render() : void
        {
        }

        /** ************************************************************************************************************
        *   Disposes the model of this game object.
        ***************************************************************************************************************/
        public dispose() : void
        {
            this.model.dispose();
        }

        /** ************************************************************************************************************
        *   Sets visibility for all meshes of this game object.
        *   Invisible game objects become non pickable.
        *
        *   @param visible The new visibility for this game object.
        ***************************************************************************************************************/
        public setVisible( visible:boolean ) : void
        {
            for ( const mesh of this.model.getMeshes() )
            {
                mesh.isVisible  = visible;
                mesh.isPickable = visible;
            }
        }

        /** ************************************************************************************************************
        *   Applies a shot onto this game object.
        *
        *   @param ray The shot ray to apply.
        ***************************************************************************************************************/
        public applyShot( ray:BABYLON.Ray ) : void
        {
            const pickingInfos:BABYLON.PickingInfo[] = ray.intersectsMeshes( this.getModel().getMeshes() );

            if ( pickingInfos.length > 0 )
            {
                bz.Debug.fire.log( '  [' + pickingInfos.length + '] collision detected on game object.' );

                for ( const pickingInfo of pickingInfos )
                {
                    // console.log( pickingInfos );

                    const pickedPoint :BABYLON.Vector3      = pickingInfo.pickedPoint;
                    const pickedMesh  :BABYLON.AbstractMesh = pickingInfo.pickedMesh;

                    this.appendBulletHole( pickedPoint, pickedMesh );
                }
            }
        }

        /** ************************************************************************************************************
        *   Applies a bullet hole onto this game object.
        *
        *   @param hitPoint The collision point where the bullet hole shall occur.
        *   @param hitMesh  The mesh that carried this collision point.
        ***************************************************************************************************************/
        private appendBulletHole( hitPoint:BABYLON.Vector3, hitMesh:BABYLON.AbstractMesh ) : void
        {
            // pick the hitpoint delta to the carrying mesh
            const hitPointDelta:BABYLON.Vector3 = hitPoint.subtract( hitMesh.absolutePosition );

            // add debug hitpoint
            if ( bz.SettingDebug.SHOW_SHOT_DEBUG_LINES_AND_COLLISIONS )
            {
                // create debug hitpoint
                const debugBulletHole:BABYLON.Mesh = bz.MeshFactory.createSphere
                (
                    hitPointDelta,
                    bz.MeshPivotAnchor.CENTER_XYZ,
                    0.10,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    null,
                    bz.SettingColor.COLOR_RGB_ORANGE,
                    bz.Main.game.engine.scene.getScene(),
                    bz.Physic.NONE,
                    1.0,
                    bz.SettingColor.COLOR_RGB_ORANGE // this.ambientColor
                );

                // stick to game object
                debugBulletHole.parent = hitMesh;

                // add to debug meshes array
                bz.Main.game.stage.debugMeshes.push( debugBulletHole );
            }
        }
    }

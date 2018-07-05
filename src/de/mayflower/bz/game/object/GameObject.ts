
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
                    const pickingPoint:BABYLON.Vector3 = pickingInfo.pickedPoint;

                    // console.log( pickingInfos );

                    // add debug hitpoint to stage
                    if ( bz.SettingDebug.SHOW_SHOT_DEBUG_LINES_AND_COLLISIONS )
                    {
                        bz.Main.game.stage.debugMeshes.push
                        (
                            bz.MeshFactory.createSphere
                            (
                                pickingPoint,
                                bz.MeshPivotAnchor.CENTER_XYZ,
                                0.10,
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                null,
                                bz.SettingColor.COLOR_RGB_ORANGE,
                                bz.Main.game.engine.scene.getScene(),
                                bz.Physic.NONE,
                                1.0,
                                bz.SettingColor.COLOR_RGB_ORANGE // this.ambientColor
                            )
                        );
                    }
                }
            }
        }
    }

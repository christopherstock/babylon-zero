
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   The parent class of all game objects.
    *******************************************************************************************************************/
    export abstract class GameObject
    {
        /** All bullet holes that are sticked to this game object. */
        public              readonly        bulletHoles             :bz.BulletHole[]            = null;

        /** All meshes this game object consists of. */
        protected           readonly        model                   :bz.Model                   = null;

        /** ************************************************************************************************************
        *   Creates a new game object.
        *
        *   @param model The model for this game object.
        ***************************************************************************************************************/
        protected constructor( model:bz.Model )
        {
            this.model       = model;
            this.bulletHoles = []
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

            for ( const bulletHole of this.bulletHoles )
            {
                bulletHole.dispose();
            }
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
        *   Applies a shot onto this game object and returns all occurred hit points.
        *
        *   @param ray The shot ray to apply.
        *
        *   @return All hit points being hit in this game object.
        ***************************************************************************************************************/
        public applyShot( ray:BABYLON.Ray ) : bz.HitPoint[]
        {
            const hitPoints    :bz.HitPoint[]         = [];
            const pickingInfos :BABYLON.PickingInfo[] = ray.intersectsMeshes( this.getModel().getMeshes() );

            if ( pickingInfos.length > 0 )
            {
                bz.Debug.fire.log( '  [' + pickingInfos.length + '] collision detected on game object.' );

                for ( const pickingInfo of pickingInfos )
                {
                    hitPoints.push
                    (
                        new bz.HitPoint
                        (
                            this,
                            pickingInfo.pickedPoint,
                            pickingInfo.pickedMesh,
                            pickingInfo.distance,
                            pickingInfo.getNormal( true ),
                            ray.direction
                        )
                    );
                }
            }

            return hitPoints;
        }
    }

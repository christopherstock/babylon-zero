
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   The parent class of all game objects.
    *******************************************************************************************************************/
    export abstract class GameObject
    {
        /** An energy amount that represents that this will is unbreakable. */
        public      static  readonly        UNBREAKABLE                 :number                         = -1;

        /** All meshes this game object consists of. */
        protected           readonly        model                       :bz.Model                       = null;
        /** The initial energy of this wall. */
        private             readonly        initialEnergy               :number                         = 0;

        /** The current energy of this wall. */
        private                             energy                      :number                         = 0;
        /** Flags if this wall is broken. */
        private                             destroyed                   :boolean                        = false;
        /** The next z-index for the bullet hole to assign. */
        private                             nextBulletHoleZIndex        :number                         = 0;

        /** ************************************************************************************************************
        *   Creates a new game object.
        *
        *   @param model  The model for this game object.
        *   @param energy The initial energy of this game object.
        ***************************************************************************************************************/
        protected constructor( model:bz.Model, energy:number )
        {
            this.model         = model;
            this.initialEnergy = energy;
            this.energy        = energy;
        }

        /** ************************************************************************************************************
        *   Returns the next z-index for the next bullet hole to append onto this mesh.
        *   The internal index is increased by one in this step.
        *
        *   @return The z-index for the next bullet hole to append onto this mesh.
        ***************************************************************************************************************/
        public getNextBulletHoleIndexZ() : number
        {
            return this.nextBulletHoleZIndex++;
        }

        /** ************************************************************************************************************
        *   Returns the model of this game object.
        *
        *   @return The physical representation of this game object.
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
        *   Sets visibility for the model of this game object.
        *
        *   @param visible The new visibility for this game object.
        ***************************************************************************************************************/
        public setVisible( visible:boolean ) : void
        {
            this.model.setVisible( visible );
        }

        /** ************************************************************************************************************
        *   Applies a shot onto this game object and returns all occurred hit points.
        *
        *   @param shot The shot to apply onto this wall.
        *
        *   @return All hit points being hit in this game object.
        ***************************************************************************************************************/
        public determineHitPoints( shot:bz.Shot ) : bz.HitPoint[]
        {
            const hitPoints    :bz.HitPoint[]         = [];
            const pickingInfos :BABYLON.PickingInfo[] = this.getModel().applyRayCollision( shot.getRay() );

            if ( pickingInfos.length > 0 )
            {
                bz.Debug.fire.log( '  [' + pickingInfos.length + '] collision detected on game object.' );

                for ( const pickingInfo of pickingInfos )
                {
                    hitPoints.push
                    (
                        new bz.HitPoint
                        (
                            pickingInfo.pickedPoint,
                            pickingInfo.pickedMesh,
                            pickingInfo.getNormal( true ),
                            pickingInfo.distance,
                            shot.getRay().direction,
                            this
                        )
                    );
                }
            }

            return hitPoints;
        }

        /** ************************************************************************************************************
        *   Being invoked when this game object is hurt by a shot or any other impact source.
        *
        *   @param damage The damage to apply onto this game object.
        ***************************************************************************************************************/
        public hurt( damage:number ) : void
        {
            // exit if unbreakable
            if ( this.energy === GameObject.UNBREAKABLE )
            {
                bz.Debug.fire.log( 'Object is unbreakable.' );
                return;
            }

            // exit if already destroyed
            if ( this.destroyed )
            {
                bz.Debug.fire.log( 'Object is already destroyed.' );
                return;
            }

            // exit if no damage occurred
            if ( damage === 0 )
            {
                bz.Debug.fire.log( 'No damage to apply onto this object.' );
                return;
            }

            // lower energy
            this.energy -= damage;
            bz.Debug.fire.log( 'Object got hurt with [' + damage + '] damage - new energy is [' + this.energy + ']' );

            // clip lowest energy value
            if ( this.energy <= 0 )
            {
                this.energy = 0;
            }

            // try mesh face darkening
            this.model.darkenMeshes( ( damage / this.initialEnergy ) );

            // check if the object is destoyed now
            if ( this.energy === 0 )
            {
                // flag as destroyed
                this.destroyed = true;
                bz.Debug.fire.log( 'Object is destroyed.' );

                // scatter the model
                this.model.removeCompoundMesh( bz.Main.game.engine.scene.getScene() );
            }
        }
    }


    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a static OR movable wall object.
    *******************************************************************************************************************/
    export class Wall extends bz.GameObject
    {
        /** ************************************************************************************************************
        *   Creates a new wall instance.
        *
        *   @param model  The model that represents this wall.
        *   @param energy The initial energy of this wall.
        ***************************************************************************************************************/
        public constructor( model:bz.Model, energy:number = Wall.UNBREAKABLE )
        {
            super( model, energy );
        }

        /** ************************************************************************************************************
        *   Renders one tick of the game loop for this game object.
        ***************************************************************************************************************/
        public render() : void
        {
            // lower velocities for sphere impostered meshes
            this.getModel().lowerSphereVelocities();
        }
    }

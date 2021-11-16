import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a static OR movable wall object.
***********************************************************************************************************************/
export class Wall extends bz.GameObject
{
    // TODO multiple!
    public readonly interactionEvent :bz.Event = null;

    /** ****************************************************************************************************************
    *   Creates a new wall instance.
    *
    *   @param stage       The stage this wall belongs to.
    *   @param model       The model that represents this wall.
    *   @param energy      The initial energy of this wall.
    *   @param interactionEvent Optional - specifies possible interactions with this wall.
    *******************************************************************************************************************/
    public constructor(
        stage            :bz.Stage,
        model            :bz.Model,
        energy           :number   = Wall.UNBREAKABLE,
        interactionEvent :bz.Event = null
    ) {
        super( stage, model, energy );

        this.interactionEvent = interactionEvent;
    }

    /** ****************************************************************************************************************
    *   Renders one tick of the game loop for this game object.
    *******************************************************************************************************************/
    public render() : void
    {
        // lower velocities for sphere impostered meshes
        this.getModel().mitigateSphereVelocities();
    }
}

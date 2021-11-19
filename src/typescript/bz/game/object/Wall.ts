import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a static OR movable wall object.
***********************************************************************************************************************/
export class Wall extends bz.GameObject
{
    public readonly interactionType   :bz.InteractionType = null;
    public readonly interactionEvents :bz.Event[]         = null;

    public alreadyInteractedwith :boolean = false;

    /** ****************************************************************************************************************
    *   Creates a new wall instance.
    *
    *   @param stage             The stage this wall belongs to.
    *   @param model             The model that represents this wall.
    *   @param energy            The initial energy of this wall.
    *   @param interactionEvents Possible interactions with this wall.
    *   @param interactionType   Type of wall interaction.
    *******************************************************************************************************************/
    public constructor(
        stage             :bz.Stage,
        model             :bz.Model,
        energy            :number             = bz.GameObject.UNBREAKABLE,
        interactionEvents :bz.Event[]         = null,
        interactionType   :bz.InteractionType = null
    ) {
        super( stage, model, energy );

        this.interactionEvents = interactionEvents;
        this.interactionType   = interactionType;
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

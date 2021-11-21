import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a static OR movable wall object.
***********************************************************************************************************************/
export class Wall extends bz.GameObject
{
    private readonly interactionType       :bz.InteractionType = null;
    private readonly interactionEvents     :bz.Event[]         = null;

    private         alreadyInteractedWith :boolean            = false;

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
        stage                    :bz.Stage,
        model                    :bz.Model,
        energy                   :number             = bz.GameObject.UNBREAKABLE,
        darkenMeshesOnEnergyLoss :boolean            = true,
        splitHitMeshOnEnergyLoss :boolean            = false,
        interactionEvents        :bz.Event[]         = null,
        interactionType          :bz.InteractionType = bz.InteractionType.ONCE
    ) {
        super( stage, model, energy, darkenMeshesOnEnergyLoss, splitHitMeshOnEnergyLoss );

        this.interactionEvents = interactionEvents;
        this.interactionType   = interactionType;
    }

    /** ****************************************************************************************************************
    *   Renders one tick of the game loop for this wall.
    *******************************************************************************************************************/
    public render() : void
    {
        // lower velocities for sphere impostered meshes
        this.getModel().mitigateSphereVelocities();
    }

    public performInteraction( stage:bz.Stage ) : void
    {
        if (
            this.interactionEvents !== null
            && !(
                this.interactionType === bz.InteractionType.ONCE
                && this.alreadyInteractedWith
            )
        )
        {
            this.alreadyInteractedWith = true;

            stage.addEventsToPipeline( this.interactionEvents );
        }
    }

    public hasInteractionEvents() : boolean
    {
        return ( this.interactionEvents !== null );
    }
}

/** ********************************************************************************************************************
*   Represents one Player inventory.
***********************************************************************************************************************/
export class Inventory
{
    /** Number of painkillers carried by the player. */
    public numberOfPainkillers :number = 0;

    /** ****************************************************************************************************************
    *   Creates a new Player inventory.
    *
    *   @param numberOfPainkillers The number of painkillers in this inventory.
    *******************************************************************************************************************/
    public constructor(
        numberOfPainkillers :number = 0
    )
    {
        this.numberOfPainkillers = numberOfPainkillers;
    }
}

/** ********************************************************************************************************************
*   Represents one Player inventory.
***********************************************************************************************************************/
export class Inventory
{
    /** Number of painkillers carried by the player. */
    public numberOfPainkillers :number = 0;

    public constructor(
        numberOfPainkillers :number = 0
    )
    {
        this.numberOfPainkillers = numberOfPainkillers;
    }
}

import * as bz from '../../..';

/** ********************************************************************************************************************
*   Configuration set for a Door game object.
***********************************************************************************************************************/
export class DoorData
{
    public position         :number           = 0;
    public events           :bz.Event[]       = [];
    public animation        :bz.DoorAnimation = null;
    public noBody           :boolean          = false;
    public texture          :bz.TextureFile   = null;
    public linkedDoorIndex  :number           = -1;
    public reverseTextureX  :boolean          = false;

    /** ****************************************************************************************************************
    *   Creates one door config.
    *******************************************************************************************************************/
    public constructor(
        position  :number,
        events    :bz.Event[]       = [],
        animation :bz.DoorAnimation = bz.DoorAnimation.NONE,
        noBody    :boolean          = false,
        texture   :bz.TextureFile   = bz.TextureFile.WALL_DOOR_INDUSTRIAL,
        linkedDoorIndex :number = -1,
        reverseTextureX :boolean = false
    )
    {
        this.position  = position;
        this.events    = events;
        this.animation = animation;
        this.noBody    = noBody;
        this.texture   = texture;
        this.linkedDoorIndex = linkedDoorIndex;
        this.reverseTextureX = reverseTextureX;
    }
}

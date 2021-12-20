import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies all adjustments and balancings for the player 'shotgun' wearpon.
*   Different wearpons will require different values here.
***********************************************************************************************************************/
export abstract class SettingWearpon
{
    public static readonly SHOTGUN_NOISE_X           :number = 0.05;
    public static readonly SHOTGUN_NOISE_Y           :number = 0.05;
    public static readonly SHOTGUN_MAX_ROT_X         :number = 12.5;
    public static readonly SHOTGUN_MAX_ROT_Y         :number = 10.0;
    public static readonly SHOTGUN_ROT_SPEED_X       :number = 0.20;
    public static readonly SHOTGUN_ROT_SPEED_Y       :number = 0.20;
    public static readonly SHOTGUN_CENTER_SPEED      :number = 1.00;
    public static readonly SHOTGUN_LOWER_SIZE_Y      :number = 0.07;
    public static readonly SHOTGUN_LOWER_ROT_SPEED_X :number = 3.0;
    public static readonly SHOTGUN_RAISE_ROT_SPEED_X :number = 1.5;

    public static readonly SHOTGUN_MUZZLE_FLASH_ROTATION :number = 60.0;
    public static readonly SHOTGUN_MUZZLE_FLASH_WIDTH    :number = 1.75;
    public static readonly SHOTGUN_MUZZLE_FLASH_HEIGHT   :number = 1.75;

    /** Distance from player position (head) to muzzle flash. */
    public static readonly SHOTGUN_MUZZLE_FLASH_OFFSET   :BABYLON.Vector3 = new BABYLON.Vector3( 0.65, -0.20, 3.20 );
}

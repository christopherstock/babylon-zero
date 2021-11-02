/* eslint-disable max-len */

import * as bz from '../..';

/** ****************************************************************************************************************
*   Specifies all global settings for the stages.
*******************************************************************************************************************/
export class SettingStage
{
    /** The stage the application starts up with. TODO to SettingGame ! */
    public  static  readonly    STAGE_STARTUP                           :bz.StageId         = bz.StageId.OFFICE;

    /** The global scene gravity. TODO to SettingPhysic ! */
    public  static  readonly    STAGE_GRAVITY_GLOBAL                    :BABYLON.Vector3    = new BABYLON.Vector3( 0, -7.5, 0 );
}

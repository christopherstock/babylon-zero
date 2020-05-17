
    /* eslint-disable max-len */

    import * as bz from '../../index';

    /** ****************************************************************************************************************
    *   Specifies all global settings for the stages.
    *******************************************************************************************************************/
    export class SettingStage
    {
        /** The stage the application starts up with. */
        public  static  readonly    STAGE_STARTUP                           :bz.StageId         = bz.StageId.TEST_LEVEL;

        /** The global scene gravity. */
        public  static  readonly    STAGE_GRAVITY_GLOBAL                    :BABYLON.Vector3    = new BABYLON.Vector3( 0, -7.5, 0 );
    }

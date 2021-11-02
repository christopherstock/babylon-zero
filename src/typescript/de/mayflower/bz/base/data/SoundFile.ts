/* eslint-disable max-len */

import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies the filenames of all sounds to load.
***********************************************************************************************************************/
export abstract class SoundFile
{
    /** The fx sound 'test 1'. */
    public      static  readonly    TEST_FX_1                               :string     = bz.SettingResource.PATH_SOUND_FX + 'test1.mp3';
    /** The bg sound 'test 1'. */
    public      static  readonly    TEST_BG_1                               :string     = bz.SettingResource.PATH_SOUND_BG + 'test1.mp3';
    /** The bg sound 'Stone Age - The golden valley'. */
    public      static  readonly    TEST_BG_STONE_AGE_THE_GOLDEN_VALLEY     :string     = bz.SettingResource.PATH_SOUND_BG + 'stoneAgeTheGoldenValley.mp3';

    /** All filenames of all sounds to load. */
    public      static  readonly    ALL_SOUND_FILES                         :string[]   =
    [
        SoundFile.TEST_FX_1,
        SoundFile.TEST_BG_1,
        SoundFile.TEST_BG_STONE_AGE_THE_GOLDEN_VALLEY,
    ];
}

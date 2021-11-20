import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies the filenames of all sounds to load.
***********************************************************************************************************************/
export abstract class SoundFile
{
    public static readonly TEST_FX_1        :string     = bz.SettingResource.PATH_SOUND_FX + 'test1.mp3';
    public static readonly TEST_BG_1        :string     = bz.SettingResource.PATH_SOUND_BG + 'test1.mp3';

    /** All filenames of all sounds to load. */
    public static readonly ALL_SOUND_FILES  :string[]   =
    [
        SoundFile.TEST_FX_1,
        SoundFile.TEST_BG_1,
    ];
}

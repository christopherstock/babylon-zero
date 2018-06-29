
    import * as bz from '..';

    /** ****************************************************************************************************************
    *   Specifies the filenames of all sounds to load.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export abstract class Sound
    {
        /** The fx sound 'test 1'. */
        public      static      TEST_FX_1                               :string     = bz.SettingEngine.PATH_SOUND_FX + 'test1.mp3';
        /** The bg sound 'test 1'. */
        public      static      TEST_BG_1                               :string     = bz.SettingEngine.PATH_SOUND_BG + 'test1.mp3';
        /** The bg sound 'Stone Age - The golden valley'. */
        public      static      TEST_BG_STONE_AGE_THE_GOLDEN_VALLEY     :string     = bz.SettingEngine.PATH_SOUND_BG + 'stoneAgeTheGoldenValley.mp3';

        /** All filenames of all sounds to load. */
        public      static      ALL_SOUND_FILES                         :string[]   =
        [
            Sound.TEST_FX_1,
            Sound.TEST_BG_1,
            Sound.TEST_BG_STONE_AGE_THE_GOLDEN_VALLEY,
        ];
    }

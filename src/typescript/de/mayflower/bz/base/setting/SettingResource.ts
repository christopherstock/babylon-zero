
    /** ****************************************************************************************************************
    *   Specifies all settings for any file and memory resources the application imports.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SettingResource
    {
        /** The relative path from index.html where all loading images reside. */
        public  static  readonly    PATH_IMAGE_LOADING                      :string             = 'res/image/loading/';
        /** The relative path from index.html where all texture images reside. */
        public  static  readonly    PATH_IMAGE_TEXTURE                      :string             = 'res/image/texture/';
        /** The relative path from index.html where all sprite images reside. */
        public  static  readonly    PATH_IMAGE_SPRITE                       :string             = 'res/image/sprite/';
        /** The relative path from index.html where all skybox images reside. */
        public  static  readonly    PATH_IMAGE_SKYBOX                       :string             = 'res/image/skybox/';
        /** The relative path from index.html where all GUI images reside. */
        public  static  readonly    PATH_IMAGE_GUI                          :string             = 'res/image/gui/';
        /** The relative path from index.html where all favicons reside. */
        public  static  readonly    PATH_IMAGE_FAVICON                      :string             = 'res/image/favicon/';

        /** The relative path from index.html where all effect sounds the app makes use of reside. */
        public  static  readonly    PATH_SOUND_FX                           :string             = 'res/sound/fx/';
        /** The relative path from index.html where all background sounds the app makes use of reside. */
        public  static  readonly    PATH_SOUND_BG                           :string             = 'res/sound/bg/';

        /** The relative path from index.html where all 3d model files the app makes use of reside. */
        public  static  readonly    PATH_MODEL                              :string             = 'res/model/';

        /** Maximum instances of concurrent sprites. */
        public  static  readonly    MAX_SPRITE_INSTANCES                    :number             = 255;
        /** Maximum instances of bullet holes in one stage. */
        public  static  readonly    MAX_BULLET_HOLES                        :number             = 255;
    }

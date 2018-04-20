
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Specifies all settings for the engine.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class SettingEngine
    {
        /** The application's internal name. */
        public  static  readonly    TITLE                                   :string             = "Babylon.js joyride, (c) 2018 Mayflower GmbH, v. [" + bz.Version.CURRENT_VERSION.getVersionDescriptor() + "]";

        /** The minimum canvas2D width. */
        public  static  readonly    CANVAS_MIN_WIDTH                        :number             = 800;
        /** The minimum canvas2D height. */
        public  static  readonly    CANVAS_MIN_HEIGHT                       :number             = 600;

        /** The relative path from index.html where all images the app makes use of reside. */
        public  static  readonly    PATH_IMAGE_TEXTURE                      :string             = "res/image/texture/";
        /** The relative path from index.html where all sounds the app makes use of reside. */
        public  static  readonly    PATH_SOUND                              :string             = "res/sound/";
        /** The relative path from index.html where all 3d model files the app makes use of reside. */
        public  static  readonly    PATH_MESH                               :string             = "res/mesh/";
    }


    import * as bz from '../..';

    /*****************************************************************************
    *   Specifies all settings for the engine.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class SettingEngine
    {
        /** The application's internal name. */
        public  static  readonly    TITLE                                   :string             = "Babylon.js joyride, (c) 2018 Mayflower GmbH, v. [" + bz.Version.CURRENT_VERSION.getVersionDescriptor() + "]";

        /** The minimum canvas2D width. */
        public  static  readonly    CANVAS_MIN_WIDTH                        :number             = 800;
        /** The minimum canvas2D height. */
        public  static  readonly    CANVAS_MIN_HEIGHT                       :number             = 600;

        /** The desired canvas3D width. */
//      public      static      CANVAS_WIDTH                                :number             = 800;
        /** The desired canvas3D height. */
//      public      static      CANVAS_HEIGHT                               :number             = 600;

        /** The scene's gravity. */
        public      static      GRAVITY                                     :number             = 0.0;      //-0.01;

        /** The relative path from index.html where all images the app makes use of reside. */
        public      static      PATH_IMAGE_TEXTURE                          :string             = "res/image/texture/";
        /** The relative path from index.html where all sounds the app makes use of reside. */
        public      static      PATH_SOUND                                  :string             = "res/sound/";
        /** The relative path from index.html where all 3d model files the app makes use of reside. */
        public      static      PATH_3DS                                    :string             = "res/3ds/";

        /** The player's x and z dimension (radius). */
        public      static      PLAYER_SIZE_XZ                              :number             = 1.0;
        /** The player's y dimension (height). */
        public      static      PLAYER_SIZE_Y                               :number             = 2.0;
    }

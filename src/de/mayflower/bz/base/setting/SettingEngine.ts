
    import * as bz from '../..';
    import * as BABYLON from 'babylonjs';

    /*******************************************************************************************************************
    *   Specifies all settings for the engine.
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

        public  static  readonly    CAMERA_FOLLOW_HEIGHT_OFFSET             :number             = 6.0;
        public  static  readonly    CAMERA_FOLLOW_HEIGHT_RADIUS             :number             = 15.0;
        public  static  readonly    CAMERA_FOLLOW_ROTATION_OFFSET           :number             = 180.0;
        public  static  readonly    CAMERA_FOLLOW_ACCELERATION_SPEED        :number             = 0.075;
        public  static  readonly    CAMERA_FOLLOW_MAX_SPEED                 :number             = 10.0;

        public  static  readonly    CAMERA_FREE_ELLIPSOID                   :BABYLON.Vector3    = new BABYLON.Vector3( 2.0, 2.0, 2.0 );

    }


    import * as BABYLON from 'babylonjs';
    import * as bz      from '../..';

    /** ****************************************************************************************************************
    *   Specifies all settings for the engine.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SettingEngine
    {
        /** The application's internal name. */
        public  static  readonly    TITLE                                   :string             = 'babylon-zero, (c) 2018 Mayflower GmbH, v. [' + bz.Version.getCurrent() + ']';

        /** The minimum canvas2D width. */
        public  static  readonly    CANVAS_MIN_WIDTH                        :number             = 800;
        /** The minimum canvas2D height. */
        public  static  readonly    CANVAS_MIN_HEIGHT                       :number             = 600;

        /** The startup stage. */
        public  static  readonly    STAGE_STARTUP                           :bz.StageId         = bz.StageId.STAGE_TEST_OFFICE;

        /** The relative path from index.html where all loading images reside. */
        public  static  readonly    PATH_IMAGE_LOADING                      :string             = 'res/image/loading/';
        /** The relative path from index.html where all texture images reside. */
        public  static  readonly    PATH_IMAGE_TEXTURE                      :string             = 'res/image/texture/';
        /** The relative path from index.html where all sprite images reside. */
        public  static  readonly    PATH_IMAGE_SPRITE                       :string             = 'res/image/sprite/';
        /** The relative path from index.html where all skybox images reside. */
        public  static  readonly    PATH_IMAGE_SKYBOX                       :string             = 'res/image/skybox/';
        /** The relative path from index.html where all GUI images reside. */
        public  static  readonly    PATH_IMAGE_HUD                          :string             = 'res/image/hud/';
        /** The relative path from index.html where all effect sounds the app makes use of reside. */
        public  static  readonly    PATH_SOUND_FX                           :string             = 'res/sound/fx/';
        /** The relative path from index.html where all background sounds the app makes use of reside. */
        public  static  readonly    PATH_SOUND_BG                           :string             = 'res/sound/bg/';
        /** The relative path from index.html where all 3d model files the app makes use of reside. */
        public  static  readonly    PATH_MODEL                              :string             = 'res/model/';

        /** Follow camera height offset. */
        public  static  readonly    CAMERA_FOLLOW_HEIGHT_OFFSET             :number             = 6.0;
        /** How far from the object to follow. */
        public  static  readonly    CAMERA_FOLLOW_RADIUS                    :number             = 15.0;
        /** Offset rotation (for front following etc.). */
        public  static  readonly    CAMERA_FOLLOW_ROTATION_OFFSET           :number             = 180.0;
        /** Camera acceleration after target change. defaults to 0.05 */
        public  static  readonly    CAMERA_FOLLOW_ACCELERATION_SPEED        :number             = 0.075;
        /** Max camera moving speed. defaults to 20. */
        public  static  readonly    CAMERA_FOLLOW_MAX_SPEED                 :number             = 10.0;

        /** The ellipsoid for the free debug camera (only when collisions are active). */
        public  static  readonly    CAMERA_FREE_ELLIPSOID                   :BABYLON.Vector3    = new BABYLON.Vector3( 2.0, 2.0, 2.0 );

        /** Specifies if shadow rendering shall be enabled. */
        public  static  readonly    ENABLE_SHADOWS                          :boolean            = true;

        /** Specifies if the custom loading screen shall be used. */
        public  static  readonly    CUSTOM_LOADING_SCREEN                   :boolean            = true;

        /** Maximum instances of concurrent sprites. */
        public  static  readonly    MAX_SPRITE_INSTANCES                    :number             = 255;
    }

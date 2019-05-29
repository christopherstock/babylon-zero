
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Specifies all settings for the engine.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SettingEngine
    {
        /** The branding. */
        public  static  readonly    BRANDING                                :bz.Branding        = new bz.BrandingMayflower();

        /** The minimum canvas width. */
        public  static  readonly    CANVAS_MIN_WIDTH                        :number             = 800;
        /** The minimum canvas height. */
        public  static  readonly    CANVAS_MIN_HEIGHT                       :number             = 600;

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
        /** The default speed for camera animations. */
        public  static  readonly    CAMERA_ANIMATION_FRAMES_PER_SECOND      :number             = 50;

        /** Specifies if shadow rendering shall be enabled. */
        public  static  readonly    ENABLE_SHADOWS                          :boolean            = true;

        /** Specifies if the custom loading screen shall be used. */
        public  static  readonly    CUSTOM_LOADING_SCREEN                   :boolean            = true;

        /** The multiplier from the hit damage to the physical impact force to apply. */
        public  static  readonly    DAMAGE_IMPULSE_MULTIPLIER               :number             = 10;

        /** The delay between each sprite animation frame change in ms. */
        public  static  readonly    SPRITE_FRAME_DELAY                      :number             = 100;

        // TODO extract physics to SettingPhysics

        /** The physics engine iteration count per render cycle. */
        public  static  readonly    PHYSICS_ENGINE_ITERATIONS               :number             = 5;       // 5000 = no shaking
        /** The diameter of the collison epsilon used for all collision detections. */
        public  static  readonly    PHYSICS_COLLISION_EPSILON_SIZE          :number             = 500.0;    // no effect?
        /** The calculating time step amount for one tick of the physical engine. */
        public  static  readonly    PHYSICS_TIME_STEP_DEFAULT               :number             = ( 1 / 60 );
        /** The calculating time step amount for one paused tick of the physical engine. 0 is not working! */
        // TODO try 0 again ??
        public  static  readonly    PHYSICS_TIME_STEP_PAUSED                :number             = 0.00000000000000000000000000000000000001;

        /** Maximum instances of concurrent sprites. */
        public  static  readonly    MAX_SPRITE_INSTANCES                    :number             = 255;
        /** Maximum instances of bullet holes in one stage. */
        public  static  readonly    MAX_BULLET_HOLES                        :number             = 255;

        /** The default field of view of the 1st person camera. */
        public  static  readonly    DEFAULT_FIELD_OF_VIEW                   :number             = 1.0;
    }

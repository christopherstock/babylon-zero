/* eslint-disable max-len */

import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies all settings for the engine.
***********************************************************************************************************************/
export class SettingEngine
{
    /** The minimum canvas width. */
    public static readonly CANVAS_MIN_WIDTH                         :number             = 800;
    /** The minimum canvas height. */
    public static readonly CANVAS_MIN_HEIGHT                        :number             = 600;

    /** The stage the application starts up with. */
    public static readonly STAGE_STARTUP                            :bz.StageId         = bz.StageId.OFFICE;

    /** Displays items straight and rotated around axis Y. */
    public static readonly ITEMS_ALWAYS_UPRIGHT_AND_ROTATING        :boolean            = false;
    /** If items can be shot by the player and get an physical impulse. */
    public static readonly ITEMS_CAN_BE_SHOT                        :boolean            = true;

    /** Follow camera height offset. */
    public static readonly CAMERA_FOLLOW_HEIGHT_OFFSET              :number             = 0.0; // 6.0;
    /** How far from the object to follow. */
    public static readonly CAMERA_FOLLOW_RADIUS                     :number             = 15.0;
    /** Offset rotation (for front following etc.). */
    public static readonly CAMERA_FOLLOW_ROTATION_OFFSET            :number             = 180.0;
    /** Camera acceleration after target change. defaults to 0.05 */
    public static readonly CAMERA_FOLLOW_ACCELERATION_SPEED         :number             = 0.03;
    /** Max camera moving speed. defaults to 20. */
    public static readonly CAMERA_FOLLOW_MAX_SPEED                  :number             = 10.0;
    /** The default speed for camera animations. */
    public static readonly CAMERA_ANIMATION_FRAMES_PER_SECOND       :number             = 50;

    /** Specifies if shadow rendering shall be enabled. */
    public static readonly ENABLE_SHADOWS                           :boolean            = false;

    /** Specifies if the custom loading screen shall be used. */
    public static readonly CUSTOM_LOADING_SCREEN                    :boolean            = true;

    /** The multiplier from the hit damage to the physical impact force to apply. */
    public static readonly DAMAGE_IMPULSE_MULTIPLIER                :number             = 25;

    /** The delay between each sprite animation frame change in ms. */
    public static readonly SPRITE_FRAME_DELAY                       :number             = 100;

    /** Default ratio from texture mapping to face size. */
    public static readonly TEXTURE_DEFAULT_MAPPING_UV               :number             = 0.5;

    /** The physics engine iteration count per render cycle. */
    public static readonly PHYSIC_ENGINE_ITERATIONS                 :number             = 5;       // 5000 = no shaking but horribly slow!
    /** The diameter of the collison epsilon used for all collision detections. */
    public static readonly PHYSIC_COLLISION_EPSILON_SIZE            :number             = 500.0;    // no effect?
    /** The calculating time step amount for one tick of the physical engine. */
    public static readonly PHYSIC_TIME_STEP_DEFAULT                 :number             = ( 1 / 60 );
    /** The calculating time step amount for one paused tick of the physical engine. 0 is NOT working! */
    public static readonly PHYSIC_TIME_STEP_PAUSED                  :number             = 0.00000000000000000000000000000000000001;
    /** The global scene gravity. */
    public static readonly PHYSIC_GLOBAL_STAGE_GRAVITY              :BABYLON.Vector3    = new BABYLON.Vector3( 0, -7.5, 0 );

    /** Maximum instances of concurrent sprites. */
    public static readonly MAX_SPRITE_INSTANCES                     :number             = 255;
    /** Maximum instances of bullet holes in one stage. */
    public static readonly MAX_BULLET_HOLES                         :number             = 255;
    /** This depth asserts being drawn correctly on spheres and not be too scaled around corners! */
    public static readonly BULLET_HOLE_DEPTH                        :number             = 0.025;

    /** The default field of view of the 1st person camera. */
    public static readonly DEFAULT_FIELD_OF_VIEW                    :number             = 1.0;
    public static readonly CURRENT_WEARPON_MAX_ZOOM                 :number             = 0.5;
    public static readonly CURRENT_WEARPON_ZOOM_SPEED               :number             = 0.05;

    /** The HTML page title. */
    public static readonly BRANDING_TITLE                           :string             = 'babylon-zero, (c) 2021 Mayflower GmbH';
    /** The HTML page favicon. */
    public static readonly BRANDING_FAVICON                         :string             = 'mayflower.ico';
    /** The loading screen logo. */
    public static readonly BRANDING_LOADING_LOGO                    :string             = 'loadingMf.png';

    /** The bg color for the GUI. */
    public static readonly PAUSE_GUI_BG_COLOR                       :string             = 'rgba( 0.0, 0.0, 0.0, 0.5 )';

    /** Unified wall depth for building constructions. */
    public static readonly WALL_DEPTH                               :number             = 0.2;
    /** Unified wall height (y) for building constructions. */
    public static readonly WALL_HEIGHT                              :number             = 10.0;
    /** Unified door width for building constructions. */
    public static readonly DOOR_WIDTH                               :number             = 5.0;
    /** Unified door height for building constructions. */
    public static readonly DOOR_HEIGHT                              :number             = 8.5;
    /** Unified door frame height for building constructions. */
    public static readonly DOOR_FRAME_HEIGHT                        :number             = ( SettingEngine.WALL_HEIGHT - SettingEngine.DOOR_HEIGHT );
    /** Unified width for a hallway in building constructions. */
    public static readonly HALLWAY_WIDTH                            :number             = 10.0;
    /** Unified floor and ceiling depth for building constructions. */
    public static readonly DEPTH_FLOOR_CEILING                      :number             = 0.1;

    /** Unified window width for building constructions. */
    public static readonly WINDOW_WIDTH                             :number             = 4.5;
    /** Unified window height for building constructions. */
    public static readonly WINDOW_HEIGHT                            :number             = 4.5;
    /** Unified door frame height for building constructions. */
    public static readonly WINDOW_TOP_FRAME_HEIGHT                  :number             = 1.5;
    /** Unified window bottom frame height for building constructions. */
    public static readonly WINDOW_BOTTOM_FRAME_HEIGHT               :number             = ( SettingEngine.WALL_HEIGHT - SettingEngine.WINDOW_HEIGHT - SettingEngine.WINDOW_TOP_FRAME_HEIGHT );

    /** The default offset Y for room floors (in order to prevent flickering with the underlying Y layer. */
    public static readonly FLOOR_OFFSET_Y                           :number             = 0.001;

    public static readonly MAX_MESH_DARKENING_RATIO                 :number             = 0.8;

    public static readonly CRATE_MIN_ENERGY                         :number             = 3.0;
    public static readonly CRATE_MAX_ENERGY                         :number             = 6.0;
}

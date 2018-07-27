
    /** ****************************************************************************************************************
    *   Specifies all debug adjustments for the application.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SettingDebug
    {
        /** The global switch for the debug mode. */
        public      static      DEBUG_MODE                                  :boolean            = true;

        /** Disables all sounds. */
        public      static      DISABLE_SOUND                               :boolean            = ( false && SettingDebug.DEBUG_MODE );
        /** Enabled collisions for the free debug camera. */
        public      static      ENABLE_COLLISIONS_FOR_DEBUG_CAMERA          :boolean            = ( false && SettingDebug.DEBUG_MODE );
        /** Enabled menu debug keys for switching camera and stages. */
        public      static      ENABLE_MENU_DEBUG_KEYS                      :boolean            = ( true  && SettingDebug.DEBUG_MODE );

        /** Show the bounding boxes for all meshes. */
        public      static      SHOW_MESH_BOUNDING_BOXES                    :boolean            = ( false && SettingDebug.DEBUG_MODE );
        /** Show the babylon.JS scene debug panel. */
        public      static      SHOW_SCENE_DEBUG_PANEL                      :boolean            = ( false && SettingDebug.DEBUG_MODE );
        /** Show the shot debug lines. */
        public      static      SHOW_SHOT_LINES_AND_COLLISIONS              :boolean            = ( false && SettingDebug.DEBUG_MODE );
        /** Show the shot debug bullet holes. */
        public      static      SHOW_DEBUG_BULLET_HOLES                     :boolean            = ( false && SettingDebug.DEBUG_MODE );
        /** Show the shot debug bullet hole normal line. */
        public      static      SHOW_DEBUG_BULLET_HOLE_NORMAL               :boolean            = ( true  && SettingDebug.DEBUG_MODE );

        /** Show the world coordinate axis. */
        public      static      SHOW_COORDINATE_AXIS                        :boolean            = ( true  && SettingDebug.DEBUG_MODE );
        /** The length of the debug coordinate axis. */
        public      static      DEBUG_AXIS_LENGTH                           :number             = 25.0;
    }

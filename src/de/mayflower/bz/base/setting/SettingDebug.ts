
    /** ****************************************************************************************************************
    *   Specifies all debug adjustments for the application.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export class SettingDebug
    {
        /** The global switch for the debug mode. */
        public      static      DEBUG_MODE                                  :boolean            = true;

        /** Disables all sounds. */
        public      static      DISABLE_SOUND                               :boolean            = ( true && SettingDebug.DEBUG_MODE );
        /** Enabled collisions for the free debug camera. */
        public      static      ENABLE_COLLISIONS_FOR_DEBUG_CAMERA          :boolean            = ( false && SettingDebug.DEBUG_MODE );

        /** Show the bounding boxes for all meshes. */
        public      static      SHOW_MESH_BOUNDING_BOXES                    :boolean            = ( false && SettingDebug.DEBUG_MODE );
        /** Show the world coordinate axis. */
        public      static      SHOW_COORDINATE_AXIS                        :boolean            = ( true  && SettingDebug.DEBUG_MODE );

        /** The length of the debug coordinate axis. */
        public      static      DEBUG_AXIS_LENGTH                           :number             = 25.0;
    }

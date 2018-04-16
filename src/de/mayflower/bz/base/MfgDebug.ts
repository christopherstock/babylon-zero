
    import * as bz from '..';

    /*****************************************************************************
    *   The debug system, specifying switchable debug groups
    *   that generate output to the screen console.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class MfgDebug
    {
        /** A primal debug group for general debug purposes. */
        public      static  bugfix                      :bz.LibDebug                    = new bz.LibDebug( true    && bz.MfgSettings.MODE == bz.MfgDebugSettings.MODE_DEBUG );

        /** The debug group for the startup acclaim message. */
        public      static  acclaim                     :bz.LibDebug                    = new bz.LibDebug( true    && bz.MfgSettings.MODE == bz.MfgDebugSettings.MODE_DEBUG );
        /** The debug group for the startup initialization messages. */
        public      static  init                        :bz.LibDebug                    = new bz.LibDebug( true    && bz.MfgSettings.MODE == bz.MfgDebugSettings.MODE_DEBUG );

        /** The debug group for the key system. */
        public      static  key                         :bz.LibDebug                    = new bz.LibDebug( false   && bz.MfgSettings.MODE == bz.MfgDebugSettings.MODE_DEBUG );
        /** The debug group for the image system. */
        public      static  imageLoader                 :bz.LibDebug                    = new bz.LibDebug( false   && bz.MfgSettings.MODE == bz.MfgDebugSettings.MODE_DEBUG );
        /** The debug group for the sound system. */
        public      static  soundLoader                 :bz.LibDebug                    = new bz.LibDebug( false   && bz.MfgSettings.MODE == bz.MfgDebugSettings.MODE_DEBUG );
        /** The debug group for the canvas3D system. */
        public      static  canvas3D                    :bz.LibDebug                    = new bz.LibDebug( false   && bz.MfgSettings.MODE == bz.MfgDebugSettings.MODE_DEBUG );
        /** The debug group for the text file loading system. */
        public      static  textLoader                  :bz.LibDebug                    = new bz.LibDebug( false   && bz.MfgSettings.MODE == bz.MfgDebugSettings.MODE_DEBUG );
        /** The debug group for the 3ds max .ase file parser. */
        public      static  res3ds                      :bz.LibDebug                    = new bz.LibDebug( false   && bz.MfgSettings.MODE == bz.MfgDebugSettings.MODE_DEBUG );
    }

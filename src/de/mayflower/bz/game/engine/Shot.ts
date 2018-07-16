
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a shot into the stage.
    *******************************************************************************************************************/
    export class Shot
    {
        /** The source point of the shot. */
        public                      source                          :BABYLON.Vector3                        = null;
        /** The rotation of the shot source. */
        private                     rotation                        :BABYLON.Vector3                        = null;
        /** The maximum range of this shot. */
        private                     range                           :number                                 = 0.0;

        /** The destination point of the shot. */
        public                      destination                     :BABYLON.Vector3                        = null;
        /** The ray that contains the mapped shot information for babylon.JS. */
        private                     ray                             :BABYLON.Ray                            = null;

        /** ************************************************************************************************************
        *   Creates a new shot.
        *
        *   @param source   The shot source point.
        *   @param rotation The rotation of the shot source.
        *   @param range    The maximum range of this shot.
        ***************************************************************************************************************/
        public constructor
        (
            source   :BABYLON.Vector3,
            rotation :BABYLON.Vector3,
            range    :number
        )
        {
            this.source   = source;
            this.rotation = rotation;
            this.range    = range;

            // calculate destination point
            this.destination  = bz.MathUtil.rotateVector
            (
                source,
                rotation,
                range
            );
/*
            bz.Debug.fire.log( ' Shot source:          ' + source      );
            bz.Debug.fire.log( ' Shot source rotation: ' + rotation    );
            bz.Debug.fire.log( ' Shot range:           ' + range       );
            bz.Debug.fire.log( ' Shot destination:     ' + destination );
*/
        }
    }

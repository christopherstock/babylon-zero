
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Represents a shot into the stage.
    *******************************************************************************************************************/
    export class Shot
    {
        // TODO all private?

        /** The source point of the shot. */
        public                      source                          :BABYLON.Vector3                        = null;
        /** The destination point of the shot. */
        public                      destination                     :BABYLON.Vector3                        = null;
        /** The ray that contains the mapped shot information for babylon.JS. */
        public                      ray                             :BABYLON.Ray                            = null;
        /** Specifies if this shot is wall breaking. */
        public                      wallBreaking                    :boolean                                = false;

        /** The rotation of the shot source. */
        private                     rotation                        :BABYLON.Vector3                        = null;
        /** The maximum range of this shot. */
        private                     range                           :number                                 = 0.0;

        /** ************************************************************************************************************
        *   Creates a new shot.
        *
        *   @param source       The shot source point.
        *   @param rotation     The rotation of the shot source.
        *   @param range        The maximum range of this shot.
        *   @param wallBreaking Specifies if this shot will break walls.
        ***************************************************************************************************************/
        public constructor
        (
            source       :BABYLON.Vector3,
            rotation     :BABYLON.Vector3,
            range        :number,
            wallBreaking :boolean
        )
        {
            this.source       = source;
            this.rotation     = rotation;
            this.range        = range;
            this.wallBreaking = wallBreaking;

            // calculate destination point
            this.destination = bz.MathUtil.rotateVector
            (
                source,
                rotation,
                range
            );

            // create collision checking ray
            this.ray = BABYLON.Ray.CreateNewFromTo( this.source, this.destination );
/*
            bz.Debug.fire.log( ' Shot source:          ' + this.source      );
            bz.Debug.fire.log( ' Shot source rotation: ' + this.rotation    );
            bz.Debug.fire.log( ' Shot range:           ' + this.range       );
            bz.Debug.fire.log( ' Shot destination:     ' + this.destination );
*/
        }
    }

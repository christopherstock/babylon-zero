
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Represents a shot into the stage.
    *******************************************************************************************************************/
    export class Shot
    {
        /** The source point of the shot. */
        private             readonly    source              :BABYLON.Vector3                        = null;
        /** The rotation of the shot source. */
        private             readonly    rotation            :BABYLON.Vector3                        = null;
        /** The maximum range of this shot. */
        private             readonly    range               :number                                 = 0.0;
        /** Specifies if this shot is wall breaking. */
        private             readonly    wallBreaking        :boolean                                = false;
        /** The damage this shot causes onto game objects. */
        private             readonly    damage              :number                                 = 0;

        /** The destination point of the shot. */
        private             readonly    destination         :BABYLON.Vector3                        = null;
        /** The ray that contains the mapped shot information for babylon.JS. */
        private             readonly    ray                 :BABYLON.Ray                            = null;

        /** ************************************************************************************************************
        *   Creates a new shot.
        *
        *   @param source       The shot source point.
        *   @param rotation     The rotation of the shot source.
        *   @param range        The maximum range of this shot.
        *   @param wallBreaking Specifies if this shot will break walls.
        *   @param damage       Specifies the damage that this shot causes onto game objects.
        ***************************************************************************************************************/
        public constructor
        (
            source       :BABYLON.Vector3,
            rotation     :BABYLON.Vector3,
            range        :number,
            wallBreaking :boolean,
            damage       :number
        )
        {
            this.source       = source;
            this.rotation     = rotation;
            this.range        = range;
            this.wallBreaking = wallBreaking;
            this.damage       = damage;

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
            bz.Debug.fire.log( ' Shot destination:     ' + this.destination );
*/
        }

        /** ************************************************************************************************************
        *   Returns this shot's native babylon.JS ray.
        *
        *   @return The native babylon.JS raycasting instance.
        ***************************************************************************************************************/
        public getRay() : BABYLON.Ray
        {
            return this.ray;
        }

        /** ************************************************************************************************************
        *   Determines if this shot is wall breaking.
        *
        *   @return <code>true</code> if this shot is wall breaking.
        ***************************************************************************************************************/
        public isWallBreaking() : boolean
        {
            return this.wallBreaking;
        }

        /** ************************************************************************************************************
        *   Creates a debug line from this shot.
        *
        *   @return The debug line mesh that represents this shot.
        ***************************************************************************************************************/
        public createDebugLine( scene:BABYLON.Scene ) : BABYLON.Mesh
        {
            return bz.MeshFactory.createLine
            (
                scene,
                this.source,
                this.destination,
                bz.SettingColor.COLOR_RGBA_YELLOW_OPAQUE
            );
        }

        /** ************************************************************************************************************
        *   Returns the damage that this shot impacts onto game objects.
        *
        *   @return The damage caused by this shot.
        ***************************************************************************************************************/
        public getDamage() : number
        {
            return this.damage;
        }
    }

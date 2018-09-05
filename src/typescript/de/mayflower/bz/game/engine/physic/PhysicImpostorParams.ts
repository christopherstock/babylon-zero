
    /** ****************************************************************************************************************
    *   The primal information from a native babylon.JS physics impostor.
    *   This class is designed to extract and store the most important information from the native impostor class.
    *******************************************************************************************************************/
    export class PhysicImpostorParams
    {
        /** The impostor type. */
        public                  type                        :number                     = 0;
        /** The physical mass. */
        public                  mass                        :number                     = 0;
        /** The physical friction. */
        public                  friction                    :number                     = 0;
        /** The physical restitution. */
        public                  restitution                 :number                     = 0;

        /** ************************************************************************************************************
        *   Creates the impostor params object from the specified babylon.JS physics impostor.
        *
        *   @param impostor The babylon.JS impostor to create the impostor params from.
        *
        *   @return The physical parameter compound object.
        ***************************************************************************************************************/
        public static createFromImpostor( impostor:BABYLON.PhysicsImpostor ) : PhysicImpostorParams
        {
            const ret:PhysicImpostorParams = new PhysicImpostorParams();

            ret.type        = impostor.type;
            ret.mass        = impostor.mass;
            ret.friction    = impostor.friction;
            ret.restitution = impostor.restitution;

            return ret;
        }

        /** ************************************************************************************************************
        *   Creates the impostor params object from the specified primitive physical values.
        *
        *   @param type        The impostor type ( box or sphere ).
        *   @param mass        The physical mass.
        *   @param friction    The physical friction.
        *   @param restitution The physical restitution.
        *
        *   @return The physical parameter compound object.
        ***************************************************************************************************************/
        public static createFromParams
        (
            type        :number,
            mass        :number,
            friction    :number,
            restitution :number
        )
        : PhysicImpostorParams
        {
            const ret:PhysicImpostorParams = new PhysicImpostorParams();

            ret.type        = type;
            ret.mass        = mass;
            ret.friction    = friction;
            ret.restitution = restitution;

            return ret;
        }
    }

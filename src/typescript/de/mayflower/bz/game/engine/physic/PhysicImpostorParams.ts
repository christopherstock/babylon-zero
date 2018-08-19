
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
        ***************************************************************************************************************/
        public constructor( impostor:BABYLON.PhysicsImpostor )
        {
            this.type        = impostor.type;
            this.mass        = impostor.mass;
            this.friction    = impostor.friction;
            this.restitution = impostor.restitution;
        }
    }

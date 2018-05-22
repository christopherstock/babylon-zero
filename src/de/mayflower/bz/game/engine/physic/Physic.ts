
    import * as bz from '../../../index';

    /** ****************************************************************************************************************
    *   Specifies the physical behaviour of a body.
    *******************************************************************************************************************/
    export class Physic
    {
        /** The player has very special physical attributes with the primal goal to keep the user entertained. */
        public  static  readonly        NONE            :Physic                 = new Physic
        (
            bz.PhysicState.NONE,
            null,
            0.0,
            0.0
        );

        /** The player has very special physical attributes with the primal goal to keep the user entertained. */
        public  static  readonly        PLAYER          :Physic                 = new Physic
        (
            bz.PhysicState.MOVABLE,
            bz.PhysicDensity.PLAYER,
            0.0,
            0.0
        );

        /** Props for light wood. */
        public  static  readonly        LIGHT_WOOD      :Physic                 = new Physic
        (
            bz.PhysicState.MOVABLE,
            bz.PhysicDensity.LIGHT_WOOD,
            1.0,
            0.0
        );

        /** Physical properties for a non-moving and collidable body. */
        public  static  readonly        STATIC          :Physic                 = new Physic
        (
            bz.PhysicState.STATIC,
            bz.PhysicDensity.STATIC,
            1.0,
            0.0
        );

        /** The general physic state of this physics setting. */
        private         readonly        state           :bz.PhysicState         = null;
        /** The density of this physics setting. */
        private         readonly        density         :bz.PhysicDensity       = null;
        /** The friction of this physics setting */
        private         readonly        friction        :number                 = 0.0;
        /** The density of this physics setting */
        private         readonly        restitution     :number                 = 0.0;

        /** ************************************************************************************************************
        *   Creates a new set of physical properties.
        *
        *   @param state       The general physical state for this setting.
        *   @param density     The density of this physical body setting.
        *   @param friction    The friction of this physical body setting.
        *   @param restitution The restitution of this physical body setting.
        ***************************************************************************************************************/
        private constructor
        (
            state       :bz.PhysicState,
            density     :bz.PhysicDensity,
            friction    :number,
            restitution :number
        )
        {
            this.state       = state;
            this.density     = density;
            this.friction    = friction;
            this.restitution = restitution;
        }

        /** ************************************************************************************************************
        *   Applies the specified physical behaviour to the given mesh.
        *
        *   @param mesh         The native babylon.JS mesh to set the physical behaviour for.
        *   @param volume       The calculated volume of the mesh.
        *   @param impostorType The type of physics impostor to set.
        *   @param scene        The babylon.JS scene that manages this impostor.
        ***************************************************************************************************************/
        public applyPhysicToMesh
        (
            mesh         :BABYLON.Mesh,
            volume       :number,
            impostorType :number,
            scene        :BABYLON.Scene
        )
        : void
        {
            switch ( this.state )
            {
                case bz.PhysicState.STATIC:
                case bz.PhysicState.MOVABLE:
                {
                    const impostorParams:BABYLON.PhysicsImpostorParameters = this.createImpostorParams( volume );

                    mesh.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;
                    mesh.physicsImpostor = new BABYLON.PhysicsImpostor
                    (
                        mesh,
                        impostorType,
                        impostorParams,
                        scene
                    );
                    mesh.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;

                    break;
                }

                case bz.PhysicState.NONE:
                {
                    // no collisions or impostor
                    break;
                }
            }
        }

        /** ************************************************************************************************************
        *   Creates the physical impostor parameters for these physic set.
        *
        *   @param volume The volume of the mesh to create the impostor parameters for.
        *
        *   @return The impostor parameters for these physical settings.
        ***************************************************************************************************************/
        private createImpostorParams( volume:number ) : BABYLON.PhysicsImpostorParameters
        {
            let mass:number = 0.0;

            switch ( this.state )
            {
                case bz.PhysicState.STATIC:
                {
                    mass = 0.0;
                    break;
                }

                case bz.PhysicState.MOVABLE:
                {
                    mass = ( volume * this.density );
                    break;
                }

                case bz.PhysicState.NONE:
                {
                    break;
                }
            }

            return {
                mass:        mass,
                friction:    this.friction,
                restitution: this.restitution
            };
        }
    }

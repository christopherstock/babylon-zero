
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   The parent class of all game objects.
    *******************************************************************************************************************/
    export abstract class GameObject
    {
        /** All meshes this game object consists of. */
        protected           readonly    meshes                  :BABYLON.AbstractMesh[]             = null;

        /** ************************************************************************************************************
        *   Creates a new game object.
        *
        *   @param meshes The mesh for this wall.
        ***************************************************************************************************************/
        protected constructor( meshes:BABYLON.AbstractMesh[] )
        {
            this.meshes = meshes;
        }

        /** ************************************************************************************************************
        *   Returns all meshes that build this game object .
        *
        *   @return meshes All meshes this game object consists of.
        ***************************************************************************************************************/
        public getMeshes() : BABYLON.AbstractMesh[]
        {
            return this.meshes;
        }

        /** ************************************************************************************************************
        *   Renders one tick of the game loop for this game object.
        ***************************************************************************************************************/
        public render() : void
        {
        }

        /** ************************************************************************************************************
        *   Disposes all meshes of this game object.
        ***************************************************************************************************************/
        public dispose() : void
        {
            for ( const mesh of this.meshes )
            {
                mesh.dispose();
            }
        }
    }

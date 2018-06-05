
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Imports all meshes from 3ds max.
    *******************************************************************************************************************/
    export class MeshImportSystem
    {
        /** All mesh file names to load. */
        private             readonly    fileNames                       :string[]                       = null;
        /** The method to invoke when all meshes are loaded. */
        private             readonly    onLoadComplete                  :()=>void                       = null;

        /** The number of currently loaded meshes. */
        private                         loadedMeshCount                 :number                         = 0;
        /** All loaded mesh objects. */
        private                         meshes                          :BABYLON.Mesh[]                 = [];

        /** ************************************************************************************************************
        *   Preloads all images into memory.
        *
        *   @param fileNames      The names of all image files to load.
        *   @param onLoadComplete The method to invoke when all image files are loaded.
        ***************************************************************************************************************/
        public constructor( fileNames:string[], onLoadComplete:()=>void )
        {
            this.fileNames      = fileNames;
            this.onLoadComplete = onLoadComplete;
        }

        /** ************************************************************************************************************
        *   Loads all specified mesh files into system memory.
        ***************************************************************************************************************/
        public loadMeshes( scene:BABYLON.Scene ) : void
        {
            bz.Debug.meshImport.log( 'Preloading [' + this.fileNames.length + '] meshes' );

            for ( const fileName of this.fileNames )
            {
                // First parameter specifies the mesh name to import - an empty string will import all meshes.
                BABYLON.SceneLoader.ImportMesh
                (
                    '',
                    bz.SettingEngine.PATH_MESH,
                    fileName,
                    scene,
                    ( importedMeshes:BABYLON.AbstractMesh[] ) => {

                        // browse all meshes of this .babylon file
                        for ( const importedMesh of importedMeshes )
                        {
                            const mesh:BABYLON.AbstractMesh = importedMesh;

                            // transform this mesh
                            mesh.position.x += -25.0;
                            mesh.position.y += 20.0;
                            mesh.position.z += 25.0;

                            let enablePhysics:boolean = false;
                            if ( enablePhysics )
                            {
                                mesh.physicsImpostor = new BABYLON.PhysicsImpostor
                                (
                                    mesh,
                                    BABYLON.PhysicsImpostor.BoxImpostor,
                                    {
                                        mass: 1.0,
                                        friction: 1.0,
                                        restitution: 1.0,
                                    },
                                    scene
                                );

                                // mesh.setPhysicsLinkWith(centerMesh,BABYLON.Vector3.Zero(),BABYLON.Vector3.Zero());
                            }

                            let enableDebugStuff:boolean = false;
                            if ( enableDebugStuff )
                            {
                                mesh.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;
                                mesh.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;
                                mesh.isPickable = true;
                            }
                        }

                        this.onLoadMesh();
                    }
                );
            }
        }

        /** ************************************************************************************************************
        *   Being invoked when one mesh was loaded completely.
        ***************************************************************************************************************/
        private onLoadMesh=() : void =>
        {
            if ( ++this.loadedMeshCount >= this.fileNames.length )
            {
                bz.Debug.meshImport.log( 'All [' + this.fileNames.length + '] meshes loaded' );

                this.onLoadComplete();
            }
        };
    }

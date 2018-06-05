
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
        private                         meshes                          :BABYLON.Mesh[][]               = [];

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

                        // save in meshes array
                        this.meshes[ fileName ] = importedMeshes;




                        // browse all meshes of this .babylon file
                        for ( const importedMesh of importedMeshes )
                        {
                            // hide this mesh
                            importedMesh.visibility = 0.0;





                            // transform this mesh
                            importedMesh.position.x += -25.0;
                            importedMesh.position.y += 20.0;
                            importedMesh.position.z += 25.0;

                            let enablePhysics:boolean = false;
                            if ( enablePhysics )
                            {
                                importedMesh.physicsImpostor = new BABYLON.PhysicsImpostor
                                (
                                    importedMesh,
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
                                importedMesh.checkCollisions = bz.SettingDebug.ENABLE_COLLISIONS_FOR_DEBUG_CAMERA;
                                importedMesh.showBoundingBox = bz.SettingDebug.SHOW_MESH_BOUNDING_BOXES;
                                importedMesh.isPickable = true;
                            }
                        }

                        this.onLoadMesh();
                    }
                );
            }
        }

        /** ************************************************************************************************************
        *   Returns a clone of the imported mesh with the specified filename.
        *
        *   TODO static to MeshFactory!
        *
        *   @param fileName The filename of the imported mesh to return a clone for.
        ***************************************************************************************************************/
        public cloneImportedMesh
        (
            fileName:string
        )
        : BABYLON.Mesh[]
        {
            console.log( 'clone imported mesh [' + fileName + ']' );

            let originalMeshes :BABYLON.Mesh[] = this.meshes[ fileName ];
            let clonedMeshes   :BABYLON.Mesh[] = [];

            console.log( 'cloning [' + originalMeshes.length + '] meshes' );

            for ( const originalMesh of originalMeshes )
            {
                let clonedMesh:BABYLON.Mesh = originalMesh.clone
                (
                    'mesh' + bz.MeshFactory.nextMeshId++
                );


                console.log( ' cloned mesh: [' + clonedMesh + ']' );


                // show this mesh
                clonedMesh.visibility = 1.0;


            }

            return originalMeshes;
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

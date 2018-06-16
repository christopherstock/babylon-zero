
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
        private                         meshes                          :BABYLON.AbstractMesh[][]       = [];

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
            bz.Debug.meshImport.log( 'Importing [' + this.fileNames.length + '] model files' );

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

                        bz.Debug.meshImport.log( ' Imported [' + importedMeshes.length + '] meshes' );

                        // hide all meshes
                        for ( const importedMesh of importedMeshes )
                        {
                            importedMesh.visibility = 0.0;
                        }

                        // save in meshes array
                        this.meshes[ fileName ] = importedMeshes;

                        // notify load
                        this.onLoadMesh();
                    }
                );
            }
        }

        /** ************************************************************************************************************
        *   Returns the original mesh data of the specified imported mesh file.
        *
        *   @return The original mesh data of the specified imported mesh file.
        ***************************************************************************************************************/
        public getOriginalMesh( fileName:string ) : BABYLON.AbstractMesh[]
        {
            return this.meshes[ fileName ];
        }

        /** ************************************************************************************************************
        *   Being invoked when one mesh was loaded completely.
        ***************************************************************************************************************/
        private onLoadMesh=() : void =>
        {
            if ( ++this.loadedMeshCount >= this.fileNames.length )
            {
                bz.Debug.meshImport.log( 'All [' + this.fileNames.length + '] models loaded' );

                this.onLoadComplete();
            }
        };
    }


    import * as bz from '../..';

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
        public loadMeshes() : void
        {
            bz.Debug.meshImport.log( 'Preloading [' + this.fileNames.length + '] meshes' );

            for ( const fileName of this.fileNames )
            {
/*
                try
                {
                    this.meshes[ fileName ]              = new Audio();
                    this.meshes[ fileName ].src          = fileName;
                    this.meshes[ fileName ].onloadeddata = this.onLoadSound;
                    this.meshes[ fileName ].onerror      = this.onLoadSoundError;

                    if ( bz.IO.isMac() )
                    {
                        this.onLoadSound();
                    }
                }
                catch ( e )
                {
                    bz.Debug.meshImport.log( 'Error on creating Audio element: ' + e.message );
                    this.onLoadSoundError();
                }
*/
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

        /** ************************************************************************************************************
        *   Being invoked when one mesh was loaded completely.
        ***************************************************************************************************************/
        private onLoadMeshError=() : void =>
        {
            bz.Debug.meshImport.log( 'ERROR on loading mesh!' );

            this.onLoadMesh();
        };
    }

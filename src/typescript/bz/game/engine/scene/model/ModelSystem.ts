// noinspection JSUnusedLocalSymbols

import * as bz from '../../../..';
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders';

/** ********************************************************************************************************************
*   Imports all .babylon model files from 3ds max.
***********************************************************************************************************************/
export class ModelSystem
{
    /** All model file names to load. TODO remove! */
    private readonly fileNames              :string[]               = null;
    /** The method to invoke when all model files are loaded. TODO remove! */
    private readonly onLoadComplete         :()=>void               = null;

    /** The number of currently loaded model files. TODO remove! */
    private          loadedModelCount       :number                 = 0;
    /** All loaded mesh objects. TODO remove! */
    private          models                 :bz.Model[]             = [];

    /** ****************************************************************************************************************
    *   Creates a new model import system.
    *
    *   @param fileNames      The names of all model files to load.
    *   @param onLoadComplete The method to invoke when all model files are loaded.
    *******************************************************************************************************************/
    public constructor( fileNames:string[], onLoadComplete:()=>void )
    {
        this.fileNames      = fileNames;
        this.onLoadComplete = onLoadComplete;
    }

    /** ****************************************************************************************************************
    *   Loads all specified model files into system memory.
    *
    *   TODO maybe try to load not ALL models but only on demand? => blocking version of
    *        BABYLON.SceneLoader.ImportMesh via async await?
    *******************************************************************************************************************/
    public async load( scene:BABYLON.Scene ) : Promise<any>
    {
        bz.Debug.init.log( ' Import [' + String( this.fileNames.length ) + '] model files' );

        for ( const fileName of this.fileNames )
        {
            // TODO extract to separate method?

            const fullPath      :string = ( bz.SettingResource.PATH_MODEL + fileName );
            const lastSeparator :number = fullPath.lastIndexOf( '/' );
            const directory     :string = fullPath.substr( 0, lastSeparator + 1 );
            const file          :string = fullPath.substr( lastSeparator + 1 );

            bz.Debug.init.log( ' Import model file ' + file );

            const createdModel :(bz.Model|void) = await BABYLON.SceneLoader.ImportMeshAsync
            (
                // first parameter specifies the name of the mesh to import - empty string imports all meshes
                '',
                directory,
                file,
                scene
            ).then(

                (
                    data :any
                ) => {

                    console.log( 'Mesh loaded successfully!' );

                    const importedMeshes:BABYLON.AbstractMesh[]     = data.meshes;
                    const particleSystems :BABYLON.ParticleSystem[] = data.particleSystems;
                    const skeletons :BABYLON.Skeleton[]             = data.skeletons;
                    const animationGroups :BABYLON.AnimationGroup[] = data.animationGroups;

                    bz.Debug.init.log(
                        '  Model file ' + file + ' imported. '
                        + 'Mesh count: ' + String( importedMeshes.length )
                    );

                    // hide all meshes
                    for ( const importedMesh of importedMeshes )
                    {
                        importedMesh.isVisible = false;

                        // disable backface culling by default
                        if ( importedMesh.material !== null )
                        {
                            importedMesh.material.backFaceCulling = false;
                        }
                    }

                    // save in models array
                    const newModel :bz.Model = new bz.Model( importedMeshes as any );
                    newModel.extractPhysicsImpostors();

                    return newModel;
                }

            ).catch(
                ( reason:any ) => {
                    bz.Debug.init.err( 'ERROR on model import [' + file + ']' );
                    bz.Debug.init.err( reason );
                }
            );

            // assign created model
            this.models[ fileName ] = createdModel;
        }

        bz.Debug.init.log( '  Model import complete [' + String( this.fileNames.length ) + '] files' );

        bz.Debug.init.log( 'All models (pre)loaded!' );

        this.onLoadComplete();
    }

    /** ****************************************************************************************************************
    *   Returns the original model of the specified imported model file.
    *
    *   @return The original model of the given imported model file.
    *******************************************************************************************************************/
    public getOriginalModel( fileName:string ) : bz.Model
    {
        return this.models[ fileName ];
    }
}

// noinspection JSUnusedLocalSymbols

import * as bz from '../../../..';
import 'babylonjs-loaders';

/** ********************************************************************************************************************
*   Imports all .babylon model files from 3ds max.
***********************************************************************************************************************/
export class ModelSystem
{
    /** All model file names to load. */
    private readonly fileNames              :string[]               = null;
    /** The method to invoke when all model files are loaded. */
    private readonly onLoadComplete         :()=>void               = null;

    /** The number of currently loaded model files. */
    private          loadedModelCount       :number                 = 0;
    /** All loaded mesh objects. */
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
    *******************************************************************************************************************/
    public load( scene:BABYLON.Scene ) : void
    {
        bz.Debug.init.log( ' Import [' + String( this.fileNames.length ) + '] model files' );

        for ( const fileName of this.fileNames )
        {
            ModelSystem.importModel(
                scene,
                fileName,
                ( model:bz.Model ) =>
                {
                    this.models[ fileName ] = model;
                    this.onLoadModel();
                }
            );
        }
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

    /** ****************************************************************************************************************
    *   Being invoked when one mesh was loaded completely.
    *******************************************************************************************************************/
    private onLoadModel() : void
    {
        if ( ++this.loadedModelCount >= this.fileNames.length )
        {
            bz.Debug.init.log( '  Model import complete [' + String( this.fileNames.length ) + '] files' );

            this.onLoadComplete();
        }
    }

    /** ****************************************************************************************************************
    *   Loads one model from disk using the asynchronous BABYLON.SceneLoader.ImportMesh functionality.
    *
    *   @param scene    The scene to import the model into.
    *   @param fileName The filename of the model to load.
    *   @param onLoaded The callback to invoke when the model is loaded.
    *******************************************************************************************************************/
    public static importModel( scene:BABYLON.Scene, fileName:string, onLoaded:( model:bz.Model ) => void ) : void
    {
        const fullPath      :string = ( bz.SettingResource.PATH_MODEL + fileName );
        const lastSeparator :number = fullPath.lastIndexOf( '/' );
        const directory     :string = fullPath.substr( 0, lastSeparator + 1 );
        const file          :string = fullPath.substr( lastSeparator + 1 );

        BABYLON.SceneLoader.ImportMesh
        (
            // first parameter specifies the name of the mesh to import - empty string imports all meshes
            '',
            directory,
            file,
            scene,
            (
                importedMeshes  :BABYLON.AbstractMesh[],
                particleSystems :BABYLON.IParticleSystem[],
                skeletons       :BABYLON.Skeleton[],
                animationGroups :BABYLON.AnimationGroup[]
            ) =>
            {
/*
                bz.Debug.init.log(
                    '  Model file ' + file + ' imported. '
                    + 'Mesh count: ' + String( importedMeshes.length )
                );
*/
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

                // notify load
                onLoaded( newModel );
            },
            null,
            ( callbackScene:BABYLON.Scene, callbackMessage:string, callbackException?:any ) =>
            {
                bz.Debug.init.err( 'ERROR on model import [' + file + ']' );
                bz.Debug.init.err( callbackMessage );
                bz.Debug.init.err( callbackException );

                // simulate load
                onLoaded( null );
            }
        );
    }
}

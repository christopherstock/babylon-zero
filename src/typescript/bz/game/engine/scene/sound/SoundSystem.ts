// noinspection JSUnusedGlobalSymbols

import * as bz from '../../../..';

/** ********************************************************************************************************************
*   Loads and manages all desired sounds.
***********************************************************************************************************************/
export class SoundSystem
{
    /** Next ID to assign for sound creation. */
    private static          nextSoundId         :number                     = 0;

    /** All sound file names to load. */
    private        readonly fileNames           :string[]                   = null;
    /** The method to invoke when all sounds are loaded. */
    private        readonly onLoadComplete      :() => void                 = null;

    /** The number of currently loaded sounds. */
    private                 loadedSoundCount    :number                     = 0;
    /** All loaded sound objects. */
    private                 sounds              :BABYLON.Sound[]            = [];

    /** ****************************************************************************************************************
    *   Preloads all images into memory.
    *
    *   @param fileNames      The names of all image files to load.
    *   @param onLoadComplete The method to invoke when all image files are loaded.
    *******************************************************************************************************************/
    public constructor( fileNames:string[], onLoadComplete:()=>void )
    {
        this.fileNames      = fileNames;
        this.onLoadComplete = onLoadComplete;

        // sets the global volume for all sounds
        // BABYLON.Engine.audioEngine.setGlobalVolume( 1.0 );
    }

    /** ****************************************************************************************************************
    *   Loads all specified sound files into system memory.
    *
    *   @param scene The babylon.JS scene to append all textures to.
    *******************************************************************************************************************/
    public load( scene:BABYLON.Scene ) : void
    {
        bz.Debug.init.log( ' Preload [' + String( this.fileNames.length ) + '] sounds' );

        if ( bz.SettingDebug.DISABLE_SOUND )
        {
            bz.Debug.init.log( '  Skipped though disabled' );

            this.onLoadComplete();
            return;
        }

        for ( const fileName of this.fileNames )
        {
            this.sounds[ fileName ] = new BABYLON.Sound
            (
                SoundSystem.createNextSoundId(),
                fileName,
                scene,
                () => { this.onLoadSound(); }
            );
        }
    }

    /** ****************************************************************************************************************
    *   Creates and plays a COPY of the specified audio object.
    *
    *   @param id   The ID of the audio object to play.
    *   @param loop Specifies if playback for this sound should be repeated infinitely.
    *
    *   @return The promise from the play call or <code>null</code> if no sound was played.
    *******************************************************************************************************************/
    public playSound( id:string, loop:boolean = false ) : Promise<void>
    {
        if ( !bz.SettingDebug.DISABLE_SOUND )
        {
            bz.Debug.sound.log( 'Play sound [' + id + ']' );

            this.sounds[ id ].loop = loop;

            return this.sounds[ id ].play();
        }

        return null;
    }

    /** ****************************************************************************************************************
    *   Being invoked when one sound was loaded completely.
    *******************************************************************************************************************/
    private onLoadSound() : void
    {
        if ( ++this.loadedSoundCount >= this.fileNames.length )
        {
            bz.Debug.init.log( ' Sound load complete [' + String( this.fileNames.length ) + '] files' );

            this.onLoadComplete();
        }
    }

    /** ****************************************************************************************************************
    *   Returns the next id for a new sound to create.
    *
    *   @return The next free unique id for a new sound to create.
    *******************************************************************************************************************/
    public static createNextSoundId() : string
    {
        return 'sound' + String( SoundSystem.nextSoundId++ );
    }
}

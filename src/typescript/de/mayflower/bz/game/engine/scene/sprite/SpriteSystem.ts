
    import * as bz from '../../../..';

    /** ****************************************************************************************************************
    *   Specifies the sprite system.
    *******************************************************************************************************************/
    export class SpriteSystem
    {
        /** Next ID to assign for sprite creation. */
        private                         nextSpriteId                    :number                     = 0;

        /** Holds all sprite managers - one for each sprite file. */
        private                         spriteManagers                  :BABYLON.SpriteManager[]    = [];

        /** All sprite files to load. */
        private             readonly    filesToLoad                       :bz.SpriteFile[]            = [];

        /** ************************************************************************************************************
        *   Creates a new sprite system.
        *
        *   @param filesToLoad All sprite files to load.
        ***************************************************************************************************************/
        public constructor( filesToLoad:bz.SpriteFile[] )
        {
            this.filesToLoad = filesToLoad;
        }

        /** ************************************************************************************************************
        *   Creates one sprite manager for each sprite file.
        *
        *   @param scene The babylon.JS scene to append all textures to.
        ***************************************************************************************************************/
        public load( scene:BABYLON.Scene ) : void
        {
            for ( let i:number = 0; i < this.filesToLoad.length; ++i )
            {
                const spriteFile:bz.SpriteFile = this.filesToLoad[ i ];

                this.spriteManagers[ spriteFile.fileName ] = new BABYLON.SpriteManager
                (
                    'spriteManager' + i,
                    bz.SettingResource.PATH_IMAGE_SPRITE + spriteFile.fileName,
                    bz.SettingResource.MAX_SPRITE_INSTANCES,
                    spriteFile.frameSize,
                    scene
                );
            }
        }

        /** ************************************************************************************************************
        *   Returns the next id for a new sprite to create.
        *
        *   @return The next free unique id for a new sprite to create.
        ***************************************************************************************************************/
        public createNextSpriteId() : string
        {
            return 'sprite' + this.nextSpriteId++;
        }

        /** ************************************************************************************************************
        *   Returns the sprite manager for the specified sprite file.
        *
        *   @param spriteFile The sprite file to receive the sprite manager for.
        *
        *   @return The sprite manager that was created for the speicified sprite file.
        ***************************************************************************************************************/
        public getSpriteManager( spriteFile:string ) : BABYLON.SpriteManager
        {
            return this.spriteManagers[ spriteFile ];
        }
    }

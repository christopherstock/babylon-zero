
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

        /** ************************************************************************************************************
        *   Creates one sprite manager for each sprite file.
        *
        *   @param scene The babylon.JS scene to append all textures to.
        ***************************************************************************************************************/
        public init( scene:BABYLON.Scene ) : void
        {
            for (let i:number = 0; i < bz.SpriteFile.ALL_SPRITE_FILES.length; ++i )
            {
                const spriteFile:bz.SpriteFile = bz.SpriteFile.ALL_SPRITE_FILES[ i ];

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

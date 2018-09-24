
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   A wrapper class for babylon.JSs Sprite that offers additional functionality.
    *******************************************************************************************************************/
    export class Sprite
    {
        /** Next ID to assign for sprite creation. */
//        private         static          nextSpriteId                    :number                     = 0;

        /** Holds all sprite managers - one for each sprite file. */
//        private                         spriteManagers                  :BABYLON.SpriteManager[]    = [];

        /** ************************************************************************************************************
        *   Creates a sprite manager for each sprite file.
        ***************************************************************************************************************/
/*
        public init() : void
        {
            for (let i:number = 0; i < bz.Sprite.ALL_SPRITE_FILES.length; ++i )
            {
                const spriteFile:bz.Sprite = bz.Sprite.ALL_SPRITE_FILES[ i ];

                this.spriteManagers[ spriteFile.fileName ] = new BABYLON.SpriteManager
                (
                    'spriteManager' + i,
                    bz.SettingResource.PATH_IMAGE_SPRITE + spriteFile.fileName,
                    bz.SettingResource.MAX_SPRITE_INSTANCES,
                    spriteFile.frameSize,
                    bz.Main.game.engine.scene.getScene()
                );
            }
        }
*/
    }

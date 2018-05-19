
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Specifies the 'test' level.
    *******************************************************************************************************************/
    export class LevelTest extends bz.Level
    {
        /** ************************************************************************************************************
        *   Sets up the 'bunny' level.
        *
        *   @param scene The babylon.JS scene reference.
        ***************************************************************************************************************/
        constructor( scene:BABYLON.Scene )
        {
            super( scene );

            // Move to parent class Level later
            bz.Main.game.onInitLevelCompleted();
        }

        /** ************************************************************************************************************
        *   Creates and returns all walls this level consists of.
        *
        *   @return All walls of this level.
        ***************************************************************************************************************/
        protected createWalls() : bz.Wall[]
        {
            return [

                new bz.Wall
                (
                    // static ground
                    bz.MeshFactory.createBox
                    (
                        new BABYLON.Vector3( 0.0, -0.001, 0.0  ),
                        bz.PivotAnchor.DEBUG_NONE,
                        new BABYLON.Vector3( 40.0, 0.001,  40.0 ),
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                        bz.Texture.TEST,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.STATIC,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR
                    )
                ),

                new bz.Wall
                (
                    // static elevated ground
                    bz.MeshFactory.createBox
                    (
                        new BABYLON.Vector3( 0.0, -0.001, 0.0  ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 40.0, 0.001,  40.0 ),
                        new BABYLON.Vector3( 0.0, 0.0, 160.0 ),
                        bz.Texture.GRASS,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.STATIC,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR
                    )
                ),

                new bz.Wall
                (
                    // tree - standing (crossed)
                    bz.MeshFactory.createPlane
                    (
                        new BABYLON.Vector3( 5.0,  0.0, 20.0   ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        3.0,
                        7.0,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0   ),
                        bz.Texture.TREE,
                        bz.TextureHasAlpha.YES,
                        bz.TextureUV.ALL_TO_ONE,
                        null,
                        this.scene,
                        bz.Physic.STATIC,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR,
                        BABYLON.Mesh.DEFAULTSIDE
                    )
                ),

                new bz.Wall
                (
                    bz.MeshFactory.createPlane
                    (
                        new BABYLON.Vector3( 6.5,  0.0, 18.5   ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        3.0,
                        7.0,
                        new BABYLON.Vector3( 0.0, 270.0, 0.0   ),
                        bz.Texture.TREE,
                        bz.TextureHasAlpha.YES,
                        bz.TextureUV.ALL_TO_ONE,
                        null,
                        this.scene,
                        bz.Physic.STATIC,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR,
                        BABYLON.Mesh.DEFAULTSIDE
                    )
                ),

                new bz.Wall
                (
                    // plane - amiga at world origin
                    bz.MeshFactory.createPlane
                    (
                        new BABYLON.Vector3( 0.0,  0.0, 0.0   ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        2.0,
                        4.0,
                        new BABYLON.Vector3( 0.0, 45.0, 0.0   ),
                        bz.Texture.AMIGA,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.STATIC,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR,
                        BABYLON.Mesh.DEFAULTSIDE
                    )
                ),





                new bz.Wall
                (
                    // plane - amiga plane 45° - BACKSIDE
                    bz.MeshFactory.createPlane
                    (
                        new BABYLON.Vector3( 15.0, 0.0, 6.0 ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        7.0,
                        7.0,
                        new BABYLON.Vector3( 0.0, -45.0, 0.0 ),
                        bz.Texture.AMIGA,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.STATIC,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR,
                        BABYLON.Mesh.BACKSIDE
                    )
                ),
                new bz.Wall
                (
                    // plane - amiga plane 45° - FRONTSIDE
                    bz.MeshFactory.createPlane
                    (
                        new BABYLON.Vector3( 15.0, 0.0, 6.0 - 0.001 ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        7.0,
                        7.0,
                        new BABYLON.Vector3( 0.0, -45.0, 0.0 ),
                        bz.Texture.AMIGA,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.STATIC,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR,
                        BABYLON.Mesh.FRONTSIDE
                    )
                ),





                new bz.Wall
                (
                    // plane - amiga 180° - FRONTSIDE
                    bz.MeshFactory.createPlane
                    (
                        new BABYLON.Vector3( 8.0, 0.0, 6.0 - 0.001 ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        7.0,
                        7.0,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                        bz.Texture.GRASS,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.STATIC,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR,
                        BABYLON.Mesh.FRONTSIDE
                    )
                ),
                new bz.Wall
                (
                    // plane - amiga 180° - BACKSIDE
                    bz.MeshFactory.createPlane
                    (
                        new BABYLON.Vector3( 8.0, 0.0, 6.0 ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        7.0,
                        7.0,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                        bz.Texture.GRASS,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.STATIC,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR,
                        BABYLON.Mesh.BACKSIDE
                    )
                ),


                new bz.Wall
                (
                    // box - amiga straight
                    bz.MeshFactory.createBox
                    (
                        new BABYLON.Vector3( 20.0, 0.0, 11.0 ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 1.0, 7.0, 7.0 ),
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                        bz.Texture.AMIGA,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.STATIC,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR
                    )
                ),

                new bz.Wall
                (
                    // box - amiga 45°
                    bz.MeshFactory.createBox
                    (
                        new BABYLON.Vector3( 20.0, 0.0, 18.0 ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 1.0, 7.0, 7.0 ),
                        new BABYLON.Vector3( 0.0, -45.0, 0.0 ),
                        bz.Texture.AMIGA,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.STATIC,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR
                    )
                ),

                new bz.Wall
                (
                    // movable glass pane
                    bz.MeshFactory.createPlane
                    (
                        new BABYLON.Vector3( 2.0,  0.0, 15.0   ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        2.0, 3.0,
                        new BABYLON.Vector3( 0.0,  135.0, 0.0   ),
                        bz.Texture.GLASS,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.STATIC,
                        0.5,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR,
                        BABYLON.Mesh.DEFAULTSIDE
                    )
                ),

                new bz.Wall
                (
                    // triangle
                    bz.MeshFactory.createPolygon
                    (
                        [
                            new BABYLON.Vector3( 0.0,  0.0,  13.0    ),
                            new BABYLON.Vector3( 10.0, 0.0,  13.0    ),
                            new BABYLON.Vector3( 10.0, 0.0,  0.0     ),
                        ],
                        bz.PivotAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 270.0, 0.0, 0.0 ),
                        bz.Main.game.engine.material.solidRed,
                        this.scene,
                        bz.Physic.STATIC,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR
                    )
                ),
            ];
        }

        /** ************************************************************************************************************
        *   Creates and returns all movables this level consists of.
        *
        *   @return All movables of this level.
        ***************************************************************************************************************/
        protected createMovables() : bz.Movable[]
        {
            return [

                new bz.Movable
                (
                    // movable crate - small
                    bz.MeshFactory.createBox
                    (
                        new BABYLON.Vector3( 12.0, 0.0, 12.0   ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 1.0, 1.0, 1.0 ),
                        new BABYLON.Vector3( 0.0, 45.0, 0.0 ),
                        bz.Texture.WOOD,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.LIGHT_WOOD,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR
                    )
                ),

                new bz.Movable
                (
                    // movable crate - big
                    bz.MeshFactory.createBox
                    (
                        new BABYLON.Vector3( -1.0,  3.0, 5.0   ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 2.0, 2.0, 2.0 ),
                        new BABYLON.Vector3( 0.0, 30.0, 0.0 ),
                        bz.Texture.WOOD,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.LIGHT_WOOD,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR
                    )
                ),

                new bz.Movable
                (
                    // movable crate - different UVs for all sides
                    bz.MeshFactory.createBox
                    (
                        new BABYLON.Vector3( 24.0,  0.0, 12.0   ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 1.0, 2.0, 3.0 ),
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                        bz.Texture.TEST,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.LIGHT_WOOD,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR
                    )
                ),

                new bz.Movable
                (
                    // movable glass quader
                    bz.MeshFactory.createBox
                    (
                        new BABYLON.Vector3( 2.0,  0.0, 2.0   ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 1.0, 2.0, 3.0    ),
                        new BABYLON.Vector3( 0.0,  45.0, 0.0   ),
                        bz.Texture.GLASS,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.LIGHT_WOOD,
                        0.5,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR
                    )
                ),

                new bz.Movable
                (
                    // small crate - density crafting
                    bz.MeshFactory.createBox
                    (
                        new BABYLON.Vector3( 5.5, 0.0, 22.0 ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 1.0, 1.0, 1.0 ),
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                        bz.Texture.WOOD,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.LIGHT_WOOD,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR
                    )
                ),

                new bz.Movable
                (
                    // medium crate - density crafting
                    bz.MeshFactory.createBox
                    (
                        new BABYLON.Vector3( 5.5, 0.0, 25.0 ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 2.0, 2.0, 2.0 ),
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                        bz.Texture.WOOD,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.LIGHT_WOOD,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR
                    )
                ),

                new bz.Movable
                (
                    // large crate - density crafting
                    bz.MeshFactory.createBox
                    (
                        new BABYLON.Vector3( 5.5, 0.0, 30.0 ),
                        bz.PivotAnchor.LOWEST_XYZ,
                        new BABYLON.Vector3( 3.0, 3.0, 3.0 ),
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                        bz.Texture.WOOD,
                        bz.TextureHasAlpha.NO,
                        bz.TextureUV.TILED_BY_SIZE,
                        null,
                        this.scene,
                        bz.Physic.LIGHT_WOOD,
                        1.0,
                        bz.SettingGame.LEVEL_EMISSIVE_COLOR
                    ),
                ),
            ];
        }

        /** ************************************************************************************************************
        *   Creates and returns all items this level consists of.
        *
        *   @return All items of this level.
        ***************************************************************************************************************/
        protected createItems() : bz.Item[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates and returns all bots this level consists of.
        *
        *   @return All bots of this level.
        ***************************************************************************************************************/
        protected createBots() : bz.Bot[]
        {
            return [];
        }
    }

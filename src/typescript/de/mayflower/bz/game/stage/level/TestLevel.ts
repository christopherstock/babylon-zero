
    import * as bz  from '../../..';
    import * as bjs from 'babylonjs'

    /** ****************************************************************************************************************
    *   Specifies the 'test' level that tries out all level components.
    *******************************************************************************************************************/
    export class TestLevel extends bz.Stage
    {
        /** ************************************************************************************************************
        *   Creates a new test level.
        *
        *   @param scene     The scene reference.
        *   @param canvas    The canvas system this stage is displayed on.
        *   @param keySystem The key system being used in this stage.
        ***************************************************************************************************************/
        public constructor( scene:bz.Scene, canvas:bz.CanvasSystem, keySystem:bz.KeySystem )
        {
            super
            (
                scene,
                canvas,
                keySystem,

                new bjs.Color3( 0.1, 0.1, 0.1 ),
                bz.SettingColor.COLOR_RGBA_BLACK_OPAQUE,
                bz.CameraType.FIRST_PERSON,
                bz.GUIType.GAME
            );
        }

        /** ************************************************************************************************************
        *   Sets up the player for this stage.
        *
        *   @return The player instance for this stage.
        ***************************************************************************************************************/
        protected createPlayer() : bz.Player
        {
            return new bz.PlayerHuman
            (
                this,
                this.scene,
                new BABYLON.Vector3( 15.0, bz.SettingPlayerHuman.HEIGHT_Y_STANDING / 2, 15.0 ),
                225.0,
                this.ambientColor
            );
        }

        /** ************************************************************************************************************
        *   Creates the camera system that manages all cameras that appear in this level.
        *
        *   @return The camera system for this stage.
        ***************************************************************************************************************/
        protected createCameraSystem() : bz.CameraSystem
        {
            return new bz.CameraSystem
            (
                this.scene.getNativeScene(),
                this.canvas.getNativeCanvas(),

                new BABYLON.Vector3( 20.0, 5.0, 20.0 ),
                new BABYLON.Vector3( 20.0, 5.0, 20.0 ),
                new BABYLON.Vector3( 0.0,  0.0, 0.0  ),

                new BABYLON.Vector3( 0.0,  0.0, 0.0  ),
                this.player.getThirdPersonCameraTargetMesh(),
                this.player.getThirdPersonCameraTargetMesh(),
                this.player.getFirstPersonCameraTargetMesh()
            );
        }

        /** ************************************************************************************************************
        *   Creates and returns all walls this stage consists of.
        *
        *   @return All walls of this stage.
        ***************************************************************************************************************/
        protected createWalls() : bz.Wall[]
        {
            return [

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // static ground
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 0.0, -bz.MeshFactory.FACE_DEPTH, 0.0  ),
                                bz.MeshPivotAnchor.NONE,
                                new BABYLON.Vector3( 40.0, bz.MeshFactory.FACE_DEPTH,  40.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_TEST,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // static elevated ground
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 0.0, -bz.MeshFactory.FACE_DEPTH, 0.0  ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 40.0, bz.MeshFactory.FACE_DEPTH,  40.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 160.0 ),
                                bz.Texture.WALL_GRASS,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // tree - standing (crossed)
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 5.0,  0.0, 20.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 3.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0   ),
                                bz.Texture.WALL_TREE,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 6.5,  0.0, 18.5   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 3.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0, 270.0, 0.0   ),
                                bz.Texture.WALL_TREE,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // plane - amiga at world origin
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 0.0,  0.0, 0.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 2.0,  4.0, bz.MeshFactory.FACE_DEPTH   ),
                                new BABYLON.Vector3( 0.0, 45.0, 0.0   ),
                                bz.Texture.WALL_AMIGA,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // plane - amiga plane 45° - BACKSIDE
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 15.0, 0.0, 6.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 7.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0, -45.0, 0.0 ),
                                bz.Texture.WALL_AMIGA,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // plane - amiga plane 45° - FRONTSIDE
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 21.0, 0.0, 30.0 - bz.MeshFactory.FACE_DEPTH ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 7.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0, 65.0, 0.0 ),
                                bz.Texture.WALL_AMIGA,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // plane - amiga 180° - FRONTSIDE
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 8.0, 0.0, 6.0 - bz.MeshFactory.FACE_DEPTH ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 7.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_GRASS,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // plane - amiga 180° - BACKSIDE
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 8.0, 0.0, 6.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 7.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_GRASS,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // box - amiga light frontside
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 20.0, 0.0, 11.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 1.0, 7.0, 7.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_AMIGA,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // box - amiga light backside
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 10.0, 0.0, 18.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 1.0, 7.0, 7.0 ),
                                new BABYLON.Vector3( 0.0, 180.0, 0.0 ),
                                bz.Texture.WALL_AMIGA,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // movable glass pane
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 2.0,  0.0, 15.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 2.0, 3.0, bz.MeshFactory.FACE_DEPTH ),
                                new BABYLON.Vector3( 0.0,  135.0, 0.0   ),
                                bz.Texture.WALL_GLASS,
                                null,
                                bz.Physic.STATIC,
                                0.5,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // triangle
                            bz.MeshFactory.createPolygon
                            (
                                this.scene,
                                [
                                    new BABYLON.Vector3( 0.0,  0.0,  13.0    ),
                                    new BABYLON.Vector3( 10.0, 0.0,  13.0    ),
                                    new BABYLON.Vector3( 10.0, 0.0,  0.0     ),
                                ],
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 270.0, 0.0, 0.0 ),
                                bz.SettingColor.COLOR_RGB_RED,
                                bz.Physic.STATIC,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // movable crate - small
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 12.0, 0.0, 12.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 1.0, 1.0, 1.0 ),
                                new BABYLON.Vector3( 0.0, 45.0, 0.0 ),
                                bz.Texture.WALL_WOOD,
                                null,
                                bz.Physic.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // movable crate - big
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( -1.0,  3.0, 5.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 2.0, 2.0, 2.0 ),
                                new BABYLON.Vector3( 0.0, 30.0, 0.0 ),
                                bz.Texture.WALL_WOOD,
                                null,
                                bz.Physic.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // movable crate - different UVs for all sides
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 24.0,  0.0, 12.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 1.0, 2.0, 3.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_TEST,
                                null,
                                bz.Physic.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // movable glass quader
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 2.0,  0.0, 2.0   ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 1.0, 2.0, 3.0    ),
                                new BABYLON.Vector3( 0.0,  45.0, 0.0   ),
                                bz.Texture.WALL_GLASS,
                                null,
                                bz.Physic.LIGHT_WOOD,
                                0.5,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // small crate - density crafting
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 5.5, 0.0, 22.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 1.0, 1.0, 1.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_WOOD,
                                null,
                                bz.Physic.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // medium crate - density crafting
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 5.5, 0.0, 25.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 2.0, 2.0, 2.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_WOOD,
                                null,
                                bz.Physic.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // large crate - density crafting
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 5.5, 0.0, 30.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 3.0, 3.0, 3.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_WOOD,
                                null,
                                bz.Physic.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            // sphere
                            bz.MeshFactory.createSphere
                            (
                                this.scene,
                                new BABYLON.Vector3( 10.5, 0.0, 30.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                3.0,
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_TEST,
                                null,
                                bz.Physic.LIGHT_WOOD,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),

                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.OFFICE_CHAIR_1,
                        new BABYLON.Vector3( -10.0, 20.0, 0.0 ),
                        bz.Physic.SOLID_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),

                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.OFFICE_CHAIR_1,
                        new BABYLON.Vector3( -10.0, 20.0, 10.0 ),
                        bz.Physic.SOLID_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),

                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.OFFICE_CHAIR_1,
                        new BABYLON.Vector3( -10.0, 20.0, 15.0 ),
                        bz.Physic.SOLID_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),
            ];
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        *
        *   @param keySystem The key system to use for key determination.
        ***************************************************************************************************************/
        protected handleLevelKeys( keySystem:bz.KeySystem ) : void
        {
        }

        /** ************************************************************************************************************
        *   Creates and returns all items this stage consists of.
        *
        *   @return All items of this stage.
        ***************************************************************************************************************/
        protected createItems() : bz.Item[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates and returns all bots this stage consists of.
        *
        *   @return All bots of this stage.
        ***************************************************************************************************************/
        protected createBots() : bz.Bot[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Sets up the skybox.
        *
        *   @return The created skybox for this stage.
        ***************************************************************************************************************/
        protected createSkybox() : BABYLON.Mesh
        {
            return bz.MeshFactory.createSkyBoxCube( this.scene.getNativeScene(), bz.SkyBoxFile.DARK_SKY, 0.15 );
        }

        /** ************************************************************************************************************
        *   Creates all sprites that appear in the stage.
        *
        *   @return All sprites that appear in this stage.
        ***************************************************************************************************************/
        protected createSprites() : bz.Sprite[]
        {
            return [

                new bz.Sprite
                (
                    this.scene,
                    bz.SpriteFile.TREE,
                    new BABYLON.Vector3( 45.0, 5.0, -35.0  ),
                    10.0,
                    20.0,
                    bz.MeshPivotAnchor.CENTER_XYZ,
                    bz.SpriteCollidable.NO
                ),
                new bz.Sprite
                (
                    this.scene,
                    bz.SpriteFile.TREE,
                    new BABYLON.Vector3( 45.0, 5.0, -20.0  ),
                    10.0,
                    20.0,
                    bz.MeshPivotAnchor.CENTER_XYZ,
                    bz.SpriteCollidable.NO
                ),
                new bz.Sprite
                (
                    this.scene,
                    bz.SpriteFile.TREE,
                    new BABYLON.Vector3( 45.0, 5.0, -5.0  ),
                    10.0,
                    20.0,
                    bz.MeshPivotAnchor.CENTER_XYZ,
                    bz.SpriteCollidable.NO
                ),
                new bz.Sprite
                (
                    this.scene,
                    bz.SpriteFile.TREE,
                    new BABYLON.Vector3( 45.0, 5.0, 10.0  ),
                    10.0,
                    20.0,
                    bz.MeshPivotAnchor.CENTER_XYZ,
                    bz.SpriteCollidable.NO
                ),
                new bz.Sprite
                (
                    this.scene,
                    bz.SpriteFile.TREE,
                    new BABYLON.Vector3( 45.0, 5.0, -25.0  ),
                    10.0,
                    20.0,
                    bz.MeshPivotAnchor.CENTER_XYZ,
                    bz.SpriteCollidable.NO
                ),
            ];
        }

        /** ************************************************************************************************************
        *   Creates all lights that appear in this level.
        *
        *   @return All lights that appear in this stage.
        ***************************************************************************************************************/
        protected createLights() : BABYLON.Light[]
        {
            // const lights:BABYLON.Light[] = [

            return [

                // hemispheric light
                bz.LightFactory.createHemispheric
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 0.0, 1.0, 0.0 ),
                    new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                    new BABYLON.Color3( 0.1, 0.1, 0.1 ),
                    new BABYLON.Color3( 0.0, 0.0, 0.0 ),
                    false
                ),

                // directional light
                bz.LightFactory.createDirectional
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 0.5, -1.0, 0.0 ),
                    new BABYLON.Vector3( 20.0, 20.0, 20.0 ),
                    1.0,
                    new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                    new BABYLON.Color3( 1.0, 0.5, 0.0 ),
                    false
                ),

                // spot light
                bz.LightFactory.createSpot
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 15.0, 20.0, 15.0 ),
                    new BABYLON.Vector3( 0.0, -1.0, 0.0 ),
                    30.0,
                    2,
                    new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                    new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                    50.0,
                    false
                ),

                // point light
                bz.LightFactory.createPoint
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 15.0, 3.0, 16.0 ),
                    new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                    new BABYLON.Color3( 0.0, 0.0, 0.0 ),
                    50.0,
                    1.0,
                    true
                ),
            ];
        }

        /** ************************************************************************************************************
        *   Creates all shadow generators that appear in this level.
        *
        *   @return All shadow generators that appear in this stage.
        ***************************************************************************************************************/
        protected createShadowGenerators() : BABYLON.ShadowGenerator[]
        {
            const shadowGenerators:BABYLON.ShadowGenerator[] = [
                new BABYLON.ShadowGenerator( 2048, ( this.lights[ 2 ] as BABYLON.SpotLight ) ),
            ];

            shadowGenerators[ 0 ].useExponentialShadowMap = true;
            shadowGenerators[ 0 ].usePoissonSampling      = true;

            return shadowGenerators;
        }

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes that shall cast a shadow.
        ***************************************************************************************************************/
        protected setupShadows() : void
        {
            // set shadows for all walls
            for ( const wall of this.walls )
            {
                wall.getModel().applyShadowGenerator( this.shadowGenerators[ 0 ] );
            }
        }

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected setupFog() : void
        {
            this.scene.disableFog();
        }

        /** ************************************************************************************************************
        *   Sets up the mouse system.
        ***************************************************************************************************************/
        protected createMouseSystem() : bz.MouseSystem
        {
            return new bz.MouseSystem( this, this.canvas, false, true );
        }

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected onInitComplete() : void
        {
        }
    }

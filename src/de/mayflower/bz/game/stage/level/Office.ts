
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Specifies the 'office' level.
    *******************************************************************************************************************/
    export class Office extends bz.Stage
    {
        /** A test mesh 'chair'. */
        protected                           chair                   :BABYLON.AbstractMesh[]                 = [];
        /** The testwise rotation X for the chair. */
        protected                           chairRotX               :number                                 = 0.0;

        /** ************************************************************************************************************
        *   Creates a new test office.
        *
        *   @param scene The babylon.JS scene reference.
        ***************************************************************************************************************/
        public constructor( scene:BABYLON.Scene )
        {
            super
            (
                scene,
                bz.SettingColor.COLOR_RGB_WHITE,
                bz.SettingColor.COLOR_RGBA_WHITE_OPAQUE
            );
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // invoke parent method
            super.render();

            // rotate test chair
            for ( const mesh of this.chair )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ
                (
                    mesh,
                    this.chairRotX,
                    0.0,
                    0.0
                );
            }

            this.chairRotX += 0.5;
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        ***************************************************************************************************************/
        public handleLevelKeys() : void
        {
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );


                bz.Main.game.engine.soundSystem.playSound( bz.Sound.TEST_FX_1 );
                bz.Main.game.engine.soundSystem.playSound( bz.Sound.TEST_BG_STONE_AGE_THE_GOLDEN_VALLEY, true );
            }




        }

        /** ************************************************************************************************************
        *   Sets up the player for this stage.
        *
        *   @return The player instance for this stage.
        ***************************************************************************************************************/
        protected createPlayer() : bz.Player
        {
            return new bz.Player
            (
                new BABYLON.Vector3( 5.0, 0.0, 5.0 ),
                0.0,
                this.ambientColor
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
                    [
                        // static ground
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 0.0, -bz.MeshFactory.FACE_DEPTH, 0.0  ),
                            bz.MeshPivotAnchor.NONE,
                            new BABYLON.Vector3( 25.0, bz.MeshFactory.FACE_DEPTH, 25.0 ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.Texture.TEST,
                            null,
                            this.scene,
                            bz.Physic.STATIC,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),
/*
                new bz.Wall
                (
                    [
                        // static elevated ground
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 0.0, -bz.MeshFactory.FACE_DEPTH, 0.0  ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 40.0, bz.MeshFactory.FACE_DEPTH,  40.0 ),
                            new BABYLON.Vector3( 0.0, 0.0, 160.0 ),
                            bz.Texture.GRASS,
                            null,
                            this.scene,
                            bz.Physic.STATIC,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Wall
                (
                    [
                        // tree - standing (crossed)
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 5.0,  0.0, 20.0   ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 3.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0   ),
                            bz.Texture.TREE,
                            null,
                            this.scene,
                            bz.Physic.STATIC,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Wall
                (
                    [
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 6.5,  0.0, 18.5   ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 3.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                            new BABYLON.Vector3( 0.0, 270.0, 0.0   ),
                            bz.Texture.TREE,
                            null,
                            this.scene,
                            bz.Physic.STATIC,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Wall
                (
                    [
                        // plane - amiga at world origin
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 0.0,  0.0, 0.0   ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 2.0,  4.0, bz.MeshFactory.FACE_DEPTH   ),
                            new BABYLON.Vector3( 0.0, 45.0, 0.0   ),
                            bz.Texture.AMIGA,
                            null,
                            this.scene,
                            bz.Physic.STATIC,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Wall
                (
                    [
                        // plane - amiga plane 45° - BACKSIDE
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 15.0, 0.0, 6.0 ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 7.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                            new BABYLON.Vector3( 0.0, -45.0, 0.0 ),
                            bz.Texture.AMIGA,
                            null,
                            this.scene,
                            bz.Physic.STATIC,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),
                new bz.Wall
                (
                    [
                        // plane - amiga plane 45° - FRONTSIDE
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 15.0, 0.0, 6.0 - bz.MeshFactory.FACE_DEPTH ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 7.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                            new BABYLON.Vector3( 0.0, -45.0, 0.0 ),
                            bz.Texture.AMIGA,
                            null,
                            this.scene,
                            bz.Physic.STATIC,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Wall
                (
                    [
                        // plane - amiga 180° - FRONTSIDE
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 8.0, 0.0, 6.0 - bz.MeshFactory.FACE_DEPTH ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 7.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.Texture.GRASS,
                            null,
                            this.scene,
                            bz.Physic.STATIC,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),
                new bz.Wall
                (
                    [
                        // plane - amiga 180° - BACKSIDE
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 8.0, 0.0, 6.0 ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 7.0, 7.0, bz.MeshFactory.FACE_DEPTH ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.Texture.GRASS,
                            null,
                            this.scene,
                            bz.Physic.STATIC,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Wall
                (
                    [
                        // box - amiga light frontside
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 20.0, 0.0, 11.0 ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 1.0, 7.0, 7.0 ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.Texture.AMIGA,
                            null,
                            this.scene,
                            bz.Physic.STATIC,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Wall
                (
                    [
                        // box - amiga light backside
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 10.0, 0.0, 18.0 ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 1.0, 7.0, 7.0 ),
                            new BABYLON.Vector3( 0.0, 180.0, 0.0 ),
                            bz.Texture.AMIGA,
                            null,
                            this.scene,
                            bz.Physic.STATIC,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Wall
                (
                    [
                        // movable glass pane
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 2.0,  0.0, 15.0   ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 2.0, 3.0, bz.MeshFactory.FACE_DEPTH ),
                            new BABYLON.Vector3( 0.0,  135.0, 0.0   ),
                            bz.Texture.GLASS,
                            null,
                            this.scene,
                            bz.Physic.STATIC,
                            0.5,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Wall
                (
                    [
                        // triangle
                        bz.MeshFactory.createPolygon
                        (
                            [
                                new BABYLON.Vector3( 0.0,  0.0,  13.0    ),
                                new BABYLON.Vector3( 10.0, 0.0,  13.0    ),
                                new BABYLON.Vector3( 10.0, 0.0,  0.0     ),
                            ],
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 270.0, 0.0, 0.0 ),
                            bz.SettingGame.COLOR_RED,
                            this.scene,
                            bz.Physic.STATIC,
                            this.ambientColor
                        ),
                    ]
                ),
*/
            ];
        }

        /** ************************************************************************************************************
        *   Creates and returns all movables this stage consists of.
        *
        *   @return All movables of this stage.
        ***************************************************************************************************************/
        protected createMovables() : bz.Movable[]
        {
            return [
/*
                new bz.Movable
                (
                    [
                        // movable crate - small
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 12.0, 0.0, 12.0   ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 1.0, 1.0, 1.0 ),
                            new BABYLON.Vector3( 0.0, 45.0, 0.0 ),
                            bz.Texture.WOOD,
                            null,
                            this.scene,
                            bz.Physic.LIGHT_WOOD,
                            1.0,
                            this.ambientColor
                        )
                    ]
                ),

                new bz.Movable
                (
                    [
                        // movable crate - big
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( -1.0,  3.0, 5.0   ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 2.0, 2.0, 2.0 ),
                            new BABYLON.Vector3( 0.0, 30.0, 0.0 ),
                            bz.Texture.WOOD,
                            null,
                            this.scene,
                            bz.Physic.LIGHT_WOOD,
                            1.0,
                            this.ambientColor
                        )
                    ]
                ),

                new bz.Movable
                (
                    [
                        // movable crate - different UVs for all sides
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 24.0,  0.0, 12.0   ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 1.0, 2.0, 3.0 ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.Texture.TEST,
                            null,
                            this.scene,
                            bz.Physic.LIGHT_WOOD,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Movable
                (
                    [
                        // movable glass quader
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 2.0,  0.0, 2.0   ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 1.0, 2.0, 3.0    ),
                            new BABYLON.Vector3( 0.0,  45.0, 0.0   ),
                            bz.Texture.GLASS,
                            null,
                            this.scene,
                            bz.Physic.LIGHT_WOOD,
                            0.5,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Movable
                (
                    [
                        // small crate - density crafting
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 5.5, 0.0, 22.0 ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 1.0, 1.0, 1.0 ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.Texture.WOOD,
                            null,
                            this.scene,
                            bz.Physic.LIGHT_WOOD,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Movable
                (
                    [
                        // medium crate - density crafting
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 5.5, 0.0, 25.0 ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 2.0, 2.0, 2.0 ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.Texture.WOOD,
                            null,
                            this.scene,
                            bz.Physic.LIGHT_WOOD,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Movable
                (
                    [
                        // large crate - density crafting
                        bz.MeshFactory.createBox
                        (
                            new BABYLON.Vector3( 5.5, 0.0, 30.0 ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            new BABYLON.Vector3( 3.0, 3.0, 3.0 ),
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.Texture.WOOD,
                            null,
                            this.scene,
                            bz.Physic.LIGHT_WOOD,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),

                new bz.Movable
                (
                    [
                        // sphere
                        bz.MeshFactory.createSphere
                        (
                            new BABYLON.Vector3( 10.5, 0.0, 30.0 ),
                            bz.MeshPivotAnchor.LOWEST_XYZ,
                            3.0,
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.Texture.TEST,
                            null,
                            this.scene,
                            bz.Physic.LIGHT_WOOD,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                ),
*/
            ];
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
        *   Creates and returns all imported meshes this stage consists of.
        *
        *   @return All imported meshes of this stage.
        ***************************************************************************************************************/
        protected createImportedMeshes() : BABYLON.AbstractMesh[][]
        {
            bz.Debug.stage.log( 'Importing stage meshes' );

            // import mesh model
            this.chair = bz.MeshFactory.createImportedMesh
            (
                bz.Model.OFFICE_CHAIR_2,
                new BABYLON.Vector3( 5.0, 0.0, 5.0 ),
                bz.MeshPivotAnchor.CENTER_XYZ,
                this.scene
            );


            return [

                bz.MeshFactory.createImportedMesh
                (
                    bz.Model.SHELLS,
                    new BABYLON.Vector3( 10.0, 0.0, 10.0 ),
                    bz.MeshPivotAnchor.CENTER_XYZ,
                    this.scene
                ),

                this.chair
            ];
/*
            const centerMesh:BABYLON.Mesh = bz.MeshFactory.createBox
            (
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.PivotAnchor.CENTER_XYZ,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                null,
                null,
                this.scene,
                bz.Physic.NONE,
                0.0,
                this.ambientColor
            );
*/
        }

        /** ************************************************************************************************************
        *   Sets up the skybox.
        *
        *   @return The created skybox for this stage.
        ***************************************************************************************************************/
        protected createSkybox() : BABYLON.Mesh
        {
            return bz.MeshFactory.createSkyBoxCube( 1.0, 'bluesky', this.scene );
        }

        /** ************************************************************************************************************
        *   Creates all sprites that appear in the stage.
        *
        *   @return All sprites that appear in this stage.
        ***************************************************************************************************************/
        protected createSprites() : BABYLON.Sprite[]
        {
/*
            // test an animated sprite
            const testSprite:BABYLON.Sprite = bz.Main.game.engine.spriteSystem.createSprite
            (
                bz.Sprite.TEST,
                new BABYLON.Vector3( 0.0, 0.0, 10.0  ),
                15.0,
                30.0,
                bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y
            );
            testSprite.playAnimation( 0, 43, true, 100, () => {} );
*/
            return [

                bz.Main.game.engine.spriteSystem.createSprite
                (
                    bz.Sprite.TREE,
                    new BABYLON.Vector3( 20.0, 0.0, 10.0 ),
                    15.0,
                    30.0,
                    bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y
                ),

                bz.Main.game.engine.spriteSystem.createSprite
                (
                    bz.Sprite.TREE_WHITE,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                    10.0,
                    20.0,
                    bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y
                ),
/*
                testSprite,
*/
/*
                bz.Main.game.engine.spriteSystem.createSprite
                (
                    bz.Main.game.engine.spriteSystem.managerTreeSprite,
                    new BABYLON.Vector3( 45.0, 5.0, 10.0  ),
                    10.0,
                    20.0
                ),
*/
            ];
        }

        /** ************************************************************************************************************
        *   Creates all lights that appear in this level.
        *
        *   @return All lights that appear in this stage.
        ***************************************************************************************************************/
        protected createLights() : BABYLON.Light[]
        {
            const lights:BABYLON.Light[] = [
/*
                // hemispheric light
                bz.LightFactory.createHemispheric
                (
                    this.scene,
                    new BABYLON.Vector3( 0.0, 1.0, 0.0 ),
                    new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                    new BABYLON.Color3( 0.1, 0.1, 0.1 ),
                    new BABYLON.Color3( 0.0, 0.0, 0.0 )
                ),

                // directional light
                bz.LightFactory.createDirectional
                (
                    this.scene,
                    new BABYLON.Vector3( 0.5, -1.0, 0.0 ),
                    new BABYLON.Vector3( 20.0, 20.0, 20.0 ),
                    1.0,
                    new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                    new BABYLON.Color3( 1.0, 0.5, 0.0 ),
                ),

                // spot light
                bz.LightFactory.createSpot
                (
                    this.scene,
                    new BABYLON.Vector3( 15.0, 20.0, 15.0 ),
                    new BABYLON.Vector3( 0.0, -1.0, 0.0 ),
                    bz.MathUtil.degreesToRad( 30.0 ),
                    2,
                    new BABYLON.Color3( 0.5, 0.5, 0.5 ),
                    new BABYLON.Color3( 1.0, 1.0, 1.0 )
                ),

                // point light
                bz.LightFactory.createPoint
                (
                    this.scene,
                    new BABYLON.Vector3( 15.0, 3.0, 16.0 ),
                    1.0,
                    new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                    new BABYLON.Color3( 0.0, 0.0, 0.0 )
                ),
*/
            ];
/*
            lights[ 0 ].setEnabled( false );
            lights[ 1 ].setEnabled( false );
            lights[ 2 ].setEnabled( false );
            lights[ 3 ].setEnabled( true  );
*/
            return lights;
        }

        /** ************************************************************************************************************
        *   Creates all shadow generators that appear in this level.
        *
        *   @return All shadow generators that appear in this stage.
        ***************************************************************************************************************/
        protected createShadowGenerators() : BABYLON.ShadowGenerator[]
        {
            const shadowGenerators:BABYLON.ShadowGenerator[] = [
/*
                new BABYLON.ShadowGenerator( 2048, ( this.lights[ 2 ] as BABYLON.SpotLight ) ),
*/
            ];
/*
            shadowGenerators[ 0 ].useExponentialShadowMap = true;
            shadowGenerators[ 0 ].usePoissonSampling      = true;
*/
            return shadowGenerators;
        }

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected setupShadows() : void
        {
/*
            // set shadows for all movables
            for ( const movable of this.movables )
            {
                // set shadows for all meshes
                for ( const mesh of movable.getMeshes() )
                {
                    this.shadowGenerators[ 0 ].getShadowMap().renderList.push( mesh );
                }
            }

            // set shadows for all walls
            for ( const wall of this.walls )
            {
                // set shadows for all meshes
                for ( const mesh of wall.getMeshes() )
                {
                    this.shadowGenerators[ 0 ].getShadowMap().renderList.push( mesh );
                }
            }
*/
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
                this.scene,
                this.player,
                bz.Main.game.engine.canvas.getCanvas(),
                new BABYLON.Vector3( 20.0, 5.0, 20.0 ),
                new BABYLON.Vector3( 20.0, 5.0, 20.0 ),
                new BABYLON.Vector3( 0.0,  0.0, 0.0  ),
                this.player.getThirdPersonCameraTargetMesh(),
                this.player.getThirdPersonCameraTargetMesh(),
                this.player.getFirstPersonCameraTargetMesh(),
                bz.CameraType.FREE_DEBUG
            );
        }

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected onInitComplete() : void
        {
        }

        /** ************************************************************************************************************
        *   Creates the GUIs for this stage.
        ***************************************************************************************************************/
        protected createGuis() : void
        {
        }
    }


    import * as bz from '../../..';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   Specifies the 'office' level.
    *******************************************************************************************************************/
    export class Office extends bz.Stage
    {
        /** The width of the horizontal border for all HUD elements. */
        private     static  readonly        HUD_BORDER_X            :number                                 = 50.0;
        /** The height of the horizontal border for all HUD elements. */
        private     static  readonly        HUD_BORDER_Y            :number                                 = 50.0;

        /** A test mesh 'chair'. */
        protected                           chair                   :bz.Model                               = null;
        /** The testwise rotation X for the chair. */
        protected                           chairRotX               :number                                 = 0.0;

        /** The FPS text. */
        protected                           fpsText                 :BABYLON_GUI.TextBlock                  = null;

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

            // assign fps
            const fps:string = bz.Main.game.engine.babylonEngine.getFps().toFixed( 2 );
            this.fpsText.text = fps + ' fps';
/*
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
*/
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
                    new bz.Model
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
                    )
                ),
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
            ];
        }

        /** ************************************************************************************************************
        *   Creates and returns all items this stage consists of.
        *
        *   @return All items of this stage.
        ***************************************************************************************************************/
        protected createItems() : bz.Item[]
        {
            return [

                new bz.Item
                (
                    bz.MeshFactory.createImportedMesh
                    (
                        bz.ModelFile.SHELLS,
                        new BABYLON.Vector3( 10.0, 0.0, 10.0 ),
                        bz.MeshPivotAnchor.CENTER_XYZ,
                        this.scene
                    )
                ),

                new bz.Item
                (
                    bz.MeshFactory.createImportedMesh
                    (
                        bz.ModelFile.SHELLS,
                        new BABYLON.Vector3( 15.0, 0.0, 10.0 ),
                        bz.MeshPivotAnchor.CENTER_XYZ,
                        this.scene
                    )
                ),

                new bz.Item
                (
                    bz.MeshFactory.createImportedMesh
                    (
                        bz.ModelFile.SHELLS,
                        new BABYLON.Vector3( 20.0, 0.0, 10.0 ),
                        bz.MeshPivotAnchor.CENTER_XYZ,
                        this.scene
                    )
                ),

            ];
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
        *   Creates and returns all imported models this stage consists of.
        *
        *   @return All imported models of this stage.
        ***************************************************************************************************************/
        protected createImportedMeshes() : bz.Model[]
        {
            bz.Debug.stage.log( 'Importing stage meshes' );

            // import mesh model
            this.chair = bz.MeshFactory.createImportedMesh
            (
                bz.ModelFile.OFFICE_CHAIR_2,
                new BABYLON.Vector3( 5.0, 0.0, 5.0 ),
                bz.MeshPivotAnchor.CENTER_XYZ,
                this.scene
            );

            return [
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
            this.guiFg = bz.GuiFactory.createGUI( bz.Main.game.engine.scene.getScene(), true );

            this.fpsText = bz.GuiFactory.createTextBlock
            (
                '',
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                -Office.HUD_BORDER_X,
                Office.HUD_BORDER_Y,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                null
            );
            this.guiFg.addControl( this.fpsText );
        }
    }

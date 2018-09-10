
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Specifies the 'office' level.
    *******************************************************************************************************************/
    export class Office extends bz.Stage
    {
        /** A testwise mesh 'chair'. */
        protected                           chairSingle             :bz.Model                               = null;
        /** A testwise mesh 'chair'. */
        protected                           chairMulti              :bz.Model                               = null;
        /** A testwise mesh 'chair'. */
        protected                           chairMultiPhysics       :bz.Model                               = null;
        /** A testwise mesh 'compound spheres'. */
        protected                           compoundSpheres         :bz.Model                               = null;
        /** The testwise rotation X for the testwise chair. */
        protected                           chairRot                :number                                 = 0.0;

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
                bz.SettingColor.COLOR_RGBA_WHITE_OPAQUE,
                bz.CameraType.FIRST_PERSON
            );
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // invoke parent method
            super.render();

            // stop the red sphere from rolling endlessly
            this.walls[ 4 ].getModel().lowerLinearVelocity();
            this.walls[ 4 ].getModel().lowerAngularVelocity();
/*
            // rotate test chairs
            this.chairSingle.setAbsoluteRotationXYZ( 0.0, this.chairRot, 0.0 );
            this.chairMulti.setAbsoluteRotationXYZ(  0.0, this.chairRot, 0.0 );

            this.chairRot += 0.5;
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

                // add HUD message to queue
                this.hud.addHudMessage( 'explode compound spheres [' + bz.String.getDateTimeString() + ']' );

                // explode compound spheres
                this.compoundSpheres.removeCompoundMesh( this.scene );
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
                new BABYLON.Vector3( 5.0, 0.0, 10.0 ),
                45.0,
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
            // import mesh model
            this.chairSingle = bz.MeshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_2,
                new BABYLON.Vector3( 5.0, 0.0, 5.0 ),
                this.scene,
                bz.Physic.SOLID_WOOD,
                false
            );
            this.chairMulti = bz.MeshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_1,
                new BABYLON.Vector3( 20.0, 3.75, 20.0 ),
                this.scene,
                bz.Physic.CONCRETE,
                true
            );
            this.chairMultiPhysics = bz.MeshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_3,
                new BABYLON.Vector3( 20.0, 4.0, 30.0 ),
                this.scene,
                null,
                true
            );
            this.compoundSpheres = bz.MeshFactory.createImportedModel
            (
                bz.ModelFile.DOUBLE_SPHERE_1,
                new BABYLON.Vector3( 60.0, 10.0, 50.0 ),
                this.scene,
                null,
                true
            );

            return [

                // black sphere UNCOMPOUND from imported model ( uses physic impostor from 3dsmax file! )
                new bz.Wall
                (
                    bz.MeshFactory.createImportedModel
                    (
                        bz.ModelFile.DOUBLE_SPHERE_1,
                        new BABYLON.Vector3( 30.0, 10.0, 50.0 ),
                        this.scene,
                        null,
                        false
                    )
                ),

                // black sphere COMPOUND from imported model ( uses physic impostor from 3dsmax file! )
                new bz.Wall
                (
                    this.compoundSpheres
                ),

                // 3ds chair single-meshed
                new bz.Wall
                (
                    this.chairSingle
                ),

                // 3ds chair - multi-meshes with same physics
                new bz.Wall
                (
                    this.chairMulti,
                    5
                ),

                // 3ds chair - multi-meshes with specific physics
                new bz.Wall
                (
                    this.chairMultiPhysics,
                    5
                ),

                // red sphere from own model
                new bz.Wall
                (
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createSphere
                            (
                                new BABYLON.Vector3( 10.0, 0.0, 10.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                3.0,
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                null,
                                bz.SettingColor.COLOR_RGB_RED,
                                this.scene,
                                bz.Physic.SOLID_WOOD,
                                1.0,
                                bz.SettingColor.COLOR_RGB_RED // this.ambientColor
                            ),
                        ]
                    )
                ),

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
                                new BABYLON.Vector3( 200.0, bz.MeshFactory.FACE_DEPTH, 100.0 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_TEST,
                                null,
                                this.scene,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    ),
                ),

                new bz.Wall
                (
                    new bz.Model
                    (
                        [
                            // test wall
                            bz.MeshFactory.createBox
                            (
                                new BABYLON.Vector3( 3.0, 0.0, 1.0  ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 15.0, 5.0, 0.5 ),
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                bz.Texture.WALL_GRASS,
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
        *   Creates and returns all items this stage consists of.
        *
        *   @return All items of this stage.
        ***************************************************************************************************************/
        protected createItems() : bz.Item[]
        {
            return [

                new bz.Item
                (
                    bz.MeshFactory.createImportedModel
                    (
                        bz.ModelFile.SHELLS,
                        new BABYLON.Vector3( 20.0, 0.0, 20.0 ),
                        this.scene,
                        null,
                        false
                    )
                ),

                new bz.Item
                (
                    bz.MeshFactory.createImportedModel
                    (
                        bz.ModelFile.SHELLS,
                        new BABYLON.Vector3( 25.0, 0.0, 20.0 ),
                        this.scene,
                        null,
                        false
                    )
                ),

                new bz.Item
                (
                    bz.MeshFactory.createImportedModel
                    (
                        bz.ModelFile.SHELLS,
                        new BABYLON.Vector3( 30.0, 0.0, 20.0 ),
                        this.scene,
                        null,
                        false
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
        *   Sets up the skybox.
        *
        *   @return The created skybox for this stage.
        ***************************************************************************************************************/
        protected createSkybox() : BABYLON.Mesh
        {
            return bz.MeshFactory.createSkyBoxCube( bz.SkyBox.STORM, 1.0, this.scene );
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
/*
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
*/
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
            // const lights:BABYLON.Light[] = [
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
            // ];
/*
            lights[ 0 ].setEnabled( false );
            lights[ 1 ].setEnabled( false );
            lights[ 2 ].setEnabled( false );
            lights[ 3 ].setEnabled( true  );
*/
            return [];
        }

        /** ************************************************************************************************************
        *   Creates all shadow generators that appear in this level.
        *
        *   @return All shadow generators that appear in this stage.
        ***************************************************************************************************************/
        protected createShadowGenerators() : BABYLON.ShadowGenerator[]
        {
            // const shadowGenerators:BABYLON.ShadowGenerator[] = [
/*
                new BABYLON.ShadowGenerator( 2048, ( this.lights[ 2 ] as BABYLON.SpotLight ) ),
*/
            // ];
/*
            shadowGenerators[ 0 ].useExponentialShadowMap = true;
            shadowGenerators[ 0 ].usePoissonSampling      = true;
*/
            return [];
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

                new BABYLON.Vector3( 10.0, 10.0, 10.0 ),
                new BABYLON.Vector3( 20.0, 5.0,  20.0 ),
                new BABYLON.Vector3( 0.0,  0.0,  0.0  ),

                this.player.getThirdPersonCameraTargetMesh(),
                this.player.getThirdPersonCameraTargetMesh(),
                this.player.getFirstPersonCameraTargetMesh()
            );
        }

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected onInitComplete() : void
        {
        }

        /** ************************************************************************************************************
        *   Creates the HUD for this stage.
        ***************************************************************************************************************/
        protected createHUD() : bz.HUD
        {
            const hud:bz.HUDGame = new bz.HUDGame();
            hud.init();

            return hud;
        }
    }

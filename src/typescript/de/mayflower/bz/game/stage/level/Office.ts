
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
        // protected                        chairRot                :number                                 = 0.0;
        /** Testwise camera target toggle. */
        private                             camTarget               :boolean                                = false;

        /** ************************************************************************************************************
        *   Creates a new test office.
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

                bz.SettingColor.COLOR_RGB_WHITE,
                bz.SettingColor.COLOR_RGBA_WHITE_OPAQUE,
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
                new BABYLON.Vector3( 8.0, ( bz.SettingPlayerHuman.HEIGHT_Y_STANDING / 2 ), 13.0 ),
                45.0,
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

                new BABYLON.Vector3( 10.0, 10.0, 10.0 ),
                new BABYLON.Vector3( 20.0, 5.0,  20.0 ),
                new BABYLON.Vector3( 0.0,  0.0,  0.0  ),

                new BABYLON.Vector3( 0.0,  0.0,  0.0  ),
                this.player.getThirdPersonCameraTargetMesh(),
                this.player.getThirdPersonCameraTargetMesh(),
                this.player.getFirstPersonCameraTargetMesh()
            );
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        *
        *   @param keySystem The key system to use for key determination.
        ***************************************************************************************************************/
        protected handleLevelKeys( keySystem:bz.KeySystem ) : void
        {
            if ( keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

                // add GUI messages to queue and start various debug actions

                // explode compound spheres
                this.gui.addGuiMessage( 'explode compound spheres [' + bz.StringUtil.getDateTimeString() + ']' );
                this.compoundSpheres.removeCompoundMesh( this.scene.getNativeScene() );

                // show hurt GUI effect
                this.addGuiFx( bz.GUIFxType.HURT );

                // perform a camera animation for the stationary target camera
                this.gui.addGuiMessage( 'start camera journey [' + bz.StringUtil.getDateTimeString() + ']' );
                this.getCameraSystem().animateCameraPosition
                (
                    bz.CameraType.STATIONARY,
                    ( this.camTarget ? BABYLON.Vector3.Zero() : new BABYLON.Vector3( 40.0, 10.0, 40.0 ) ),
                    2.5,
                    new BABYLON.PowerEase(),
                    () => { bz.Debug.camera.log( 'Cam reached target' ) }
                );
                this.camTarget = !this.camTarget;
            }
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
                this.scene,
                bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                new BABYLON.Vector3( 15.0, 5.0, 17.5 ),
                bz.Physic.SOLID_WOOD,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_DISABLED
            );
/*
            this.chairMulti = bz.MeshFactory.createImportedModel
            (
                this.scene,
                bz.ModelFile.OFFICE_CHAIR_1,
                new BABYLON.Vector3( 20.0, 3.75, 20.0 ),
                bz.Physic.CONCRETE,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_DISABLED
            );
            this.chairMultiPhysics = bz.MeshFactory.createImportedModel
            (
                this.scene,
                bz.ModelFile.OFFICE_CHAIR_3,
                new BABYLON.Vector3( 20.0, 4.0, 30.0 ),
                null,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_ENABLED
            );
            this.compoundSpheres = bz.MeshFactory.createImportedModel
            (
                this.scene,
                bz.ModelFile.DOUBLE_SPHERE_1,
                new BABYLON.Vector3( 60.0, 10.0, 50.0 ),
                null,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_DISABLED
            );

            const tv:BABYLON.Mesh = bz.MeshFactory.createBox
            (
                this.scene,
                new BABYLON.Vector3( 3.0, 2.5, 25.0 ),
                bz.MeshPivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( ( 4 * 0.560 ), ( 4 * 0.320 ), bz.MeshFactory.FACE_DEPTH ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Texture.VIDEO_TEST,
                null,
                // bz.Physic.STATIC,
                bz.Physic.NONE,
                1.0,
                this.ambientColor
            );
*/
            return [
/*
                // black sphere UNCOMPOUND from imported model ( uses physic impostor from 3dsmax file! )
                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.DOUBLE_SPHERE_1,
                        new BABYLON.Vector3( 30.0, 10.0, 50.0 ),
                        null,
                        bz.ModelCompoundType.NONE
                    )
                ),

                // black sphere COMPOUND from imported model ( uses physic impostor from 3dsmax file! )
                new bz.Wall
                (
                    this,
                    this.compoundSpheres
                ),
*/
                // movable wooden crate
                new bz.Wall
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.CRATE,
                        new BABYLON.Vector3( 10.0, 30.0, 5.0 ),
                        bz.Physic.LIGHT_WOOD,
                        bz.ModelCompoundType.NONE
                    )
                ),

                // 3ds chair single-meshed
                new bz.Wall
                (
                    this,
                    this.chairSingle,
                    3
                ),
/*
                // tv
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            tv,
                        ]
                    )
                ),
*/
/*
                // 3ds chair - multi-meshes with same physics
                new bz.Wall
                (
                    this,
                    this.chairMulti,
                    5
                ),
*/
/*
                // 3ds chair - multi-meshes with specific physics
                new bz.Wall
                (
                    this,
                    this.chairMultiPhysics,
                    5
                ),
*/
/*
                // red sphere from own model
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createSphere
                            (
                                this.scene,
                                new BABYLON.Vector3( 10.0, 0.0, 10.0 ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                3.0,
                                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                                null,
                                bz.SettingColor.COLOR_RGB_RED,
                                bz.Physic.SOLID_WOOD,
                                1.0,
                                bz.SettingColor.COLOR_RGB_RED // this.ambientColor
                            ),
                        ]
                    )
                ),
*/
                // static ground
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 0.0, -2.5, 0.0  ),
                                bz.MeshPivotAnchor.NONE,
                                new BABYLON.Vector3( 200.0, 2.5, 100.0 ),
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

                // test wall green
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 3.0, 2.5, 1.0  ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 15.0, 5.0, 0.5 ),
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
/*
                // test wall (flying obstacle)
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
                            bz.MeshFactory.createBox
                            (
                                this.scene,
                                new BABYLON.Vector3( 20.0, 3.0, 2.0  ),
                                bz.MeshPivotAnchor.LOWEST_XYZ,
                                new BABYLON.Vector3( 15.0, 5.0, 5.0 ),
                                new BABYLON.Vector3( 0.0, 270.0, 0.0 ),
                                bz.Texture.WALL_WOOD,
                                null,
                                bz.Physic.STATIC,
                                1.0,
                                this.ambientColor
                            ),
                        ]
                    )
                ),
*/
                // static elevated ground
                new bz.Wall
                (
                    this,
                    new bz.Model
                    (
                        [
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
                                // bz.Physic.NONE,
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
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.SHELLS,
                        new BABYLON.Vector3( 20.0, 0.0, 20.0 ),
                        null,
                        bz.ModelCompoundType.NONE
                    )
                ),

                new bz.Item
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.SHELLS,
                        new BABYLON.Vector3( 25.0, 0.0, 20.0 ),
                        null,
                        bz.ModelCompoundType.NONE
                    )
                ),

                new bz.Item
                (
                    this,
                    bz.MeshFactory.createImportedModel
                    (
                        this.scene,
                        bz.ModelFile.SHELLS,
                        new BABYLON.Vector3( 30.0, 0.0, 20.0 ),
                        null,
                        bz.ModelCompoundType.NONE
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
            return bz.MeshFactory.createSkyBoxCube( this.scene.getNativeScene(), bz.SkyBoxFile.BLUE_SKY, 1.0 );
        }

        /** ************************************************************************************************************
        *   Creates all sprites that appear in the stage.
        *
        *   @return All sprites that appear in this stage.
        ***************************************************************************************************************/
        protected createSprites() : bz.Sprite[]
        {
/*
            // create and animate a sprite
            const animatedTestSprite:bz.Sprite = new bz.Sprite
            (
                this.scene,
                bz.SpriteFile.TEST,
                new BABYLON.Vector3( 70.0, 0.0, 50.0  ),
                10.0,
                20.0,
                bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y,
                bz.SpriteCollidable.NO
            );
            animatedTestSprite.animate( 0, 43, true );
*/
            return [
/*
                animatedTestSprite,
*/
                new bz.Sprite
                (
                    this.scene,
                    bz.SpriteFile.TREE,
                    new BABYLON.Vector3( 45.0, 0.0, 20.0  ),
                    10.0,
                    20.0,
                    bz.MeshPivotAnchor.CENTER_XZ_LOWEST_Y,
                    bz.SpriteCollidable.YES
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
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected setupFog() : void
        {
            this.scene.disableFog();

            // green poison steam..
            // this.scene.enableFog( new BABYLON.Color3( 101 / 256, 206 / 256, 143 / 256 ), 0.05 );
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

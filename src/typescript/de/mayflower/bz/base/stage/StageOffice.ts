import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies the 'office' stage.
***********************************************************************************************************************/
export class StageOffice extends bz.Stage
{
    private                 readonly    OFFSET_X                :number                                 = 0.0;
    private                 readonly    OFFSET_Z                :number                                 = 0.0;

    /** A testwise mesh - made from a single 3dsmax Mesh. */
    private                             chairCompoundDestroyable            :bz.Wall                    = null;
    /** A testwise mesh - made from multiple 3dsmax Meshes. */
    private                             chairMultiMeshesNoCompound          :bz.Wall                    = null;
    /** A testwise mesh - made from multiple 3dsmax Meshes with multiple physics?. */
    private                             chairCompoundSingleShotOff          :bz.Wall                    = null;

    /** Testwise camera target toggle. */
    private                             camTarget               :boolean                                = false;

    /** ****************************************************************************************************************
    *   Creates a new test office.
    *
    *   @param game The game instance.
    *******************************************************************************************************************/
    public constructor( game:bz.Game )
    {
        super
        (
            game,

            // new BABYLON.Color3( 0.1, 0.1, 0.1 ), // night
            new BABYLON.Color3( 0.6, 0.6, 0.6 ), // evening

            bz.SettingColor.COLOR_RGBA_BLACK_OPAQUE,
            bz.CameraType.FIRST_PERSON
        );
    }

    /** ****************************************************************************************************************
    *   Sets up the player for this stage.
    *
    *   @return The player instance for this stage.
    *******************************************************************************************************************/
    protected createPlayer() : bz.Player
    {
        return new bz.Player
        (
            this,
            this.scene,
            new BABYLON.Vector3(
                this.OFFSET_X + 3.5,
                ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ),
                this.OFFSET_Z + 3.5
            ),
            45.0,
            this.ambientColor
        );
    }

    /** ****************************************************************************************************************
    *   Creates the camera system that manages all cameras that appear in this level.
    *
    *   @return The camera system for this stage.
    *******************************************************************************************************************/
    protected createCameraSystem() : bz.CameraSystem
    {
        return new bz.CameraSystem
        (
            this.game,

            new BABYLON.Vector3( 10.0, 10.0, 10.0 ),
            new BABYLON.Vector3( 20.0, 5.0,  20.0 ),
            new BABYLON.Vector3( 0.0,  0.0,  0.0  ),

            new BABYLON.Vector3( 0.0,  0.0,  0.0  ),
            this.player.getThirdPersonCameraTargetMesh(),
            this.player.getThirdPersonCameraTargetMesh(),
            this.player.getFirstPersonCameraTargetMesh()
        );
    }

    /** ****************************************************************************************************************
    *   Handles level specific keys.
    *******************************************************************************************************************/
    protected handleLevelKeys() : void
    {
        const keySystem :bz.KeySystem = this.game.getKeySystem();

        if ( keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
        {
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

            // add GUI messages to queue and start various debug actions

            // explode compound spheres
            this.game.getGUI().addGuiMessage(
                'explode compound spheres [' + bz.StringUtil.getDateTimeString() + ']'
            );
            // this.compoundSpheres.removeCompoundMesh( this.scene.getNativeScene() );

            // perform a camera animation for the stationary target camera
            this.game.getGUI().addGuiMessage( 'start camera journey [' + bz.StringUtil.getDateTimeString() + ']' );
            this.cameraSystem.animateCameraPosition
            (
                bz.CameraType.STATIONARY,
                ( this.camTarget ? BABYLON.Vector3.Zero() : new BABYLON.Vector3( 40.0, 10.0, 40.0 ) ),
                2.5,
                new BABYLON.PowerEase(),
                () => { bz.Debug.camera.log( 'Cam reached target' ) }
            );
            this.camTarget = !this.camTarget;

            // show hurt GUI effect
            this.game.getGUI().addGuiFx( bz.GUIFxType.HURT );
        }
    }

    /** ****************************************************************************************************************
    *   Creates and returns all walls this stage consists of.
    *
    *   @return All walls of this stage.
    *******************************************************************************************************************/
    protected createWalls() : bz.Wall[]
    {
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.scene );

        // multi mesh chair with compound .. scatters after being shot multiple times!
        this.chairCompoundDestroyable = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                new BABYLON.Vector3( this.OFFSET_X + 20.0, 3.5, this.OFFSET_Z + 35.0 ),
                bz.PhysicSet.OFFICE_CHAIR,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_DISABLED
            ),
            10.0
        );
        // multi mesh chair without compound .. immediately collapses!
        this.chairMultiMeshesNoCompound = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                new BABYLON.Vector3( this.OFFSET_X - 5.0, 18.0, this.OFFSET_Z + 35.0 ),
                bz.PhysicSet.OFFICE_CHAIR,
                bz.ModelCompoundType.NONE
            ),
            10.0
        );

        this.chairCompoundSingleShotOff = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                new BABYLON.Vector3( 20.0, 3.5, 45.0 ),
                bz.PhysicSet.OFFICE_CHAIR,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_ENABLED
            ),
            10.0
        );

        const tv:BABYLON.Mesh = meshFactory.createBox
        (
            this.ambientColor,
            new BABYLON.Vector3( 3.0, 2.5, 25.0 ),
            bz.Texture.VIDEO_TEST,
            // new BABYLON.Vector3( ( 4 * 0.560 ), ( 4 * 0.320 ), 1.0 ),
            new BABYLON.Vector3( ( 4 * 0.640 ), ( 4 * 0.360 ), 1.0 ),
            bz.PhysicSet.CRATE_WOOD,
            1.0,
            bz.MeshAnchor.CENTER_XYZ,
            new BABYLON.Vector3( 0.0, 0.0, 0.0 )
        );

        let walls :bz.Wall[] = [

            // office chair - multi meshed - destroyable compound
            this.chairCompoundDestroyable,

            // office chair - multi meshed - destroyable compound
            this.chairCompoundSingleShotOff,

            // office chair - multi meshed - single meshes destroyable
            this.chairMultiMeshesNoCompound,

            // solid white sphere
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createSphere
                        (
                            new BABYLON.Vector3( this.OFFSET_X + 10.5, 1.5, this.OFFSET_Z + 30.0 ),
                            bz.MeshAnchor.CENTER_XYZ,
                            3.0,
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.Texture.WALL_TEST,
                            null,
                            bz.PhysicSet.WHITE_TEST_SPHERE,
                            1.0,
                            this.ambientColor
                        ),
                    ]
                )
            ),

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

            // box - amiga light frontside
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            this.ambientColor,
                            new BABYLON.Vector3( this.OFFSET_X - 5.0, 0.0, this.OFFSET_Z ),
                            bz.Texture.WALL_AMIGA,
                            new BABYLON.Vector3( 1.0, 7.0, 7.0 ),
                            bz.PhysicSet.STATIC
                        ),
                    ]
                )
            ),

            // static glass pane
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            this.ambientColor,
                            new BABYLON.Vector3( this.OFFSET_X, 0.0, this.OFFSET_Z ),
                            bz.Texture.WALL_GLASS,
                            new BABYLON.Vector3( 2.5, 5.0, bz.MeshFactory.FACE_DEPTH ),
                            bz.PhysicSet.STATIC,
                            0.5,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            ),
        ];

        const levelGroundWalls :bz.Wall[] = this.createLevelGroundWalls();
        const boxesWalls       :bz.Wall[] = this.createBoxesWalls();
        walls = walls.concat( levelGroundWalls );
        walls = walls.concat( boxesWalls );

        return walls;
    }

    /** ****************************************************************************************************************
    *   Creates and returns all items this stage consists of.
    *
    *   @return All items of this stage.
    *******************************************************************************************************************/
    protected createItems() : bz.Item[]
    {
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.scene );

        return [
            new bz.Item
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SHELLS,
                    new BABYLON.Vector3( this.OFFSET_X + 10.0, 0.0, this.OFFSET_Z + 50.0 ),
                    null,
                    bz.ModelCompoundType.NONE
                )
            ),
            new bz.Item
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SHELLS,
                    new BABYLON.Vector3( this.OFFSET_X + 10.0, 0.0, this.OFFSET_Z + 55.0 ),
                    null,
                    bz.ModelCompoundType.NONE
                )
            ),
            new bz.Item
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SHELLS,
                    new BABYLON.Vector3( this.OFFSET_X + 10.0, 0.0, this.OFFSET_Z + 60.0 ),
                    null,
                    bz.ModelCompoundType.NONE
                )
            ),
        ];
    }

    /** ****************************************************************************************************************
    *   Creates and returns all bots this stage consists of.
    *
    *   @return All bots of this stage.
    *******************************************************************************************************************/
    protected createBots() : bz.Bot[]
    {
        return [];
    }

    /** ****************************************************************************************************************
    *   Sets up the skybox.
    *
    *   @return The created skybox for this stage.
    *******************************************************************************************************************/
    protected createSkybox() : BABYLON.Mesh
    {
        return new bz.MeshFactory( this.scene ).createSkyBoxCube( bz.SkyBoxFile.BLUE_SKY, 0.5 );
    }

    /** ****************************************************************************************************************
    *   Creates all sprites that appear in the stage.
    *
    *   @return All sprites that appear in this stage.
    *******************************************************************************************************************/
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

            // animatedTestSprite,

            new bz.Sprite
            (
                this.scene,
                bz.SpriteFile.PALM,
                new BABYLON.Vector3( this.OFFSET_X + 30.0, 0.0, this.OFFSET_Z + 10.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5,
                bz.MeshAnchor.CENTER_XZ_LOWEST_Y,
                bz.MathUtil.getRandomInt( -10.0, 10.0 )
            ),
            new bz.Sprite
            (
                this.scene,
                bz.SpriteFile.TREE,
                new BABYLON.Vector3( this.OFFSET_X + 30.0, 0.0, this.OFFSET_Z + 20.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5
            ),
            new bz.Sprite
            (
                this.scene,
                bz.SpriteFile.PALM,
                new BABYLON.Vector3( this.OFFSET_X + 40.0, 0.0, this.OFFSET_Z + 20.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5,
                bz.MeshAnchor.CENTER_XZ_LOWEST_Y,
                bz.MathUtil.getRandomInt( -10.0, 10.0 )
            ),
            new bz.Sprite
            (
                this.scene,
                bz.SpriteFile.TREE,
                new BABYLON.Vector3( this.OFFSET_X + 40.0, 0.0, this.OFFSET_Z + 10.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5
            ),
        ];
    }

    /** ****************************************************************************************************************
    *   Creates all lights that appear in this level.
    *
    *   @return All lights that appear in this stage.
    *******************************************************************************************************************/
    protected createLights() : BABYLON.Light[]
    {
        // point light

        const pointLight :BABYLON.PointLight = bz.LightFactory.createPoint
        (
            this.scene.getNativeScene(),
            new BABYLON.Vector3( this.OFFSET_X + 20.0, 2.5, this.OFFSET_Z + 20.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 ),
            50.0,
            1.0,
            true
        );
/*
        // Create the "God Rays" effect (volumetric light scattering) - godreys need to be disposed!
        const godrays :BABYLON.VolumetricLightScatteringPostProcess = (
            bz.LightFactory.createVolumetricLightScatteringPostProcess(
                this.scene.getNativeScene(),
                new BABYLON.Vector3(-150, 150, 150),
                new BABYLON.Vector3(100, 100, 100),
                this.cameraSystem.firstPersonCamera,
                this.engine
            )
        );
        pointLight.position = godrays.mesh.position;
*/
        return [
            pointLight,
/*
            // hemispheric light
            bz.LightFactory.createHemispheric
            (
                this.scene.getNativeScene(),
                new BABYLON.Vector3( 0.0, 1.0, 0.0 ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                new BABYLON.Color3( 0.1, 0.1, 0.1 ),
                new BABYLON.Color3( 0.0, 0.0, 0.0 ),
                0.1,
                false
            ),
*/
/*
            // directional light ?
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

            // spot light ?
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
*/
/*
            // point light
            bz.LightFactory.createPoint
            (
                this.scene.getNativeScene(),
                new BABYLON.Vector3( this.OFFSET_X + 15.0, 3.0, this.OFFSET_Z - 16.0 ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                new BABYLON.Color3( 0.0, 0.0, 0.0 ),
                50.0,
                1.0,
                true
            ),
*/
        ];
    }

    /** ****************************************************************************************************************
    *   Creates all shadow generators that appear in this level.
    *
    *   @return All shadow generators that appear in this stage.
    *******************************************************************************************************************/
    protected createShadowGenerators() : BABYLON.ShadowGenerator[]
    {
        const shadowGenerators:BABYLON.ShadowGenerator[] = [
            new BABYLON.ShadowGenerator( 2048, ( this.lights[ 0 ] as BABYLON.PointLight ) ),
        ];

        shadowGenerators[ 0 ].useExponentialShadowMap = true;
        shadowGenerators[ 0 ].usePoissonSampling      = true;

        return shadowGenerators;
    }

    /** ****************************************************************************************************************
    *   Sets up shadows for all meshes.
    *******************************************************************************************************************/
    protected setupShadows() : void
    {
        if ( false )
        {
            // set shadows for all walls
            for ( const wall of this.walls )
            {
                wall.getModel().applyShadowGenerator( this.shadowGenerators[ 0 ] );
            }

            // this.chairCompoundDestroyable.getModel().applyShadowGenerator( this.shadowGenerators[ 0 ] );
        }
    }

    /** ****************************************************************************************************************
    *   Sets up shadows for all meshes.
    *******************************************************************************************************************/
    protected setupFog() : void
    {
        this.scene.disableFog();
        // green poison steam..
        // this.scene.enableFog( bz.SettingColor.COLOR_RGB_GREEN, 0.05 );
    }

    /** ****************************************************************************************************************
    *   Creates the ground walls for this level.
    *******************************************************************************************************************/
    private createLevelGroundWalls() : bz.Wall[]
    {
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.scene );

        return [
            // hills ( heightmap ground )
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createHeightMapGround
                        (
                            new BABYLON.Vector3( this.OFFSET_X, 0.0, this.OFFSET_Z ),
                            bz.MeshAnchor.CENTER_XYZ,
                            400.0,
                            5.0,
                            bz.TextureFile.HEIGHTMAP_VALLEY,
                            this.ambientColor,
                            new BABYLON.Vector3( 0.0, 90.0, 0.0 ),
                            bz.PhysicSet.STATIC
                        ),
                    ]
                )
            ),
            // ceiling
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            this.ambientColor,
                            new BABYLON.Vector3( this.OFFSET_X, 15.5, this.OFFSET_Z  ),
                            bz.Texture.WALL_TEST,
                            new BABYLON.Vector3( 50.0, 2.5, 50.0 ),
                            bz.PhysicSet.STATIC
                        ),
                    ]
                )
            ),
        ]
    }

    /** ****************************************************************************************************************
    *   Adds all boxes to this level.
    *******************************************************************************************************************/
    private createBoxesWalls() : bz.Wall[]
    {
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.scene );

        return [

            // wooden test crates

            new bz.Wall
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CRATE,
                    new BABYLON.Vector3( this.OFFSET_X + 15.0, 0.0, this.OFFSET_Z + 15.0 ),
                    bz.PhysicSet.CRATE_WOOD,
                    bz.ModelCompoundType.NONE
                )
            ),
            new bz.Wall
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CRATE,
                    new BABYLON.Vector3( this.OFFSET_X + 17.5, 0.0, this.OFFSET_Z + 17.5 ),
                    bz.PhysicSet.CRATE_WOOD,
                    bz.ModelCompoundType.NONE
                )
            ),
            new bz.Wall
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CRATE,
                    new BABYLON.Vector3( this.OFFSET_X + 17.5, 0.0, this.OFFSET_Z + 15.0 ),
                    bz.PhysicSet.CRATE_WOOD,
                    bz.ModelCompoundType.NONE
                )
            ),
            new bz.Wall
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CRATE,
                    new BABYLON.Vector3( this.OFFSET_X + 17.5, 2.5, this.OFFSET_Z + 17.5 ),
                    bz.PhysicSet.CRATE_WOOD,
                    bz.ModelCompoundType.NONE
                )
            ),
            new bz.Wall
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.CRATE,
                    new BABYLON.Vector3( this.OFFSET_X + 17.5, 5.0, this.OFFSET_Z + 17.5 ),
                    bz.PhysicSet.CRATE_WOOD,
                    bz.ModelCompoundType.NONE
                )
            ),
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            this.ambientColor,
                            new BABYLON.Vector3( this.OFFSET_X + 25.0, 2.5, this.OFFSET_Z + 25.0   ),
                            bz.Texture.WALL_WOOD,
                            new BABYLON.Vector3( 2.5, 2.5, 2.5 ),
                            bz.PhysicSet.CRATE_STEEL,
                            1.0,
                            bz.MeshAnchor.CENTER_XYZ,
                            new BABYLON.Vector3( 0.0, 45.0, 0.0 )
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
                        // movable glass cube
                        meshFactory.createBox
                        (
                            this.ambientColor,
                            new BABYLON.Vector3( this.OFFSET_X + 3.0,  2.5, this.OFFSET_Z + 20.0   ),
                            bz.Texture.WALL_GLASS,
                            new BABYLON.Vector3( 2.5, 2.5, 2.5    ),
                            bz.PhysicSet.CRATE_STEEL,
                            0.5,
                            bz.MeshAnchor.CENTER_XYZ,
                            new BABYLON.Vector3( 0.0,  45.0, 0.0   )
                        ),
                    ]
                )
            ),
        ]
    }
}

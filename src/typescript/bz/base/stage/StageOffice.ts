import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies the 'office' stage.
***********************************************************************************************************************/
export class StageOffice extends bz.Stage
{
    /** A testwise mesh - made from a single 3dsmax Mesh. */
    private          chairCompoundDestroyable       :bz.Wall                = null;
    /** A testwise mesh - made from multiple 3dsmax Meshes with multiple physics?. */
    private          chairCompoundSingleShotOff     :bz.Wall                = null;
    /** A testwise mesh - made from multiple 3dsmax Meshes. */
    private          chairMultiMeshesNoCompound     :bz.Wall                = null;
    private          desk                           :bz.Wall                = null;

    /** Testwise camera target toggle. */
    private          camTarget                      :boolean                = false;

    /** ****************************************************************************************************************
    *   Creates the stage config that is applied on initializing this stage.
    *******************************************************************************************************************/
    public createDefaultConfig() : bz.StageConfig
    {
        return new bz.StageConfig(
            new BABYLON.Color3( 0.1, 0.1, 0.1 ),
            bz.SettingColor.COLOR_RGBA_BLACK_OPAQUE,
            bz.CameraType.FIRST_PERSON,
            new BABYLON.Vector3(
                ( bz.SettingGame.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 ),
                ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ) + bz.SettingGame.FLOOR_OFFSET_Y,
                ( bz.SettingGame.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 )
            ),
            new BABYLON.Vector3( 0.0, 45.0, 0.0 ),
            new bz.Inventory( 0 )
        );
    }

    /** ****************************************************************************************************************
    *   Creates all stage contents.
    *******************************************************************************************************************/
    protected createStageContents( meshFactory:bz.MeshFactory ) : void
    {
        // blue skybox
        this.setSkybox( bz.SkyBoxFile.BLUE_SKY, 0.5 );

        // ground walls
        // this.addGroundWalls( meshFactory );

        // player
        this.setPlayer( new bz.Player( this ) );

        // small office
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            new BABYLON.Vector3( 100.0, bz.SettingGame.WALL_HEIGHT, 100.0 ),
            0.0,
            bz.TextureFile.WALL_BRICKS_3, [], [], 0,
            null,                         [], [], 0,
            null,                         [], [], 0,
            null,                         [], [], 0,
            bz.TextureFile.MODEL_CONCRETE,
            null
        );

        // point light in small office
        const pointLight :BABYLON.PointLight = bz.LightFactory.createPoint
        (
            this.getScene().getNativeScene(),
            new BABYLON.Vector3( 10.0, 5.0, 5.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 )
        );
        this.addLight( pointLight );

        // hemispheric light
        const hemisphericLight :BABYLON.HemisphericLight = bz.LightFactory.createHemispheric
        (
            this.getScene().getNativeScene(),
            new BABYLON.Vector3( 0.0, 1.0, 0.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.1, 0.1, 0.1 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 ),
            0.5
        );
        this.addLight( hemisphericLight );

        // waste ground
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 20.0, bz.SettingGame.FLOOR_OFFSET_Y, 20.0 ),
            new BABYLON.Vector3( 25.0, 6.0, 25.0 ),
            0.0,
            bz.TextureFile.WALL_WOOD_VERT_1,    [ 1.0 ], [ 7.0 ], 2.0,
            bz.TextureFile.WALL_WOOD_PLANKS,    [ 1.0 ], [ 7.0 ], 3.0,
            bz.TextureFile.WALL_WOOD_STRUCTURE, [ 1.0 ], [ 7.0 ], 4.0,
            bz.TextureFile.WALL_WOOD_OLIVE,     [ 1.0 ], [ 7.0 ], 5.0,
            bz.TextureFile.WALL_PAVEMENT_GRANITE,
            null
        );
/*
        // parking space
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( -40.0, 0.0, 0.0 ),
            new BABYLON.Vector3( 40.0, bz.SettingGame.WALL_HEIGHT, 40.0 ),
            0.0,
            null, [], [], 0,
            null, [], [], 0,
            null, [], [], 0,
            null, [], [], 0,
            bz.TextureFile.WALL_STONES_4,
            bz.TextureFile.WALL_CEILING_1
        );

        // pillar from new concrete
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3( -30, 0, 10.0 ),
                            bz.TextureFile.WALL_CONCRETE_3,
                            new BABYLON.Vector3(
                                bz.SettingGame.PILLAR_WIDTH,
                                bz.SettingGame.WALL_HEIGHT,
                                bz.SettingGame.PILLAR_WIDTH
                            ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.LOWEST_XYZ
                        ),
                    ]
                )
            )
        );
*/

        // add rain effect
        if ( false ) this.setRainEffect(
            3.0,
            750,
            new BABYLON.Vector3( 0.5, -1.5, 0.5 )
        );

if ( true ) return;

        // light yard
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 40.0, 0.0, bz.SettingGame.HALLWAY_WIDTH ),
            new BABYLON.Vector3( 40.0, bz.SettingGame.WALL_HEIGHT, 40.0 - 2 * bz.SettingGame.HALLWAY_WIDTH ),
            0.0,
            null, [],      [], 0,
            null, [],      [], 0,
            null, [],      [], 0,
            null, [ 1.0 ], [], 0,
            bz.TextureFile.WALL_STONES_3,
            null
        );

        // passways around light square
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 40.0, 0.0, 0.0 ),
            new BABYLON.Vector3( 40.0, bz.SettingGame.WALL_HEIGHT, bz.SettingGame.HALLWAY_WIDTH ),
            0.0,
            bz.TextureFile.MODEL_WOOD_HORZ, [], [], 0,
            null, [],      [], 0,
            null, [],      [], 0,
            null, [ 1.0 ], [], 0,
            bz.TextureFile.WALL_CARPET_2,
            bz.TextureFile.WALL_CEILING_1
        );
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 40.0, 0.0, 40.0 - bz.SettingGame.HALLWAY_WIDTH ),
            new BABYLON.Vector3( 40.0, bz.SettingGame.WALL_HEIGHT, bz.SettingGame.HALLWAY_WIDTH ),
            0.0,
            null,                           [],      [], 0,
            null,                           [],      [], 0,
            bz.TextureFile.MODEL_WOOD_HORZ, [],      [], 0,
            null,                           [ 1.0 ], [], 0,
            bz.TextureFile.WALL_CARPET_2,
            bz.TextureFile.WALL_CEILING_1
        );

        // 2nd office
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 80.0, 0.0, 0.0 ),
            new BABYLON.Vector3( 80.0, bz.SettingGame.WALL_HEIGHT, 40.0 ),
            0.0,
            bz.TextureFile.MODEL_WOOD_HORZ, [],       [], 0,
            bz.TextureFile.MODEL_WOOD_HORZ, [ 10.0 ], [], 0,
            bz.TextureFile.MODEL_WOOD_HORZ, [],       [], 0,
            null,                           [],       [], 0,
            bz.TextureFile.WALL_CARPET_2,
            bz.TextureFile.WALL_CEILING_1
        );

        // boxes pile in small office
        bz.StageFactory.addCratesPile(
            this,
            meshFactory,
            new BABYLON.Vector3( 20.0, bz.SettingGame.FLOOR_OFFSET_Y, 20.0 )
        );

        // boxes pile in light yard
        bz.StageFactory.addCratesPile(
            this,
            meshFactory,
            new BABYLON.Vector3( 50.0, bz.SettingGame.FLOOR_OFFSET_Y, 20.0 )
        );

        // boxes pile in 2nd office
        bz.StageFactory.addCratesPile(
            this,
            meshFactory,
            new BABYLON.Vector3( 110.0, bz.SettingGame.FLOOR_OFFSET_Y, 20.0 )
        );




        this.addFurniture( meshFactory );

        this.addStuffWalls(  meshFactory, pointLight );

        this.addTrees(  meshFactory );

        // add 5 items
        this.addCollectable(
            new bz.Item
            (
                this,
                new BABYLON.Vector3( 11.5, 3.8, 9.5 ),
                bz.ItemType.BULLETS_792MM
            )
        );
        this.addCollectable(
            new bz.Item
            (
                this,
                new BABYLON.Vector3( 38.0, 3.8, 14.0 ),
                bz.ItemType.SHOTGUN_SHELLS
            )
        );
        this.addCollectable(
            new bz.Item
            (
                this,
                new BABYLON.Vector3( 38.0, 3.8, 18.0 ),
                bz.ItemType.BULLETS_792MM
            )
        );
        this.addCollectable(
            new bz.Item
            (
                this,
                new BABYLON.Vector3( 40.0, 0.5, 25.5 ),
                bz.ItemType.SHOTGUN_SHELLS
            )
        );
        this.addCollectable(
            new bz.Item
            (
                this,
                new BABYLON.Vector3( 40.0, 0.5, 30.0 ),
                bz.ItemType.BULLETS_792MM
            )
        );

        // add invisible event trigger
        this.addCollectable(
            new bz.Trigger
            (
                this,
                new BABYLON.Vector3( 100.0, 1.0, 5.0 ),
                [
                    new bz.Event(
                        bz.EventType.SHOW_GUI_EFFECT,
                        new bz.EventDataShowGuiEffect( bz.GUIFxType.HURT )
                    ),
                    new bz.Event(
                        bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                        new bz.EventDataShowGuiTextMessage( 'Ouch .. just hurt myself here ..' )
                    ),
                    new bz.Event(
                        bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                        new bz.EventDataShowGuiTextMessage( 'Damn!' )
                    ),
                ]
            )
        );
        this.addCollectable(
            new bz.Trigger
            (
                this,
                new BABYLON.Vector3( 100.0, 1.0, 35.0 ),
                [
                    new bz.Event(
                        bz.EventType.SHOW_GUI_EFFECT,
                        new bz.EventDataShowGuiEffect( bz.GUIFxType.GAIN_ENERGY )
                    ),
                    new bz.Event(
                        bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                        new bz.EventDataShowGuiTextMessage( 'Yeah .. gained some energy here ..' )
                    ),
                ]
            )
        );

        // add painkillers
        this.addCollectable(
            new bz.Item
            (
                this,
                new BABYLON.Vector3( 35.0, 0.5, -10.0 ),
                bz.ItemType.PAINKILLER
            )
        );
        this.addCollectable(
            new bz.Item
            (
                this,
                new BABYLON.Vector3( 35.0, 0.5, -15.0 ),
                bz.ItemType.PAINKILLER
            )
        );
        this.addCollectable(
            new bz.Item
            (
                this,
                new BABYLON.Vector3( 35.0, 0.5, -20.0 ),
                bz.ItemType.PAINKILLER
            )
        );
        this.addCollectable(
            new bz.Item
            (
                this,
                new BABYLON.Vector3( 35.0, 0.5, -25.0 ),
                bz.ItemType.PAINKILLER
            )
        );

        // 2nd point light in 2nd office // stick to chair
        const pointLight2 :BABYLON.PointLight = bz.LightFactory.createPoint
        (
            this.getScene().getNativeScene(),
            new BABYLON.Vector3( 115.0, 5.0, 15.0 ),
            // new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 )
        );
        // pointLight2.parent = this.chairCompoundDestroyable.getModel().getMesh( 0 );
        this.addLight( pointLight2 );
/*
        // add fog
        // this.scene.enableFog( bz.SettingColor.COLOR_RGB_GREEN, 0.05 ); // green steam

        // add shadows for point light
        this.addShadowGenerator( pointLight );
*/
    }

    /** ****************************************************************************************************************
    *   Handles stage specific keys.
    *******************************************************************************************************************/
    protected handleStageKeys() : void
    {
        const keySystem :bz.KeySystem = this.getGame().getKeySystem();

        if ( keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
        {
            keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

            // perform a camera animation for the stationary target camera
            this.getCameraSystem().animateCameraPosition
            (
                bz.CameraType.STATIONARY,
                ( this.camTarget ? BABYLON.Vector3.Zero() : new BABYLON.Vector3( 40.0, 10.0, 40.0 ) ),
                2.5,
                new BABYLON.PowerEase(),
                () => { bz.Debug.camera.log( 'Cam reached target' ) }
            );
            this.camTarget = !this.camTarget;

            // show hurt GUI effect
            // this.getGame().getGUI().addGuiEffect( bz.GUIFxType.HURT );

            // cast a testwise explosion
            this.addEventsToPipeline(
                [
                    new bz.Event(
                        bz.EventType.CAST_EXPLOSION,
                        new bz.EventDataCastExplosion(
                            new BABYLON.Vector3( 20.5, bz.SettingGame.FLOOR_OFFSET_Y, 20.5 ),
                            12.5,
                            25.0
                        )
                    ),
                ]
            );

            // show GUI game messages and gain painkillers when the 2nd game message is shown
            this.addEventsToPipeline(
                [
                    new bz.Event(
                        bz.EventType.SHOW_GUI_GAME_MESSAGE,
                        new bz.EventDataShowGuiGameMessage(
                            bz.GUIGameMessagePic.OFFICE_WOMAN_1,
                            'Hey Joe! '
                            + 'Be sure to collect everything valuable and leave the office afterwards! '
                        )
                    ),
                    new bz.Event(
                        bz.EventType.GAIN_PAINKILLERS,
                        new bz.EventDataGainPainkillers( 2 )
                    ),
                    new bz.Event(
                        bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                        new bz.EventDataShowGuiTextMessage( 'Gained two Painkillers' )
                    ),
                    new bz.Event(
                        bz.EventType.SHOW_GUI_GAME_MESSAGE,
                        new bz.EventDataShowGuiGameMessage(
                            bz.GUIGameMessagePic.OFFICE_WOMAN_1,
                            'Be safe outside - it\'s a jungle out there.\n'
                            + 'Take these two Painkillers with you!\nI\'m glad to help you.'
                        )
                    ),
                ]
            );
        }
    }

    /** ****************************************************************************************************************
    *   Adds all chairs to this stage.
    *
    *   @param meshFactory The MeshFactory instance.
    *******************************************************************************************************************/
    private addFurniture( meshFactory:bz.MeshFactory ) : void
    {
        // multi mesh chair with compound .. scatters after being shot multiple times!
        this.chairCompoundDestroyable = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                new BABYLON.Vector3( 5.0, 2.1, 30.0 ),
                bz.PhysicSet.OFFICE_CHAIR,
                bz.ModelCompoundType.COMPOUND
            ),
            5.0
        );
        // office chair - multi meshed - single meshes destroyable
        this.chairCompoundSingleShotOff = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                new BABYLON.Vector3( 10.0, 2.1, 30.0 ),
                bz.PhysicSet.OFFICE_CHAIR,
                bz.ModelCompoundType.COMPOUND_SHOT_OFF_ENABLED
            ),
            5.0
        );
        // multi mesh chair without compound .. immediately collapses!
        this.chairMultiMeshesNoCompound = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
                new BABYLON.Vector3( 15.0, 2.1, 30.0 ),
                bz.PhysicSet.OFFICE_CHAIR,
                bz.ModelCompoundType.NONE
            ),
            5.0
        );

        this.addWall( this.chairCompoundDestroyable   );
        this.addWall( this.chairCompoundSingleShotOff );
        this.addWall( this.chairMultiMeshesNoCompound );

        // office desk 1
        this.desk = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_DESK_1,
                new BABYLON.Vector3( 10.0, 1.7, 7.0 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE, // bz.ModelCompoundType.COMPOUND,
                90.0
            ),
            5.0
        );
        this.addWall( this.desk );

        // screen 1
        const screen1 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.SCREEN_1,
                new BABYLON.Vector3( 12.5, 4.5, 5.5 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                -90.0
            ),
            5.0,
            [
                new bz.Event(
                    bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                    new bz.EventDataShowGuiTextMessage( 'All cleared for today.' )
                ),
                new bz.Event(
                    bz.EventType.TIME_DELAY,
                    new bz.EventDataTimeDelay( 600 )
                ),
                new bz.Event(
                    bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                    new bz.EventDataShowGuiTextMessage( 'DELAYED: No more work for today.' )
                ),
            ],
            bz.InteractionType.ONCE
        );
        this.addWall( screen1 );

        // shelves
        const shelves1 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.SHELVES_1,
                new BABYLON.Vector3( 33.5, 3.15, 37.0 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                10.0
            ),
            5.0
        );
        this.addWall( shelves1 );

        // office desk 2
        const officeDesk2 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.OFFICE_DESK_2,
                new BABYLON.Vector3( 38.5, 1.6, 16.5 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                85.0
            ),
            5.0
        );
        this.addWall( officeDesk2 );

        // soda machine 2
        const sodaMachine2 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.SODA_MACHINE_2,
                new BABYLON.Vector3( 5.5, 3.15, 37.5 ),
                bz.PhysicSet.SODA_MACHINE,
                bz.ModelCompoundType.NONE,
                0.0
            ),
            7.0
        );
        this.addWall( sodaMachine2 );

        // sofa 1
        const sofa1 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.SOFA_1,
                new BABYLON.Vector3( 25.5, 1.5, 2.5 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                180.0
            ),
            5.0
        );
        this.addWall( sofa1 );

        // car 1
        const car1 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.CAR_1,
                new BABYLON.Vector3( 100.0, 3.0, 20.5 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                180.0
            ),
            12.0
        );
        this.addWall( car1 );

        // bench 1
        const bench1 :bz.Wall = new bz.Wall
        (
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.BENCH_1,
                new BABYLON.Vector3( 60.0, 1.3, 6.0 ),
                bz.PhysicSet.SHELVES,
                bz.ModelCompoundType.NONE,
                180.0
            ),
            8.0
        );
        this.addWall( bench1 );
    }

    /** ****************************************************************************************************************
    *   Adds all stuff walls to this stage.
    *
    *   @param meshFactory The MeshFactory instance.
    *******************************************************************************************************************/
    private addStuffWalls( meshFactory:bz.MeshFactory, pointLight:BABYLON.Light ) : void
    {
        // tv (65 inch)
        const tv:bz.Wall = new bz.Wall
        (
            this,
            new bz.Model
            (
                [
                    meshFactory.createBox
                    (
                        new BABYLON.Vector3( 17.0, 5.0, 39.5 ),
                        bz.TextureFile.VIDEO_TEST,
                        new BABYLON.Vector3( ( 15.0 * 0.640 ), ( 15.0 * 0.360 ), 0.25 ),
                        bz.PhysicSet.SHELVES,
                        1.0,
                        bz.MeshAnchor.CENTER_XYZ,
                        new BABYLON.Vector3( 0.0, 0.0, 0.0 )
                    ),
                ]
            ),
            bz.GameObject.UNBREAKABLE,
            [
                new bz.Event(
                    bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                    new bz.EventDataShowGuiTextMessage( 'Nothing on the television today' )
                ),
                new bz.Event(
                    bz.EventType.TIME_DELAY,
                    new bz.EventDataTimeDelay( ( 2 * 60 ) )
                ),
                new bz.Event(
                    bz.EventType.SHOW_GUI_TEXT_MESSAGE,
                    new bz.EventDataShowGuiTextMessage( 'DELAYED: I will turn the lights off :)' )
                ),
                new bz.Event(
                    bz.EventType.TOGGLE_LIGHT,
                    new bz.EventDataToggleLight( pointLight )
                ),
            ],
            bz.InteractionType.REPEATED
        );

        this.addWall( tv );

        // solid white sphere
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createSphere
                        (
                            new BABYLON.Vector3( 10.5, 1.5, 30.0 ),
                            bz.MeshAnchor.CENTER_XYZ,
                            3.0,
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.TextureFile.MODEL_WOOD_HORZ,
                            null,
                            bz.PhysicSet.WHITE_TEST_SPHERE
                        ),
                    ]
                )
            )
        );
    }

    /** ****************************************************************************************************************
    *   Adds some trees to this stage.
    *
    *   @param meshFactory The MeshFactory instance.
    *******************************************************************************************************************/
    private addTrees( meshFactory :bz.MeshFactory ) :void
    {
        // create and animate a sprite
        const animatedTestSprite:bz.Sprite = new bz.Sprite
        (
            this.getScene(),
            bz.SpriteFile.FIRE,
            new BABYLON.Vector3( 20.0, 0.0, 20.0 ),
            10.0,
            20.0,
            bz.SpriteCollidable.NO
        );
        animatedTestSprite.animate( 0, 24, true );
        this.addSprite( animatedTestSprite );

        this.addSprite(
            new bz.Sprite
            (
                this.getScene(),
                bz.SpriteFile.PALM,
                new BABYLON.Vector3( 130.0, 0.0, 10.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5,
                bz.MeshAnchor.CENTER_XZ_LOWEST_Y,
                bz.MathUtil.getRandomInt( -10.0, 10.0 )
            )
        );
        this.addSprite(
            new bz.Sprite
            (
                this.getScene(),
                bz.SpriteFile.TREE,
                new BABYLON.Vector3( 130.0, 0.0, 20.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5
            )
        );
        this.addSprite(
            new bz.Sprite
            (
                this.getScene(),
                bz.SpriteFile.PALM,
                new BABYLON.Vector3( 140.0, 0.0, 20.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5,
                bz.MeshAnchor.CENTER_XZ_LOWEST_Y,
                bz.MathUtil.getRandomInt( -10.0, 10.0 )
            )
        );
        this.addSprite(
            new bz.Sprite
            (
                this.getScene(),
                bz.SpriteFile.TREE,
                new BABYLON.Vector3( 140.0, 0.0, 10.0 ),
                10.0,
                10.0,
                bz.SpriteCollidable.YES,
                0.5
            )
        );
    }

    /** ****************************************************************************************************************
    *   Creates the ground walls for this stage.
    *******************************************************************************************************************/
    private addGroundWalls( meshFactory:bz.MeshFactory ) : void
    {
        // dam ( heightmap ground )
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createHeightMapGround
                        (
                            new BABYLON.Vector3( -50.0, 0.0, 0.0 ),
                            bz.MeshAnchor.CENTER_XYZ,
                            1000.0,
                            50.0,
                            bz.TextureFile.HEIGHTMAP_HILLS,
                            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                            bz.PhysicSet.NONE
                        ),
                    ]
                )
            )
        );
    }
}

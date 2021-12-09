import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies the 'office' stage.
***********************************************************************************************************************/
export class StageOffice extends bz.Stage
{
    /** Testwise camera target toggle. */
    private camTarget :boolean = false;

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
                ( bz.SettingAEC.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 ),
                ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ) + bz.SettingAEC.FLOOR_OFFSET_Y,
                ( bz.SettingAEC.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 )
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

        // player
        this.setPlayer( new bz.Player( this ) );

        // point light
        const pointLights :BABYLON.PointLight[] = bz.LightFactory.createPoint
        (
            [ this.getScene().getNativeSceneBG(), this.getScene().getNativeSceneFG() ],
            new BABYLON.Vector3( 10.0, 5.0, 5.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.75, 0.75, 0.75 ),
            125.0,
            1.25
        );
        this.addLight( pointLights );

        // staircase
        bz.StageFactory.addStaircase(
            this,
            meshFactory,
            new BABYLON.Vector3( -65.0, 0.0, 0.0 ),
            0.0,
            bz.TextureFile.WALL_CONCRETE_NEW,
            bz.TextureFile.WALL_CARPET_1,
            bz.TextureFile.WALL_COBBLES_1
        );

        if ( true ) return;

        // small office
        bz.AECFactory.addSmallOffice(
            this,
            meshFactory,
            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            0.0
        );

        // parking lot
        bz.AECFactory.addParkingLot(
            this,
            meshFactory,
            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            0.0
        );

        // add rain effect
        this.setRainEffect(
            3.0,
            750,
            new BABYLON.Vector3( 0.5, -1.5, 0.5 )
        );

        // large office
        bz.AECFactory.addLargeOffice(
            this,
            meshFactory,
            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            0.0,
            pointLights
        );

        // small park
        bz.AECFactory.addSmallPark(
            this,
            meshFactory,
            new BABYLON.Vector3( 600.0, 0.0, 600.0 ),
            0.0
        );

        // medium office
        bz.AECFactory.addMediumOffice(
            this,
            meshFactory,
            new BABYLON.Vector3( 600.0, 0.0, 600.0 ),
            0.0
        );

        // back yard
        bz.AECFactory.addBackyard(
            this,
            meshFactory,
            new BABYLON.Vector3( 1700.0, 0.0, 1700.0 ),
            0.0
        );

        // warehouse
        bz.AECFactory.addWarehouse(
            this,
            meshFactory,
            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            0.0
        );

        // residental street
        bz.AECFactory.addResidentalStreet(
            this,
            meshFactory,
            new BABYLON.Vector3( 100.0, 0.0, 100.0 ),
            0.0
        );

        // parking lot
        bz.AECFactory.addParkingLot(
            this,
            meshFactory,
            new BABYLON.Vector3( 300.0, 0.0, 300.0 ),
            0.0
        );

        // hallway
        bz.AECFactory.addHallway(
            this,
            meshFactory,
            new BABYLON.Vector3( 500.0, 0.0, 500.0 ),
            0.0
        );

        // TODO addCasino with diamond corners

        // TODO addLightyard

        // TODO addOfficeKitchen?

        // TODO addKickerLounge?

        // 2nd point light in 2nd office // stick to chair or to player head
        const pointLights2 :BABYLON.PointLight[] = bz.LightFactory.createPoint
        (
            [ this.getScene().getNativeSceneBG(), this.getScene().getNativeSceneFG() ],
            // new BABYLON.Vector3( 115.0, 5.0, 15.0 ),
            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 )
        );
        // pointLight2.parent = this.chairCompoundDestroyable.getModel().getMesh( 0 );
        // pointLight2.parent = this.getPlayer().getModel().getMesh( 1 );
        this.addLight( pointLights2 );

        // add fog
        this.getScene().enableFog( bz.SettingColor.COLOR_RGB_GREEN, 0.05 ); // green steam

        // add shadows for point light
        this.addShadowGenerator( pointLights2[ 0 ] );

        // add test sprites
        this.addTestSprites( meshFactory );

        // add test items
        this.addTestItems();

        // add test bots
        this.addTestBots();
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
                            new BABYLON.Vector3( 20.5, bz.SettingAEC.FLOOR_OFFSET_Y, 20.5 ),
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
    *   Adds some trees to this stage.
    *
    *   @param meshFactory The MeshFactory instance.
    *******************************************************************************************************************/
    private addTestSprites( meshFactory :bz.MeshFactory ) :void
    {
        // create and animate a sprite
        const animatedFireSprite:bz.Sprite = new bz.Sprite
        (
            this.getScene(),
            bz.SpriteFile.FIRE,
            new BABYLON.Vector3( 20.0, 0.0, 20.0 ),
            10.0,
            20.0,
            bz.SpriteCollidable.NO
        );
        animatedFireSprite.animate( 0, 24, true );
        this.addSprite( animatedFireSprite );

        this.addSprite(
            [
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
                ),
                new bz.Sprite
                (
                    this.getScene(),
                    bz.SpriteFile.TREE,
                    new BABYLON.Vector3( 130.0, 0.0, 20.0 ),
                    10.0,
                    10.0,
                    bz.SpriteCollidable.YES,
                    0.5
                ),
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
                ),
                new bz.Sprite
                (
                    this.getScene(),
                    bz.SpriteFile.TREE,
                    new BABYLON.Vector3( 140.0, 0.0, 10.0 ),
                    10.0,
                    10.0,
                    bz.SpriteCollidable.YES,
                    0.5
                ),
            ]
        );
    }

    private addTestBots() : void
    {
        // add bot - walking towards axis X
        this.addBot(
            new bz.Bot(
                0,
                this,
                bz.BotType.TEST_WALK_X,
                new BABYLON.Vector3( 10.0, bz.SettingAEC.FLOOR_OFFSET_Y, 20.0 )
            )
        );

        // add bot 1 - dancing girl on 0,0,0
        this.addBot(
            new bz.Bot(
                0.0,
                this,
                bz.BotType.TEST_DANCING_GIRL,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 )
            )
        );

        // add bot 2 - walking dude A
        this.addBot(
            new bz.Bot(
                0.0,
                this,
                bz.BotType.TEST_WALKING_DUDE,
                new BABYLON.Vector3( 20.0, 0.0, 20.0 )
            )
        );
        // add bot 2 - walking dude B
        this.addBot(
            new bz.Bot(
                0.0,
                this,
                bz.BotType.TEST_WALKING_DUDE,
                new BABYLON.Vector3( 10.0, 0.0, 25.0 )
            )
        );

        // add bot 2 - walking dude C
        this.addBot(
            new bz.Bot(
                0.0,
                this,
                bz.BotType.TEST_WALKING_DUDE,
                new BABYLON.Vector3( 32.5, 0.0, 45.0 )
            )
        );
        // add bot 2 - walking dude D
        this.addBot(
            new bz.Bot(
                0.0,
                this,
                bz.BotType.TEST_WALKING_DUDE,
                new BABYLON.Vector3( 40.5, 0.0, 55.0 )
            )
        );
/*
        // add bot 3 - one more dancing girl on 0,0,0
        this.addBot(
            new bz.Bot(
                -90.0,
                this,
                bz.BotType.TEST_DANCING_GIRL,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 )
            )
        );
*/
/*
        // add bot - walking towards player
        this.addBot(
            [
                new bz.Bot(
                    0,
                    this,
                    bz.BotType.TEST_WALKING_DUDE,
                    new BABYLON.Vector3( 50.0, bz.SettingAEC.FLOOR_OFFSET_Y, 70.0 )
                ),
                new bz.Bot(
                    0,
                    this,
                    bz.BotType.TEST_WALK_TOWARDS_PLAYER,
                    new BABYLON.Vector3( 50.0, bz.SettingAEC.FLOOR_OFFSET_Y, 70.0 )
                ),
            ]
        );
*/
    }

    private addTestItems() : void
    {
/*
        // shotgun ( TODO create shotgun item! )
        this.addWall(
            new bz.Wall
            (
                this,
                meshFactory.createImportedModel
                (
                    bz.ModelFile.SHOTGUN_M1014,
                    new BABYLON.Vector3( 90.0, 2.1, 10.0 ),
                    bz.PhysicSet.NONE,
                    null
                ),
                5.0
            )
        );
*/
        // add some items
        this.addCollectable(
            [
                new bz.Item
                (
                    this,
                    new BABYLON.Vector3( 2.5, 0.0, 2.5 ),
                    bz.ItemType.BULLETS_792MM
                ),
                new bz.Item
                (
                    this,
                    new BABYLON.Vector3( 5.0, 0.0, 5.0 ),
                    bz.ItemType.SHOTGUN_SHELLS
                ),
                new bz.Item
                (
                    this,
                    new BABYLON.Vector3( 2.5, 0.0, 5.0 ),
                    bz.ItemType.BULLETS_792MM
                ),
            ]
        );

        this.addCollectable(
            new bz.Item
            (
                this,
                new BABYLON.Vector3( 5.0, 0.0, 7.5 ),
                bz.ItemType.SHOTGUN_SHELLS
            )
        );
        this.addCollectable(
            new bz.Item
            (
                this,
                new BABYLON.Vector3( 7.5, 0.0, 7.5 ),
                bz.ItemType.BULLETS_792MM
            )
        );

        // add invisible event trigger
        this.addCollectable(
            new bz.Trigger
            (
                this,
                new BABYLON.Vector3( 30.0, 0.0, 30.0 ),
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
                new BABYLON.Vector3( 30.0, 0.0, 40.0 ),
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
                new BABYLON.Vector3( 35.0, 0.0, 35.0 ),
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
    }
}

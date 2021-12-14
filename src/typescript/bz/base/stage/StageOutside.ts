import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies the 'StageOutside' stage.
***********************************************************************************************************************/
export class StageOutside extends bz.Stage
{
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
            new BABYLON.Vector3( 0.0, 60.0, 0.0 )
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
        this.addGroundWalls( meshFactory );

        // player
        this.setPlayer( new bz.Player( this ) );

        // parking yard
        const doorEventsSwitchStage:bz.Event[] = [
            new bz.Event(
                bz.EventType.SWITCH_TO_STAGE,
                new bz.EventDataStageSwitch(
                    bz.StageId.OFFICE,
                    new BABYLON.Vector3(
                        30.0 + ( bz.SettingAEC.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 ),
                        ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ) + bz.SettingAEC.FLOOR_OFFSET_Y,
                        ( bz.SettingAEC.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 )
                    ),
                    new BABYLON.Vector3( 0.0, 270.0, 0.0 )
                )
            ),
        ];
        bz.RoomFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            new BABYLON.Vector3( 40.0, 3.0, 60.0 ),
            0.0,
            bz.TextureFile.WALL_STONES_DARK_GRANITE, [], [], 0,
            null,                         [], [], 0,
            bz.TextureFile.WALL_STONES_DARK_GRANITE, [], [], 0,
            bz.TextureFile.WALL_MARBLE_1, [ new bz.DoorData( 30.0, doorEventsSwitchStage ) ], [], 0,
            bz.TextureFile.MODEL_CONCRETE,
            null
        );

        // boxes pile
        bz.AECFactory.addCratesPile(
            this,
            meshFactory,
            new BABYLON.Vector3( 20.0, bz.SettingAEC.FLOOR_OFFSET_Y, 20.0 )
        );

        // point light 1
        const pointLights1 :BABYLON.PointLight[] = bz.LightFactory.createPoint
        (
            [ this.getScene().getNativeSceneBG(), this.getScene().getNativeSceneFG() ],
            new BABYLON.Vector3( 10.0, 5.0, 5.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 )
        );
        this.addLight( pointLights1 );

        // point light 2
        const pointLights2 :BABYLON.PointLight[] = bz.LightFactory.createPoint
        (
            [ this.getScene().getNativeSceneBG(), this.getScene().getNativeSceneFG() ],
            new BABYLON.Vector3( 115.0, 5.0, 15.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 )
        );
        this.addLight( pointLights2 );
    }

    /** ****************************************************************************************************************
    *   Handles stage specific keys.
    *******************************************************************************************************************/
    protected handleStageKeys() : void
    {
        // no specific keys to handle in this stage
    }

    /** ****************************************************************************************************************
    *   Creates the ground walls for this stage.
    *******************************************************************************************************************/
    private addGroundWalls( meshFactory:bz.MeshFactory ) : void
    {
        // valley ( heightmap ground )
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    meshFactory.createHeightMapGround
                    (
                        new BABYLON.Vector3( 40.0, 0.0, 40 ),
                        bz.MeshAnchor.CENTER_XYZ,
                        400.0,
                        15.0,
                        bz.TextureFile.HEIGHTMAP_VALLEY,
                        new BABYLON.Vector3( 0.0, 90.0, 0.0 ),
                        bz.PhysicSet.NONE
                    )
                )
            )
        );
    }
}

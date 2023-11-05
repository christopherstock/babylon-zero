import * as bz from '../..';

/** ********************************************************************************************************************
*   Specifies the 'StageOutside' stage.
***********************************************************************************************************************/
export class StageWarehouse extends bz.Stage
{
    /** ****************************************************************************************************************
    *   Creates the stage config that is applied on initializing this stage.
    *******************************************************************************************************************/
    public createDefaultConfig() : bz.StageConfig
    {
        return new bz.StageConfig(
            new BABYLON.Color3( 0.25, 0.25, 0.25 ),
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
    protected createStageContents() : void
    {
        // blue skybox
        this.setSkybox( bz.SkyBoxFile.STORM, 0.25 );

        // player
        this.setPlayer( new bz.Player( this ) );

        // stage switching door
        const doorEventsSwitchStage:bz.Event[] = [
            new bz.Event(
                bz.EventType.SWITCH_TO_STAGE,
                new bz.EventDataStageSwitch(
                    bz.StageId.BACKYARD,
                    new BABYLON.Vector3(
                        0.0 + ( bz.SettingAEC.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 ),
                        ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ) + bz.SettingAEC.FLOOR_OFFSET_Y,
                        ( bz.SettingAEC.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 )
                    ),
                    new BABYLON.Vector3( 0.0, 270.0, 0.0 )
                )
            ),
        ];
        bz.RoomFactory.addRoomWalls(
            this,
            this.getMeshFactory(),
            new BABYLON.Vector3( 45.0, 0.0, 60.0 ),
            new BABYLON.Vector3( 5.0, 10.0, 5.0 ),
            90.0,
            null, null, null, null,
            null, null, null, null,
            null, null, null, null,
            bz.TextureFile.WALL_MARBLE_1, [
                new bz.DoorData(
                    0.0,
                    doorEventsSwitchStage,
                    bz.DoorAnimation.NONE,
                    false,
                    bz.TextureFile.WALL_DOOR_INDUSTRIAL,
                    -1,
                    false,
                    bz.SettingAEC.DOOR_WIDTH,
                    true
                ),
            ], [], 0
        );

        // warehouse
        bz.AECFactory.addWarehouse(
            this,
            this.getMeshFactory(),
            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            0.0
        );

        // 1st point light
        const pointLights :BABYLON.PointLight[] = bz.LightFactory.createPoint
        (
            [ this.getScene().getNativeSceneBG(), this.getScene().getNativeSceneFG() ],
            new BABYLON.Vector3( 30.0, 9.5, 30.0 ),
            new BABYLON.Color3( 0.75, 0.75, 0.75 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 )
        );
        this.addLight( pointLights );

        // add shadows for point light (costs lots of permormance)
        this.addShadowGenerator( pointLights[ 0 ] );
    }

    /** ****************************************************************************************************************
    *   Handles stage specific keys.
    *******************************************************************************************************************/
    protected handleStageKeys() : void
    {
        // no specific keys to handle in this stage
    }
}

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
                ( bz.SettingEngine.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 ),
                ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ) + bz.SettingEngine.FLOOR_OFFSET_Y,
                ( bz.SettingEngine.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 )
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
        bz.StageFactory.addRoomWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
            new BABYLON.Vector3( 40.0, 3.0, 60.0 ),
            0.0,
            bz.TextureFile.WALL_STONES_3, [], [],
            null, [], [],
            bz.TextureFile.WALL_STONES_3, [], [],
            bz.TextureFile.WALL_MARBLE, [ 60.0 - 5.0 - bz.SettingEngine.DOOR_WIDTH + bz.SettingEngine.WALL_DEPTH ], [],
            bz.TextureFile.WALL_CONCRETE,
            null
        );

        // add stage switch door
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createBox
                        (
                            new BABYLON.Vector3(
                                ( bz.SettingEngine.WALL_DEPTH / 2 ),
                                bz.SettingEngine.FLOOR_OFFSET_Y,
                                5.0 + ( bz.SettingEngine.DOOR_WIDTH / 2 )
                            ),
                            bz.TextureFile.WALL_DOOR_1,
                            new BABYLON.Vector3(
                                bz.SettingEngine.DOOR_WIDTH,
                                bz.SettingEngine.DOOR_HEIGHT,
                                bz.SettingEngine.WALL_DEPTH
                            ),
                            bz.PhysicSet.STATIC,
                            1.0,
                            bz.MeshAnchor.CENTER_XZ_LOWEST_Y,
                            new BABYLON.Vector3( 0.0, 90.0, 0.0 )
                        ),
                    ]
                ),
                bz.GameObject.UNBREAKABLE,
                [
                    new bz.Event(
                        bz.EventType.SWITCH_TO_STAGE,
                        new bz.EventDataStageSwitch(
                            bz.StageId.OFFICE,
                            new BABYLON.Vector3(
                                140.0 + ( bz.SettingEngine.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 ),
                                ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ) + bz.SettingEngine.FLOOR_OFFSET_Y,
                                ( bz.SettingEngine.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 )
                            ),
                            new BABYLON.Vector3( 0.0, 270.0, 0.0 )
                        )
                    ),
                ]
            )
        );

        // boxes pile in small office
        bz.StageFactory.addBoxesWalls(
            this,
            meshFactory,
            new BABYLON.Vector3( 20.0, bz.SettingEngine.FLOOR_OFFSET_Y, 20.0 )
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

        // point light in 2nd office
        const pointLight2 :BABYLON.PointLight = bz.LightFactory.createPoint
        (
            this.getScene().getNativeScene(),
            new BABYLON.Vector3( 115.0, 5.0, 15.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 0.0, 0.0, 0.0 )
        );
        this.addLight( pointLight2 );
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
        // hills ( heightmap ground )
        this.addWall(
            new bz.Wall
            (
                this,
                new bz.Model
                (
                    [
                        meshFactory.createHeightMapGround
                        (
                            new BABYLON.Vector3( 40.0, 0.0, 40 ),
                            bz.MeshAnchor.CENTER_XYZ,
                            400.0,
                            15.0,
                            bz.TextureFile.HEIGHTMAP_VALLEY,
                            new BABYLON.Vector3( 0.0, 90.0, 0.0 ),
                            bz.PhysicSet.NONE
                        ),
                    ]
                )
            )
        );
    }
}

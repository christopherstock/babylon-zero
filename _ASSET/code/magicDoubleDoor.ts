    const eventsSwitchStage :bz.Event[] = [
        new bz.Event(
            bz.EventType.SWITCH_TO_STAGE,
            new bz.EventDataStageSwitch(
                bz.StageId.OUTSIDE,
                new BABYLON.Vector3(
                    ( bz.SettingAEC.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 ),
                    ( bz.SettingPlayer.HEIGHT_Y_STANDING / 2 ) + bz.SettingAEC.FLOOR_OFFSET_Y,
                    ( bz.SettingAEC.WALL_DEPTH + bz.SettingPlayer.DIAMETER_BODY / 2 )
                ),
                new BABYLON.Vector3( 0.0, 60.0, 0.0 )
            )
        ),
    ];
    const eventsDoorLocked :bz.Event[] = [
        new bz.Event(
            bz.EventType.SHOW_GUI_TEXT_MESSAGE,
            new bz.EventDataShowGuiTextMessage(
                'This door is locked',
                true
            )
        ),
    ];

    // test magic door 1
    const magicDoor1:bz.Door = new bz.Door
    (
        this,
        new BABYLON.Vector3( 20.0, 0.0, 20.0 ),
        0.0,
        bz.DoorAnimation.SWING_A_COUNTER_CLOCKWISE,
        eventsSwitchStage,
        new BABYLON.Vector3( 20.0, 0.0, 20.0 ),
        bz.TextureFile.WALL_DOOR_INDUSTRIAL,
        false
    );
    this.addWall( magicDoor1 );

    // test magic door 2
    const magicDoor2:bz.Door = new bz.Door
    (
        this,
        new BABYLON.Vector3( 20.0 + bz.SettingAEC.DOOR_WIDTH, 0.0, 20.0 ),
        0.0,
        bz.DoorAnimation.SWING_B_CLOCKWISE,
        eventsSwitchStage,
        new BABYLON.Vector3( 20.0 + bz.SettingAEC.DOOR_WIDTH, 0.0, 20.0 ),
        bz.TextureFile.WALL_DOOR_INDUSTRIAL,
        true
    );
    this.addWall( magicDoor2 );

    magicDoor1.setLinkedDoor( magicDoor2 );
    magicDoor2.setLinkedDoor( magicDoor1 );

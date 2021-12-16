import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a character being controlled by the cpu.
***********************************************************************************************************************/
export class Bot extends bz.GameObject
{
    private readonly type     :bz.BotType      = null;
    private readonly position :BABYLON.Vector3 = null;
    private readonly test     :number          = 0.0;
    private          walking  :boolean         = false;

    /** ****************************************************************************************************************
    *   Creates a new bot instance.
    *
    *   @param test            Used for testing purposes.
    *   @param stage           The stage this bot belongs to.
    *   @param type            The type of bot. Specifies the behaviour.
    *   @param startupPosition The initial position of this Bot.
    *******************************************************************************************************************/
    public constructor( test:number, stage:bz.Stage, type:bz.BotType, startupPosition:BABYLON.Vector3 )
    {
        super(
            stage,
            Bot.createModel(
                stage.getScene().getNativeSceneBG(),
                type,
                stage.createMeshFactory(),
                startupPosition
            )
        );

        this.type     = type;
        this.position = startupPosition;

        this.test = test;
    }

    /** ****************************************************************************************************************
    *   Renders one tick of the game loop for this game object.
    *******************************************************************************************************************/
    public render() : void
    {
        super.render();

        const playerPosition :BABYLON.Vector3 = this.stage.getPlayer().getPosition();

        switch ( this.type )
        {
            case bz.BotType.TEST_WALK_TOWARDS_PLAYER:
            {
                const BOT_SPEED_MOVE         :number = 0.1;
                const MAX_DISTANCE_TO_PLAYER :number = 5.0;

                // face player
                const angleBetweenBotAndPlayer :number = bz.MathUtil.angleBetweenPointsXZ(
                    this.position,
                    playerPosition
                );
                this.model.setAbsoluteRotationXYZ( 0.0, -angleBetweenBotAndPlayer, 0.0 );

                // get distance to player
                const distanceToPlayer :number = this.getFloorDistanceTo( playerPosition )
                if ( distanceToPlayer >= MAX_DISTANCE_TO_PLAYER )
                {
                    // walk towards player
                    this.moveIntoDirection( angleBetweenBotAndPlayer, BOT_SPEED_MOVE );
                }
                break;
            }

            case bz.BotType.TEST_WALK_X:
            {
                const delta :BABYLON.Vector3 = new BABYLON.Vector3( 0.0, 0.0, 0.01 );
                this.position.addInPlace( delta );
                this.model.translatePosition( delta );
                break;
            }

            case bz.BotType.TEST_WALKING_DUDE:
            {
                const BOT_SPEED_MOVE         :number = 0.1;
                const MAX_DISTANCE_TO_PLAYER :number = 5.0;

                const ANIMATE_WALKING_DUDE :boolean = true;

                // face player
                const angleBetweenBotAndPlayer :number = bz.MathUtil.angleBetweenPointsXZ(
                    this.position,
                    playerPosition
                );

                // get distance to player
                const distanceToPlayer :number = this.getFloorDistanceTo( playerPosition )
                if ( distanceToPlayer >= MAX_DISTANCE_TO_PLAYER )
                {
                    // walk towards player
                    this.moveIntoDirection( angleBetweenBotAndPlayer, BOT_SPEED_MOVE );

                    if ( !this.walking )
                    {
                        if ( ANIMATE_WALKING_DUDE )
                        {
                            this.stage.getScene().getNativeSceneBG().beginAnimation(
                                this.model.getMesh( 1 ).skeleton, 0, 100, true, 1.0
                            );
                            this.stage.getScene().getNativeSceneBG().beginAnimation(
                                this.model.getMesh( 2 ).skeleton, 0, 100, true, 1.0
                            );
                            this.stage.getScene().getNativeSceneBG().beginAnimation(
                                this.model.getMesh( 3 ).skeleton, 0, 100, true, 1.0
                            );
                            this.stage.getScene().getNativeSceneBG().beginAnimation(
                                this.model.getMesh( 4 ).skeleton, 0, 100, true, 1.0
                            );
                            this.stage.getScene().getNativeSceneBG().beginAnimation(
                                this.model.getMesh( 5 ).skeleton, 0, 100, true, 1.0
                            );
                        }
                        this.walking = true;
                    }

                    this.model.setAbsoluteRotationXYZ( 0.0, ( -angleBetweenBotAndPlayer + 270.0 ), 0.0 );
                }
                else
                {
                    if ( this.walking )
                    {
                        if ( ANIMATE_WALKING_DUDE )
                        {
                            this.stage.getScene().getNativeSceneBG().stopAnimation( this.model.getMesh( 1 ).skeleton );
                            this.stage.getScene().getNativeSceneBG().stopAnimation( this.model.getMesh( 2 ).skeleton );
                            this.stage.getScene().getNativeSceneBG().stopAnimation( this.model.getMesh( 3 ).skeleton );
                            this.stage.getScene().getNativeSceneBG().stopAnimation( this.model.getMesh( 4 ).skeleton );
                            this.stage.getScene().getNativeSceneBG().stopAnimation( this.model.getMesh( 5 ).skeleton );

                            this.model.getMesh( 1 ).skeleton.returnToRest();
                            this.model.getMesh( 2 ).skeleton.returnToRest();
                            this.model.getMesh( 3 ).skeleton.returnToRest();
                            this.model.getMesh( 4 ).skeleton.returnToRest();
                            this.model.getMesh( 5 ).skeleton.returnToRest();
                        }
                        this.walking = false;

                        this.model.setAbsoluteRotationXYZ( 0.0, ( -angleBetweenBotAndPlayer + 90.0 ), 0.0 );
                    }
                }
                break;
            }

            case bz.BotType.TEST_DANCING_GIRL:
            {
                // do nothing!

                // this.model.setAbsoluteRotationXYZ( 90.0, this.test, 0.0 );

                // no effect
                // this.model.translatePosition( new BABYLON.Vector3( -50 * 100.0, 50 * 100.0, 0 ) );

                break;
            }
        }
    }

    /** ****************************************************************************************************************
    *   Calculate the floor distance from this bot to the given vector.
    *
    *   @param point The vector to meassure floor distance to.
    *
    *   @return The floor distance (XZ-Points) between this bot's position and the specified point.
    *******************************************************************************************************************/
    private getFloorDistanceTo( point:BABYLON.Vector3 ) : number
    {
        return BABYLON.Vector2.Distance(
            new BABYLON.Vector2( this.position.x, this.position.z ),
            new BABYLON.Vector2( point.x, point.z )
        );
    }

    /** ****************************************************************************************************************
    *   Moves this bot into the specified direction and with the specified speed.
    *
    *   @param angle The direction to move to.
    *   @param speed The distance to move.
    *******************************************************************************************************************/
    private moveIntoDirection( angle:number, speed:number ) : void
    {
        const delta :BABYLON.Vector3 = new BABYLON.Vector3(
            speed * bz.MathUtil.cosDegrees( angle ),
            0.0,
            speed * bz.MathUtil.sinDegrees( angle )
        );
        this.position.addInPlace( delta );
        this.model.translatePosition( delta );
    }

    /** ****************************************************************************************************************
    *   Creates the model for this bot.
    *
    *   @param scene           The scene to load the model into.
    *   @param botType         The type of the bot to create the model for.
    *   @param meshFactory     A mesh factory instance.
    *   @param startupPosition The initial position of the bot.
    *
    *   @return The model that represents this bot.
    *******************************************************************************************************************/
    private static createModel(
        scene           :BABYLON.Scene,
        botType         :bz.BotType,
        meshFactory     :bz.MeshFactory,
        startupPosition :BABYLON.Vector3
    )
    : bz.Model
    {
        switch ( botType )
        {
            case bz.BotType.TEST_WALK_X:
            case bz.BotType.TEST_WALK_TOWARDS_PLAYER:
            {
                return meshFactory.createImportedModel(
                    bz.ModelFile.CRATE,
                    startupPosition
                );
            }
            case bz.BotType.TEST_WALKING_DUDE:
            {
                const walkingDude :bz.Model = meshFactory.createImportedModel(
                    bz.ModelFile.TEST_WALKING_DUDE,
                    startupPosition
                );

                walkingDude.scaleSize( new BABYLON.Vector3( 0.1, 0.1, 0.1 ) );

                return walkingDude;
            }
            case bz.BotType.TEST_DANCING_GIRL:
            {
                const dancingGirl :bz.Model = meshFactory.createImportedModel(
                    bz.ModelFile.TEST_DANCING_GIRL,
                    startupPosition
                );

                dancingGirl.scaleSize( new BABYLON.Vector3( 100.0, 100.0, 100.0 ) );

                // @see https://playground.babylonjs.com/#AHQEIB#17
/*
                // get and play Samba animation Group
                let sambaAnim :BABYLON.AnimationGroup = scene.getAnimationGroupByName( 'Samba' );
                console.log( '> Samba Anim: ', sambaAnim );
                sambaAnim.start( true, 1.0, sambaAnim.from, sambaAnim.to );
                // scene.beginAnimation( dancingGirl.getMesh( 0 ).skeleton, 0, 10, true, 1.0 );
*/
                return dancingGirl;
            }
        }

        return null;
    }
}

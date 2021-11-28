import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a character being controlled by the cpu.
***********************************************************************************************************************/
export class Bot extends bz.GameObject
{
    private type     :bz.BotType      = null;
    private position :BABYLON.Vector3 = null;

    /** ****************************************************************************************************************
    *   Creates a new bot instance.
    *
    *   @param stage The stage this bot belongs to.
    *******************************************************************************************************************/
    public constructor( stage:bz.Stage, type:bz.BotType, startupPosition:BABYLON.Vector3 )
    {
        super(
            stage,
            Bot.createModel(
                new bz.MeshFactory( stage.getScene(), stage.getConfig().ambientColor ),
                startupPosition
            )
        );

        this.type     = type;
        this.position = startupPosition;
    }

    public render() : void
    {
        super.render();

        switch ( this.type )
        {
            case bz.BotType.TEST_WALK_TOWARDS_PLAYER:
            {
                const BOT_SPEED_MOVE         :number = 0.1;
                const MAX_DISTANCE_TO_PLAYER :number = 5.0;

                // face player
                const angleBetweenBotAndPlayer :number = bz.MathUtil.angleBetweenPointsXZ(
                    this.position,
                    // TODO refactor to local var
                    this.stage.getPlayer().getPosition()
                );
                this.model.setAbsoluteRotationXYZ( 0.0, -angleBetweenBotAndPlayer, 0.0 );

                // get distance to player
                const distanceToPlayer :number = BABYLON.Vector2.Distance(
                    new BABYLON.Vector2( this.position.x, this.position.z ),
                    new BABYLON.Vector2( this.stage.getPlayer().getPosition().x, this.stage.getPlayer().getPosition().z )
                );
                if ( distanceToPlayer >= MAX_DISTANCE_TO_PLAYER )
                {
                    // walk towards player
                    const delta :BABYLON.Vector3 = new BABYLON.Vector3(
                        BOT_SPEED_MOVE * bz.MathUtil.cosDegrees( angleBetweenBotAndPlayer ),
                        0.0,
                        BOT_SPEED_MOVE * bz.MathUtil.sinDegrees( angleBetweenBotAndPlayer )
                    );
                    this.position.addInPlace( delta );
                    this.model.translatePosition( delta );
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
        }
    }

    /** ****************************************************************************************************************
    *   Creates the model for this bot.
    *
    *   @param meshFactory A mesh factory instance.
    *
    *   @return The model that represents this bot.
    *******************************************************************************************************************/
    private static createModel( meshFactory:bz.MeshFactory, startupPosition:BABYLON.Vector3 ) : bz.Model
    {
        const model :bz.Model = meshFactory.createImportedModel(
            bz.ModelFile.CRATE,
            startupPosition
        );

        return model;
    }
}

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
                const angleBetweenBotAndPlayer :number = bz.MathUtil.angleBetweenPointsXZ(
                    this.position,
                    this.stage.getPlayer().getPosition()
                );
                const delta :BABYLON.Vector3 = new BABYLON.Vector3( 0.0, 0.0, 0.0 );

                this.position.addInPlace( delta );
                this.model.translatePosition( delta );
                this.model.setAbsoluteRotationXYZ( 0.0, angleBetweenBotAndPlayer, 0.0 );
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

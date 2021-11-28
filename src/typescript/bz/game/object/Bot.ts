import * as bz from '../..';

/** ********************************************************************************************************************
*   Represents a character being controlled by the cpu.
***********************************************************************************************************************/
export class Bot extends bz.GameObject
{
    /** ****************************************************************************************************************
    *   Creates a new bot instance.
    *
    *   @param stage The stage this bot belongs to.
    *******************************************************************************************************************/
    public constructor( stage:bz.Stage, startupPosition:BABYLON.Vector3 )
    {
        super(
            stage,
            Bot.createModel(
                new bz.MeshFactory( stage.getScene(), stage.getConfig().ambientColor ),
                startupPosition
            )
        );
    }

    public render() : void
    {
        super.render();

        this.model.translatePosition( new BABYLON.Vector3( 0.0, 0.0, 0.11 ) );
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

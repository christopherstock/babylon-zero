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
                stage.getScene().getNativeScene(),
                type,
                new bz.MeshFactory(
                    stage.getScene(),
                    new BABYLON.Color3( 0.0, 0.0, 0.0 )
                    // bz.SettingColor.COLOR_RGB_WHITE
                    // stage.getConfig().ambientColor
                ),
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

            case bz.BotType.TEST_DANCING_GIRL:
            {
                // do nothing!
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
    private static createModel( scene:BABYLON.Scene, botType:bz.BotType, meshFactory:bz.MeshFactory, startupPosition:BABYLON.Vector3 ) : bz.Model
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
            case bz.BotType.TEST_DANCING_GIRL:
            {
                const dancingGirl :bz.Model = meshFactory.createImportedModel(
                    bz.ModelFile.TEST_DANCING_GIRL,
                    startupPosition
                );

                // dancingGirl.setVisible( true );
                // dancingGirl.rotateAroundAxisX( 0.0, 0.0, -90.0 )

                dancingGirl.scaleSize( new BABYLON.Vector3( 100.0, 100.0, 100.0 ) );
                dancingGirl.translatePosition( new BABYLON.Vector3( -25 * 100.0, 25 * 100.0, 0 ) );

                // get and play Samba animation Group
                let sambaAnim :BABYLON.AnimationGroup = scene.getAnimationGroupByName( 'Samba' );
                sambaAnim.reset();
                sambaAnim = sambaAnim.clone( "Chrisy2" );
                sambaAnim.start( true, 1.0, sambaAnim.from, sambaAnim.to );



                console.log( '> Samba Anim: ', sambaAnim );
                console.log( '> Dancing Girl:', dancingGirl );

                return dancingGirl;
            }
        }

        return null;
    }
}

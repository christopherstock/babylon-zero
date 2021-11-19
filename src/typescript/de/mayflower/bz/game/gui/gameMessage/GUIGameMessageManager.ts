import * as bz          from '../../..';
import * as BABYLON_GUI from 'babylonjs-gui';

/** ********************************************************************************************************************
*   Manages the handling for GUI Game Messages.
***********************************************************************************************************************/
export class GUIGameMessageManager
{
    /** All GUI game messages currently displayed. */
    private readonly messageQueue :bz.GUIGameMessage[] = [];

    private delayTicksBeforeNextMessage :number = 0;

    /** ****************************************************************************************************************
    *   Adds a message to the message queue.
    *
    *   @param gui The gui to add the text message to.
    *   @param img The image to display for this game message.
    *   @param msg The message to add to the message queue.
    *******************************************************************************************************************/
    public addGuiGameMessage( gui:BABYLON_GUI.AdvancedDynamicTexture, img:bz.GUIGameMessagePic, msg:string ) : void
    {
        this.messageQueue.push
        (
            new bz.GUIGameMessage
            (
                gui,
                img,
                msg
            )
        );
    }

    /** ****************************************************************************************************************
    *   Renders the GUI game message manager for one game tick.
    *******************************************************************************************************************/
    public render() : void
    {
        if ( this.delayTicksBeforeNextMessage > 0 )
        {
            --this.delayTicksBeforeNextMessage;
        }
        else
        {
            // render the 1st GUI message
            if ( this.messageQueue.length > 0 )
            {
                const firstMessage :bz.GUIGameMessage = this.messageQueue[ 0 ];

                // render message and check if still alive
                firstMessage.render();
                if ( firstMessage.isLifetimeOver() )
                {
                    // dispose and prune message form queue
                    firstMessage.dispose();
                    this.messageQueue.shift();

                    // delay before handling next message
                    this.delayTicksBeforeNextMessage = bz.SettingGUI.GUI_GAME_MESSAGE_DELAY_BETWEEN_MESSAGES;
                }
            }
        }
    }
}

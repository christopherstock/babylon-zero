import * as bz          from '../../..';
import * as BABYLON_GUI from 'babylonjs-gui';

/** ********************************************************************************************************************
*   Manages the handling for GUI Game Messages.
***********************************************************************************************************************/
export class GUIGameMessageManager
{
    /** All GUI game messages currently displayed. */
    private readonly messageQueue :bz.GUIGameMessage[] = [];

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

    public render() : void
    {
    }
}

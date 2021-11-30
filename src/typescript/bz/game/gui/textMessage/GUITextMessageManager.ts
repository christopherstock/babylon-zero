import * as bz          from '../../..';
import * as BABYLON_GUI from 'babylonjs-gui';

/** ********************************************************************************************************************
*   Manages all GUI messages shown in the GUI.
***********************************************************************************************************************/
export class GUITextMessageManager
{
    /** All GUI messages currently displayed. */
    private readonly messageQueue :bz.GUITextMessage[] = [];

    /** ****************************************************************************************************************
    *   Renders the GUI message manager for one game tick.
    *******************************************************************************************************************/
    public render() : void
    {
        this.updateMessageQueue();
    }

    /** ****************************************************************************************************************
    *   Adds a message to the message queue.
    *
    *   @param gui        The gui to add the text message to.
    *   @param msg        The message to add to the message queue.
    *   @param noFlooding If enabled, the message is ignored if the previously added text message has the same body.
    *******************************************************************************************************************/
    public addGuiTextMessage(gui:BABYLON_GUI.AdvancedDynamicTexture, msg:string, noFlooding:boolean ) : void
    {
        if (
            noFlooding
            && this.messageQueue.length > 0
            && this.messageQueue[ this.messageQueue.length - 1 ].msg === msg
        )
        {
            return;
        }

        // creating the GUITextMessage will show the element on the screen
        this.messageQueue.push
        (
            new bz.GUITextMessage
            (
                gui,
                msg
            )
        );

        this.relocateAllMessages();
    }

    /** ****************************************************************************************************************
    *   Updates the displayed GUI messages.
    *   Outdated messages are disposed, causing all remaining messages to relocate.
    *******************************************************************************************************************/
    private updateMessageQueue() : void
    {
        // render GUI messages
        for ( const message of this.messageQueue )
        {
            message.render();
        }

        // dispose obsolete GUI messages
        let relocationRequired:boolean = false;
        for ( let index:number = this.messageQueue.length - 1; index >= 0; --index )
        {
            if ( this.messageQueue[ index ].isLifetimeOver() )
            {
                this.messageQueue[ index ].dispose();
                this.messageQueue.splice( index, 1 );

                relocationRequired = true;
            }
        }

        // relocate GUI messages if required
        if ( relocationRequired )
        {
            this.relocateAllMessages();
        }
    }

    /** ****************************************************************************************************************
    *   Relocates all GUI messages concerning the Y location.
    *******************************************************************************************************************/
    private relocateAllMessages() : void
    {
        for ( let index:number = 0; index < this.messageQueue.length; ++index )
        {
            this.messageQueue[ index ].setPositionY( index, this.messageQueue.length );
        }
    }
}

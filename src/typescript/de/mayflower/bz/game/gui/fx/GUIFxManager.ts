import * as bz   from '../../..';
import * as bjsg from 'babylonjs-gui'

/** ********************************************************************************************************************
*   Manages all GUI FX shown in the GUI.
***********************************************************************************************************************/
export class GUIFxManager
{
    /** All GUI effects currently displayed. */
    private             readonly        fxQueue             :bz.GUIFx[]                         = [];

    /** ****************************************************************************************************************
    *   Renders this GUI message manager for one game tick.
    *******************************************************************************************************************/
    public render() : void
    {
        this.updateMessageQueue();
    }

    /** ****************************************************************************************************************
    *   Adds an effect to the fx queue.
    *
    *   @param gui  The gui to add the text message to.
    *   @param type The message to add to the message queue.
    *******************************************************************************************************************/
    public addGuiFx( gui:bjsg.AdvancedDynamicTexture, type:bz.GUIFxType ) : void
    {
        this.fxQueue.push
        (
            new bz.GUIFx
            (
                gui,
                type
            )
        );
    }

    /** ****************************************************************************************************************
    *   Updates the displayed GUI messages.
    *   Outdated messages are disposed, causing all remaining messages to relocate.
    *******************************************************************************************************************/
    private updateMessageQueue() : void
    {
        // render GUI effects
        for ( const effect of this.fxQueue )
        {
            effect.render();
        }

        // dispose obsolete GUI effects
        for ( let index:number = this.fxQueue.length - 1; index >= 0; --index )
        {
            if ( this.fxQueue[ index ].isLifetimeOver() )
            {
                this.fxQueue[ index ].dispose();
                this.fxQueue.splice( index, 1 );
            }
        }
    }
}

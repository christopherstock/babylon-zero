
    import * as bz          from '../../..';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   Manages all HUD messages shown in the HUD.
    *******************************************************************************************************************/
    export class HUDMessageManager
    {
        /** All HUD messages currently displayed. */
        private             readonly        messageQueue            :bz.HUDMessage[]                        = [];

        /** ************************************************************************************************************
        *   Creates a new HUD message manager.
        ***************************************************************************************************************/
        public constructor()
        {
        }

        /** ************************************************************************************************************
        *   Renders this HUD message manager for one game tick.
        ***************************************************************************************************************/
        public render() : void
        {
            this.updateHudMessages();
        }

        /** ************************************************************************************************************
        *   Adds a message to the message queue.
        *
        *   @param gui The gui to add the text message to.
        *   @param msg The message to add to the message queue.
        ***************************************************************************************************************/
        public addHudMessage( gui:BABYLON_GUI.AdvancedDynamicTexture, msg:string ) : void
        {
            this.messageQueue.push
            (
                new bz.HUDMessage
                (
                    gui,
                    msg,
                )
            );

            this.relocateAllHudMessages();
        }

        /** ************************************************************************************************************
        *   Updates the displayed HUD messages.
        *   Outdated messages are disposed, causing all remaining messages to relocate.
        ***************************************************************************************************************/
        private updateHudMessages() : void
        {
            // render HUD messages
            for ( const hudMessage of this.messageQueue )
            {
                hudMessage.render();
            }

            // dispose obsolete HUD messages
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

            // relocate HUD messages if required
            if ( relocationRequired )
            {
                this.relocateAllHudMessages();
            }
        }

        /** ************************************************************************************************************
        *   Relocates all HUD messages concerning the Y location.
        ***************************************************************************************************************/
        private relocateAllHudMessages() : void
        {
            for ( let index:number = 0; index < this.messageQueue.length; ++index )
            {
                this.messageQueue[ index ].setPositionY( index, this.messageQueue.length );
            }
        }
    }

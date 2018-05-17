
    import * as bz from '../../..';

    /*******************************************************************************************************************
    *   The key system that manages all pressed keys.
    *******************************************************************************************************************/
    export class KeySystem
    {
        /** All 'pressed' information for all keys. */
        private             keysPressed         :boolean[]                      = [];
        /** All 'needs release' information for all keys. */
        private             keysNeedRelease     :boolean[]                      = [];

        /***************************************************************************************************************
        *   Creates a new key system.
        ***************************************************************************************************************/
        public constructor()
        {
            window.addEventListener( 'keydown',     this.onKeyDown, false );
            window.addEventListener( 'keyup',       this.onKeyUp,   false );

            window.addEventListener( 'onkeydown',   this.onKeyDown, false );
            window.addEventListener( 'onkeyup',     this.onKeyUp,   false );
        }

        /***************************************************************************************************************
        *   Being invoked by the system when a key is pressed.
        *
        *   @param event The system's propagated key event.
        ***************************************************************************************************************/
        public onKeyDown=( event:Event ) : void  =>
        {
            const keyCode:number = ( event as KeyboardEvent ).which; // TODO use 'code' instead?

            if ( !this.keysNeedRelease[ keyCode ] ) {
                this.keysPressed[ keyCode ] = true;

                bz.Debug.key.log( 'key pressed ['  + keyCode + ']' );
            }
        };

        /***************************************************************************************************************
        *   Being invoked by the system when a key is released.
        *
        *   @param event The system's propagated key event.
        ***************************************************************************************************************/
        public onKeyUp=( event:Event ) : void =>
        {
            const keyCode:number = ( event as KeyboardEvent ).which; // TODO use 'code' instead?

            this.keysPressed[     keyCode ] = false;
            this.keysNeedRelease[ keyCode ] = false;

            bz.Debug.key.log( 'key released ['  + keyCode + ']' );
        };

        /***************************************************************************************************************
        *   Checks if the key with the given keyCode is currently pressed.
        *
        *   @param  keyCode The keyCode of the key to return pressed state.
        *
        *   @return         <code>true</code> if this key is currently pressed.
        *                   Otherwise <code>false</code>.
        ***************************************************************************************************************/
        public isPressed( keyCode:number ) : boolean
        {
            return this.keysPressed[ keyCode ];
        }

        /***************************************************************************************************************
        *   Flags that a key needs release before being able to be pressed again.
        *
        *   @param keyCode The keyCode of the key to mark as 'needs key release'.
        ***************************************************************************************************************/
        public setNeedsRelease( keyCode:number ) : void
        {
            this.keysNeedRelease[ keyCode ] = true;
            this.keysPressed[     keyCode ] = false;
        }

        /***************************************************************************************************************
        *   Flags all keys as released, forcing the user to press certain keys again.
        *   Handy to invoke when the game screen loses the focus.
        ***************************************************************************************************************/
        public releaseAllKeys() : void
        {
            this.keysPressed = [];
        }
    }

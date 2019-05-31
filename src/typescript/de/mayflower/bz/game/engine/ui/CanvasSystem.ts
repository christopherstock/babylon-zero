
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   Manages the canvas.
    *******************************************************************************************************************/
    export class CanvasSystem
    {
        /** The native HTML5 canvas element. */
        private         readonly    canvas                  :HTMLCanvasElement              = null;
        /** The canvas rendering context. */
        private         readonly    canvasContext           :WebGLRenderingContext          = null;

        /** Indicates that the pointer is currently locked. */
        private                     pointerLocked           :boolean                        = false;

        /** ************************************************************************************************************
        *   Constructs a new canvas system.
        ***************************************************************************************************************/
        public constructor()
        {
            // create native canvas
            this.canvas = document.createElement( 'canvas' );

            // reference 3d rendering context
            this.canvasContext = this.canvas.getContext( 'webgl' );

            // append to body
            document.body.appendChild( this.canvas );

            // request pointer lock
            this.requestPointerLock();
        }

        /** ************************************************************************************************************
        *   Updates the canvas dimensions according to current screen size.
        *
        *   @return <code>true</code> if the canvas dimensions have actually been changed.
        ***************************************************************************************************************/
        public updateDimensions() : boolean
        {
            // get inner window dimensions
            let canvasWidth:number  = window.innerWidth;
            let canvasHeight:number = window.innerHeight;

            // clip to minimum canvas dimensions
            if ( canvasWidth  < bz.SettingEngine.CANVAS_MIN_WIDTH  ) canvasWidth  = bz.SettingEngine.CANVAS_MIN_WIDTH;
            if ( canvasHeight < bz.SettingEngine.CANVAS_MIN_HEIGHT ) canvasHeight = bz.SettingEngine.CANVAS_MIN_HEIGHT;

            const dimensionsChanged:boolean =
            (
                   this.canvas.width  !== canvasWidth
                || this.canvas.height !== canvasHeight
            );

            // assign new dimensions to canvas
            this.canvas.width  = canvasWidth;
            this.canvas.height = canvasHeight;

            bz.Debug.canvas.log
            (
                'Updated canvas dimensions to [' + canvasWidth + 'x' + canvasHeight + '] '
                + 'changed [' + dimensionsChanged + ']'
            );

            return dimensionsChanged;
        }

        /** ************************************************************************************************************
        *   Returns the current canvas width.
        *
        *   @return The width of the current canvas.
        ***************************************************************************************************************/
        public getWidth() : number
        {
            return this.canvas.width;
        }

        /** ************************************************************************************************************
        *   Returns the current canvas height.
        *
        *   @return The width of the current canvas.
        ***************************************************************************************************************/
        public getHeight() : number
        {
            return this.canvas.height;
        }

        /** ************************************************************************************************************
        *   Returns the native HTML canvas object.
        *
        *   @return The HTML canvas object.
        ***************************************************************************************************************/
        public getNativeCanvas() : HTMLCanvasElement
        {
            return this.canvas;
        }

        /** ************************************************************************************************************
        *   Returns the current canvas rendering context.
        *
        *   @return The webGL rendering context.
        ***************************************************************************************************************/
        public getCanvasContext() : WebGLRenderingContext
        {
            return this.canvasContext;
        }

        // TODO extract to pointer lock system!

        /** ************************************************************************************************************
        *   Requests the mouse/pointer lock feature of the browser.
        ***************************************************************************************************************/
        private requestPointerLock() : void
        {
            document.addEventListener( 'pointerlockchange',    ()                => { this.onPointerLockChange() }, false );
            document.addEventListener( 'mozpointerlockchange', ()                => { this.onPointerLockChange() }, false );
            document.addEventListener( 'mousemove',            ( me:MouseEvent ) => { this.onMouseMove( me );    }, false );

            this.canvas.onclick = () :void => {
                this.canvas.requestPointerLock = (
                    this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock
                );
                this.canvas.requestPointerLock();
            }
        }

        /** ************************************************************************************************************
        *   Being invoked when the pointer lock changes.
        ***************************************************************************************************************/
        private onPointerLockChange() : void
        {
            if (
                    document.pointerLockElement               === this.canvas
                ||  ( document as any ).mozPointerLockElement === this.canvas
            ) {
                console.log('The pointer lock status is now locked');

                this.pointerLocked = true;

            } else {
                console.log('The pointer lock status is now unlocked');

                this.pointerLocked = false;
            }
        }

        /** ************************************************************************************************************
        *   Being invoked when the pointer-locked mouse is moved.
        ***************************************************************************************************************/
        private onMouseMove( me:MouseEvent ) : void
        {
            if ( this.pointerLocked )
            {
                console.log( 'MovementX: ' + me.movementX );
                console.log( 'MovementY: ' + me.movementY );
            }





        }
    }


    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Manages the canvas.
    *******************************************************************************************************************/
    export class CanvasSystem
    {
        /** The canvas element. */
        private         readonly    canvas                  :HTMLCanvasElement              = null;
        /** The canvas rendering context. */
        private         readonly    canvasContext           :WebGLRenderingContext          = null;

        /***************************************************************************************************************
        *   Constructs a new canvas system.
        ***************************************************************************************************************/
        public constructor()
        {
            // create
            this.canvas = document.createElement( 'canvas' );

            // reference 3d rendering context
            this.canvasContext = this.canvas.getContext( 'webgl' );

            // append to body
            document.body.appendChild( this.canvas );
        }

        /***************************************************************************************************************
        *   Updates the canvas dimensions according to current screen size.
        ***************************************************************************************************************/
        public updateDimensions() : void
        {
            // get inner window dimensions
            let canvasWidth:number  = window.innerWidth;
            let canvasHeight:number = window.innerHeight;

            // clip to minimum canvas dimensions
            if ( canvasWidth  < bz.SettingEngine.CANVAS_MIN_WIDTH  ) canvasWidth  = bz.SettingEngine.CANVAS_MIN_WIDTH;
            if ( canvasHeight < bz.SettingEngine.CANVAS_MIN_HEIGHT ) canvasHeight = bz.SettingEngine.CANVAS_MIN_HEIGHT;

            // assign new dimensions to canvas
            this.canvas.width  = canvasWidth;
            this.canvas.height = canvasHeight;

            bz.Debug.canvas.log( 'Updated canvas dimensions to [' + canvasWidth + 'x' + canvasHeight + '] ' );
        }

        /***************************************************************************************************************
        *   Returns the current canvas width.
        *
        *   @return The width of the current canvas.
        ***************************************************************************************************************/
        public getWidth() : number
        {
            return this.canvas.width;
        }

        /***************************************************************************************************************
        *   Returns the current canvas height.
        *
        *   @return The width of the current canvas.
        ***************************************************************************************************************/
        public getHeight() : number
        {
            return this.canvas.height;
        }

        /***************************************************************************************************************
        *   Returns the current canvas object.
        *
        *   @return The HTML canvas object.
        ***************************************************************************************************************/
        public getCanvas() : HTMLCanvasElement
        {
            return this.canvas;
        }

        /***************************************************************************************************************
        *   Returns the current canvas rendering context.
        *
        *   @return The webGL rendering context.
        ***************************************************************************************************************/
        public getCanvasContext() : WebGLRenderingContext
        {
            return this.canvasContext;
        }
    }

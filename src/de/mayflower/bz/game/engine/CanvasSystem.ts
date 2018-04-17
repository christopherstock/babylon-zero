
    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Manages the canvas.
    *
    *   @author     Christopher Stock
    *   @version    1.0.0
    *******************************************************************************************************************/
    export class CanvasSystem
    {
        /** The canvas element. */
        private     canvas                  :HTMLCanvasElement              = null;
        /** The canvas rendering context. */
        private     canvasContext           :WebGLRenderingContext          = null;
        /** The current width of the canvas. */
        private     canvasWidth             :number                         = 0;
        /** The current height of the canvas. */
        private     canvasHeight            :number                         = 0;

        /***************************************************************************************************************
        *   Constructs a new canvas system.
        ***************************************************************************************************************/
        public constructor()
        {
            // create
            this.canvas = document.createElement( "canvas" );

            // reference 3d rendering context
            this.canvasContext = this.canvas.getContext( "webgl" );

            // append to body
            document.body.appendChild( this.canvas );
        }

        /***************************************************************************************************************
        *   Updates the canvas dimensions according to current screen size.
        ***************************************************************************************************************/
        public updateDimensions() : void
        {
            // get inner window dimensions
            this.canvasWidth  = window.innerWidth;
            this.canvasHeight = window.innerHeight;

            // clip to minimum canvas dimensions
            if ( this.canvasWidth  < bz.SettingEngine.CANVAS_MIN_WIDTH  ) this.canvasWidth  = bz.SettingEngine.CANVAS_MIN_WIDTH;
            if ( this.canvasHeight < bz.SettingEngine.CANVAS_MIN_HEIGHT ) this.canvasHeight = bz.SettingEngine.CANVAS_MIN_HEIGHT;

            // assign new dimensions to canvas
            this.canvas.width  = this.canvasWidth;
            this.canvas.height = this.canvasHeight;

            bz.Debug.canvas.log( "Updated canvas dimensions to [" + this.canvasWidth + "x" + this.canvasHeight + "] " );
        }

        /***************************************************************************************************************
        *   Returns the current canvas width.
        *
        *   @return Current canvas width.
        ***************************************************************************************************************/
        public getWidth() : number
        {
            return this.canvasWidth;
        }

        /***************************************************************************************************************
        *   Returns the current canvas height.
        *
        *   @return Current canvas height.
        ***************************************************************************************************************/
        public getHeight() : number
        {
            return this.canvasHeight;
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
        *   @return The canvas 2d rendering context.
        ***************************************************************************************************************/
/*
        public getCanvasContext() : CanvasRenderingContext2D
        {
            return this.canvasContext;
        }
*/
    }

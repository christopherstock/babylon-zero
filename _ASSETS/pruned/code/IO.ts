
    /** ****************************************************************************************************************
    *   Offers additional Input/Output functionality.
    *******************************************************************************************************************/
    export class IO
    {
        /** ************************************************************************************************************
        *   Flips an image horizontally.
        *
        *   @param original      The image to flip horizontally.
        *   @param onLoadCallack The function to invoke when the target image is mirrored.
        *
        *   @return The newly created but not already loaded mirrored image.
        ***************************************************************************************************************/
        public static flipImageHorizontal( original:HTMLImageElement, onLoadCallack:()=>void ) : HTMLImageElement
        {
            const canvas:HTMLCanvasElement = document.createElement( 'canvas' );
            canvas.width  = original.width;
            canvas.height = original.height;

            const context:CanvasRenderingContext2D = canvas.getContext( '2d' );
            context.scale( -1, 1 );
            context.drawImage( original, -original.width, 0 );

            const target:HTMLImageElement = new Image();
            target.crossOrigin = 'anonymous';
            target.src = canvas.toDataURL();
            target.onload = ( event:Event ) : void => { onLoadCallack(); };

            return target;
        }

        /** ************************************************************************************************************
        *   Checks if the target device is a mac.
        *
        *   @return <code>true</code> if the target device is a mac.
        ***************************************************************************************************************/
        public static isMac() : boolean
        {
            return ( /iPad|iPhone|iPod/.test( navigator.userAgent ) );
        }
    }


    import * as bz from './de/mayflower/bz';

    ( global as any ).CANNON = require( 'cannon' );
    ( global as any ).OIMO   = require( 'oimo'   );
    ( global as any ).earcut = require( 'earcut' );

    /*******************************************************************************************************************
    *   Being invoked when the page is loaded completely.
    *******************************************************************************************************************/
    window.onload = () : void  =>
    {
        bz.Main.main();
    };

    /*******************************************************************************************************************
    *   Being invoked when the page is left.
    *******************************************************************************************************************/
    window.onunload = () : void  =>
    {
    };

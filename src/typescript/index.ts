import { WebApp } from './de/mayflower/bz/base/WebApp';
/*
( global as any ).BABYLON = require( 'babylonjs' );
( global as any ).CANNON  = require( 'cannon' );
( global as any ).earcut  = require( 'earcut' );
*/
/** ****************************************************************************************************************
*   Being invoked when the page is loaded completely.
*******************************************************************************************************************/
window.onload = () : void  =>
{
    const webApp :WebApp = new WebApp();
    webApp.start();
};

/** ****************************************************************************************************************
*   Being invoked when the page is left.
*******************************************************************************************************************/
window.onunload = () : void  =>
{
};

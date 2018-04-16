
    import * as BABYLON from 'babylonjs';
    import * as bz      from '..';

    /*****************************************************************************
    *   Specifies the initialization part of the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class MfgInit
    {
        /*****************************************************************************
        *   The WebGL canvas context.
        *****************************************************************************/
        public          static      canvas          :HTMLCanvasElement          = null;

        /*****************************************************************************
        *   The DIV containing the FPS information.
        *****************************************************************************/
        public          static      divFps          :HTMLDivElement             = null;

        /*****************************************************************************
        *   The WebGL canvas context.
        *****************************************************************************/
        public          static      engine          :BABYLON.Engine             = null;

        /*****************************************************************************
        *   Inits this app from scratch.
        *****************************************************************************/
        public static init()
        {
            bz.MfgDebug.init.log( "Acclaiming and setting title." );

            //acclaim and set document title
            bz.MfgDebug.major.log( bz.MfgSettings.TITLE );
            document.title = bz.MfgSettings.TITLE;




if ( 1 == 1 ) return;

            //reference canvas element and fps counter div
            MfgInit.canvas = <HTMLCanvasElement>document.getElementById( "renderCanvas" );
            MfgInit.divFps = <HTMLDivElement>   document.getElementById( "fps"          );

            //setup canvas size
            MfgInit.canvas.width  = bz.MfgSettings.CANVAS_WIDTH;
            MfgInit.canvas.height = bz.MfgSettings.CANVAS_HEIGHT;

            //init Babylon.js engine
            bz.MfgDebug.init.log( "Initializing the BABYLON engine." );
            MfgInit.engine = new BABYLON.Engine( MfgInit.canvas, true );

            //add resize event listener
            window.addEventListener(
                "resize",
                function () {
                    MfgInit.engine.resize();
                }
            );

            bz.MfgDebug.init.log( "Displaying the loading UI" );
            bz.MfgInit.engine.displayLoadingUI();

            //create the scene
            bz.MfgDebug.init.log( "Creating the Scene" );
            bz.MfgScene.createScene();

            //init materials
            bz.MfgDebug.init.log( "Init all materials" );
            bz.MfgMaterial.initMaterials( bz.MfgScene.scene );

            //init sprite manager
            bz.MfgDebug.init.log( "Init the sprite manager" );
            bz.MfgSprite.init();

            //setup physics
            bz.MfgDebug.init.log( "Setup all physics" );
            bz.MfgScene.scene.enablePhysics( null, new BABYLON.OimoJSPlugin() );

            //setup the level
            bz.MfgDebug.init.log( "Setup the level" );
            bz.MfgGame.currentLevel = new bz.MfgLevelBunny();
        }

        /*****************************************************************************
        *   Being invoked when all items are initialized and loaded.
        *****************************************************************************/
        public static onInitCompleted()
        {
            bz.MfgDebug.init.log( "> onInitCompleted" );

            bz.MfgScene.scene.executeWhenReady
            (
                bz.MfgScene.initSceneCompleted
            );
        }
    }

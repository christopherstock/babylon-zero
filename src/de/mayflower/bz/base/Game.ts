
    import * as BABYLON from 'babylonjs';
    import * as bz      from '..';

    /*****************************************************************************
    *   Specifies the initialization part of the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    export class Game
    {
        /*****************************************************************************
        *   The WebGL canvas context.
        *****************************************************************************/
        public          static      canvas          :bz.CanvasSystem            = null;

        /*****************************************************************************
        *   The WebGL canvas context.
        *****************************************************************************/
        public          static      engine          :BABYLON.Engine             = null;

        /*****************************************************************************
        *   Inits this app from scratch.
        *****************************************************************************/
        public static init()
        {


            bz.Debug.init.log( "Creating game canvas" );
            Game.canvas = new bz.CanvasSystem();



            //setup canvas size
/*
            Game.canvas.width  = bz.SettingEngine.CANVAS_MIN_WIDTH;
            Game.canvas.height = bz.SettingEngine.CANVAS_MIN_HEIGHT;
*/


            //init Babylon.js engine
            bz.Debug.init.log( "Initializing the BABYLON engine." );
            Game.engine = new BABYLON.Engine( Game.canvas.getCanvas(), true );




            //add resize event listener
            window.addEventListener(
                "resize",
                function () {
                    Game.engine.resize();
                }
            );

            bz.Debug.init.log( "Displaying the loading UI" );
            bz.Game.engine.displayLoadingUI();

            //create the scene
            bz.Debug.init.log( "Creating the Scene" );
            bz.MfgScene.createScene();

            //init materials
            bz.Debug.init.log( "Init all materials" );
            bz.MfgMaterial.initMaterials( bz.MfgScene.scene );

            //init sprite manager
            bz.Debug.init.log( "Init the sprite manager" );
            bz.MfgSprite.init();



            //setup physics
            bz.Debug.init.log( "Setup all physics" );
            bz.MfgScene.scene.enablePhysics( null, new BABYLON.OimoJSPlugin() );



            //setup the level
            bz.Debug.init.log( "Setup the level" );
            bz.MfgGame.currentLevel = new bz.MfgLevelBunny();
        }

        /*****************************************************************************
        *   Being invoked when all items are initialized and loaded.
        *****************************************************************************/
        public static onInitCompleted()
        {
            bz.Debug.init.log( "> onInitCompleted" );

            bz.MfgScene.scene.executeWhenReady
            (
                bz.MfgScene.initSceneCompleted
            );
        }
    }

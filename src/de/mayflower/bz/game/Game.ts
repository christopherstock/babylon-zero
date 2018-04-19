
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

        public          static      currentLevel    :bz.Level                   = null;

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
            Game.canvas.updateDimensions();



            bz.Debug.init.log( "Initializing the babylon.JS engine." );
            Game.engine = new BABYLON.Engine( Game.canvas.getCanvas(), true );



            //add resize event listener
            window.addEventListener(
                "resize",
                function () {
                    Game.canvas.updateDimensions();
                    Game.engine.resize();
                }
            );


            bz.Debug.init.log( "Displaying the loading UI" );
            bz.Game.engine.displayLoadingUI();

            //create the scene
            bz.Debug.init.log( "Creating the Scene" );
            bz.Scene.createScene();

            //init materials
            bz.Debug.init.log( "Init all materials" );
            bz.Material.initMaterials( bz.Scene.scene );

            //init sprite manager
            bz.Debug.init.log( "Init the sprite manager" );
            bz.Sprite.init();

            //setup physics
            bz.Debug.init.log( "Setup all physics" );
            bz.Scene.scene.enablePhysics( null, new BABYLON.OimoJSPlugin() );

            //setup the level
            bz.Debug.init.log( "Setup the level" );
            bz.Game.currentLevel = new bz.LevelBunny();
        }

        /*****************************************************************************
        *   Being invoked when all items are initialized and loaded.
        *****************************************************************************/
        public static onInitCompleted()
        {
            bz.Debug.init.log( "> onInitCompleted" );

            bz.Scene.scene.executeWhenReady
            (
                bz.Scene.initSceneCompleted
            );
        }

        /*****************************************************************************
        *   The render loop. This method is being invoked each tick.
        *****************************************************************************/
        public static render()
        {
            //render the scene if existent
            if ( bz.Scene.scene )
            {
                //render the scene
                bz.Scene.scene.render();

                //handle streams
                if ( bz.Scene.scene.useDelayedTextureLoading )
                {
                    let waiting = bz.Scene.scene.getWaitingItemsCount();
                    if ( waiting > 0 )
                    {
                        console.log( "Streaming items... " + waiting + " remaining");
                    }
                }
            }
        }
    }

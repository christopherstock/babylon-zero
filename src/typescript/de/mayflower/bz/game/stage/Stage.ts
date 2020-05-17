
    import * as bz from '../..';

    /** ****************************************************************************************************************
    *   Represents a custom stage set.
    *******************************************************************************************************************/
    export abstract class Stage
    {
        /** The scene that represents this stage. */
        protected           readonly        scene                   :bz.Scene                               = null;
        /** The canvas system this stage is displayed on. */
        protected           readonly        canvas                  :bz.CanvasSystem                        = null;

        /** Specifies the ambient color of the babylon.JS scene and is set as the emissive color of all faces. */
        protected           readonly        ambientColor            :BABYLON.Color3                         = null;
        /** The clear color of this stage is the background color of all mesh materials. */
        protected           readonly        clearColor              :BABYLON.Color4                         = null;
        /** The initial camera to set for this stage. */
        protected           readonly        initialCamera           :bz.CameraType                          = null;

        /** The player instance. */
        protected                           player                  :bz.Player                              = null;
        /** A collection of all walls in this stage. */
        protected                           walls                   :bz.Wall[]                              = [];
        /** A collection of all items in this stage. */
        protected                           items                   :bz.Item[]                              = [];
        /** A collection of all bots in this stage. */
        protected                           bots                    :bz.Bot[]                               = [];

        /** The game GUI. */
        protected                           gui                     :bz.GUI                                 = null;
        /** The camera system that manages all scene cameras. */
        protected                           cameraSystem            :bz.CameraSystem                        = null;

        /** The pointer system to use in this stage. */
        protected                           pointerSystem           :bz.PointerSystem                       = null;

        /** The skybox that surrounds the whole stage. */
        protected                           skybox                  :BABYLON.Mesh                           = null;
        /** A collection of all sprites that appear in this stage. */
        protected                           sprites                 :bz.Sprite[]                            = [];

        /** A collection of all lights that appear in this stage. */
        protected                           lights                  :BABYLON.Light[]                        = [];
        /** A collection of all shadowGenerators that appear in this stage. */
        protected                           shadowGenerators        :BABYLON.ShadowGenerator[]              = [];

        /** A collection of all bullet holes in this stage. */
        private             readonly        bulletHoles             :bz.BulletHole[]                        = [];
        /** A collection of all debug meshes in this stage. */
        private             readonly        debugMeshes             :BABYLON.Mesh[]                         = [];

        /** Indicates pause state. */
        private                             pause                   :boolean                                = false;

        /** ************************************************************************************************************
        *   Creates a new custom stage.
        *
        *   @param scene         The scene representing this stage.
        *   @param canvas        The canvas system this stage is displayed on.
        *
        *   @param ambientColor  Specifies the ambient color of the babylon.JS scene
        *                        and is set as the emissive color of all faces.
        *   @param clearColor    The clear color of the stage is the background color of the scene.
        *   @param initialCamera The initial camera for this stage.
        ***************************************************************************************************************/
        protected constructor
        (
            scene         :bz.Scene,
            canvas        :bz.CanvasSystem,

            ambientColor  :BABYLON.Color3,
            clearColor    :BABYLON.Color4,
            initialCamera :bz.CameraType
        )
        {
            this.scene         = scene;
            this.canvas        = canvas;

            this.ambientColor  = ambientColor;
            this.clearColor    = clearColor;
            this.initialCamera = initialCamera;
        }

        /** ************************************************************************************************************
        *   Sets up the player for this stage.
        *
        *   @return The player instance for this stage.
        ***************************************************************************************************************/
        protected abstract createPlayer() : bz.Player;

        /** ************************************************************************************************************
        *   Creates the camera system that manages all cameras that appear in this level.
        *
        *   @return The camera system for this stage.
        ***************************************************************************************************************/
        protected abstract createCameraSystem() : bz.CameraSystem;

        /** ************************************************************************************************************
        *   Handles level specific keys.
        *
        *   @param keySystem The key system to use for key determination.
        ***************************************************************************************************************/
        protected abstract handleLevelKeys( keySystem:bz.KeySystem ) : void;

        /** ************************************************************************************************************
        *   Creates and returns all walls this stage consists of.
        *
        *   @return All walls of this stage.
        ***************************************************************************************************************/
        protected abstract createWalls() : bz.Wall[];

        /** ************************************************************************************************************
        *   Creates and returns all items this stage consists of.
        *
        *   @return All items of this stage.
        ***************************************************************************************************************/
        protected abstract createItems() : bz.Item[];

        /** ************************************************************************************************************
        *   Creates and returns all bots this stage consists of.
        *
        *   @return All bots of this stage.
        ***************************************************************************************************************/
        protected abstract createBots() : bz.Bot[];

        /** ************************************************************************************************************
        *   Sets up the skybox.
        *
        *   @return The created skybox for this stage.
        ***************************************************************************************************************/
        protected abstract createSkybox() : BABYLON.Mesh;

        /** ************************************************************************************************************
        *   Creates all sprites that appear in the stage.
        *
        *   @return All sprites that appear in this stage.
        ***************************************************************************************************************/
        protected abstract createSprites() : bz.Sprite[];

        /** ************************************************************************************************************
        *   Creates all lights that appear in this level.
        *
        *   @return All lights that appear in this stage.
        ***************************************************************************************************************/
        protected abstract createLights() : BABYLON.Light[];

        /** ************************************************************************************************************
        *   Creates all shadow generators that appear in this level.
        *
        *   @return All shadow generators that appear in this stage.
        ***************************************************************************************************************/
        protected abstract createShadowGenerators() : BABYLON.ShadowGenerator[];

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected abstract setupShadows() : void;

        /** ************************************************************************************************************
        *   Sets up fog for this stage.
        ***************************************************************************************************************/
        protected abstract setupFog() : void;

        /** ************************************************************************************************************
        *   Sets up the pointer system.
        *
        *   @return The pointer system to use in this stage.
        ***************************************************************************************************************/
        protected abstract createPointerSystem() : bz.PointerSystem;

        /** ************************************************************************************************************
        *   Creates the GUI for this stage.
        *
        *   @return The created GUI.
        ***************************************************************************************************************/
        protected abstract createGUI() : bz.GUI;

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected abstract onInitComplete() : void;

        /** ************************************************************************************************************
        *   Inits the stage.
        ***************************************************************************************************************/
        public init() : void
        {
            // set ambient color and scene bg color
            this.scene.getNativeScene().ambientColor = this.ambientColor;
            this.scene.getNativeScene().clearColor   = this.clearColor;

            // create all game objects
            this.player        = this.createPlayer();
            this.cameraSystem  = this.createCameraSystem();
            this.walls         = this.createWalls();
            this.items         = this.createItems();
            this.bots          = this.createBots();
            this.skybox        = this.createSkybox();
            this.sprites       = this.createSprites();
            this.gui           = this.createGUI();
            this.lights        = this.createLights();
            this.pointerSystem = this.createPointerSystem();

            // set camera system
            this.setActiveCamera( this.initialCamera );

            // create shadow generators
            if ( bz.SettingEngine.ENABLE_SHADOWS )
            {
                this.shadowGenerators = this.createShadowGenerators();
                this.setupShadows();
            }

            // enable fog if desired
            this.setupFog();

            // create debug axis
            if ( bz.SettingDebug.DEBUG_COORDINATE_AXIS_ENABLED )
            {
                this.createCoordinalAxis();
            }

            // adjust GUI size
            this.adjustGuiSizeToCanvasSize();

            // invoke init complete callback
            this.onInitComplete();
        }

        /** ************************************************************************************************************
        *   Adds a GUI effect to the effect queue.
        *
        *   @return The player instance.
        ***************************************************************************************************************/
        public addGuiFx( type:bz.GUIFxType ) : void
        {
            this.gui.addGuiFx( type );
        }

        /** ************************************************************************************************************
        *   Returns the player instance.
        *
        *   @return The player instance.
        ***************************************************************************************************************/
        public getPlayer() : bz.Player
        {
            return this.player;
        }

        /** ************************************************************************************************************
        *   Returns the native babylon.JS scene.
        *
        *   @return The player instance.
        ***************************************************************************************************************/
        public getScene() : BABYLON.Scene
        {
            return this.scene.getNativeScene();
        }

        /** ************************************************************************************************************
        *   Returns this stage's camera system.
        *
        *   @return The camera system of this stage.
        ***************************************************************************************************************/
        public getCameraSystem() : bz.CameraSystem
        {
            return this.cameraSystem;
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // consider pause
            if ( !this.pause )
            {
                // handle level specific keys
                this.handleLevelKeys( bz.Main.game.getKeySystem() );

                // render player
                if ( this.player !== null )
                {
                    this.player.render();
                }

                // render walls
                for ( const wall of this.walls )
                {
                    wall.render();
                }

                // render items
                for ( const item of this.items )
                {
                    item.render();
                }
            }

            // render GUI
            this.gui.render( this.pause );
        }

        /** ************************************************************************************************************
        *   Disposes all babylon.JS resources of this level.
        ***************************************************************************************************************/
        public dispose() : void
        {
            // dispose player
            if ( this.player !== null )
            {
                this.player.dispose();
            }

            // dispose all walls
            for ( const wall of this.walls )
            {
                wall.dispose();
            }

            // dispose all items
            for ( const item of this.items )
            {
                item.dispose();
            }

            // dispose all bots
            for ( const bot of this.bots )
            {
                bot.dispose();
            }

            // dispose all bullet holes
            for ( const bulletHole of this.bulletHoles )
            {
                bulletHole.dispose();
            }

            // dispose all debug meshes
            for ( const debugLine of this.debugMeshes )
            {
                debugLine.dispose();
            }

            // dispose skybox
            if ( this.skybox !== null )
            {
                this.skybox.dispose();
            }

            // dispose sprites
            for ( const sprite of this.sprites )
            {
                sprite.dispose();
            }

            // dispose lights
            for ( const light of this.lights )
            {
                light.dispose();
            }

            // dispose shadow generators
            for ( const shadowGenerator of this.shadowGenerators )
            {
                shadowGenerator.dispose();
            }

            // dispose camera system
            this.cameraSystem.dispose();

            // dispose GUI
            this.gui.dispose();
        }

        /** ************************************************************************************************************
        *   Sets the active camera for this stage.
        ***************************************************************************************************************/
        public setActiveCamera( cameraId:bz.CameraType ) : void
        {
            this.cameraSystem.setActiveCamera
            (
                cameraId,
                this.player,
                this.gui
            );
        }

        /** ************************************************************************************************************
        *   Applies a shot onto the stage.
        *
        *   @param shot The shot to apply onto the stage.
        ***************************************************************************************************************/
        public applyShot( shot:bz.Shot ) : void
        {
            // add debug line
            if ( bz.SettingDebug.SHOW_SHOT_LINES_AND_COLLISIONS )
            {
                this.debugMeshes.push( shot.createDebugLine( this.scene.getNativeScene() ) );
            }

            // determine all hit points without hurting the game objects
            const hitPoints:bz.HitPoint[] = this.determineAllHitPoints( shot );
            bz.Debug.fire.log( ' Gathered [' + String( hitPoints.length ) + '] hit points' );

            // determine impact hit points
            const impactHitPoints:bz.HitPoint[] = Stage.determineImpactHitPoints( hitPoints, shot );

            // impact all hit points
            for ( const impactHitPoint of impactHitPoints )
            {
                const bulletHole:bz.BulletHole = impactHitPoint.causeImpact
                (
                    this.scene,
                    this.ambientColor,
                    shot.getDamage()
                );
                this.addBulletHole( bulletHole );
            }
        }

        /** ************************************************************************************************************
        *   Resizes fg and bg GUIs so they fit the current canvas size.
        ***************************************************************************************************************/
        public adjustGuiSizeToCanvasSize() : void
        {
            this.gui.updateSize
            (
                this.canvas.getWidth(),
                this.canvas.getHeight()
            );
        }

        /** ************************************************************************************************************
        *   Toggles the stage to the pause state or vice versa.
        ***************************************************************************************************************/
        public togglePause() : void
        {
            // toggle pause
            this.pause = !this.pause;

            bz.Debug.game.log( 'Toggle pause to [' + String( this.pause ) + ']');

            // stop or resume physics engine
            this.scene.enablePhysics( !this.pause );

            // propagate pause state to gui
            this.setGuiPause();

            // propagate pause state to all stage sprites
            this.setSpritePause();
        }

        /** ************************************************************************************************************
        *   Delivers the current selected index of the pause menu.
        *
        *   @return The current active pause menu index.
        ***************************************************************************************************************/
        public getPauseMenuIndex() : number
        {
            return this.gui.getPauseMenuIndex();
        }

        /** ************************************************************************************************************
        *   Sets the active index for the pause menu.
        *
        *   @param index The index of the pause menu item to set.
        ***************************************************************************************************************/
        public setPauseMenuIndex( index:number ) : void
        {
            this.gui.setPauseMenuIndex( index );
        }

        /** ************************************************************************************************************
        *   Sets up the coordinal axis lines. X Y and Z axes are aligned by the LEFT HAND RULE.
        *
        *   @return A collection of all meshes that build the coordinal axis lines.
        ***************************************************************************************************************/
        private createCoordinalAxis() : void
        {
            this.debugMeshes.push
            (
                // axis x
                bz.MeshFactory.createLine
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 0.0,  0.0, 0.0 ),
                    new BABYLON.Vector3( bz.SettingDebug.DEBUG_COORDINATE_AXIS_LENGTH, 0.0, 0.0 ),
                    bz.MeshPivotAnchor.LOWEST_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingColor.COLOR_RGBA_RED_OPAQUE
                ),

                // axis y
                bz.MeshFactory.createLine
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 0.0, 0.0,  0.0 ),
                    new BABYLON.Vector3( 0.0, bz.SettingDebug.DEBUG_COORDINATE_AXIS_LENGTH, 0.0 ),
                    bz.MeshPivotAnchor.LOWEST_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingColor.COLOR_RGBA_GREEN_OPAQUE
                ),

                // axis z
                bz.MeshFactory.createLine
                (
                    this.scene.getNativeScene(),
                    new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                    new BABYLON.Vector3( 0.0, 0.0, bz.SettingDebug.DEBUG_COORDINATE_AXIS_LENGTH ),
                    bz.MeshPivotAnchor.LOWEST_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingColor.COLOR_RGBA_BLUE_OPAQUE
                )
            );
        }

        /** ************************************************************************************************************
        *   Returns all hit points on all game objects of this stage on applying the specified shot.
        *   Game objects will not be damaged or hit by the shot!
        *
        *   @param shot The shot to apply onto all game objects of this stage.
        *
        *   @return All hit points this shot collides to.
        ***************************************************************************************************************/
        private determineAllHitPoints( shot:bz.Shot ) : bz.HitPoint[]
        {
            // collect all hitPoints
            let hitPoints:bz.HitPoint[] = [];

            // check collision with walls
            bz.Debug.fire.log( ' Checking shot collision with [' + String( this.walls.length ) + '] walls' );
            for ( const wall of this.walls )
            {
                hitPoints = hitPoints.concat( wall.determineHitPoints( shot ) );
            }

            return hitPoints;
        }

        /** ************************************************************************************************************
        *   Adds the specified bullet hole to the bullet hole stack.
        *   If the maximum number of bullet holes is reached, the oldest bullet hole will be disposed.
        *
        *   @param bulletHole The bullet hole to add to this stage.
        ***************************************************************************************************************/
        private addBulletHole( bulletHole:bz.BulletHole ) : void
        {
            if ( this.bulletHoles.length > bz.SettingEngine.MAX_BULLET_HOLES )
            {
                this.bulletHoles[ 0 ].dispose();
                this.bulletHoles.shift();
            }

            this.bulletHoles.push( bulletHole );
        }

        /** ************************************************************************************************************
        *   Alters the pause state for the GUI.
        ***************************************************************************************************************/
        private setGuiPause() : void
        {
            this.gui.setPauseGuiVisibility( this.pause );
        }

        /** ************************************************************************************************************
        *   Alters the pause state for all sprites.
        ***************************************************************************************************************/
        private setSpritePause() : void
        {
            for ( const sprite of this.sprites )
            {
                sprite.setPause( this.pause );
            }
        }

        /** ************************************************************************************************************
        *   Determines all hit points of the given array of hit points that will be impacted by the specified shot.
        *
        *   @param hitPoints All hit points that possibly collide with the shot.
        *   @param shot      The shot that caused all hit points.
        ***************************************************************************************************************/
        private static determineImpactHitPoints( hitPoints:bz.HitPoint[], shot:bz.Shot ) : bz.HitPoint[]
        {
            let impactHitPoints:bz.HitPoint[] = [];

            if ( shot.isWallBreaking() )
            {
                impactHitPoints = hitPoints;
            }
            else
            {
                const nearestHitPoint:bz.HitPoint = bz.HitPoint.determineNearestHitPoint( hitPoints );

                if ( nearestHitPoint !== null )
                {
                    impactHitPoints.push( nearestHitPoint );
                }
            }

            return impactHitPoints;
        }
    }

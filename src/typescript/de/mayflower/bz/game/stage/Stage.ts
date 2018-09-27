
    import * as bz      from '../..';
    import * as BABYLON from 'babylonjs';

    /** ****************************************************************************************************************
    *   Represents a custom stage set.
    *******************************************************************************************************************/
    export abstract class Stage
    {
        /** The reference to the babylon.JS Scene. */
        protected           readonly        scene                   :BABYLON.Scene                          = null;
        /** The ambient color of this stage is the emissive color of all mesh materials. */
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

        /** The skybox that surrounds the whole stage. */
        protected                           skybox                  :BABYLON.Mesh                           = null;
        /** A collection of all sprites that appear in this stage. */
        protected                           sprites                 :bz.Sprite[]                            = [];
        /** The game GUI. */
        protected                           gui                     :bz.GUI                                 = null;
        /** The camera system that manages all scene cameras. */
        protected                           cameraSystem            :bz.CameraSystem                        = null;
        /** A collection of all lights that appear in this stage. */
        protected                           lights                  :BABYLON.Light[]                        = [];
        /** A collection of all shadowGenerators that appear in this stage. */
        protected                           shadowGenerators        :BABYLON.ShadowGenerator[]              = [];

        /** A collection of all bullet holes in this stage. */
        private                             bulletHoles             :bz.BulletHole[]                        = [];
        /** A collection of all debug meshes in this stage. */
        private                             debugMeshes             :BABYLON.Mesh[]                         = [];

        /** ************************************************************************************************************
        *   Creates a new custom stage.
        *
        *   @param scene         The babylon.JS scene reference.
        *   @param ambientColor  The ambient color of the stage is the emissive color for all faces.
        *   @param clearColor    The clear color of the stage is the background color of the scene.
        *   @param initialCamera The initial camera for this stage.
        ***************************************************************************************************************/
        protected constructor
        (
            scene         :BABYLON.Scene,
            ambientColor  :BABYLON.Color3,
            clearColor    :BABYLON.Color4,
            initialCamera :bz.CameraType
        )
        {
            this.scene         = scene;
            this.ambientColor  = ambientColor;
            this.clearColor    = clearColor;
            this.initialCamera = initialCamera;
        }

        /** ************************************************************************************************************
        *   Inits the stage.
        ***************************************************************************************************************/
        public init() : void
        {
            this.scene.ambientColor = this.ambientColor;
            this.scene.clearColor   = this.clearColor;

            this.player             = this.createPlayer();

            if ( bz.SettingDebug.SHOW_COORDINATE_AXIS )
            {
                this.createCoordinalAxis();
            }

            this.walls        = this.createWalls();
            this.items        = this.createItems();
            this.bots         = this.createBots();
            this.skybox       = this.createSkybox();
            this.sprites      = this.createSprites();
            this.gui          = this.createGUI();
            this.cameraSystem = this.createCameraSystem();
            this.lights       = this.createLights();

            this.setActiveCamera( this.initialCamera );

            if ( bz.SettingEngine.ENABLE_SHADOWS )
            {
                this.shadowGenerators = this.createShadowGenerators();
                this.setupShadows();
            }

            this.adjustGuiSizeToCanvasSize();

            this.onInitComplete();
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
            // handle level specific keys
            this.handleLevelKeys();

            // render gui
            if ( this.gui != null )
            {
                this.gui.render();
            }

            // render player
            if ( this.player != null )
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

        /** ************************************************************************************************************
        *   Disposes all babylon.JS resources of this level.
        ***************************************************************************************************************/
        public dispose() : void
        {
            // dispose player
            if ( this.player != null )
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
            if ( this.skybox != null )
            {
                this.skybox.dispose();
            }
console.log('>> dispose sprites .. ' + this.sprites.length);
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
            if ( this.gui != null )
            {
                this.gui.dispose();
            }
        }

        /** ************************************************************************************************************
        *   Sets the active camera for this stage.
        ***************************************************************************************************************/
        public setActiveCamera( cameraId:bz.CameraType ) : void
        {
            this.cameraSystem.setActiveCamera
            (
                cameraId,
                bz.Main.game.engine.scene.getScene(),
                bz.Main.game.engine.canvas.getCanvas(),
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
                this.debugMeshes.push( shot.createDebugLine( this.scene ) );
            }

            // determine all hit points without hurting the game objects
            const hitPoints:bz.HitPoint[] = this.determineAllHitPoints( shot );
            bz.Debug.fire.log( ' Gathered [' + hitPoints.length + '] hit points' );

            // determine impact hit points
            const impactHitPoints:bz.HitPoint[] = this.determineImpactHitPoints( hitPoints, shot );

            // impact all hit points
            for ( const impactHitPoint of impactHitPoints )
            {
                const bulletHole:bz.BulletHole = impactHitPoint.causeImpact( this.ambientColor, shot.getDamage() );
                this.addBulletHole( bulletHole );
            }
        }

        /** ************************************************************************************************************
        *   Resizes fg and bg GUIs so they fit the current canvas size.
        ***************************************************************************************************************/
        public adjustGuiSizeToCanvasSize() : void
        {
            if ( this.gui != null )
            {
                this.gui.updateSize
                (
                    bz.Main.game.engine.canvas.getWidth(),
                    bz.Main.game.engine.canvas.getHeight()
                );
            }
        }

        /** ************************************************************************************************************
        *   Alters the pause state for the GUI.
        *
        *   @param pause The pause state to set for the GUI.
        ***************************************************************************************************************/
        public setGuiPause( pause:boolean ) : void
        {
            if ( this.gui != null )
            {
                this.gui.setPauseGuiVisibility( pause );
            }
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        ***************************************************************************************************************/
        protected abstract handleLevelKeys() : void;

        /** ************************************************************************************************************
        *   Sets up the player for this stage.
        *
        *   @return The player instance for this stage.
        ***************************************************************************************************************/
        protected abstract createPlayer() : bz.Player;

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
        protected abstract setupShadows() : void

        /** ************************************************************************************************************
        *   Creates the camera system that manages all cameras that appear in this level.
        *
        *   @return The camera system for this stage.
        ***************************************************************************************************************/
        protected abstract createCameraSystem() : bz.CameraSystem;

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
                    new BABYLON.Vector3( 0.0,  0.0, 0.0 ),
                    new BABYLON.Vector3( bz.SettingDebug.DEBUG_AXIS_LENGTH, 0.0, 0.0 ),
                    bz.MeshPivotAnchor.LOWEST_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingColor.COLOR_RGBA_RED_OPAQUE,
                    this.scene
                ),

                // axis y
                bz.MeshFactory.createLine
                (
                    new BABYLON.Vector3( 0.0, 0.0,  0.0 ),
                    new BABYLON.Vector3( 0.0, bz.SettingDebug.DEBUG_AXIS_LENGTH, 0.0 ),
                    bz.MeshPivotAnchor.LOWEST_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingColor.COLOR_RGBA_GREEN_OPAQUE,
                    this.scene
                ),

                // axis z
                bz.MeshFactory.createLine
                (
                    new BABYLON.Vector3( 0.0, 0.0, 0.0  ),
                    new BABYLON.Vector3( 0.0, 0.0, bz.SettingDebug.DEBUG_AXIS_LENGTH ),
                    bz.MeshPivotAnchor.LOWEST_XYZ,
                    new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                    bz.SettingColor.COLOR_RGBA_BLUE_OPAQUE,
                    this.scene
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
            bz.Debug.fire.log( ' Checking shot collision with [' + this.walls.length + '] walls' );
            for ( const wall of this.walls )
            {
                hitPoints = hitPoints.concat( wall.determineHitPoints( shot ) );
            }

            return hitPoints;
        }

        /** ************************************************************************************************************
        *   Determines all hit points of the given array of hit points that will be impacted by the specified shot.
        *
        *   @param hitPoints All hit points that possibly collide with the shot.
        *   @param shot      The shot that caused all hit points.
        ***************************************************************************************************************/
        private determineImpactHitPoints( hitPoints:bz.HitPoint[], shot:bz.Shot ) : bz.HitPoint[]
        {
            let impactHitPoints:bz.HitPoint[] = [];

            if ( shot.isWallBreaking() )
            {
                impactHitPoints = hitPoints;
            }
            else
            {
                const nearestHitPoint:bz.HitPoint = bz.HitPoint.determineNearestHitPoint( hitPoints );

                if ( nearestHitPoint != null )
                {
                    impactHitPoints.push( nearestHitPoint );
                }
            }

            return impactHitPoints;
        }

        /** ************************************************************************************************************
        *   Adds the specified bullet hole to the bullet hole stack.
        *   If the maximum number of bullet holes is reached, the oldest bullet hole will be disposed.
        *
        *   @param bulletHole The bullet hole to add to this stage.
        ***************************************************************************************************************/
        private addBulletHole( bulletHole:bz.BulletHole ) : void
        {
            if ( this.bulletHoles.length > bz.SettingResource.MAX_BULLET_HOLES )
            {
                this.bulletHoles[ 0 ].dispose();
                this.bulletHoles.shift();
            }

            this.bulletHoles.push( bulletHole );
        }
    }

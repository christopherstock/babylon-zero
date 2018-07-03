
    import * as bz from '../../..';

    /** ****************************************************************************************************************
    *   The 'intro logo' stage offers an exploration of a 3D model that can be viewed from all angles.
    *******************************************************************************************************************/
    export class IntroLogo extends bz.Stage
    {
        /** Rotation speed in degrees per tick. */
        private     static  readonly    ROTATION_SPEED          :number                     = 1.75;

        /** Referenced imported logo. */
        protected                       logo                    :bz.Model                   = null;
        /** Referenced point light. */
        private                         pointLight              :BABYLON.PointLight         = null;
        /** Current logo rotation Y. */
        private                         rotY                    :number                     = 0.0;
        /** Notifies current frame. */
        private                         currentTick             :number                     = 0;

        /** ************************************************************************************************************
        *   Creates a new product viewer stage.
        *
        *   @param scene The babylon.JS scene reference.
        ***************************************************************************************************************/
        public constructor( scene:BABYLON.Scene )
        {
            super
            (
                scene,
                bz.SettingColor.COLOR_RGB_BLACK,
                bz.SettingColor.COLOR_RGBA_BLACK_OPAQUE
            );

            this.rotY = 270.0;
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // invoke parent method
            super.render();

            // rotate logo
            for ( const mesh of this.logo.getMeshes() )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ
                (
                    mesh,
                    270.0,
                    this.rotY,
                    90.0
                );
            }

            // increase logo rotation
            this.rotY += IntroLogo.ROTATION_SPEED;

            // alter the light intensity
            ++this.currentTick;

            if ( this.currentTick < 100 )
            {
                this.pointLight.range += 1.0;
                if ( this.pointLight.range > 50.0 ) this.pointLight.range = 50.0;
            }
            else if ( this.currentTick < 150 )
            {
                this.pointLight.range += 1.5;
                if ( this.pointLight.range > 100.0 ) this.pointLight.range = 100.0;
            }
            else if ( this.currentTick < 360 )
            {
            }
            else
            {
                this.pointLight.range -= 1.5;
                if ( this.pointLight.range < 0.0 ) this.pointLight.range = 0.0;
            }
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        ***************************************************************************************************************/
        public handleLevelKeys() : void
        {
        }

        /** ************************************************************************************************************
        *   Sets up the player for this stage.
        *
        *   @return The player instance for this stage.
        ***************************************************************************************************************/
        protected createPlayer() : bz.Player
        {
            return null;
        }

        /** ************************************************************************************************************
        *   Creates and returns all walls this stage consists of.
        *
        *   @return All walls of this stage.
        ***************************************************************************************************************/
        protected createWalls() : bz.Wall[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates and returns all movables this stage consists of.
        *
        *   @return All movables of this stage.
        ***************************************************************************************************************/
        protected createMovables() : bz.Movable[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates and returns all items this stage consists of.
        *
        *   @return All items of this stage.
        ***************************************************************************************************************/
        protected createItems() : bz.Item[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates and returns all bots this stage consists of.
        *
        *   @return All bots of this stage.
        ***************************************************************************************************************/
        protected createBots() : bz.Bot[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates and returns all imported models this stage consists of.
        *
        *   @return All imported models of this stage.
        ***************************************************************************************************************/
        protected createImportedMeshes() : bz.Model[]
        {
            this.logo = bz.MeshFactory.createImportedMesh
            (
                bz.ModelFile.MF_LOGO,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.MeshPivotAnchor.CENTER_XYZ,
                this.scene
            );

            return [ this.logo ];
        }

        /** ************************************************************************************************************
        *   Sets up the skybox.
        *
        *   @return The created skybox for this stage.
        ***************************************************************************************************************/
        protected createSkybox() : BABYLON.Mesh
        {
            return null;
        }

        /** ************************************************************************************************************
        *   Creates all sprites that appear in the stage.
        *
        *   @return All sprites that appear in this stage.
        ***************************************************************************************************************/
        protected createSprites() : BABYLON.Sprite[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Creates all lights that appear in this level.
        *
        *   @return All lights that appear in this stage.
        ***************************************************************************************************************/
        protected createLights() : BABYLON.Light[]
        {
            this.pointLight = bz.LightFactory.createPoint
            (
                this.scene,
                new BABYLON.Vector3( 50.0, 0.0, 0.0 ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                0.0,
                2.5,
                true
            );

            return [ this.pointLight ];
        }

        /** ************************************************************************************************************
        *   Creates all shadow generators that appear in this level.
        *
        *   @return All shadow generators that appear in this stage.
        ***************************************************************************************************************/
        protected createShadowGenerators() : BABYLON.ShadowGenerator[]
        {
            return [];
        }

        /** ************************************************************************************************************
        *   Sets up shadows for all meshes.
        ***************************************************************************************************************/
        protected setupShadows() : void
        {
        }

        /** ************************************************************************************************************
        *   Creates the camera system that manages all cameras that appear in this level.
        *
        *   @return The camera system for this stage.
        ***************************************************************************************************************/
        protected createCameraSystem() : bz.CameraSystem
        {
            return new bz.CameraSystem
            (
                this.scene,
                this.player,
                bz.Main.game.engine.canvas.getCanvas(),

                new BABYLON.Vector3( 0.0,   0.0, 0.0 ),
                new BABYLON.Vector3( 150.0, 0.0, 0.0 ),
                new BABYLON.Vector3( 0.0,   0.0, 0.0 ),

                new BABYLON.Vector3( 0.0,   0.0, 0.0  ),
                null,
                null,

                bz.CameraType.STATIONARY
            );
        }

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected onInitComplete() : void
        {
        }

        /** ************************************************************************************************************
        *   Creates the HUD for this stage.
        ***************************************************************************************************************/
        protected createHUD() : void
        {
        }
    }

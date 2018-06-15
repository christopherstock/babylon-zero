
    import * as bz          from '../..';
    import * as BABYLON     from 'babylonjs';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   All possible states concerning the helmet animation.
    *******************************************************************************************************************/
    enum HelmetState
    {
        /** The Helmet is closed and no animation is running. */
        CLOSED,
        /** The Helmet is opening and an animation is running. */
        OPENING,
        /** The Helmet is open and no animation is running. */
        OPEN,
        /** The Helmet is closing and an animation is running. */
        CLOSING,
    }

    /** ****************************************************************************************************************
    *   The 'product viewer' stage offers an exploration of a 3D model that can be viewed from all angles.
    *******************************************************************************************************************/
    export class ProductConfigurator extends bz.Stage
    {
        /** The colors for the visor. */
        private     static  readonly    VISOR_COLORS            :BABYLON.Color3[]           =
        [
            new BABYLON.Color3( 0.9647, 0.8235, 0.4392  ),
            new BABYLON.Color3( 1.0,    1.0,    1.0     ),
            new BABYLON.Color3( 0.85,   0.4,    0.0     ),
            new BABYLON.Color3( 0.8,    0.15,   0.15    ),
        ];
        /** The color names for the visor. */
        private     static  readonly    VISOR_COLOR_NAMES       :string[]                   =
        [
            'Pearl Beige',
            'Pepper White',
            'Peach Melba',
            'Rosso Corallo',
        ];

        /** The bg color for the GUI. */
        private     static  readonly    GUI_COLOR_BG            :string                     = 'rgba( 75, 75, 75, 0.5 )';
        /** The text color for the GUI. */
        private     static  readonly    GUI_COLOR_TEXT          :string                     = '#ffffff';
        /** The border color for the GUI. */
        private     static  readonly    GUI_COLOR_BORDER        :string                     = '#c9c9c9';

        /** Referenced imported helmet. */
        private                         helmet                  :BABYLON.AbstractMesh[]     = null;
        /** Referenced visir of the helmet. */
        private                         visir                   :BABYLON.AbstractMesh       = null;
        /** All checkboxes that change the visor color. */
        private                         visorColorCheckboxes    :BABYLON_GUI.Checkbox[]     = [];
        /** The textfield with the visir color name. */
        private                         visorColorName          :BABYLON_GUI.TextBlock      = null;

        /** Referenced product presentation light. */
        private                         presentationLight       :BABYLON.Light              = null;
        /** Flags if the helmet animation is currently running. */
        private                         animationState          :HelmetState                = HelmetState.CLOSED;

        /** ************************************************************************************************************
        *   Creates a new product viewer stage.
        *
        *   @param scene The babylon.JS scene reference.
        ***************************************************************************************************************/
        public constructor( scene:BABYLON.Scene )
        {
            super
            (
                bz.SettingGame.COLOR_GREY_QUARTER,
                scene
            );
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // invoke parent method
            super.render();

            // rotate logo
            for ( const mesh of this.helmet )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ
                (
                    mesh,
                    0.0,
                    0.0,
                    0.0
                );
            }
        }

        /** ************************************************************************************************************
        *   Handles level specific keys.
        ***************************************************************************************************************/
        public handleLevelKeys() : void
        {
            if ( bz.Main.game.engine.keySystem.isPressed( bz.KeyCodes.KEY_ENTER ) )
            {
                bz.Main.game.engine.keySystem.setNeedsRelease( bz.KeyCodes.KEY_ENTER );

                this.requestVisirAnimationToggle();
            }
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
        *   Creates and returns all imported meshes this stage consists of.
        *
        *   @return All imported meshes of this stage.
        ***************************************************************************************************************/
        protected createImportedMeshes() : BABYLON.AbstractMesh[][]
        {
            bz.Debug.stage.log( 'Importing stage meshes' );

            this.helmet = bz.MeshFactory.createImportedMesh
            (
                bz.MeshImport.HELMET,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                this.scene
            );

            // reference visir
            this.visir = this.helmet[ this.helmet.length - 1 ];

            return [ this.helmet ];
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
            this.presentationLight = bz.LightFactory.createDirectional
            (
                this.scene,
                new BABYLON.Vector3( 0.0, 0.0, 1.0 ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                1.0,
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                new BABYLON.Color3( 1.0, 1.0, 1.0 ),
                true
            );

            // stick light to arc rotate camera
            this.cameraSystem.setLightToArcRotationCamera( this.presentationLight );

            return [ this.presentationLight ];
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
                new BABYLON.Vector3( 250.0, 0.0, 0.0 ),
                new BABYLON.Vector3( 0.0,   0.0, 0.0 ),

                new BABYLON.Vector3( 0.0,   0.0, 0.0  ),
                null,
                null,

                bz.CameraType.ARC_ROTATE
            );
        }

        /** ************************************************************************************************************
        *   Creates the GUIs for this stage.
        ***************************************************************************************************************/
        protected createGuis() : void
        {
            this.guiFg = bz.GuiFactory.createGUI( bz.Main.game.engine.scene.getScene(), true );

            const rectangle:BABYLON_GUI.Rectangle = bz.GuiFactory.createRectangle
            (
                25,
                25,
                300,
                500,
                ProductConfigurator.GUI_COLOR_BORDER,
                ProductConfigurator.GUI_COLOR_BG
            );
            this.guiFg.addControl( rectangle );

            const logo:BABYLON_GUI.Image = bz.GuiFactory.createImage
            (
                'mfLogo.png',
                50,
                50
            );
            this.guiFg.addControl( logo );

            const titleLine1:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                '3D Product',
                ProductConfigurator.GUI_COLOR_TEXT,
                160,
                50,
                250,
                25
            );
            this.guiFg.addControl( titleLine1 );
            const titleLine2:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'Configurator',
                ProductConfigurator.GUI_COLOR_TEXT,
                160,
                80,
                250,
                25
            );
            this.guiFg.addControl( titleLine2 );
            const titleLine3:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'v.1.0.0, MVP',
                ProductConfigurator.GUI_COLOR_TEXT,
                160,
                110,
                250,
                25
            );
            this.guiFg.addControl( titleLine3 );

            const line:BABYLON_GUI.Line = bz.GuiFactory.createLine
            (
                50,
                160,
                300,
                160,
                1,
                'white'
            );
            this.guiFg.addControl( line );
/*
            const button:BABYLON_GUI.Button = bz.GuiFactory.createButton
            (
                'Open Visor',
                'white',
                'red',
                50,
                135,
                150,
                35,
                () => { bz.Debug.gui.log( 'Button clicked' ); }
            );
            this.guiFg.addControl( button );
*/
            const textColorChoserVisor:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'Color Visor',
                ProductConfigurator.GUI_COLOR_TEXT,
                50,
                250,
                300,
                25
            );
            this.guiFg.addControl( textColorChoserVisor );

            for ( let i:number = 0; i < ProductConfigurator.VISOR_COLORS.length; ++i )
            {
                const visorColor:BABYLON.Color3 = ProductConfigurator.VISOR_COLORS[ i ];
                const checkbox:BABYLON_GUI.Checkbox = bz.GuiFactory.createCheckbox
                (
                    ( i === 0 ),
                    'rgb( '
                    + ( visorColor.r * 255 )
                    + ', '
                    + ( visorColor.g * 255 )
                    + ', '
                    + ( visorColor.b * 255 )
                    + ' )',
                    50 + i * 30,
                    277,
                    20,
                    20,
                    () => {
                        bz.Debug.gui.log( 'Checkbox clicked' );
                        this.clickVisorColorCheckbox( i );
                    }
                );
                this.visorColorCheckboxes.push( checkbox );
                this.guiFg.addControl( checkbox );
            }

            this.visorColorName = bz.GuiFactory.createTextBlock
            (
                ProductConfigurator.VISOR_COLOR_NAMES[ 0 ],
                ProductConfigurator.GUI_COLOR_TEXT,
                50,
                300,
                300,
                25
            );
            this.guiFg.addControl( this.visorColorName );
/*
            const textColorChoserHelmet:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'Color helmet',
                ProductConfigurator.GUI_COLOR_TEXT,
                75,
                245,
                250,
                25
            );
            this.guiFg.addControl( textColorChoserHelmet );

            const textCameraZoom:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'Zoom',
                ProductConfigurator.GUI_COLOR_TEXT,
                50,
                280,
                250,
                25
            );
            this.guiFg.addControl( textCameraZoom );

            const slider:BABYLON_GUI.Slider = bz.GuiFactory.createSlider
            (
                0,
                0,
                100,
                'green',
                '#777777',
                100,
                280,
                200,
                20,
                ( value:number ) => { bz.Debug.gui.log( 'slider changed to [' + value + ']' ); }
            );
            this.guiFg.addControl( slider );
*/
        }

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected onInitComplete() : void
        {
        }

        /** ************************************************************************************************************
        *   Requests a toggle of the animation phase for the visir.
        *   May not be performed if an animation is currently running.
        ***************************************************************************************************************/
        private requestVisirAnimationToggle() : void
        {
            switch ( this.animationState )
            {
                case HelmetState.CLOSED:
                {
                    this.animationState = HelmetState.OPENING;

                    bz.Main.game.engine.scene.getScene().beginAnimation(
                        this.visir, 0, 20, false, 1.0, () => {

                            this.animationState = HelmetState.OPEN;

                            bz.Main.game.engine.scene.getScene().beginAnimation(
                                this.visir, 20, 21, true, 1.0, () => { }
                            );
                        }
                    );
                    break;
                }

                case HelmetState.OPEN:
                {
                    this.animationState = HelmetState.CLOSING;

                    bz.Main.game.engine.scene.getScene().beginAnimation(
                        this.visir, 20, 0, false, 1.0, () => {
                            this.animationState = HelmetState.CLOSED;
                        }
                    );
                    break;
                }

                case HelmetState.OPENING:
                case HelmetState.CLOSING:
                {
                    // do nothing if an animation is currently running.
                    break;
                }
            }
        }

        /** ************************************************************************************************************
        *   Changes the visir color.
        *
        *   @param color The color to set as the visor color.
        ***************************************************************************************************************/
        private requestVisorColorChange( color:BABYLON.Color3 ) : void
        {
            const visirMaterial:BABYLON.StandardMaterial = this.visir.material as BABYLON.StandardMaterial;

            visirMaterial.diffuseColor = color;
        }

        /** ************************************************************************************************************
        *   Being invoked when a visor color checkbox is clicked.
        *
        *   @param checkboxId The ID of the visir color checkbox being clicked.
        ***************************************************************************************************************/
        private clickVisorColorCheckbox( checkboxId:number ) : void
        {
            bz.Debug.gui.log( 'Visor color change checkbox [' + checkboxId + ']' );

            // disable all other checkboxes
            for ( let i:number = 0; i < ProductConfigurator.VISOR_COLORS.length; ++i )
            {
                this.visorColorCheckboxes[ i ].isChecked = false;
            }

            // alter UI
            this.visorColorCheckboxes[ checkboxId ].isChecked = true;
            this.visorColorName.text = ProductConfigurator.VISOR_COLOR_NAMES[ checkboxId ];

            // change visor color
            this.requestVisorColorChange( ProductConfigurator.VISOR_COLORS[ checkboxId ] );
        }
    }

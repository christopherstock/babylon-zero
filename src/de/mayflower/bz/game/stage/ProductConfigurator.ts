
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
            'Giallo Granturismo',
            'Arancio Trionfale',
            'Rosso Corallo',
        ];

        /** The colors for the helmet. */
        private     static  readonly    HELMET_COLORS           :BABYLON.Color3[]           =
        [
            new BABYLON.Color3( 0.4392, 0.4392, 0.4392  ),
            new BABYLON.Color3( 0.65,   0.65,   0.65    ),
            new BABYLON.Color3( 1.0,    1.0,    1.0     ),
            new BABYLON.Color3( 0.33,   0.33,   0.33    ),
        ];
        /** The color names for the helmet. */
        private     static  readonly    HELMET_COLOR_NAMES      :string[]                   =
        [
            'Grigio Titanio',
            'Grigio Touring Metallic',
            'Bianco Eldorado',
            'Grigio Granito',
        ];

        /** The bg color for the GUI. */
        private     static  readonly    GUI_COLOR_BG            :string                     = 'rgba( 100, 100, 100, 0.5 )';
        /** The text color for the GUI. */
        private     static  readonly    GUI_COLOR_TEXT          :string                     = '#ffffff';
        /** The text shadow color for the GUI. */
        private     static  readonly    GUI_COLOR_SHADOW        :string                     = '#000000';
        /** The border color for the GUI. */
        private     static  readonly    GUI_COLOR_BORDER        :string                     = '#c9c9c9';

        /** Referenced imported helmet. */
        private                         model                   :BABYLON.AbstractMesh[]     = null;
        /** Referenced visir of the helmet. */
        private                         visor                   :BABYLON.AbstractMesh       = null;
        /** Referenced helmet of the helmet. */
        private                         helmet                  :BABYLON.AbstractMesh       = null;

        /** All checkboxes that change the visor color. */
        private                         visorColorCheckboxes    :BABYLON_GUI.Checkbox[]     = [];
        /** All checkboxes that change the helmet color. */
        private                         helmetColorCheckboxes   :BABYLON_GUI.Checkbox[]     = [];

        /** Referenced product presentation light. */
        private                         presentationLight       :BABYLON.Light              = null;
        /** Flags if the helmet animation is currently running. */
        private                         animationState          :HelmetState                = HelmetState.CLOSED;
        /** A reference to the toggle button to open and close the visor. */
        private                         visorToggleButton       :BABYLON_GUI.Button         = null;
        /** A reference to the camera zoom slider. */
        private                         cameraZoomSlider        :BABYLON_GUI.Slider         = null;

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
                bz.SettingGame.COLOR_GREY_QUARTER,
                new BABYLON.Color4( 0.95, 0.95, 0.95, 1.0 )
            );
        }

        /** ************************************************************************************************************
        *   Renders all stage concernings for one tick of the game loop.
        ***************************************************************************************************************/
        public render() : void
        {
            // invoke parent method
            super.render();
/*
            // rotate whole model
            for ( const mesh of this.model )
            {
                bz.MeshManipulation.setAbsoluteRotationXYZ
                (
                    mesh,
                    0.0,
                    0.0,
                    0.0
                );
            }
*/
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

            // import mesh model
            this.model = bz.MeshFactory.createImportedMesh
            (
                bz.MeshImport.HELMET,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                this.scene
            );

            // reference single meshes
            this.helmet = this.model[ 0 ];
            this.visor  = this.model[ 1 ];

            return [ this.model ];
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

            const rectangleOuter:BABYLON_GUI.Rectangle = bz.GuiFactory.createRectangle
            (
                22,
                22,
                306,
                646,
                ProductConfigurator.GUI_COLOR_BORDER,
                'transparent'
            );
            this.guiFg.addControl( rectangleOuter );

            const rectangleOuter2:BABYLON_GUI.Rectangle = bz.GuiFactory.createRectangle
            (
                23,
                23,
                304,
                644,
                ProductConfigurator.GUI_COLOR_BORDER,
                'transparent'
            );
            this.guiFg.addControl( rectangleOuter2 );

            const rectangleInner:BABYLON_GUI.Rectangle = bz.GuiFactory.createRectangle
            (
                25,
                25,
                300,
                640,
                ProductConfigurator.GUI_COLOR_BORDER,
                ProductConfigurator.GUI_COLOR_BG
            );
            this.guiFg.addControl( rectangleInner );

            const logo:BABYLON_GUI.Image = bz.GuiFactory.createImage
            (
                'mfLogo.png',
                50,
                50,
                ProductConfigurator.GUI_COLOR_SHADOW
            );
            this.guiFg.addControl( logo );

            const titleRow1:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                '3D Product',
                ProductConfigurator.GUI_COLOR_TEXT,
                ProductConfigurator.GUI_COLOR_SHADOW,
                160,
                50,
                250,
                25
            );
            this.guiFg.addControl( titleRow1 );
            const titleRow2:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'Configurator',
                ProductConfigurator.GUI_COLOR_TEXT,
                ProductConfigurator.GUI_COLOR_SHADOW,
                160,
                80,
                250,
                25
            );
            this.guiFg.addControl( titleRow2 );
            const titleRow3:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'v.0.4.1, MVP',
                ProductConfigurator.GUI_COLOR_TEXT,
                ProductConfigurator.GUI_COLOR_SHADOW,
                160,
                110,
                250,
                25
            );
            this.guiFg.addControl( titleRow3 );

            const line1:BABYLON_GUI.Line = bz.GuiFactory.createLine
            (
                50,
                160,
                300,
                160,
                1,
                'white',
                'transparent'
            );
            this.guiFg.addControl( line1 );

            const textColorChoserVisor:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'Color Visor',
                ProductConfigurator.GUI_COLOR_TEXT,
                ProductConfigurator.GUI_COLOR_SHADOW,
                50,
                170,
                300,
                25
            );
            this.guiFg.addControl( textColorChoserVisor );

            for ( let i:number = 0; i < ProductConfigurator.VISOR_COLORS.length; ++i )
            {
                const visorColor :BABYLON.Color3 = ProductConfigurator.VISOR_COLORS[ i ];
                const colorCss   :string         = (
                    'rgb( '
                    + ( visorColor.r * 255 )
                    + ', '
                    + ( visorColor.g * 255 )
                    + ', '
                    + ( visorColor.b * 255 )
                    + ' )'
                );
                const checkbox:BABYLON_GUI.Checkbox = bz.GuiFactory.createCheckbox
                (
                    ( i === 0 ),
                    colorCss,
                    50,
                    203 + ( i * 30 ),
                    20,
                    20,
                    () => {
                        bz.Debug.gui.log( 'Checkbox clicked' );
                        this.clickVisorColorCheckbox( i );
                    }
                );
                this.visorColorCheckboxes.push( checkbox );
                this.guiFg.addControl( checkbox );

                const colorCaption:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
                (
                    ProductConfigurator.VISOR_COLOR_NAMES[ i ],
                    colorCss,
                    ProductConfigurator.GUI_COLOR_SHADOW,
                    80,
                    203 + ( i * 30 ),
                    300,
                    20
                );
                this.guiFg.addControl( colorCaption );
            }

            const line2:BABYLON_GUI.Line = bz.GuiFactory.createLine
            (
                50,
                330,
                300,
                330,
                1,
                'white',
                'transparent'
            );
            this.guiFg.addControl( line2 );

            const textColorChoserHelmet:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'Color Helmet',
                ProductConfigurator.GUI_COLOR_TEXT,
                ProductConfigurator.GUI_COLOR_SHADOW,
                50,
                340,
                300,
                25
            );
            this.guiFg.addControl( textColorChoserHelmet );

            for ( let i:number = 0; i < ProductConfigurator.HELMET_COLORS.length; ++i )
            {
                const visorColor :BABYLON.Color3 = ProductConfigurator.HELMET_COLORS[ i ];
                const colorCss   :string         = (
                    'rgb( '
                    + ( visorColor.r * 255 )
                    + ', '
                    + ( visorColor.g * 255 )
                    + ', '
                    + ( visorColor.b * 255 )
                    + ' )'
                );
                const checkbox:BABYLON_GUI.Checkbox = bz.GuiFactory.createCheckbox
                (
                    ( i === 0 ),
                    colorCss,
                    50,
                    373 + ( i * 30 ),
                    20,
                    20,
                    () => {
                        bz.Debug.gui.log( 'Checkbox clicked' );
                        this.clickHelmetColorCheckbox( i );
                    }
                );
                this.helmetColorCheckboxes.push( checkbox );
                this.guiFg.addControl( checkbox );

                const colorCaption:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
                (
                    ProductConfigurator.HELMET_COLOR_NAMES[ i ],
                    colorCss,
                    ProductConfigurator.GUI_COLOR_SHADOW,
                    80,
                    373 + ( i * 30 ),
                    300,
                    20
                );
                this.guiFg.addControl( colorCaption );
            }

            const line3:BABYLON_GUI.Line = bz.GuiFactory.createLine
            (
                50,
                500,
                300,
                500,
                1,
                'white',
                'transparent'
            );
            this.guiFg.addControl( line3 );

            const textCameraZoom:BABYLON_GUI.TextBlock = bz.GuiFactory.createTextBlock
            (
                'Zoom',
                ProductConfigurator.GUI_COLOR_TEXT,
                ProductConfigurator.GUI_COLOR_SHADOW,
                50,
                510,
                250,
                25
            );
            this.guiFg.addControl( textCameraZoom );

            this.cameraZoomSlider = bz.GuiFactory.createSlider
            (
                100.0,
                100.0,
                400.0,
                '#ed7304',
                '#707070',
                50,
                545,
                250,
                20,
                ( value:number ) =>
                {
                    // bz.Debug.gui.log( 'slider changed to [' + value + ']' );

                    // this.getCameraSystem().arcRotateCamera.radius = ( 400.0 + 100.0 - Math.floor( value ) );
                    this.getCameraSystem().arcRotateCamera.radius = ( 400.0 + 100.0 - value );
                }
            );
            this.guiFg.addControl( this.cameraZoomSlider );

            const line4:BABYLON_GUI.Line = bz.GuiFactory.createLine
            (
                50,
                580,
                300,
                580,
                1,
                'white',
                'transparent'
            );
            this.guiFg.addControl( line4 );

            this.visorToggleButton = bz.GuiFactory.createButton
            (
                'Open Visor',
                'white',
                '#ed7304',
                50,
                600,
                250,
                35,
                () => {
                    this.requestVisirAnimationToggle();
                }
            );
            this.guiFg.addControl( this.visorToggleButton );
        }

        /** ************************************************************************************************************
        *   Being invoked when the stage setup is complete.
        ***************************************************************************************************************/
        protected onInitComplete() : void
        {
            this.cameraSystem.arcRotateCamera.onViewMatrixChangedObservable.add(
                () => {

                    this.cameraZoomSlider.value =
                    (
//                        400.0 + 100.0 - Math.floor( this.getCameraSystem().arcRotateCamera.radius )
                        400.0 + 100.0 - this.getCameraSystem().arcRotateCamera.radius
                    );


                }
            );
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
                    this.setVisorToggleButtonText( 'Close Visor' );

                    bz.Main.game.engine.scene.getScene().beginAnimation(
                        this.visor, 0, 20, false, 1.0, () => {

                            this.animationState = HelmetState.OPEN;

                            bz.Main.game.engine.scene.getScene().beginAnimation(
                                this.visor, 20, 21, true, 1.0, () => { }
                            );
                        }
                    );
                    break;
                }

                case HelmetState.OPEN:
                {
                    this.animationState = HelmetState.CLOSING;
                    this.setVisorToggleButtonText( 'Open Visor' );

                    bz.Main.game.engine.scene.getScene().beginAnimation(
                        this.visor, 20, 0, false, 1.0, () => {
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
        *   Sets a new caption for the button that toggles the visor.
        *
        *   @param newText The text to set as the button's caption.
        ***************************************************************************************************************/
        private setVisorToggleButtonText( newText: string ) : void
        {
            const textName  :string                = this.visorToggleButton.name + '_button';
            const textBlock :BABYLON.GUI.TextBlock = this.visorToggleButton.getChildByType
            (
                textName,
                'TextBlock'
            ) as BABYLON.GUI.TextBlock;

            textBlock.text = newText;
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

            // check selected checkbox
            this.visorColorCheckboxes[ checkboxId ].isChecked = true;

            // change visor color
            this.requestVisorColorChange( ProductConfigurator.VISOR_COLORS[ checkboxId ] );
        }

        /** ************************************************************************************************************
        *   Changes the visir color.
        *
        *   @param color The color to set as the visor color.
        ***************************************************************************************************************/
        private requestVisorColorChange( color:BABYLON.Color3 ) : void
        {
            const visorMaterial:BABYLON.StandardMaterial = this.visor.material as BABYLON.StandardMaterial;
            visorMaterial.diffuseColor = color;
        }

        /** ************************************************************************************************************
        *   Being invoked when a helmet color checkbox is clicked.
        *
        *   @param checkboxId The ID of the helmet color checkbox being clicked.
        ***************************************************************************************************************/
        private clickHelmetColorCheckbox( checkboxId:number ) : void
        {
            bz.Debug.gui.log( 'Helmet color change checkbox [' + checkboxId + ']' );

            // disable all other checkboxes
            for ( let i:number = 0; i < ProductConfigurator.HELMET_COLORS.length; ++i )
            {
                this.helmetColorCheckboxes[ i ].isChecked = false;
            }

            // check selected checkbox
            this.helmetColorCheckboxes[ checkboxId ].isChecked = true;

            // change helmet color
            this.requestHelmetColorChange( ProductConfigurator.HELMET_COLORS[ checkboxId ] );
        }

        /** ************************************************************************************************************
        *   Changes the helmet color.
        *
        *   @param color The color to set as the helmet color.
        ***************************************************************************************************************/
        private requestHelmetColorChange( color:BABYLON.Color3 ) : void
        {
            bz.Debug.pc.log( 'Change helmet color' );

            const helmetMultiMaterial:BABYLON.MultiMaterial = this.helmet.material as BABYLON.MultiMaterial;
            const subMaterials:BABYLON.Material[] = helmetMultiMaterial.subMaterials;

            bz.Debug.pc.log( 'Sub-Materials of helmet : [' + subMaterials.length + ']' );

            // pick 1st helmet submaterial for knight helmet
            const subMaterial:BABYLON.Material = subMaterials[ 0 ];
            const material:BABYLON.StandardMaterial = subMaterial as BABYLON.StandardMaterial;

            material.diffuseColor  = color;
        }
    }

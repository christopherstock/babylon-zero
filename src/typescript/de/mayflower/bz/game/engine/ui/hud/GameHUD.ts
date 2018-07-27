
    import * as bz          from '../../../..';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   Manages the Heads Up Display that contains all GUI elements for one game level.
    *******************************************************************************************************************/
    export class GameHUD extends bz.HUD
    {
        /** The width of the horizontal border for all HUD elements. */
        public      static  readonly        HUD_BORDER_X            :number                                 = 50.0;
        /** The height of the horizontal border for all HUD elements. */
        public      static  readonly        HUD_BORDER_Y            :number                                 = 50.0;

        /** The text block of the message queue . */
        protected                           messageQueue            :bz.HUDMessage[]                        = [];
        /** The FPS text block. */
        protected                           fpsText                 :BABYLON_GUI.TextBlock                  = null;
        /** The wearpon image. */
        protected                           wearponImage            :BABYLON_GUI.Image                      = null;
        /** The corsshair. */
        protected                           crosshair               :BABYLON_GUI.Image                      = null;

        /** ************************************************************************************************************
        *   Creates a new Heads Up Display for a game level.
        ***************************************************************************************************************/
        public constructor()
        {
            super();
        }

        /** ************************************************************************************************************
        *   Initializes the Heads Up Display for a game level.
        ***************************************************************************************************************/
        public init() : void
        {
            this.fpsText = bz.GuiFactory.createTextBlock
            (
                '',
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                -GameHUD.HUD_BORDER_X,
                GameHUD.HUD_BORDER_Y,
                250,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );
            this.guiFg.addControl( this.fpsText );

            this.wearponImage = bz.GuiFactory.createImage
            (
                'wearpon/autoShotgun.png',
                -GameHUD.HUD_BORDER_X,
                0,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
                null
            );
            this.guiFg.addControl( this.wearponImage );

            this.crosshair = bz.GuiFactory.createImage
            (
                'crosshair/default.png',
                0,
                0,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_CENTER,
                null
            );
            this.guiFg.addControl( this.crosshair );
        }

        /** ************************************************************************************************************
        *   Updates the HUD for the current game tick.
        ***************************************************************************************************************/
        public render() : void
        {
            // update and assign fps
            this.fpsText.text = bz.Main.game.engine.babylonEngine.getFps().toFixed( 2 ) + ' fps';

            // update all HUD messages
            for ( const hudMessage of this.messageQueue )
            {
                hudMessage.render();
            }

            // dispose all obsolete HUD messages
            for (let index:number = this.messageQueue.length - 1; index >= 0; --index )
            {
                if ( this.messageQueue[ index ].checkLifetimeOver() )
                {
                    this.messageQueue[ index ].dispose();
                    this.messageQueue.splice( index, 1 );




console.log( '>>>>> Message Queue Text length: ' + this.messageQueue.length );
                }
            }
        }

        /** ************************************************************************************************************
        *   Sets visibility for the first player view components.
        *
        *   @param visible If the first player view components should be visible or not.
        ***************************************************************************************************************/
        public setFirstPlayerViewComponentsVisibility( visible:boolean ) : void
        {
            this.wearponImage.isVisible = visible;
            this.crosshair.isVisible    = visible;
        }

        /** ************************************************************************************************************
        *   Adds a message to the message queue.
        *
        *   @param msg The message to add to the message queue.
        ***************************************************************************************************************/
        public addHudMessage( msg:string ) : void
        {
            this.messageQueue.push
            (
                new bz.HUDMessage
                (
                    this.guiFg,
                    msg,
                    ( -bz.GameHUD.HUD_BORDER_Y - ( this.messageQueue.length * 25 ) )
                )
            );
        }
    }

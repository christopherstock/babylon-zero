import * as bz          from '../..';
import * as BABYLON_GUI from 'babylonjs-gui';

/** ********************************************************************************************************************
*   Represents a Graphical User Interface that is displayed in the foreground of the screen.
***********************************************************************************************************************/
export class GUI
{
    /** The 'player' fullscreen gui lies on the lowest layer. */
    private             readonly        guiPlayer                   :BABYLON_GUI.AdvancedDynamicTexture     = null;
    /** The 'effects' fullscreen gui lies over the player GUI. */
    private             readonly        guiEffects                  :BABYLON_GUI.AdvancedDynamicTexture     = null;
    /** The 'messages' fullscreen gui lies over the effects GUI. */
    private             readonly        guiMessages                 :BABYLON_GUI.AdvancedDynamicTexture     = null;
    /** The 'pause' fullscreen gui lies over the messages GUI. */
    private             readonly        guiPause                    :BABYLON_GUI.AdvancedDynamicTexture     = null;

    /** The FPS text block. */
    private             readonly        fpsText                     :BABYLON_GUI.TextBlock                  = null;
    /** The manager for GUI messages. */
    private             readonly        messageManager              :bz.GUIMessageManager                   = null;
    /** The manager for GUI effects. */
    private             readonly        fxManager                   :bz.GUIFxManager                        = null;

    /** The pause GUI. */
    private             readonly        pauseGui                    :bz.GUIPause                            = null;

    /** The wearpon image. */
    private                             wearponImage                :BABYLON_GUI.Image                      = null;
    /** The corsshair. */
    private                             crosshair                   :BABYLON_GUI.Image                      = null;

    /** ****************************************************************************************************************
    *   Creates a new abstract Heads Up Display.
    *
    *   @param scene The scene to create this GUI for.
    *******************************************************************************************************************/
    public constructor( scene:BABYLON.Scene )
    {
        // create all native foreground GUI
        this.guiPlayer   = bz.GUIFactory.createGUI( scene, true );
        this.guiEffects  = bz.GUIFactory.createGUI( scene, true );
        this.guiMessages = bz.GUIFactory.createGUI( scene, true );
        this.guiPause    = bz.GUIFactory.createGUI( scene, true );

        // create pause GUI and initially hide it
        this.pauseGui = new bz.GUIPause( this.guiPause );
        this.pauseGui.setVisibility( false );

        // FPS text
        this.fpsText = bz.GUIFactory.createTextBlock
        (
            '',
            bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
            bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
            bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
            -bz.SettingGUI.GUI_BORDER_X,
            bz.SettingGUI.GUI_BORDER_Y,
            250,
            25,
            BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
            BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
            null
        );
        this.guiMessages.addControl( this.fpsText );
        if ( !bz.SettingDebug.SHOW_FPS )
        {
            this.fpsText.isVisible = false;
        }

        // create the message and fx managers
        this.messageManager = new bz.GUIMessageManager();
        this.fxManager      = new bz.GUIFxManager();
    }

    /** ****************************************************************************************************************
    *   Initializes the Heads Up Display for a game stage.
    *******************************************************************************************************************/
    public init() : void
    {
        this.wearponImage = bz.GUIFactory.createImage
        (
            'wearpon/autoShotgun.png',
            -bz.SettingGUI.GUI_BORDER_X,
            0,
            BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
            BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
            null
        );
        this.guiPlayer.addControl( this.wearponImage );

        this.crosshair = bz.GUIFactory.createImage
        (
            'crosshair/default.png',
            0,
            0,
            BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            BABYLON_GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            null
        );
        this.guiPlayer.addControl( this.crosshair );
    }

    /** ****************************************************************************************************************
    *   Sets visibility for the first player view components: wearponsImage and crosshair.
    *
    *   @param visible If the first player view components should be visible or not.
    *******************************************************************************************************************/
    public setFirstPlayerViewComponentsVisibility( visible:boolean ) : void
    {
        // change visibility for wearpon and crosshair
        this.wearponImage.isVisible = visible;
        this.crosshair.isVisible    = visible;
    }

    /** ****************************************************************************************************************
    *   Disposes all elements of this GUI.
    *******************************************************************************************************************/
    public dispose() : void
    {
        this.guiPlayer.dispose();
        this.guiEffects.dispose();
        this.guiMessages.dispose();
        this.guiPause.dispose();
    }

    /** ****************************************************************************************************************
    *   Updates the GUI information for the current game tick.
    *
    *   @param game      The parent game instance.
    *   @param pause     Specifies if the pause state is currently active.
    *   @param keySystem The key system to query.
    *******************************************************************************************************************/
    public render( game:bz.Game, pause:boolean, keySystem:bz.KeySystem ) : void
    {
        this.updateFps( game );

        if ( !pause )
        {
            this.messageManager.render();
            this.fxManager.render();
        }

        if ( pause )
        {
            this.pauseGui.render( game, keySystem );
        }
    }

    /** ****************************************************************************************************************
    *   Adds a message to the message queue.
    *
    *   @param msg The message to add to the message queue.
    *******************************************************************************************************************/
    public addGuiMessage( msg:string ) : void
    {
        this.messageManager.addGuiMessage( this.guiMessages, msg );
    }

    /** ****************************************************************************************************************
    *   Adds an effect to the fx queue.
    *
    *   @param type The type of GUI effect to add to the message queue.
    *******************************************************************************************************************/
    public addGuiFx( type:bz.GUIFxType ) : void
    {
        this.fxManager.addGuiFx( this.guiEffects, type );
    }

    /** ****************************************************************************************************************
    *   Shows or hides the pause GUI.
    *
    *   @param visible The visibility to set for the pause GUI.
    *******************************************************************************************************************/
    public setPauseGuiVisibility( visible:boolean ) : void
    {
        this.pauseGui.setVisibility( visible );
    }

    /** ****************************************************************************************************************
    *   Delivers the current selected index of the pause menu.
    *
    *   @return The current active pause menu index.
    *******************************************************************************************************************/
    public getPauseMenuIndex() : number
    {
        return this.pauseGui.getPauseMenuIndex();
    }

    /** ****************************************************************************************************************
    *   Sets the active index for the pause menu.
    *
    *   @param index The index of the pause menu item to set.
    *******************************************************************************************************************/
    public setPauseMenuIndex( index:number ) : void
    {
        this.pauseGui.setPauseMenuIndex( index );
    }

    /** ****************************************************************************************************************
    *   Zooms the GUI wearpon image by the specified ratio.
    *
    *   @param zoomRatio The current zoom factor - from 0.0 (no zoom) to 1.0 (max zoom).
    *******************************************************************************************************************/
    public zoomWearponImage( zoomRatio:number ) : void
    {
        this.wearponImage.scaleX = ( 1.0 + zoomRatio );
        this.wearponImage.scaleY = ( 1.0 + zoomRatio );
        this.wearponImage.left   = (
            -bz.SettingGUI.GUI_BORDER_X + ( zoomRatio * ( this.wearponImage.widthInPixels  / 2 ) )
        );
        this.wearponImage.top    = (
            -0.0                        + ( zoomRatio * ( this.wearponImage.heightInPixels / 2 ) )
        );
    }

    /** ****************************************************************************************************************
    *   Updates the Frames Per Second counter.
    *******************************************************************************************************************/
    private updateFps( game:bz.Game ) : void
    {
        // update and assign fps
        this.fpsText.text = game.getFps().toFixed( 2 ) + ' fps';
    }
}

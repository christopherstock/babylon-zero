
    import * as bz          from '../../index';
    import * as BABYLON     from 'babylonjs';
    import * as BABYLON_GUI from 'babylonjs-gui';

    /** ****************************************************************************************************************
    *   Creates all types of GUI components.
    *******************************************************************************************************************/
    export abstract class GuiFactory
    {
        /** Next ID to assign for GUI component creation. */
        private         static          currentGuiId                        :number                 = 0;

        /** ************************************************************************************************************
        *   Creates a fullscreen GUI in bg or fg.
        *
        *   @param scene      The scene that contains this light.
        *   @param foreground Specifies if this GUI shall be set in foreground of this scene.
        *                     <code>false</code> will put this GUI into the background.
        ***************************************************************************************************************/
        public static createGUI
        (
            scene      :BABYLON.Scene,
            foreground :boolean
        )
        : BABYLON_GUI.AdvancedDynamicTexture
        {
            const gui:BABYLON_GUI.AdvancedDynamicTexture = BABYLON_GUI.AdvancedDynamicTexture.CreateFullscreenUI
            (
                'gui' + bz.GuiFactory.currentGuiId++,
                foreground,
                scene,
                BABYLON.Texture.NEAREST_SAMPLINGMODE
            );

            gui.renderAtIdealSize = true;
            gui.useSmallestIdeal  = false;
            gui.renderScale       = 1.0;

            return gui;
        }
    }


    import * as BABYLON_GUI from 'babylonjs-gui';
    import * as bz from '../../../../..';

    /** ****************************************************************************************************************
    *   Represents one menu item shown in the GUI menu.
    *******************************************************************************************************************/
    export class GUIMenuItem
    {
        /** The label of this menu item. */
        private             readonly        label                       :string                         = null;
        /** The action to execute on performing this menu item. */
        private             readonly        action                      :bz.GUIAction                   = null;

        /** The text block that represents this menu item in the GUI. */
        private                             textBlock                   :BABYLON_GUI.TextBlock          = null;

        /** ************************************************************************************************************
        *   Creates a new menu item.
        *
        *   @param label  The caption for this menu item to display.
        *   @param action The GUI action to perform on executing this menu item.
        ***************************************************************************************************************/
        public constructor( label:string, action:bz.GUIAction )
        {
            this.label  = label;
            this.action = action;
        }

        /** ************************************************************************************************************
        *   Creates a text block for this menu item.
        *
        *   @param guiFg The GUI to append this menu item text block to.
        *   @param y     The position Y for this menu item's text block.
        ***************************************************************************************************************/
        public createTextBlock( guiFg:BABYLON_GUI.AdvancedDynamicTexture, y:number ) : void
        {
            this.textBlock = bz.GUIFactory.createTextBlock
            (
                this.label,
                bz.SettingGUI.GUI_FONT_SIZE_DEFAULT,
                bz.SettingColor.COLOR_CSS_WHITE_OPAQUE,
                bz.SettingColor.COLOR_CSS_BLACK_OPAQUE,
                0,
                y,
                500,
                25,
                BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
                BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP,
                null
            );

            guiFg.addControl( this.textBlock );
        }

        /** ************************************************************************************************************
        *   Shows or hides the pause GUI.
        *
        *   @param visible The visibility to set for the pause GUI.
        ***************************************************************************************************************/
        public setVisibility( visible:boolean ) : void
        {
            this.textBlock.isVisible = visible;
        }

        /** ************************************************************************************************************
        *   Selects this menu item and highlights the text block.
        ***************************************************************************************************************/
        public select() : void
        {
            this.textBlock.color = bz.SettingColor.COLOR_CSS_MAYFLOWER_ORANGE_OPAQUE;
        }

        /** ************************************************************************************************************
        *   Unselectes this menu item and blurs the text block.
        ***************************************************************************************************************/
        public unselect() : void
        {
            this.textBlock.color = bz.SettingColor.COLOR_CSS_WHITE_OPAQUE;
        }

        /** ************************************************************************************************************
        *   Performs this menu item's associated action.
        ***************************************************************************************************************/
        public perform() : void
        {
            switch ( this.action )
            {
                case bz.GUIAction.RESUME_GAME:
                {
                    bz.Main.game.stage.togglePause();
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_1:
                {
                    bz.Main.game.switchStage( bz.StageId.STAGE_TEST_OFFICE );
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_2:
                {
                    bz.Main.game.switchStage( bz.StageId.STAGE_TEST_LEVEL );
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_3:
                {
                    bz.Main.game.switchStage( bz.StageId.STAGE_ROOM_VIEWER );
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_4:
                {
                    bz.Main.game.switchStage( bz.StageId.STAGE_PRODUCT_CONFIGURATOR );
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_5:
                {
                    bz.Main.game.switchStage( bz.StageId.STAGE_INTRO_LOGO );
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_6:
                {
                    bz.Main.game.switchStage( bz.StageId.STAGE_HUMAN_BODY_PARTITIONS );
                    break;
                }
            }
        }
    }

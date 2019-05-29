
    import * as bz   from '../../../../..';
    import * as bjsg from 'babylonjs-gui';

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
        private                             textBlock                   :bjsg.TextBlock          = null;

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
        public createTextBlock( guiFg:bjsg.AdvancedDynamicTexture, y:number ) : void
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
                bjsg.Control.HORIZONTAL_ALIGNMENT_CENTER,
                bjsg.Control.VERTICAL_ALIGNMENT_TOP,
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
            const game:bz.Game = bz.Main.game;

            switch ( this.action )
            {
                case bz.GUIAction.RESUME_GAME:
                {
                    game.togglePause();
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_1:
                {
                    game.switchStage( bz.StageId.TEST_OFFICE );
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_2:
                {
                    game.switchStage( bz.StageId.TEST_LEVEL );
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_3:
                {
                    game.switchStage( bz.StageId.ROOM_VIEWER );
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_4:
                {
                    game.switchStage( bz.StageId.PRODUCT_CONFIGURATOR );
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_5:
                {
                    game.switchStage( bz.StageId.INTRO_LOGO );
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_6:
                {
                    game.switchStage( bz.StageId.HUMAN_BODY_PARTITIONS );
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_7:
                {
                    game.switchStage( bz.StageId.TEST_SITE );
                    break;
                }

                case bz.GUIAction.SWITCH_TO_STAGE_8:
                {
                    game.switchStage( bz.StageId.SPACESHIP );
                    break;
                }
            }
        }
    }

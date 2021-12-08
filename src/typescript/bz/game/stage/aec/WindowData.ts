import * as bz from '../../..';

/** ********************************************************************************************************************
*   Configuration set for a Window game object.
*
*   TODO move to package 'aec'.
***********************************************************************************************************************/
export class WindowData
{
    public position     :number  = 0.0;
    public fullHeight   :boolean = false;
    public nonBreakable :boolean = false;
    public width        :number  = 0.0;

    /** ****************************************************************************************************************
    *   Creates the data that describes one window.
    *
    *   @param position     The position of this window inside the wall.
    *   @param fullHeight   If <code>true</code>, the top and bottom window frames will not be drawn
    *                       and the window's height is extended to the wall height.
    *   @param nonBreakable If the glass is bullet proof and won't break.
    *   @param width        The width of this window.
    *******************************************************************************************************************/
    public constructor(
        position     :number,
        fullHeight   :boolean = false,
        nonBreakable :boolean = false,
        width        :number  = bz.SettingAEC.WINDOW_WIDTH_DEFAULT
    )
    {
        this.position     = position;
        this.fullHeight   = fullHeight;
        this.nonBreakable = nonBreakable;
        this.width        = width;
    }
}

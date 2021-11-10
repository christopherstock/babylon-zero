import * as bz from '../..';

/** ********************************************************************************************************************
*   The 'intro logo' stage offers an exploration of a 3D model that can be viewed from all angles.
***********************************************************************************************************************/
export class StageIntroLogo extends bz.Stage
{
    /** Rotation speed in degrees per tick. */
    private     static  readonly    ROTATION_SPEED          :number                     = 1.75;

    /** Referenced imported logo. */
    protected                       logo                    :bz.Wall                    = null;
    /** Referenced point light. */
    private                         pointLight              :BABYLON.PointLight         = null;
    /** Current logo rotation Y. */
    private                         logoRotY                :number                     = 270.0;
    /** Notifies current frame. */
    private                         currentTick             :number                     = 0;

    /** ****************************************************************************************************************
    *   Renders all stage concernings for one tick of the game loop.
    *******************************************************************************************************************/
    public render() : void
    {
        // invoke parent method
        super.render();

        // rotate logo
        this.logo.getModel().setAbsoluteRotationXYZ
        (
            270.0,
            this.logoRotY,
            90.0
        );

        // increase logo rotation
        this.logoRotY += StageIntroLogo.ROTATION_SPEED;

        // alter the light intensity
        ++this.currentTick;
/*
        // DEBUG bling bling ..
        if ( true )
        {
            this.pointLight.range = 100.0;

            return;
        }
*/
        if ( this.currentTick < 100 )
        {
            this.pointLight.range += 1.0;
            if ( this.pointLight.range > 50.0 )
            {
                this.pointLight.range = 50.0;
            }
        }
        else if ( this.currentTick < 150 )
        {
            this.pointLight.range += 1.5;
            if ( this.pointLight.range > 100.0 )
            {
                this.pointLight.range = 100.0;
            }
        }
        else if ( this.currentTick < 360 )
        {
            // do nothing but wait
        }
        else
        {
            this.pointLight.range -= 1.5;
            if ( this.pointLight.range < 0.0 ) {
                this.pointLight.range = 0.0;
            }
        }
    }

    /** ****************************************************************************************************************
    *   Creates the stage config that is applied on initializing this stage.
    *******************************************************************************************************************/
    protected createStageConfig() : bz.StageConfig
    {
        return new bz.StageConfig(
            bz.SettingColor.COLOR_RGB_BLACK,
            bz.SettingColor.COLOR_RGBA_BLACK_OPAQUE,
            bz.CameraType.STATIONARY
        );
    }

    /** ****************************************************************************************************************
    *   Creates all stage contents.
    *******************************************************************************************************************/
    protected createStageContents() : void
    {
        const meshFactory :bz.MeshFactory = new bz.MeshFactory( this.scene );

        // mayflower logo
        this.logo = new bz.Wall(
            this,
            meshFactory.createImportedModel
            (
                bz.ModelFile.MF_LOGO,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.PhysicSet.NONE,
                bz.ModelCompoundType.NONE
            )
        );

        this.addWall( this.logo );
/*
        // manipulate material colors for logo
        const material:BABYLON.StandardMaterial = this.logo.getMesh( 0 ).material as BABYLON.StandardMaterial;
        material.specularColor = new BABYLON.Color3( 0.949, 0.713, 0.498 );
*/
        this.pointLight = bz.LightFactory.createPoint
        (
            this.scene.getNativeScene(),
            new BABYLON.Vector3( 50.0, 0.0, 0.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            new BABYLON.Color3( 1.0, 1.0, 1.0 ),
            0.0,
            2.5,
            true
        );

        this.addLight( this.pointLight );
    }

    /** ****************************************************************************************************************
    *   Creates the camera system that manages all cameras that appear in this stage.
    *
    *   @return The camera system for this stage.
    *******************************************************************************************************************/
    protected createCameraSystem() : bz.CameraSystem
    {
        return new bz.CameraSystem
        (
            this.game,

            new BABYLON.Vector3( 0.0,   0.0, 0.0 ),
            new BABYLON.Vector3( 150.0, 0.0, 0.0 ),
            new BABYLON.Vector3( 0.0,   0.0, 0.0 ),

            new BABYLON.Vector3( 0.0,   0.0, 0.0 ),
            new BABYLON.Vector3( 0.0,   0.0, 0.0  ),
            null,
            null
        );
    }

    /** ****************************************************************************************************************
    *   Handles stage specific keys.
    *******************************************************************************************************************/
    protected handleStageKeys() : void
    {
        // no stage keys supported as this is a 'view only' stage
    }
}


    import * as bz from '../..';

    /*******************************************************************************************************************
    *   Specifies the 'test' level.
    *******************************************************************************************************************/
    export class LevelTest extends bz.Level
    {
        /** An example light. */
        private                             light1                          :BABYLON.DirectionalLight   = null;

        /***************************************************************************************************************
        *   Sets up the 'bunny' level.
        *
        *   @param scene The babylon.JS scene reference.
        ***************************************************************************************************************/
        constructor( scene:BABYLON.Scene )
        {
            super( scene );

            // this.setupLights();
            this.setupBoxes();

            this.createPlayer();

            this.setupSkybox();

            bz.Main.game.onInitLevelCompleted();
        }

        /***************************************************************************************************************
        *   Sets up all lights.
        ***************************************************************************************************************/
        private setupLights() : void
        {
            // setup lights
            this.light1           = new BABYLON.DirectionalLight
            (
                'dir01',
                new BABYLON.Vector3( 0.0, -1.0, 0.0 ),
                this.scene
            );
            this.light1.intensity = 1.0;
            this.light1.position  = new BABYLON.Vector3( 0.0, 0.0, 0.0 );
        }

        /***************************************************************************************************************
        *   Sets up the ground for the scene.
        ***************************************************************************************************************/
        private setupBoxes() : void
        {
            // static ground
            bz.MeshFactory.createBox
            (
                'Ground1',
                new BABYLON.Vector3( 0.0, -0.001, 0.0  ),
                bz.PivotAnchor.DEBUG_NONE,
                new BABYLON.Vector3( 40.0, 0.001,  40.0 ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Texture.TEST,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.STATIC, null ),
                1.0
            );

            // static elevated ground
            bz.MeshFactory.createBox
            (
                'Ground2',
                new BABYLON.Vector3( 0.0, -0.001, 0.0  ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 40.0, 0.001,  40.0 ),
                new BABYLON.Vector3( 0.0, 0.0, 160.0 ),
                bz.Texture.GRASS,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.STATIC, null ),
                1.0
            );

/*
            // static ground ( inoperative camera collisions when rotated ... )
            bz.MeshFactory.createPlane
            (
                'Ground1',
                new BABYLON.Vector3( 40.0, -0.001, 0.0  ),
                40.0,
                40.0,
                90.0,
                bz.MeshFactory.ROTATION_AXIS_X,
                bz.Texture.AMIGA,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.ACCORDING_TO_SIZE,
                null,
                this.scene,
                bz.Physics.STATIC
            );
*/
            // movable crate - small
            bz.MeshFactory.createBox
            (
                'Ground1',
                new BABYLON.Vector3( 10.0,  0.0, 10.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 1.0, 1.0, 1.0 ),
                new BABYLON.Vector3( 0.0, 45.0, 0.0 ),
                bz.Texture.WOOD,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.MOVABLE, bz.PhysicProps.LIGHT_WOOD ),
                1.0
            );

            // movable crate - big
            bz.MeshFactory.createBox
            (
                'Ground1',
                new BABYLON.Vector3( 10.0,  0.0, 7.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 2.0, 2.0, 2.0 ),
                new BABYLON.Vector3( 0.0, 30.0, 0.0 ),
                bz.Texture.WOOD,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.MOVABLE, bz.PhysicProps.LIGHT_WOOD ),
                1.0
            );

            // tree - standing (crossed)
            bz.MeshFactory.createPlane
            (
                'Tree1',
                new BABYLON.Vector3( 5.0,  0.0, 20.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                3.0,
                7.0,
                new BABYLON.Vector3( 0.0, 0.0, 0.0   ),
                bz.Texture.TREE,
                bz.TextureHasAlpha.YES,
                bz.TextureUV.ALL_TO_ONE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.STATIC, null ),
                1.0
            );
            bz.MeshFactory.createPlane
            (
                'Tree1',
                new BABYLON.Vector3( 6.5,  0.0, 18.5   ),
                bz.PivotAnchor.LOWEST_XYZ,
                3.0,
                7.0,
                new BABYLON.Vector3( 0.0, 270.0, 0.0   ),
                bz.Texture.TREE,
                bz.TextureHasAlpha.YES,
                bz.TextureUV.ALL_TO_ONE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.STATIC, null ),
                1.0
            );

            // movable crate - different UVs for all sides
            bz.MeshFactory.createBox
            (
                'Ground1',
                new BABYLON.Vector3( 12.0,  0.0, 24.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 1.0, 2.0, 3.0 ),
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                bz.Texture.TEST,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.MOVABLE, bz.PhysicProps.LIGHT_WOOD ),
                1.0
            );

            // plane - amiga, 1
            bz.MeshFactory.createPlane
            (
                'Amiga1',
                new BABYLON.Vector3( 0.0,  0.0, 0.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                2.0,
                4.0,
                new BABYLON.Vector3( 0.0, 45.0, 0.0   ),
                bz.Texture.AMIGA,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.STATIC, null ),
                1.0
            );

            // plane - amiga 2
            bz.MeshFactory.createPlane
            (
                'Amiga2',
                new BABYLON.Vector3( 15.0, 0.0, 6.0 ),
                bz.PivotAnchor.LOWEST_XYZ,
                7.0,
                7.0,
                new BABYLON.Vector3( 0.0, -45.0, 0.0 ),
                bz.Texture.AMIGA,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.STATIC, null ),
                1.0
            );

            // plane - amiga 3
            bz.MeshFactory.createPlane
            (
                'Amiga3',
                new BABYLON.Vector3( 20.0, 0.0, 11.0 ),
                bz.PivotAnchor.LOWEST_XYZ,
                7.0,
                7.0,
                new BABYLON.Vector3( 0.0, -90.0, 0.0 ),
                bz.Texture.AMIGA,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.STATIC, null ),
                1.0
            );

            // movable glass quader
            bz.MeshFactory.createBox
            (
                'Ground1',
                new BABYLON.Vector3( 2.0,  0.0, 2.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 1.0, 2.0, 3.0    ),
                new BABYLON.Vector3( 0.0,  45.0, 0.0   ),
                bz.Texture.GLASS,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.MOVABLE, bz.PhysicProps.LIGHT_WOOD ),
                0.5
            );

            // movable glass pane
            bz.MeshFactory.createPlane
            (
                'Ground1',
                new BABYLON.Vector3( 2.0,  0.0, 15.0   ),
                bz.PivotAnchor.LOWEST_XYZ,
                2.0, 3.0,
                new BABYLON.Vector3( 0.0,  135.0, 0.0   ),
                bz.Texture.GLASS,
                bz.TextureHasAlpha.NO,
                bz.TextureUV.TILED_BY_SIZE,
                null,
                this.scene,
                new bz.Physic( bz.PhysicState.STATIC, null ),
                0.5
            );

            // triangle
            bz.MeshFactory.createPolygon
            (
                'Triangle1',
                [
                    new BABYLON.Vector3( 0.0,  0.0,  13.0    ),
                    new BABYLON.Vector3( 10.0, 0.0,  13.0    ),
                    new BABYLON.Vector3( 10.0, 0.0,  0.0     ),
                ],
                bz.PivotAnchor.LOWEST_XYZ,
                new BABYLON.Vector3( 270.0, 0.0, 0.0 ),
                bz.Main.game.engine.material.solidRed,
                this.scene,
                new bz.Physic( bz.PhysicState.STATIC, null )
            );
        }
    }

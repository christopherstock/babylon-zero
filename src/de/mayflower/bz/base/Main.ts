
    require( '../css/global.less' );

    import * as bz from '..';

    /*******************************************************************************************************************
    *   The main class containing the point of entry and a single game instance.
    *
    *   TODO Default to degree instead of radians.
    *   TODO Try to solve planes again! (for trees etc.)
    *   TODO Refactor MeshFactory!
    *   TODO Set rotation point for meshes.
    *
    *   TODO Remove @author and @version tags!
    *
    *   TODO make param for mesh physics attributes.
    *   TODO make game objects (static wall, non-static movable etc.)
    *   TODO Calculate mass for boxes according to their density. Create density value!
    *   TODO Soilved upside down tree textures!
    *   TODO Create 3d gun as 2nd scene in front?
    *   TODO Realize player as moving box instead of direct camera / player/camera movement: ? http://www.pixelcodr.com/tutos/physics/physics.html
    *   TODO Delete LevelBunny. Move all functonality to LevelTest.
    *   TODO Fix player/camrera controls (turn, duck)
    *   TODO Solve move with collisions ..
    *   TODO Solve player falling into infinity.
    *   TODO rotationRad to rotationAngle everywhere !!
    *   TODO Solve ortho drawing!
    *   TODO Catch mouse in window in browser?? https://www.html5rocks.com/en/tutorials/pointerlock/intro/
    *   TODO enable player movement with collisions.
    *   TODO Improve performance in chrome? Try webGL 1.0??
    *   TODO Show FPS output as Ortho drawing: bz.MfgInit.engine.getFps().toFixed() + " fps"
    *   TODO Increase performance in chrome?
    *   TODO Remove createBoxDeprecated and fix LevelBunny!
    *   TODO Create material system with unified parameters!
    *   TODO Solve lights. Create lights system.
    *   TODO Enable controls for specific object, not for camera!
    *   TODO Improve Sprite System handling.
    *   TODO move onInitLevelCompleted to class Level and also scene to class level!
    *   TODO specify explicit gravity?
    *   TODO Enable jumping!
    *   TODO Improve mesh system.
    *   TODO Fix skybox and link to camera!
    *   TODO Solve shadows?
    *   TODO Create simple test level with increased performance!
    *   TODO Improve abstract level system and make it more generic.
    *   TODO Create main menu where player can reset camera etc.
    *   TODO Solve 3dsmax OBJ file importer? ( with different OBJ file? )
    *   TODO try this.camera.lockedTarget.
    *   TODO try dynamic textures ( video in texture in front of screen .. )
    *   TODO Review babylon.JS tutorials, features and playground.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Main
    {
        /** The singleton instance of the game. */
        public      static          game                    :bz.Game                    = null;

        /***************************************************************************************************************
        *   This method is invoked when the application starts.
        ***************************************************************************************************************/
        public static main() : void
        {
            bz.HTML.setTitle( bz.SettingEngine.TITLE );

            Main.acclaim();

            Main.game = new bz.Game();
            Main.game.init();
        }

        /***************************************************************************************************************
        *   Acclaims the debug console.
        ***************************************************************************************************************/
        private static acclaim() : void
        {
            bz.Debug.major.log( bz.SettingEngine.TITLE );
            bz.Debug.major.log();
        }
    }

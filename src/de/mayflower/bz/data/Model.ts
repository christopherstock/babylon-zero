
    /** ****************************************************************************************************************
    *   Specifies the filenames of all model files to import.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export abstract class Model
    {
        /** The model 'office chair'. */
        public      static      OFFICE_CHAIR            :string                 = 'furniture/officeChair.babylon';
        /** The model 'office chair 2'. */
        public      static      OFFICE_CHAIR_2          :string                 = 'furniture/officeChair2.babylon';
        /** The model 'office chair'. */
        public      static      SHELVES                 :string                 = 'furniture/shelves.babylon';
        /** The model 'office chair'. */
        public      static      SKULL                   :string                 = 'furniture/skull.babylon';
        /** The model 'Mayflower Logo'. */
        public      static      MF_LOGO                 :string                 = 'presentation/mfLogo.babylon';
        /** The model 'knight helmet'. */
        public      static      KNIGHT_HELMET           :string                 = 'presentation/knightHelmet.babylon';
        /** The model 'motorcycle helmet'. */
        public      static      MOTORCYCLE_HELMET       :string                 = 'presentation/motorcycleHelmet.babylon';
        /** The model 'shells'. */
        public      static      SHELLS                  :string                 = 'item/shells.babylon';

        /** All filenames for all meshes. */
        public      static      ALL_MESH_FILES          :string[]               =
        [
            Model.OFFICE_CHAIR,
            Model.OFFICE_CHAIR_2,
            Model.SHELVES,
            Model.SKULL,
            Model.MF_LOGO,
            // MeshImport.KNIGHT_HELMET,
            Model.MOTORCYCLE_HELMET,
            Model.SHELLS,
        ];
    }

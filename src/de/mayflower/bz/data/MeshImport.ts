
    /** ****************************************************************************************************************
    *   Specifies the filenames of all mesh objects to import.
    *******************************************************************************************************************/
    // tslint:disable:max-line-length
    export abstract class MeshImport
    {
        /** The mesh 'office chair'. */
        public      static      OFFICE_CHAIR            :string                 = 'furniture/officeChair.babylon';
        /** The mesh 'office chair'. */
        public      static      SHELVES                 :string                 = 'furniture/shelves.babylon';
        /** The mesh 'office chair'. */
        public      static      SKULL                   :string                 = 'furniture/skull.babylon';
        /** The mesh 'Mayflower Logo'. */
        public      static      MF_LOGO                 :string                 = 'presentation/mfLogo.babylon';
        /** The mesh 'knight helmet'. */
        public      static      KNIGHT_HELMET           :string                 = 'presentation/knightHelmet.babylon';
        /** The mesh 'motorcycle helmet'. */
        public      static      MOTORCYCLE_HELMET       :string                 = 'presentation/motorcycleHelmet.babylon';

        /** All filenames for all meshes. */
        public      static      ALL_MESH_FILES          :string[]               =
        [
            MeshImport.OFFICE_CHAIR,
            MeshImport.SHELVES,
            MeshImport.SKULL,
            MeshImport.MF_LOGO,
            MeshImport.KNIGHT_HELMET,
            MeshImport.MOTORCYCLE_HELMET,
        ];
    }

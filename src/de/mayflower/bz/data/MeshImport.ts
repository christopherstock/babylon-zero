
    /** ****************************************************************************************************************
    *   Specifies the filenames of all mesh objects to import.
    *******************************************************************************************************************/
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

        /** All filenames for all meshes. */
        public      static      ALL_MESH_FILES          :string[]               =
        [
            MeshImport.OFFICE_CHAIR,
            MeshImport.SHELVES,
            MeshImport.SKULL,
            MeshImport.MF_LOGO,
        ];
    }

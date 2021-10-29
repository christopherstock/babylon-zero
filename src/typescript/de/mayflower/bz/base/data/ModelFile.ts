
    /* eslint-disable max-len */

    /** ****************************************************************************************************************
    *   Specifies the filenames of all model files to import.
    *******************************************************************************************************************/
    export abstract class ModelFile
    {
        /** The model 'office chair'. */
        public      static  readonly    OFFICE_CHAIR_1_MULTI_MESH   :string             = 'furniture/officeChair1.babylon';
        /** The model 'office chair 2'. */
        public      static  readonly    OFFICE_CHAIR_2_ONE_MESH     :string             = 'furniture/officeChair2.babylon';
        /** The model 'office chair 3'. */
        public      static  readonly    OFFICE_CHAIR_3              :string             = 'furniture/officeChair3.babylon';
        /** The model 'office chair'. */
        public      static  readonly    SHELVES                     :string             = 'furniture/shelves.babylon';
        /** The model 'sphere 1'. */
        public      static  readonly    SPHERE_1                    :string             = 'furniture/sphere1.babylon';
        /** The model 'double sphere 1'. */
        public      static  readonly    DOUBLE_SPHERE_1             :string             = 'furniture/doubleSphere1.babylon';
        /** The model 'crate'. */
        public      static  readonly    CRATE                       :string             = 'furniture/crate1.babylon';

        /** The model 'shells'. */
        public      static  readonly    SHELLS                      :string             = 'item/shells.babylon';

        /** The model 'Mayflower Logo'. */
        public      static  readonly    MF_LOGO                     :string             = 'presentation/mfLogo.babylon';

        /** All filenames for all meshes. */
        public      static  readonly    ALL_MESH_FILES              :string[]           =
        [
            ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
            ModelFile.OFFICE_CHAIR_2_ONE_MESH,
            ModelFile.OFFICE_CHAIR_3,
            ModelFile.SHELVES,
            ModelFile.SPHERE_1,
            ModelFile.DOUBLE_SPHERE_1,
            ModelFile.CRATE,

            ModelFile.SHELLS,

            ModelFile.MF_LOGO,
        ];
    }
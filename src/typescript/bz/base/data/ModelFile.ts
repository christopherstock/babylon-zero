/** ********************************************************************************************************************
*   Specifies the filenames of all model files to import.
***********************************************************************************************************************/
export abstract class ModelFile
{
    /** The model 'office chair'. */
     public static readonly OFFICE_CHAIR_1_MULTI_MESH   :string             = 'furniture/officeChair1.babylon';
    /** The model 'office chair'. */
    public static readonly SHELVES_1                    :string             = 'furniture/shelves1.babylon';
    /** The model 'office desk 1'. */
    public static readonly OFFICE_DESK_1                :string             = 'furniture/officeDesk1.babylon';
    /** The model 'office desk 2'. */
    public static readonly OFFICE_DESK_2                :string             = 'furniture/officeDesk2.babylon';
    /** The model 'soda machine 2'. */
    public static readonly SODA_MACHINE_2               :string             = 'furniture/sodaMachine2.babylon';
    /** The model 'sphere 1'. */
    public static readonly SPHERE_1                     :string             = 'furniture/sphere1.babylon';
    /** The model 'double sphere 1'. */
    public static readonly DOUBLE_SPHERE_1              :string             = 'furniture/doubleSphere1.babylon';
    /** The model 'crate'. */
    public static readonly CRATE                        :string             = 'furniture/crate1.babylon';
    /** The model 'sofa 1'. */
    public static readonly SOFA_1                       :string             = 'furniture/sofa1.babylon';
    /** The model 'screen 1'. */
    public static readonly SCREEN_1                     :string             = 'furniture/screen1.babylon';

    /** The model 'item shotgun shells'. */
    public static readonly ITEM_SHOTGUN_SHELLS          :string             = 'item/shells.babylon';
    /** The model 'car 1'. */
    public static readonly CAR_1                        :string             = 'object/car1.babylon';
    /** The model 'bench 1'. */
    public static readonly BENCH_1                      :string             = 'furniture/bench1.babylon';

    /** The model 'Mayflower Logo'. */
    public static readonly MF_LOGO                      :string             = 'presentation/mfLogo.babylon';

    /** All filenames for all meshes. */
    public static readonly ALL_MESH_FILES               :string[]           =
    [
        ModelFile.OFFICE_CHAIR_1_MULTI_MESH,
        ModelFile.SHELVES_1,
        ModelFile.OFFICE_DESK_1,
        ModelFile.OFFICE_DESK_2,
        ModelFile.SODA_MACHINE_2,
        ModelFile.SPHERE_1,
        ModelFile.DOUBLE_SPHERE_1,
        ModelFile.CRATE,
        ModelFile.SOFA_1,
        ModelFile.SCREEN_1,

        ModelFile.ITEM_SHOTGUN_SHELLS,
        ModelFile.CAR_1,
        ModelFile.BENCH_1,

        ModelFile.MF_LOGO,
    ];
}
    // Player.PLAYER_BODY_ID
    import * as bz from '../../src/typescript/de/mayflower/bz/base/Debug';

    bz.MeshFactory.createImportedModel
    (
        scene,
        bz.ModelFile.CRATE,
        position.clone(),
        bz.Physic.PLAYER_HUMAN,
        bz.ModelCompoundType.NONE
    ).getMesh( 0 ),

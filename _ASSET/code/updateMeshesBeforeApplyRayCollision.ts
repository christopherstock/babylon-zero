        // might help to update the mesh on animated models ..
        for ( const mesh of this.meshes )
        {
            mesh.refreshBoundingInfo( true );
        }

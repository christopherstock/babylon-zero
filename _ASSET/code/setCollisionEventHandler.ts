
    // set a collision event handler for the body
    if ( false )
    {
        this.body.physicsImpostor.onCollideEvent = (
            collider     :BABYLON.PhysicsImpostor,
            collidedWith :BABYLON.PhysicsImpostor
        ) : void => {
            console.log( ' Colliding!' );
        };
    }

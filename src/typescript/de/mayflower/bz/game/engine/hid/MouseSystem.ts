
    import * as bz      from '../../..';

    /** ****************************************************************************************************************
    *   Offers default pointer handling for one specific stage.
    *   This is currently just an implementation for physical debug purposes!
    *******************************************************************************************************************/
    export class MouseSystem
    {
        // TODO Extract to MouseButtonCodes
        public      static  readonly    MOUSE_BUTTON_LEFT           :number                 = 0;
        public      static  readonly    MOUSE_BUTTON_CENTER         :number                 = 1;
        public      static  readonly    MOUSE_BUTTON_RIGHT          :number                 = 2;

        /** The canvas this pointer system operates on. */
        private             readonly    canvas                      :bz.CanvasSystem        = null;
        /** The stage this pointer system operates on. */
        private             readonly    stage                       :bz.Stage               = null;

        /** Indicates that the mouse is currently locked inside the canvas. */
        private                         mouseLocked                 :boolean                = false;

        /** The last mouse drag X if the pointer is locked. */
        private                         lastMovementX               :number                 = 0;
        /** The last mouse drag Y if the pointer is locked. */
        private                         lastMovementY               :number                 = 0;
        /** Indicates if the left mouse key is currently down. */
        private                         downMouseButtonLeft         :boolean                = false;
        /** Indicates if the center mouse key is currently down. */
        private                         downMouseButtonCenter       :boolean                = false;
        /** Indicates if the right mouse key is currently down. */
        private                         downMouseButtonRight        :boolean                = false;

        /** Indicates if the left mouse key was down but not consumed. */
        private                         unconsumedDownMouseButtonLeft       :boolean        = false;
        /** Indicates if the center mouse key is currently down. */
        private                         unconsumedDownMouseButtonCenter     :boolean        = false;
        /** Indicates if the right mouse key is currently down. */
        private                         unconsumedDownMouseButtonRight      :boolean        = false;

        /** Indicates that the left mouse button needs to be released before next press is accepted. */
        private                         needsReleaseButtonLeft      :boolean                = false;
        /** Indicates that the center mouse button needs to be released before next press is accepted. */
        private                         needsReleaseButtonCenter    :boolean                = false;
        /** Indicates that the right mouse button needs to be released before next press is accepted. */
        private                         needsReleaseButtonRight     :boolean                = false;

        /** ************************************************************************************************************
        *   Creates a new Pointer System.
        *
        *   @param stage                  The stage  this pointer system operates on.
        *   @param canvas                 The canvas this pointer system operates on.
        *   @param assignDebugPointerDown Specifies if a pointerDown event shall be assigned to the babylon.JS scene.
        *   @param assignPointerLock      Specifies if the pointer shall be locked on clicking onto the canvas.
        ***************************************************************************************************************/
        public constructor
        (
            stage                  :bz.Stage,
            canvas                 :bz.CanvasSystem,
            assignDebugPointerDown :boolean,
            assignPointerLock      :boolean
        )
        {
            this.stage  = stage;
            this.canvas = canvas;

            this.stage.getScene().onPointerDown = (
                assignDebugPointerDown
                ? ( evt:PointerEvent, pickResult:BABYLON.PickingInfo ) :void => {
                    this.onDebugPointerDown( evt, pickResult );
                }
                : null
            );

            if ( assignPointerLock )
            {
                this.canvas.getNativeCanvas().onclick     = ( me: MouseEvent ) :any => { this.onMouseClick( me ); };
                this.canvas.getNativeCanvas().onmousedown = ( me: MouseEvent ) :any => { this.onMouseDown(  me ); };
                this.canvas.getNativeCanvas().onmouseup   = ( me: MouseEvent ) :any => { this.onMouseUp(    me ); };
            }
        }

        /** ************************************************************************************************************
        *   Sets up and defines the DEBUG pointer callback.
        *
        *   @param evt        The pointer event being propagated by the system.
        *   @param pickResult More information about the location of the 3D space where the pointer is down.
        ***************************************************************************************************************/
        public onDebugPointerDown(evt:PointerEvent, pickResult:BABYLON.PickingInfo ) : void
        {
            // check if a result is picked and if the stage is present
            if ( pickResult.hit && this.stage !== null )
            {
                bz.Debug.pointer.log( 'Picked a mesh on pointerDown' );

                let src :BABYLON.Vector3;

                // horrible debug implementation
                if
                (
                        this.stage.getCameraSystem().isFirstPersonCameraActive()
                    &&  this.stage.getPlayer() !== null
                )
                {
                    src = this.stage.getPlayer().getThirdPersonCameraTargetMesh().position;
                }
                else
                {
                    src = this.stage.getCameraSystem().getActiveCamera().position;
                }

                const dir:BABYLON.Vector3 = pickResult.pickedPoint.subtract( src );
                dir.normalize();

                // horrible debug implementation
                if
                (
                        pickResult.pickedMesh                             !== null
                    &&  pickResult.pickedMesh.physicsImpostor             !== undefined
                    &&  pickResult.pickedMesh.physicsImpostor.physicsBody !== null
                )
                {
                    pickResult.pickedMesh.applyImpulse( dir.scale( 10 ), pickResult.pickedPoint );
                }
            }
        };

        public getAndResetLastMouseMovementX() : number
        {
            const ret :number = this.lastMovementX;
            this.lastMovementX = 0;
            return ret;
        }

        public getAndResetLastMouseMovementY() : number
        {
            const ret :number = this.lastMovementY;
            this.lastMovementY = 0;
            return ret;
        }

        public isMouseButtonDown( buttonId:number ) : boolean
        {
            switch ( buttonId )
            {
                case MouseSystem.MOUSE_BUTTON_LEFT:
                {
                    return this.downMouseButtonLeft;
                }

                case MouseSystem.MOUSE_BUTTON_CENTER:
                {
                    return this.downMouseButtonCenter;
                }

                case MouseSystem.MOUSE_BUTTON_RIGHT:
                {
                    return this.downMouseButtonRight;
                }
            }

            return false;
        }

        public consumeMouseButtonDown( buttonId:number ) : boolean
        {
            switch ( buttonId )
            {
                case MouseSystem.MOUSE_BUTTON_LEFT:
                {
                    if ( this.unconsumedDownMouseButtonLeft )
                    {
                        this.unconsumedDownMouseButtonLeft = false;
                        return true;
                    }
                    return false;
                }

                case MouseSystem.MOUSE_BUTTON_CENTER:
                {
                    if ( this.unconsumedDownMouseButtonCenter )
                    {
                        this.unconsumedDownMouseButtonCenter = false;
                        return true;
                    }
                    return false;
                }

                case MouseSystem.MOUSE_BUTTON_RIGHT:
                {
                    if ( this.unconsumedDownMouseButtonRight )
                    {
                        this.unconsumedDownMouseButtonRight = false;
                        return true;
                    }
                    return false;
                }
            }

            return false;
        }

        public setButtonNeedsRelease( buttonId:number ) : void
        {
            switch ( buttonId )
            {
                case MouseSystem.MOUSE_BUTTON_LEFT:
                {
                    this.needsReleaseButtonLeft = true;
                    this.downMouseButtonLeft    = false;
                    break;
                }

                case MouseSystem.MOUSE_BUTTON_CENTER:
                {
                    this.needsReleaseButtonCenter = true;
                    this.downMouseButtonCenter    = false;
                    break;
                }

                case MouseSystem.MOUSE_BUTTON_RIGHT:
                {
                    this.needsReleaseButtonRight = true;
                    this.downMouseButtonRight    = false;
                    break;
                }
            }
        }

        /** ************************************************************************************************************
        *   Being invoked when the canvas is clicked.
        *   Requests the mouse/pointer lock feature of the browser if the lock is not already active.
        *
        *   @param me The MouseEvent with additional information on this click event.
        ***************************************************************************************************************/
        private onMouseClick( me:MouseEvent ) : void
        {
            // check if the pointer is not locked yet
            if ( !this.mouseLocked )
            {
                this.requestPointerLock();
            }
        };

        /** ************************************************************************************************************
        *   Being invoked when the mouse is down over the canvas.
        *
        *   @param me The MouseEvent with additional information on this event.
        ***************************************************************************************************************/
        private onMouseDown( me:MouseEvent ) : void
        {
            // only handle this event if the pointer is locked
            if ( this.mouseLocked )
            {
                switch ( me.button )
                {
                    case MouseSystem.MOUSE_BUTTON_LEFT:
                    {
                        if ( !this.needsReleaseButtonLeft )
                        {
                            this.downMouseButtonLeft           = true;
                            this.unconsumedDownMouseButtonLeft = true;
                            bz.Debug.pointer.log( ' Left mouse key down' );
                        }
                        break;
                    }

                    case MouseSystem.MOUSE_BUTTON_CENTER:
                    {
                        if ( !this.needsReleaseButtonCenter )
                        {
                            this.downMouseButtonCenter           = true;
                            this.unconsumedDownMouseButtonCenter = true;
                            bz.Debug.pointer.log( ' Center mouse key down' );
                        }
                        break;
                    }

                    case MouseSystem.MOUSE_BUTTON_RIGHT:
                    {
                        if ( !this.needsReleaseButtonRight )
                        {
                            this.downMouseButtonRight           = true;
                            this.unconsumedDownMouseButtonRight = true;
                            bz.Debug.pointer.log( ' Right mouse key down' );
                        }
                        break;
                    }
                }
            }
        }

        /** ************************************************************************************************************
        *   Being invoked when the mouse is up over the canvas.
        *
        *   @param me The MouseEvent with additional information on this event.
        ***************************************************************************************************************/
        private onMouseUp( me:MouseEvent ) : void
        {
            // only handle this event if the pointer is locked
            if ( this.mouseLocked )
            {
                switch ( me.button )
                {
                    case MouseSystem.MOUSE_BUTTON_LEFT:
                    {
                        this.downMouseButtonLeft    = false;
                        this.needsReleaseButtonLeft = false;
                        bz.Debug.pointer.log( ' Left mouse key up' );
                        break;
                    }

                    case MouseSystem.MOUSE_BUTTON_CENTER:
                    {
                        this.downMouseButtonCenter    = false;
                        this.needsReleaseButtonCenter = false;
                        bz.Debug.pointer.log( ' Center mouse key up' );
                        break;
                    }

                    case MouseSystem.MOUSE_BUTTON_RIGHT:
                    {
                        this.downMouseButtonRight    = false;
                        this.needsReleaseButtonRight = false;
                        bz.Debug.pointer.log( ' Right mouse key up' );
                        break;
                    }
                }
            }
        }

        private requestPointerLock() : void
        {
            document.addEventListener( 'pointerlockchange',    () => { this.onPointerLockChange(); } );
            document.addEventListener( 'mozpointerlockchange', () => { this.onPointerLockChange(); } );
            document.addEventListener( 'mousemove',            ( mouseEvent:MouseEvent ) => {
                this.onMouseMove( mouseEvent ); }
            );

            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.canvas.getNativeCanvas().requestPointerLock =
            (
                    // eslint-disable-next-line @typescript-eslint/unbound-method
                    this.canvas.getNativeCanvas().requestPointerLock
                    // eslint-disable-next-line @typescript-eslint/unbound-method
                ||  this.canvas.getNativeCanvas().mozRequestPointerLock
            );
            this.canvas.getNativeCanvas().requestPointerLock();
        }

        /** ************************************************************************************************************
        *   Being invoked when the pointer lock changes.
        ***************************************************************************************************************/
        private onPointerLockChange() : void
        {
            if (
                    document.pointerLockElement               === this.canvas.getNativeCanvas()
                ||  ( document as any ).mozPointerLockElement === this.canvas.getNativeCanvas()
            ) {
                bz.Debug.pointer.log( 'The pointer lock status is now LOCKED' );

                this.mouseLocked = true;

            }
            else
            {
                bz.Debug.pointer.log( 'The pointer lock status is now UNLOCKED' );

                this.mouseLocked = false;
            }
        };

        /** ************************************************************************************************************
        *   Being invoked when the 'pointer-locked' mouse is moved.
        *
        *   Note that this method is being invoked ASYNCHRONOUS by the system
        *   so ALL occuring events must be stored and processed afterwards!
        ***************************************************************************************************************/
        private onMouseMove( me:MouseEvent ) : void
        {
            if ( this.mouseLocked )
            {
                bz.Debug.pointer.log(
                    'PointerMovement X: ['
                    + String( me.movementX )
                    + '] Y: ['
                    + String( me.movementY )
                    + ']'
                );
            }

            this.lastMovementX = me.movementX;
            this.lastMovementY = me.movementY;
        };
    }
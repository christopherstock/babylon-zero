
    import * as bz      from '../../..';

    /** ****************************************************************************************************************
    *   Offers default pointer handling for one specific stage.
    *   This is currently just an implementation for physical debug purposes!
    *
    *   TODO rename to MouseSystem.
    *******************************************************************************************************************/
    export class PointerSystem
    {
        private     static  readonly    MOUSE_BUTTON_LEFT   :number                     = 0;
        private     static  readonly    MOUSE_BUTTON_RIGHT  :number                     = 2;

        /** The canvas this pointer system operates on. */
        private             readonly    canvas              :bz.CanvasSystem            = null;
        /** The stage this pointer system operates on. */
        private             readonly    stage               :bz.Stage                   = null;

        /** Indicates that the pointer is currently locked. */
        private                         pointerLocked       :boolean                    = false;

        /** The last pointer drag X if the pointer is locked. */
        private                         lastMovementX       :number                     = 0;
        /** The last pointer drag Y if the pointer is locked. */
        private                         lastMovementY       :number                     = 0;

        /** ************************************************************************************************************
        *   Creates a new Pointer System.
        *
        *   @param stage             The stage  this pointer system operates on.
        *   @param canvas            The canvas this pointer system operates on.
        *   @param assignPointerDown Specifies if a pointerDown event shall be assigned to the babylon.JS scene.
        *   @param assignPointerLock Specifies if the pointer shall be locked on clicking onto the canvas.
        ***************************************************************************************************************/
        public constructor
        (
            stage             :bz.Stage,
            canvas            :bz.CanvasSystem,
            assignPointerDown :boolean,
            assignPointerLock :boolean
        )
        {
            this.stage  = stage;
            this.canvas = canvas;

            this.stage.getScene().onPointerDown = (
                assignPointerDown
                ? ( evt:PointerEvent, pickResult:BABYLON.PickingInfo ) :void => {
                    this.onPointerDown( evt, pickResult );
                }
                : null
            );
            this.canvas.getNativeCanvas().onclick = (
                assignPointerLock
                ? ( me: MouseEvent ) :any => { this.onCanvasClick( me ); }
                : null
            );
        }

        /** ************************************************************************************************************
        *   Sets up and defines the DEBUG pointer callback.
        *
        *   @param evt        The pointer event being propagated by the system.
        *   @param pickResult More information about the location of the 3D space where the pointer is down.
        ***************************************************************************************************************/
        public onPointerDown( evt:PointerEvent, pickResult:BABYLON.PickingInfo ) : void
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

        public getAndResetLastPointerX() : number
        {
            const ret :number = this.lastMovementX;
            this.lastMovementX = 0;
            return ret;
        }

        public getAndResetLastPointerY() : number
        {
            const ret :number = this.lastMovementY;
            this.lastMovementY = 0;
            return ret;
        }

        /** ************************************************************************************************************
        *   Requests the mouse/pointer lock feature of the browser.
        *
        *   @param me The MouseEvent with additional information on this click event.
        ***************************************************************************************************************/
        private onCanvasClick( me:MouseEvent ) : void
        {
            // check if the pointer is already locked
            if ( this.pointerLocked )
            {
                // TODO extract from onclick to onmousedown & onmouseup

                bz.Debug.pointer.log( 'Pointer already locked - Canvas click button [' + String( me.button ) + ']' );

                if ( me.button === PointerSystem.MOUSE_BUTTON_LEFT )
                {
                    bz.Debug.pointer.log( ' Left mouse key clicked' );
                }

                if ( me.button === PointerSystem.MOUSE_BUTTON_RIGHT )
                {
                    bz.Debug.pointer.log( ' Right mouse key clicked' );
                }
            }
            else
            {
                this.requestPointerLock();
            }
        };

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

                this.pointerLocked = true;

            }
            else
            {
                bz.Debug.pointer.log( 'The pointer lock status is now UNLOCKED' );

                this.pointerLocked = false;
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
            if ( this.pointerLocked )
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

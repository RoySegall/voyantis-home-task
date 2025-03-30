import './createMessage.css';
import {useCallback, useRef} from "react";

export const CreateMessage = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const showDialog = useCallback(() => {
        dialogRef?.current?.showModal();
    }, [dialogRef]);

    const closeDialog = useCallback(() => {
        dialogRef?.current?.close();
    }, [dialogRef]);

    return <div id='create-message'>

        <dialog ref={dialogRef} id='dialog'>
            <form>

            </form>

            <button autoFocus onClick={closeDialog}>Close</button>
        </dialog>

        <button onClick={showDialog}>Create message</button>
    </div>
}
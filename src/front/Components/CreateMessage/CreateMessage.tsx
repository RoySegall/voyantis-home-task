import './createMessage.css';
import {useActionState, useCallback, useRef} from "react";

export const CreateMessage = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const showDialog = useCallback(() => {
        dialogRef?.current?.showModal();
    }, [dialogRef]);

    const closeDialog = useCallback(() => {
        dialogRef?.current?.close();
    }, [dialogRef]);

    // todo: handle error better.
    const [error, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const name = formData.get('name');
            const message = formData.get('message');

            console.log(name, message);

            const response = await fetch(`http://localhost:3000/api/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: message,
            });

            if (response.status === 200) {
                return null;
            }

            return 'Oops, something went wrong';
        },
        null,
    );

    return <div id='create-message'>

        <dialog ref={dialogRef} id='dialog'>
            {error && <div className='error'>{error}</div>}
            <form action={submitAction}>
                <input type='text' name='name' placeholder='Name' required />
                <input type='text' name='message' placeholder='Message' required />

                <div className='footer'>
                    <button type='submit' disabled={isPending} onClick={closeDialog}>Submit</button>
                    <button onClick={closeDialog}>Close</button>
                </div>
            </form>

        </dialog>

        <button onClick={showDialog}>Create message</button>
    </div>
}
'use client'



export default function AlertModal({ message, status = false, setStatus = () => { } }) {
    if (!status)
        return
    return (
        <form
            class="confirm-modal"
            onSubmit={(e) => { e.preventDefault(), setStatus }}
        >
            <p>{message}</p>
            <div className="btnModalConfirm">
                <button
                    autoFocus
                    className="btnGreen"
                    type="submit"
                    onClick={() => { setStatus(false) }}
                >OK</button>

            </div>
        </form>

    )
}

'use client'



export default function ConfirmModal({ confirm, cancel, question }) {

    return (
        <form
            class="confirm-modal"
            onSubmit={(e) => { e.preventDefault(), confirm }}
        >
            <p>{question}?</p>
            <div className="btnModalConfirm">
                <button
                    autoFocus
                    className="btnGreen"
                    type="submit"
                    onClick={confirm}
                >Sim</button>
                <button className="btnRed"
                    onClick={cancel}
                >Não</button>

            </div>
        </form>

    )
}

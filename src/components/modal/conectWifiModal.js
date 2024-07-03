'use client'

export default function ConectWifiModal({ statusConnection, confirm, cancel, question, password, setPassword }) {

    return (
        <form
            class="confirm-modal"
            onSubmit={(e) => { e.preventDefault(), confirm }}
        >
            <p>{question}?</p>
            <p dangerouslySetInnerHTML={{ __html: statusConnection }}></p>

            <p>
                <input
                    type="password"
                    placeholder="Senha da Rede"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ color: "#000000", borderWidth: 1, borderColor: "var(--grey-neutral-nine)", borderStyle: "solid", borderRadius: 5, padding: 2, marginBottom: 10 }}
                />
            </p>
            <div className="btnModalConfirm">
                <button
                    autoFocus
                    className="btnGreen"
                    type="submit"
                    onClick={() => { confirm(password) }}
                >Conectar</button>
                <button className="btnRed"
                    onClick={cancel}
                >Cancelar</button>

            </div>
        </form>

    )
}

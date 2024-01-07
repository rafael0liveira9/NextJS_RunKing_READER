'use client'

import { useState, useEffect } from "react"

export default function RaiaModal({ confirm, cancel, raia, next }) {
    const [number, setNumber] = useState()

    function saveNumberData(confirmFunction, cancelFunction) {

        switch (raia) {
            case 1:
                localStorage.setItem("raia_one_number", number);
                confirmFunction();
                break;

            case 2:
                localStorage.setItem("raia_two_number", number);
                confirmFunction();
                break;

            case 3:
                localStorage.setItem("raia_tree_number", number);
                confirmFunction();
                break;

            default:
                cancelFunction();
                break;
        }
    }

    return (
        <div class="raia-modal">
            <p>Digite o número de peito para a RAIA {raia}</p>
            <form
                style={{ display: "flex", flexDirection: "column", width: "100%", gap: "30px" }}
                onSubmit={(e) => { e.preventDefault(); saveNumberData(confirm, cancel); }}>
                <input
                    class="raia-number-input"
                    type="number"
                    onChange={(e) => setNumber(e.target.value)}
                    autoFocus
                ></input>
                <div className="btnModalConfirm">
                    <button
                        className="btnGreen"
                        type="submit"
                    >
                        {next ? "Próximo" : "Iniciar"}
                    </button>
                    <button
                        className="btnRed"
                        onClick={cancel}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>

    )
}

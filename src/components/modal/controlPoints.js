'use client'

import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context/global"

export default function ControlPointModal({ close, event }) {
    const router = useRouter()
    const [cps, setCps] = useState()

    const URL_API_RUNKING = "https://api.runking.com.br/"
    const { URLLOCALSERVICE } = useContext(GlobalContext);


    const handleInnerDivClick = (e) => {
        e.stopPropagation();
    }

    const closeModal = (e) => {
        e.stopPropagation();
        close();
    }

    const getCPs = async function () {
        try {
            const x = event.id

            if (x != "" && x != null && x != undefined) {

                const cps = await fetch(`${URL_API_RUNKING}controlPoints/${x}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem("user_jwt")
                    }
                });

                if (!cps.ok) {
                    throw new Error(`Erro na requisição: ${cps.status} - ${cps.statusText}`);
                }

                const data = await cps.json();
                setCps(data);
            }

        } catch (error) {
            console.error("Erro na requisição:", error.message);
        }
    }

    const postCPs = async function (pc) {
        try {

            const res = await fetch(`${URLLOCALSERVICE}configuration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "PC": pc.uuid
                })
            });

            console.log("resss", res)

            // if (!res.ok) {
            //     console.log(`Erro na requisição: ${res.status} - ${res.statusText}`);
            //     return res
            // }

            localStorage.setItem("event_pc_name", pc.name);
            localStorage.setItem("event_pc_uuid", pc.uuid);

            router.push("/home")

        } catch (error) {
            console.error("Erro na requisição:", error.message);
        }
    }


    useEffect(() => {
        getCPs();

    }, [event])

    console.log(cps)
    return (
        <div
            onClick={closeModal}
            className="containerModals">
            <div
                onClick={handleInnerDivClick}
                className="cp-modal">
                <button
                    onClick={closeModal}
                    className="closeCPModalButton"
                >x <span className="closeCPbtnText">Fechar</span></button>

                <div className="cPModalHeader">
                    <h5>{`Pontos de Controle - ${event?.name}`}</h5>
                </div>
                <div className="cPModalBody">
                    <div className="cPModalList">
                        {cps?.filter((e) => e.name != '').length > 0 ?
                            cps.filter((e) => e.name != '').map((e, y) => {
                                return (
                                    <p
                                        onClick={() => postCPs(e)}
                                        key={y}
                                        className={y % 2 === 0 ? "cPModalItemOne" : "cPModalItemTwo"}>{e.name}</p>
                                )
                            })
                            :
                            <p className="cPModalItemOne">- Nenhum Ponto de Controle cadastrado!</p>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

'use client'
import Separator from "@/components/separator";
import { useState, useContext } from "react";
import ConectWifiModal from "../modal/conectWifiModal"
import { GlobalContext } from "@/context/global"

export default function CardselectWiFi({ networks, currentNetwork }) {
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNetwork, setSelectedNetwork] = useState(null);
    const [statusConnection, setStatusConnection] = useState("");
    const { URLLOCALSERVICE } = useContext(GlobalContext)
    const openModal = (network) => {
        setSelectedNetwork(network);
        setModalVisible(true);
    };
    const handleCancel = () => {
        setModalVisible(false);
    };

    const confirmNewWIfi = async (password) => {
        setStatusConnection(`Tentando conectar em ${selectedNetwork}...`)
        const res = await fetch(`${URLLOCALSERVICE}connectWiFi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "ssid": selectedNetwork,
                "password": password
            })
        });

        let result = await res.json()

        if (result.status) {
            setStatusConnection("")
            handleCancel()
        }

        setStatusConnection(`Falha ao conectar em ${selectedNetwork}...\n<br />${result.message}`)

    }
    const ButtonComponente = ({ e, y }) => {
        return (
            <div onClick={() => { openModal(e) }} className={e === currentNetwork ? "archievListFirst" : "archievListItem"} key={y}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h6>{e}</h6>
                </div>
            </div>
        );
    };


    return (
        <div className="mainView">
            {modalVisible && ConectWifiModal({ statusConnection, password, setPassword, question: `Conectar à rede ${selectedNetwork}`, confirm: confirmNewWIfi, cancel: handleCancel })}

            <div className="archievListSecond">
                {networks?.length > 0
                    ?
                    networks.map((e, y) => {
                        return (
                            <>
                                <ButtonComponente e={e} y={y} />
                                {(y + 1) != networks?.length && <Separator color={"var(--grey-neutral-nine)"} width={"100%"} height={"1px"}></Separator>}
                            </>
                        )
                    })
                    :
                    <div className="archievNoListAvaible">
                        <p>
                            - Nenhuma rede disponível
                        </p>
                    </div>
                }
            </div>


        </div>
    )
}

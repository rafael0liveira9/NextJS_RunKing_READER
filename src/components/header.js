'use client'
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useContext } from "react"
import ConfirmModal from "@/components/modal/confirmation";
import { GlobalContext } from "@/context/global"
export default function Header() {
    const { config } = useContext(GlobalContext)

    const path = usePathname();
    const router = useRouter();
    const [systemHour, setSystemHour] = useState("-")
    const [online, setOnline] = useState(config.status)
    const [cloud, setCloud] = useState(config.IS_SEND_TO_CLOUD)
    const [hour, setHour] = useState("")
    const [ip, setIp] = useState(config.ip)

    const [isModalGetHour, setIsModalGetHour] = useState(false)

    function getHour(x) {
        const dateTime = new Date(x);
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const seconds = dateTime.getSeconds().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;


        setSystemHour(formattedTime)
    }

    useEffect(() => {
        setSystemHour(config.dateTimeSystem)
        setOnline(config.status)
        setCloud(config.IS_SEND_TO_CLOUD)
        setIp(config.ip)
    }, [config])

    function isoConvert(dataString) {
        const data = new Date(dataString);
        return data.toISOString();
    }

    function confirmModalClose() {
        setIsModalGetHour(false)
    }


    function confirmModal() {
        let x = new Date();
        let y = isoConvert(x);
        getHour(y)

        setIsModalGetHour(false)
    }

    function convertHour(x) {

        let dataObj = new Date(x);

        let dataFormatada = `${("0" + dataObj.getUTCDate()).slice(-2)}/${("0" + (dataObj.getUTCMonth() + 1)).slice(-2)}/${dataObj.getUTCFullYear()} - ${("0" + dataObj.getUTCHours()).slice(-2)}:${("0" + dataObj.getUTCMinutes()).slice(-2)}:${("0" + dataObj.getUTCSeconds()).slice(-2)}`;
        // let dataFormatada = `${("0" + dataObj.getUTCDate()).slice(-2)}/${("0" + (dataObj.getUTCMonth() + 1)).slice(-2)}/${dataObj.getUTCFullYear()} - ${("0" + dataObj.getUTCHours()).slice(-2)}:${("0" + dataObj.getUTCMinutes()).slice(-2)}:${("0" + dataObj.getUTCSeconds()).slice(-2)}.${("00" + dataObj.getUTCMilliseconds()).slice(-3)}`;
        setSystemHour(dataFormatada)
    }

    useEffect(() => {
        convertHour(config.dateTimeSystem)
    }, [config.dateTimeSystem])


    return (
        <div className="greyBackground" style={{ flexDirection: "column", padding: "10px 0", Height: "25vh" }}>
            {isModalGetHour == true &&
                <ConfirmModal confirm={() => confirmModal()} cancel={() => confirmModalClose()} question={"Deseja sincronizar a hora do sistema"}></ConfirmModal>}
            <img src="/images/logo-runking.png"></img>
            <div style={{ position: "absolute", right: 10, top: 10, }}>
                <img src={config.isInternet ? "/icons/internetOn.svg" : "/icons/internetOff.svg"}></img>
            </div>
            <div className="headerContent">
                <div className="headerContent">
                    <div className="headerContent responsiveHeaderDiv" style={{ flexDirection: "row", gap: "10px" }}>
                        <div className="headerContentRespOne" style={{ gap: "10px" }}>
                            Cloud:
                            <div className="iconGreenOut" style={cloud ? { backgroundColor: "var(--green-dark)" } : { backgroundColor: "var(--red-dark)" }}>
                                <div
                                    className="iconGreenin"
                                    style={cloud ? { backgroundColor: "var(--green-primary)" } : { backgroundColor: "var(--red-primary)" }}
                                >

                                </div>
                            </div>
                            <span>{cloud ? "Online" : "Offline"}</span>
                        </div>
                        <div className="headerContentRespTwo" style={{ gap: "10px" }}>
                            Reader IP: <span>{!!ip ? ip : " - "}</span>
                        </div>
                    </div>

                </div>
                <div className="headerContent responsiveHeaderDiv" style={{ flexDirection: "row", gap: "10px" }}>
                    <div className="headerContentRespOne" style={{ gap: "10px" }}>
                        Status:
                        <div className="iconGreenOut" style={online == "Lendo" ? { backgroundColor: "var(--green-dark)" } : online == "Parado" ? { backgroundColor: "var(--yellow-dark)" } : { backgroundColor: "var(--red-dark)" }}>
                            <div
                                className="iconGreenin"
                                style={online == "Lendo" ? { backgroundColor: "var(--green-primary)" } : online == "Parado" ? { backgroundColor: "var(--yellow-primary)" } : { backgroundColor: "var(--red-primary)" }}
                            >

                            </div>
                        </div>
                        <span>{online}</span>
                    </div>
                    <div className="headerContentRespTwo" style={{ gap: "10px" }}>
                        Horário: <span>{systemHour != null ? systemHour : " - "}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

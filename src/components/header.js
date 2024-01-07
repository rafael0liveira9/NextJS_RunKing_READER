'use client'
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react"
import ConfirmModal from "@/components/modal/confirmation";

export default function Header() {
    const path = usePathname();
    const router = useRouter();
    const [systemHour, setSystemHour] = useState(null)
    const [online, setOnline] = useState("")
    const [hour, setHour] = useState("")
    const [ip, setIp] = useState("")
    const [isModalGetHour, setIsModalGetHour] = useState(false)

    function getHour(x) {
        const dateTime = new Date(x);
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const seconds = dateTime.getSeconds().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;


        setSystemHour(formattedTime)
    }

    function isoConvert(dataString) {
        const data = new Date(dataString);
        return data.toISOString();
    }

    function addSecond(dataString) {
        const data = new Date(dataString);
        data.setSeconds(data.getSeconds() + 1);
        return data.toISOString();
    }

    function getConfig() {
        setOnline(localStorage.getItem("IS_SEND_TO_CLOUD"))
        setHour(localStorage.getItem("dateTimeSystem"))
        setIp(localStorage.getItem("ip"))
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

    useEffect(() => {
        getConfig();

        // let x = new Date();
        // let y = isoConvert(x);
        // setTimeout(() => {
        //     console.log("aaaaaaaaa", y.substring(0, y.length - 5) != hour.substring(0, hour.length - 5))
        //     if (y.substring(0, y.length - 5) != hour.substring(0, hour.length - 5)) {
        //         setIsModalGetHour(true);
        //     }
        // }, [3000])

    }, [path])

    useEffect(() => {
        const intervalId = setInterval(() => {

            setOnline(localStorage.getItem("IS_SEND_TO_CLOUD"))
            setHour(localStorage.getItem("dateTimeSystem"))
            setIp(localStorage.getItem("ip"))

            localStorage.setItem("dateTimeSystem", addSecond(localStorage.getItem("dateTimeSystem")));
            setHour(addSecond(localStorage.getItem("dateTimeSystem")))
            getHour(addSecond(localStorage.getItem("dateTimeSystem")))

        }, 1000);
        return () => clearInterval(intervalId);

    }, [hour])

    return (
        <div className="greyBackground" style={{ flexDirection: "column", padding: "10px 0", Height: "25vh" }}>
            {isModalGetHour == true &&
                <ConfirmModal confirm={() => confirmModal()} cancel={() => confirmModalClose()} question={"Deseja sincronizar a hora do sistema"}></ConfirmModal>}
            <img src="/images/logo-runking.png"></img>
            <div className="headerContent">
                <div className="headerContent">
                    <div className="headerContent responsiveHeaderDiv" style={{ flexDirection: "row", gap: "10px" }}>
                        <div className="headerContentRespOne" style={{ gap: "10px" }}>
                            Nuvem:
                            <div className="iconGreenOut" style={online == "Lendo" ? { backgroundColor: "var(--green-dark)" } : online == "Parado" ? { backgroundColor: "var(--yellow-dark)" } : { backgroundColor: "var(--red-dark)" }}>
                                <div
                                    className="iconGreenin"
                                    style={online == "Lendo" ? { backgroundColor: "var(--green-primary)" } : online == "Parado" ? { backgroundColor: "var(--yellow-primary)" } : { backgroundColor: "var(--red-primary)" }}
                                >

                                </div>
                            </div>
                            <span>{online == "true" ? "Online" : "Offline"}</span>
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
                        <span>{online == "true" ? "Online" : "Offline"}</span>
                    </div>
                    <div className="headerContentRespTwo" style={{ gap: "10px" }}>
                        System Timetable: <span>{systemHour != null ? systemHour : " - "}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

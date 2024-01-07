'use client'

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";


export default function CardInfoData() {
    const path = usePathname();
    const [read, setRead] = useState();
    const [cloud, setCloud] = useState();

    function getConfig() {
        setRead(localStorage.getItem("totalReader"))
        setCloud(localStorage.getItem("totalCloud"))
    }

    useEffect(() => {
        getConfig()
    }, [path])

    return (
        <div className="cardInfoContainer">
            <div className="cardInfoBackgroud">
                <div className="backgroundBall"></div>
                <h2>{!!read ? read : 0}</h2>
                <p>Total de Leitura</p>
            </div>
            <div className="cardInfoBackgroud">
                <div className="backgroundBall"></div>
                <h2>{!!cloud ? cloud : 0}</h2>
                <p>Total Cloud</p>
            </div>
        </div>
    )
}

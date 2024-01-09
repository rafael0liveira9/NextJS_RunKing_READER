'use client'

import { useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { GlobalContext } from "@/context/global"

export default function CardInfoData() {
    const { config } = useContext(GlobalContext)
    const path = usePathname();
    const [read, setRead] = useState();
    const [cloud, setCloud] = useState();



    useEffect(() => {
        setRead(config.totalReader)
        setCloud(config.totalCloud)
    }, [config])

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

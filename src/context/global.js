'use client'
import React, { createContext, useEffect, useState } from 'react';
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [URLLOCALSERVICE, setURLLOCALSERVICE] = useState("http://localhost:8000/")

    const [config, setConfig] = useState({
        IS_SEND_TO_CLOUD: false,
        dateTimeSystem: null,
        serialNumber: null,
        status: "Parado",
        ip: "",
        totalReader: 0,
        totalCloud: 0,
        antena1: 0,
        antena2: 0,
        antena3: 0,
        antena4: 0,
    });

    const [isReading, setisReading] = useState(false)

    async function getConfig() {
        try {
            console.log("Antes da requisição fetch");
            const response = await fetch(`${URLLOCALSERVICE}getRealTimeData`, {
                method: 'GET'
            });

            const jsonData = await response.json();
            setConfig(jsonData)
            localStorage.setItem("IS_SEND_TO_CLOUD", jsonData.IS_SEND_TO_CLOUD);
            localStorage.setItem("dateTimeSystem", jsonData.dateTimeSystem);
            localStorage.setItem("serialNumber", "37022435146");
            localStorage.setItem("status", jsonData.status);
            localStorage.setItem("ip", jsonData.ip);
            localStorage.setItem("totalReader", jsonData.totalReader);
            localStorage.setItem("totalCloud", jsonData.totalCloud);
            if (!isReading) {
                if (jsonData.status == "Lendo") {
                    setisReading(true)
                }
            }
            setTimeout(() => { getConfig() }, 1000)

        } catch (error) {
            console.error("Erro na requisição:", error);
            setTimeout(() => { getConfig() }, 10000)
        }
    }

    useEffect(() => {
        getConfig()
    }, [])

    useEffect(() => {
        setURLLOCALSERVICE(`${window.location.origin.replace(/(?::\d+)?$/, '')}:8000/`)
    }, [])

    useEffect(() => {
        alert(URLLOCALSERVICE)
    }, [URLLOCALSERVICE])

    return (
        <GlobalContext.Provider value={{
            config,
            URLLOCALSERVICE,
            isReading,
            setisReading
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

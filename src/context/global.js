'use client'
import React, { createContext, useEffect, useState } from 'react';
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {


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
        isInternet: false,
    });

    const [dataLogin, setDataLogin] = useState(null)
    const [pc, setPC] = useState(null)
    const [event, setEvent] = useState(null)

    const URLLOCALSERVICE = () => {
        if (typeof window !== 'undefined') {
            return `${window.location.protocol}//${window.location.hostname}:8000/`;
        }
        return null;
    }

    const saveLoginInHarware = async ({ login = null, event = null, currentPc = null, logout = false }) => {
        await fetch(`${URLLOCALSERVICE()}configuration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "login": logout ? null : { dataLogin: login, pc: currentPc, event },
                "PC": logout ? null : undefined,
            })
        });
    }

    const setLogin = (data) => {
        setDataLogin(data)
        localStorage.setItem("AUTH", JSON.stringify(data))
    }

    const setPCData = (data) => {
        setPC(data)
        localStorage.setItem("PC", JSON.stringify(data))

    }



    const URLAPIRUNKING = () => {
        return "https://api.runking.com.br/"
    }


    const [isReading, setisReading] = useState(false)

    async function getConfig() {
        try {
            console.log("URL", URLLOCALSERVICE())
            if (URLLOCALSERVICE()) {
                console.log("Antes da requisição fetch");
                const response = await fetch(`${URLLOCALSERVICE()}getRealTimeData`, {
                    method: 'GET'
                });

                const jsonData = await response.json();


                setConfig(jsonData)
                if (!jsonData.login) {
                    setDataLogin(null)
                    setPC(null)
                    setEvent(null)
                }

                if (!dataLogin && jsonData.login && jsonData.login.dataLogin) {
                    setDataLogin(jsonData.login.dataLogin)
                }

                if (!pc && jsonData.login && jsonData.login.pc) {
                    setPC(jsonData.login.pc)
                }

                if (!event && jsonData.login && jsonData.login.event) {
                    setEvent(jsonData.login.event)
                }

                localStorage.setItem("IS_SEND_TO_CLOUD", jsonData.IS_SEND_TO_CLOUD);
                localStorage.setItem("dateTimeSystem", jsonData.dateTimeSystem);

                localStorage.setItem("status", jsonData.status);
                localStorage.setItem("ip", jsonData.ip);
                localStorage.setItem("totalReader", jsonData.totalReader);
                localStorage.setItem("totalCloud", jsonData.totalCloud);
                if (!isReading) {
                    if (jsonData.status == "Lendo") {
                        setisReading(true)
                    }
                }
            }
            setTimeout(() => { getConfig() }, 1000)

        } catch (error) {
            console.error("Erro na requisição:", error);
            setTimeout(() => { getConfig() }, 10000)
        }
    }

    function alreadyLogin() {
        if (localStorage.getItem("AUTH") || null) {
            setLogin(JSON.parse(localStorage.getItem("AUTH")))

            if (localStorage.getItem("PC") || null) {
                setPCData(JSON.parse(localStorage.getItem("PC")))
            }
        }

    }

    useEffect(() => {
        getConfig()
        // alreadyLogin()
    }, [])





    return (
        <GlobalContext.Provider value={{
            config,
            URLLOCALSERVICE: URLLOCALSERVICE(),
            isReading,
            setisReading,
            dataLogin,
            setLogin,
            URL_API_RUNKING: URLAPIRUNKING(),
            setPCData,
            pc,
            event,
            setEvent,
            saveLoginInHarware,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

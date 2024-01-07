'use client'

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation";
import Loading from "@/components/loading";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import Separator from "@/components/separator";
import CardSelectClockDate from "@/components/cards/dateCalendar";
import ConfirmModal from "@/components/modal/confirmation";



export default function Settings() {
  const router = useRouter();
  const path = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [ip, setIp] = useState();
  const [isModalGetHour, setIsModalGetHour] = useState(false)

  const URL_API_RUNKING = "https://api.runking.com.br/"

  function getSettings() {
    setIp(localStorage.getItem("ip"))
  }


  function saveIp() {

    localStorage.setItem("ip", ip);

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }

  function isoConvert(dataString) {
    const data = new Date(dataString);
    return data.toISOString();
  }

  function saveNewDate() {
    let x = new Date();
    let y = isoConvert(x);
    console.log(y)

    localStorage.setItem("dateTimeSystem", y);

    setIsModalGetHour(false)
  }

  function confirmModalClose() {
    setIsModalGetHour(false)
  }

  useEffect(() => {
    getSettings()
  }, [path])

  console.log(isModalGetHour)
  return (
    <main className="fullContainer">
      <Header></Header>
      {isModalGetHour == true &&
        <ConfirmModal confirm={() => saveNewDate()} cancel={() => confirmModalClose()} question={"Deseja sincronizar a hora do sistema"}></ConfirmModal>}

      <div className="settingsContent">
        <div className="settingsReader">
          <h5>Ip do Reader</h5>
          <input
            type="text"
            className="inputText"
            style={{ width: "100%", fontSize: "20px" }}
            placeholder={!!ip && ip.length > 0 ? ip : ""}
            onChange={(e) => setIp(e.target.value)}
          ></input>
          <div className="settingsDivBtn">
            <button
              onClick={() => saveIp()}
              className="btnGreen"
            >Salvar</button>
          </div>
        </div>
        <div
          onClick={() => setIsModalGetHour(true)}
          className="settingsDateTime">
          <h5>Data e Hora do Reader</h5>
          <CardSelectClockDate
            text={"Configurar baseado neste dispostivo​"}></CardSelectClockDate>
        </div>
      </div>
      <FloatMenu></FloatMenu>
      <Footer></Footer>
    </main >
  )
}

'use client'

import { useState, useEffect, useContext } from "react"
import { usePathname } from "next/navigation";
import { GlobalContext } from "@/context/global"
import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import CardInfoData from "@/components/cards/dataInfoCard";
import Loading from "@/components/loading";
import ConfirmModal from "@/components/modal/confirmation";
import TowerCard from "@/components/cards/towerCard";

export default function EventSelect() {
  const { setisReading, isReading, config, URLLOCALSERVICE } = useContext(GlobalContext);
  const [stopRModal, setStopRModal] = useState(false);



  const start = async () => {
    const res = await fetch(`${URLLOCALSERVICE}startReader`, {
      method: 'GET'
    });

    console.log("resss", res)
  }
  const stop = async () => {
    const res = await fetch(`${URLLOCALSERVICE}stopReader`, {
      method: 'GET'
    });
    console.log("resss", res)
  }

  function stopReadingFunctions() {
    stop();
    setisReading(false);
    setStopRModal(false);
  }

  return (
    <main className="fullContainer">
      <Header></Header>
      {stopRModal == true && <ConfirmModal confirm={() => stopReadingFunctions()} cancel={() => setStopRModal(false)} question={"Deseja realmente parar o Reading"} ></ConfirmModal>}
      <CardInfoData></CardInfoData>
      <div className="btnDateTimeHome">
        {/* <CardSelectClockDate></CardSelectClockDate> */}
        <div className="cardSelectClockDateHome">
          <TowerCard status={config.antena1} tower={1}></TowerCard>
          <TowerCard status={config.antena2} tower={2}></TowerCard>
          <TowerCard status={config.antena3} tower={3}></TowerCard>
          <TowerCard status={config.antena4} tower={4}></TowerCard>
        </div>
      </div>
      <div className="btnDivsHome">
        {isReading == false &&
          <button
            onClick={() => { start(); setisReading(true) }}
            disabled={isReading == true}
            className={isReading == false ? "btnGreen cardSelectBtn" : "btnDisabled cardSelectBtn"}>{isReading == false && <img src="/icons/play-circle-black.svg"></img>}{isReading == false ? `START READING` : <Loading></Loading>}</button>
        }
        {isReading == true &&
          <button
            onClick={() => setStopRModal(true)}
            disabled={isReading == false}
            className={isReading == true ? "btnRed cardSelectBtn" : "btnDisabled cardSelectBtn"}>{isReading == true && <img src="/icons/stop-circle-white.svg"></img>}STOP READING</button>
        }
      </div>
      <FloatMenu></FloatMenu>
      <Footer></Footer>
    </main>
  )
}

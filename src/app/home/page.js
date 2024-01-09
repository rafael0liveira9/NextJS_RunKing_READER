'use client'

import { useState, useEffect, useContext } from "react"
import { useRouter, usePathname } from "next/navigation";
import { GlobalContext } from "@/context/global"
import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import CardInfoData from "@/components/cards/dataInfoCard";
import CardSelectClockDate from "@/components/cards/dateCalendar";
import Loading from "@/components/loading";

export default function EventSelect() {

  const path = usePathname();
  const { setisReading, isReading } = useContext(GlobalContext)
  const URLLOCALSERVICE = "http://localhost:8000/"

  function alreadyLogin() {
    const user = {
      id: localStorage.getItem("user_id") || "",
      name: localStorage.getItem("user_name") || "",
      email: localStorage.getItem("user_email") || "",
      jwt: localStorage.getItem("user_jwt") || "",
    };

    const event = {
      id: localStorage.getItem("event_id") || "",
      title: localStorage.getItem("event_title") || "",
      type: localStorage.getItem("event_type") || "",
      slug: localStorage.getItem("event_slug") || "",
      logo: localStorage.getItem("event_logo") || "",
      cep: localStorage.getItem("event_cep") || "",
      address: localStorage.getItem("event_address") || "",
      neighborhood: localStorage.getItem("event_neighborhood") || "",
      city: localStorage.getItem("event_city") || "",
      uf: localStorage.getItem("event_uf") || "",
      country: localStorage.getItem("event_country") || "",
      mainDate: localStorage.getItem("event_date") || "",
      raiaOne: localStorage.getItem("event_raia_one") || "",
      raiaTwo: localStorage.getItem("event_raia_two") || "",
      raiaTree: localStorage.getItem("event_raia_tree") || "",
    }
  }



  useEffect(() => {
    alreadyLogin();
  }, [path]);

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

  return (
    <main className="fullContainer">
      <Header></Header>
      <CardInfoData></CardInfoData>
      <div className="btnDateTimeHome">
        <CardSelectClockDate></CardSelectClockDate>
      </div>
      <div className="btnDivsHome">
        <button
          onClick={() => { start(); setisReading(true) }}
          disabled={isReading == true}
          className={isReading == false ? "btnGreen cardSelectBtn" : "btnDisabled cardSelectBtn"}>{isReading == false && <img src="/icons/play-circle-black.svg"></img>}{isReading == false ? `START READING` : <Loading></Loading>}</button>
        <button
          onClick={() => { stop(); setisReading(false) }}
          disabled={isReading == false}
          className={isReading == true ? "btnRed cardSelectBtn" : "btnDisabled cardSelectBtn"}>{isReading == true && <img src="/icons/stop-circle-white.svg"></img>}STOP READING</button>
      </div>
      <FloatMenu></FloatMenu>
      <Footer></Footer>
    </main>
  )
}

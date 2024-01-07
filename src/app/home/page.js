'use client'

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import CardInfoData from "@/components/cards/dataInfoCard";
import CardSelectClockDate from "@/components/cards/dateCalendar";
import Loading from "@/components/loading";

export default function EventSelect() {

  const router = useRouter();
  const path = usePathname();
  const [isReading, setisReading] = useState(false)

  const URL_API_RUNKING = "https://kingofit.com.br/apirunkingmaxprov3/";


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

  async function getConfig() {

    // localStorage.setItem("IS_SEND_TO_CLOUD", false);
    // localStorage.setItem("dateTimeSystem", "2024-01-01T03:00:00.448740376Z");
    // localStorage.setItem("serialNumber", "37022435146");
    // localStorage.setItem("status", "Parado");
    // localStorage.setItem("ip", "000.000.000.00");
    // localStorage.setItem("totalReader", 240);
    // localStorage.setItem("totalCloud", 890);

    // try {
    //   console.log("Antes da requisição fetch");
    //   const response = await fetch(`${URL_API_RUNKING}getRealTimeData`, {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': localStorage.getItem("user_jwt")
    //     }
    //   });


    // } catch (error) {
    //   console.error("Erro na requisição:", error);
    // }
  }

  useEffect(() => {
    alreadyLogin();
    getConfig();

    // const intervalId = setInterval(() => {
    //   getConfig();
    //   console.log("log", data)
    // }, 1000);

    // return () => clearInterval(intervalId);

  }, [path]);

  return (
    <main className="fullContainer">
      <Header></Header>
      <CardInfoData></CardInfoData>
      <div className="btnDateTimeHome">
        <CardSelectClockDate></CardSelectClockDate>
      </div>
      <div className="btnDivsHome">
        <button
          onClick={() => setisReading(true)}
          disabled={isReading == true}
          className={isReading == false ? "btnGreen cardSelectBtn" : "btnDisabled cardSelectBtn"}>{isReading == false && <img src="/icons/play-circle-black.svg"></img>}{isReading == false ? `START READING` : <Loading></Loading>}</button>
        <button
          onClick={() => setisReading(false)}
          disabled={isReading == false}
          className={isReading == true ? "btnRed cardSelectBtn" : "btnDisabled cardSelectBtn"}>{isReading == true && <img src="/icons/stop-circle-white.svg"></img>}STOP READING</button>
      </div>
      <FloatMenu></FloatMenu>
      <Footer></Footer>
    </main>
  )
}

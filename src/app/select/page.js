'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import EventCard from "@/components/cards/eventCard";


export default function EventSelect() {
  const router = useRouter();
  const year = new Date().getFullYear();
  const [user, setUser] = useState({})
  const [events, setEvents] = useState([])
  const [eventSelected, setEventSelected] = useState()


  const URL_API_RUNKING = "https://api.runking.com.br/"


  useEffect(() => {
    alreadyLogin();

    if (user.jwt != "") {
      getEvents();
    }
  }, [])

  function alreadyLogin() {
    let dataLog = JSON.parse(localStorage.getItem("login"))
    if (!dataLog) {
      router.push("/")
      return;
    }

    const user = {
      id: dataLog.id,
      jwt: dataLog.jwt
    };

    setUser(user)

    if (user.id == "") {
      router.push("/")
    }

  }



  async function getEvents() {
    let dataLog = JSON.parse(localStorage.getItem("login"))
    if (!dataLog)
      return
    try {
      const response = await fetch(`${URL_API_RUNKING}eventsByLogin`, {
        method: 'GET',
        headers: {
          'Authorization': dataLog.jwt
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      setEvents(data);

    } catch (error) {
      console.error("Erro na requisição:", error.message);
    }
  }

  return (
    <main className="fullContainer">
      <Header title="Selecione o Evento" user={user}></Header>

      <div className="mainContainer" style={{ width: "100%", alignItems: "flex-start", justifyContent: "flex-start" }}>
        {events?.length > 0 ?
          <>
            <h5 style={{ margin: "20px 0" }}>Eventos:</h5>
            {events?.map((e, y) => {

              return (
                <EventCard
                  event={e}
                  y={y}
                  key={y}
                  openModal={() => openModalCP()}
                ></EventCard>
              )
            })}

          </>
          :
          <p className="textSmall">Nenhum evento disponivel....</p>
        }
      </div>
      <Footer></Footer>
    </main >
  )
}

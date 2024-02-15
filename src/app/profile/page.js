'use client'

import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import ConfirmModal from "@/components/modal/confirmation";
import Loading from "@/components/loading";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GlobalContext } from "@/context/global"

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [event, setEvent] = useState({})
  const [confirmModalisOpen, setConfirmModalisOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const type = event?.type?.replaceAll("_", " ").replaceAll("-", " ") || ``
  const eventDate = event.date ? new Date(event.date) : null;
  const { setPCData, setLogin, pc } = useContext(GlobalContext)

  let formattedDate = '';
  let formattedTime = '';
  if (eventDate) {
    formattedDate = format(eventDate, 'dd/MM/yyyy', { locale: ptBR, timeZone: 'America/Sao_Paulo' });
    formattedTime = format(eventDate, 'HH:mm', { locale: ptBR, timeZone: 'America/Sao_Paulo' });
  }


  useEffect(() => {
    alreadyLogin();

    if (user.id == "") {
      router.push("/")
    }
  }, [])

  function alreadyLogin() {
    const user = {
      name: localStorage.getItem("user_name") || "",
      email: localStorage.getItem("user_email") || "",
      phone: localStorage.getItem("user_phone") || "",
      jwt: localStorage.getItem("user_jwt") || "",
    };
    const event = {
      name: localStorage.getItem("event_title") || "",
      type: localStorage.getItem("event_type") || "",
      date: localStorage.getItem("event_date") || ""
    };
    setUser(user)
    setEvent(event)
  }

  function logOut() {
    setIsLoading(true)
    setConfirmModalisOpen(false)


    setPCData(null)
    setLogin(null)

    localStorage.clear();


    setTimeout(() => {
      setIsLoading(false)
    }, 2000);

    router.push("/select")
  }

  function confirmModalOpen() {
    setConfirmModalisOpen(true)
  }

  function confirmModalClose() {
    setConfirmModalisOpen(false)
  }

  return (
    <main className="fullContainer">
      <Header title={"Configurações do Perfil"}></Header>
      {confirmModalisOpen == true && <ConfirmModal confirm={() => logOut()} cancel={() => confirmModalClose()} question={"Deslogar"}></ConfirmModal>}
      <div className="profileContainer">
        <div className="mainProfile">
          {/* <div className="imageProfile">
            <img src="/images/king-crow.png"></img>
          </div> */}
          <div className="infoProfile">
            {user?.name != "" && <div className="infoItem"><h6>Nome : </h6><p>{user.name}</p></div>}
            {user?.email != "" && <div className="infoItem"><h6>E-mail : </h6><p>{user.email}</p></div>}
            {user?.phone != "" && <div className="infoItem"><h6>Telefone : </h6><p>{user.phone}</p></div>}
            {event?.name != "" && <div className="infoItem"><h6>Evento : </h6><p>{event.name}</p></div>}
            {event?.type != "" && <div className="infoItem"><h6>Ponto de Controle: </h6><p>{pc.name}</p></div>}
            {event?.date != "" && <div className="infoItem"><h6>Data : </h6><p>{formattedDate + " às " + formattedTime}</p></div>}
          </div>
        </div>
        <div className="btnProfileDiv">
          <button className="btnBlue btnProfile"
            disabled={confirmModalisOpen == true ? true : false}
            onClick={() => router.push("/select")}
          >{isLoading === true ? <Loading></Loading> : "+ Eventos"}</button>
          <button className="btnRed btnProfile"
            disabled={confirmModalisOpen == true ? true : false}
            onClick={() => confirmModalOpen()}
          >{isLoading === true ? <Loading></Loading> : "Deslogar"}</button>
        </div>
      </div>
      <FloatMenu></FloatMenu>
      <Footer></Footer>
    </main >
  )
}

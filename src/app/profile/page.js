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
  const [confirmModalisOpen, setConfirmModalisOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { setPCData, setLogin, pc, saveLoginInHarware, event, setEvent, dataLogin } = useContext(GlobalContext)

  useEffect(() => {
    if (!dataLogin) {
      router.push("/")
    }
  }, [])



  async function logOut() {
    setIsLoading(true)
    setConfirmModalisOpen(false)


    setPCData(null)
    setLogin(null)
    setEvent(null)

    localStorage.clear();
    await saveLoginInHarware({ logout: true })

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
            {dataLogin?.name != "" && <div className="infoItem"><h6>Nome : </h6><p>{dataLogin?.name}</p></div>}
            {dataLogin?.email != "" && <div className="infoItem"><h6>E-mail : </h6><p>{dataLogin?.email}</p></div>}
            {event?.name != "" && <div className="infoItem"><h6>Evento : </h6><p>{event?.name}</p></div>}
            {pc?.uuid != "" && <div className="infoItem"><h6>Ponto de Controle: </h6><p><a href={`https://api-tempo-real.runking.com.br/Data/${pc?.uuid}/csv`} target="_blank">{pc?.name}</a></p></div>}
            {event?.mainDate && <div className="infoItem"><h6>Data : </h6><p>{format(event.mainDate, 'dd/MM/yyyy', { locale: ptBR, timeZone: 'America/Sao_Paulo' }) + " às " + format(event.mainDate, 'HH:mm', { locale: ptBR, timeZone: 'America/Sao_Paulo' })}</p></div>}
          </div>
        </div>
        <div className="btnProfileDiv">
          <button className="btnBlue btnProfile"
            disabled={confirmModalisOpen == true ? true : false}
            onClick={() => router.push("/select")}
          >{isLoading === true ? <Loading></Loading> : "Trocar Evento"}</button>
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

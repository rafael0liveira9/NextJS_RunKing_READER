'use client'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from "next/navigation";
import { useState, useContext } from 'react';
import ControlPointModal from "@/components/modal/controlPoints";
import { GlobalContext } from "@/context/global"

export default function EventCard({ event, y }) {
    const router = useRouter()
    const { setEvent } = useContext(GlobalContext)
    const index = y || 1
    const image = event?.logo || "/images/king-crow.png"
    const title = event?.name || `Event #${index}`
    const locale = event?.city || ``
    const type = event?.eventType.replaceAll("_", " ").replaceAll("-", " ") || ``
    const date = event?.mainDate ? format(new Date(event.mainDate), 'dd/MM/yyyy', { locale: ptBR, timeZone: 'America/Sao_Paulo' }) : ``;
    const [modalControlPoint, setModalControlPoint] = useState(false)

    function selectevent(event) {

        if (!!event?.id) {
            setEvent(event)
            localStorage.setItem("event", JSON.stringify(event))
            openModalCP()
        }
    }


    const openModalCP = () => {
        setModalControlPoint(true)
    }

    const closeModalCP = () => {
        setModalControlPoint(false)
    }

    return (
        <div className="cardEvent"
            onClick={() => {
                selectevent(event)
            }}
        >
            {modalControlPoint == true && <ControlPointModal close={() => closeModalCP()} event={event}></ControlPointModal>}
            <div className="cardEventLogo">
                <img src={image}></img>
            </div>
            <div className="cardEventDesc">
                <h6>{title}</h6>
                <p><img src="/icons/marker.svg"></img>{locale}</p>
                <p><img src="/icons/calendar-lines.svg"></img>{date}</p>
                <p><span>{type}</span></p>
            </div>
        </div>
    )
}

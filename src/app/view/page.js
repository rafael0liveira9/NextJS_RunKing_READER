'use client'

import { useState, useEffect, useContext } from "react"
import { useRouter, usePathname } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import Loading from "@/components/loading";
import Separator from "@/components/separator";
import { GlobalContext } from "@/context/global"

export default function View() {

  const path = usePathname();
  const { URLLOCALSERVICE } = useContext(GlobalContext)

  const [isLoading, setIsLoading] = useState(false)
  const [filesData, setFilesData] = useState([])

  const loadData = async () => {
    const res = await fetch(`${URLLOCALSERVICE}files`, {
      method: 'GET'
    });
    setFilesData(await res.json())
  }

  const downloadFile = async (fileName) => {
    const res = await fetch(`${URLLOCALSERVICE}files/${fileName}`, {
      method: 'GET'
    });
    let csvContent = (await res.text())

    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Cria um URL para o Blob
    const url = URL.createObjectURL(blob);

    // Cria um link para o download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Substitua pelo nome desejado do arquivo

    // Adiciona o link ao DOM e simula um clique para iniciar o download
    document.body.appendChild(link);
    link.click();

    // Remove o link do DOM
    document.body.removeChild(link);

    // Revoga o URL do Blob para liberar recursos
    URL.revokeObjectURL(url);

  }

  useEffect(() => {
    loadData()
  }, [path])

  return (
    <main className="fullContainer">
      <Header title={"Visualizar Resultado"}></Header>
      <div className="mainView">
        <div className="archievListFirst">
          <h6>Filename</h6>
          <h6>Size</h6>
          <h6>Action</h6>
        </div>
        <div className="archievListSecond">
          {filesData?.length > 0
            ?
            filesData.map((e, y) => {
              return (
                <>
                  <div className="archievListItem" key={y}>
                    <h6>{e.nome}</h6>
                    <h6>{e.tamanho_kb}kb</h6>
                    <div className="archievListIcon">
                      <img onClick={() => { downloadFile(e.nome) }} src="/icons/download.svg" />
                      <img src="/icons/trash.svg" />
                    </div>
                  </div>
                  {(y + 1) != filesData?.length && <Separator color={"var(--grey-neutral-nine)"} width={"100%"} height={"1px"}></Separator>}
                </>
              )
            })
            :
            <div className="archievNoListAvaible">
              <p>
                - No files available
              </p>
            </div>
          }
        </div>
      </div>
      <FloatMenu></FloatMenu>
      <Footer></Footer>
    </main >
  )
}

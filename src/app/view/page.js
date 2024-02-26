'use client'

import { useState, useEffect, useContext } from "react"
import { useRouter, usePathname } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import Loading from "@/components/loading";
import Separator from "@/components/separator";
import { GlobalContext } from "@/context/global"
import ConfirmModal from "@/components/modal/confirmation";

export default function View() {

  const path = usePathname();
  const { URLLOCALSERVICE, pc } = useContext(GlobalContext)
  const [stopRModal, setStopRModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [filesData, setFilesData] = useState([])
  const [dataSelected, setDataSelected] = useState()
  const [uploadModal, setUploadModal] = useState()


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

  const deleteFile = async (fileName) => {
    await fetch(`${URLLOCALSERVICE}files/${fileName}`, {
      method: 'DELETE'
    });
    loadData()
  }

  useEffect(() => {
    loadData()
  }, [path])

  function deleteData() {
    deleteFile(!!dataSelected ? dataSelected : "");
    setStopRModal(false);
  }

  async function enviarParaAPI(items) {
    try {
      const response = await fetch(`https://api-tempo-real.runking.com.br/insertDataMultiples/${pc.uuid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(items)
      });
      const data = await response.json();
      console.log('Resposta da API:', data);
      return true
    } catch (error) {
      console.error('Erro ao enviar para a API:', error);
      return false
    }
  }


  async function uploadData() {
    setIsLoading(true)
    setUploadModal(false)
    console.log("dataSelected", dataSelected)
    const res = await fetch(`${URLLOCALSERVICE}files/${dataSelected}`, {
      method: 'GET'
    });
    let dados_csv = (await res.text())

    // Processamento dos dados
    const linhas = dados_csv.trim().split('\n');
    const objetos = [];

    for (const linha of linhas) {
      const [dataHoraStr, chip] = linha.split(';');
      const [ano, mes, dia, hora, minuto, segundo, milissegundo] = dataHoraStr.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})\d*Z/).slice(1);
      const data = `${ano}-${mes}-${dia}`;
      const horaFormatada = `${hora}h${minuto}'${segundo},${milissegundo}`;
      objetos.push({
        data: data,
        hora: horaFormatada,
        chip: chip
      });
    }

    // Saída como array de objetos
    console.log(objetos);

    const batchSize = 50;
    const totalBatches = Math.ceil(objetos.length / batchSize);

    for (let i = 0; i < totalBatches; i++) {
      const start = i * batchSize;
      const end = (i + 1) * batchSize;
      const batchObjetos = objetos.slice(start, end);

      if (!await enviarParaAPI(batchObjetos)) {
        alert("Não foi possível enviar os dados para API")
        break;
      }
    }


    setIsLoading(false)

  }


  return (
    <main className="fullContainer">
      <Header title={"Visualizar Resultado"}></Header>
      {stopRModal == true && <ConfirmModal confirm={() => deleteData()} cancel={() => setStopRModal(false)} question={"Deseja realmente Deletar estes dados"} ></ConfirmModal>}
      {uploadModal == true && <ConfirmModal confirm={() => uploadData()} cancel={() => setUploadModal(false)} question={"Deseja realmente enviar estes dados para nuvem runking selecionada?"} ></ConfirmModal>}
      {isLoading ? <Loading position="relative" /> :
        (<div className="mainView">
          <div className="archievListFirst">
            <h6>Arquivo</h6>
            <h6>Total de Leituras</h6>
            <h6>Ação</h6>
          </div>
          <div className="archievListSecond">
            {filesData?.length > 0
              ?
              filesData.map((e, y) => {
                return (
                  <>
                    <div className="archievListItem" key={y}>
                      <h6>{e.nome}</h6>
                      <h6>{e.linhas} linhas</h6>
                      <div className="archievListIcon">
                        <img onClick={() => { downloadFile(e.nome) }} src="/icons/download.svg" />
                        {pc && <img onClick={() => { setDataSelected(e.nome); setUploadModal(true); }} src="/icons/cloud.svg" />}
                        <img onClick={() => { setDataSelected(e.nome); setStopRModal(true); }} src="/icons/trash.svg" />
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
        </div>)}
      <FloatMenu></FloatMenu>
      <Footer></Footer>
    </main >
  )
}

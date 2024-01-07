'use client'

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import Loading from "@/components/loading";
import Separator from "@/components/separator";


export default function View() {

  const path = usePathname();

  const [isLoading, setIsLoading] = useState(false)
  const [filesData, setFilesData] = useState([
    {
      filename: "corrida 1",
      size: "1634kb"
    },
    {
      filename: "corrida 2",
      size: "1734kb"
    },
    {
      filename: "corrida 3",
      size: "1624kb"
    },
    {
      filename: "corrida 4",
      size: "1624kb"
    },
    {
      filename: "corrida 5",
      size: "1624kb"
    },
    {
      filename: "corrida 6",
      size: "1624kb"
    },
    {
      filename: "corrida 7",
      size: "1624kb"
    },
  ])


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
                    <h6>{e.filename}</h6>
                    <h6>{e.size}</h6>
                    <div className="archievListIcon">
                      <img src="/icons/download.svg"></img>
                      <img src="/icons/trash.svg"></img>
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

'use client'

import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ConfirmModal from "@/components/modal/confirmation";
import { GlobalContext } from "@/context/global"

export default function Login() {
  const router = useRouter();
  const [userName, setUsername] = useState();
  const [userPassword, setPassword] = useState();
  const [mask, setMask] = useState(true);
  const [user, setUser] = useState({});
  const [dataError, setDataError] = useState(false);
  const [conectionError, setConectionError] = useState(false);
  const [modalConection, setModalConection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { URLLOCALSERVICE, URL_API_RUNKING, setLogin, dataLogin, pc, setPCData } = useContext(GlobalContext)





  async function saveSettings() {
    setIsLoading(true)
    router.push("/home");
  }


  // ******************

  //   user: 'admin@admin.com.br',
  //   password: 'runking2023!@',

  // *******************
  async function signIn() {
    setIsLoading(true);
    try {
      const response = await fetch(`${URL_API_RUNKING}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userName,
          password: userPassword
        }),
      });

      const data = await response.json();

      if (response.status >= 205) {

        console.log(response.status != 200)

        if (response.status > 500) {
          setModalConection(true)
          setDataError(false)
          setConectionError(true)
        } else {
          setConectionError(false)
          setDataError(true)
        }

        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      } else {
        setLogin(data)
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("user_name", data.name);
        localStorage.setItem("user_email", data.email);
        localStorage.setItem("user_phone", data.phone || "Não Preenchido");
        localStorage.setItem("user_jwt", data.jwt);

        setConectionError(false)
        setDataError(false)
        setIsLoading(false);
        router.push("/select")
      }

    } catch (error) {
      console.error("Erro na requisição:", error.message);
      setIsLoading(false);
    }
  }


  useEffect(() => {
    if (dataLogin) {
      if (!pc) {
        router.push("/select")
      } else
        router.push("/home")
    }
  }, [dataLogin, pc])


  return (
    <main className="fullContainer">
      <Header title="Login"></Header>
      {modalConection == true && <ConfirmModal confirm={() => router.push("/home")} cancel={() => setModalConection(false)} question={"Erro ao conectar-se a rede, deseja prosseguir sem internet"}></ConfirmModal>}
      <div className="mainContainer" style={{ width: "100%", maxWidth: "800px" }}>
        <div className="mainContainer gap-4" style={{ alignItems: "end" }}>
          <div className="w-full mb-5 flex justify-center">
            <img src="/images/logo-runking.svg"></img>
          </div>
          <div className="inputText" style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Digite seu e-mail..."
              style={{ width: "100%" }}
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <img src="/icons/user.svg"></img>
          </div>


          <div className="inputText" style={{ width: "100%" }}>
            <input
              type={mask == true ? "password" : "text"}
              placeholder="Digite sua senha..."
              style={{ width: "100%" }}
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
            >
            </input>
            <img
              src={mask == true ? "/icons/lock.svg" : "/icons/lock-open.svg"}
              onClick={() => setMask(!mask)}
            ></img>
          </div>
          {dataError === true && <p className="errorInput"> * O e-mail ou Senha digitados não são validos.</p>}
          {conectionError === true && <p className="errorInput"> * Erro de conexão, conecte-se a uma rede para Logar.</p>}
          <button
            className='btnGreen'
            style={{ width: "100%" }}
            onClick={() => signIn()}
            disabled={isLoading}
          >{isLoading === true ? <Loading></Loading> : "LOGIN"}</button>

          <button
            className='btnDisabled'
            style={{ marginTop: "10%" }}
            disabled={isLoading}
            onClick={() => saveSettings()}
          >{isLoading === true ? <Loading></Loading> : "CONTINUAR SEM LOGAR"}</button>
        </div>
      </div>
      <Footer menu={false}></Footer>
    </main>
  )
}

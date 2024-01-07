'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Login() {
  const router = useRouter();
  const [userName, setUsername] = useState()
  const [userPassword, setPassword] = useState()
  const [mask, setMask] = useState(true)
  const [user, setUser] = useState({})
  const [dataError, setDataError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const URL_API_RUNKING = "https://api.runking.com.br/"


  useEffect(() => {

    alreadyLogin()

  }, [userName, userPassword])

  function saveSettings() {
    setIsLoading(true)

    localStorage.setItem("event_raia_one", true);
    localStorage.setItem("event_raia_two", true);
    localStorage.setItem("event_raia_tree", true);

    setTimeout(() => {
      setIsLoading(false)
    }, 1000);

    router.push("/home");
  }

  async function signIn() {
    setIsLoading(true);

    try {
      const response = await fetch(`${URL_API_RUNKING}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'admin@admin.com.br',
          password: 'runking2023!@',
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();


      if (!data.length) {
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("user_name", data.name);
        localStorage.setItem("user_email", data.email);
        localStorage.setItem("user_phone", data.phone || "Não Preenchido");
        localStorage.setItem("user_jwt", data.jwt);

        setDataError(false)
        setIsLoading(false);
        router.push("/select")
      }

    } catch (error) {
      console.error("Erro na requisição:", error.message);
      setIsLoading(false);
      setDataError(true)
    }
  }


  function alreadyLogin() {
    const user = {
      id: localStorage.getItem("user_id") || "",
      name: localStorage.getItem("user_name") || "",
      email: localStorage.getItem("user_email") || "",
      jwt: localStorage.getItem("user_jwt") || "",
    };

    setUser(user)

    if (user.id != "") {
      router.push("/select")
    }

  }


  return (
    <main className="fullContainer">
      <Header title="Login"></Header>
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

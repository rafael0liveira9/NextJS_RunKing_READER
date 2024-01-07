'use client'
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react"


export default function FloatMenu() {
    const path = usePathname()
    const router = useRouter()

    const [user, setUser] = useState({})

    function alreadyLogin() {
        const user = {
            id: localStorage.getItem("user_id") || "",
            name: localStorage.getItem("user_name") || "",
            email: localStorage.getItem("user_email") || "",
            jwt: localStorage.getItem("user_jwt") || "",
        };

        setUser(user)
    }

    useEffect(() => {
        alreadyLogin();
    }, [])

    return (
        <div className="menuContainer">
            <div className={path == '/home' ? "menuItemSelected" : "menuItem"}
                onClick={() => router.push('/home')}
            >
                {path == '/home' ?
                    <h6>Home</h6>
                    :
                    <img src="/icons/home.svg"></img>
                }
            </div>
            <div className={path == '/view' ? "menuItemSelected" : "menuItem"}
                onClick={() => router.push('/view')}
            >
                {path == '/view' ?
                    <h6>Visualizar</h6>
                    :
                    <img src="/icons/eye.svg"></img>
                }
            </div>
            <div className={path == '/settings' ? "menuItemSelected" : "menuItem"}
                onClick={() => router.push('/settings')}
            >
                {path == '/settings' ?
                    <h6>Configurações</h6>
                    :
                    <img src="/icons/process.svg"></img>
                }
            </div>
            <div className={path == '/profile' ? "menuItemSelected" : "menuItem"}
                onClick={user.id != "" ? () => router.push('/profile') : () => router.push('/')}
            >
                {path == '/profile' ?
                    <h6>Perfil</h6>
                    :
                    user.id != "" ?
                        <img src="/icons/user-white.svg"></img>
                        :
                        <><img src="/icons/signin.svg"></img><p style={{ color: "#FFFFFF", marginLeft: "10px" }}>Login</p></>
                }
            </div>

        </div>
    )
}

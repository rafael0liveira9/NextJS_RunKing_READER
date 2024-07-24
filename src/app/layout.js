import '@/styles/global.css'
import { GlobalProvider } from "../context/global"
export const metadata = {
  title: 'GoHard',
  description: 'Sistema GoRunking',
}

export default function RootLayout({ children }) {
  return (
    <GlobalProvider>
      <html lang="pt-br">
        <body>{children}</body>
      </html>
    </GlobalProvider>
  )
}

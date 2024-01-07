import '@/styles/global.css'

export const metadata = {
  title: 'RunKing App',
  description: 'This is a RunKing App Page.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  console.log("montando layout")
  return (
    <html lang="en">
        <body>
          <header>
            <h1>Menu principal</h1>
          </header>
          {children}
        </body>
    </html>
  )
}

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Rota 3</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
